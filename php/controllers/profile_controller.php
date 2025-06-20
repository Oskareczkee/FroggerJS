<?php

require_once 'ControllerBase.php';
require_once dirname(__FILE__) . '/../login/login_utils.php';
require_once dirname(__FILE__) . '/../login/User.php';
require_once dirname(__FILE__) . '/../utils/FroggerDB.php';

/**
 * this controller was written to check whether i am able to write controllers from scratch. Yes i am
 */

class UserProfileController extends ControllerBase {
    private FroggerDB $db;
    protected string $view_path ="FroggerJS/php/views/profile.php";
    protected array $requirements = [['require_login', ['index.html']]];

    public function __construct() {
        $this->db = FroggerDB::getInstance();

        //init viewdata
        $this->view_data["success_message"] = '';
        $this->view_data["error_message"] = '';

        if (isset($_SESSION['profile_success_message'])) {
            $this->view_data["success_message"] = $_SESSION['profile_success_message'];
            unset($_SESSION['profile_success_message']);
        }
        if (isset($_SESSION['profile_error_message'])) {
            $this->view_data["error_message"] = $_SESSION['profile_error_message'];
            unset($_SESSION['profile_error_message']);
        }
    }

    #[Override]
    protected function post(): void {

        if(!isset($_POST["action"]))
            return;

        switch($_POST["action"]){
            case "update_profile":
                $this->update_profile();
                break;
            case "update_password":
                $this->update_password();
                break;
            case "update_avatar":
                $this->update_avatar();
                break;
            case "clear_avatar":
                $this->clear_avatar();
                break;
        }
    }

    #[Override]
    protected function get(): void { }

    private function update_profile(): void {
        $new_username = trim($_POST['username']);
        $new_email = trim($_POST['email']);
        $current_user = $_SESSION["login"]["user"];

        if (empty($new_username)) {
            $this->view_data["error_message"] = "Username cannot be empty"; 
            return;
        } else if (strlen($new_username) > 255) {
            $this->view_data["error_message"] = "Username is too long"; 
            return;
        } else if (!empty($new_email) && !filter_var($new_email, FILTER_VALIDATE_EMAIL)) {
            $this->view_data["error_message"] = "Invalid e-mail format"; 
            return;
        } else if (strlen($new_email) > 255) {
            $this->view_data["error_message"] = "E-mail is too long"; 
            return;
        }

        try {
            $existing_user_by_username = $this->db->getUserByUsername($new_username);
            if ($existing_user_by_username && $existing_user_by_username->id !== $current_user->id) {
                $this->view_data["error_message"] = "Username '{$new_username}' already exists"; 
                return;
            }

            if (!empty($new_email)) {
                $user_by_email = $this->db->getUserByEmail($new_email);
                if ($user_by_email)
                    $this->view_data["error_message"] = "E-mail '{$new_email}' is used by another user"; return;
            }

            if(empty($new_email))
                $new_email = null;

            if ($this->db->updateUserData($current_user->id, $new_username, $new_email)) {
                $this->view_data["success_message"] = "User data has been successfully updated";
                $_SESSION["login"]["user"] = $this->db->getUserById($current_user->id); //refresh session user
            } 
            else
                $this->view_data["success_message"] = "There was an error updating data. Please check if you changed anything";

        } catch (PDOException $e) {
            error_log("Profile update DB error: " . $e->getMessage());
            $this->view_data["error_message"] = "There was an unknown database error while updating user data";
        }
    }

    private function update_password(): void {
        $current_password = $_POST['current_password'];
        $new_password = $_POST['new_password'];
        $confirm_new_password = $_POST['confirm_new_password'];
        $current_user = $_SESSION["login"]["user"];

        //validation
        if (empty($current_password)) {
            $this->view_data["error_message"] = "Current password cannot be empty"; 
            return;
        }

        if (empty($new_password)) {
            $this->view_data["error_message"] = "New password cannot be empty"; 
            return;
        }

        if (empty($confirm_new_password)) {
            $this->view_data["error_message"] = "Please confirm your new password"; 
            return;
        }

        // Check password lengths
        if (strlen($new_password) < 8) {
            $this->view_data["error_message"] = "New password must be at least 8 characters long"; 
            return;
        }

        // Check if password match
        if ($new_password !== $confirm_new_password) {
            $this->view_data["error_message"] = "New passwords do not match"; 
            return;
        }

        try {
            if (!$this->db->checkUserLogin($current_user->username, $current_password)) {
                $this->view_data["error_message"] = "Current password is incorrect"; 
                return;
            }

            //Update password in db
            if ($this->db->updateUserPassword($current_user->id, $new_password))
                $this->view_data["success_message"] = "Your password has been successfully updated";
            else
                $this->view_data["error_message"] = "There was an error updating your password. Please try again later.";

        } catch (PDOException $e) {
            error_log("Password update DB error: " . $e->getMessage());
            $this->view_data["error_message"] = "There was an unknown database error while updating password";
        }
    }

    private function update_avatar(): void {
        $current_user = $_SESSION["login"]["user"];

        if (!isset($_FILES['avatar_file']) || $_FILES['avatar_file']['error'] === UPLOAD_ERR_NO_FILE) {
            $this->view_data["error_message"] = "No file uploaded";
            return;
        }

        $file = $_FILES['avatar_file'];

        if ($file['error'] !== UPLOAD_ERR_OK) {
            $this->view_data["error_message"] = "File upload error. Code: " . $file['error'];
            return;
        }

        $finfo = new finfo(FILEINFO_MIME_TYPE);
        $mime_type = $finfo->file($file['tmp_name']);
        $allowed_types = ['image/jpeg' => 'jpg', 'image/png' => 'png', 'image/gif' => 'gif'];

        if (!array_key_exists($mime_type, $allowed_types)) {
            $this->view_data["error_message"] = "Only JPG, PNG, or GIF files are allowed";
            return;
        }

        $extension = $allowed_types[$mime_type];
        $file_name = 'avatar_' . $current_user->id . '.' . $extension;
        $upload_dir = __DIR__ . '/../../public/avatars/';
        $upload_path = $upload_dir . $file_name;

        //avatar directory does not exist, create it
        if (!is_dir($upload_dir)) {
            if (!mkdir($upload_dir, 0755, true)) {
                $this->view_data["error_message"] = "Failed to create avatar upload directory";
                return;
            }
        }

        //move file
        if (!move_uploaded_file($file['tmp_name'], $upload_path)) {
            $this->view_data["error_message"] = "Failed to move uploaded file";
            return;
        }

        //update in db
        try {
            $avatar_url = 'public/avatars/' . $file_name;
            if ($this->db->updateUserAvatar($current_user->id, $avatar_url)) {
                $_SESSION["login"]["user"] = $this->db->getUserById($current_user->id); //update user in session
                $this->view_data["success_message"] = "Avatar updated successfully";
            } else {
                $this->view_data["error_message"] = "Failed to update avatar in database";
            }
        } catch (PDOException $e) {
            error_log("Avatar update DB error: " . $e->getMessage());
            $this->view_data["error_message"] = "There was an unknown database error while updating avatar";
        }
    }

    private function clear_avatar(): void{
        $current_user = $_SESSION["login"]["user"];

        if ($this->db->updateUserAvatar($current_user->id, null)){
            $_SESSION["login"]["user"] = $this->db->getUserById($current_user->id); //update user in session
            $this->view_data["success_message"] = "Avatar was cleared successfully";
        }
        else 
            $this->view_data["error_message"] = "Failed to clear avatar";

    }
}