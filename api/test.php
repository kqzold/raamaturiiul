<?php
/**
 * Simple test script to verify API setup
 * Run: php api/test.php
 */

echo "=== RaamatuRiiul API Test ===\n\n";

// Check PHP version
echo "1. PHP Version Check\n";
$phpVersion = phpversion();
echo "   Current version: $phpVersion\n";
if (version_compare($phpVersion, '7.4.0', '>=')) {
    echo "   ✓ PHP version is compatible\n\n";
} else {
    echo "   ✗ PHP version must be 7.4 or higher\n\n";
    exit(1);
}

// Check required extensions
echo "2. Required Extensions Check\n";
$required_extensions = ['pdo', 'pdo_mysql', 'json', 'session'];
$missing = [];

foreach ($required_extensions as $ext) {
    if (extension_loaded($ext)) {
        echo "   ✓ $ext is loaded\n";
    } else {
        echo "   ✗ $ext is NOT loaded\n";
        $missing[] = $ext;
    }
}

if (empty($missing)) {
    echo "   All required extensions are loaded\n\n";
} else {
    echo "   Missing extensions: " . implode(', ', $missing) . "\n\n";
    exit(1);
}

// Check file structure
echo "3. File Structure Check\n";
$required_files = [
    'api/config/config.php',
    'api/config/database.php',
    'api/middleware/auth.php',
    'api/models/User.php',
    'api/models/Book.php',
    'api/models/Review.php',
    'api/models/Cart.php',
    'api/controllers/auth.php',
    'api/controllers/books.php',
    'api/controllers/reviews.php',
    'api/controllers/cart.php',
    'api/controllers/profile.php',
    'api/index.php',
    'api/database.sql'
];

foreach ($required_files as $file) {
    if (file_exists($file)) {
        echo "   ✓ $file exists\n";
    } else {
        echo "   ✗ $file is missing\n";
    }
}

echo "\n4. Directory Permissions Check\n";
$api_dir = 'api';
if (is_readable($api_dir)) {
    echo "   ✓ API directory is readable\n";
} else {
    echo "   ✗ API directory is not readable\n";
}

echo "\n=== Test Complete ===\n";
echo "\nNext steps:\n";
echo "1. Import database schema: mysql -u root -p < api/database.sql\n";
echo "2. Configure database connection in api/config/database.php\n";
echo "3. Ensure Apache mod_rewrite is enabled\n";
echo "4. Test API endpoints using curl or Postman\n";
?>
