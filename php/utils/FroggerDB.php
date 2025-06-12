<?php

//get host, db name, user, password from config
require_once dirname(__FILE__) . '/../config/config.php';
require_once dirname(__FILE__). '/../login/User.php';

class FroggerDB {
    private $pdo;
    private static $instance = null; //1 static instance per program

    private function __construct() {
        try {
            $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=".DB_CHARSET;
            $options = [
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES   => false,
            ];
            $this->pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
        } catch (PDOException $e) {
            die("Error connecting to DB: " . $e->getMessage());
        }
    }

    public static function getInstance(): FroggerDB {
        if (self::$instance === null) {
            self::$instance = new FroggerDB();
        }
        return self::$instance;
    }


    /**
     * Loads user using his ID
     *
     * @param int $userId user ID.
     * @return User|null Returns User object or null if user with given id does not exist.
     */
    public function getUserById(int $userId): ?User {
        $stmt = $this->pdo->prepare("SELECT * FROM users WHERE id = ?");
        $stmt->execute([$userId]);
        $user_data = $stmt->fetch();

        if(!$user_data) //user has not been found
            return null;

        return new User($user_data) ? : null;
    }

    /**
     * Loads user based on his username
     * @return User|null Returns User objec or null if user with given username does not exist.
     */
    public function getUserByUsername(string $username): ?User {
        $stmt = $this->pdo->prepare("SELECT * FROM users WHERE username = ?");
        $stmt->execute([$username]);
        $user_data = $stmt->fetch();

        if(!$user_data) //user has not been found
            return null;

        return new User($user_data);
    }

    
    /**
     * Checks if given user exists, and his password is valid
     * Loads user form database and checks his password hash
     * @param string $password user's password in plain text
     * @return bool True if username and password are valid, False otherwise.
     */
    public function checkUserLogin(string $username, string $password): bool{
        $stmt = $this->pdo->prepare("SELECT * FROM users WHERE username = ?");
        $stmt->execute([$username]);
        $user_data = $stmt->fetch();

        if(!$user_data)
            return false;

        return password_verify($password, $user_data["password"]);
    }

    /**
     * Creates new user in database, passwords are hashed
     * @param string $password user's password
     * @param string|null $email (optional)
     * @return int|false ID of created user or false if user could not be created
     */
    public function createUser(string $username, string $password, ?string $email = null): int|false {
        $passwordHash = password_hash($password, PASSWORD_DEFAULT); //hash password before insertion

        $sql = "INSERT INTO users (username, password, email) VALUES (?, ?, ?)";

        try {
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute([$username, $passwordHash, $email]);
            return $this->pdo->lastInsertId() ?: false;
        } catch (PDOException $e) { //exception will be thrown if username is not unique
            return false;
        }
    }

    /**
     * Updates avatar path for user
     * @param int $userId User's id.
     * @param string $avatarPath New path to avatar.
     * @return bool True if everything went ok, False otherwise.
     */
    public function updateUserAvatar(int $userId, string $avatarPath): bool {
        $sql = "UPDATE users SET avatar_path = ? WHERE id = ?";
        $stmt = $this->pdo->prepare($sql);
        return $stmt->execute([$avatarPath, $userId]);
    }
}

?>