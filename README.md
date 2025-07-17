# 📦 Contacts & Tags API

## 📄 Overview
A RESTful API built with Node.js, Express, and MongoDB that allows users to manage contacts and organize them with tags. Supports full CRUD operations and includes Swagger documentation.

## 🚀 Features
- Create, view, update, and delete contacts
- Filter contacts by company or tags
- Create and manage tags
- Input validation and error handling
- Swagger UI at `/api-docs`

## 🧪 API Endpoints

### Contact Routes:
- `GET /contacts`
- `GET /contacts/:id`
- `POST /contacts`
- `PUT /contacts/:id`
- `DELETE /contacts/:id`

### Tag Routes:
- `GET /tags`
- `POST /tags`

## ⚙️ Technologies
- Node.js
- Express
- MongoDB (Mongoose)
- Swagger
- dotenv

## 🌐 Deployment
Hosted on Render. Environment variables are secured using `.env`.
