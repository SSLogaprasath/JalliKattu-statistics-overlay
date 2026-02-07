<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<%@ taglib prefix="fn" uri="jakarta.tags.functions" %>
<jsp:include page="includes/header.jsp">
    <jsp:param name="title" value="Registration"/>
    <jsp:param name="active" value="register"/>
</jsp:include>

<div class="topbar">
    <div>
        <h1>Registration &amp; Scheduling</h1>
        <div class="breadcrumb">
            <a href="${pageContext.request.contextPath}/admin/dashboard">Dashboard</a> &rsaquo; Registration
        </div>
    </div>
</div>

<!-- Tab Navigation -->
<div style="display:flex; gap:5px; margin-bottom:20px;">
    <a href="${pageContext.request.contextPath}/admin/register?type=player"
       class="btn ${type == 'player' ? 'btn-primary' : ''}" style="${type != 'player' ? 'background:#e8e8e8;' : ''}">
       &#x1F3C3; Register Player
    </a>
    <a href="${pageContext.request.contextPath}/admin/register?type=bull"
       class="btn ${type == 'bull' ? 'btn-primary' : ''}" style="${type != 'bull' ? 'background:#e8e8e8;' : ''}">
       &#x1F402; Register Bull
    </a>
    <a href="${pageContext.request.contextPath}/admin/register?type=match"
       class="btn ${type == 'match' ? 'btn-primary' : ''}" style="${type != 'match' ? 'background:#e8e8e8;' : ''}">
       &#x1F3C5; Schedule Match
    </a>
</div>

<!-- Messages -->
<c:if test="${param.msg == 'player_registered'}">
    <div class="alert alert-success"><span class="icon">&#x2714;</span> Player registered for match!</div>
</c:if>
<c:if test="${param.msg == 'bull_registered'}">
    <div class="alert alert-success"><span class="icon">&#x2714;</span> Bull registered for match!</div>
</c:if>
<c:if test="${param.msg == 'match_scheduled'}">
    <div class="alert alert-success"><span class="icon">&#x2714;</span> Match scheduled successfully!</div>
</c:if>
<c:if test="${param.msg == 'player_approved'}">
    <div class="alert alert-success"><span class="icon">&#x2714;</span> Player registration approved!</div>
</c:if>
<c:if test="${param.msg == 'bull_approved'}">
    <div class="alert alert-success"><span class="icon">&#x2714;</span> Bull registration approved!</div>
</c:if>
<c:if test="${not empty error}">
    <div class="alert alert-danger"><span class="icon">&#x26A0;</span> ${error}</div>
</c:if>

