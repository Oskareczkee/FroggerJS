<?php 
    define('PROJECT_ROOT', __DIR__.'../..');
    define('DB_HOST', 'mysql');
    define('DB_USER', 'admin');
    define('DB_PASS', 'sluchajszczyluzafajdany');
    define('DB_CHARSET', 'utf8mb4');
    define('DB_NAME', 'froggerdb');

    #local
    #define('CAPTCHA_SECRET', '6Le502IrAAAAAMxqjWe-cAMTFvpoPwn6ycP3aZfM');
    #define('CAPTCHA_PUBLIC', '6Le502IrAAAAAFnUrD5A4ZvloKE3W5Z4GotA1idz');

    #prod
    define('CAPTCHA_SECRET', '6Lea_mcrAAAAAFn8pL6Xf9M72zYbL39S6egBDHAS');
    define('CAPTCHA_PUBLIC', '6Lea_mcrAAAAALuOYn5fpu08DU0MkxXGqScURNR0');
?>