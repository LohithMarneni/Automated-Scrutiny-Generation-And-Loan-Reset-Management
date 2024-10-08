<?php
// Database connection
require 'db_connect.php';

if (isset($_GET['type']) && isset($_GET['scrutiny'])) {
    $interestType = $_GET['type'];
    $scrutinyType = $_GET['scrutiny'];

    // Sanitize input to prevent SQL injection
    $interestType = $conn->real_escape_string($interestType);
    $scrutinyType = $conn->real_escape_string($scrutinyType);

    // Define the ROI column to be fetched based on scrutiny type and interest type
    $roiColumn = ($interestType === 'fixed') ? $scrutinyType . '_fixed' : $scrutinyType .'_floating';

    // Modify the SQL query to get the latest ROI based on the timestamp
    $sql = "SELECT `$roiColumn` AS roi FROM roi ORDER BY tstamp DESC LIMIT 1";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        echo trim($row['roi']); // Return the ROI value as plain text
    } else {
        echo 'No ROI data found';
    }
} else {
    echo 'Invalid request parameters';
}

$conn->close();

?>