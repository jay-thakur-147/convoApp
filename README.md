# 📝 WoRDToPdF - Word to PDF Converter

Convert your `.doc` or `.docx` files to clean, high-quality PDFs instantly — no login, no fuss. Built with ❤️ using **React (Vite)**, **Express**, **LibreOffice**, and containerized with **Docker**. Deployed via **Render**.

---

## 🚀 Live Demo

🌐 Frontend: https://word-to-pdf-converter-ezfj.onrender.com 
🔧 Backend: https://convoapp-sl1o.onrender.com

---

## ✨ Features

- 📤 Upload Word (.doc/.docx) documents
- ⚙️ Converts Word to PDF using LibreOffice on the server
- 📥 Instant download after conversion
- ⏳ Real-time progress bar during upload
- 🔔 Toast notifications for status updates
- 🧭 Animated, stylish Navbar
- 🎉 Fully responsive, user-friendly UI

---

## 🧰 Tech Stack

### Frontend:
- ⚛️ React + Vite
- Tailwind CSS
- Axios
- React Toastify
- Framer Motion + React Icons

### Backend:
- Node.js + Express
- `LibreOffice` CLI for conversion
- Multer (for file uploads)
- Dockerized for easy deployment

---

🌐 Deployment (Render)
Deploy backend as a Docker app (add LibreOffice in Dockerfile)

Deploy frontend as static Vite app (npm run build then serve dist/)


📁 File Structure
word-to-pdf/
│
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── Navbar.jsx
│   │   └── Home.jsx
│   ├── index.html
│   └── vite.config.js
│
├── Backend/
│   ├── server.js
│   ├── Dockerfile
│   └── ...
│
├── README.md


🙌 Credits
Created by Jay Kishor Thakur
Frontend Developer | Tech Enthusiast | React + Node.js | Docker Lover
🌐 LinkedIn- https://www.linkedin.com/in/jay-kishor-thakur-b91508243/







