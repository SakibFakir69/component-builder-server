AI Component Generator Server

A powerful backend server for an AI-powered UI component generator built using Gemini AI. This server handles authentication, AI generation, payments, and API management for generating dynamic UI components.

📌 Features
🤖 AI-powered UI component generation using Google Gemini API
🔐 JWT Authentication (Login / Register / Protected Routes)
🔑 Password hashing using bcrypt
🍪 Session & Cookie management
💳 Payment integration with Stripe
📦 RESTful API with Express.js
🗄️ Database management using MongoDB & Mongoose
🛡️ Input validation with Zod
🌐 CORS configured for frontend communication
🧪 Testing setup using Jest & Supertest
🛠️ Tech Stack
Backend: Node.js, Express.js
Language: TypeScript
Database: MongoDB
Authentication: JWT + Sessions
AI Integration: Google Gemini API
Payments: Stripe
📂 Project Structure
src/
 ├── controllers/     # Route logic
 ├── models/          # Mongoose schemas
 ├── routes/          # API routes
 ├── middleware/      # Auth & error handling
 ├── utils/           # Helper functions
 └── server.ts        # Entry point
⚙️ Installation
# Clone the repo
git clone https://github.com/SakibFakir69/component-builder-server.git

# Go to project directory
cd component-builder-server

# Install dependencies
npm install
🔑 Environment Variables

Create a .env file in the root:

PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
STRIPE_SECRET_KEY=your_stripe_key
GEMINI_API_KEY=your_gemini_api_key
CLIENT_URL=http://localhost:3000
▶️ Running the Server
# Development
npm run dev

# Build
npm run build

# Production
npm start
🧪 Run Tests
npm test
🔌 API Endpoints (Example)
Method	Route	Description
POST	/api/auth/register	Register user
POST	/api/auth/login	Login user
GET	/api/user/profile	Get user profile
POST	/api/ai/generate	Generate UI component
POST	/api/payment	Handle Stripe payment
🧠 How AI Works
User sends a prompt (e.g., "Create a modern login form")
Server sends request to Gemini API
AI generates UI component code
Response is returned to frontend
🔐 Security Features
Password hashing with bcrypt
JWT-based authentication
Secure cookies & sessions
Input validation with Zod
🚧 Future Improvements
🔄 Rate limiting for API
📊 Usage analytics dashboard
🧩 More UI framework support (React, Vue, Tailwind)
⚡ Caching AI responses
👨‍💻 Author

Sakib Fakir
MERN Stack Developer | AI Enthusiast
