# Cyberpunk Image Searcher

A full-stack MERN application for searching, saving, and curating images with a personalized cyberpunk aesthetic. This project integrates the Unsplash API with multi-provider OAuth (Google & GitHub) for a secure, persistent, and user-centric experience.

<br>


## Features

* **Secure OAuth Authentication:** Users can log in via Google or GitHub using Passport.js.
* **Third-Party API Integration:** Fetches and displays high-quality images from the Unsplash API.
* **Personalized Search History:** Each user has a private, time-stamped log of their past search terms.
* **Global "Top Searches" Banner:** A public-facing banner that aggregates and displays the top 5 most frequent search terms from all users.
* **Interactive UI:** A multi-select, 4-column image grid with a dynamic counter.
* **Responsive Cyberpunk Theme:** A dark, neon-infused, and responsive UI built for modern web browsers.

---

## Tech Stack

| Category | Technology |
| :--- | :--- |
| **Frontend** | React.js |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (with Mongoose) |
| **Authentication** | Passport.js (GoogleStrategy, GitHubStrategy), express-session |
| **API** | Unsplash API, Axios |

---

## Getting Started

Follow these instructions to get a local copy up and running.

### Prerequisites

* [Node.js](https://nodejs.org/) (v18 or later)
* [MongoDB](https://www.mongodb.com/) (a local instance or a free MongoDB Atlas cluster)
* [Git](https://git-scm.com/)

---

## Folder Structure

The repository is structured as a monorepo with two main folders, `/client` and `/server`.

/
├── **client/** (React Frontend)
│   ├── public/
│   ├── src/
│   │   ├── components/ (All React components)
│   │   │   ├── ImageCard.js
│   │   │   ├── ImageList.js
│   │   │   ├── LoginPage.js
│   │   │   ├── SearchPage.js
│   │   │   └── TopSearches.js
│   │   ├── App.js         (Main app component, handles routing)
│   │   ├── index.css      (Global cyberpunk styles)
│   │   └── index.js       (Entry point)
│   └── package.json     (Client dependencies and proxy setting)
│
└── **server/** (Node.js/Express Backend)
    ├── middleware/
    │   └── requireLogin.js (Auth check middleware)
    ├── models/
    │   ├── User.js        (User schema for OAuth)
    │   └── Search.js      (Search history schema)
    ├── routes/
    │   ├── analyticsRoutes.js (GET /api/top-searches)
    │   ├── authRoutes.js      (Login, logout, current_user)
    │   └── searchRoutes.js    (POST /api/search, GET /api/history)
    ├── services/
    │   └── passport.js    (All Passport.js OAuth strategy config)
    ├── .env.example     (Environment variable template)
    ├── .gitignore       (Hides node_modules and .env)
    ├── index.js         (Main server entry point)
    └── package.json     (Server dependencies)

---

## API Endpoints (cURL)

All private routes require an active session cookie, which is handled automatically by the browser after login.

### Authentication

**Initiate Google Login**


# This is a browser redirect, not a cURL request.
GET /auth/google

---

##Visual Proof

1.  <img width="2565" height="1384" alt="LoginPage" src="https://github.com/user-attachments/assets/61645c98-ecd8-49f0-8a9f-dd0cc7d1c18f" />

2. <img width="2681" height="1472" alt="SearchPage_with_TopSearches" src="https://github.com/user-attachments/assets/7f549a5a-7ec2-49f6-9f1d-8a5081bb5f77" />



### Clone the Repository

```bash
git clone [https://github.com/your-username/your-repository-name.git](https://github.com/your-username/your-repository-name.git)
cd your-repository-name
