# AI Backend PRO

Full-stack task management web application built with Python, FastAPI, PostgreSQL and Next.js. Includes JWT authentication and REST API.

# Links

Frontend: 
https://project1-1-mk3a.onrender.com

Backend API:
https://project1-g35v.onrender.com

Swagger UI:
https://project1-g35v.onrender.com/docs

Demo Account:
email: demo@test.com 
password: demo123

Important: App is hosted on Render free tier.
First request may take around 30-60 seconds due to cold start.

# Features
- User registration
  New users can create an account by providing basics credentials,
  the system validates input and stores user data scurely in the database.
- User authentication (JWT)
  Users can log in using their credentials, authentication is handled using JSON Web Token,
  which allow secure communication between the frontend and backend API.
- AI chat powered by OPENAI
- Tet summarization
- Chat and summarization history per user
- Secure backend API
- Cloud deployment

# How it works

- A user opens the web application.
- User registers a new account or logs in.
- After authentication, user gains access to their personal dashboard.
- User can create two tasks.
- All operations are sent to the backend API.
- Backend processes the request and updates the PostgreSQL database.
- Frontend displays updated data to the user. 

# Tech Stack
Frontend:
- Next.js
- React
- TailwindCSS
- TypeScript

  Backend:
  - Python
  - Fast API
  - SQLAlchemy
  - JWT Authentication
 
Database:
- PostgreSQL

AI:
- OpenAI API

Infrastructure:
- Docker
- Render Cloud

#Architecture

User -> Next.js Frontend -> FastAPI Backend -> PostgreSQL -> OpenAI API
Deployment: Render Cloud

# Run locally:

git clone https://github.com/DavidWoszczyk/project1.git

Backend:
docker compose up --build

Frontend:
npm install
npm run dev

# Screeshots
![Home Page](screenshots/main.png)
![Register](screenshots/register.png)
![Login](screenshots/login.png)
![Dashboard](screenshots/dashboard.png)
![Chat](screenshots/chat.png)
![Summarize](screenshots/summarize.png)
![History](screenshots/history.png)
