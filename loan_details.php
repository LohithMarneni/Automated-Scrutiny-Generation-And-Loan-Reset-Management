<?php
include 'assets/components/db_connect.php';

// Check if user is logged in
if (!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] !== true) {
    header("Location: login.php");
    exit();
}

// Function to sanitize data for Excel output
function cleanData($data) {
    // Escape data to avoid XSS attacks
    $data = htmlspecialchars($data);
    
    // If numeric, check for account numbers (treat as text if longer than 10 digits)
    if (is_numeric($data)) {
        if (strlen($data) > 10) {
            return "$data"; // Prefix with ' to force Excel to treat as text
        } else {
            return (string)$data;
        }
    }
    
    // Format dates properly
    if (strtotime($data)) {
        return date('d-m-Y', strtotime($data)); // Format date as dd-mm-yyyy
    }
    
    return $data;
}

// Fetch data from reset_date table
$sql = "SELECT  
  `dccb_name`,
  `account_no`,
  `purpose`,
  `roi_type`,
  `latest_roi`,
  `loan_amount`,
  `present_date`,
  `after_91`,
  `after_181`,
  `after_271`,
  `after_361`,
  `expiry_date`,
  `tstamp` FROM reset_date";
$result = mysqli_query($conn, $sql);

// Organize data by purpose and district
$data_by_purpose = [];
while ($row = mysqli_fetch_assoc($result)) {
    $purpose = $row['purpose'];
    $district = $row['dccb_name']; // Assuming 'dccb_name' represents the district
    
    if (!isset($data_by_purpose[$purpose])) {
        $data_by_purpose[$purpose] = [];
    }
    if (!isset($data_by_purpose[$purpose][$district])) {
        $data_by_purpose[$purpose][$district] = [];
    }
    $data_by_purpose[$purpose][$district][] = $row;
}

// Close connection
mysqli_close($conn);

// Generate Excel data
$headers = ["SNo", "DCCB Name", "Account No", "Purpose", "ROI Type", "Latest ROI", "Loan Amount", "Present Date", "After 91", "After 181", "After 271", "After 361", "Expiry Date", "Last Reset Date"];
$excel_data = implode("\t", $headers) . "\n";

$sno = 1; // Initialize the serial number counter

foreach ($data_by_purpose as $purpose => $districts) {
    // $excel_data .= "\n" . strtoupper($purpose) . "\n";
    foreach ($districts as $district => $rows) {
        // $excel_data .= "\n" . strtoupper($district) . "\n";
        foreach ($rows as $row) {
            // Extract row data and add serial number manually
            $row_data = array_map('cleanData', $row);
            array_unshift($row_data, $sno); // Add serial number at the beginning of the row data
            $excel_data .= implode("\t", $row_data) . "\n";
            $sno++; // Increment the serial number
        }
    }
    // $excel_data.="\n\n\n";
}

// File download logic
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Output Excel headers
    $filename = "loan_details_" . date('d_m_Y') . ".xls";
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
