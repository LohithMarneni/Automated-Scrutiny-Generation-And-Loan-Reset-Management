<?php
include 'db_connect.php';

// Set timezone to Asia/Kolkata (India Standard Time)
date_default_timezone_set('Asia/Kolkata');

$district = isset($_GET['district']) ? $_GET['district'] : '';
$account_no = isset($_GET['account_no']) ? $_GET['account_no'] : '';
$new_roi = isset($_GET['new_roi']) ? $_GET['new_roi'] : '';

if ($district && $account_no && $new_roi) {
    // Use prepared statements to prevent SQL injection
    $stmt = $conn->prepare("UPDATE `reset_date` SET `latest_roi` = ?, `tstamp` = ? WHERE `dccb_name` = ? AND `account_no` = ? AND `roi_type` = 'Floating'");
    
    // Get current timestamp in IST
    $tstamp = date('Y-m-d H:i:s'); // Format like "2024-07-11 21:22:00"
    
    // Debugging: echo or log the $tstamp value to ensure it's correct
    echo "Current Timestamp (IST): " . $tstamp . "<br>";
    
    $stmt->bind_param('ssss', $new_roi, $tstamp, $district, $account_no);

    if ($stmt->execute()) {
        echo "ROI updated successfully!";
    } else {
        echo "Error updating ROI and tstamp: " . $stmt->error;
    }

    $stmt->close();
} else {
    echo "Missing required parameters.";
}

mysqli_close($conn);
?>
