<?php
if (isset($_GET['district'])) {
    $district = $_GET['district'];

    require 'db_connect.php';

    // Prepare SQL query to fetch SAO and Fresh SAO values based on district
    $sql = "SELECT sao, fresh_sao FROM limits WHERE dccb_name = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $district);
    $stmt->execute();
    $stmt->bind_result($sao, $fresh_sao);

    // Fetch and encode result as JSON
    if ($stmt->fetch()) {
        echo json_encode(array("sao" => $sao, "fresh_sao" => $fresh_sao));
    }

    // Close connections and statement
    $stmt->close();
    $conn->close();
}
?>
