# Portfolio Backend

This repository contains the backend code for the Portfolio project. The backend is responsible for handling authentication, serving API endpoints, and managing data.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Frontend Repository](#frontend-repository)
- [Deployment](#deployment)
- [License](#license)
- [Contact](#contact)

## Introduction

The backend for the Portfolio project is built with Node.js and Express.js. It provides RESTful API endpoints for the frontend to interact with the database and manage authentication.

## Features

- JWT-based authentication
- RESTful API endpoints
- Error handling
- Secure token verification

## Technologies Used

- Node.js
- Express.js
- JSON Web Tokens (JWT)
- MongoDB (or your chosen database)
- dotenv (for environment variables)
- Morgan: Logs HTTP requests.
- CORS: Enables Cross-Origin Resource Sharing.
- Express.json: Parses incoming JSON requests.
- Express.urlencoded: Parses incoming URL-encoded data.
- cookie-parser: Parses cookies attached to client requests.

## Project Structure

```bash
portfolio-backend/
│
├── .github/               # GitHub configuration files (e.g., workflows)
├── models/                # Mongoose models
├── .gitignore             # Git ignore file
├── index.js               # Entry point, middlewere, controller for the application
├── package-lock.json      # Lockfile for npm dependencies
├── package.json           # Node.js dependencies and scripts
├── utils.js               # Utility functions (e.g., JWT authentication)
└── ...
```

### Breakdown of the Code

- **index.js**: Main entry point of the application, where the server is set up and routes are handled.
- **models/**: Contains database models using Mongoose.
- **utils.js**: Contains utility functions like `authenticateToken` for JWT verification.

## Frontend Repository

The frontend for this project is hosted in a separate repository. You can find it [here](https://github.com/sahadcse/portfolio-frontend).

## Deployment

The backend is deployed on [Microsoft Azure]. You can access the live API [here](https://portfolio-backend-e7agethedfh3cyfv.eastasia-01.azurewebsites.net/).

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contact

- **MD SAHADUZZAMAN**: [MY Portfolio](https://sahad.vercel.app/)
- **Email**: [sahaduzzaman.cse@gmail.com](mailto:sahaduzzaman.cse@gmail.com)
- **GitHub**: [@sahadcse](https://github.com/sahadcse)

---
