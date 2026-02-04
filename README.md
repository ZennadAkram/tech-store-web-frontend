# E-Commerce Platform Frontend (React + AI Chat)

[![React](https://img.shields.io/badge/React-18.2+-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3+-06B6D4?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## 🚀 Overview

A modern, feature-rich e-commerce platform frontend built with React, featuring AI-powered customer support integration. This application connects to a Django REST backend and provides a seamless shopping experience with intelligent assistance.

### ✨ Key Features
- **AI-Powered Shopping Assistant** - Integrated chat widget using SmolAgents + DeepSeek
- **Smart Product Discovery** - Advanced filtering, search, and sorting capabilities
- **Frictionless Checkout** - Streamlined cart management and order processing
- **Personalized Experience** - User profiles, order history, and tailored recommendations
- **Real-time Updates** - Dynamic cart, order tracking, and notifications

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 18+ with TypeScript
- **Routing:** React Router DOM v6
- **State Management:** TanStack Query (React Query) for server state
- **HTTP Client:** Axios with interceptors
- **UI Components:** Tailwind CSS + Headless UI
- **Notifications:** React Toastify
- **Icons:** React Icons

### Integration
- **Authentication:** JWT (Bearer tokens)
- **Backend API:** Django REST Framework
- **AI Engine:** SmolAgents + DeepSeek LLM
- **Storage:** Browser localStorage (tokens)

---

## 📋 Feature Breakdown

### 👤 User Management
- Secure registration and login with JWT authentication
- Profile management and personal information updates
- Protected routes and API endpoints
- Session persistence with automatic token refresh

### 🛍️ Product Catalog
- **Smart Browsing:** Category, brand, and price filtering
- **Advanced Search:** Keyword search across name and description
- **Flexible Sorting:** By price, rating, popularity, and date
- **Rich Details:** Product variations, colors, images, and specifications

### 🛒 Shopping Cart
- Add/remove products with quantity adjustment
- Real-time cart total and item count
- Persistent cart across sessions
- One-click checkout process

### 📦 Order System
- Seamless order placement from cart
- Order history with detailed tracking
- Status updates and delivery notifications
- Review system for purchased items

### 🤖 AI Chat Assistant
- **Context-Aware Support:** Answers product, order, and shipping questions
- **Personalized Responses:** Uses user_id for customized assistance
- **FAQ Integration:** Knowledge base for common queries
- **Error Handling:** Graceful fallbacks when tools are unavailable
- **Real-time Interaction:** Live chat with AI agent

---

---

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn/pnpm
- Backend repo url : https://github.com/ZennadAkram/tech-store-backend
- AI chat service configured

### Installation
```bash
# Clone repository
git clone https://github.com/ZennadAkram/tech-store-web-frontend.git
cd ecommerce-frontend

# Install dependencies
npm install

# Start development server
npm run dev
