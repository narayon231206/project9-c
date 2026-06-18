# MediQueue Client

## Project Overview
MediQueue is a full-stack tutoring and booking platform for students, tutors, and facility owners. This client application provides the responsive frontend for browsing tutors, managing bookings, and handling authentication.

## Features
- Email and Google authentication
- Tutor discovery and detail pages
- Booking and session management
- Protected routes and role-aware access
- Dark/light theme support
- Responsive Next.js interface

## Tech Stack
- Next.js 16
- React 18
- Tailwind CSS
- Better Auth
- MongoDB
- Vercel deployment

## Installation
```bash
cd Client
npm install
npm run dev
```

## Environment Variables
Create a `.env.local` file with:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=your_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

## API Information
This client uses the backend API under `/api/backend/*`, which is forwarded to the Express server at `http://localhost:5000/api`.

## Deployment Instructions
1. Build the production app with `npm run build`.
2. Deploy the client to Vercel.
3. Set `NEXT_PUBLIC_API_URL` to the live backend URL.

## Live Links
- Frontend: https://mediqueue-lern.vercel.app/ (update after deployment)
- Backend API: https://mediqueue-server.onrender.com/ (update after deployment)

## Developer Information

Name: Narayon Chandra Barman

GitHub:
https://github.com/narayon231206/

Email:
narayon231206@gmail.com

---

# 🚀 Deployment

## Frontend Deployment
- Platform: Vercel

## Backend Deployment
- Platform: Render

---
# 📱 Responsive Design

mediqueue is fully optimized for:

- Mobile Devices
- Tablets
- Laptops
- Desktop Screens

---
## License

This project is created for educational and learning purposes only.


Server :

# mediqueue -  landing  course Booking Platform (Server)

## Project Overview

mediqueue Server is the backend API server for the mediqueue landing  course Booking Platform. It manages authentication,course, bookings, and database operations using Node.js, Express.js, and MongoDB.

This project was developed to practice and demonstrate backend development concepts learned during coursework, including REST API creation, CRUD operations, authentication, database integration, middleware, and server deployment.

---

## Live Server URL

Server Live Link:

https://mediqueue-server.onrender.com

---

## Main Features

- REST API Development
- User Authentication System
- Google Authentication Support
- Facility Management System
- Booking Management System
- CRUD Operations
- MongoDB Database Integration
- Protected API Routes
- Middleware Implementation
- Error Handling System
- Environment Variable Security
- CORS Configuration

---

## Technologies Used

### Backend
- Node.js
- Express.js

### Database
- MongoDB

### Authentication
- Better Auth
- Google OAuth

### Deployment
- Render

---

## NPM Packages Used

| Package Name | Purpose |
|--------------|---------|
| express | Backend Framework |
| mongodb | MongoDB Database Driver |
| mongoose | MongoDB ODM |
| cors | Cross-Origin Resource Sharing |
| dotenv | Environment Variables |
| cookie-parser | Cookie Handling |
| nodemon | Development Server |
| better-auth | Authentication System |

---

## Installation Process


### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

---

## Environment Variables

Create a `.env` file and add the following variables:

```env
PORT=
MONGODB_URI=
CLIENT_URL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=
```

---

## API Endpoints

### Authentication Routes

```bash
POST /api/auth/sign-in
POST /api/auth/sign-up
GET  /api/auth/get-session
```

### Facility Routes

```bash
GET    /api/ tutors
GET    /api/tutors/:id
POST   /api/tutors
PUT    /api/tutors/:id
DELETE /api/tutors/:id
```

### Booking Routes

```bash
GET    /api/bookings
POST   /api/bookings
DELETE /api/bookings/:id
```

---
---

## Security Features

- Protected API Routes
- Environment Variable Protection
- Authentication Middleware
- CORS Security Configuration
- Cookie-Based Session Handling

---

## Developer Information

Name: Narayon Chandra Barman

GitHub:
https://github.com/narayon231206/

Email:
narayon231206@gmail.com

---

## License

This project is created for educational and learning purposes only.


## Development Guidelines
This frontend client is fully production-ready.

<!-- Last Checked: June 2026 -->

