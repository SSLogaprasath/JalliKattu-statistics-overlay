package com.jallikattu.filter;

import java.io.IOException;
import java.util.Collection;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.annotation.WebFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/**
 * CORS filter for API endpoints.
 * Allows Ember dev server (localhost:4200) to call Tomcat (localhost:8080).
 */
@WebFilter("/api/*")
public class CorsFilter implements Filter {

    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
            throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) req;
        HttpServletResponse response = (HttpServletResponse) res;

        String origin = request.getHeader("Origin");
        if (origin != null) {
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

        // Add SameSite=None to session cookie for cross-domain requests
        Collection<String> setCookieHeaders = response.getHeaders("Set-Cookie");
        if (setCookieHeaders != null && !setCookieHeaders.isEmpty()) {
            boolean first = true;
            for (String header : setCookieHeaders) {
                if (!header.contains("SameSite")) {
                    header = header + "; SameSite=None";
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
}
