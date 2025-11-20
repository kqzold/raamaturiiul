<?php
class Book {
    private $conn;
    private $table = "books";

    public function __construct($db) {
        $this->conn = $db;
    }

    public function getAll($filters = []) {
        $query = "SELECT b.*, u.name as seller_name, u.avatar as seller_avatar, u.rating as seller_rating 
                  FROM " . $this->table . " b
                  LEFT JOIN users u ON b.seller_id = u.id
                  WHERE b.status = 'available'";

        $params = [];

        if (!empty($filters['search'])) {
            $query .= " AND (b.title LIKE :search OR b.author LIKE :search)";
            $params[':search'] = '%' . $filters['search'] . '%';
        }

        if (!empty($filters['genre']) && $filters['genre'] !== 'all') {
            $query .= " AND b.genre = :genre";
            $params[':genre'] = $filters['genre'];
        }

        if (!empty($filters['min_price'])) {
            $query .= " AND b.price >= :min_price";
            $params[':min_price'] = $filters['min_price'];
        }

        if (!empty($filters['max_price'])) {
            $query .= " AND b.price <= :max_price";
            $params[':max_price'] = $filters['max_price'];
        }

        $query .= " ORDER BY b.created_at DESC";

        if (!empty($filters['limit'])) {
            $query .= " LIMIT :limit";
        }

        if (!empty($filters['offset'])) {
            $query .= " OFFSET :offset";
        }

        $stmt = $this->conn->prepare($query);

        foreach ($params as $key => $value) {
            $stmt->bindValue($key, $value);
        }

        if (!empty($filters['limit'])) {
            $stmt->bindValue(':limit', (int)$filters['limit'], PDO::PARAM_INT);
        }

        if (!empty($filters['offset'])) {
            $stmt->bindValue(':offset', (int)$filters['offset'], PDO::PARAM_INT);
        }

        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getById($id) {
        $query = "SELECT b.*, u.name as seller_name, u.avatar as seller_avatar, 
                  u.rating as seller_rating, u.total_sales as seller_total_sales
                  FROM " . $this->table . " b
                  LEFT JOIN users u ON b.seller_id = u.id
                  WHERE b.id = :id LIMIT 1";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id", $id);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            return $stmt->fetch(PDO::FETCH_ASSOC);
        }
        return false;
    }

    public function create($data) {
        $query = "INSERT INTO " . $this->table . " 
                  (title, author, isbn, year, pages, language, genre, `condition`, price, description, image, seller_id)
                  VALUES (:title, :author, :isbn, :year, :pages, :language, :genre, :condition, :price, :description, :image, :seller_id)";
        
        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":title", $data['title']);
        $stmt->bindParam(":author", $data['author']);
        $stmt->bindParam(":isbn", $data['isbn']);
        $stmt->bindParam(":year", $data['year']);
        $stmt->bindParam(":pages", $data['pages']);
        $stmt->bindParam(":language", $data['language']);
        $stmt->bindParam(":genre", $data['genre']);
        $stmt->bindParam(":condition", $data['condition']);
        $stmt->bindParam(":price", $data['price']);
        $stmt->bindParam(":description", $data['description']);
        $stmt->bindParam(":image", $data['image']);
        $stmt->bindParam(":seller_id", $data['seller_id']);

        if ($stmt->execute()) {
            return $this->conn->lastInsertId();
        }
        return false;
    }

    public function update($id, $data, $userId) {
        // Check if user owns the book
        $checkQuery = "SELECT seller_id FROM " . $this->table . " WHERE id = :id";
        $checkStmt = $this->conn->prepare($checkQuery);
        $checkStmt->bindParam(":id", $id);
        $checkStmt->execute();
        
        if ($checkStmt->rowCount() === 0) {
            return false;
        }

        $book = $checkStmt->fetch(PDO::FETCH_ASSOC);
        if ($book['seller_id'] != $userId) {
            return false; // User doesn't own this book
        }

        $fields = [];
        $params = [':id' => $id];

        $allowedFields = ['title', 'author', 'isbn', 'year', 'pages', 'language', 'genre', 'condition', 'price', 'description', 'image', 'status'];
        
        foreach ($allowedFields as $field) {
            if (isset($data[$field])) {
                $fields[] = ($field === 'condition' ? "`condition`" : $field) . " = :" . $field;
                $params[':' . $field] = $data[$field];
            }
        }

        if (empty($fields)) {
            return false;
        }

        $query = "UPDATE " . $this->table . " SET " . implode(", ", $fields) . " WHERE id = :id";
        $stmt = $this->conn->prepare($query);

        return $stmt->execute($params);
    }

    public function delete($id, $userId) {
        // Check if user owns the book
        $checkQuery = "SELECT seller_id FROM " . $this->table . " WHERE id = :id";
        $checkStmt = $this->conn->prepare($checkQuery);
        $checkStmt->bindParam(":id", $id);
        $checkStmt->execute();
        
        if ($checkStmt->rowCount() === 0) {
            return false;
        }

        $book = $checkStmt->fetch(PDO::FETCH_ASSOC);
        if ($book['seller_id'] != $userId) {
            return false;
        }

        $query = "DELETE FROM " . $this->table . " WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id", $id);

        return $stmt->execute();
    }

    public function getBySeller($sellerId) {
        $query = "SELECT * FROM " . $this->table . " WHERE seller_id = :seller_id ORDER BY created_at DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":seller_id", $sellerId);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
?>
