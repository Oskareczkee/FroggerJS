<?php

if (!isset($page_title)) {
    $page_title = "My App";
}

if (!isset($base_url_prefix)) {
    $base_url_prefix = '../../'; 
}
require_once $base_url_prefix.'php/login/login_utils.php';

$is_logged_in = is_logged_in();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo htmlspecialchars($page_title); ?></title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
</head>
<body class="d-flex flex-column align-items-center bg-light min-vh-100">

    <nav class="navbar navbar-expand-lg navbar-light bg-dark w-100 py-3 px-4">
        <div class="container-fluid">
            <a class="navbar-brand text-white" href="<?php echo $base_url_prefix; ?>index.php">Frogger</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ml-auto">
                    <?php if ($is_logged_in): ?>
                        <li class="nav-item">
                            <a class="btn btn-danger py-2 px-3" 
                               href="<?php echo $base_url_prefix; ?>php/views/login/logout.php?redirect=<?php echo urlencode('index.php'); ?>">
                               Wyloguj
                            </a>
                        </li>
                    <?php else: ?>
                        <li class="nav-item mr-3">
                            <a class="btn btn-primary py-2 px-3" href="<?php echo $base_url_prefix; ?>php/views/login/login.php">Login</a>
                        </li>
                        <li class="nav-item">
                            <a class="btn btn-success py-2 px-3" href="<?php echo $base_url_prefix; ?>php/views/login/register.php">Rejestracja</a>
                        </li>
                    <?php endif; ?>
                </ul>
            </div>
        </div>
    </nav>