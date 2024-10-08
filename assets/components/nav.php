<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>APCOB Bank</title>
</head>

<body>
    <?php
    if (!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] !== true) {
        header("Location: login.php");
        exit();
    } else {
        $username = isset($_SESSION['username']) ? htmlspecialchars($_SESSION['username']) : '';
    }
    ?>
       <nav class="navbar">
        <a class="navbar-brand" href="index.php">
            <img src="/internship_rf_st/assets/images/apcob_logo.jpeg" width="100" height="100" id="nav_logo" alt="APCOB Logo">
            <span class="navbar-text">
                The Andhra Pradesh State Cooperative Bank Ltd.
            </span>
        </a>
        <div class="dropdown">
            <button class="dropdown-toggle" type="button">
                <img src="/internship_rf_st/assets/images/person.png" alt="User Icon" class="user-icon">
            </button>
            <div class="dropdown-menu">
                <div class="dropdown-header"><?php echo $username; ?></div>
                <a class="dropdown-item" href="#" onclick="confirmDownload('loan_details')">Loan Details</a>
                <a class="dropdown-item" href="#" onclick="confirmDownload('roi')">ROI Details</a>
                <a class="dropdown-item" href="/internship_rf_st/logout.php">Logout</a>
            </div>
        </div>
    </nav>
    <form id="downloadLoanForm" action="/internship_rf_st/loan_details.php" method="post">
        <!-- Hidden input to trigger download on form submission -->
        <input type="hidden" name="download" value="true">
    </form>

    <form id="downloadRoiForm" action="/internship_rf_st/roi_details.php" method="post">
        <!-- Hidden input to trigger download on form submission -->
        <input type="hidden" name="download" value="true">
    </form>

    <script>
        function confirmDownload(type) {
            if (confirm("Do you want to download the " + type.replace('_', ' ') + " table?")) {
                if (type === 'loan_details') {
                    document.getElementById('downloadLoanForm').submit();
                } else if (type === 'roi') {
                    document.getElementById('downloadRoiForm').submit();
                }
            } else {
                // No action needed, just let the user decide
            }
        }
        const dropdown = document.querySelector('.dropdown');
        const dropdownMenu = document.querySelector('.dropdown-menu');
        const dropdownToggle = document.querySelector('.dropdown-toggle');

        dropdownToggle.addEventListener('click', function() {
            dropdownMenu.classList.toggle('show');
        });

        dropdown.addEventListener('mouseover', function() {
            dropdownMenu.classList.add('show');
        });

        dropdown.addEventListener('mouseout', function() {
            dropdownMenu.classList.remove('show');
        });

        window.addEventListener('click', function(e) {
            if (!dropdown.contains(e.target)) {
                dropdownMenu.classList.remove('show');
            }
        });
    </script>
</body>

</html>