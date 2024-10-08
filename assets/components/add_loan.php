<?php
include 'db_connect.php';

// Function to calculate reset dates
function calculateResetDates($present_date) {
    $dates = [];
    $dates['after_91'] = date('Y-m-d', strtotime($present_date . ' + 90 days'));
    $dates['after_181'] = date('Y-m-d', strtotime($present_date . ' + 180 days'));
    $dates['after_271'] = date('Y-m-d', strtotime($present_date . ' + 270 days'));
    $dates['after_361'] = date('Y-m-d', strtotime($present_date . ' + 360 days'));
    $dates['expiry_date'] = date('Y-m-d', strtotime($present_date . ' + 1 year'));
    return $dates;
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $dccb_name = $_POST['districts2'];
    $account_no = $_POST['account_no2'];
    $purpose = $_POST['purpose2'];
    $latest_roi = $_POST['latest_roi2'];
    $loan_amount = $_POST['loan_amount2'];
    $present_date = $_POST['present_date2'];
    $roi_type = null; // Initialize ROI Type to null

    // Initialize reset dates and expiry date
    $reset_dates = [
        'after_91' => null,
        'after_181' => null,
        'after_271' => null,
        'after_361' => null,
        'expiry_date' => null
    ];

    // Calculate reset dates if applicable
    if ($purpose !== 'SAO') {
        $reset_dates = calculateResetDates($present_date);

        // Check if 'roi_type' is set in POST request
        if (isset($_POST['roi_type'])) {
            $roi_type = $_POST['roi_type']; // ROI Type

            // Adjust reset dates and expiry date based on ROI type
            if ($roi_type === 'Fixed') {
                $reset_dates['after_91'] = null;
                $reset_dates['after_181'] = null;
                $reset_dates['after_271'] = null;
                $reset_dates['after_361'] = null;
            }
        }
    }

    // Prepare and bind
    $stmt = $conn->prepare("INSERT INTO reset_date (dccb_name, account_no, purpose, latest_roi, loan_amount, present_date, after_91, after_181, after_271, after_361, expiry_date, roi_type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sssddsssssss", $dccb_name, $account_no, $purpose, $latest_roi, $loan_amount, $present_date, $reset_dates['after_91'], $reset_dates['after_181'], $reset_dates['after_271'], $reset_dates['after_361'], $reset_dates['expiry_date'], $roi_type);

    // Execute the query
    if ($stmt->execute()) {
        // Redirect to after_login.php
        header("Location: /internship_rf_st/index.php");
        exit();
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
}

$conn->close();
?>
