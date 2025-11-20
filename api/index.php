<?php
require_once __DIR__ . '/config/config.php';

// Simple routing based on endpoint parameter
$endpoint = $_GET['endpoint'] ?? '';

switch ($endpoint) {
    case 'auth':
        require_once __DIR__ . '/controllers/auth.php';
        break;
    
    case 'books':
        require_once __DIR__ . '/controllers/books.php';
        break;
    
    case 'reviews':
        require_once __DIR__ . '/controllers/reviews.php';
        break;
    
    case 'cart':
        require_once __DIR__ . '/controllers/cart.php';
        break;
    
    case 'profile':
        require_once __DIR__ . '/controllers/profile.php';
        break;
    
    default:
        sendResponse(false, null, "Invalid endpoint", 404);
}
?>
