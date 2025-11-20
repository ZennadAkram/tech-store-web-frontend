# E-Commerce Platform Frontend (React + AI Chat)

[![License: Private](https://img.shields.io/badge/License-Private-red.svg)](LICENSE)

## Overview
This repository contains the **frontend** of a full-stack e-commerce platform built in **React**. It connects to a Django REST Framework backend with **AI-powered assistance** for customer support.  

The frontend provides:

- Product browsing with filters and search  
- Shopping cart management  
- Order creation and tracking  
- User authentication with JWT  
- Real-time AI chat powered by **SmolAgents + DeepSeek**  

The platform is responsive, scalable, and designed for smooth user experience across web devices.

---

## Tech Stack

- **Frontend:** React (V18+)  
- **Routing:** react-router-dom  
- **State Management & Caching:** React Query (@tanstack/react-query)  
- **HTTP Requests:** Axios  
- **Notifications:** react-toastify  
- **Styling:** Tailwind CSS  
- **Authentication:** JWT tokens stored in localStorage  

---

## Features

### Users
- Sign up, login, and logout  
- JWT-protected endpoints for personal actions  
- Profile retrieval and updates  

### Products
- Browse products with filters: category, brand, price range  
- Search by keyword (name or description)  
- Sort by creation date, price, name, or rating  
- View detailed product pages with versions, colors, and images  

### Cart
- Add products to cart  
- View, update, and clear cart items  
- Dynamic cart total and item count  

### Orders
- Place orders from cart  
- View order history and details  
- Track order status (with AI chat integration)  

### Reviews
- Submit product reviews after purchase  
- Read product reviews with ratings  

### AI Chat Widget
- Ask questions about products, orders, or shipments  
- Uses **SmolAgents + DeepSeek** backend agent  
- Provides personalized responses using `user_id`  
- Handles errors gracefully and guides users if tools fail  
- FAQ knowledge embedded: shipping, returns, account, payments  
