# JalliKattu Statistics Overlay

JalliKattu Statistics Overlay is a full-stack application designed to track, analyze, and display real-time statistics for Jallikattu events. It features an AI-powered detection system, a robust Java-based backend, and an interactive Ember.js frontend.

## Project Structure

The repository is organized into distinct components:

- **`frontend/`**: An Ember.js web application that serves as the user interface. It provides dashboards, overlay controls, match draws, leaderboards, and real-time statistics visualization.
- **`webapp/`**: A Java/Maven backend (deployed as a WAR) that provides the core REST APIs, manages database interactions, and handles user authentication and business logic.
- **`ai-service/`**: A Python-based AI service utilizing YOLOv8 for real-time object detection (detecting bulls, players, etc.) from video streams.
- **`db_design/`**: Database schemas, MySQL Workbench models (`.mwb`), and SQL initialization scripts.
- **`deploy/`**: Scripts and configurations for deployment and migrations (MySQL / TiDB).

## Tech Stack

- **Frontend**: Ember.js, HTML/CSS, JavaScript
- **Backend**: Java, Maven, Tomcat (WAR deployment)
- **AI Service**: Python, YOLOv8 (Ultralytics), OpenCV, FastAPI
- **Database**: MySQL / TiDB

## Getting Started

### Prerequisites
- Node.js and npm (for Ember.js frontend)
- Java JDK 17+ and Maven (for Backend)
- Tomcat 10+ (for deploying Backend WAR)
- Python 3.8+ (for AI Service)
- MySQL / TiDB Database

### Setup Instructions

#### 1. Database Setup
- Import the SQL schemas found in `db_design/jallikattudb.sql` (and `db_design/sample_data.sql` for initial data) into your MySQL/TiDB instance.
- Update the database connection credentials in your Java backend configurations.

#### 2. Backend (Java API)
```bash
cd webapp
mvn clean package
```
- Deploy the resulting `jallikattu-admin.war` (found in `webapp/target/`) to your Tomcat server's `webapps` directory.

#### 3. AI Service
```bash
cd ai-service
# It's recommended to create a virtual environment first
pip install -r requirements.txt
python main.py
```
*Note: Make sure the YOLOv8 model weights (`yolov8n.pt`) are downloaded or available in the directory.*

#### 4. Frontend (Ember.js)
```bash
cd frontend
npm install
npm start
```
- By default, the Ember frontend will run on `http://localhost:4200` and likely proxy API requests to your local Java backend at `http://localhost:8080`.

## Features
- **Real-Time Broadcaster Overlay**: Generate and control live broadcast graphics overlaid on video feeds.
- **AI Vision Integration**: Use YOLOv8 computer vision to automatically detect relevant occurrences from camera feeds and stream data.
- **Comprehensive Dashboards**: Interactive UI for managing matches, bulls, players, scoreboards, and prizes.
- **Authentication**: Secure login and event management control panel.
