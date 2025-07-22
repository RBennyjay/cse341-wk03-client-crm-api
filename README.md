# 📦 Contacts, Tags & Appointments API

## 📄 Overview
A RESTful API built with Node.js, Express, and MongoDB that allows users to manage contacts, organize them with tags, and schedule appointments. Supports full CRUD operations with Swagger documentation for easy testing and exploration.

## 🚀 Features
- Create, view, update, and delete contacts
- Filter contacts by company or tags
- Create and manage tags
- Schedule, update, and manage appointments
- Input validation and error handling
- ISO 8601 date format with UTC timezone
- Swagger UI available at `/api-docs`

## 🧪 API Endpoints

### 📇 Contact Routes:
- `GET /contacts`
- `GET /contacts/:id`
- `POST /contacts`
- `PUT /contacts/:id`
- `DELETE /contacts/:id`

### 🏷️ Tag Routes:
- `GET /tags`
- `POST /tags`

### 📆 Appointment Routes:
- `GET /appointments`
- `GET /appointments/:id`
- `POST /appointments`
- `PUT /appointments/:id`
- `DELETE /appointments/:id`

## ⚙️ Technologies
- Node.js
- Express
- MongoDB (Mongoose)
- Swagger
- dotenv

## 🌐 Deployment
Hosted on Render. Environment variables are secured using `.env`.

## 📚 Notes
- Date fields (e.g., `date`, `createdAt`, `updatedAt`) use ISO 8601 format and are stored in UTC.
- All endpoints are testable via Swagger UI at `/api-docs`.

