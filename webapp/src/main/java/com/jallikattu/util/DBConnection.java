package com.jallikattu.util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DBConnection {
    private static final String URL;
    private static final String USER;
    private static final String PASSWORD;

    static {
        // Read from environment variables, fall back to local defaults for dev
        String envUrl = System.getenv("DB_URL");
        String envUser = System.getenv("DB_USER");
        String envPass = System.getenv("DB_PASSWORD");

        URL = (envUrl != null && !envUrl.isEmpty())
                ? envUrl
                : "jdbc:mysql://localhost:3306/mydb?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC";
        USER = (envUser != null && !envUser.isEmpty()) ? envUser : "root";
        PASSWORD = (envPass != null && !envPass.isEmpty()) ? envPass : "Logan@1804";

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            throw new RuntimeException("MySQL JDBC Driver not found", e);
        }
    }

    public static Connection getConnection() throws SQLException {
        return DriverManager.getConnection(URL, USER, PASSWORD);
    }
}
