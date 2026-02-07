<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<jsp:include page="includes/header.jsp">
    <jsp:param name="title" value="${mode == 'edit' ? 'Edit' : 'Add'} - ${tableName}"/>
    <jsp:param name="active" value="${tableName}"/>
</jsp:include>

<!-- Topbar -->
<div class="topbar">
    <div>
        <h1>${mode == 'edit' ? 'Edit Record' : 'Add New Record'}</h1>
        <div class="breadcrumb">
            <a href="${pageContext.request.contextPath}/admin/dashboard">Dashboard</a> &rsaquo;
            <a href="${pageContext.request.contextPath}/admin/table?name=${tableName}">${tableName}</a> &rsaquo;
            ${mode == 'edit' ? 'Edit' : 'Add'}
        </div>
    </div>
</div>

<c:if test="${not empty error}">
    <div class="alert alert-danger"><span class="icon">&#x26A0;</span> ${error}</div>
</c:if>

<!-- Form -->
<div class="card">
    <div class="card-header">
        <h3>${mode == 'edit' ? 'Edit' : 'New'} ${tableName}</h3>
    </div>
    
    <form method="post" action="${pageContext.request.contextPath}/admin/table?name=${tableName}">
        <input type="hidden" name="name" value="${tableName}"/>
        <input type="hidden" name="mode" value="${mode}"/>
        
        <%-- Store original PK values for edit mode --%>
        <c:if test="${mode == 'edit'}">
            <c:forEach var="col" items="${columns}">
                <c:if test="${col.isPK == 'YES'}">
                    <input type="hidden" name="origpk_${col.name}" value="${row[col.name]}"/>
                </c:if>
            </c:forEach>
        </c:if>
        
        <div class="form-grid">
            <c:forEach var="col" items="${columns}">
                <div class="form-group">
                    <label>
                        ${col.name}
                        <c:if test="${col.isPK == 'YES'}"><span class="pk-badge">PK</span></c:if>
                        <c:if test="${col.nullable == 'NO'}"><span class="required">*</span></c:if>
                        <span class="type-info">(${col.type})</span>
                    </label>
                    
                    <c:choose>
                        <%-- FK columns: show dropdown --%>
                        <c:when test="${not empty lookups[col.name]}">
                            <select name="col_${col.name}" class="form-control"
                                ${mode == 'edit' && col.isPK == 'YES' ? 'disabled' : ''}>
                                <option value="">-- Select --</option>
                                <c:forEach var="lookupRow" items="${lookups[col.name]}">
                                    <c:set var="lookupValues" value=""/>
                                    <c:set var="lookupId" value=""/>
                                    <c:forEach var="lookupEntry" items="${lookupRow}" varStatus="lStat">
                                        <c:if test="${lStat.first}">
                                            <c:set var="lookupId" value="${lookupEntry.value}"/>
                                        </c:if>
                                        <c:if test="${!lStat.first}">
                                            <c:set var="lookupValues" value="${lookupValues} ${lookupEntry.value}"/>
                                        </c:if>
                                    </c:forEach>
                                    <option value="${lookupId}"
                                        <c:if test="${mode == 'edit' && row[col.name] == lookupId}">selected</c:if>
                                    >${lookupId} - ${lookupValues}</option>
                                </c:forEach>
                            </select>
                            <%-- Hidden field for disabled PK FK selects in edit mode --%>
                            <c:if test="${mode == 'edit' && col.isPK == 'YES'}">
                                <input type="hidden" name="col_${col.name}" value="${row[col.name]}"/>
                            </c:if>
                        </c:when>
                        
                        <%-- Auto-increment PK in add mode --%>
                        <c:when test="${col.autoIncrement == 'YES' && mode != 'edit'}">
                            <input type="text" name="col_${col.name}" class="form-control"
                                   placeholder="Auto-generated (leave blank)"
                                   value=""/>
                        </c:when>
                        
                        <%-- PK in edit mode: read-only --%>
                        <c:when test="${col.isPK == 'YES' && mode == 'edit'}">
                            <input type="text" class="form-control" value="${row[col.name]}" disabled/>
                            <input type="hidden" name="col_${col.name}" value="${row[col.name]}"/>
                        </c:when>
                        
                        <%-- Date field --%>
                        <c:when test="${col.type == 'DATE'}">
                            <input type="date" name="col_${col.name}" class="form-control"
                                   value="${mode == 'edit' ? row[col.name] : ''}"
                                   ${col.nullable == 'NO' ? 'required' : ''}/>
                        </c:when>
                        
                        <%-- Default text input --%>
                        <c:otherwise>
                            <input type="text" name="col_${col.name}" class="form-control"
                                   value="${mode == 'edit' ? row[col.name] : ''}"
                                   placeholder="${col.type}(${col.size})"
                                   ${col.nullable == 'NO' && col.autoIncrement != 'YES' ? 'required' : ''}/>
                        </c:otherwise>
                    </c:choose>
                </div>
            </c:forEach>
        </div>
        
        <div style="margin-top: 20px; display: flex; gap: 10px;">
            <button type="submit" class="btn btn-primary">
                ${mode == 'edit' ? 'Update Record' : 'Add Record'}
            </button>
            <a href="${pageContext.request.contextPath}/admin/table?name=${tableName}" class="btn" style="background:#eee;">
                Cancel
            </a>
        </div>
    </form>
</div>

<jsp:include page="includes/footer.jsp"/>
