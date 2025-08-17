# Express OTP Authentication System

A secure Node.js authentication system using One-Time Password (OTP) verification with Express.js
and MongoDB.

## 🚀 Features

- **OTP-based Authentication**: Secure user registration using 6-digit OTP codes
- **Phone Number Verification**: Users register with phone numbers instead of traditional
  email/password
- **JWT Token Generation**: Secure authentication tokens for session management
- **MongoDB Integration**: Persistent data storage with Mongoose ODM
- **SMS Integration**: Ready-to-use SMS API integration for OTP delivery
- **Auto-expiring OTPs**: OTP codes automatically expire after 5 minutes
- **Password Hashing**: Secure OTP storage using bcrypt
- **TypeScript Support**: Type definitions included for better development experience

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcrypt for password hashing
- **OTP Generation**: otp-generator
- **SMS Service**: SMS.ir API integration
- **Development**: TypeScript definitions, Prettier formatting

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- SMS.ir API key (for SMS functionality)

## ⚡ Quick Start

### 1. Clone the repository

```bash
git clone <repository-url>
cd express-otp
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory:

```env
MONGODB_URL_LOCAL=mongodb://localhost:27017/auth-system
PORT=3000
JWT_SECRET_KEY=your-super-secret-jwt-key
JWT_EXPIRED=7d
```

### 4. Start the server

```bash
# Development mode with auto-reload
npm run dev

# Production mode
node server.js
```

The server will start on `http://localhost:3000`

## 📚 API Endpoints

### Authentication Routes

#### Generate OTP for Signup

```http
POST /api/user/signupOtp
Content-Type: application/json

{
  "number": "09123456789"
}
```

**Response:**

```json
{
  "status": "success",
  "message": "رمز یکبار مصرف با موفقیت ارسال شد!"
}
```

#### Verify OTP and Complete Registration

```http
POST /api/user/signupOtp/verify
Content-Type: application/json

{
  "number": "09123456789",
  "otp": "123456"
}
```

**Response:**

```json
{
  "status": "success",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "message": "کاربر با موفقیت ثبت نام کرد!",
  "data": {
    "_id": "...",
    "number": "09123456789",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

## 🏗️ Project Structure

```
express-otp/
├── Controllers/
│   ├── authController.js    # Authentication logic
│   └── userController.js    # User management (empty)
├── Model/
│   ├── userModel.js         # User schema and JWT methods
│   └── otpModel.js          # OTP schema with auto-expiry
├── Routers/
│   └── userRouter.js        # API route definitions
├── app.js                   # Express app configuration
├── server.js                # Server startup and DB connection
├── package.json             # Dependencies and scripts
└── .env                     # Environment variables (create this)
```

## 🔧 Configuration

### MongoDB Connection

The application connects to MongoDB using the connection string in your `.env` file. Make sure
MongoDB is running locally or update the connection string for your cloud database.

### SMS Configuration

The SMS functionality uses SMS.ir API. To enable SMS sending:

1. Get an API key from [SMS.ir](https://sms.ir)
2. Update the API key in `Model/otpModel.js`
3. Uncomment the SMS sending line in `authController.js`

### JWT Configuration

Configure JWT settings in your `.env` file:

- `JWT_SECRET_KEY`: A strong secret key for signing tokens
- `JWT_EXPIRED`: Token expiration time (e.g., "7d", "24h", "30m")

## 🔒 Security Features

- **OTP Hashing**: All OTP codes are hashed before storage using bcrypt
- **Auto-expiry**: OTP codes automatically expire after 5 minutes
- **JWT Authentication**: Secure token-based authentication
- **Input Validation**: Basic validation for phone numbers and OTP codes
- **Rate Limiting**: Natural rate limiting through OTP expiry

## 🚧 Development

### Code Formatting

The project uses Prettier for code formatting. Configuration is in `.prettierrc`.

### Development Mode

```bash
npm run dev
```

This starts the server with auto-reload using Node.js `--watch` flag.

### TypeScript Support

Type definitions are included for better IDE support and development experience.

## 📝 TODO / Future Enhancements

- [ ] Implement login OTP functionality
- [ ] Add rate limiting middleware
- [ ] Implement user profile management
- [ ] Add input validation middleware
- [ ] Create comprehensive error handling
- [ ] Add unit and integration tests
- [ ] Implement refresh token mechanism
- [ ] Add API documentation with Swagger
- [ ] Create Docker configuration
- [ ] Add logging system

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🆘 Support

If you encounter any issues or have questions, please:

1. Check the existing issues in the repository
2. Create a new issue with detailed information
3. Include error messages and steps to reproduce

---

**Note**: This is a basic authentication system. For production use, consider adding additional
security measures such as rate limiting, input validation, comprehensive error handling, and
security headers.
