# Task Manager App

This is a full-stack Kanban-style task management application. It allows users to log in, manage tasks across columns (To Do, In Progress, Done), and supports role-based access for administrators.

## Features

### Authentication & Authorization

* JWT-based login and registration
* Passwords hashed with BCrypt

Any user can create a board and they get Owner status for that board.

### Admin (& Owner) Capabilities

* Board and task creation protected by Spring Security
* Adding new users to the board
* Different permission system for the new users (Admin, Member)

### Member Features

* View Kanban board with tasks categorized by status
* Create, update, delete tasks
* Drag and drop to reorder tasks across columns
* Modal-based task creation and editing
* Filter tasks by name

---

## Technologies Used

### Backend

* Java 21
* Spring Boot
* Spring Security + JWT
* PostgreSQL (via Docker)
* JPA + SQLx for persistence
* Swagger UI for API documentation

### Frontend

* React (Vite)
* LocalStorage for token management

---

## Project Structure

### Backend (Spring Boot)

```
src/main/java/com/taskmanager/backend
├── controller
├── dto
├── entity
├── exception
├── repository
├── security
├── service
└── config
```

* `JwtAuthenticationFilter`: Intercepts HTTP requests and validates JWT
* `SecurityConfig`: Defines route access rules and session policy
* `AuthService`: Handles login/register
* `CustomUserDetails`: Integrates user roles with Spring Security

### Frontend (React)

```
src/
├── pages
│   ├── Auth
│   │   ├── LoginPage.jsx
│   │   └── RegisterPage.jsx
│   └── BoardPage
├── components
│   ├── Column
│   ├── TaskCard
│   ├── TaskForm
│   └── TaskFormModal
├── api
├── utils
└── App.jsx
```

---

## How Authentication Works

* User logs in/registers via frontend
* Backend responds with a JWT
* JWT is stored in `localStorage`
* On each request, frontend attaches token in the `Authorization` header
* Backend validates token and authorizes based on role

---

## Run Instructions

**Backend**

1. Connect Intellij to Database:
Connect to PostgreSQL with new user of 'taskuser' and database 'taskmanager'. After connection is setup JPA will generate the necessary schema

2. Run backend server:
Run through Intellij IDEA 
or
```
mvn spring-boot:run
```

**Frontend**

```bash
npm install
npm run dev
```

Then visit: `http://localhost:5173`

---

## API Documentation

After running backend, access:

```
http://localhost:8080/swagger-ui/index.html
```

If it's blank:

* Make sure `/v3/api-docs/**`, `/swagger-ui/**` are permitted in `SecurityConfig`
* Verify Swagger dependency is present

---

## Future Improvements

* Refresh token flow
* GitHub integration for dev workflow automation
* WebSocket-based real-time updates

