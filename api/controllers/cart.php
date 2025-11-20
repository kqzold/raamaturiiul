<?php
require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../middleware/auth.php';
require_once __DIR__ . '/../models/Cart.php';

$database = new Database();
$db = $database->getConnection();
$cart = new Cart($db);

$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? 'list';

// All cart operations require authentication
Auth::requireAuth();
$userId = Auth::getCurrentUserId();

switch ($action) {
    case 'list':
        if ($method !== 'GET') {
            sendResponse(false, null, "Method not allowed", 405);
        }

        $items = $cart->getByUser($userId);
        $total = $cart->getTotal($userId);
        
        sendResponse(true, [
            'items' => $items,
            'total' => $total
        ], "Cart retrieved successfully");
        break;

    case 'add':
        if ($method !== 'POST') {
            sendResponse(false, null, "Method not allowed", 405);
        }

        $data = getRequestData();
        
        // Validate required fields
        $error = validateRequired($data, ['book_id']);
        if ($error) {
            sendResponse(false, null, $error, 400);
        }

        $result = $cart->add($userId, $data['book_id']);
        if ($result) {
            sendResponse(true, null, "Book added to cart successfully", 201);
        } else {
            sendResponse(false, null, "Failed to add book to cart", 500);
        }
        break;

    case 'update':
        if ($method !== 'PUT' && $method !== 'PATCH') {
            sendResponse(false, null, "Method not allowed", 405);
        }

        $data = getRequestData();
        
        // Validate required fields
        $error = validateRequired($data, ['book_id', 'quantity']);
        if ($error) {
            sendResponse(false, null, $error, 400);
        }

        $result = $cart->updateQuantity($userId, $data['book_id'], $data['quantity']);
        if ($result) {
            sendResponse(true, null, "Cart updated successfully");
        } else {
            sendResponse(false, null, "Failed to update cart", 500);
        }
        break;

    case 'remove':
        if ($method !== 'DELETE') {
            sendResponse(false, null, "Method not allowed", 405);
        }

        $bookId = $_GET['book_id'] ?? null;
        
        if (!$bookId) {
            sendResponse(false, null, "Book ID is required", 400);
        }

        $result = $cart->remove($userId, $bookId);
        if ($result) {
            sendResponse(true, null, "Book removed from cart successfully");
        } else {
            sendResponse(false, null, "Failed to remove book from cart", 500);
        }
        break;

    case 'clear':
        if ($method !== 'DELETE') {
            sendResponse(false, null, "Method not allowed", 405);
        }

        $result = $cart->clear($userId);
        if ($result) {
            sendResponse(true, null, "Cart cleared successfully");
        } else {
            sendResponse(false, null, "Failed to clear cart", 500);
        }
        break;

    default:
        sendResponse(false, null, "Invalid action", 400);
}
?>
