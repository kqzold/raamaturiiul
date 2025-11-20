<?php
require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../middleware/auth.php';
require_once __DIR__ . '/../models/User.php';

$database = new Database();
$db = $database->getConnection();
$user = new User($db);

$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? 'get';
$id = $_GET['id'] ?? null;

switch ($action) {
    case 'get':
        if ($method !== 'GET') {
            sendResponse(false, null, "Method not allowed", 405);
        }

        // If no ID provided, get current user's profile
        if (!$id) {
            Auth::requireAuth();
            $id = Auth::getCurrentUserId();
        }

        $userData = $user->getById($id);
        if ($userData) {
            sendResponse(true, $userData, "User profile retrieved successfully");
        } else {
            sendResponse(false, null, "User not found", 404);
        }
        break;

    case 'update':
        if ($method !== 'PUT' && $method !== 'PATCH') {
            sendResponse(false, null, "Method not allowed", 405);
        }

        Auth::requireAuth();
        $userId = Auth::getCurrentUserId();

        $data = getRequestData();
        
        if (empty($data)) {
            sendResponse(false, null, "No data provided", 400);
        }

        $result = $user->update($userId, $data);
        if ($result) {
            sendResponse(true, null, "Profile updated successfully");
        } else {
            sendResponse(false, null, "Failed to update profile", 500);
        }
        break;

    default:
        sendResponse(false, null, "Invalid action", 400);
}
?>
