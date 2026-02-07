<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<%@ taglib prefix="fn" uri="jakarta.tags.functions" %>
<jsp:include page="includes/header.jsp">
    <jsp:param name="title" value="Winners"/>
    <jsp:param name="active" value="winners"/>
</jsp:include>

<div class="topbar">
    <div>
        <h1>&#x1F3C6; Winners &amp; Leaderboard</h1>
        <div class="breadcrumb">
            <a href="${pageContext.request.contextPath}/admin/dashboard">Dashboard</a> &rsaquo; Winners
        </div>
    </div>
</div>

<c:if test="${not empty error}"><div class="alert alert-danger"><span class="icon">&#x26A0;</span> ${error}</div></c:if>

<!-- Match Selector -->
<div class="card">
    <div class="card-header"><h3>Select Match</h3></div>
    <div style="display:flex; gap:10px; flex-wrap:wrap;">
        <c:forEach var="m" items="${completedMatches}">
            <a href="${pageContext.request.contextPath}/admin/winners?match_id=${m.match_id}"
               class="btn ${m.match_id == selectedMatch ? 'btn-primary' : ''}"
               style="${m.match_id != selectedMatch ? 'background:#e8e8e8;' : ''}">
                ${m.match_name}
            </a>
        </c:forEach>
        <c:if test="${empty completedMatches}">
            <p style="color:#888;padding:10px;">No completed matches yet.</p>
        </c:if>
    </div>
</div>

