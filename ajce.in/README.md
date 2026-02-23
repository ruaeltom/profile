# AJCE Modern Web Experience 

> **A Youth-Centric, Modern Web Experience for Amal Jyothi College of Engineering**

Welcome to the repository for the **AJCE Website Revamp**! This project aims to transform the digital presence of [Amal Jyothi College of Engineering](https://www.ajce.in/) into a vibrant, modern, and engaging platform that resonates with students, faculty, and visitors alike.

## 🌟 Project Vision

Our mission is to build a sleek, high-performance web application that goes beyond traditional institutional websites. We are focusing on:

*   **Youth-Centric Design:** Vibrant colors, glassmorphism, smooth animations, and intuitive navigation.
*   **Modern Tech Stack:** Leveraging the power of the MERN stack for speed, scalability, and flexibility.
*   **User Experience:** Prioritizing seamless interaction and accessibility across all devices.

## 🛠️ Technology Stack

This project is built using the **MERN** stack:

*   **Frontend:**
    *   [React.js](https://reactjs.org/) (bootstrapped with [Vite](https://vitejs.dev/)) - For a lightning-fast UI.
    *   [Tailwind CSS](https://tailwindcss.com/) - For rapid, utility-first styling.
    *   [Framer Motion](https://www.framer.com/motion/) - For production-ready animations.
*   **Backend:**
    *   [Node.js](https://nodejs.org/) & [Express.js](https://expressjs.com/) - Robust server-side logic.
*   **Database:**
    *   [MongoDB](https://www.mongodb.com/) - Flexible NoSQL database.

## ✨ Key Features

This revamp includes several dedicated modules designed to showcase the best of AJCE:

1.  **🚀 Modern Home Page**: A visually stunning landing page with dynamic hero sections and highlights.
2.  **📚 Dedicated Course Pages**: Attractive, detailed layouts for all engineering courses.
3.  **🎓 College Portfolio**: An immersive gallery and achievement showcase.
4.  **📞 Interactive Contact Section**: Integrated maps and easy-to-use inquiry forms.
5.  **Department & Faculty Modules**:
    *   Detailed profiles for **HODs** and **Teachers**.
    *   Comprehensive **Department** pages with curriculum info.

## 🚀 Getting Started

Follow these instructions to get a local copy of the project up and running.

### Prerequisites

Ensure you have the following installed:
*   [Node.js](https://nodejs.org/) (v14 or higher)
*   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
*   [MongoDB](https://www.mongodb.com/) (Local or Atlas)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/ajce-web-revamp.git
    cd ajce-web-revamp
    ```

2.  **Install dependencies (Root):**
    ```bash
    npm install
    ```

3.  **Setup Client:**
    ```bash
    cd client
    npm install
    ```

4.  **Setup Server:**
    ```bash
    cd ../server
    npm install
    ```

5.  **Environment Variables:**
    Create a `.env` file in the `server` directory and add your MongoDB connection string and other secrets.

    ```env
    MONGO_URI=your_mongodb_connection_string
    PORT=5000
    ```

6.  **Run the Application:**
    You can run both client and server concurrently (if configured) or in separate terminals.

    *   **Client:** `npm run dev` (in `client/` directory)
    *   **Server:** `npm start` (in `server/` directory)

## 📂 Project Structure

```
ajce-web-revamp/
├── client/          # React frontend application
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       └── ...
├── server/          # Express backend application
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── ...
└── README.md        # Project documentation
```

## 🤝 Contributing

We welcome contributions! Please see our [CONTRIBUTING.md](CONTRIBUTING.md) for details on how to submit pull requests, report issues, and suggest improvements.

---

For **Amal Jyothi College of Engineering**.
