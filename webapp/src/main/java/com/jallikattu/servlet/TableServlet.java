package com.jallikattu.servlet;

import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.jallikattu.util.GenericDAO;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/**
 * Generic table servlet - handles CRUD for any table.
 * URL pattern: /admin/table?name=<tableName>&action=<action>
 */
@WebServlet("/admin/table")
public class TableServlet extends HttpServlet {

    // Whitelist of allowed table names to prevent SQL injection
    private static final Set<String> ALLOWED_TABLES = Set.of(
            "player", "owner", "bull_breed", "batch", "round_type",
            "location", "prize", "organizer", "match", "bull_table",
            "player_match_history", "bull_match_history", "bull_player_interaction",
            "app_user");

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String tableName = request.getParameter("name");
        String action = request.getParameter("action");

        if (tableName == null || !ALLOWED_TABLES.contains(tableName)) {
            response.sendRedirect(request.getContextPath() + "/admin/dashboard");
            return;
        }

        try {
            if ("add".equals(action)) {
                // Show add form
                List<Map<String, String>> columns = GenericDAO.getColumns(tableName);
                List<Map<String, String>> fks = GenericDAO.getForeignKeys(tableName);
                Map<String, List<Map<String, Object>>> lookups = new LinkedHashMap<>();
                for (Map<String, String> fk : fks) {
                    String parentTable = fk.get("pkTable");
                    if (!lookups.containsKey(fk.get("fkColumn"))) {
                        lookups.put(fk.get("fkColumn"), GenericDAO.getLookupValues(parentTable));
                    }
                }
                // Get FK column -> parent table mapping
                Map<String, String> fkParentMap = new LinkedHashMap<>();
                for (Map<String, String> fk : fks) {
                    fkParentMap.put(fk.get("fkColumn"), fk.get("pkTable"));
                }
                request.setAttribute("columns", columns);
                request.setAttribute("fks", fks);
                request.setAttribute("lookups", lookups);
                request.setAttribute("fkParentMap", fkParentMap);
                request.setAttribute("tableName", tableName);
                request.setAttribute("mode", "add");
                request.getRequestDispatcher("/WEB-INF/views/form.jsp").forward(request, response);

            } else if ("edit".equals(action)) {
                // Show edit form
                List<String> pks = GenericDAO.getPrimaryKeys(tableName);
                Map<String, String> pkValues = new LinkedHashMap<>();
                for (String pk : pks) {
                    pkValues.put(pk, request.getParameter(pk));
                }
                Map<String, Object> row = GenericDAO.getByPK(tableName, pkValues);
                List<Map<String, String>> columns = GenericDAO.getColumns(tableName);
                List<Map<String, String>> fks = GenericDAO.getForeignKeys(tableName);
                Map<String, List<Map<String, Object>>> lookups = new LinkedHashMap<>();
                for (Map<String, String> fk : fks) {
                    String parentTable = fk.get("pkTable");
                    if (!lookups.containsKey(fk.get("fkColumn"))) {
                        lookups.put(fk.get("fkColumn"), GenericDAO.getLookupValues(parentTable));
                    }
                }
                Map<String, String> fkParentMap = new LinkedHashMap<>();
                for (Map<String, String> fk : fks) {
                    fkParentMap.put(fk.get("fkColumn"), fk.get("pkTable"));
                }
                request.setAttribute("row", row);
                request.setAttribute("columns", columns);
                request.setAttribute("fks", fks);
                request.setAttribute("lookups", lookups);
                request.setAttribute("fkParentMap", fkParentMap);
                request.setAttribute("tableName", tableName);
                request.setAttribute("pkValues", pkValues);
                request.setAttribute("mode", "edit");
                request.getRequestDispatcher("/WEB-INF/views/form.jsp").forward(request, response);

            } else if ("delete".equals(action)) {
                // Delete and redirect
                List<String> pks = GenericDAO.getPrimaryKeys(tableName);
                Map<String, String> pkValues = new LinkedHashMap<>();
                for (String pk : pks) {
                    pkValues.put(pk, request.getParameter(pk));
                }
                GenericDAO.delete(tableName, pkValues);
                response.sendRedirect(request.getContextPath() + "/admin/table?name=" + tableName + "&msg=deleted");

            } else {
                // Default: list all rows
                List<Map<String, Object>> rows = GenericDAO.getAll(tableName);
                List<Map<String, String>> columns = GenericDAO.getColumns(tableName);
                List<String> pks = GenericDAO.getPrimaryKeys(tableName);
                request.setAttribute("rows", rows);
                request.setAttribute("columns", columns);
                request.setAttribute("pks", pks);
                request.setAttribute("tableName", tableName);
                request.setAttribute("tableNames", GenericDAO.getAllTableNames());
                request.getRequestDispatcher("/WEB-INF/views/table.jsp").forward(request, response);
            }
        } catch (Exception e) {
            request.setAttribute("error", e.getMessage());
            request.setAttribute("tableName", tableName);
            // Try to still show the table list
            try {
                List<Map<String, Object>> rows = GenericDAO.getAll(tableName);
                List<Map<String, String>> columns = GenericDAO.getColumns(tableName);
                List<String> pks = GenericDAO.getPrimaryKeys(tableName);
                request.setAttribute("rows", rows);
                request.setAttribute("columns", columns);
                request.setAttribute("pks", pks);
                request.setAttribute("tableNames", GenericDAO.getAllTableNames());
            } catch (Exception ex) {
                // ignore
            }
            request.getRequestDispatcher("/WEB-INF/views/table.jsp").forward(request, response);
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String tableName = request.getParameter("name");
        String mode = request.getParameter("mode");

        if (tableName == null || !ALLOWED_TABLES.contains(tableName)) {
            response.sendRedirect(request.getContextPath() + "/admin/dashboard");
            return;
        }

        try {
            List<Map<String, String>> columns = GenericDAO.getColumns(tableName);
            Map<String, String> values = new LinkedHashMap<>();
            for (Map<String, String> col : columns) {
                String colName = col.get("name");
                String val = request.getParameter("col_" + colName);
                if (val != null) {
                    values.put(colName, val);
                }
            }

            if ("edit".equals(mode)) {
                // Get the original PK values
                List<String> pks = GenericDAO.getPrimaryKeys(tableName);
                Map<String, String> pkValues = new LinkedHashMap<>();
                for (String pk : pks) {
                    pkValues.put(pk, request.getParameter("origpk_" + pk));
                }
                GenericDAO.update(tableName, values, pkValues);
                response.sendRedirect(request.getContextPath() + "/admin/table?name=" + tableName + "&msg=updated");
            } else {
                GenericDAO.insert(tableName, values);
                response.sendRedirect(request.getContextPath() + "/admin/table?name=" + tableName + "&msg=added");
            }
        } catch (Exception e) {
            // Re-show form with error
            request.setAttribute("error", e.getMessage());
            request.setAttribute("tableName", tableName);
            request.setAttribute("mode", mode);
            try {
                List<Map<String, String>> columns = GenericDAO.getColumns(tableName);
                List<Map<String, String>> fks = GenericDAO.getForeignKeys(tableName);
                Map<String, List<Map<String, Object>>> lookups = new LinkedHashMap<>();
                for (Map<String, String> fk : fks) {
                    String parentTable = fk.get("pkTable");
                    if (!lookups.containsKey(fk.get("fkColumn"))) {
                        lookups.put(fk.get("fkColumn"), GenericDAO.getLookupValues(parentTable));
                    }
                }
                Map<String, String> fkParentMap = new LinkedHashMap<>();
                for (Map<String, String> fk : fks) {
                    fkParentMap.put(fk.get("fkColumn"), fk.get("pkTable"));
                }
                request.setAttribute("columns", columns);
                request.setAttribute("fks", fks);
                request.setAttribute("lookups", lookups);
                request.setAttribute("fkParentMap", fkParentMap);
            } catch (Exception ex) {
                // ignore
            }
            request.getRequestDispatcher("/WEB-INF/views/form.jsp").forward(request, response);
        }
    }
}
