<?php

//get host, db name, user, password from config
require_once dirname(__FILE__) . '/../config/config.php';
require_once dirname(__FILE__). '/../login/User.php';
require_once dirname(__FILE__).'/../models/Score.php';

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
     * @return User|null Returns User object or null if user with given username does not exist.
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
     * Loads user based on his email
     * @return User|null Returns User object or null if user with given username does not exist.
     */
    public function getUserByEmail(string $email): ?User{
        $stmt = $this->pdo->prepare("SELECT * FROM users WHERE email = ?");
        $stmt->execute([$email]);
        $user_data = $stmt->fetch();

        if(!$user_data) //user has not been found
            return null;

        return new User($user_data);
    }

    /**
     * Loads user based on his email
     * @param int $limit Max number of users to return. Used for pagination.
     * @param int $offset How many records to skip. Used for pagination.
     * @return Score[] Returns array with user Score data
     */
    public function getUserScores(int $user_id, int $offset, int $limit): array {
         $sql = "SELECT * FROM scores WHERE user_id = ? ORDER BY date DESC LIMIT ? OFFSET ?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$user_id, $limit, $offset]);
        
        $score_objs = [];
        while($row = $stmt->fetch())
            $score_objs[] = new Score($row);

        return $score_objs;
    }

    /**
     * Helper function returning count of all user's scores in database
     * @return int How many scores User has
     */
    public function getUserScoresCount(int $user_id): int {
        $sql = "SELECT COUNT(*) FROM scores WHERE user_id = ?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$user_id]);

        return $stmt->fetchColumn();
    }

    /**
     * Returns best score per user, sorted descending.
     * @param int $limit Max number of users to return. Used for pagination.
     * @param int $offset How many records to skip. Used for pagination.
     * @return Score[] Array of Score objects (with username included).
     */
    public function getLeaderboardTopScores(int $limit, int $offset): array {
        $sql = "
            SELECT s.*
            FROM scores s
            INNER JOIN (
                SELECT user_id, MAX(score) AS max_score
                FROM scores
                GROUP BY user_id
            ) grouped_scores ON s.user_id = grouped_scores.user_id AND s.score = grouped_scores.max_score
            ORDER BY s.score DESC
            LIMIT ?
            OFFSET ?
        ";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$limit, $offset]);

        $out = [];
        while ($row = $stmt->fetch()) {
            $score = new Score($row);
            $out[] = $score;
        }

        return $out;
    }

    /**
     * Helper function returning count of all scores in database
     * @return int How many scores there are in leaderboard
     */
    public function getLeaderboardCount(): int{
        $sql = "
            SELECT COUNT(DISTINCT user_id) as total_scores
            FROM scores
        ";

        $stmt = $this->pdo->prepare($sql);
        $stmt->execute();

        return $stmt->fetchColumn();
    }

    /**
     * Saves a user's score to the database.
     * @param int $user_id The ID of the user.
     * @param Score $score The Score object containing the score value.
     * @return bool True if insertion was successful, false otherwise.
     */
    public function saveUserScore(int $user_id, Score $score): bool {
        $sql = "INSERT INTO scores (user_id, score, date) VALUES (?, ?, ?)";
        $stmt = $this->pdo->prepare($sql);

        //if score date is not set, add default value of actual time
        $date = $score->date ?: date('Y-m-d H:i:s');
        return $stmt->execute([$user_id, $score->score, $date]);
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
    public function updateUserAvatar(int $userId, ?string $avatarPath): bool {
        $sql = "UPDATE users SET avatar_path = ? WHERE id = ?";
        $stmt = $this->pdo->prepare($sql);
        return $stmt->execute([$avatarPath, $userId]);
    }

    /**
     * Updates user's username and email
     * @param string $id if of user we want to change data for
     * @param ?string $new_email user's new email (optional, can be null)
     * @return bool True if update was a success, False otherwise
     */
    public function updateUserData(string $id, string $new_username, ?string $new_email): bool{  
        $sql = "UPDATE users SET username = ?, email = ? WHERE id = ?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$new_username, ($new_email ?: null), $id]);

        if ($stmt->rowCount() > 0)
            return true;
        return false;
    }

    public function updateUserPassword($id, string $new_password): bool{
        $passwordHash = password_hash($new_password, PASSWORD_DEFAULT); //hash password before insertion

        $sql = "UPDATE users SET password = ? WHERE id = ?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$passwordHash, $id]);

        if ($stmt->rowCount() > 0)
            return true;
        return false;
    }
}

?>