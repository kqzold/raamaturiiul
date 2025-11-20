<?php
require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../middleware/auth.php';
require_once __DIR__ . '/../models/User.php';

$database = new Database();
$db = $database->getConnection();
$user = new User($db);

$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? '';

switch ($action) {
    case 'register':
        if ($method !== 'POST') {
            sendResponse(false, null, "Method not allowed", 405);
        }

        $data = getRequestData();
        
        // Validate required fields
        $error = validateRequired($data, ['name', 'email', 'password']);
        if ($error) {
            sendResponse(false, null, $error, 400);
        }

        // Validate email format
        if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
            sendResponse(false, null, "Invalid email format", 400);
        }

        // Check if email already exists
        if ($user->emailExists($data['email'])) {
            sendResponse(false, null, "Email already registered", 409);
        }

        // Validate password length
        if (strlen($data['password']) < 6) {
            sendResponse(false, null, "Password must be at least 6 characters", 400);
        }

        // Register user
        $userId = $user->register($data);
        if ($userId) {
            sendResponse(true, ['user_id' => $userId], "Registration successful", 201);
        } else {
            sendResponse(false, null, "Registration failed", 500);
        }
        break;

    case 'login':
        if ($method !== 'POST') {
            sendResponse(false, null, "Method not allowed", 405);
        }

        $data = getRequestData();
        
        // Validate required fields
        $error = validateRequired($data, ['email', 'password']);
        if ($error) {
            sendResponse(false, null, $error, 400);
        }

        // Attempt login
        $userData = $user->login($data['email'], $data['password']);
        if ($userData) {
            Auth::login($userData['id'], $userData);
            sendResponse(true, $userData, "Login successful");
        } else {
            sendResponse(false, null, "Invalid email or password", 401);
        }
        break;

    case 'logout':
        if ($method !== 'POST') {
            sendResponse(false, null, "Method not allowed", 405);
        }

        Auth::logout();
        sendResponse(true, null, "Logout successful");
        break;

    case 'me':
        if ($method !== 'GET') {
            sendResponse(false, null, "Method not allowed", 405);
        }

        Auth::requireAuth();
        $userId = Auth::getCurrentUserId();
        $userData = $user->getById($userId);
        
        if ($userData) {
            sendResponse(true, $userData, "User data retrieved");
        } else {
            sendResponse(false, null, "User not found", 404);
        }
        break;

    case 'check':
        if ($method !== 'GET') {
            sendResponse(false, null, "Method not allowed", 405);
        }

        $isAuth = Auth::isAuthenticated();
        $userData = null;
        
        if ($isAuth) {
            $userId = Auth::getCurrentUserId();
            $userData = $user->getById($userId);
        }

        sendResponse(true, [
            'authenticated' => $isAuth,
            'user' => $userData
        ], "Authentication status checked");
        break;

    default:
        sendResponse(false, null, "Invalid action", 400);
}
?>
