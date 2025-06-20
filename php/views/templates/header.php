<?php

if (!isset($page_title)) {
    $page_title = "My App";
}

if (!isset($base_url_prefix)) {
    $base_url_prefix = '../../';
}
require_once $base_url_prefix . 'php/login/login_utils.php';

$is_logged_in = is_logged_in();
$user_avatar = $_SESSION["login"]["user"]->avatar_path ?? 'public/avatars/no_avatar.jpg';
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo htmlspecialchars($page_title); ?></title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-4Q6Gf2aSP4eDXB8Miphtr37CMZZQ5oXLH2yaXMJ2w8e2ZtHTl7GptT4jmndRuHDT" crossorigin="anonymous">
</head>

<body class="d-flex flex-column align-items-center bg-light min-vh-100">

 <nav class="navbar navbar-expand-lg navbar-dark bg-dark w-100 py-3 px-4">
    <div class="container-fluid">
        <a class="navbar-brand text-white" href="<?php echo $base_url_prefix; ?>index.php">Frogger</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto d-flex flex-column flex-lg-row align-items-stretch align-items-lg-center gap-2 mt-3 mt-lg-0">
                <?php if ($is_logged_in): ?>
                    <li class="nav-item d-flex align-items-center justify-content-lg-center">
                        <a class="nav-link p-0 d-flex align-items-center"
                            href="<?php echo $base_url_prefix; ?>php/views/user/profile.php">
                            <img src="<?php echo htmlspecialchars($base_url_prefix.$user_avatar); ?>" alt="Avatar"
                                class="rounded-circle" style="width: 32px; height: 32px; object-fit: cover;">
                        </a>
                    </li>
                    <li class="nav-item d-flex align-items-center justify-content-lg-center">
                        <a class="btn btn-outline-light btn-sm px-2 py-1"
                            href="<?php echo $base_url_prefix; ?>php/views/user/scores.php">
                            My Scores
                        </a>
                    </li>
                    <li class="nav-item d-flex align-items-center justify-content-lg-center">
                        <a class="btn btn-outline-info btn-sm px-2 py-1"
                            href="<?php echo $base_url_prefix; ?>php/views/leaderboard.php">
                            Leaderboard
                        </a>
                    </li>
                    <li class="nav-item d-flex align-items-center justify-content-lg-center">
                        <a class="btn btn-danger btn-sm px-2 py-1"
                            href="<?php echo $base_url_prefix; ?>php/views/login/logout.php?redirect=<?php echo urlencode('index.php'); ?>">
                            Logout
                        </a>
                    </li>
                <?php else: ?>
                    <li class="nav-item d-flex align-items-center justify-content-lg-center">
                        <a class="btn btn-primary btn-sm py-2 px-3"
                            href="<?php echo $base_url_prefix; ?>php/views/login/login.php">Login</a>
                    </li>
                    <li class="nav-item d-flex align-items-center justify-content-lg-center">
                        <a class="btn btn-success btn-sm py-2 px-3"
                            href="<?php echo $base_url_prefix; ?>php/views/login/register.php">Register</a>
                    </li>
                <?php endif; ?>
            </ul>
        </div>
    </div>
</nav>
