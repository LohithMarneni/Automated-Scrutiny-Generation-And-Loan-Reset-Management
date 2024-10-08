<?php
if (isset($_GET['district'])) {
    $district = $_GET['district'];

    include 'db_connect.php';
    $sql = "SELECT osao FROM limits WHERE dccb_name = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $district);
    $stmt->execute();
    $stmt->bind_result($osao);
    $stmt->fetch();

    echo json_encode(array("osao" => $osao));

    $stmt->close();
    $conn->close();
}
?>
