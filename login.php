<?php
include 'assets/components/db_connect.php';

$error_message = "";

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = $_POST['email'];
    $password = $_POST['password'];
    $sql = "SELECT * FROM user WHERE email='$email'";
    $result = mysqli_query($conn, $sql);
    $num = mysqli_num_rows($result);

    if ($num > 0) {
        $row = mysqli_fetch_assoc($result);
        // Verify the password
        // if (password_verify($password, $row['password_hash'])) {
        if ($password == $row['password_hash']) {
            // Start the session and store user info
            session_start();
            $_SESSION['loggedin'] = true;
            $_SESSION['username'] = $row['username'];
            $_SESSION['email'] = $row['email'];
            header("Location: index.php");
            exit();
        } else {
            $error_message = "Invalid password.";
        }
    } else {
        $error_message = "Invalid email.";
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/internship_rf_st/assets/css/login_style.css">
    <link rel="apple-touch-icon" sizes="180x180" href="/internship_rf_st/assets/images/apple-touch-icon.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/internship_rf_st/assets/images/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/internship_rf_st/assets/images/favicon-16x16.png" />
    <link rel="manifest" href="/internship_rf_st/assets/images/site.webmanifest" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <title>Login - APCOB Scrutiny Note</title>
</head>
<body>
<div class="login-container">
    <div class="logo">
        <img src="/internship_rf_st/assets/images/apcob_logo.jpeg" alt="APCOB Logo" />
    </div>
    <?php 
    if (!empty($error_message)){
        echo '<div class="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>' . $error_message . '</strong>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>';
    }
    ?>
    <form action="login.php" method="POST">
      <div class="form-field">
        <input type="email" name="email" placeholder="Email" required autocomplete="email"/>
      </div>
      <div class="form-field">
        <input type="password" name="password" placeholder="Password" required autocomplete="current-password"/>
      </div>
      <div class="form-field">
        <button class="btn" type="submit">Log in</button>
      </div>
    </form>
</div>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
</body>
</html>
