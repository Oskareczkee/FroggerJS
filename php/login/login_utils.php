<?php

/*
    CONSTANTS:
      $_SESSION["login"] { -> dictionary with login data
        ["error_message"] -> Stores login error messages
        ["loggedin"] -> Bool, whether user is already logged in
        ["session_id"] -> Id of user's session
        ["user_id"] -> Id of user's object in database
        ["user"] -> User object from database
      }

      $user_class -> name of the class representing User
      User must have default constructor that as argument takes dictionary with user data
*/

require_once 'User.php';
require_once dirname(__FILE__).'/../utils/FroggerDB.php';

$user_class = "User";

//Start session if it has not been started yet
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

/**
 * Checks if user is logged in.
 * @return bool True if user is logged in, False otherwise.
 */
function is_logged_in(): bool {
    return isset($_SESSION["login"]["loggedin"]) && $_SESSION["login"]["loggedin"] === true;
}


/**
 * Attempts to log in a user with the given username and password.
 * This version uses a fixed username and password for testing purposes.
 * @return bool True on successful login, false otherwise.
 */
function login(string $username, string $password): bool {
    $db = FroggerDB::getInstance();

    if ($db->checkUserLogin($username, $password)) {
        $user = $db->getUserByUsername($username);
        $_SESSION["login"]["loggedin"] = true;
        $_SESSION["login"]["user_id"] = $user->id;
        
        $_SESSION["login"]["user"] = $user;
        return true;
    } 
    else
        return false;
}

/**
 * Tegisters new user in current database
 * Password is automatically hashed for security
 *
 * @param string $password User's password in plain text. Password will be hashed
 * @return bool True if user was registerd, False otherwise (user with given username already exists)
 */
function register(string $username, string $password): bool{
    $db = FroggerDB::getInstance();
    return $db->createUser($username, $password);
}

/**
 * Attempts to logout user
 * @return bool True on successful logout, false if user was already logged-out
 */
function logout() : bool{
    if(isset($_SESSION["login"]["loggedin"]) && $_SESSION["login"]["loggedin"] === false){
        $_SESSION["login"]["error_message"] = "User is already logged out";
        return false;
    }

    //unset login session data
    $_SESSION["login"]["loggedin"] = false;
    unset($_SESSION["login"]["user"]);
    unset($_SESSION["login"]["user_id"]);

    return true;
}


 /**
 * Returns the logged-in User object.
 * @return User|null User object defined by $user_class if logged in, otherwise null.
 */
function get_user(): ?User {
    if (is_logged_in() && isset($_SESSION["login"]["user"])) {
        return $_SESSION["login"]["user"];
    }
    return null; //user is not logged in
}

/**
 * Checks if user is logged-in. If not throws 404 Not Found Error. Redirect can be set if user needs to be redirected
 * @param string $redirect_url (Optional) redirect after failed check
 */
function require_login(string $redirect_url='') {
    if (!is_logged_in()) {
        $_SESSION['login']['error_message'] = "Login is required!";

        if($redirect_url==='') //if redirect is not set, throw 404 Not Found
            http_response_code(404);

        header("location: " . $redirect_url);
        exit;
    }
}
?>