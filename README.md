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
- Frontend: https://mediqueue-client.vercel.app/ (update after deployment)
- Backend API: https://mediqueue-server.onrender.com/ (update after deployment)

## Developer Information

Name: Masud Rana

GitHub:
https://github.com/masudranamdra

Email:
masud.dev01@gmail.com

---

# 🚀 Deployment

## Frontend Deployment
- Platform: Vercel

## Backend Deployment
- Platform: Render

---
# 📱 Responsive Design

SportNest is fully optimized for:

- Mobile Devices
- Tablets
- Laptops
- Desktop Screens

---
## License

This project is created for educational and learning purposes only.


Server :

# SportNest - Sports Facility Booking Platform (Server)

## Project Overview

SportNest Server is the backend API server for the SportNest sports facility booking platform. It manages authentication, facilities, bookings, and database operations using Node.js, Express.js, and MongoDB.

This project was developed to practice and demonstrate backend development concepts learned during coursework, including REST API creation, CRUD operations, authentication, database integration, middleware, and server deployment.

---

## Live Server URL

Server Live Link:

https://sportnest-mdra.onrender.com

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

### Clone Repository

```bash
git clone https://github.com/masudranamdra/SportNest-Server.git
```

### Move to Project Folder

```bash
cd SportNest-Server
```

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
GET    /api/facilities
GET    /api/facilities/:id
POST   /api/facilities
PUT    /api/facilities/:id
DELETE /api/facilities/:id
```

### Booking Routes

```bash
GET    /api/bookings
POST   /api/bookings
DELETE /api/bookings/:id
```

---

## Project Structure

```bash
SportNest-Server/
│
├── config/
│
├── controllers/
│
├── middleware/
│
├── models/
│
├── routes/
│
├── utils/
│
├── services/
│
├── database/
│
├── .env
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── server.js
└── README.md
```

---

## Security Features

- Protected API Routes
- Environment Variable Protection
- Authentication Middleware
- CORS Security Configuration
- Cookie-Based Session Handling

---

## Developer Information

Name: Masud Rana

GitHub:
https://github.com/masudranamdra

Email:
masud.dev01@gmail.com

---

## License

This project is created for educational and learning purposes only.


## Development Guidelines
This frontend client is fully production-ready.
