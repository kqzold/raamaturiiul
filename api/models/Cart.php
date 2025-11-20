<?php
class Cart {
    private $conn;
    private $table = "cart";

    public function __construct($db) {
        $this->conn = $db;
    }

    public function getByUser($userId) {
        $query = "SELECT c.*, b.title, b.author, b.price, b.image, b.status, 
                  u.name as seller_name
                  FROM " . $this->table . " c
                  LEFT JOIN books b ON c.book_id = b.id
                  LEFT JOIN users u ON b.seller_id = u.id
                  WHERE c.user_id = :user_id
                  ORDER BY c.created_at DESC";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":user_id", $userId);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function add($userId, $bookId) {
        // Check if book is already in cart
        $checkQuery = "SELECT id, quantity FROM " . $this->table . " 
                      WHERE user_id = :user_id AND book_id = :book_id";
        $checkStmt = $this->conn->prepare($checkQuery);
        $checkStmt->bindParam(":user_id", $userId);
        $checkStmt->bindParam(":book_id", $bookId);
        $checkStmt->execute();

        if ($checkStmt->rowCount() > 0) {
            // Update quantity
            $row = $checkStmt->fetch(PDO::FETCH_ASSOC);
            $newQuantity = $row['quantity'] + 1;
            
            $updateQuery = "UPDATE " . $this->table . " SET quantity = :quantity 
                           WHERE user_id = :user_id AND book_id = :book_id";
            $updateStmt = $this->conn->prepare($updateQuery);
            $updateStmt->bindParam(":quantity", $newQuantity);
            $updateStmt->bindParam(":user_id", $userId);
            $updateStmt->bindParam(":book_id", $bookId);
            return $updateStmt->execute();
        }

        // Add new item
        $query = "INSERT INTO " . $this->table . " (user_id, book_id, quantity) 
                  VALUES (:user_id, :book_id, 1)";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":user_id", $userId);
        $stmt->bindParam(":book_id", $bookId);
        return $stmt->execute();
    }

    public function updateQuantity($userId, $bookId, $quantity) {
        if ($quantity <= 0) {
            return $this->remove($userId, $bookId);
        }

        $query = "UPDATE " . $this->table . " SET quantity = :quantity 
                  WHERE user_id = :user_id AND book_id = :book_id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":quantity", $quantity);
        $stmt->bindParam(":user_id", $userId);
        $stmt->bindParam(":book_id", $bookId);
        return $stmt->execute();
    }

    public function remove($userId, $bookId) {
        $query = "DELETE FROM " . $this->table . " 
                  WHERE user_id = :user_id AND book_id = :book_id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":user_id", $userId);
        $stmt->bindParam(":book_id", $bookId);
        return $stmt->execute();
    }

    public function clear($userId) {
        $query = "DELETE FROM " . $this->table . " WHERE user_id = :user_id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":user_id", $userId);
        return $stmt->execute();
    }

    public function getTotal($userId) {
        $query = "SELECT SUM(b.price * c.quantity) as total
                  FROM " . $this->table . " c
                  LEFT JOIN books b ON c.book_id = b.id
                  WHERE c.user_id = :user_id AND b.status = 'available'";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":user_id", $userId);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        return $row['total'] ?? 0;
    }
}
?>
