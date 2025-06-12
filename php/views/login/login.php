<?php
//template vars
$page_title = "Frogger - Login";
$base_url_prefix = '../../../';

require_once $base_url_prefix.'php/login/login_utils.php';

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



if (isset($_SESSION['login']['error_message'])) {
    $login_err = $_SESSION['login']['error_message'];
    unset($_SESSION['login']['error_message']);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    if (empty(trim($_POST["username"])))
        $username_err = "Please insert username";
     else
        $username = trim($_POST["username"]);

    if (empty(trim($_POST["password"])))
        $password_err = "Please insert password";
    else
        $password = trim($_POST["password"]);
    

    if (empty($username_err) && empty($password_err)) {
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
                        <h2 class="text-center mb-4">Logowanie</h2>
                        <p class="text-center text-muted mb-4">Wypełnij swoje dane, aby się zalogować.</p>

                        <?php
                        if (!empty($login_err)) {
                            echo '<div class="alert alert-danger mb-3">' . $login_err . '</div>';
                        }
                        ?>

                        <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">
                            <div class="form-group">
                                <label for="username">Nazwa użytkownika</label>
                                <input type="text" name="username" id="username" class="form-control <?php echo (!empty($username_err)) ? 'is-invalid' : ''; ?>" value="<?php echo $username; ?>">
                                <span class="invalid-feedback"><?php echo $username_err; ?></span>
                            </div>
                            <div class="form-group">
                                <label for="password">Hasło</label>
                                <input type="password" name="password" id="password" class="form-control <?php echo (!empty($password_err)) ? 'is-invalid' : ''; ?>">
                                <span class="invalid-feedback"><?php echo $password_err; ?></span>
                            </div>
                            <div class="form-group text-center mt-4">
                                <input type="submit" class="btn btn-primary btn-lg btn-block" value="Zaloguj się">
                            </div>
                            <p class="text-center mt-3">Nie masz konta? <a href="register.php">Zarejestruj się</a>.</p>
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