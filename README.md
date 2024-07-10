# Bulk Email Processor Application

This project is a bulk email processor application that utilizes a queue mechanism and maintains logs in a database. The application uses MailTrap as the email provider and includes features such as user authentication, email template seeding, bulk email processing, and log viewing functionality.

## Features

- User registration and login with JWT authentication
- Email template seeding
- Bulk email processing using a queue mechanism
- Email logs stored in a database
- Admin dashboard to view email logs
- Logout functionality

## Technologies Used

- Frontend:
  - React
  - Tailwind CSS
  - Axios
  - React Router DOM
- Backend:
  - Node.js
  - Express.js
  - MongoDB
  - Mongoose
  - MailTrap for email services
- Other:
  - JWT for authentication
  - Nodemailer for sending emails
  - Docker (for Redis Service)

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm
- MongoDB
- Docker

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/hpokhrel/Email_Processor.git
   cd bulk-email-processor
   ```

2. **Install dependencies for both the frontend and backend:**

   ```bash
   # Install backend dependencies
   cd server
   npm install

   # Install frontend dependencies
   cd ../client
   npm install
   ```

### Environment Variables

Create a `.env` file in the `server` directory and add the following environment variables:

```env
PORT = 5000
MONGODB_URL = "mongoDb Link"
JWT_SECRET = "YOUR JWT SECERET"
MAILTRAP_USER = "Mailtrap Username"
MAILTRAP_PASS = "Mailtrap Password"
MAILTRAP_HOST = "Mailtrap Host"
MAILTRAP_PORT = "PORT"
REDIS_PORT = 6379,
REDIS_HOST = "127.0.0.1"

```

## Running the Application

- Start the Server server:

```bash
cd server
npx tsc
npm run dev
```

- Start the Client server:

```bash
cd client
npm run dev
```

THANK YOU
