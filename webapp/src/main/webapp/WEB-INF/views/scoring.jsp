<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<%@ taglib prefix="fn" uri="jakarta.tags.functions" %>
<jsp:include page="includes/header.jsp">
    <jsp:param name="title" value="Live Scoring"/>
    <jsp:param name="active" value="scoring"/>
</jsp:include>

<div class="topbar">
    <div>
        <h1>&#x1F534; Live Scoring</h1>
        <div class="breadcrumb">
            <a href="${pageContext.request.contextPath}/admin/dashboard">Dashboard</a> &rsaquo; Scoring
        </div>
    </div>
</div>

<!-- Messages -->
<c:if test="${param.msg == 'match_live'}"><div class="alert alert-success"><span class="icon">&#x2714;</span> Match is now LIVE!</div></c:if>
<c:if test="${param.msg == 'match_completed'}"><div class="alert alert-success"><span class="icon">&#x2714;</span> Match marked as completed!</div></c:if>
<c:if test="${param.msg == 'score_updated'}"><div class="alert alert-success"><span class="icon">&#x2714;</span> Player score updated!</div></c:if>
<c:if test="${param.msg == 'bull_score_updated'}"><div class="alert alert-success"><span class="icon">&#x2714;</span> Bull score updated!</div></c:if>
<c:if test="${param.msg == 'interaction_added'}"><div class="alert alert-success"><span class="icon">&#x2714;</span> Interaction recorded!</div></c:if>
<c:if test="${not empty error}"><div class="alert alert-danger"><span class="icon">&#x26A0;</span> ${error}</div></c:if>

<!-- Match Selector -->
<div class="card">
    <div class="card-header"><h3>Select Match</h3></div>
    <div style="display:flex; gap:10px; align-items:center; flex-wrap:wrap;">
        <c:forEach var="m" items="${allMatches}">
            <c:if test="${m.status != 'Completed'}">
                <a href="${pageContext.request.contextPath}/admin/scoring?match_id=${m.match_id}"
                   class="btn ${m.match_id == selectedMatch ? 'btn-primary' : ''}"
                   style="${m.match_id != selectedMatch ? 'background:#e8e8e8;' : ''}">
                    ${m.match_name}
                    <span style="background:${m.status=='Live'?'#e94560':'#ffc107'};
                                 color:${m.status=='Scheduled'?'#333':'white'};
                                 padding:2px 6px;border-radius:3px;font-size:10px;margin-left:5px;">
                        ${m.status}
                    </span>
                </a>
            </c:if>
        </c:forEach>
    </div>
</div>

