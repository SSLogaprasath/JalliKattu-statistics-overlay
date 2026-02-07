<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    // If already logged in, go to dashboard; otherwise go to login
    if (session.getAttribute("username") != null) {
        response.sendRedirect(request.getContextPath() + "/admin/dashboard");
    } else {
        response.sendRedirect(request.getContextPath() + "/login");
    }
%>
