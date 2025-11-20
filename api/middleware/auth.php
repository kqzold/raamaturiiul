<?php
class Auth {
    public static function isAuthenticated() {
        return isset($_SESSION['user_id']) && !empty($_SESSION['user_id']);
    }

    public static function requireAuth() {
        if (!self::isAuthenticated()) {
            sendResponse(false, null, "Authentication required", 401);
        }
    }

    public static function getCurrentUserId() {
        return $_SESSION['user_id'] ?? null;
    }

    public static function login($userId, $userData = []) {
        $_SESSION['user_id'] = $userId;
        $_SESSION['user_email'] = $userData['email'] ?? '';
        $_SESSION['user_name'] = $userData['name'] ?? '';
    }

    public static function logout() {
        session_unset();
        session_destroy();
    }

    public static function hashPassword($password) {
        return password_hash($password, PASSWORD_BCRYPT);
    }

    public static function verifyPassword($password, $hash) {
        return password_verify($password, $hash);
    }
}
?>
