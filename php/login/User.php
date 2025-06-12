<?php 
    /**
     * Class representing a logged-in user.
     */
    class User {
        public int $id;
        public string $username;
        public ?string $email; //email can be null (not set)
        public ?string $avatar_path; //avatar can be null (not set)
         
        //no need to store password hash, it would be dangerous
        
        /**
         * Constructor for the User class.
         * @param array $user_data Dictionary containing user properties.
         */
        public function __construct(array $user_data) {
            $this->id = $user_data['id'] ?? -1;
            $this->username = $user_data['username'] ?? 'Unknown';
            $this->email = $user_data['email'] ?? null;
            $this->avatarPath = $user_data['avatar_path'] ?? null;
        }
    }
?>