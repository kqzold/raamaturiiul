# Quick Start Guide - RaamatuRiiul Backend

## Быстрая установка (5 минут)

### Шаг 1: Проверка требований

Убедитесь, что у вас установлено:
- PHP 7.4+ (проверьте: `php -v`)
- MySQL 5.7+ (проверьте: `mysql --version`)
- Apache с mod_rewrite ИЛИ PHP встроенный сервер

### Шаг 2: Клонирование репозитория

```bash
git clone https://github.com/kqzold/raamaturiiul.git
cd raamaturiiul
```

### Шаг 3: Настройка базы данных

```bash
# Войдите в MySQL
mysql -u root -p

# Создайте базу данных и импортируйте схему
mysql -u root -p < api/database.sql
```

Или через MySQL CLI:
```sql
CREATE DATABASE raamaturiiul CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE raamaturiiul;
SOURCE api/database.sql;
```

### Шаг 4: Настройка подключения к БД

Отредактируйте `api/config/database.php`:

```php
private $host = "localhost";
private $database_name = "raamaturiiul";
private $username = "root";        // ваш MySQL пользователь
private $password = "";            // ваш MySQL пароль
```

### Шаг 5: Запуск

#### Вариант A: PHP встроенный сервер (для разработки)

```bash
# Запустите сервер на порту 8000
php -S localhost:8000 -t .

# API будет доступен по адресу:
# http://localhost:8000/api/index.php
```

#### Вариант B: Apache

```bash
# Убедитесь, что mod_rewrite включен
sudo a2enmod rewrite
sudo service apache2 restart

# Настройте DocumentRoot на папку проекта
# API будет доступен по адресу:
# http://localhost/api/index.php
```

### Шаг 6: Тестирование

```bash
# Запустите тест
php api/test.php

# Проверьте API
curl http://localhost:8000/api/index.php?endpoint=books&action=list
```

## Тестовые учетные данные

База данных включает тестовых пользователей:
- Email: `ivan@example.com` / Пароль: `password`
- Email: `maria@example.com` / Пароль: `password`
- Email: `alexey@example.com` / Пароль: `password`

## Примеры API запросов

### Вход в систему
```bash
curl -X POST http://localhost:8000/api/index.php?endpoint=auth&action=login \
  -H "Content-Type: application/json" \
  -d '{"email":"ivan@example.com","password":"password"}' \
  --cookie-jar cookies.txt
```

### Получить книги
```bash
curl http://localhost:8000/api/index.php?endpoint=books&action=list \
  --cookie cookies.txt
```

### Создать книгу
```bash
curl -X POST http://localhost:8000/api/index.php?endpoint=books&action=create \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Book",
    "author": "Test Author",
    "genre": "fiction",
    "condition": "Отличное",
    "price": 15.99
  }' \
  --cookie cookies.txt
```

## Структура URL

```
http://localhost:8000/api/index.php?endpoint={ENDPOINT}&action={ACTION}

Endpoints:
- auth      (register, login, logout, check, me)
- books     (list, get, create, update, delete, my-books)
- reviews   (list, create, delete)
- cart      (list, add, update, remove, clear)
- profile   (get, update)
```

## Troubleshooting

### Ошибка подключения к БД
- Проверьте настройки в `api/config/database.php`
- Убедитесь, что MySQL запущен: `sudo service mysql status`
- Проверьте права пользователя MySQL

### 404 Not Found
- Убедитесь, что вы используете правильный URL
- Для Apache: проверьте, что mod_rewrite включен
- Для PHP сервера: запускайте из корневой директории проекта

### CORS ошибки
- CORS уже настроен в `api/config/config.php`
- При необходимости измените `Access-Control-Allow-Origin` на адрес вашего фронтенда

### Ошибки сессии
- Проверьте права на запись в директорию сессий PHP
- Убедитесь, что отправляете cookies с запросами

## Дальнейшие шаги

1. Изучите API документацию: `api/README.md`
2. Интегрируйте с React фронтендом
3. Настройте безопасность для продакшена
4. Добавьте file upload для изображений книг
5. Реализуйте систему заказов

## Полезные команды

```bash
# Проверить PHP версию и расширения
php -v
php -m | grep -E 'pdo|mysql|json'

# Перезапустить MySQL
sudo service mysql restart

# Импортировать свежую схему БД
mysql -u root -p raamaturiiul < api/database.sql

# Запустить тест
php api/test.php

# Запустить встроенный PHP сервер
php -S localhost:8000
```

## Поддержка

Если возникли проблемы, создайте issue в GitHub репозитории с описанием ошибки и выводом команды `php api/test.php`.
