<?php
session_start();
include 'db_connect.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Get the current date
    $currentDate = date('Y-m-d');

    // Check if an entry for today's date exists
    $check_sql = "SELECT * FROM roi WHERE DATE(tstamp) = '$currentDate'";
    $check_result = mysqli_query($conn, $check_sql);
    $exists_today = mysqli_num_rows($check_result) > 0;

    // Fetch the most recent values regardless of today's date
    $fetch_sql = "SELECT * FROM roi ORDER BY tstamp DESC LIMIT 1";
    $fetch_result = mysqli_query($conn, $fetch_sql);
    $row = mysqli_fetch_assoc($fetch_result);

    // Initialize ROI values
    $stoFixedRate = isset($row['sto_fixed']) ? floatval($row['sto_fixed']) : 0.00;
    $asaoFixedRate = isset($row['asao_fixed']) ? floatval($row['asao_fixed']) : 0.00;
    $stoFloatingRate = isset($row['sto_floating']) ? floatval($row['sto_floating']) : 0.00;
    $asaoFloatingRate = isset($row['asao_floating']) ? floatval($row['asao_floating']) : 0.00;

    // Update or insert the new rates
    if (isset($_POST['sto-fixed-rate'])) {
        $stoFixedRate = floatval($_POST['sto-fixed-rate']);
    }
    if (isset($_POST['asao-fixed-rate'])) {
        $asaoFixedRate = floatval($_POST['asao-fixed-rate']);
    }
    if (isset($_POST['sto-floating-rate'])) {
        $stoFloatingRate = floatval($_POST['sto-floating-rate']);
    }
    if (isset($_POST['asao-floating-rate'])) {
        $asaoFloatingRate = floatval($_POST['asao-floating-rate']);
    }

    if ($exists_today) {
        $sql = "UPDATE roi SET sto_fixed = $stoFixedRate, asao_fixed = $asaoFixedRate, sto_floating = $stoFloatingRate, asao_floating = $asaoFloatingRate WHERE DATE(tstamp) = '$currentDate'";
    } else {
        $sql = "INSERT INTO roi (sto_fixed, asao_fixed, sto_floating, asao_floating, tstamp) VALUES ($stoFixedRate, $asaoFixedRate, $stoFloatingRate, $asaoFloatingRate, NOW())";
    }

    if (mysqli_query($conn, $sql)) {
        echo "ROI updated successfully.";
    } else {
        echo "Error updating record: " . mysqli_error($conn);
    }

    // Redirect to the page after processing
    header("Location: /internship_rf_st/index.php");
    exit();
}
?>
