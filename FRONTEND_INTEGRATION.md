# Frontend Integration Guide

This guide explains how to integrate the React frontend with the PHP backend API.

## 🔧 Configuration

### 1. API Configuration

Create or update a configuration file in your React app:

**`src/config/api.js`**
```javascript
// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:8000/api/index.php',
  TIMEOUT: 10000,
  WITH_CREDENTIALS: true // Important for session cookies
};

// Helper function to build API URL
export const buildApiUrl = (endpoint, action, params = {}) => {
  const url = new URL(API_CONFIG.BASE_URL);
  url.searchParams.set('endpoint', endpoint);
  url.searchParams.set('action', action);
  
  Object.keys(params).forEach(key => {
    url.searchParams.set(key, params[key]);
  });
  
  return url.toString();
};
```

### 2. API Service Layer

Create an API service to handle all backend requests:

**`src/services/api.js`**
```javascript
import { API_CONFIG, buildApiUrl } from '../config/api';

class ApiService {
  async request(endpoint, action, options = {}) {
    const { method = 'GET', body = null, params = {} } = options;
    
    const url = buildApiUrl(endpoint, action, params);
    
    const config = {
      method,
      credentials: 'include', // Important for sessions
      headers: {
        'Content-Type': 'application/json',
      }
    };
    
    if (body && method !== 'GET') {
      config.body = JSON.stringify(body);
    }
    
    try {
      const response = await fetch(url, config);
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.message || 'Request failed');
      }
      
      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Auth methods
  async register(userData) {
    return this.request('auth', 'register', {
      method: 'POST',
      body: userData
    });
  }

  async login(credentials) {
    return this.request('auth', 'login', {
      method: 'POST',
      body: credentials
    });
  }

  async logout() {
    return this.request('auth', 'logout', {
      method: 'POST'
    });
  }

  async checkAuth() {
    return this.request('auth', 'check');
  }

  async getCurrentUser() {
    return this.request('auth', 'me');
  }

  // Books methods
  async getBooks(filters = {}) {
    return this.request('books', 'list', {
      params: filters
    });
  }

  async getBook(id) {
    return this.request('books', 'get', {
      params: { id }
    });
  }

  async createBook(bookData) {
    return this.request('books', 'create', {
      method: 'POST',
      body: bookData
    });
  }

  async updateBook(id, bookData) {
    return this.request('books', 'update', {
      method: 'PUT',
      params: { id },
      body: bookData
    });
  }

  async deleteBook(id) {
    return this.request('books', 'delete', {
      method: 'DELETE',
      params: { id }
    });
  }

  async getMyBooks() {
    return this.request('books', 'my-books');
  }

  // Reviews methods
  async getReviews(bookId) {
    return this.request('reviews', 'list', {
      params: { book_id: bookId }
    });
  }

  async createReview(reviewData) {
    return this.request('reviews', 'create', {
      method: 'POST',
      body: reviewData
    });
  }

  async deleteReview(id) {
    return this.request('reviews', 'delete', {
      method: 'DELETE',
      params: { id }
    });
  }

  // Cart methods
  async getCart() {
    return this.request('cart', 'list');
  }

  async addToCart(bookId) {
    return this.request('cart', 'add', {
      method: 'POST',
      body: { book_id: bookId }
    });
  }

  async updateCartItem(bookId, quantity) {
    return this.request('cart', 'update', {
      method: 'PUT',
      body: { book_id: bookId, quantity }
    });
  }

  async removeFromCart(bookId) {
    return this.request('cart', 'remove', {
      method: 'DELETE',
      params: { book_id: bookId }
    });
  }

  async clearCart() {
    return this.request('cart', 'clear', {
      method: 'DELETE'
    });
  }

  // Profile methods
  async getProfile(userId = null) {
    const params = userId ? { id: userId } : {};
    return this.request('profile', 'get', { params });
  }

  async updateProfile(profileData) {
    return this.request('profile', 'update', {
      method: 'PUT',
      body: profileData
    });
  }
}

export default new ApiService();
```

### 3. Update React Components

#### LoginPage.jsx
```javascript
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function LoginPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await api.login(formData);
      alert(response.message);
      navigate('/');
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // ... rest of component
}
```

