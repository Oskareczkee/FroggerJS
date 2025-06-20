<?php
// template vars
$page_title = "Frogger - Rejestracja";
$base_url_prefix = '../../../';

require_once $base_url_prefix . 'php/login/login_utils.php';
require_once $base_url_prefix.'php/config/config.php';

$redirect_url = 'index.html'; //base redirect

//if referer is set, redirect to him
if (isset($_SERVER['HTTP_REFERER']) && !empty($_SERVER['HTTP_REFERER'])) {
    $redirect_url = $_SERVER['HTTP_REFERER'];
}

//If user is already logged in somehow, redirect him to the referer
if (is_logged_in()) {
    header("Location: " .$redirect_url);
    exit;
}

//form and errors
$username = "";
$password = "";
$confirm_password = "";
$username_err = "";
$password_err = "";
$confirm_password_err = "";
$registration_err = "";
$registration_success = "";

$captcha_verified = false;
$captcha_secret = CAPTCHA_SECRET;
$captcha_response = $_POST['g-recaptcha-response'] ?? '';


if ($_SERVER["REQUEST_METHOD"] == "POST") {

    //Validate username
    if (empty(trim($_POST["username"]))) {
        $username_err = "Please insert username.";
    } elseif (!preg_match('/^[a-zA-Z0-9_]+$/', trim($_POST["username"]))) {
        $username_err = "Username can only consist of letters, digits and underscore";
    } elseif (strlen(trim($_POST["username"])) < 3 || strlen(trim($_POST["username"])) > 50) {
        $username_err = "Username must consist of 3 up to 50 characters";
    } else {
        $username = trim($_POST["username"]);
    }
    

    //validate captcha
    if(!empty($captcha_response)){
        $verify_response = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=" . urlencode($captcha_secret) . "&response=" . urlencode($captcha_response));
        $captcha_data = json_decode($verify_response);
        if($captcha_data->success)
            $captcha_verified = true;
        else
            $registration_err="CAPTCHA verification failed. Please try again";
    }
    else
        $registration_err = "Please complete CAPTCHA";

    //Validate password
    if (empty(trim($_POST["password"]))) {
        $password_err = "Please insert password";
    } elseif (strlen(trim($_POST["password"])) < 8) {
        $password_err = "Password must have at least 8 characters";
    } else {
        $password = trim($_POST["password"]);
    }

    //Validate password confirmation
    if (empty(trim($_POST["confirm_password"]))) {
        $confirm_password_err = "Please confirm password";
    } else {
        $confirm_password = trim($_POST["confirm_password"]);
        if (empty($password_err) && ($password != $confirm_password)) {
            $confirm_password_err = "Passwords do not match";
        }
    }

    if (empty($username_err) && empty($password_err) && empty($confirm_password_err)) {
        if (register($username, $password)) {
            $registration_success = "Registration was successfull. Now you can log in";
            $username = "";
            $password = "";
            $confirm_password = "";
        } else {
            $registration_err = "There was an error during registration. Try later";
        }
    }
}

//TEMPLATE -> ADD HEADER
require_once $base_url_prefix . 'php/views/templates/header.php';
?>

<div class="container py-5">
    <div class="row justify-content-center">
        <div class="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4">
            <div class="card shadow-lg rounded-lg border-0">
                <div class="card-body p-4">
                    <h2 class="text-center mb-4">Registration</h2>
                    <p class="text-center text-muted mb-4">Fill in your details to create an account</p>

                    <?php
                    //Registration errors
                    if (!empty($registration_err)) {
                        echo '<div class="alert alert-danger mb-3">' . $registration_err . '</div>';
                    }
                    //Registration success
                    if (!empty($registration_success)) {
                        echo '<div class="alert alert-success mb-3">' . $registration_success . '</div>';
                    }
                    ?>

                    <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">
                        <div class="form-group mb-3">
                            <label for="username">Username</label>
                            <input type="text" name="username" id="username" class="form-control <?php echo (!empty($username_err)) ? 'is-invalid' : ''; ?>" value="<?php echo $username; ?>">
                            <span class="invalid-feedback"><?php echo $username_err; ?></span>
                        </div>
                        <div class="form-group mb-3">
                            <label for="password">Password</label>
                            <input type="password" name="password" id="password" class="form-control <?php echo (!empty($password_err)) ? 'is-invalid' : ''; ?>">
                            <span class="invalid-feedback"><?php echo $password_err; ?></span>
                        </div>
                        <div class="form-group mb-3">
                            <label for="confirm_password">Confirm Password</label>
                            <input type="password" name="confirm_password" id="confirm_password" class="form-control <?php echo (!empty($confirm_password_err)) ? 'is-invalid' : ''; ?>">
                            <span class="invalid-feedback"><?php echo $confirm_password_err; ?></span>
                        </div>
                        <?php require $base_url_prefix.'php/views/templates/captcha.php'; ?> <!--captcha template-->
                        <div class="form-group text-center mt-4">
                            <input type="submit" class="btn btn-primary btn-lg btn-block" value="Register">
                        </div>
                        <p class="text-center mt-3">Have an account? <a href="login.php">Login</a>.</p>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

<?php
    //TEMPLATE -> ADD FOOTER
    require_once $base_url_prefix . 'php/views/templates/footer.php' 
?>