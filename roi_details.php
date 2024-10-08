<?php
include 'assets/components/db_connect.php';

// Check if user is logged in
if (!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] !== true) {
    header("Location: login.php");
    exit();
}

// Function to sanitize data for Excel output
function cleanData($data) {
    $data = htmlspecialchars($data);
    if (is_numeric($data)) {
        if (strlen($data) > 10) {
            return "$data"; // Prefix with ' to force Excel to treat as text
        } else {
            return (string)$data;
        }
    }
    if (strtotime($data)) {
        return date('d-m-Y', strtotime($data)); // Format date as dd-mm-yyyy
    }
    return $data;
}

// Fetch data from roi table
$sql = "SELECT * FROM roi";
$result = mysqli_query($conn, $sql);

// Initialize Excel data with headers
$excel_data = "SNo\tSTO Fixed\tASAO Fixed\tSTO Floating\tASAO Floating\tTimestamp\n";

$sno = 1; // Initialize the serial number counter

while ($row = mysqli_fetch_assoc($result)) {
    // Ensure columns are in the correct order and sanitized
    $excel_data .= implode("\t", array(
        $sno, // Use manual serial number
        cleanData($row['sto_fixed']),
        cleanData($row['asao_fixed']),
        cleanData($row['sto_floating']),
        cleanData($row['asao_floating']),
        cleanData($row['tstamp'])
    )) . "\n";
    
    $sno++; // Increment the serial number
}

// Close connection
mysqli_close($conn);

// File download logic
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Output Excel headers
    $filename = "roi_details_" . date('d_m_Y') . ".xls";
    header("Content-Type: application/vnd.ms-excel");
    header("Content-Disposition: attachment; filename=\"$filename\"");
    
    // Output Excel data
    echo $excel_data;
    exit();
}

// Redirect back to after_login.php if download not initiated through POST
header("Location: /internship_rf_st/index.php");
exit();
?>
