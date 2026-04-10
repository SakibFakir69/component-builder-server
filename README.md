# 🧠 AI Component Generator Server

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-635BFF?style=for-the-badge&logo=stripe&logoColor=white)
![Gemini](https://img.shields.io/badge/Google%20Gemini-8E75B2?style=for-the-badge&logo=google&logoColor=white)

A powerful, production-ready backend server for an **AI-powered UI component generator**. Send a natural language prompt — get back a fully generated UI component, powered by Google Gemini AI.

[Features](#-features) · [Tech Stack](#-tech-stack) · [Getting Started](#-getting-started) · [API Reference](#-api-reference) · [Architecture](#-architecture)

</div>

---

## ✨ Features

| Feature | Description |
|---|---|
| 🤖 AI Generation | Generate UI components from natural language using Google Gemini API |
| 🔐 JWT Auth | Secure login/register with access tokens and httpOnly cookies |
| 💳 Stripe Payments | Handle subscriptions and one-time payments |
| 🛡️ Input Validation | Schema-based validation with Zod |
| 🧪 Testing | Unit and integration tests with Jest & Supertest |
| 🌐 CORS Ready | Configured for seamless frontend communication |

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Language | TypeScript |
| Framework | Express.js |
| Database | MongoDB + Mongoose |
| Authentication | JWT + Sessions + bcrypt |
| AI | Google Gemini API |
| Payments | Stripe |
| Validation | Zod |


---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- MongoDB (local or Atlas)
- Stripe account
- Google Gemini API key

### Installation

```bash
# Clone the repository
git clone https://github.com/SakibFakir69/component-builder-server.git

# Navigate into the project
cd component-builder-server

# Install dependencies
npm install
```

### Environment Setup

Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
STRIPE_SECRET_KEY=your_stripe_secret_key
GEMINI_API_KEY=your_gemini_api_key
CLIENT_URL=http://localhost:3000
```

> ⚠️ Never commit your `.env` file. It is already listed in `.gitignore`.

### Running the Server

```bash
# Development (with hot reload)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run tests
npm test
```

---

## 📂 Project Structure

```
src/
├── controllers/        # Route handler logic
├── models/             # Mongoose schemas & models
├── routes/             # API route definitions
├── middleware/         # Auth guards & error handlers
├── utils/              # Helper functions & constants
└── server.ts           # Application entry point
```

---

## 📡 API Reference

### Auth

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/auth/register` | Register a new user | ❌ |
| `POST` | `/api/auth/login` | Login and receive JWT | ❌ |

### User

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/api/user/profile` | Get current user profile | ✅ |

### AI Generation

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/ai/generate` | Generate a UI component from a prompt | ✅ |

**Request body for `/api/ai/generate`:**
```json
{
  "prompt": "Create a modern login form with email and password fields"
}
```

**Response:**
```json
{
  "success": true,
  "component": "<generated HTML/JSX code here>"
}
```

### Payments

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/payment` | Create a Stripe payment intent | ✅ |

---

## 🧠 How AI Generation Works

```
User sends prompt
      ↓
Server validates input (Zod)
      ↓
Auth middleware checks JWT
      ↓
Gemini API receives structured prompt
      ↓
AI generates UI component code
      ↓
Response returned to client
```

---

## 🔐 Security

- Passwords hashed with **bcrypt**
- **JWT** tokens stored in `httpOnly` cookies
- All inputs validated with **Zod** before processing
- Environment variables for all secrets — never hardcoded

---




## 👨‍💻 Author

**Sakib Fakir**
MERN Stack Developer · AI Enthusiast

[![GitHub](https://img.shields.io/badge/GitHub-SakibFakir69-181717?style=flat&logo=github)](https://github.com/SakibFakir69)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
