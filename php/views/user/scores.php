<?php
$base_url_prefix = '../../../';
require_once $base_url_prefix.'php/login/login_utils.php';
require_once $base_url_prefix.'php/models/Score.php';

require_login();

//pagination template variables
$current_page = isset($_GET['page']) ? (int)$_GET['page'] : 1; //first page by default
$base_url = "leaderboard.php";

$limit = 20; //scores per page
$offset = ($current_page - 1) * $limit; //calculate offset

$user = get_user();
$db = FroggerDB::getInstance();
$scores = $db->getUserScores($user->id,$offset, $limit);

$total_scores = $db->getUserScoresCount($user->id);
$total_pages = ceil($total_scores / $limit); //for pagination template

//TEMPLATE -> HEADER
require_once $base_url_prefix . 'php/views/templates/header.php';
?>

<div class="container mt-5">
    <h2 class="text-center mb-4">Your Latest Scores</h2>

    <?php if (count($scores) === 0): ?>
        <p class="text-center">You haven't played yet. Get started!</p>
    <?php else: ?>
        <table class="table table-striped table-hover">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Score</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($scores as $index => $score): ?>
                    <tr>
                        <td><?php echo $index + 1; ?></td>
                        <td><?php echo htmlspecialchars($score->score); ?></td>
                        <td><?php echo htmlspecialchars($score->date); ?>s</td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>

        <?php require_once $base_url_prefix."php/views/templates/pagination.php" ?>
    <?php endif; ?>
</div>

<?php
//TEMPLATE -> FOOTER
require_once $base_url_prefix . 'php/views/templates/footer.php';
?>