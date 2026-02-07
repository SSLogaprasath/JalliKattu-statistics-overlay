<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<jsp:include page="includes/header.jsp">
    <jsp:param name="title" value="Dashboard"/>
    <jsp:param name="active" value="dashboard"/>
</jsp:include>

<!-- Topbar -->
<div class="topbar">
    <div>
        <h1>Dashboard</h1>
        <div class="breadcrumb">Welcome to the Jallikattu Admin Panel</div>
    </div>
    <div style="font-size:13px; color:#888;">
        mydb &bull; ${totalTables} tables &bull; ${totalRecords} records
    </div>
</div>

<c:if test="${not empty error}">
    <div class="alert alert-danger"><span class="icon">&#x26A0;</span> ${error}</div>
</c:if>

<!-- Overview Cards -->
<div class="stats-grid">
    <a href="${pageContext.request.contextPath}/admin/table?name=player" class="stat-card">
        <div class="stat-icon bg-blue">&#x1F3C3;</div>
        <div class="stat-info">
            <h4>${stats['player']}</h4>
            <p>Players</p>
        </div>
    </a>
    <a href="${pageContext.request.contextPath}/admin/table?name=bull_table" class="stat-card">
        <div class="stat-icon bg-red">&#x1F402;</div>
        <div class="stat-info">
            <h4>${stats['bull_table']}</h4>
            <p>Bulls</p>
        </div>
    </a>
    <a href="${pageContext.request.contextPath}/admin/table?name=match" class="stat-card">
        <div class="stat-icon bg-green">&#x1F3C5;</div>
        <div class="stat-info">
            <h4>${stats['match']}</h4>
            <p>Matches</p>
        </div>
    </a>
    <a href="${pageContext.request.contextPath}/admin/table?name=owner" class="stat-card">
        <div class="stat-icon bg-orange">&#x1F464;</div>
        <div class="stat-info">
            <h4>${stats['owner']}</h4>
            <p>Owners</p>
        </div>
    </a>
    <a href="${pageContext.request.contextPath}/admin/table?name=organizer" class="stat-card">
        <div class="stat-icon bg-purple">&#x1F3DB;</div>
        <div class="stat-info">
            <h4>${stats['organizer']}</h4>
            <p>Organizers</p>
        </div>
    </a>
    <a href="${pageContext.request.contextPath}/admin/table?name=bull_player_interaction" class="stat-card">
        <div class="stat-icon bg-teal">&#x26A1;</div>
        <div class="stat-info">
            <h4>${stats['bull_player_interaction']}</h4>
            <p>Interactions</p>
        </div>
    </a>
</div>

<!-- All Tables Overview -->
<div class="card">
    <div class="card-header">
        <h3>All Tables Overview</h3>
    </div>
    <div class="table-wrapper">
        <table class="data-table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Table Name</th>
                    <th>Records</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <c:set var="idx" value="0"/>
                <c:forEach var="entry" items="${stats}">
                    <c:set var="idx" value="${idx + 1}"/>
                    <tr>
                        <td>${idx}</td>
                        <td><strong>${entry.key}</strong></td>
                        <td>${entry.value}</td>
                        <td>
                            <a href="${pageContext.request.contextPath}/admin/table?name=${entry.key}" class="btn btn-primary btn-sm">
                                View &rarr;
                            </a>
                        </td>
                    </tr>
                </c:forEach>
            </tbody>
        </table>
    </div>
</div>

<jsp:include page="includes/footer.jsp"/>
