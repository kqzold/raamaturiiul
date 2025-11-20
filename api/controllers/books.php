<?php
require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../middleware/auth.php';
require_once __DIR__ . '/../models/Book.php';

$database = new Database();
$db = $database->getConnection();
$book = new Book($db);

$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? 'list';
$id = $_GET['id'] ?? null;

switch ($action) {
    case 'list':
        if ($method !== 'GET') {
            sendResponse(false, null, "Method not allowed", 405);
        }

        $filters = [
            'search' => $_GET['search'] ?? '',
            'genre' => $_GET['genre'] ?? 'all',
            'min_price' => $_GET['min_price'] ?? null,
            'max_price' => $_GET['max_price'] ?? null,
            'limit' => $_GET['limit'] ?? 100,
            'offset' => $_GET['offset'] ?? 0
        ];

        $books = $book->getAll($filters);
        sendResponse(true, $books, "Books retrieved successfully");
        break;

    case 'get':
        if ($method !== 'GET') {
            sendResponse(false, null, "Method not allowed", 405);
        }

        if (!$id) {
            sendResponse(false, null, "Book ID is required", 400);
        }

        $bookData = $book->getById($id);
        if ($bookData) {
            sendResponse(true, $bookData, "Book retrieved successfully");
        } else {
            sendResponse(false, null, "Book not found", 404);
        }
        break;

    case 'create':
        if ($method !== 'POST') {
            sendResponse(false, null, "Method not allowed", 405);
        }

        Auth::requireAuth();
        $userId = Auth::getCurrentUserId();

        $data = getRequestData();
        
        // Validate required fields
        $error = validateRequired($data, ['title', 'author', 'genre', 'condition', 'price']);
        if ($error) {
            sendResponse(false, null, $error, 400);
        }

        // Add seller_id
        $data['seller_id'] = $userId;
        
        // Set defaults
        $data['isbn'] = $data['isbn'] ?? null;
        $data['year'] = $data['year'] ?? null;
        $data['pages'] = $data['pages'] ?? null;
        $data['language'] = $data['language'] ?? null;
        $data['description'] = $data['description'] ?? '';
        $data['image'] = $data['image'] ?? 'https://via.placeholder.com/200x300?text=Book';

        $bookId = $book->create($data);
        if ($bookId) {
            sendResponse(true, ['book_id' => $bookId], "Book created successfully", 201);
        } else {
            sendResponse(false, null, "Failed to create book", 500);
        }
        break;

    case 'update':
        if ($method !== 'PUT' && $method !== 'PATCH') {
            sendResponse(false, null, "Method not allowed", 405);
        }

        Auth::requireAuth();
        $userId = Auth::getCurrentUserId();

        if (!$id) {
            sendResponse(false, null, "Book ID is required", 400);
        }

        $data = getRequestData();
        
        if (empty($data)) {
            sendResponse(false, null, "No data provided", 400);
        }

        $result = $book->update($id, $data, $userId);
        if ($result) {
            sendResponse(true, null, "Book updated successfully");
        } else {
            sendResponse(false, null, "Failed to update book or unauthorized", 403);
        }
        break;

    case 'delete':
        if ($method !== 'DELETE') {
            sendResponse(false, null, "Method not allowed", 405);
        }

        Auth::requireAuth();
        $userId = Auth::getCurrentUserId();

        if (!$id) {
            sendResponse(false, null, "Book ID is required", 400);
        }

        $result = $book->delete($id, $userId);
        if ($result) {
            sendResponse(true, null, "Book deleted successfully");
        } else {
            sendResponse(false, null, "Failed to delete book or unauthorized", 403);
        }
        break;

    case 'my-books':
        if ($method !== 'GET') {
            sendResponse(false, null, "Method not allowed", 405);
        }

        Auth::requireAuth();
        $userId = Auth::getCurrentUserId();

        $books = $book->getBySeller($userId);
        sendResponse(true, $books, "Your books retrieved successfully");
        break;

    default:
        sendResponse(false, null, "Invalid action", 400);
}
?>
