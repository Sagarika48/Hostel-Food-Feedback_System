# Hostel Food Feedback and Management System

**[➡️ Live Demo (Login Page)](https://pdreddydhanu.github.io/hostel-food-feedback/#/login)** 👈 *(Direct link to the login page on GitHub Pages)*

---

## 📸 Screenshots

*(Add screenshots of the login page, student dashboard, and admin dashboard here to give visitors a quick look at the app.)*

**Login Page**

![Login Screenshot](screenshots/login.png)

**Student Dashboard**

![Student Dashboard Screenshot](screenshots/student_dashboard.png)

**Admin Reports Dashboard**

![Admin Dashboard Screenshot](screenshots/admin_dashboard.png)

---

## 🌟 Project Overview

This system provides:
- **Students:** A simple, mobile-friendly way to rate meals, leave comments, and report urgent issues—one feedback per meal per day.
- **Admins:** Powerful dashboards to analyze feedback, manage menus, and handle student accounts and urgent reports.
- **Persistence:** All data is stored in the browser (Local Storage), so no backend is required.

---

## ✨ Features

### 👨‍🎓 Student Features
- View daily menu for breakfast, lunch, and dinner
- Submit 1–5 star ratings for each menu item
- Add comments for each meal
- Report urgent food issues (e.g., hygiene, undercooked food)
- Submit feedback once per meal per day (can submit again on a new day)
- Reset all your feedback with a single click

### 👑 Admin Features
- Secure admin login
- Visual analytics: top/bottom rated items, rating trends, feedback by meal type
- View and filter all feedback submissions
- Manage weekly menu (create, update, delete items)
- Full CRUD for student accounts
- View and address urgent food issue reports

---

## 🛠️ Technology Stack
- **Frontend:** React (TypeScript)
- **Styling:** TailwindCSS
- **Routing:** React Router
- **Charts:** Recharts
- **Persistence:** Browser Local Storage
- **Build Tool:** Vite

---

## 🚀 Getting the Code

1. **Clone the repository:**
   ```sh
   git clone https://github.com/PDReddyDhanu/Hostel-Food-Feedback-System.git
   # Or download the ZIP from GitHub and extract it
   ```
2. **Navigate to the project directory:**
   ```sh
   cd Hostel-Food-Feedback-System
   ```

---

## ⚡ Setup & Running Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Install dependencies
```sh
npm install
```

### Start the development server
```sh
npm run dev
```
- Open the URL shown in the terminal (usually `http://localhost:5173/`).
- The app will hot-reload on changes.

### Build for production
```sh
npm run build
```
- Outputs static files to the `dist/` folder.

### Preview the production build
```sh
npm run preview
```

---

## 🧑‍💻 Usage Guide

### Login Credentials
- **Admin:**
  - Email: `admin@hostel.com`
  - Password: `password123`
- **Student:**
  - Email: Use any from the pre-generated list (e.g., `aarav1@student.com`, `vivaan2@student.com`).
  - Password: `password123`

### Student Workflow
1. Log in with your student email and password.
2. View today’s menu and rate each meal (breakfast, lunch, dinner).
3. Add comments or report urgent issues as needed.
4. You can only submit feedback once per meal per day. On a new day, you can submit again.
5. Use the **Reset My Feedback** button to clear all your feedback if you want to start fresh.

### Admin Workflow
1. Log in as admin.
2. View analytics dashboards and all feedback.
3. Manage the weekly menu and student accounts.
4. Address urgent food issue reports.

---

## 📂 Project Structure
```
/
├── components/         # React components
│   ├── admin/          # Admin-specific components
│   ├── student/        # Student-specific components
│   └── ui/             # Reusable UI elements (Button, Card, etc.)
├── context/            # AppContext for state management
├── hooks/              # Custom React hooks (useLocalStorage)
├── App.tsx             # Main application component with routing
├── constants.ts        # Shared constants
├── index.html          # Main HTML entry point
├── index.tsx           # React root renderer
├── README.md           # This file
└── types.ts            # TypeScript type definitions
```

---

## 🔄 How to Reset Data
- **For students:** Use the **Reset My Feedback** button on your dashboard to clear only your feedback.
- **For a full reset:** Open your browser’s developer tools, go to Application/Storage > Local Storage, and clear all keys for this app.

---

## 🤝 Contributing
1. Fork this repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

Bug reports and feature requests are welcome via [GitHub Issues](https://github.com/PDReddyDhanu/Hostel-Food-Feedback-System/issues).

---

## ❓ FAQ & Troubleshooting

**Q: I can’t log in as a student. Where do I find student emails?**
- A: Log in as admin and go to the Manage Students section for a full list.

**Q: My feedback isn’t saving or updating.**
- A: Make sure you’re using the app in a modern browser and haven’t disabled local storage.

**Q: How do I deploy this app?**
- A: You can deploy the `dist/` folder to any static hosting (GitHub Pages, Netlify, Vercel, etc.).

**Q: How do I reset all data?**
- A: See the “How to Reset Data” section above.

---

## 📬 Contact
- **GitHub:** [PDReddyDhanu](https://github.com/PDReddyDhanu)
- **LinkedIn:** [Dhanunjay Reddy Palakolanu](https://www.linkedin.com/in/dhanunjay-reddy-palakolanu-pdr/)
- **Instagram:** [p.d.reddy_dhanu04_08](https://www.instagram.com/p.d.reddy_dhanu04_08/)

---

*This project is open source and maintained with ❤️. Contributions are welcome!*
