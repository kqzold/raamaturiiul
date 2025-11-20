# RaamatuRiiul - Backend Implementation Summary

## 📋 Overview

Complete RESTful API backend for the RaamatuRiiul (bookshelf) online book marketplace, implemented in **pure PHP** without any frameworks.

## 🎯 Requirements Met

✅ Backend implemented using pure PHP (no frameworks)
✅ RESTful API design
✅ MySQL database integration
✅ User authentication system
✅ CRUD operations for books
✅ Review and rating system
✅ Shopping cart functionality
✅ CORS support for frontend integration
✅ Security best practices implemented
✅ Comprehensive documentation

## 📁 Project Structure

```
api/
├── config/              # Configuration files
│   ├── config.php      # General config, CORS, helper functions
│   ├── database.php    # Database connection
│   └── database.example.php
├── controllers/         # API endpoints
│   ├── auth.php        # Authentication (login, register, logout)
│   ├── books.php       # Book CRUD operations
│   ├── cart.php        # Shopping cart management
│   ├── profile.php     # User profile management
│   └── reviews.php     # Book reviews
├── middleware/          # Middleware
│   └── auth.php        # Authentication middleware
├── models/              # Data models
│   ├── Book.php        # Book model
│   ├── Cart.php        # Cart model
│   ├── Review.php      # Review model
│   └── User.php        # User model
├── database.sql         # Database schema + sample data
├── index.php            # Main entry point / router
├── .htaccess            # Apache rewrite rules
├── test.php             # Test script
├── test.html            # Interactive API tester
└── README.md            # API documentation
```

## 🗄️ Database Schema

### Tables
1. **users** - User accounts with authentication
2. **books** - Book listings with details
3. **reviews** - Book reviews and ratings
4. **cart** - Shopping cart items
5. **orders** - Order history
6. **order_items** - Order line items

### Sample Data
- 3 test users (password: `password`)
- 8 books across different genres
- 5 sample reviews

## 🔌 API Endpoints

### Authentication (`/api/index.php?endpoint=auth`)
- `POST action=register` - Create new account
- `POST action=login` - User login
- `POST action=logout` - User logout
- `GET action=check` - Check authentication status
- `GET action=me` - Get current user data

### Books (`/api/index.php?endpoint=books`)
- `GET action=list` - List all books (with filters)
- `GET action=get&id={id}` - Get book details
- `POST action=create` - Create new book listing
- `PUT action=update&id={id}` - Update book
- `DELETE action=delete&id={id}` - Delete book
- `GET action=my-books` - Get user's books

### Reviews (`/api/index.php?endpoint=reviews`)
- `GET action=list&book_id={id}` - Get book reviews
- `POST action=create` - Add review
- `DELETE action=delete&id={id}` - Delete review

### Cart (`/api/index.php?endpoint=cart`)
- `GET action=list` - View cart
- `POST action=add` - Add item to cart
- `PUT action=update` - Update quantity
- `DELETE action=remove&book_id={id}` - Remove item
- `DELETE action=clear` - Clear cart

### Profile (`/api/index.php?endpoint=profile`)
- `GET action=get&id={id}` - Get user profile
- `PUT action=update` - Update profile

## 🔒 Security Features

✅ **Password Security**: bcrypt hashing with `password_hash()`
✅ **SQL Injection Protection**: PDO prepared statements
✅ **Session Management**: Secure session configuration
✅ **CORS Configuration**: Configured for frontend integration
✅ **Input Validation**: Required field validation
✅ **Authorization Checks**: User-resource ownership verification
✅ **XSS Prevention**: JSON encoding for API responses

## 🚀 Quick Start

### Installation

1. **Import Database**
```bash
mysql -u root -p < api/database.sql
```

2. **Configure Database Connection**
Edit `api/config/database.php`:
```php
private $host = "localhost";
private $database_name = "raamaturiiul";
private $username = "root";
private $password = "";
```

