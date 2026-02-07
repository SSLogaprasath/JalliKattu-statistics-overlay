<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<%@ taglib prefix="fn" uri="jakarta.tags.functions" %>
<jsp:include page="includes/header.jsp">
    <jsp:param name="title" value="${tableName}"/>
    <jsp:param name="active" value="${tableName}"/>
</jsp:include>

<!-- Topbar -->
<div class="topbar">
    <div>
        <h1>${tableName}</h1>
        <div class="breadcrumb">
            <a href="${pageContext.request.contextPath}/admin/dashboard">Dashboard</a> &rsaquo; ${tableName}
        </div>
    </div>
    <div>
        <a href="${pageContext.request.contextPath}/admin/table?name=${tableName}&action=add" class="btn btn-success">
            <span class="icon">+</span> Add New Record
        </a>
    </div>
</div>

<!-- Messages -->
<c:if test="${param.msg == 'added'}">
    <div class="alert alert-success"><span class="icon">&#x2714;</span> Record added successfully!</div>
</c:if>
<c:if test="${param.msg == 'updated'}">
    <div class="alert alert-success"><span class="icon">&#x2714;</span> Record updated successfully!</div>
</c:if>
<c:if test="${param.msg == 'deleted'}">
    <div class="alert alert-success"><span class="icon">&#x2714;</span> Record deleted successfully!</div>
</c:if>
<c:if test="${not empty error}">
    <div class="alert alert-danger"><span class="icon">&#x26A0;</span> ${error}</div>
</c:if>

<!-- Data Table -->
<div class="card">
    <div class="card-header">
        <h3>${fn:length(rows)} record(s) found</h3>
    </div>
    <div class="table-wrapper">
        <table class="data-table">
            <thead>
                <tr>
                    <c:forEach var="col" items="${columns}">
                        <th>
                            ${col.name}
                            <c:if test="${col.isPK == 'YES'}">
                                <span style="color:#e94560; font-size:10px;">PK</span>
                            </c:if>
                        </th>
                    </c:forEach>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <c:choose>
                    <c:when test="${empty rows}">
                        <tr>
                            <td colspan="${fn:length(columns) + 1}" style="text-align:center; padding:40px; color:#888;">
                                No records found. <a href="${pageContext.request.contextPath}/admin/table?name=${tableName}&action=add">Add one?</a>
                            </td>
                        </tr>
                    </c:when>
                    <c:otherwise>
                        <c:forEach var="row" items="${rows}">
                            <tr>
                                <c:forEach var="col" items="${columns}">
                                    <td title="${row[col.name]}">${row[col.name]}</td>
                                </c:forEach>
                                <td style="white-space:nowrap;">
                                    <%-- Build edit/delete links with PK params --%>
                                    <c:set var="pkParams" value=""/>
                                    <c:forEach var="pk" items="${pks}">
                                        <c:set var="pkParams" value="${pkParams}&${pk}=${row[pk]}"/>
                                    </c:forEach>
                                    <a href="${pageContext.request.contextPath}/admin/table?name=${tableName}&action=edit${pkParams}"
                                       class="btn btn-warning btn-sm">Edit</a>
                                    <a href="${pageContext.request.contextPath}/admin/table?name=${tableName}&action=delete${pkParams}"
                                       class="btn btn-danger btn-sm"
                                       onclick="return confirm('Are you sure you want to delete this record?');"
                                    >Delete</a>
                                </td>
                            </tr>
                        </c:forEach>
                    </c:otherwise>
                </c:choose>
            </tbody>
        </table>
    </div>
</div>

<jsp:include page="includes/footer.jsp"/>
