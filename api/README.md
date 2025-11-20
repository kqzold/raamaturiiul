# RaamatuRiiul API Documentation

Backend API для платформы покупки и продажи книг RaamatuRiiul, написанный на чистом PHP без фреймворков.

## Требования

- PHP 7.4 или выше
- MySQL 5.7 или выше
- Apache с mod_rewrite (или Nginx с соответствующей конфигурацией)
- Расширения PHP: PDO, pdo_mysql, json, session

## Установка

### 1. Настройка базы данных

```bash
# Создайте базу данных и импортируйте схему
mysql -u root -p < api/database.sql
```

### 2. Настройка подключения к БД

Отредактируйте файл `api/config/database.php` и укажите ваши настройки подключения к MySQL:

```php
private $host = "localhost";
private $database_name = "raamaturiiul";
private $username = "root";
private $password = "";
```

### 3. Настройка Apache

Убедитесь, что mod_rewrite включен:

```bash
sudo a2enmod rewrite
sudo service apache2 restart
```

### 4. Права доступа

Убедитесь, что Apache имеет права на чтение файлов:

```bash
chmod -R 755 api/
```

## API Endpoints

Базовый URL: `http://your-domain/api/index.php`

### Аутентификация

#### Регистрация
```
POST /api/index.php?endpoint=auth&action=register
Content-Type: application/json

{
  "name": "Иван Иванов",
  "email": "ivan@example.com",
  "password": "password123"
}

Response: 201 Created
{
  "success": true,
  "data": {
    "user_id": 1
  },
  "message": "Registration successful"
}
```

#### Вход
```
POST /api/index.php?endpoint=auth&action=login
Content-Type: application/json

{
  "email": "ivan@example.com",
  "password": "password123"
}

Response: 200 OK
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Иван Иванов",
    "email": "ivan@example.com",
    "avatar": null,
    "rating": 0.00,
    "total_sales": 0
  },
  "message": "Login successful"
}
```

#### Выход
```
POST /api/index.php?endpoint=auth&action=logout

Response: 200 OK
{
  "success": true,
  "data": null,
  "message": "Logout successful"
}
```

#### Проверка авторизации
```
GET /api/index.php?endpoint=auth&action=check

Response: 200 OK
{
  "success": true,
  "data": {
    "authenticated": true,
    "user": { /* user data */ }
  },
  "message": "Authentication status checked"
}
```

#### Получить текущего пользователя
```
GET /api/index.php?endpoint=auth&action=me
Authorization: Required (session)

Response: 200 OK
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Иван Иванов",
    "email": "ivan@example.com",
    "avatar": null,
    "rating": 0.00,
    "total_sales": 0
  },
  "message": "User data retrieved"
}
```

### Книги

#### Получить список книг
```
GET /api/index.php?endpoint=books&action=list
Optional query params:
  - search: поиск по названию или автору
  - genre: фильтр по жанру
  - min_price: минимальная цена
  - max_price: максимальная цена
  - limit: количество результатов (default: 100)
  - offset: смещение для пагинации (default: 0)

Example: GET /api/index.php?endpoint=books&action=list&genre=fiction&limit=10

Response: 200 OK
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "1984",
      "author": "George Orwell",
      "isbn": "978-0-452-28423-4",
      "year": 1949,
      "pages": 328,
      "language": "Английский",
      "genre": "fiction",
      "condition": "Отличное",
      "price": "12.99",
      "description": "...",
      "image": "https://...",
      "rating": "4.50",
      "seller_id": 1,
      "seller_name": "Иван Иванов",
      "seller_avatar": "...",
      "seller_rating": "4.80",
      "status": "available"
    }
  ],
  "message": "Books retrieved successfully"
}
```

#### Получить книгу по ID
```
GET /api/index.php?endpoint=books&action=get&id=1

Response: 200 OK
{
  "success": true,
  "data": { /* book data */ },
  "message": "Book retrieved successfully"
}
```

#### Создать книгу
```
POST /api/index.php?endpoint=books&action=create
Authorization: Required (session)
Content-Type: application/json

{
  "title": "1984",
  "author": "George Orwell",
  "isbn": "978-0-452-28423-4",
  "year": 1949,
  "pages": 328,
  "language": "Английский",
  "genre": "fiction",
  "condition": "Отличное",
  "price": 12.99,
  "description": "...",
  "image": "https://..."
}

Response: 201 Created
{
  "success": true,
  "data": {
    "book_id": 1
  },
  "message": "Book created successfully"
}
```

#### Обновить книгу
```
PUT /api/index.php?endpoint=books&action=update&id=1
Authorization: Required (session, owner only)
Content-Type: application/json

{
  "price": 10.99,
  "condition": "Хорошее"
}

Response: 200 OK
{
  "success": true,
  "data": null,
  "message": "Book updated successfully"
}
```

#### Удалить книгу
```
DELETE /api/index.php?endpoint=books&action=delete&id=1
Authorization: Required (session, owner only)

Response: 200 OK
{
  "success": true,
  "data": null,
  "message": "Book deleted successfully"
}
```

#### Получить мои книги
```
GET /api/index.php?endpoint=books&action=my-books
Authorization: Required (session)

Response: 200 OK
{
  "success": true,
  "data": [ /* books */ ],
  "message": "Your books retrieved successfully"
}
```

### Отзывы

#### Получить отзывы по книге
```
GET /api/index.php?endpoint=reviews&action=list&book_id=1

Response: 200 OK
{
  "success": true,
  "data": [
    {
      "id": 1,
      "book_id": 1,
      "user_id": 2,
      "rating": 5,
      "comment": "Отличная книга!",
      "user_name": "Мария Петрова",
      "user_avatar": "...",
      "created_at": "2025-11-20 07:00:00"
    }
  ],
  "message": "Reviews retrieved successfully"
}
```

