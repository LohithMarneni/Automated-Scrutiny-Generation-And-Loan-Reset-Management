<?php
session_start();
require 'db_connect.php'; // Include your database connection file

// Check if the user is logged in
if (!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] !== true) {
    header("Location: login.php");
    exit();
}

// Handle form submission
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Get the SAO, ASAO, OSAO, and Fresh_SAO arrays from the POST request
    $sao = $_POST['sao'];
    $asao = $_POST['asao'];
    $osao = $_POST['osao'];
    $fresh_sao = $_POST['fresh_sao'];

    // Prepare an SQL statement for updating limits
    $stmt = $conn->prepare("UPDATE `limits` SET `sao` = ?, `asao` = ?, `osao` = ?, `fresh_sao` = ? WHERE `sno` = ?");

    // Iterate over each item in the arrays
    foreach ($sao as $sno => $sao_value) {
        $asao_value = $asao[$sno];
        $osao_value = $osao[$sno];
        $fresh_sao_value = $fresh_sao[$sno];
        // Bind the parameters and execute the statement
        $stmt->bind_param("dddii", $sao_value, $asao_value, $osao_value, $fresh_sao_value, $sno);
        $stmt->execute();
    }

    // Close the statement
    $stmt->close();

    // Redirect back to after_login.php
    header("Location: /internship_rf_st/index.php");
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Updating Limits...</title>
</head>
<body>
    <p>Updating limits, please wait...</p>
</body>
</html>
