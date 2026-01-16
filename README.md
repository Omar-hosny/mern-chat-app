# Real-time Chat Application

A full-stack real-time chat application built using the MERN stack (MongoDB, Express, React, Node.js). This application enables users to send and receive messages instantly, share images, and manage their implementation with a modern, responsive user interface.

## 🚀 Features

- **Real-time Messaging**: Instant message delivery using Socket.io.
- **Secure Authentication**: User sign-up and login utilizing JWT (JSON Web Tokens) and bcrypt for password hashing.
- **Image Sharing**: Integration with Cloudinary for seamless image uploads and storage.
- **Responsive Design**: Mobile-first approach using Tailwind CSS for a consistent experience across all devices.
- **State Management**: Efficient global state management with Zustand.
- **Data Fetching**: Optimistic updates and caching with TanStack Query.
- **Security**: Route protection and security features powered by Arcjet.
- **Theming**: Dark/Light mode support.

## 🛠️ Technology Stack

### Frontend

- **Framework**: [React](https://react.dev/) (v19) with [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (v4), `tailwind-merge`, `clsx`
- **UI Components**: [Radix UI](https://www.radix-ui.com/) primitives
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Data Fetching**: [TanStack Query](https://tanstack.com/query/latest)
- **Routing**: [React Router](https://reactrouter.com/) (v7)
- **Forms**: [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) validation
- **Real-time Client**: [Socket.io Client](https://socket.io/)
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/)

### Backend

- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Real-time Engine**: [Socket.io](https://socket.io/)
- **Authentication**: JWT, `cookie-parser`, `bcryptjs`
- **Security**: [Arcjet](https://arcjet.com/) (Bot detection, rate limiting, etc.)
- **Image Storage**: [Cloudinary](https://cloudinary.com/)
- **CORS**: Cross-Origin Resource Sharing enabled

## 📦 Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB installed locally or a MongoDB Atlas URI
- Cloudinary Account
- Arcjet Key (optional, for security features)

### Installation

1.  **Clone the repository**

    ```bash
    git clone <repository-url>
    cd mern-chat-app
    ```

2.  **Setup Backend**

    ```bash
    cd backend
    npm install
    ```

    Create a `.env` file in the `backend` directory with the following variables:

    ```env
    PORT=5001
    MONGODB_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    CLOUDINARY_CLOUD_NAME=your_cloud_name
    CLOUDINARY_API_KEY=your_api_key
    CLOUDINARY_API_SECRET=your_api_secret
    NODE_ENV=development
    ARCJET_KEY=your_arcjet_key
    ARCJET_ENV=development
    ```

3.  **Setup Frontend**
    ```bash
    cd ../frontend
    npm install
    ```
    Create a `.env` file in the `frontend` directory:
    ```env
    VITE_SERVER_URL=http://localhost:5001
    ```
    _(Note: Adjust the port if your backend runs on a different port)_

### Running the Application

1.  **Start the Backend Server**

    ```bash
    # In the backend directory
    npm run dev
    ```

2.  **Start the Frontend Development Server**

    ```bash
    # In the frontend directory
    npm run dev
    ```

3.  **Access the App**
    Open your browser and navigate to `http://localhost:5173` (or the port defined by Vite).

## 📄 Scripts

### Frontend

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the app for production (TypeScript compile + Vite build).
- `npm run lint`: Runs ESLint.
- `npm run preview`: Previews the production build.

### Backend

- `npm run dev`: Runs the server with Nodemon (auto-restart on changes).
- `npm start`: Runs the server in production mode.
