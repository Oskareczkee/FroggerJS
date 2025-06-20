<?php
//template vars
$page_title = "Frogger - Profile";
$base_url_prefix = '../../../';
require_once $base_url_prefix . 'php/controllers/profile_controller.php';

$controller = new UserProfileController();
$controller->dispatch();

$user_in_session = $_SESSION["login"]["user"];
extract($controller->get_view_data());

//TEMPLATE -> HEADER
require_once $base_url_prefix . 'php/views/templates/header.php';
?>

<div class="container my-5">
    <div class="card shadow border-0">
        <div class="card-body p-4">
            <h1 class="card-title text-center mb-4"><?php echo htmlspecialchars($user_in_session->username); ?> profile
            </h1>

            <?php if ($success_message): ?>
                <div class="alert alert-success alert-dismissible fade show" role="alert">
                    <?php echo htmlspecialchars($success_message); ?>
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            <?php endif; ?>
            <?php if ($error_message): ?>
                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                    <?php echo htmlspecialchars($error_message); ?>
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            <?php endif; ?>

            <!-- Avatar Section -->
            <div class="mb-5">
                <div class="text-center mb-3">
                    <img src="<?php echo htmlspecialchars($base_url_prefix.($user_in_session->avatar_path?? "public/avatars/no_avatar.jpg")); ?>"  alt="Your Avatar"
                        class="rounded-circle border" style="width: 150px; height: 150px; object-fit: cover;">
                </div>
                <form action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>" method="POST" enctype="multipart/form-data">
                    <div class="mb-3">
                        <label for="avatar_file" class="form-label">Upload avatar</label>
                        <input class="form-control" type="file" id="avatar_file" name="avatar_file" accept="image/*">
                    </div>
                    <div class="d-flex justify-content-end">
                        <button type="submit" name="action" value="clear_avatar" class="btn btn-danger me-2">Clear avatar</button>
                        <button type="submit" name="action" value="update_avatar" class="btn btn-success">Change avatar</button>
                    </div>
                </form>
            </div>

            <!-- Profile Data Form -->
            <div class="mb-5">
                <h2 class="h5 mb-3">Change profile data</h2>
                <form action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>" method="POST">
                    <div class="mb-3">
                        <label for="username" class="form-label">Username</label>
                        <input type="text" class="form-control" id="username" name="username"
                            value="<?php echo htmlspecialchars($user_in_session->username); ?>" required>
                    </div>
                    <div class="mb-3">
                        <label for="email" class="form-label">Email</label>
                        <input type="email" class="form-control" id="email" name="email"
                            value="<?php echo htmlspecialchars($user_in_session->email ?? ''); ?>">
                    </div>

                    <input type="hidden" name="action" value="update_profile">
                    <div class="d-flex justify-content-end">
                        <button type="submit" class="btn btn-success">Save</button>
                    </div>
                </form>
            </div>

            <!-- Password Change Form -->
            <div>
                <h2 class="h5 mb-3">Change password</h2>
                <form action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>" method="POST">
                    <div class="mb-3">
                        <label for="current_password" class="form-label">Current password</label>
                        <input type="password" class="form-control" id="current_password" name="current_password"
                            required>
                    </div>
                    <div class="mb-3">
                        <label for="new_password" class="form-label">New password</label>
                        <input type="password" class="form-control" id="new_password" name="new_password" required>
                    </div>
                    <div class="mb-3">
                        <label for="confirm_new_password" class="form-label">Confirm new password</label>
                        <input type="password" class="form-control" id="confirm_new_password"
                            name="confirm_new_password" required>
                    </div>
                    <input type="hidden" name="action" value="update_password">
                    <div class="d-flex justify-content-end">
                        <button type="submit" class="btn btn-success">Change</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<?php
//TEMPLATE -> FOOTER
require_once $base_url_prefix . 'php/views/templates/footer.php';
?>