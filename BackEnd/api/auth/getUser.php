<?php
require "session.php";

header('Content-Type: application/json');
echo json_encode($_SESSION);