<c:if test="${not empty selectedMatch}">
    <!-- Match Controls — show only relevant buttons -->
    <div class="card" style="display:flex; gap:10px; align-items:center;">
        <c:choose>
            <c:when test="${matchStatus == 'Scheduled'}">
                <form method="post" action="${pageContext.request.contextPath}/admin/scoring" style="display:inline;">
                    <input type="hidden" name="match_id" value="${selectedMatch}"/>
                    <input type="hidden" name="action" value="set_live"/>
                    <button type="submit" class="btn btn-danger">&#x1F534; Set LIVE</button>
                </form>
                <span style="color:#888;font-size:14px;">This match is scheduled. Set it live to start scoring.</span>
            </c:when>
            <c:when test="${matchStatus == 'Live'}">
                <span style="background:#e94560;color:white;padding:6px 14px;border-radius:6px;font-weight:bold;font-size:14px;animation:pulse 1.5s infinite;">
                    &#x1F534; LIVE
                </span>
                <form method="post" action="${pageContext.request.contextPath}/admin/scoring" style="display:inline;">
                    <input type="hidden" name="match_id" value="${selectedMatch}"/>
                    <input type="hidden" name="action" value="set_completed"/>
                    <button type="submit" class="btn btn-success" onclick="return confirm('Mark match as completed? Scoring will be locked.');">&#x2714; Mark Completed</button>
                </form>
            </c:when>
            <c:when test="${matchStatus == 'Completed'}">
                <span style="background:#28a745;color:white;padding:6px 14px;border-radius:6px;font-weight:bold;font-size:14px;">
                    &#x2714; Completed
                </span>
                <span style="color:#888;font-size:14px;">This match is completed. View results on the Winners page.</span>
            </c:when>
        </c:choose>
    </div>

    <!-- Only show scoring sections for Live matches -->
    <c:if test="${matchStatus == 'Live'}">

    <!-- Live Leaderboards -->
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px;">
        <!-- Top Players -->
        <div class="card" style="margin-bottom:0;">
            <div class="card-header"><h3>&#x1F3C6; Top Players (Live)</h3></div>
            <div class="table-wrapper">
                <table class="data-table" style="font-size:13px;">
                    <thead><tr><th>#</th><th>Player</th><th>Batch</th><th>Caught</th><th>Penalties</th><th>Net Score</th></tr></thead>
                    <tbody>
                        <c:forEach var="tp" items="${topPlayers}" varStatus="rank">
                            <tr style="${rank.index == 0 ? 'background:#fff9e6;font-weight:bold;' : rank.index == 1 ? 'background:#f5f5f5;' : rank.index == 2 ? 'background:#fdf2ee;' : ''}">
                                <td>
                                    <c:choose>
                                        <c:when test="${rank.index == 0}">&#x1F947;</c:when>
                                        <c:when test="${rank.index == 1}">&#x1F948;</c:when>
                                        <c:when test="${rank.index == 2}">&#x1F949;</c:when>
                                        <c:otherwise>${rank.index + 1}</c:otherwise>
                                    </c:choose>
                                </td>
                                <td>${tp.player_name} <span style="color:#888;font-size:11px;">#${tp.player_id}</span></td>
                                <td>${tp.batch_name}</td>
                                <td style="color:#28a745;font-weight:bold;">${tp.total_caught}</td>
                                <td style="color:#e94560;">${tp.total_penalties}</td>
                                <td><strong>${tp.net_score}</strong></td>
                            </tr>
                        </c:forEach>
                        <c:if test="${empty topPlayers}">
                            <tr><td colspan="6" style="text-align:center;padding:15px;color:#888;">No scores yet</td></tr>
                        </c:if>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Top Bulls -->
        <div class="card" style="margin-bottom:0;">
            <div class="card-header"><h3>&#x1F402; Top Bulls (Live)</h3></div>
            <div class="table-wrapper">
                <table class="data-table" style="font-size:13px;">
                    <thead><tr><th>#</th><th>Bull</th><th>Owner</th><th>Avg Difficulty</th><th>Avg Aggression</th><th>Releases</th></tr></thead>
                    <tbody>
                        <c:forEach var="tb" items="${topBulls}" varStatus="rank">
                            <tr style="${rank.index == 0 ? 'background:#fff9e6;font-weight:bold;' : rank.index == 1 ? 'background:#f5f5f5;' : rank.index == 2 ? 'background:#fdf2ee;' : ''}">
                                <td>
                                    <c:choose>
                                        <c:when test="${rank.index == 0}">&#x1F947;</c:when>
                                        <c:when test="${rank.index == 1}">&#x1F948;</c:when>
                                        <c:when test="${rank.index == 2}">&#x1F949;</c:when>
                                        <c:otherwise>${rank.index + 1}</c:otherwise>
                                    </c:choose>
                                </td>
                                <td>${tb.bull_name}</td>
                                <td>${tb.owner_name}</td>
                                <td style="font-weight:bold;">${tb.avg_difficulty}</td>
                                <td>${tb.avg_aggression}</td>
                                <td>${tb.total_releases}</td>
                            </tr>
                        </c:forEach>
                        <c:if test="${empty topBulls}">
                            <tr><td colspan="6" style="text-align:center;padding:15px;color:#888;">No scores yet</td></tr>
                        </c:if>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <div class="card">
        <div class="card-header"><h3>&#x1F3C3; Player Scores</h3></div>
        <!-- Search & Filter Bar -->
        <div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap; padding:10px 0; border-bottom:1px solid #eee; margin-bottom:10px;">
            <div style="position:relative;">
                <input type="text" id="playerSearch" placeholder="&#x1F50D; Search by ID or Name..." 
                       style="padding:8px 12px; border:1px solid #ddd; border-radius:6px; width:220px; font-size:13px;"
                       onkeyup="filterPlayerTable()"/>
            </div>
            <div>
                <label style="font-size:12px; color:#666; margin-right:4px;">Round:</label>
                <select id="playerRoundFilter" onchange="filterPlayerTable()" 
                        style="padding:6px 10px; border:1px solid #ddd; border-radius:6px; font-size:13px;">
                    <option value="">All Rounds</option>
                    <c:forEach var="r" items="${roundTypes}">
                        <option value="${r.round_name}">${r.round_name}</option>
                    </c:forEach>
                </select>
            </div>
            <div>
                <label style="font-size:12px; color:#666; margin-right:4px;">Batch:</label>
                <select id="playerBatchFilter" onchange="filterPlayerTable()" 
                        style="padding:6px 10px; border:1px solid #ddd; border-radius:6px; font-size:13px;">
                    <option value="">All Batches</option>
                </select>
            </div>
            <span id="playerFilterCount" style="font-size:12px; color:#888; margin-left:auto;"></span>
        </div>
        <div class="table-wrapper">
            <table class="data-table" id="playerScoreTable">
                <thead><tr><th>ID</th><th>Player</th><th>Batch</th><th>Round</th><th>Bulls Caught</th><th>Penalties</th><th>Action</th></tr></thead>
                <tbody>
                    <c:forEach var="ps" items="${playerScores}">
                        <tr>
                            <td><strong>${ps.player_id}</strong></td>
                            <td>${ps.player_name}</td>
                            <td>${ps.batch_name}</td>
                            <td>${ps.round_name}</td>
                            <td>
                                <form method="post" action="${pageContext.request.contextPath}/admin/scoring" style="display:inline;" id="pf_${ps.player_id}_${ps.round_type_id}">
                                    <input type="hidden" name="action" value="update_player_score"/>
                                    <input type="hidden" name="match_id" value="${selectedMatch}"/>
                                    <input type="hidden" name="player_id" value="${ps.player_id}"/>
                                    <input type="hidden" name="round_type_id" value="${ps.round_type_id}"/>
                                    <input type="number" name="bull_caught" value="${ps.bull_caught}" style="width:70px;padding:4px;border:1px solid #ddd;border-radius:4px;"/>
                            </td>
                            <td>
                                    <input type="number" name="penalties" value="${ps.penalties}" style="width:70px;padding:4px;border:1px solid #ddd;border-radius:4px;"/>
                            </td>
                            <td>
                                    <button type="submit" class="btn btn-warning btn-sm">Update</button>
                                </form>
                            </td>
                        </tr>
                    </c:forEach>
                    <c:if test="${empty playerScores}">
                        <tr><td colspan="7" style="text-align:center;padding:20px;color:#888;">No approved players for this match</td></tr>
                    </c:if>
                </tbody>
            </table>
        </div>
    </div>

    <!-- Bull Scores -->
    <div class="card">
        <div class="card-header"><h3>&#x1F402; Bull Scores</h3></div>
        <!-- Search & Filter Bar -->
        <div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap; padding:10px 0; border-bottom:1px solid #eee; margin-bottom:10px;">
            <div style="position:relative;">
                <input type="text" id="bullSearch" placeholder="&#x1F50D; Search bull by name..." 
                       style="padding:8px 12px; border:1px solid #ddd; border-radius:6px; width:220px; font-size:13px;"
                       onkeyup="filterBullTable()"/>
            </div>
            <div>
                <label style="font-size:12px; color:#666; margin-right:4px;">Round:</label>
                <select id="bullRoundFilter" onchange="filterBullTable()" 
                        style="padding:6px 10px; border:1px solid #ddd; border-radius:6px; font-size:13px;">
                    <option value="">All Rounds</option>
                    <c:forEach var="r" items="${roundTypes}">
                        <option value="${r.round_name}">${r.round_name}</option>
                    </c:forEach>
                </select>
            </div>
            <span id="bullFilterCount" style="font-size:12px; color:#888; margin-left:auto;"></span>
        </div>
        <div class="table-wrapper">
            <table class="data-table" id="bullScoreTable">
                <thead><tr><th>Bull</th><th>Round</th><th>Aggression</th><th>Play Area</th><th>Difficulty</th><th>Releases</th><th>Tamer</th><th>Action</th></tr></thead>
                <tbody>
                    <c:forEach var="bs" items="${bullScores}">
                        <tr>
                            <td><strong>${bs.bull_name}</strong></td>
                            <td>${bs.round_name}</td>
                            <td>
                                <form method="post" action="${pageContext.request.contextPath}/admin/scoring" style="display:inline;" id="bf_${bs.bull_id}_${bs.round_type_id}">
                                    <input type="hidden" name="action" value="update_bull_score"/>
                                    <input type="hidden" name="match_id" value="${selectedMatch}"/>
                                    <input type="hidden" name="bull_id" value="${bs.bull_id}"/>
                                    <input type="hidden" name="round_type_id" value="${bs.round_type_id}"/>
                                    <input type="number" name="aggression" value="${bs.aggression}" style="width:60px;padding:4px;border:1px solid #ddd;border-radius:4px;"/>
                            </td>
                            <td><input type="number" name="play_area" value="${bs.play_area}" style="width:60px;padding:4px;border:1px solid #ddd;border-radius:4px;"/></td>
                            <td><input type="number" name="difficulty" value="${bs.difficulty}" style="width:60px;padding:4px;border:1px solid #ddd;border-radius:4px;"/></td>
                            <td><input type="number" name="release_count" value="${bs.release_count}" style="width:60px;padding:4px;border:1px solid #ddd;border-radius:4px;"/></td>
                            <td>
                                <select name="player_id" style="padding:4px;border:1px solid #ddd;border-radius:4px;">
                                    <c:forEach var="ap" items="${approvedPlayers}">
                                        <option value="${ap.player_id}" ${ap.player_id == bs.player_id ? 'selected' : ''}>${ap.player_name}</option>
                                    </c:forEach>
                                </select>
                            </td>
                            <td><button type="submit" class="btn btn-warning btn-sm">Update</button></form></td>
                        </tr>
                    </c:forEach>
                    <c:if test="${empty bullScores}">
                        <tr><td colspan="8" style="text-align:center;padding:20px;color:#888;">No approved bulls for this match</td></tr>
                    </c:if>
                </tbody>
            </table>
        </div>
    </div>

    <!-- Add Interaction -->
    <div class="card">
        <div class="card-header"><h3>&#x26A1; Record Bull-Player Interaction</h3></div>
        <form method="post" action="${pageContext.request.contextPath}/admin/scoring">
            <input type="hidden" name="action" value="add_interaction"/>
            <input type="hidden" name="match_id" value="${selectedMatch}"/>
            <div class="form-grid">
                <div class="form-group">
                    <label>Player</label>
                    <select name="player_id" class="form-control" required>
                        <option value="">-- Select --</option>
                        <c:forEach var="ap" items="${approvedPlayers}">
                            <option value="${ap.player_id}">${ap.player_name}</option>
                        </c:forEach>
                    </select>
                </div>
                <div class="form-group">
                    <label>Bull</label>
                    <select name="bull_id" class="form-control" required>
                        <option value="">-- Select --</option>
                        <c:forEach var="ab" items="${approvedBulls}">
                            <option value="${ab.bull_id}">${ab.bull_name}</option>
                        </c:forEach>
                    </select>
                </div>
                <div class="form-group">
                    <label>Round</label>
                    <select name="round_type_id" class="form-control" required>
                        <c:forEach var="r" items="${roundTypes}">
                            <option value="${r.round_type_id}">${r.round_name}</option>
                        </c:forEach>
                    </select>
                </div>
                <div class="form-group">
                    <label>Hold Sequence #</label>
                    <input type="number" name="hold_sequence" class="form-control" required min="1"/>
                </div>
                <div class="form-group">
                    <label>Hold Duration (seconds)</label>
                    <input type="number" name="hold_duration" class="form-control" required min="0"/>
                </div>
            </div>
            <button type="submit" class="btn btn-success" style="margin-top:10px;">Record Interaction</button>
        </form>
    </div>

    <!-- Interaction Log -->
    <div class="card">
        <div class="card-header"><h3>Interaction Log</h3></div>
        <div class="table-wrapper">
            <table class="data-table">
                <thead><tr><th>Bull</th><th>Player</th><th>Round</th><th>Hold #</th><th>Duration (s)</th></tr></thead>
                <tbody>
                    <c:forEach var="i" items="${interactions}">
                        <tr>
                            <td><strong>${i.bull_name}</strong></td>
                            <td>${i.player_name}</td>
                            <td>${i.round_name}</td>
                            <td>${i.hold_sequence}</td>
                            <td><strong>${i.hold_duration}</strong></td>
                        </tr>
                    </c:forEach>
                    <c:if test="${empty interactions}">
                        <tr><td colspan="5" style="text-align:center;padding:20px;color:#888;">No interactions recorded yet</td></tr>
                    </c:if>
                </tbody>
            </table>
        </div>
    </div>
    </c:if><%-- end matchStatus == Live --%>
