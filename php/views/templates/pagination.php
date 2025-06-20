<?php
// Template Variables
// $current_page
// $total_pages
// $base_url -> base url for pagination without ?page parameter set
?>
<?php if ($total_pages > 1): ?>
    <nav aria-label="Pagination">
    <ul class="pagination justify-content-center">

        <!-- Previous -->
        <?php if ($current_page > 1): ?>
        <li class="page-item">
            <a class="page-link" href="<?php echo $base_url . "?page=" . ($current_page - 1); ?>" aria-label="Previous">
            &laquo;
            </a>
        </li>
        <?php else: ?>
        <li class="page-item disabled"><span class="page-link">&laquo;</span></li>
        <?php endif; ?>

        <!-- First -->
        <li class="page-item <?php echo $current_page == 1 ? 'active' : ''; ?>">
        <a class="page-link" href="<?php echo $base_url . "?page=1"; ?>">1</a>
        </li>

        <!-- "..." current page is away from beginning-->
        <?php if ($current_page > 4): ?>
        <li class="page-item disabled"><span class="page-link">...</span></li>
        <?php endif; ?>

        <!-- Middle pages +/- 2 from current page -->
        <?php
        for ($i = max(2, $current_page - 2); $i <= min($total_pages - 1, $current_page + 2); $i++):
        ?>
        <li class="page-item <?php echo $i == $current_page ? 'active' : ''; ?>">
            <a class="page-link" href="<?php echo $base_url . "?page=" . $i; ?>"><?php echo $i; ?></a>
        </li>
        <?php endfor; ?>

        <!-- "..." before last page -->
        <?php if ($current_page < $total_pages - 3): ?>
        <li class="page-item disabled"><span class="page-link">...</span></li>
        <?php endif; ?>

        <!-- Last page -->
        <?php if ($total_pages > 1): ?>
        <li class="page-item <?php echo $current_page == $total_pages ? 'active' : ''; ?>">
            <a class="page-link" href="<?php echo $base_url . "?page=" . $total_pages; ?>"><?php echo $total_pages; ?></a>
        </li>
        <?php endif; ?>

        <!-- Next -->
        <?php if ($current_page < $total_pages): ?>
        <li class="page-item">
            <a class="page-link" href="<?php echo $base_url . "?page=" . ($current_page + 1); ?>" aria-label="Next">
            &raquo;
            </a>
        </li>
        <?php else: ?>
        <li class="page-item disabled"><span class="page-link">&raquo;</span></li>
        <?php endif; ?>

    </ul>
    </nav>
<?php endif; ?>