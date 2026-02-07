package com.jallikattu.util;

import java.sql.*;
import java.util.*;

/**
 * Generic DAO that provides CRUD operations for any table in the database.
 */
public class GenericDAO {

    /**
     * Get column metadata for a table.
     */
    public static List<Map<String, String>> getColumns(String tableName) throws SQLException {
        List<Map<String, String>> columns = new ArrayList<>();
        try (Connection conn = DBConnection.getConnection()) {
            DatabaseMetaData meta = conn.getMetaData();
            // Get primary keys
            Set<String> pkColumns = new HashSet<>();
            try (ResultSet pkRs = meta.getPrimaryKeys(null, "mydb", tableName)) {
                while (pkRs.next()) {
                    pkColumns.add(pkRs.getString("COLUMN_NAME"));
                }
            }
            // Get all columns
            try (ResultSet rs = meta.getColumns(null, "mydb", tableName, null)) {
                while (rs.next()) {
                    Map<String, String> col = new LinkedHashMap<>();
                    col.put("name", rs.getString("COLUMN_NAME"));
                    col.put("type", rs.getString("TYPE_NAME"));
                    col.put("size", rs.getString("COLUMN_SIZE"));
                    col.put("nullable", rs.getString("IS_NULLABLE"));
                    col.put("isPK", pkColumns.contains(rs.getString("COLUMN_NAME")) ? "YES" : "NO");
                    col.put("autoIncrement", rs.getString("IS_AUTOINCREMENT"));
                    columns.add(col);
                }
            }
        }
        return columns;
    }

    /**
     * Get primary key column names for a table.
     */
    public static List<String> getPrimaryKeys(String tableName) throws SQLException {
        List<String> pks = new ArrayList<>();
        try (Connection conn = DBConnection.getConnection()) {
            DatabaseMetaData meta = conn.getMetaData();
            try (ResultSet rs = meta.getPrimaryKeys(null, "mydb", tableName)) {
                while (rs.next()) {
                    pks.add(rs.getString("COLUMN_NAME"));
                }
            }
        }
        return pks;
    }

    /**
     * Get foreign key info for a table (which columns reference which parent tables).
     */
    public static List<Map<String, String>> getForeignKeys(String tableName) throws SQLException {
        List<Map<String, String>> fks = new ArrayList<>();
        try (Connection conn = DBConnection.getConnection()) {
            DatabaseMetaData meta = conn.getMetaData();
            try (ResultSet rs = meta.getImportedKeys(null, "mydb", tableName)) {
                while (rs.next()) {
                    Map<String, String> fk = new LinkedHashMap<>();
                    fk.put("fkColumn", rs.getString("FKCOLUMN_NAME"));
                    fk.put("pkTable", rs.getString("PKTABLE_NAME"));
                    fk.put("pkColumn", rs.getString("PKCOLUMN_NAME"));
                    fks.add(fk);
                }
            }
        }
        return fks;
    }

    /**
     * Get lookup values for a referenced table (for FK dropdowns).
     */
    public static List<Map<String, Object>> getLookupValues(String tableName) throws SQLException {
        List<Map<String, Object>> rows = new ArrayList<>();
        try (Connection conn = DBConnection.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery("SELECT * FROM `" + tableName + "`")) {
            ResultSetMetaData meta = rs.getMetaData();
            int colCount = meta.getColumnCount();
            while (rs.next()) {
                Map<String, Object> row = new LinkedHashMap<>();
                for (int i = 1; i <= colCount; i++) {
                    row.put(meta.getColumnName(i), rs.getObject(i));
                }
                rows.add(row);
            }
        }
        return rows;
    }

    /**
     * Get all rows from a table.
     */
    public static List<Map<String, Object>> getAll(String tableName) throws SQLException {
        List<Map<String, Object>> rows = new ArrayList<>();
        try (Connection conn = DBConnection.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery("SELECT * FROM `" + tableName + "`")) {
            ResultSetMetaData meta = rs.getMetaData();
            int colCount = meta.getColumnCount();
            while (rs.next()) {
                Map<String, Object> row = new LinkedHashMap<>();
                for (int i = 1; i <= colCount; i++) {
                    row.put(meta.getColumnName(i), rs.getObject(i));
                }
                rows.add(row);
            }
        }
        return rows;
    }

