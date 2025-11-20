<?php
/**
 * Example database configuration
 * Copy this file to database.local.php and update with your settings
 * database.local.php is in .gitignore for security
 */

class DatabaseExample {
    // Database credentials
    private $host = "localhost";           // Database host
    private $database_name = "raamaturiiul"; // Database name
    private $username = "root";             // Database username
    private $password = "";                 // Database password
    
    public $conn;

    // Get database connection
    public function getConnection() {
        $this->conn = null;

        try {
            $this->conn = new PDO(
                "mysql:host=" . $this->host . ";dbname=" . $this->database_name,
                $this->username,
                $this->password
            );
            $this->conn->exec("set names utf8mb4");
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch(PDOException $exception) {
            echo json_encode([
                "success" => false,
                "message" => "Connection error: " . $exception->getMessage()
            ]);
            exit();
        }

        return $this->conn;
    }
}
?>