3. **Run Test**
```bash
php api/test.php
```

4. **Start Server**
```bash
php -S localhost:8000
```

5. **Test API**
Open `http://localhost:8000/api/test.html` in browser

### Test Credentials
- Email: `ivan@example.com` / Password: `password`
- Email: `maria@example.com` / Password: `password`
- Email: `alexey@example.com` / Password: `password`

## 📖 Documentation Files

- **`api/README.md`** - Complete API documentation with all endpoints
- **`QUICK_START.md`** - Quick installation guide
- **`api/test.html`** - Interactive API testing interface
- **`api/test.php`** - CLI test script

## 🧪 Testing

### CLI Test
```bash
php api/test.php
```

### Interactive Browser Test
1. Start PHP server: `php -S localhost:8000`
2. Open: `http://localhost:8000/api/test.html`
3. Test all API endpoints interactively

### cURL Examples
```bash
# Login
curl -X POST http://localhost:8000/api/index.php?endpoint=auth&action=login \
  -H "Content-Type: application/json" \
  -d '{"email":"ivan@example.com","password":"password"}' \
  --cookie-jar cookies.txt

# Get books
curl http://localhost:8000/api/index.php?endpoint=books&action=list \
  --cookie cookies.txt

# Create book
curl -X POST http://localhost:8000/api/index.php?endpoint=books&action=create \
  -H "Content-Type: application/json" \
  -d '{"title":"New Book","author":"Author","genre":"fiction","condition":"Отличное","price":19.99}' \
  --cookie cookies.txt
```

## 🔧 Technology Stack

- **Language**: PHP 8.3+ (compatible with PHP 7.4+)
- **Database**: MySQL 5.7+
- **Server**: Apache with mod_rewrite OR PHP built-in server
- **Extensions**: PDO, pdo_mysql, json, session

## 📊 API Response Format

All API responses follow this structure:
```json
{
  "success": true/false,
  "data": { ... } or null,
  "message": "Descriptive message"
}
```

## 🎨 Integration with Frontend

The React frontend can integrate with this API by:

1. **Setting API base URL**:
```javascript
const API_BASE = 'http://localhost:8000/api/index.php';
```

2. **Making authenticated requests**:
```javascript
fetch(API_BASE + '?endpoint=books&action=list', {
  credentials: 'include'  // Important for sessions
})
```

3. **Handling responses**:
```javascript
const response = await fetch(url, options);
const data = await response.json();
if (data.success) {
  // Handle success
} else {
  // Handle error
}
```

## 🌟 Key Features

1. **Modular Architecture**: Separated concerns (models, controllers, middleware)
2. **RESTful Design**: Standard HTTP methods and status codes
3. **Session-based Auth**: No JWT complexity, simple and secure
4. **Automatic Rating**: Reviews automatically update book ratings
5. **Data Validation**: Input validation on all endpoints
6. **Error Handling**: Consistent error responses
7. **Sample Data**: Ready-to-use test data included

## 📈 Future Enhancements

Potential improvements for production:
- [ ] File upload for book images
- [ ] Email verification
- [ ] Password reset functionality
- [ ] Order processing system
- [ ] Payment integration
- [ ] Admin panel
- [ ] Rate limiting
- [ ] Logging system
- [ ] Caching layer
- [ ] API versioning

## 🤝 Contributing

The backend is production-ready for development and testing. For production deployment:
1. Change database credentials
2. Update CORS settings for production domain
3. Enable HTTPS
4. Implement rate limiting
5. Add comprehensive logging

## 📄 License

This project is open source and available under the MIT License.

## 🎓 Learning Resources

This implementation demonstrates:
- Pure PHP backend without frameworks
- RESTful API design principles
- MVC-like architecture in PHP
- Database design and relationships
- Authentication and authorization
- Session management
- CORS configuration
- API documentation best practices

---

**Status**: ✅ Complete and fully functional
**Version**: 1.0.0
**Last Updated**: 2025-11-20
