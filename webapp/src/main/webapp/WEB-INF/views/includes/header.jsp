<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${param.title} - Jallikattu Admin</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f0f2f5; color: #333; }
        
        /* Sidebar */
        .sidebar {
            position: fixed; left: 0; top: 0; bottom: 0; width: 250px;
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
            color: white; overflow-y: auto; z-index: 100;
        }
        .sidebar-header {
            padding: 20px; text-align: center;
            border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        .sidebar-header h2 { font-size: 18px; color: #e94560; }
        .sidebar-header p { font-size: 12px; color: #aaa; margin-top: 4px; }
        .sidebar-nav { padding: 10px 0; }
        .sidebar-nav a {
            display: flex; align-items: center; padding: 12px 20px;
            color: #ccc; text-decoration: none; font-size: 14px;
            transition: all 0.3s; border-left: 3px solid transparent;
        }
        .sidebar-nav a:hover, .sidebar-nav a.active {
            background: rgba(255,255,255,0.08);
            color: #fff; border-left-color: #e94560;
        }
        .sidebar-nav a .icon { margin-right: 10px; font-size: 16px; width: 20px; text-align: center; }
        .sidebar-nav .section-title {
            padding: 15px 20px 5px; font-size: 11px; text-transform: uppercase;
            color: #666; letter-spacing: 1px;
        }
        
        /* Main content */
        .main-content { margin-left: 250px; padding: 20px; min-height: 100vh; }
        .topbar {
            background: white; padding: 15px 25px; border-radius: 10px;
            margin-bottom: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);
            display: flex; justify-content: space-between; align-items: center;
        }
        .topbar h1 { font-size: 22px; color: #1a1a2e; }
        .topbar .breadcrumb { color: #888; font-size: 13px; }
        .topbar .breadcrumb a { color: #e94560; text-decoration: none; }
        
        /* Cards */
        .card {
            background: white; border-radius: 10px; padding: 20px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.05); margin-bottom: 20px;
        }
        .card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; }
        .card-header h3 { font-size: 16px; color: #1a1a2e; }
        
        /* Stats grid */
        .stats-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 15px; margin-bottom: 20px; }
        .stat-card {
            background: white; border-radius: 10px; padding: 20px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.05); display: flex;
            align-items: center; transition: transform 0.2s;
            text-decoration: none; color: inherit; cursor: pointer;
        }
        .stat-card:hover { transform: translateY(-3px); box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
        .stat-icon {
            width: 50px; height: 50px; border-radius: 10px;
            display: flex; align-items: center; justify-content: center;
            font-size: 22px; margin-right: 15px;
        }
        .stat-info h4 { font-size: 22px; font-weight: 700; }
        .stat-info p { font-size: 12px; color: #888; margin-top: 2px; }
        
        /* Table styles */
        .data-table { width: 100%; border-collapse: collapse; font-size: 14px; }
        .data-table th {
            background: #f8f9fa; padding: 12px 15px; text-align: left;
            font-weight: 600; color: #555; border-bottom: 2px solid #e8e8e8;
            position: sticky; top: 0;
        }
        .data-table td {
            padding: 10px 15px; border-bottom: 1px solid #f0f0f0;
            max-width: 200px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        }
        .data-table tr:hover td { background: #f8f9fc; }
        .table-wrapper { overflow-x: auto; }
        
        /* Buttons */
        .btn {
            display: inline-flex; align-items: center; padding: 8px 16px;
            border: none; border-radius: 6px; font-size: 13px;
            cursor: pointer; text-decoration: none; transition: all 0.2s;
            font-weight: 500;
        }
        .btn-primary { background: #e94560; color: white; }
        .btn-primary:hover { background: #d63851; }
        .btn-success { background: #28a745; color: white; }
        .btn-success:hover { background: #218838; }
        .btn-warning { background: #ffc107; color: #333; }
        .btn-warning:hover { background: #e0a800; }
        .btn-danger { background: #dc3545; color: white; }
        .btn-danger:hover { background: #c82333; }
        .btn-sm { padding: 5px 10px; font-size: 12px; }
        .btn .icon { margin-right: 5px; }
        
        /* Forms */
        .form-group { margin-bottom: 15px; }
        .form-group label {
            display: block; margin-bottom: 5px; font-weight: 600;
            font-size: 13px; color: #555;
        }
        .form-group label .required { color: #e94560; }
        .form-group label .pk-badge {
            background: #e94560; color: white; font-size: 10px;
            padding: 2px 6px; border-radius: 3px; margin-left: 5px;
        }
        .form-group label .type-info {
            font-weight: 400; color: #999; font-size: 11px; margin-left: 5px;
        }
        .form-control {
            width: 100%; padding: 10px 12px; border: 1px solid #ddd;
            border-radius: 6px; font-size: 14px; transition: border 0.2s;
        }
        .form-control:focus { outline: none; border-color: #e94560; box-shadow: 0 0 0 3px rgba(233,69,96,0.1); }
        .form-control:disabled { background: #f5f5f5; }
        .form-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 15px; }
        
        /* Alert */
        .alert {
            padding: 12px 20px; border-radius: 8px; margin-bottom: 15px;
            font-size: 14px; display: flex; align-items: center;
        }
        .alert-success { background: #d4edda; color: #155724; border: 1px solid #c3e6cb; }
        .alert-danger { background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; }
        .alert .icon { margin-right: 8px; font-size: 16px; }
        
        /* Color coding for stat cards */
        .bg-blue { background: rgba(52,152,219,0.15); color: #3498db; }
        .bg-green { background: rgba(40,167,69,0.15); color: #28a745; }
        .bg-orange { background: rgba(255,165,0,0.15); color: #e67e22; }
        .bg-red { background: rgba(233,69,96,0.15); color: #e94560; }
        .bg-purple { background: rgba(142,68,173,0.15); color: #8e44ad; }
        .bg-teal { background: rgba(0,128,128,0.15); color: #008080; }
        
        /* Responsive */
        @media (max-width: 768px) {
            .sidebar { width: 60px; }
            .sidebar-header h2, .sidebar-header p, .sidebar-nav .section-title,
            .sidebar-nav a span { display: none; }
            .sidebar-nav a { justify-content: center; padding: 15px; }
            .sidebar-nav a .icon { margin: 0; }
            .main-content { margin-left: 60px; }
            .form-grid { grid-template-columns: 1fr; }
        }
    </style>
</head>
<body>
    <!-- Sidebar -->
    <div class="sidebar">
        <div class="sidebar-header">
            <h2>&#x1F402; Jallikattu</h2>
            <p>Admin Panel</p>
            <c:if test="${not empty sessionScope.username}">
                <div style="margin-top:8px;padding:6px 10px;background:rgba(255,255,255,0.08);border-radius:6px;font-size:12px;">
                    <span style="color:#e94560;">&#x1F464;</span>
                    <span style="color:#fff;">${sessionScope.username}</span>
                    <span style="background:${sessionScope.role=='admin'?'#e94560':sessionScope.role=='scorer'?'#3498db':'#28a745'};
                                 color:white;padding:1px 6px;border-radius:3px;font-size:10px;margin-left:4px;">
                        ${sessionScope.role}
                    </span>
                </div>
            </c:if>
        </div>
        <nav class="sidebar-nav">
            <a href="${pageContext.request.contextPath}/admin/dashboard"
               class="${param.active == 'dashboard' ? 'active' : ''}">
                <span class="icon">&#x1F4CA;</span><span>Dashboard</span>
            </a>

            <!-- Features: role-based -->
            <div class="section-title">Features</div>
            <c:if test="${sessionScope.role == 'admin' || sessionScope.role == 'registrar'}">
                <a href="${pageContext.request.contextPath}/admin/register"
                   class="${param.active == 'register' ? 'active' : ''}">
                    <span class="icon">&#x1F4DD;</span><span>Registration</span>
                </a>
            </c:if>
            <c:if test="${sessionScope.role == 'admin' || sessionScope.role == 'scorer'}">
                <a href="${pageContext.request.contextPath}/admin/scoring"
                   class="${param.active == 'scoring' ? 'active' : ''}">
                    <span class="icon">&#x1F534;</span><span>Live Scoring</span>
                </a>
            </c:if>
            <a href="${pageContext.request.contextPath}/admin/winners"
               class="${param.active == 'winners' ? 'active' : ''}">
                <span class="icon">&#x1F3C6;</span><span>Winners</span>
            </a>
            <c:if test="${sessionScope.role == 'admin'}">
                <a href="${pageContext.request.contextPath}/admin/users"
                   class="${param.active == 'users' ? 'active' : ''}">
                    <span class="icon">&#x1F465;</span><span>User Management</span>
                </a>
            </c:if>

            <!-- Data Tables: admin only for full CRUD, others read-only -->
            <c:if test="${sessionScope.role == 'admin'}">
                <div class="section-title">Lookup Tables</div>
                <a href="${pageContext.request.contextPath}/admin/table?name=location"
                   class="${param.active == 'location' ? 'active' : ''}">
                    <span class="icon">&#x1F4CD;</span><span>Locations</span>
                </a>
                <a href="${pageContext.request.contextPath}/admin/table?name=organizer"
                   class="${param.active == 'organizer' ? 'active' : ''}">
                    <span class="icon">&#x1F3DB;</span><span>Organizers</span>
                </a>
                <a href="${pageContext.request.contextPath}/admin/table?name=bull_breed"
                   class="${param.active == 'bull_breed' ? 'active' : ''}">
                    <span class="icon">&#x1F9EC;</span><span>Bull Breeds</span>
                </a>
                <a href="${pageContext.request.contextPath}/admin/table?name=round_type"
                   class="${param.active == 'round_type' ? 'active' : ''}">
                    <span class="icon">&#x1F504;</span><span>Round Types</span>
                </a>
                <a href="${pageContext.request.contextPath}/admin/table?name=batch"
                   class="${param.active == 'batch' ? 'active' : ''}">
                    <span class="icon">&#x1F4E6;</span><span>Batches</span>
                </a>
                <a href="${pageContext.request.contextPath}/admin/table?name=prize"
                   class="${param.active == 'prize' ? 'active' : ''}">
                    <span class="icon">&#x1F3C6;</span><span>Prizes</span>
                </a>
                
                <div class="section-title">Core Tables</div>
                <a href="${pageContext.request.contextPath}/admin/table?name=player"
                   class="${param.active == 'player' ? 'active' : ''}">
                    <span class="icon">&#x1F3C3;</span><span>Players</span>
                </a>
                <a href="${pageContext.request.contextPath}/admin/table?name=owner"
                   class="${param.active == 'owner' ? 'active' : ''}">
                    <span class="icon">&#x1F464;</span><span>Owners</span>
                </a>
                <a href="${pageContext.request.contextPath}/admin/table?name=bull_table"
                   class="${param.active == 'bull_table' ? 'active' : ''}">
                    <span class="icon">&#x1F402;</span><span>Bulls</span>
                </a>
                <a href="${pageContext.request.contextPath}/admin/table?name=match"
                   class="${param.active == 'match' ? 'active' : ''}">
                    <span class="icon">&#x1F3C5;</span><span>Matches</span>
                </a>
                
                <div class="section-title">History Tables</div>
                <a href="${pageContext.request.contextPath}/admin/table?name=player_match_history"
                   class="${param.active == 'player_match_history' ? 'active' : ''}">
                    <span class="icon">&#x1F4CB;</span><span>Player History</span>
                </a>
                <a href="${pageContext.request.contextPath}/admin/table?name=bull_match_history"
                   class="${param.active == 'bull_match_history' ? 'active' : ''}">
                    <span class="icon">&#x1F4C4;</span><span>Bull History</span>
                </a>
                <a href="${pageContext.request.contextPath}/admin/table?name=bull_player_interaction"
                   class="${param.active == 'bull_player_interaction' ? 'active' : ''}">
                    <span class="icon">&#x26A1;</span><span>Interactions</span>
                </a>
            </c:if>

            <!-- Logout -->
            <div style="border-top:1px solid rgba(255,255,255,0.1);margin-top:15px;padding-top:5px;"></div>
            <a href="${pageContext.request.contextPath}/logout" style="color:#e94560;">
                <span class="icon">&#x1F6AA;</span><span>Logout</span>
            </a>
        </nav>
    </div>
    
    <!-- Main Content -->
    <div class="main-content">