<!-- Register Player Tab -->
<c:if test="${type == 'player'}">
    <div class="card">
        <div class="card-header"><h3>Register Player for a Match</h3></div>
        <form method="post" action="${pageContext.request.contextPath}/admin/register">
            <input type="hidden" name="action" value="register_player"/>
            <div class="form-grid">
                <div class="form-group">
                    <label>Match <span class="required">*</span></label>
                    <select name="match_id" class="form-control" required>
                        <option value="">-- Select Match --</option>
                        <c:forEach var="m" items="${scheduledMatches}">
                            <option value="${m.match_id}">${m.match_name} (${m.match_date})</option>
                        </c:forEach>
                    </select>
                </div>
                <div class="form-group">
                    <label>Player <span class="required">*</span></label>
                    <select name="player_id" class="form-control" required>
                        <option value="">-- Select Player --</option>
                        <c:forEach var="p" items="${players}">
                            <option value="${p.player_id}">${p.player_id} - ${p.player_name}</option>
                        </c:forEach>
                    </select>
                </div>
                <div class="form-group">
                    <label>Round Type <span class="required">*</span></label>
                    <select name="round_type_id" class="form-control" required>
                        <option value="">-- Select Round --</option>
                        <c:forEach var="r" items="${roundTypes}">
                            <option value="${r.round_type_id}">${r.round_name}</option>
                        </c:forEach>
                    </select>
                </div>
                <div class="form-group">
                    <label>Batch <span class="required">*</span></label>
                    <select name="batch_id" class="form-control" required>
                        <option value="">-- Select Batch --</option>
                        <c:forEach var="b" items="${batches}">
                            <option value="${b.batch_id}">${b.batch_name}</option>
                        </c:forEach>
                    </select>
                </div>
            </div>
            <button type="submit" class="btn btn-success" style="margin-top:10px;">Register Player</button>
        </form>
    </div>

    <!-- Pending Player Registrations -->
    <div class="card">
        <div class="card-header"><h3>Player Registrations</h3></div>
        <div class="table-wrapper">
            <table class="data-table">
                <thead><tr><th>Match</th><th>Player</th><th>Round</th><th>Status</th><th>Action</th></tr></thead>
                <tbody>
                    <c:forEach var="pr" items="${pendingPlayers}">
                        <tr>
                            <td>${pr.match_name}</td>
                            <td>${pr.player_name}</td>
                            <td>${pr.round_name}</td>
                            <td>
                                <span style="background:${pr.status=='approved'?'#28a745':'#ffc107'};
                                             color:${pr.status=='approved'?'white':'#333'};
                                             padding:3px 8px;border-radius:4px;font-size:11px;">
                                    ${pr.status}
                                </span>
                            </td>
                            <td>
                                <c:if test="${pr.status == 'registered'}">
                                    <form method="post" action="${pageContext.request.contextPath}/admin/register" style="display:inline;">
                                        <input type="hidden" name="action" value="approve_player"/>
                                        <input type="hidden" name="match_id" value="${pr.match_id}"/>
                                        <input type="hidden" name="player_id" value="${pr.player_id}"/>
                                        <input type="hidden" name="round_type_id" value="${pr.round_type_id}"/>
                                        <button type="submit" class="btn btn-success btn-sm">Approve</button>
                                    </form>
                                </c:if>
                                <c:if test="${pr.status == 'approved'}">
                                    <span style="color:#28a745;">&#x2714; Approved</span>
                                </c:if>
                            </td>
                        </tr>
                    </c:forEach>
                    <c:if test="${empty pendingPlayers}">
                        <tr><td colspan="5" style="text-align:center;padding:30px;color:#888;">No registrations yet</td></tr>
                    </c:if>
                </tbody>
            </table>
        </div>
    </div>
</c:if>

<!-- Register Bull Tab -->
<c:if test="${type == 'bull'}">
    <div class="card">
        <div class="card-header"><h3>Register Bull for a Match</h3></div>
        <form method="post" action="${pageContext.request.contextPath}/admin/register">
            <input type="hidden" name="action" value="register_bull"/>
            <div class="form-grid">
                <div class="form-group">
                    <label>Match <span class="required">*</span></label>
                    <select name="match_id" class="form-control" required>
                        <option value="">-- Select Match --</option>
                        <c:forEach var="m" items="${scheduledMatches}">
                            <option value="${m.match_id}">${m.match_name} (${m.match_date})</option>
                        </c:forEach>
                    </select>
                </div>
                <div class="form-group">
                    <label>Bull <span class="required">*</span></label>
                    <select name="bull_id" class="form-control" required>
                        <option value="">-- Select Bull --</option>
                        <c:forEach var="b" items="${bulls}">
                            <option value="${b.bull_id}">${b.bull_id} - ${b.bull_name}</option>
                        </c:forEach>
                    </select>
                </div>
                <div class="form-group">
                    <label>Round Type <span class="required">*</span></label>
                    <select name="round_type_id" class="form-control" required>
                        <option value="">-- Select Round --</option>
                        <c:forEach var="r" items="${roundTypes}">
                            <option value="${r.round_type_id}">${r.round_name}</option>
                        </c:forEach>
                    </select>
                </div>
            </div>
            <button type="submit" class="btn btn-success" style="margin-top:10px;">Register Bull</button>
        </form>
    </div>

    <!-- Pending Bull Registrations -->
    <div class="card">
        <div class="card-header"><h3>Bull Registrations</h3></div>
        <div class="table-wrapper">
            <table class="data-table">
                <thead><tr><th>Match</th><th>Bull</th><th>Round</th><th>Status</th><th>Action</th></tr></thead>
                <tbody>
                    <c:forEach var="br" items="${pendingBulls}">
                        <tr>
                            <td>${br.match_name}</td>
                            <td>${br.bull_name}</td>
                            <td>${br.round_name}</td>
                            <td>
                                <span style="background:${br.status=='approved'?'#28a745':'#ffc107'};
                                             color:${br.status=='approved'?'white':'#333'};
                                             padding:3px 8px;border-radius:4px;font-size:11px;">
                                    ${br.status}
                                </span>
                            </td>
                            <td>
                                <c:if test="${br.status == 'registered'}">
                                    <form method="post" action="${pageContext.request.contextPath}/admin/register" style="display:inline;">
                                        <input type="hidden" name="action" value="approve_bull"/>
                                        <input type="hidden" name="match_id" value="${br.match_id}"/>
                                        <input type="hidden" name="bull_id" value="${br.bull_id}"/>
                                        <input type="hidden" name="round_type_id" value="${br.round_type_id}"/>
                                        <button type="submit" class="btn btn-success btn-sm">Approve</button>
                                    </form>
                                </c:if>
                                <c:if test="${br.status == 'approved'}">
                                    <span style="color:#28a745;">&#x2714; Approved</span>
                                </c:if>
                            </td>
                        </tr>
                    </c:forEach>
                    <c:if test="${empty pendingBulls}">
                        <tr><td colspan="5" style="text-align:center;padding:30px;color:#888;">No registrations yet</td></tr>
                    </c:if>
                </tbody>
            </table>
        </div>
    </div>
