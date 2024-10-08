<?php
include 'db_connect.php';

$district = isset($_GET['district']) ? $_GET['district'] : '';
$account_no = isset($_GET['account_no']) ? $_GET['account_no'] : '';

$response = ['success' => false, 'data' => []];

if ($district && $account_no) {
    $sql = "SELECT * FROM `reset_date` WHERE `dccb_name` = '$district' AND `account_no` = '$account_no' AND `roi_type` = 'Floating'";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_assoc($result);
        $response['success'] = true;
        $response['data'] = [
            'latest_roi' => $row['latest_roi'],
            'loan_amount' => $row['loan_amount']
        ];
    }
}

echo json_encode($response);
mysqli_close($conn);
?>
