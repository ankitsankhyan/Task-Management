# Task Management API

The Task Management API is a RESTful API for managing tasks. It allows users to create, read, update, and delete tasks. Each task has a title, description, status, and due date. Users can sign up, log in, and manage their own tasks.

## Table of Contents
- Features
- Requirements
- Getting Started
  - Installation
  - Configuration
- API Endpoints
- Authentication
- Error Handling
- Database
- Middleware
- Scalability
- Bonus Features
- Dependencies

## Features
- User authentication and authorization.
- Create, read, update, and delete tasks.
- Tasks are associated with the user who created them.
- Input validation and error handling for data integrity.
- MongoDB database for storing user data and tasks.
- Middleware for authentication and request logging.
- Notification daily 7pm to each user to remind him about the pending tasks.

## Requirements
- Node.js
- MongoDB
- NPM (Node Package Manager)

## Getting Started
### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/task-management-api.git
   ```

2. Change to the project directory:
   ```bash
   cd Task-Management
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

### Configuration
1. Create a `.env` file in the project root and set the following environment variables:
   - `PORT`: The port on which the API should run.
   - `MONGODB_URI`: The MongoDB connection string.
   - `JWT_SECRET`: Your JWT secret for authentication.
   - `MAILTRAP_API_KEY`: Your Mailtrap API key.
   - `MAIL_HOST`: The email host for sending notifications.
   - `MAIL_USER`: The email username.
   - `MAIL_PASS`: The email password.
   - Other configuration options as needed.

2. Start the server:
   ```bash
   nodemon start
   ```

## API Endpoints
The API provides the following endpoints:

- `POST /api/user/login`: User login.
- `POST /api/user/signup`: User registration.
- `POST /api/task/create`: Create a new task.
- `PUT /api/task/update/:id`: Update a task by ID.
- `DELETE /api/task/delete/:id`: Delete a task by ID.
- `PUT /api/task/status/:id`: Update the status of a task by ID.
- `GET /api-docs`: Get the More Details of this API (SWAGGER)

For detailed documentation and examples, you can use Swagger UI.

## Authentication
The API uses JWT-based authentication to secure endpoints. Users can register and log in to obtain an authentication token for accessing protected endpoints.

## Error Handling
The API handles errors gracefully and provides meaningful error messages.

## Database
The project uses MongoDB to store user data and tasks.

## Middleware
Middleware is implemented for authentication and request logging.

## Scalability
We utilize Kue for sending emails asynchronously with the advantage of concurrency. In the event of an error during email transmission, Kue will make up to two additional attempts to send the email. Meanwhile, it continues to process other email tasks concurrently. This approach ensures efficient email delivery even in the presence of occasional transmission issues.
## Bonus Features
Additional features like email notifications for task due dates. For sending email notifications,We have used Kue to ensure that if an email fails to send, it will be retried two more times with a 1-minute gap between retries.
we have used Mailtrap for testing the email functionality. You can configure the email settings in the .env file, specifying the email host, username, and password.and set google smtp server in mailer.js

## Dependencies
- bcrypt
- cors
- cron
- date-and-time
- dotenv
- express
- express-validator
- jsonwebtoken
- mongoose
- morgan
- nodemailer
- nodemon
- swagger-jsdoc
- swagger-ui-express
- Kue
```

