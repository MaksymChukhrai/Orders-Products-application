# Orders & Products SPA Application

A full-stack application for managing orders and products with real-time features, developed using modern web technologies.

## Features

- 📦 View and manage orders and products
- 🔎 Filter products by type
- 📊 View product statistics using Web Workers
- 🔄 Real-time active sessions counter
- 📱 PWA support for offline functionality
- 🚀 Responsive design with animations

## Tech Stack

### Frontend
- React with TypeScript
- Redux Toolkit for state management
- GraphQL with Apollo Client
- CSS Modules with SCSS (BEM methodology)
- Socket.io for real-time features
- Framer Motion for animations
- Web Workers for intensive calculations
- PWA support

### Backend
- Node.js with Express
- GraphQL with Apollo Server
- MongoDB with Mongoose
- WebSockets (Socket.io)
- Event-Driven Architecture

### DevOps
- Docker for containerization
- Docker Compose for multi-container setup

## Getting Started

### Prerequisites
- Node.js 16+
- Docker and Docker Compose (optional, for containerized setup)
- MongoDB (will be automatically set up with Docker Compose)

### Installation

#### With Docker (Recommended)

# Clone the repository
git clone https://github.com/yourusername/orders-products.git
cd orders-products

# Start the application with Docker Compose
docker-compose up -d

# The application will be available at:
# - Frontend: http://localhost:80
# - Backend API: http://localhost:4000/graphql

Manual Setup

# Clone the repository
git clone https://github.com/yourusername/orders-products.git
cd orders-products

# Backend setup
cd backend
npm install
npm run build
npm start

# In a new terminal, setup frontend
cd ../frontend
npm install
npm run build
npm start

# The application will be available at:
# - Frontend: http://localhost:3000
# - Backend API: http://localhost:4000/graphql

Development
Backend

```
cd backend
npm run dev
```


