<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - Jallikattu Admin</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
            min-height: 100vh; display: flex; align-items: center; justify-content: center;
        }
        .login-container {
            background: white; border-radius: 16px; padding: 40px;
            width: 400px; box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }
        .login-header { text-align: center; margin-bottom: 30px; }
        .login-header .logo { font-size: 48px; margin-bottom: 10px; }
        .login-header h1 { font-size: 22px; color: #1a1a2e; }
        .login-header p { color: #888; font-size: 13px; margin-top: 5px; }
        .form-group { margin-bottom: 20px; }
        .form-group label {
            display: block; margin-bottom: 6px; font-weight: 600;
            font-size: 13px; color: #555;
        }
        .form-control {
            width: 100%; padding: 12px 15px; border: 2px solid #e8e8e8;
            border-radius: 8px; font-size: 14px; transition: border 0.3s;
        }
        .form-control:focus { outline: none; border-color: #e94560; }
        .btn-login {
            width: 100%; padding: 14px; background: #e94560; color: white;
            border: none; border-radius: 8px; font-size: 16px; font-weight: 600;
            cursor: pointer; transition: background 0.3s;
        }
        .btn-login:hover { background: #d63851; }
        .alert {
            padding: 12px 16px; border-radius: 8px; margin-bottom: 20px;
            font-size: 13px; background: #f8d7da; color: #721c24;
            border: 1px solid #f5c6cb;
        }
        .login-footer { text-align: center; margin-top: 20px; color: #aaa; font-size: 12px; }
    </style>
</head>
<body>
    <div class="login-container">
        <div class="login-header">
            <div class="logo">&#x1F402;</div>
            <h1>Jallikattu Admin</h1>
            <p>Sign in to manage the system</p>
        </div>

        <c:if test="${not empty error}">
            <div class="alert">${error}</div>
        </c:if>

        <form method="post" action="${pageContext.request.contextPath}/login">
            <div class="form-group">
                <label>Username</label>
                <input type="text" name="username" class="form-control" placeholder="Enter username" required autofocus/>
            </div>
            <div class="form-group">
                <label>Password</label>
                <input type="password" name="password" class="form-control" placeholder="Enter password" required/>
            </div>
            <button type="submit" class="btn-login">Sign In</button>
        </form>

        <div class="login-footer">
            Default: admin / admin123
        </div>
    </div>
</body>
</html>
