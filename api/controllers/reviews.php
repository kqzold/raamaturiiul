<?php
require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../middleware/auth.php';
require_once __DIR__ . '/../models/Review.php';

$database = new Database();
$db = $database->getConnection();
$review = new Review($db);

$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? 'list';
$bookId = $_GET['book_id'] ?? null;
$id = $_GET['id'] ?? null;

switch ($action) {
    case 'list':
        if ($method !== 'GET') {
            sendResponse(false, null, "Method not allowed", 405);
        }

        if (!$bookId) {
            sendResponse(false, null, "Book ID is required", 400);
        }

        $reviews = $review->getByBook($bookId);
        sendResponse(true, $reviews, "Reviews retrieved successfully");
        break;

    case 'create':
        if ($method !== 'POST') {
            sendResponse(false, null, "Method not allowed", 405);
        }

        Auth::requireAuth();
        $userId = Auth::getCurrentUserId();

        $data = getRequestData();
        
        // Validate required fields
        $error = validateRequired($data, ['book_id', 'rating']);
        if ($error) {
            sendResponse(false, null, $error, 400);
        }

        // Validate rating
        if ($data['rating'] < 1 || $data['rating'] > 5) {
            sendResponse(false, null, "Rating must be between 1 and 5", 400);
        }

        $data['user_id'] = $userId;
        $data['comment'] = $data['comment'] ?? '';

        $reviewId = $review->create($data);
        if ($reviewId) {
            sendResponse(true, ['review_id' => $reviewId], "Review created successfully", 201);
        } else {
            sendResponse(false, null, "Failed to create review. You may have already reviewed this book.", 409);
        }
        break;

    case 'delete':
        if ($method !== 'DELETE') {
            sendResponse(false, null, "Method not allowed", 405);
        }

        Auth::requireAuth();
        $userId = Auth::getCurrentUserId();

        if (!$id) {
            sendResponse(false, null, "Review ID is required", 400);
        }

        $result = $review->delete($id, $userId);
        if ($result) {
            sendResponse(true, null, "Review deleted successfully");
        } else {
            sendResponse(false, null, "Failed to delete review or unauthorized", 403);
        }
        break;

    default:
        sendResponse(false, null, "Invalid action", 400);
}
?>
