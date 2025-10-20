# DreamTeam Builder – Phase 2

## Student Information
- **Name:** Manuel Ocampo Ortegon  
- **Student ID:** N01707308  
- **Course:** CPAN 213 – Cross-Platform Mobile App Development  
- **Institution:** Humber College  

## Project Description
DreamTeam Builder is a backend API that allows users to create their own soccer dream team using real FIFA player data.  
The API reads from a cleaned dataset containing player names, ratings, clubs, positions, and nationalities.  
Users can perform CRUD operations on both players and teams, search for players by name, and validate inputs when creating or updating records.

## Technologies Used
- Node.js  
- Express.js  
- Express Validator  
- CSVtoJSON  
- File System (fs) for JSON data persistence  

## Modular Architecture Overview
```
src/
 ├── data/
 │    ├── fifa_cleaned.csv
 │    ├── players.json
 │    └── teams.json
 │
 ├── modules/
 │    ├── players/
 │    │   ├── models/playersModel.js
 │    │   ├── routes/playersRoutes.js
 │    │   └── middlewares/playersValidator.js
 │    │
 │    └── teams/
 │        ├── models/teamsModel.js
 │        ├── routes/teamsRoutes.js
 │        └── middlewares/teamsValidator.js
 │
 └── server.js
```

## Features Implemented
- Data Structure & Sample Data: Converted the Kaggle FIFA Players dataset into players.json using convertDataset.js.  
- Modular Express Architecture: Feature-based folder organization with independent modules for players and teams.  
- CRUD Operations: Implemented Create, Read, Update, and Delete in model files (playersModel.js, teamsModel.js).  
- Validation: Used express-validator to enforce data integrity in POST and PUT requests.  
- Middlewares: Application-level middlewares for JSON parsing, 404 handling, and global error handling.  
- Proper HTTP Responses: Returns consistent JSON responses with proper status codes (200, 201, 400, 404, 500).  

## Dataset Source
Dataset: [FIFA Players Ratings – Kaggle](https://www.kaggle.com/datasets/rishidamarla/fifa-players-ratings)  
File used: fifa_cleaned.csv (converted into players.json for backend usage).  

## How to Run the Project
### 1. Install dependencies
```bash
npm install
```
### 2. Convert the dataset to JSON (one-time)
```bash
node convertDataset.js
```
### 3. Start the server
```bash
node server.js
```
Server runs on:  
http://localhost:3000

## API Endpoints
### Players
| Method | Endpoint | Description |
|--------|-----------|-------------|
| GET | /api/players | Get all players |
| GET | /api/players/:id | Get a player by ID |
| GET | /api/players?name=<query> | Search players by name |
| POST | /api/players | Add a new player |
| PUT | /api/players/:id | Update a player |
| DELETE | /api/players/:id | Delete a player |

### Teams
| Method | Endpoint | Description |
|--------|-----------|-------------|
| GET | /api/teams | Get all teams |
| GET | /api/teams/:id | Get a team by ID |
| POST | /api/teams | Create a new team |
| PUT | /api/teams/:id | Update a team |
| DELETE | /api/teams/:id | Delete a team |
