# ============================================================
# Combined container: Tomcat (Java WAR) + Python AI service
# For deployment on Render free tier
# ============================================================

# ── Stage 1: Build the Java WAR ──
FROM maven:3.9-eclipse-temurin-21 AS java-build
WORKDIR /build
COPY webapp/pom.xml ./
RUN mvn dependency:go-offline -q
COPY webapp/src ./src
RUN mvn clean package -q -DskipTests

# ── Stage 2: Runtime ──
FROM eclipse-temurin:21-jre-jammy

# Install Python 3.11 + pip + supervisor
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 python3-pip python3-venv \
    supervisor curl \
    && rm -rf /var/lib/apt/lists/*

# ── Install Tomcat 10.1 ──
ENV TOMCAT_VERSION=10.1.48
ENV CATALINA_HOME=/opt/tomcat
RUN curl -fsSL "https://archive.apache.org/dist/tomcat/tomcat-10/v${TOMCAT_VERSION}/bin/apache-tomcat-${TOMCAT_VERSION}.tar.gz" \
    | tar xz -C /opt && mv /opt/apache-tomcat-${TOMCAT_VERSION} ${CATALINA_HOME} \
    && rm -rf ${CATALINA_HOME}/webapps/ROOT ${CATALINA_HOME}/webapps/docs \
              ${CATALINA_HOME}/webapps/examples ${CATALINA_HOME}/webapps/host-manager \
              ${CATALINA_HOME}/webapps/manager

# ── Deploy WAR ──
COPY --from=java-build /build/target/jallikattu-admin.war ${CATALINA_HOME}/webapps/jallikattu-admin.war

# ── Setup Python AI service ──
WORKDIR /app/ai-service
COPY ai-service/requirements.txt ./
RUN python3 -m venv /app/venv && \
    /app/venv/bin/pip install --no-cache-dir --upgrade pip && \
    /app/venv/bin/pip install --no-cache-dir torch torchvision --index-url https://download.pytorch.org/whl/cpu && \
    /app/venv/bin/pip install --no-cache-dir -r requirements.txt

COPY ai-service/ ./

# ── Supervisor config (runs both services) ──
COPY deploy/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# ── Startup script ──
COPY deploy/start.sh /start.sh
RUN chmod +x /start.sh

# Render expects the app on $PORT (usually 10000)
ENV PORT=10000
EXPOSE 10000

CMD ["/start.sh"]
