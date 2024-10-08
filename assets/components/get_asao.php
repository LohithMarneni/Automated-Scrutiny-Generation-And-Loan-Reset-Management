<?php
if (isset($_GET['district'])) {
    $district = $_GET['district'];

    
    include 'db_connect.php';
    // Prepare SQL query to fetch ASAO value based on district
    $sql = "SELECT asao FROM limits WHERE dccb_name = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $district);
    $stmt->execute();
    $stmt->bind_result($asao);

    // Fetch and encode result as JSON
    if ($stmt->fetch()) {
        echo json_encode(array("asao" => $asao));
    }

    // Close connections and statement
    $stmt->close();
    $conn->close();
}
?>
