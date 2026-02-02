# Medical Case Management App

A minimal full-stack application for managing patient information and tracking vitals, built with **Node.js + Express (backend)** and **React + TypeScript (frontend)**. This README includes instructions to run the app locally and details of the implemented API endpoints.

---

## How to Run the Application

Follow these steps to set up the project and run it locally.

### 1. Clone the Repository

```bash
git clone https://github.com/CanNetJam/patients-dashboard-full.git
cd patients-dashboard-full
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install

```

### 3. Install Frontend Dependencies

```bash
cd frontend
npm install

```

### 4. Set Up Environment Variables
- Frontend: VITE_BACKEND_API_BASE_URL=http://localhost:3001/api
- Backend: PORT=3001, FRONTEND_URL=http://localhost:5173

### 5. Run Backend

```bash
cd backend
npm run dev

```

### 6. Run Frontend

```bash
cd frontend
npm run dev

```

---

## API Endpoints

### User Endpoints

- **GET** `/api/users`

  - **Description**: Retrieve a list of all users.
  - **Request Body**: None
  - **Response**:
    - **Status**: `200 OK`
    - **Body**: Array of user objects.

- **POST** `/api/users`

  - **Description**: Create a new user.
  - **Request Body**:
    ```json
    {
      "name": "string",
      "dateOfBirth": "ISO 8601 date string",
      "age": "number",
      "sex": "male | female"
    }
    ```
  - **Response**:
    - **Status**: `201 Created`
    - **Body**: Created user object.

- **GET** `/api/users/:id`
  - **Description**: Retrieve a specific user by ID.
  - **Request Body**: None
  - **Response**:
    - **Status**: `200 OK`
    - **Body**: User object.

---

### Vital Assessment Endpoint

- **GET** `/api/vitals`

  - **Description**: Retrieve a list of all vitals.
  - **Request Body**: None
  - **Response**:
    - **Status**: `200 OK`
    - **Body**: Array of vital objects.

- **POST** `/api/vitals`

  - **Description**: Create a new vital record.
  - **Request Body**:
    ```json
    {
      "userId": "string",
      "type": "string",
      "value": "number",
      "timestamp": "ISO 8601 date string",
      "details": "string"
    }
    ```
  - **Response**:
    - **Status**: `201 Created`
    - **Body**: Created vital object.

- **GET** `/api/vitals/:id`
  - **Description**: Retrieve a specific vital record by ID.
  - **Request Body**: None
  - **Response**:
    - **Status**: `200 OK`
    - **Body**: Vital object.

---

### Risk Assessment Endpoints

- **POST** `/api/risk-assessment`
  - **Description**: Perform a risk assessment for a user based on their vitals.
  - **Request Body**:
    ```json
    {
      "age": "number",
      "type": "string",
      "rate": "number"
    }
    ```
  - **Response**:
    - **Status**: `200 OK`
    - **Body**:
      ```json
      {
        "score": "number",
        "level": "string"
      }
      ```

## Future Improvements

### Frontend

- Image upload for patient
- Alerts/Toasts
- Patient Search
- Light/Dark theme saved in context

### Database & Persistence

- Move database credentials to environment variables
- Add separate configuration for development and production
- Replace in-memory models / interfaces with proper ORM entities
  (e.g. TypeORM, Prisma, Mongoose, Entity Framework Core)

### Authentication & Authorization

- Implement secure authentication using JWT, OAuth, or HttpOnly cookies
- Add middleware for protected routes
- Introduce role-based access control (RBAC) for different user levels

### Backend Caching

- Integrate Redis for caching frequently accessed data
- Reduce database load and improve response times

### File Storage & CDN

- Offload file storage to AWS S3
- Use a CDN for faster and more reliable file delivery

### Testing & CI/CD

- Docker implementation
- Add integration and E2E tests
- Set up automated testing via CI pipeline

### Observability

- Structured logging
- Monitoring and alerting