</c:if>

<script>
// --- Player Table Filter ---
function filterPlayerTable() {
    var search = document.getElementById('playerSearch').value.toLowerCase();
    var round = document.getElementById('playerRoundFilter').value;
    var batch = document.getElementById('playerBatchFilter').value;
    var table = document.getElementById('playerScoreTable');
    if (!table) return;
    var rows = table.querySelectorAll('tbody tr');
    var shown = 0, total = 0;
    rows.forEach(function(row) {
        if (row.querySelector('td[colspan]')) return; // skip empty-state row
        total++;
        var cells = row.querySelectorAll('td');
        var pid = cells[0] ? cells[0].textContent.trim().toLowerCase() : '';
        var pname = cells[1] ? cells[1].textContent.trim().toLowerCase() : '';
        var pbatch = cells[2] ? cells[2].textContent.trim() : '';
        var pround = cells[3] ? cells[3].textContent.trim() : '';
        var matchSearch = !search || pid.indexOf(search) !== -1 || pname.indexOf(search) !== -1;
        var matchRound = !round || pround === round;
        var matchBatch = !batch || pbatch === batch;
        if (matchSearch && matchRound && matchBatch) {
            row.style.display = '';
            shown++;
        } else {
            row.style.display = 'none';
        }
    });
    var countEl = document.getElementById('playerFilterCount');
    if (total > 0) countEl.textContent = 'Showing ' + shown + ' of ' + total + ' players';
}

