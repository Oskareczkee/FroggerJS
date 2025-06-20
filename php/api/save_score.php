<?php
// saveScore.php
require_once '../../php/models/Score.php';
require_once '../../php/utils/FroggerDB.php';
require_once '../login/login_utils.php';

require_login();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    if(!isset($_POST['score'])){
        echo json_encode(['status' => 'error', 'message' => 'score is not set']);
        exit;
    }
    
    $score = $_POST['score'];
    $game_date = date('Y-m-d H:i:s');
    $user_id = $_SESSION["login"]["user"]->id;

    $Score_obj = new Score([
        "score" => $score,
        "date" => $game_date, 
    ]);
    
    // Stwórz instancję klasy Score
    $db = FroggerDB::getInstance();
    $db->saveUserScore($user_id, $Score_obj);
    echo json_encode(['status' => 'success']); //send status, frontend is expecting it
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
}
?>