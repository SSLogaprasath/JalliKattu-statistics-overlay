<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<%@ taglib prefix="fn" uri="jakarta.tags.functions" %>
<jsp:include page="includes/header.jsp">
    <jsp:param name="title" value="Manage Users"/>
    <jsp:param name="active" value="users"/>
</jsp:include>

<div class="topbar">
    <div>
        <h1>Manage Users</h1>
        <div class="breadcrumb">
            <a href="${pageContext.request.contextPath}/admin/dashboard">Dashboard</a> &rsaquo; Users
        </div>
    </div>
</div>

<c:if test="${param.msg == 'created'}">
    <div class="alert alert-success"><span class="icon">&#x2714;</span> User created successfully!</div>
</c:if>
<c:if test="${param.msg == 'deleted'}">
    <div class="alert alert-success"><span class="icon">&#x2714;</span> User deleted successfully!</div>
</c:if>
<c:if test="${not empty error}">
    <div class="alert alert-danger"><span class="icon">&#x26A0;</span> ${error}</div>
</c:if>

<!-- Create User Form -->
<div class="card">
    <div class="card-header"><h3>Add New User</h3></div>
    <form method="post" action="${pageContext.request.contextPath}/admin/users">
        <div class="form-grid">
            <div class="form-group">
                <label>Username <span class="required">*</span></label>
                <input type="text" name="username" class="form-control" required placeholder="Unique username"/>
            </div>
            <div class="form-group">
                <label>Password <span class="required">*</span></label>
                <input type="password" name="password" class="form-control" required placeholder="Min 6 characters"/>
            </div>
            <div class="form-group">
                <label>Full Name <span class="required">*</span></label>
                <input type="text" name="full_name" class="form-control" required placeholder="Display name"/>
            </div>
            <div class="form-group">
                <label>Role <span class="required">*</span></label>
                <select name="role" class="form-control" required>
                    <option value="">-- Select Role --</option>
                    <option value="admin">Admin (Full access)</option>
                    <option value="registrar">Registrar (Register players/bulls/matches)</option>
                    <option value="scorer">Scorer (Update scores)</option>
                </select>
            </div>
        </div>
        <button type="submit" class="btn btn-success" style="margin-top:10px;">Create User</button>
    </form>
</div>

<!-- Users List -->
<div class="card">
    <div class="card-header"><h3>${fn:length(users)} user(s)</h3></div>
    <div class="table-wrapper">
        <table class="data-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Full Name</th>
                    <th>Role</th>
                    <th>Created</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <c:forEach var="user" items="${users}">
                    <tr>
                        <td>${user.user_id}</td>
                        <td><strong>${user.username}</strong></td>
                        <td>${user.full_name}</td>
                        <td>
                            <span style="background:${user.role=='admin'?'#e94560':user.role=='registrar'?'#28a745':'#ffc107'};
                                         color:${user.role=='scorer'?'#333':'white'};
                                         padding:3px 8px;border-radius:4px;font-size:11px;font-weight:600;">
                                ${user.role}
                            </span>
                        </td>
                        <td>${user.created_time}</td>
                        <td>
                            <a href="${pageContext.request.contextPath}/admin/users?action=delete&user_id=${user.user_id}"
                               class="btn btn-danger btn-sm"
                               onclick="return confirm('Delete user ${user.username}?');">Delete</a>
                        </td>
                    </tr>
                </c:forEach>
            </tbody>
        </table>
    </div>
</div>

<jsp:include page="includes/footer.jsp"/>
