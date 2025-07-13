# Secure User Authentication System

A full-stack secure authentication system built with **FastAPI** (backend) and **React** (frontend), featuring JWT tokens and role-based access control.

## 🚀 Features

### Authentication & Security
- **Password Hashing**: Secure password storage using bcrypt
- **JWT Tokens**: Stateless authentication with 30-minute expiration
- **Role-Based Access Control**: User and Admin roles
- **Protected Routes**: Frontend and backend route protection
- **Password Validation**: Strong password requirements

### API Endpoints
- `POST /auth/register` - User registration with validation
- `POST /auth/login` - User authentication
- `GET /auth/me` - Get current user information
- `GET /users/` - Get all users (admin only)
- `PUT /users/{user_id}/role` - Update user role (admin only)
- `DELETE /users/{user_id}` - Delete user (admin only)

### Frontend Features
- **Responsive Design**: Modern, mobile-friendly UI
- **Real-time Validation**: Form validation with error messages
- **Admin Panel**: User management interface
- **Protected Routes**: Authentication-aware navigation
- **Auto-logout**: Token expiration handling

## 🛠️ Technology Stack

### Backend
- **FastAPI**: Modern, fast web framework
- **SQLAlchemy**: ORM for database operations
- **SQLite**: Lightweight database
- **bcrypt**: Password hashing
- **PyJWT**: JSON Web Token implementation
- **Pydantic**: Data validation

### Frontend
- **React**: User interface library
- **React Router**: Client-side routing
- **Axios**: HTTP client
- **Context API**: State management

## 📦 Installation

### Prerequisites
- Python 3.8+
- Node.js 14+
- npm or yarn

### Backend Setup

1. **Navigate to backend directory**
```bash
cd q1_user_authentication_system/backend
```

2. **Create virtual environment**
```bash
python -m venv venv
# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate
```

3. **Install dependencies**
```bash
pip install -r requirements.txt
```

4. **Run the server**
```bash
python main.py
```

The backend will be available at `http://localhost:8000`

### Frontend Setup

1. **Navigate to frontend directory**
```bash
cd q1_user_authentication_system/frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm start
```

The frontend will be available at `http://localhost:3000`

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the backend directory:

```env
SECRET_KEY=your-secret-key-here-change-in-production
DATABASE_URL=sqlite:///./auth_system.db
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

### Database
The application uses SQLite by default. The database file (`auth_system.db`) will be created automatically when you first run the backend.

## 📖 Usage

### Registration
1. Navigate to `http://localhost:3000/register`
2. Fill out the registration form with:
   - Username (unique)
   - Email (unique)
   - Password (min 8 chars, must contain letters, numbers, and special characters)
3. Submit to create account and auto-login

### Login
1. Navigate to `http://localhost:3000/login`
2. Enter username and password
3. Submit to receive JWT token and access dashboard

### User Dashboard
- View your profile information
- See account security status
- Access role-based features

### Admin Panel
- View all users in the system
- Change user roles (user ↔ admin)
- Delete users (except yourself)
- View system statistics

## 🔐 Security Features

### Password Requirements
- Minimum 8 characters
- At least one letter
- At least one digit
- At least one special character

### JWT Token Security
- 30-minute expiration
- Includes user role in payload
- Automatic logout on expiration
- Secure HTTP-only storage recommended for production

### Role-Based Access
- **User Role**: Access to personal dashboard
- **Admin Role**: Access to admin panel + user management

### API Security
- CORS configuration
- Request validation
- Error handling
- SQL injection prevention

## 🏗️ Project Structure

```
q1_user_authentication_system/
├── backend/
│   ├── main.py              # FastAPI application entry point
│   ├── database.py          # Database configuration and models
│   ├── models.py            # Pydantic models for validation
│   ├── auth.py              # Authentication utilities
│   ├── requirements.txt     # Python dependencies
│   └── routers/
│       ├── __init__.py
│       ├── auth.py          # Authentication routes
│       └── users.py         # User management routes
├── frontend/
│   ├── package.json         # Node.js dependencies
│   ├── public/
│   │   └── index.html       # HTML template
│   └── src/
│       ├── index.js         # React entry point
│       ├── App.js           # Main application component
│       ├── index.css        # Global styles
│       ├── App.css          # Application styles
│       ├── contexts/
│       │   └── AuthContext.js    # Authentication context
│       ├── services/
│       │   └── authService.js    # API service
│       └── components/
│           ├── Login.js          # Login form
│           ├── Register.js       # Registration form
│           ├── Dashboard.js      # User dashboard
│           ├── AdminPanel.js     # Admin panel
│           ├── Navbar.js         # Navigation
│           └── ProtectedRoute.js # Route protection
├── .gitignore               # Git ignore file
└── README.md               # Project documentation
```

## 🧪 Testing

### Manual Testing
1. **Registration**: Test with valid/invalid passwords
2. **Login**: Test with correct/incorrect credentials
3. **Token Expiration**: Wait 30 minutes and test auto-logout
4. **Role Access**: Test admin/user access restrictions
5. **API Endpoints**: Test all endpoints with different roles

### Example Test Users
After registration, you can promote a user to admin by:
1. Accessing the database directly
2. Or creating an admin user programmatically

## 🚀 Deployment

### Backend Deployment
1. Set proper environment variables
2. Use a production WSGI server (e.g., uvicorn with gunicorn)
3. Configure a production database (PostgreSQL, MySQL)
4. Set up HTTPS
5. Configure proper CORS origins

### Frontend Deployment
1. Build the React application: `npm run build`
2. Serve static files with a web server
3. Configure environment variables
4. Set up proper routing

## 🔒 Security Recommendations

### For Production
- [ ] Change the SECRET_KEY to a secure random string
- [ ] Use environment variables for sensitive data
- [ ] Implement HTTPS
- [ ] Use HTTP-only cookies for token storage
- [ ] Implement rate limiting
- [ ] Add input validation and sanitization
- [ ] Use a production database
- [ ] Set up proper logging and monitoring
- [ ] Implement refresh tokens
- [ ] Add CSRF protection

## 📝 API Documentation

### Authentication Endpoints

#### POST /auth/register
Register a new user account.

**Request Body:**
```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "id": 1,
  "username": "string",
  "email": "string",
  "role": "user",
  "is_active": true,
  "created_at": "2023-01-01T00:00:00",
  "updated_at": "2023-01-01T00:00:00"
}
```

#### POST /auth/login
Authenticate user and receive JWT token.

**Request Body:**
```json
{
  "username": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer"
}
```

#### GET /auth/me
Get current user information (requires authentication).

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "id": 1,
  "username": "string",
  "email": "string",
  "role": "user",
  "is_active": true,
  "created_at": "2023-01-01T00:00:00",
  "updated_at": "2023-01-01T00:00:00"
}
```

### User Management Endpoints (Admin Only)

#### GET /users/
Get all users (admin only).

#### PUT /users/{user_id}/role
Update user role (admin only).

#### DELETE /users/{user_id}
Delete user (admin only).

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- FastAPI documentation and community
- React documentation and community
- JWT.io for JWT debugging
- bcrypt for secure password hashing 