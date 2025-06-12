<?php 
    $base_url_prefix = '../../../';

    require_once $base_url_prefix.'php/login/login_utils.php';

    $redirect = $_GET["redirect"] ?? "index.php";

    logout();

    header("Location: ".$base_url_prefix.$redirect);
    exit;
?>