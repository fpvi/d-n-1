<?php
// Include tất cả file trong Models
foreach (glob( 'Models/*.php') as $filename) {
    include_once $filename;
}

// Include tất cả file trong Controllers
foreach (glob( 'Controllers/*.php') as $filename) {
    include_once $filename;
}