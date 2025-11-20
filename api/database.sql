-- Create database
CREATE DATABASE IF NOT EXISTS raamaturiiul CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE raamaturiiul;

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    avatar VARCHAR(255) DEFAULT NULL,
    rating DECIMAL(3,2) DEFAULT 0.00,
    total_sales INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Books table
CREATE TABLE IF NOT EXISTS books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(100) NOT NULL,
    isbn VARCHAR(20) DEFAULT NULL,
    year INT DEFAULT NULL,
    pages INT DEFAULT NULL,
    language VARCHAR(50) DEFAULT NULL,
    genre VARCHAR(50) NOT NULL,
    condition VARCHAR(20) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    description TEXT,
    image VARCHAR(255) DEFAULT NULL,
    rating DECIMAL(3,2) DEFAULT 0.00,
    seller_id INT NOT NULL,
    status ENUM('available', 'sold', 'reserved') DEFAULT 'available',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (seller_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_genre (genre),
    INDEX idx_status (status),
    INDEX idx_seller (seller_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    book_id INT NOT NULL,
    user_id INT NOT NULL,
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_book_review (book_id, user_id),
    INDEX idx_book (book_id),
    INDEX idx_user (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Cart table
CREATE TABLE IF NOT EXISTS cart (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    book_id INT NOT NULL,
    quantity INT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_book_cart (user_id, book_id),
    INDEX idx_user (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    status ENUM('pending', 'completed', 'cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user (user_id),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Order items table
CREATE TABLE IF NOT EXISTS order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    book_id INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    quantity INT DEFAULT 1,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE,
    INDEX idx_order (order_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert sample data
-- Sample users
INSERT INTO users (name, email, password, avatar, rating, total_sales) VALUES
('Иван Иванов', 'ivan@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'https://i.pravatar.cc/150?img=12', 4.8, 45),
('Мария Петрова', 'maria@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'https://i.pravatar.cc/150?img=5', 4.5, 23),
('Алексей Смирнов', 'alexey@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'https://i.pravatar.cc/150?img=8', 4.7, 31);

-- Sample books
INSERT INTO books (title, author, isbn, year, pages, language, genre, `condition`, price, description, image, rating, seller_id, status) VALUES
('1984', 'George Orwell', '978-0-452-28423-4', 1949, 328, 'Английский', 'fiction', 'Отличное', 12.99, '"1984" - культовый роман-антиутопия Джорджа Оруэлла, опубликованный в 1949 году. Действие происходит в тоталитарном государстве Океания.', 'https://via.placeholder.com/200x300?text=1984', 4.5, 1, 'available'),
('To Kill a Mockingbird', 'Harper Lee', '978-0-06-112008-4', 1960, 324, 'Английский', 'fiction', 'Хорошее', 10.99, 'Классический роман о расовой несправедливости и потере невинности в американском Юге.', 'https://via.placeholder.com/200x300?text=Mockingbird', 4.8, 1, 'available'),
('The Great Gatsby', 'F. Scott Fitzgerald', '978-0-7432-7356-5', 1925, 180, 'Английский', 'fiction', 'Отличное', 9.99, 'История о таинственном миллионере Джее Гэтсби и его одержимости прекрасной Дейзи Бьюкенен.', 'https://via.placeholder.com/200x300?text=Gatsby', 4.3, 2, 'available'),
('Pride and Prejudice', 'Jane Austen', '978-0-14-143951-8', 1813, 432, 'Английский', 'fiction', 'Хорошее', 11.99, 'Романтический роман о нравах, воспитании, морали и браке в обществе британского дворянства.', 'https://via.placeholder.com/200x300?text=Pride', 4.7, 2, 'available'),
('Sapiens', 'Yuval Noah Harari', '978-0-06-231609-7', 2011, 443, 'Английский', 'non-fiction', 'Отличное', 24.99, 'Краткая история человечества от появления первых людей до наших дней.', 'https://via.placeholder.com/200x300?text=Sapiens', 4.6, 3, 'available'),
('The Hobbit', 'J.R.R. Tolkien', '978-0-547-92822-7', 1937, 310, 'Английский', 'fantasy', 'Хорошее', 15.99, 'Приключения хоббита Бильбо Бэггинса в путешествии к Одинокой Горе.', 'https://via.placeholder.com/200x300?text=Hobbit', 4.9, 3, 'available'),
('The Da Vinci Code', 'Dan Brown', '978-0-307-47927-1', 2003, 454, 'Английский', 'mystery', 'Отличное', 13.99, 'Триллер о профессоре символогии, который раскрывает древнюю тайну.', 'https://via.placeholder.com/200x300?text=DaVinci', 4.2, 1, 'available'),
('A Brief History of Time', 'Stephen Hawking', '978-0-553-38016-3', 1988, 256, 'Английский', 'science', 'Хорошее', 18.99, 'Популярное изложение космологии от Большого взрыва до черных дыр.', 'https://via.placeholder.com/200x300?text=Time', 4.4, 2, 'available');

-- Sample reviews
INSERT INTO reviews (book_id, user_id, rating, comment) VALUES
(1, 2, 5, 'Потрясающая книга! Очень актуальна даже сегодня. Состояние отличное, быстрая доставка.'),
(1, 3, 4, 'Классика антиутопии. Книга в хорошем состоянии, рекомендую продавца.'),
(2, 1, 5, 'Одна из моих любимых книг. Отличное состояние, спасибо!'),
(3, 2, 4, 'Хорошая книга, быстрая доставка.'),
(5, 1, 5, 'Захватывающая книга о истории человечества. Рекомендую!');
