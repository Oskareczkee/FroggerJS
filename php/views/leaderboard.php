<?php
$base_url_prefix = '../../';
require_once $base_url_prefix . 'php/login/login_utils.php';
require_once $base_url_prefix . 'php/models/Score.php';

require_login();

$db = FroggerDB::getInstance();

//pagination template variables
$current_page = isset($_GET['page']) ? (int)$_GET['page'] : 1; //first page by default
$base_url = "leaderboard.php";

$limit = 20; //scores per page
$offset = ($current_page - 1) * $limit; //calculate offset

$total_scores = $db->getLeaderboardCount();
$leaderboard_scores = $db->getLeaderboardTopScores($limit, $offset);

$total_pages = ceil($total_scores / $limit); //for pagination template

// TEMPLATE -> HEADER
require_once $base_url_prefix . 'php/views/templates/header.php';
?>

<div class="container mt-5">
    <h2 class="text-center mb-4">Leaderboard</h2>

    <?php if (count($leaderboard_scores) === 0): ?>
        <p class="text-center">No scores available yet!</p>
    <?php else: ?>
        <table class="table table-striped table-hover">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Username</th>
                    <th>Score</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($leaderboard_scores as $index => $score): ?>
                    <?php $username = $db->getUserById($score->user_id)->username ?>

                    <tr>
                        <td><?php echo $index + 1 + ($current_page - 1) * $limit; ?></td>
                        <td><?php echo htmlspecialchars($username); ?></td>
                        <td><?php echo htmlspecialchars($score->score); ?></td>
                        <td><?php echo htmlspecialchars($score->date); ?></td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>

        <?php require_once $base_url_prefix."/php/views/templates/pagination.php" ?>

    <?php endif; ?>
</div>

<?php
// TEMPLATE -> FOOTER
require_once $base_url_prefix . 'php/views/templates/footer.php';
?>
