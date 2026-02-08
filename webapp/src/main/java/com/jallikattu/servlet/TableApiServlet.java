package com.jallikattu.servlet;

import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.jallikattu.util.GenericDAO;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/**
 * REST API for generic table CRUD.
 * GET    /api/tables                       - list available table names
 * GET    /api/tables/{name}                - list all rows
 * GET    /api/tables/{name}/columns        - get column metadata
 * GET    /api/tables/{name}/row?pk1=v1     - get single row by PK
 * POST   /api/tables/{name}               - insert row
 * PUT    /api/tables/{name}               - update row (body includes pk values)
 * DELETE /api/tables/{name}?pk1=v1         - delete row by PK
 */
@WebServlet("/api/tables/*")
public class TableApiServlet extends BaseRestServlet {

    private static final Set<String> ALLOWED_TABLES = Set.of(
            "player", "owner", "bull_breed", "batch", "round_type",
            "location", "prize", "organizer", "match", "bull_table",
            "player_match_history", "bull_match_history", "bull_player_interaction",
            "app_user",
            "spot_prize_type", "spot_prize", "spot_prize_award");

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String tableName = getPathSegment(req, 0);
        String sub = getPathSegment(req, 1);

        try {
            if (tableName == null) {
                // List all table names
                sendJson(resp, GenericDAO.getAllTableNames());
                return;
            }

            if (!ALLOWED_TABLES.contains(tableName)) {
                sendError(resp, "Table not allowed: " + tableName, 403);
                return;
            }

            if ("columns".equals(sub)) {
                Map<String, Object> data = new LinkedHashMap<>();
                data.put("columns", GenericDAO.getColumns(tableName));
                data.put("primaryKeys", GenericDAO.getPrimaryKeys(tableName));
                data.put("foreignKeys", GenericDAO.getForeignKeys(tableName));
                // Include lookup data for FK fields
                Map<String, List<Map<String, Object>>> lookups = new LinkedHashMap<>();
                for (Map<String, String> fk : GenericDAO.getForeignKeys(tableName)) {
                    String fkCol = fk.get("fkColumn");
                    if (!lookups.containsKey(fkCol)) {
                        lookups.put(fkCol, GenericDAO.getLookupValues(fk.get("pkTable")));
                    }
                }
                data.put("lookups", lookups);
                sendJson(resp, data);
                return;
            }

            if ("row".equals(sub)) {
                // Get single row by PK query params
                List<String> pks = GenericDAO.getPrimaryKeys(tableName);
                Map<String, String> pkValues = new LinkedHashMap<>();
                for (String pk : pks) {
                    pkValues.put(pk, req.getParameter(pk));
                }
                Map<String, Object> row = GenericDAO.getByPK(tableName, pkValues);
                if (row != null) {
                    sendJson(resp, row);
                } else {
                    sendError(resp, "Row not found", 404);
                }
                return;
            }

            // Default: list all rows
            Map<String, Object> data = new LinkedHashMap<>();
            data.put("rows", GenericDAO.getAll(tableName));
            data.put("columns", GenericDAO.getColumns(tableName));
            data.put("primaryKeys", GenericDAO.getPrimaryKeys(tableName));
            sendJson(resp, data);
        } catch (Exception e) {
            sendError(resp, e.getMessage(), 500);
        }
    }

    @Override
    @SuppressWarnings("unchecked")
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String tableName = getPathSegment(req, 0);
        if (tableName == null || !ALLOWED_TABLES.contains(tableName)) {
            sendError(resp, "Valid table name required", 400);
            return;
        }
        try {
            Map<String, String> body = readBody(req, Map.class);
            GenericDAO.insert(tableName, body);
            sendSuccess(resp, "Row inserted into " + tableName);
        } catch (Exception e) {
            sendError(resp, e.getMessage(), 500);
        }
    }

    @Override
    @SuppressWarnings("unchecked")
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String tableName = getPathSegment(req, 0);
        if (tableName == null || !ALLOWED_TABLES.contains(tableName)) {
            sendError(resp, "Valid table name required", 400);
            return;
        }
        try {
            Map<String, Object> body = readBody(req, Map.class);
            Map<String, String> values = new LinkedHashMap<>();
            Map<String, String> pkValues = new LinkedHashMap<>();

            // Separate PK values from data values
            List<String> pks = GenericDAO.getPrimaryKeys(tableName);
            Map<String, String> pkMap = (Map<String, String>) body.get("pkValues");
            if (pkMap != null) {
                pkValues.putAll(pkMap);
            }

            Map<String, String> dataMap = (Map<String, String>) body.get("values");
            if (dataMap != null) {
                values.putAll(dataMap);
            }

            GenericDAO.update(tableName, values, pkValues);
            sendSuccess(resp, "Row updated in " + tableName);
        } catch (Exception e) {
            sendError(resp, e.getMessage(), 500);
        }
    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String tableName = getPathSegment(req, 0);
        if (tableName == null || !ALLOWED_TABLES.contains(tableName)) {
            sendError(resp, "Valid table name required", 400);
            return;
        }
        try {
            List<String> pks = GenericDAO.getPrimaryKeys(tableName);
            Map<String, String> pkValues = new LinkedHashMap<>();
            for (String pk : pks) {
                pkValues.put(pk, req.getParameter(pk));
            }
            GenericDAO.delete(tableName, pkValues);
            sendSuccess(resp, "Row deleted from " + tableName);
        } catch (Exception e) {
            sendError(resp, e.getMessage(), 500);
        }
    }
}
