<?php
class Review {
    private $conn;
    private $table = "reviews";

    public function __construct($db) {
        $this->conn = $db;
    }

    public function getByBook($bookId) {
        $query = "SELECT r.*, u.name as user_name, u.avatar as user_avatar
                  FROM " . $this->table . " r
                  LEFT JOIN users u ON r.user_id = u.id
                  WHERE r.book_id = :book_id
                  ORDER BY r.created_at DESC";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":book_id", $bookId);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function create($data) {
        // Check if user already reviewed this book
        $checkQuery = "SELECT id FROM " . $this->table . " WHERE book_id = :book_id AND user_id = :user_id";
        $checkStmt = $this->conn->prepare($checkQuery);
        $checkStmt->bindParam(":book_id", $data['book_id']);
        $checkStmt->bindParam(":user_id", $data['user_id']);
        $checkStmt->execute();

        if ($checkStmt->rowCount() > 0) {
            return false; // User already reviewed this book
        }

        $query = "INSERT INTO " . $this->table . " (book_id, user_id, rating, comment) 
                  VALUES (:book_id, :user_id, :rating, :comment)";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":book_id", $data['book_id']);
        $stmt->bindParam(":user_id", $data['user_id']);
        $stmt->bindParam(":rating", $data['rating']);
        $stmt->bindParam(":comment", $data['comment']);

        if ($stmt->execute()) {
            // Update book rating
            $this->updateBookRating($data['book_id']);
            return $this->conn->lastInsertId();
        }
        return false;
    }

    private function updateBookRating($bookId) {
        $query = "UPDATE books SET rating = (
                    SELECT AVG(rating) FROM reviews WHERE book_id = :book_id
                  ) WHERE id = :book_id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":book_id", $bookId);
        $stmt->execute();
    }

    public function delete($id, $userId) {
        // Check if user owns the review
        $checkQuery = "SELECT user_id, book_id FROM " . $this->table . " WHERE id = :id";
        $checkStmt = $this->conn->prepare($checkQuery);
        $checkStmt->bindParam(":id", $id);
        $checkStmt->execute();
        
        if ($checkStmt->rowCount() === 0) {
            return false;
        }

        $review = $checkStmt->fetch(PDO::FETCH_ASSOC);
        if ($review['user_id'] != $userId) {
            return false;
        }

        $query = "DELETE FROM " . $this->table . " WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id", $id);

        if ($stmt->execute()) {
            // Update book rating after deletion
            $this->updateBookRating($review['book_id']);
            return true;
        }
        return false;
    }
}
?>