// --- Bull Table Filter ---
function filterBullTable() {
    var search = document.getElementById('bullSearch').value.toLowerCase();
    var round = document.getElementById('bullRoundFilter').value;
    var table = document.getElementById('bullScoreTable');
    if (!table) return;
    var rows = table.querySelectorAll('tbody tr');
    var shown = 0, total = 0;
    rows.forEach(function(row) {
        if (row.querySelector('td[colspan]')) return;
        total++;
        var cells = row.querySelectorAll('td');
        var bname = cells[0] ? cells[0].textContent.trim().toLowerCase() : '';
        var bround = cells[1] ? cells[1].textContent.trim() : '';
        var matchSearch = !search || bname.indexOf(search) !== -1;
        var matchRound = !round || bround === round;
        if (matchSearch && matchRound) {
            row.style.display = '';
            shown++;
        } else {
            row.style.display = 'none';
        }
    });
    var countEl = document.getElementById('bullFilterCount');
    if (total > 0) countEl.textContent = 'Showing ' + shown + ' of ' + total + ' bulls';
}

// --- Auto-populate Batch dropdown from table data ---
(function() {
    var table = document.getElementById('playerScoreTable');
    if (!table) return;
    var batches = new Set();
    table.querySelectorAll('tbody tr').forEach(function(row) {
        var cells = row.querySelectorAll('td');
        if (cells.length >= 3) {
            var b = cells[2].textContent.trim();
            if (b) batches.add(b);
        }
    });
    var sel = document.getElementById('playerBatchFilter');
    if (sel) {
        batches.forEach(function(b) {
            var opt = document.createElement('option');
            opt.value = b;
            opt.textContent = b;
            sel.appendChild(opt);
        });
    }
    // Show initial counts
    filterPlayerTable();
    filterBullTable();
})();
</script>

<jsp:include page="includes/footer.jsp"/>