    /**
     * Get a single row by primary key(s).
     */
    public static Map<String, Object> getByPK(String tableName, Map<String, String> pkValues) throws SQLException {
        List<String> pks = getPrimaryKeys(tableName);
        StringBuilder sql = new StringBuilder("SELECT * FROM `" + tableName + "` WHERE ");
        List<String> conditions = new ArrayList<>();
        for (String pk : pks) {
            conditions.add("`" + pk + "` = ?");
        }
        sql.append(String.join(" AND ", conditions));

        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql.toString())) {
            int idx = 1;
            for (String pk : pks) {
                ps.setString(idx++, pkValues.get(pk));
            }
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    Map<String, Object> row = new LinkedHashMap<>();
                    ResultSetMetaData meta = rs.getMetaData();
                    for (int i = 1; i <= meta.getColumnCount(); i++) {
                        row.put(meta.getColumnName(i), rs.getObject(i));
                    }
                    return row;
                }
            }
        }
        return null;
    }

    /**
     * Insert a new row.
     */
    public static void insert(String tableName, Map<String, String> values) throws SQLException {
        List<Map<String, String>> columns = getColumns(tableName);
        List<String> colNames = new ArrayList<>();
        List<String> placeholders = new ArrayList<>();
        List<String> colValues = new ArrayList<>();

        for (Map<String, String> col : columns) {
            String colName = col.get("name");
            String val = values.get(colName);
            // Skip auto-increment columns with no value
            if ("YES".equals(col.get("autoIncrement")) && (val == null || val.isEmpty())) {
                continue;
            }
            if (val != null && !val.isEmpty()) {
                colNames.add("`" + colName + "`");
                placeholders.add("?");
                colValues.add(val);
            }
        }

        String sql = "INSERT INTO `" + tableName + "` (" + String.join(", ", colNames) +
                     ") VALUES (" + String.join(", ", placeholders) + ")";

        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            for (int i = 0; i < colValues.size(); i++) {
                ps.setString(i + 1, colValues.get(i));
            }
            ps.executeUpdate();
        }
    }

    /**
     * Update an existing row identified by its primary keys.
     */
    public static void update(String tableName, Map<String, String> values, Map<String, String> pkValues) throws SQLException {
        List<String> pks = getPrimaryKeys(tableName);
        List<Map<String, String>> columns = getColumns(tableName);

        List<String> setClauses = new ArrayList<>();
        List<String> setValues = new ArrayList<>();

        for (Map<String, String> col : columns) {
            String colName = col.get("name");
            if (pks.contains(colName)) continue; // Don't update PK columns
            String val = values.get(colName);
            if (val != null) {
                setClauses.add("`" + colName + "` = ?");
                setValues.add(val.isEmpty() ? null : val);
            }
        }

        List<String> whereConditions = new ArrayList<>();
        for (String pk : pks) {
            whereConditions.add("`" + pk + "` = ?");
        }

        String sql = "UPDATE `" + tableName + "` SET " + String.join(", ", setClauses) +
                     " WHERE " + String.join(" AND ", whereConditions);

        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            int idx = 1;
            for (String val : setValues) {
                if (val == null) {
                    ps.setNull(idx++, java.sql.Types.VARCHAR);
                } else {
                    ps.setString(idx++, val);
                }
            }
            for (String pk : pks) {
                ps.setString(idx++, pkValues.get(pk));
            }
            ps.executeUpdate();
        }
    }

    /**
     * Delete a row by its primary key(s).
     */
    public static void delete(String tableName, Map<String, String> pkValues) throws SQLException {
        List<String> pks = getPrimaryKeys(tableName);
        List<String> conditions = new ArrayList<>();
        for (String pk : pks) {
            conditions.add("`" + pk + "` = ?");
        }

        String sql = "DELETE FROM `" + tableName + "` WHERE " + String.join(" AND ", conditions);

        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            int idx = 1;
            for (String pk : pks) {
                ps.setString(idx++, pkValues.get(pk));
            }
            ps.executeUpdate();
        }
    }

    /**
     * Get table names in the database.
     */
    public static List<String> getAllTableNames() throws SQLException {
        List<String> tables = new ArrayList<>();
        try (Connection conn = DBConnection.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(
                "SELECT table_name FROM information_schema.tables WHERE table_schema = 'mydb' ORDER BY table_name")) {
            while (rs.next()) {
                tables.add(rs.getString(1));
            }
        }
        return tables;
    }

    /**
     * Get row count for a table.
     */
    public static int getRowCount(String tableName) throws SQLException {
        try (Connection conn = DBConnection.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery("SELECT COUNT(*) FROM `" + tableName + "`")) {
            rs.next();
            return rs.getInt(1);
        }
    }

    /**
     * Get dashboard stats.
     */
    public static Map<String, Integer> getDashboardStats() throws SQLException {
        Map<String, Integer> stats = new LinkedHashMap<>();
        List<String> tables = getAllTableNames();
        for (String table : tables) {
            stats.put(table, getRowCount(table));
        }
        return stats;
    }
}
