#!/bin/bash
# ============================================================
# Startup script for combined Tomcat + Python AI container
# ============================================================

set -e

# ── Configure Tomcat to listen on $PORT ──
# Render provides a PORT env var (default 10000)
PORT="${PORT:-10000}"

# Rewrite Tomcat's server.xml to use the correct port
sed -i "s/port=\"8080\"/port=\"${PORT}\"/" ${CATALINA_HOME}/conf/server.xml

# ── Set Python AI service to internal port ──
export AI_PORT=8500
export HOST=0.0.0.0

# ── Start supervisor (manages both processes) ──
exec /usr/bin/supervisord -c /etc/supervisor/conf.d/supervisord.conf
