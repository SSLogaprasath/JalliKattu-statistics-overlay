package com.jallikattu.filter;

import java.io.IOException;
import java.util.Collection;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/**
 * CORS filter for API endpoints.
 * Allows cross-origin requests from jallikattu.co.in and dev servers.
 * Registered in web.xml to ensure it runs BEFORE AuthFilter.
 */
public class CorsFilter implements Filter {

    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
            throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) req;
        HttpServletResponse response = (HttpServletResponse) res;

        String origin = request.getHeader("Origin");
        if (origin != null && isAllowedOrigin(origin)) {
            response.setHeader("Access-Control-Allow-Origin", origin);
            response.setHeader("Access-Control-Allow-Credentials", "true");
            response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
            response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
            response.setHeader("Access-Control-Max-Age", "3600");
        }

        // Handle preflight
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            response.setStatus(200);
            return;
        }

        chain.doFilter(req, res);

        // Set cookie domain to .jallikattu.co.in so cookies work across subdomains
        Collection<String> setCookieHeaders = response.getHeaders("Set-Cookie");
        if (setCookieHeaders != null && !setCookieHeaders.isEmpty()) {
            String cookieDomain = System.getenv("COOKIE_DOMAIN");
            boolean first = true;
            for (String header : setCookieHeaders) {
                if (!header.contains("SameSite")) {
                    header = header + "; SameSite=None; Secure";
                }
                if (cookieDomain != null && !header.contains("Domain=")) {
                    header = header + "; Domain=" + cookieDomain;
                }
                if (first) {
                    response.setHeader("Set-Cookie", header);
                    first = false;
                } else {
                    response.addHeader("Set-Cookie", header);
                }
            }
        }
    }

    private boolean isAllowedOrigin(String origin) {
        // Allow jallikattu.co.in and subdomains
        if (origin.endsWith(".jallikattu.co.in") || origin.equals("https://jallikattu.co.in")) {
            return true;
        }
        // Allow localhost for development
        if (origin.contains("localhost") || origin.contains("127.0.0.1")) {
            return true;
        }
        // Allow Render domain as fallback
        if (origin.contains("onrender.com") || origin.contains("workers.dev")) {
            return true;
        }
        return false;
    }
}
