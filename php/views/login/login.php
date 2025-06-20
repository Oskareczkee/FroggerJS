<?php
//template vars
$page_title = "Frogger - Login";
$base_url_prefix = '../../../';

require_once $base_url_prefix.'php/login/login_utils.php';
require_once $base_url_prefix.'php/config/config.php';

if (is_logged_in()) {
    header("Location: ".$base_url_prefix.'index.html');
    exit;
}

$username = "";
$password = "";

//show errors in labels
$username_err = "";
$password_err = "";

//general login error
$login_err = "";
$redirect_url = $_GET["redirect"] ?? ""; //login can accept additional redirect parameter, which will redirect user to the previous page


$captcha_verified = false;
$captcha_secret = CAPTCHA_SECRET;
$captcha_response = $_POST['g-recaptcha-response'] ?? '';


if (isset($_SESSION['login']['error_message'])) {
    $login_err = $_SESSION['login']['error_message'];
    unset($_SESSION['login']['error_message']);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    if (empty(trim($_POST["username"])))
        $username_err = "Please insert username";
     else
        $username = trim($_POST["username"]);

    if(!empty($captcha_response)){
        $verify_response = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=" . urlencode($captcha_secret) . "&response=" . urlencode($captcha_response));
        $captcha_data = json_decode($verify_response);
        if($captcha_data->success)
            $captcha_verified = true;
        else
            $login_err="CAPTCHA verification failed. Please try again";
    }
    else
        $login_err = "Please complete CAPTCHA";


    if (empty(trim($_POST["password"])))
        $password_err = "Please insert password";
    else
        $password = trim($_POST["password"]);
    

    if (empty($username_err) && empty($password_err) && $captcha_verified) {
        if (login($username, $password)){
            header("Location: ".(!empty($redirect_url) ? $redirect_url : $base_url_prefix."index.php"));
            exit;
        } 
        else
            $login_err = "Wrong username or password";
    }
}


//TEMPLATE -> HEADER
require_once $base_url_prefix.'php/views/templates/header.php';
?>

    <div class="container py-5">
        <div class="row justify-content-center">
            <div class="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4">
                <div class="card shadow-lg rounded-lg border-0">
                    <div class="card-body p-4">
                        <h2 class="text-center mb-4">Login</h2>
                        <p class="text-center text-muted mb-4">Fiil in your details to log in</p>

                        <?php
                        if (!empty($login_err)) {
                            echo '<div class="alert alert-danger mb-3">' . $login_err . '</div>';
                        }
                        ?>

                        <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">
                            <div class="form-group">
                                <label for="username">Username</label>
                                <input type="text" name="username" id="username" class="form-control <?php echo (!empty($username_err)) ? 'is-invalid' : ''; ?>" value="<?php echo $username; ?>">
                                <span class="invalid-feedback"><?php echo $username_err; ?></span>
                            </div>
                            <div class="form-group">
                                <label for="password">Password</label>
                                <input type="password" name="password" id="password" class="form-control <?php echo (!empty($password_err)) ? 'is-invalid' : ''; ?>">
                                <span class="invalid-feedback"><?php echo $password_err; ?></span>
                            </div>

                            <?php require $base_url_prefix.'php/views/templates/captcha.php'; ?> <!--captcha template-->

                            <div class="form-group text-center mt-4">
                                <input type="submit" class="btn btn-primary btn-lg btn-block" value="Login">
                            </div>
                            <p class="text-center mt-3">No account? <a href="register.php">Register</a>.</p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

<?php
    //TEMPLATE -> FOOTER
    require_once $base_url_prefix.'php/views/templates/footer.php' 
?>