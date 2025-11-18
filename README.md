# DreamTeam Builder

### Phase 3 & 4 — MongoDB Atlas + Mongoose Integration & React Frontend

**Author:** Manuel Ocampo Ortegon  
**Course:** CPAN-212 – Modern Web Technologies  
**Project Type:** Node.js + Express + MongoDB + Mongoose + React.js  
**Repository:** [https://github.com/ManuelOcampo07/DreamTeam-Builder](https://github.com/ManuelOcampo07/DreamTeam-Builder)

---

## Project Description

DreamTeam Builder is a full-stack web application that allows users to explore and manage soccer player data to build their own “Dream Team”. It integrates a real-world FIFA dataset, provides an Express-based API for data management, and features an interactive React frontend for a rich user experience.

**Backend Features:**
- Player search by name, nationality, and position
- Filtering by rating, age, and potential
- Sorting and pagination
- Full CRUD (Create, Read, Update, Delete) operations
- MongoDB Atlas integration using Mongoose ORM
- Provides structured JSON responses for frontend consumption.

**Frontend Features:**
- Interactive user interface built with React.js.
- Search bar to find players from the database.
- Displays detailed information for selected players.
- Visual football field to create a team lineup (currently 4-4-2 formation).
- Allows assigning players to specific positions on the field with visual feedback.

---

## Tech Stack

| Technology        | Purpose                            |
| ----------------- | ---------------------------------- |
| Node.js + Express | Backend server framework           |
| MongoDB Atlas     | Cloud-hosted database              |
| Mongoose          | ODM for MongoDB                    |
| React.js + Vite   | Frontend UI library & build tool   |
| dotenv            | Secure environment variables       |
| CORS              | Cross-Origin Resource Sharing      |
| Postman           | API testing                        |
| JavaScript (ES6+) | Core language for both frontend/backend |
| HTML/CSS/SVG      | Frontend structure & styling       |

---

## Project Structure

The project is organized into two main directories:

-   `backend/`: Contains the Express.js server, API routes, controllers, models, and database connection logic.
-   `frontend/`: Contains the React.js application for the user interface.

```
your-project-name/
├── backend/                  # Express.js backend
│   ├── modules/
│   ├── shared/
│   ├── src/
│   ├── .env
│   ├── package.json
│   └── server.js
├── frontend/                 # React.js frontend
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── index.html
├── .gitattributes
├── .gitignore
├── phase-3.pdf
├── phase-4.pdf
├── ProjectDescription.md
└── README.md
```

---

## How to Run the Application

To run the full-stack application, you need to start both the backend and the frontend servers.

### 1. Backend Setup and Start

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Configure Environment Variables:**
    Create a `.env` file in the `backend/` directory with your MongoDB Atlas connection string.
    ```
    MONGODB_URI="mongodb+srv://<your_username>:<your_password>@cluster0.xxxxx.mongodb.net/FIFA_DB?retryWrites=true&w=majority"
    ```
    Replace `<your_username>`, `<your_password>`, and `cluster0.xxxxx.mongodb.net` with your actual Atlas credentials. Ensure `FIFA_DB` is the name of your database containing player data.
4.  **Start the backend server:**
    ```bash
    npm run dev
    ```
    The backend API will be running on `http://localhost:3000`.

### 2. Frontend Setup and Start

1.  **Open a new terminal window.**
2.  **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    ```
4.  **Start the frontend development server:**
    ```bash
    npm run dev
    ```
    The frontend application will typically open in your browser at `http://localhost:5173` (or another port if 5173 is in use).

---

## Features Implemented for Phase 4

-   **Frontend UI with React.js**: Responsive design for player search and team building.
-   **Player Search**: Search for players by name from the MongoDB database.
-   **Player Details Display**: View comprehensive information for a selected player.
-   **Interactive Football Field**: A visual representation of a football pitch (4-4-2 formation).
-   **Player Assignment**: Click to select a player from search results, then click a position on the field to assign them. Players can be moved between positions.
-   **API Integration**: Frontend communicates with the Express.js backend to fetch player data.

Enjoy building your DreamTeam!