#### Создать отзыв
```
POST /api/index.php?endpoint=reviews&action=create
Authorization: Required (session)
Content-Type: application/json

{
  "book_id": 1,
  "rating": 5,
  "comment": "Отличная книга!"
}

Response: 201 Created
{
  "success": true,
  "data": {
    "review_id": 1
  },
  "message": "Review created successfully"
}
```

#### Удалить отзыв
```
DELETE /api/index.php?endpoint=reviews&action=delete&id=1
Authorization: Required (session, owner only)

Response: 200 OK
{
  "success": true,
  "data": null,
  "message": "Review deleted successfully"
}
```

### Корзина

#### Получить корзину
```
GET /api/index.php?endpoint=cart&action=list
Authorization: Required (session)

Response: 200 OK
{
  "success": true,
  "data": {
    "items": [
      {
        "id": 1,
        "user_id": 1,
        "book_id": 1,
        "quantity": 1,
        "title": "1984",
        "author": "George Orwell",
        "price": "12.99",
        "image": "...",
        "status": "available",
        "seller_name": "Иван Иванов"
      }
    ],
    "total": "12.99"
  },
  "message": "Cart retrieved successfully"
}
```

#### Добавить в корзину
```
POST /api/index.php?endpoint=cart&action=add
Authorization: Required (session)
Content-Type: application/json

{
  "book_id": 1
}

Response: 201 Created
{
  "success": true,
  "data": null,
  "message": "Book added to cart successfully"
}
```

#### Обновить количество
```
PUT /api/index.php?endpoint=cart&action=update
Authorization: Required (session)
Content-Type: application/json

{
  "book_id": 1,
  "quantity": 2
}

Response: 200 OK
{
  "success": true,
  "data": null,
  "message": "Cart updated successfully"
}
```

#### Удалить из корзины
```
DELETE /api/index.php?endpoint=cart&action=remove&book_id=1
Authorization: Required (session)

Response: 200 OK
{
  "success": true,
  "data": null,
  "message": "Book removed from cart successfully"
}
```

#### Очистить корзину
```
DELETE /api/index.php?endpoint=cart&action=clear
Authorization: Required (session)

Response: 200 OK
{
  "success": true,
  "data": null,
  "message": "Cart cleared successfully"
}
```

### Профиль

#### Получить профиль пользователя
```
GET /api/index.php?endpoint=profile&action=get&id=1
OR
GET /api/index.php?endpoint=profile&action=get
Authorization: Required for current user profile

Response: 200 OK
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Иван Иванов",
    "email": "ivan@example.com",
    "avatar": null,
    "rating": 4.80,
    "total_sales": 45,
    "created_at": "2025-11-20 07:00:00"
  },
  "message": "User profile retrieved successfully"
}
```

#### Обновить профиль
```
PUT /api/index.php?endpoint=profile&action=update
Authorization: Required (session)
Content-Type: application/json

{
  "name": "Иван Петрович Иванов",
  "avatar": "https://..."
}

Response: 200 OK
{
  "success": true,
  "data": null,
  "message": "Profile updated successfully"
}
```

## Коды ответов

- `200 OK` - Успешный запрос
- `201 Created` - Ресурс успешно создан
- `400 Bad Request` - Неверные параметры запроса
- `401 Unauthorized` - Требуется аутентификация
- `403 Forbidden` - Доступ запрещен
- `404 Not Found` - Ресурс не найден
- `405 Method Not Allowed` - Метод не поддерживается
- `409 Conflict` - Конфликт (например, email уже существует)
- `500 Internal Server Error` - Внутренняя ошибка сервера

## Безопасность

- Пароли хешируются с использованием `password_hash()` (bcrypt)
- Сессии используются для аутентификации
- CORS настроен для работы с фронтендом
- SQL инъекции предотвращены использованием подготовленных запросов (PDO)
- XSS предотвращается на стороне клиента

## Структура проекта

```
api/
├── config/
│   ├── config.php          # Общие настройки и helper функции
│   └── database.php        # Подключение к БД
├── controllers/
│   ├── auth.php            # Контроллер аутентификации
│   ├── books.php           # Контроллер книг
│   ├── cart.php            # Контроллер корзины
│   ├── profile.php         # Контроллер профиля
│   └── reviews.php         # Контроллер отзывов
├── middleware/
│   └── auth.php            # Middleware аутентификации
├── models/
│   ├── Book.php            # Модель книги
│   ├── Cart.php            # Модель корзины
│   ├── Review.php          # Модель отзыва
│   └── User.php            # Модель пользователя
├── .htaccess               # Конфигурация Apache
├── database.sql            # SQL схема БД
└── index.php               # Точка входа API
```

## Пример использования с fetch (JavaScript)

```javascript
// Вход
const response = await fetch('http://localhost/api/index.php?endpoint=auth&action=login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include', // Важно для сессий
  body: JSON.stringify({
    email: 'ivan@example.com',
    password: 'password123'
  })
});

const data = await response.json();
console.log(data);

// Получить книги
const booksResponse = await fetch('http://localhost/api/index.php?endpoint=books&action=list&genre=fiction', {
  credentials: 'include'
});

const booksData = await booksResponse.json();
console.log(booksData);
```

## Тестовые данные

База данных включает тестовые данные:
- 3 пользователя (пароль для всех: `password`)
- 8 книг в разных жанрах
- Несколько отзывов

## Поддержка

Для вопросов и предложений создайте issue в репозитории проекта.