<c:if test="${not empty selectedMatch}">

    <!-- Overall Match Winner -->
    <div class="card" style="border-left:4px solid gold;">
        <div class="card-header"><h3>&#x1F947; Overall Match Winner (Top 5 Players)</h3></div>
        <div class="table-wrapper">
            <table class="data-table">
                <thead><tr><th>#</th><th>Player</th><th>Bulls Caught</th><th>Penalties</th><th>Net Score</th></tr></thead>
                <tbody>
                    <c:forEach var="w" items="${overallWinner}" varStatus="idx">
                        <tr style="${idx.index==0 ? 'background:#fff9e6;font-weight:bold;' : ''}">
                            <td>
                                <c:choose>
                                    <c:when test="${idx.index==0}">&#x1F947;</c:when>
                                    <c:when test="${idx.index==1}">&#x1F948;</c:when>
                                    <c:when test="${idx.index==2}">&#x1F949;</c:when>
                                    <c:otherwise>${idx.index+1}</c:otherwise>
                                </c:choose>
                            </td>
                            <td>${w.player_name}</td>
                            <td>${w.total_bulls_caught}</td>
                            <td>${w.total_penalties}</td>
                            <td><strong>${w.net_score}</strong></td>
                        </tr>
                    </c:forEach>
                    <c:if test="${empty overallWinner}">
                        <tr><td colspan="5" style="text-align:center;padding:20px;color:#888;">No scores recorded yet</td></tr>
                    </c:if>
                </tbody>
            </table>
        </div>
    </div>

    <!-- Round Winners -->
    <div class="card">
        <div class="card-header"><h3>&#x1F3C3; Round Winners (Players)</h3></div>
        <div class="table-wrapper">
            <table class="data-table">
                <thead><tr><th>Round</th><th>Player</th><th>Bulls Caught</th><th>Penalties</th></tr></thead>
                <tbody>
                    <c:forEach var="r" items="${roundWinners}">
                        <tr>
                            <td><strong>${r.round_name}</strong></td>
                            <td>&#x1F3C6; ${r.player_name}</td>
                            <td>${r.bull_caught}</td>
                            <td>${r.penalties}</td>
                        </tr>
                    </c:forEach>
                    <c:if test="${empty roundWinners}">
                        <tr><td colspan="4" style="text-align:center;padding:20px;color:#888;">No round data</td></tr>
                    </c:if>
                </tbody>
            </table>
        </div>
    </div>

    <!-- Best Bull Per Round -->
    <div class="card">
        <div class="card-header"><h3>&#x1F402; Best Bull Per Round</h3></div>
        <div class="table-wrapper">
            <table class="data-table">
                <thead><tr><th>Round</th><th>Bull</th><th>Owner</th><th>Aggression</th><th>Difficulty</th><th>Total Score</th></tr></thead>
                <tbody>
                    <c:forEach var="b" items="${bestBullPerRound}">
                        <tr>
                            <td><strong>${b.round_name}</strong></td>
                            <td>&#x1F402; ${b.bull_name}</td>
                            <td>${b.owner_name}</td>
                            <td>${b.aggression}</td>
                            <td>${b.difficulty}</td>
                            <td><strong>${b.total_score}</strong></td>
                        </tr>
                    </c:forEach>
                    <c:if test="${empty bestBullPerRound}">
                        <tr><td colspan="6" style="text-align:center;padding:20px;color:#888;">No bull data</td></tr>
                    </c:if>
                </tbody>
            </table>
        </div>
    </div>

    <!-- Best Bull Overall -->
    <div class="card" style="border-left:4px solid #e94560;">
        <div class="card-header"><h3>&#x1F525; Best Bull Overall (Top 3)</h3></div>
        <div class="table-wrapper">
            <table class="data-table">
                <thead><tr><th>#</th><th>Bull</th><th>Owner</th><th>Total Aggression</th><th>Total Difficulty</th><th>Combined Score</th></tr></thead>
                <tbody>
                    <c:forEach var="b" items="${bestBullOverall}" varStatus="idx">
                        <tr style="${idx.index==0 ? 'background:#ffe6ea;font-weight:bold;' : ''}">
                            <td>
                                <c:choose>
                                    <c:when test="${idx.index==0}">&#x1F947;</c:when>
                                    <c:when test="${idx.index==1}">&#x1F948;</c:when>
                                    <c:when test="${idx.index==2}">&#x1F949;</c:when>
                                </c:choose>
                            </td>
                            <td>${b.bull_name}</td>
                            <td>${b.owner_name}</td>
                            <td>${b.total_aggression}</td>
                            <td>${b.total_difficulty}</td>
                            <td><strong>${b.total_score}</strong></td>
                        </tr>
                    </c:forEach>
                    <c:if test="${empty bestBullOverall}">
                        <tr><td colspan="6" style="text-align:center;padding:20px;color:#888;">No bull data</td></tr>
                    </c:if>
                </tbody>
            </table>
        </div>
    </div>

    <!-- Interaction Winners -->
    <div class="card">
        <div class="card-header"><h3>&#x26A1; Best Bull Tamers (Top 5 by Longest Hold)</h3></div>
        <div class="table-wrapper">
            <table class="data-table">
                <thead><tr><th>#</th><th>Bull</th><th>Player</th><th>Longest Hold (s)</th><th>Total Hold Time (s)</th><th>Hold Count</th></tr></thead>
                <tbody>
                    <c:forEach var="i" items="${interactionWinners}" varStatus="idx">
                        <tr style="${idx.index==0 ? 'background:#e6f7ff;font-weight:bold;' : ''}">
                            <td>
                                <c:choose>
                                    <c:when test="${idx.index==0}">&#x1F947;</c:when>
                                    <c:when test="${idx.index==1}">&#x1F948;</c:when>
                                    <c:when test="${idx.index==2}">&#x1F949;</c:when>
                                    <c:otherwise>${idx.index+1}</c:otherwise>
                                </c:choose>
                            </td>
                            <td>${i.bull_name}</td>
                            <td>${i.player_name}</td>
                            <td><strong>${i.longest_hold}</strong></td>
                            <td>${i.total_hold_time}</td>
                            <td>${i.hold_count}</td>
                        </tr>
                    </c:forEach>
                    <c:if test="${empty interactionWinners}">
                        <tr><td colspan="6" style="text-align:center;padding:20px;color:#888;">No interactions recorded</td></tr>
                    </c:if>
                </tbody>
            </table>
        </div>
    </div>

</c:if>

<jsp:include page="includes/footer.jsp"/>