#### CatalogPage.jsx
```javascript
import { useState, useEffect } from 'react';
import api from '../services/api';

function CatalogPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    genre: 'all',
    min_price: '',
    max_price: ''
  });

  useEffect(() => {
    loadBooks();
  }, [filters]);

  const loadBooks = async () => {
    setLoading(true);
    try {
      const response = await api.getBooks(filters);
      setBooks(response.data);
    } catch (error) {
      console.error('Failed to load books:', error);
    } finally {
      setLoading(false);
    }
  };

  // ... rest of component
}
```

#### BookDetailPage.jsx
```javascript
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

function BookDetailPage() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBookDetails();
    loadReviews();
  }, [id]);

  const loadBookDetails = async () => {
    try {
      const response = await api.getBook(id);
      setBook(response.data);
    } catch (error) {
      console.error('Failed to load book:', error);
    }
  };

  const loadReviews = async () => {
    try {
      const response = await api.getReviews(id);
      setReviews(response.data);
    } catch (error) {
      console.error('Failed to load reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddReview = async (reviewData) => {
    try {
      await api.createReview({ ...reviewData, book_id: id });
      loadReviews(); // Reload reviews
      alert('Review added successfully!');
    } catch (error) {
      alert(error.message);
    }
  };

  // ... rest of component
}
```

#### CartPage.jsx
```javascript
import { useState, useEffect } from 'react';
import api from '../services/api';

function CartPage() {
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    setLoading(true);
    try {
      const response = await api.getCart();
      setCart(response.data);
    } catch (error) {
      console.error('Failed to load cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveItem = async (bookId) => {
    try {
      await api.removeFromCart(bookId);
      loadCart(); // Reload cart
    } catch (error) {
      alert(error.message);
    }
  };

  const handleUpdateQuantity = async (bookId, quantity) => {
    try {
      await api.updateCartItem(bookId, quantity);
      loadCart(); // Reload cart
    } catch (error) {
      alert(error.message);
    }
  };

  // ... rest of component
}
```

### 4. Authentication Context

Create a context to manage authentication state:

**`src/contexts/AuthContext.jsx`**
```javascript
import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await api.checkAuth();
      if (response.data.authenticated) {
        setUser(response.data.user);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    const response = await api.login(credentials);
    setUser(response.data);
    return response;
  };

  const logout = async () => {
    await api.logout();
    setUser(null);
  };

  const register = async (userData) => {
    return await api.register(userData);
  };

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    logout,
    register,
    checkAuth
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
```

### 5. Update App.jsx

```javascript
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
// ... other imports

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* ... routes */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
```

### 6. Environment Variables

Create `.env` file in React project root:

```env
REACT_APP_API_URL=http://localhost:8000/api/index.php
```

For production:
```env
REACT_APP_API_URL=https://yourdomain.com/api/index.php
```

## 🚀 Running Both Frontend and Backend

### Development Setup

1. **Start PHP Backend**
```bash
# In project root
php -S localhost:8000
```

2. **Start React Frontend** (in another terminal)
```bash
npm run dev
# or
npm start
```

3. **Access Application**
- Frontend: http://localhost:5173 (or 3000)
- Backend API: http://localhost:8000/api/index.php
- API Tester: http://localhost:8000/api/test.html

## 🔒 CORS Configuration

The PHP backend is already configured for CORS in `api/config/config.php`.

For production, update the origin:
```php
// In api/config/config.php
header("Access-Control-Allow-Origin: https://yourdomain.com");
```

## 🐛 Troubleshooting

### CORS Issues
- Ensure `credentials: 'include'` is set in all fetch requests
- Check browser console for CORS errors
- Verify PHP backend CORS headers

### Session Issues
- Make sure cookies are enabled in browser
- Use same domain for frontend and backend (or configure CORS properly)
- Check browser dev tools > Application > Cookies

### API Connection Errors
- Verify backend is running: `http://localhost:8000/api/test.html`
- Check network tab in browser dev tools
- Ensure correct API_URL in environment variables

## 📝 Best Practices

1. **Error Handling**: Always wrap API calls in try-catch blocks
2. **Loading States**: Show loading indicators during API requests
3. **Token/Session Refresh**: Check authentication status on app mount
4. **Error Messages**: Display user-friendly error messages
5. **Validation**: Validate inputs before sending to API
6. **Security**: Never store sensitive data in localStorage

## 🎯 Next Steps

- Implement file upload for book images
- Add loading skeletons
- Implement error boundaries
- Add request caching
- Implement optimistic updates
- Add request retry logic

---

**Note**: This integration guide assumes you're using the existing React components. Adjust imports and component names according to your project structure.
