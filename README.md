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

### 1. Clone the Repository

```bash
git clone [https://github.com/your-username/your-repository-name.git](https://github.com/your-username/your-repository-name.git)
cd your-repository-name