</c:if>

<!-- Schedule Match Tab -->
<c:if test="${type == 'match'}">
    <div class="card">
        <div class="card-header"><h3>Schedule a New Match</h3></div>
        <form method="post" action="${pageContext.request.contextPath}/admin/register">
            <input type="hidden" name="action" value="schedule_match"/>
            <div class="form-grid">
                <div class="form-group">
                    <label>Match ID <span class="required">*</span></label>
                    <input type="number" name="match_id" class="form-control" required placeholder="Unique ID"/>
                </div>
                <div class="form-group">
                    <label>Match Name <span class="required">*</span></label>
                    <input type="text" name="match_name" class="form-control" required placeholder="e.g. Alanganallur 2026"/>
                </div>
                <div class="form-group">
                    <label>Date <span class="required">*</span></label>
                    <input type="date" name="match_date" class="form-control" required/>
                </div>
                <div class="form-group">
                    <label>Location <span class="required">*</span></label>
                    <select name="location_id" class="form-control" required>
                        <option value="">-- Select Location --</option>
                        <c:forEach var="l" items="${locations}">
                            <option value="${l.location_id}">${l.area}, ${l.district}</option>
                        </c:forEach>
                    </select>
                </div>
                <div class="form-group">
                    <label>Organizer <span class="required">*</span></label>
                    <select name="organizer_id" class="form-control" required>
                        <option value="">-- Select Organizer --</option>
                        <c:forEach var="o" items="${organizers}">
                            <option value="${o.organizer_id}">${o.organizer_name}</option>
                        </c:forEach>
                    </select>
                </div>
                <div class="form-group">
                    <label>Player Limit</label>
                    <input type="number" name="player_limit" class="form-control" placeholder="Max players"/>
                </div>
                <div class="form-group">
                    <label>Bull Limit</label>
                    <input type="number" name="bull_limit" class="form-control" placeholder="Max bulls"/>
                </div>
            </div>
            <button type="submit" class="btn btn-success" style="margin-top:10px;">Schedule Match</button>
        </form>
    </div>

    <!-- Scheduled Matches -->
    <div class="card">
        <div class="card-header"><h3>Scheduled Matches</h3></div>
        <div class="table-wrapper">
            <table class="data-table">
                <thead><tr><th>ID</th><th>Name</th><th>Date</th><th>Location</th><th>Status</th></tr></thead>
                <tbody>
                    <c:forEach var="m" items="${matches}">
                        <tr>
                            <td>${m.match_id}</td>
                            <td><strong>${m.match_name}</strong></td>
                            <td>${m.match_date}</td>
                            <td>${m.location_id}</td>
                            <td>
                                <span style="background:${m.status=='Completed'?'#28a745':m.status=='Live'?'#e94560':'#ffc107'};
                                             color:${m.status=='Scheduled'?'#333':'white'};
                                             padding:3px 8px;border-radius:4px;font-size:11px;">
                                    ${m.status}
                                </span>
                            </td>
                        </tr>
                    </c:forEach>
                    <c:if test="${empty matches}">
                        <tr><td colspan="5" style="text-align:center;padding:30px;color:#888;">No matches yet</td></tr>
                    </c:if>
                </tbody>
            </table>
        </div>
    </div>
</c:if>

<jsp:include page="includes/footer.jsp"/>
