# EcoDrop - E-Commerce Packaging Reward System

An integrated system where users earn eco-points by depositing poly mailers to the ecobins in which they can exchange for rewards. Simultaenously, admins monitor and manage the system through a web dashboard.

## Project Description
EcoDrop combines IoT hardware (ESP32 + PIR sensors on waste bins) with mobile and web applications. Users dispose plastic mailers properly and earn eco-points tracked in real-time. Administrators monitor system performance, user activity, and waste bin status through a web admin dashboard.

## Features

### Mobile App (Users)
- User authentication & profile management
- Real-time eco-points tracking and history
- Claim available rewards wih eco-points using QR code
- Profile settings and preferences
- Waste disposal notifications

### Web Admin Dashboard
- User management and analytics
- Monitor all waste bins and their status
- View eco-points distribution
- System statistics and reports
- Admin authentication & authorization
- Real-time notifications for bin-fill 

### IoT Integration
- ESP32 microcontroller with PIR motion sensor
- Automatic waste disposal detection
- Real-time data synchronization
- HTTP API communication

## Technology Stack

Frontend:
- Mobile: React Native / Expo Go
- Web Admin: React.js / JS + CSS

Backend:
- Django REST Framework (Python) 

Database:
- SQLite (Local Development)
- PostgreSQL (Production)

IoT & Hardware:
- ESP32 Microcontroller
- PIR Motion Sensor

DevOps:
- Docker & Docker Compose
- Git & GitHub

## System Architecture

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  [Mobile App - Users]           [Web Admin Dashboard]       │
│  ├─ Profile                     ├─ User Management          │
│  ├─ Eco-Points + Rewards        ├─ Bin Monitoring           │
│  └─ Settings                    └─ Deposis Analytics        │
│         │                               │                   │
│         └───────────────┬───────────────┘                   │
│                         │                                   │
│              [Django Backend API]                           │
│              ├─ User Endpoints                              │
│              ├─ Logs Endpoints                              │
│              ├─ Admin Endpoints                             │
│              └─ IoT Data Endpoints                          │
│                         │                                   │
│         ┌───────────────┼───────────────┐                   │
│         │               │               │                   │
│   [SQLite/PostgreSQL] [ESP32+PIR]  [Cache/Queue]            │
│       Database        IoT Device        (Optional)          │
│                                                             │
└─────────────────────────────────────────────────────────────┘

Data Flow:
1. User Interaction: User opens mobile app → scans QR code to access eco-bin
2. Waste Detection: ESP32 detects waste deposits via PIR sensor
3. Points Update: IoT data sent to backend → Eco-points incremented in DB
4. Admin View: Admin dashboard displays real-time stats and analytics
5. Real-time Sync: Mobile app refreshes points based on weight; Admin sees updated metrics

## Installation & Setup

### Prerequisites
- Python 3.8+
- Git
- Virtual Environment (venv)






### Environment Variables

Create `.env` file in project root:
DB_TYPE=sqlite
SECRET_KEY=your_secret_key_here
ACCESS_TOKEN_EXPIRE_MINUTES=30
ADMIN_SECRET_KEY=admin_secret_here

### Docker Setup (Production)
bash
docker-compose up -d

DB_TYPE=postgresql
DATABASE_URL=postgresql://postgres:password@localhost:5432/ecodrop

# Run migrations
alembic upgrade head

## API Endpoints

### User Profile Endpoints

GET    /api/v1/users/{user_id}              - Get user with profile
GET    /api/v1/users/{user_id}/profile      - Get user profile
PUT    /api/v1/users/{user_id}/profile      - Update profile
PATCH  /api/v1/users/{user_id}/profile      - Partial profile update

### Admin Endpoints (to be implemented)
GET    /api/v1/admin/users                  - List all users
GET    /api/v1/admin/stats                  - System statistics
GET    /api/v1/admin/bins                   - Monitor waste bins
POST   /api/v1/admin/bins                   - Add new waste bin

### IoT Endpoints (to be implemented)
POST   /api/v1/iot/report                   - Send disposal data
GET    /api/v1/iot/status                   - Get IoT device status

### Health Check
GET    /health                              - Server status
GET    /                                    - Welcome message

## Deployment Links
- *Backend API:* [Your production backend URL]
- *Mobile App:* [APK/iOS App Store Link]
- *Admin Dashboard:* [Your admin dashboard URL]
- *Live Demo:* [Demo access link]

## Test Account

*User Account:*
- Email: user@example.com
- Password: password123
- Eco-Points: 50

*Admin Account:*
- Email: admin@example.com
- Password: admin123

## Team Members and Roles

| Name | Role | Repository |
|------|------|------------|
| [Your Name] | Backend Developer / Tech Lead | ecodrop-backend-mobile |
| [Team Member 2] | Mobile App Developer | ecodrop-mobile |
| [Team Member 3] | Web Admin Dashboard Developer | ecodrop-admin-dashboard |
| [Team Member 4] | IoT/Hardware Engineer | ecodrop-hardware |
| [Team Member 5] | UI/UX Designer | Design Assets |

## Known Limitations
- SQLite not recommended for production (use PostgreSQL)
- Single waste bin per ESP32 (can be extended for multiple bins)
- Eco-points based on detection count (not waste weight/volume)
- Admin dashboard authentication not yet implemented
- No offline sync for mobile app
- IoT endpoints still under development

## Project Structure

ecodrop-backend-mobile/
├── alembic/                    # Database migrations
│   ├── versions/
│   │   ├── 3d7d9fca8cf6_create_user_table.py
│   │   └── 4e8a1b2c3d4e_create_user_profile_table.py
│   └── env.py
├── app/
│   ├── api/
│   │   ├── __init__.py
│   │   └── profiles.py         # User profile endpoints
│   ├── core/
│   │   ├── __init__.py
│   │   └── config.py           # Configuration
│   ├── db/
│   │   ├── __init__.py
│   │   └── session.py          # Database session
│   ├── models/
│   │   ├── __init__.py
│   │   └── user.py             # SQLAlchemy models
│   ├── schemas/
│   │   ├── __init__.py
│   │   └── user.py             # Pydantic schemas
│   ├── __init__.py
│   └── main.py                 # FastAPI application
├── requirements.txt            # Python dependencies
├── alembic.ini                 # Alembic configuration
├── docker-compose.yml          # Docker Compose setup
├── README.md                   # This file
└── ecodrop.db                  # SQLite database (generated)

## Screenshots & Demo
-  Mobile app welcome screen with eco-points
-  User profile & settings page
https://drive.google.com/drive/folders/1gCNIDXDAAWfIv53n_-coFbXf5hUBy1PY?usp=drive_link
-  Admin dashboard overview
-  Waste bin monitoring
-  Analytics & reports
https://drive.google.com/drive/folders/10mTIiTqWHc5sXngNEEIWcwlQwm6_n9XV?usp=drive_link

## Getting Help
For issues or questions, please [open a GitHub issue](https://github.com/GabbyViernes/ecodrop-backend-mobile/issues)

## Related Repositories
- [Mobile App](https://github.com/GabbyViernes/ecodrop-mobile)
- [Admin Dashboard](https://github.com/GabbyViernes/ecodrop-admin-dashboard)
- [Hardware/IoT](https://github.com/GabbyViernes/ecodrop-hardware)

## License
MIT License - See LICENSE file for details

---
*Last Updated:* May 26, 2026