<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <link rel="apple-touch-icon" sizes="180x180" href="/internship_rf_st/assets/images/apple-touch-icon.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/internship_rf_st/assets/images/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/internship_rf_st/assets/images/favicon-16x16.png" />
    <link rel="manifest" href="/internship_rf_st/assets/images/site.webmanifest" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="/internship_rf_st/assets/css/after_login_style.css">
    <!-- <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous"> -->
    <link rel="stylesheet" href="/internship_rf_st/assets/css/nav_style.css">
    <link rel="stylesheet" href="/internship_rf_st/assets/css/footer_style.css">
    <title>Scrutiny Note - APCOB</title>
</head>

<body>
    <?php include 'assets/components/db_connect.php'; ?>
    <?php include 'assets/components/nav.php'; ?>

    <div class="main-container">
        <div class="sidebar">
            <ul>
                <li id="home"><a href="#">Home</a></li>
                <li id="roi"><a href="#">Change ROI</a></li>
                <li id="limits"><a href="#">Change Limits</a></li>
                <li id="scrutiny"><a href="#">Scrutiny Generator</a></li>
                <li id="addLoan"><a href="#">Add Loan Info</a></li>
            </ul>
        </div>
        <div class="content-container">
            <div class="content1 content-section">
                <?php
                if (!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] !== true) {
                    header("Location: login.php");
                    exit();
                } else {
                    $username = isset($_SESSION['username']) ? htmlspecialchars($_SESSION['username']) : '';
                    // echo "<h2>Welcome, $username!</h2>";

                    // Fetch loan details that need to reset today and in the last 7 days
                    $today = date('Y-m-d');
                    $last_week = date('Y-m-d', strtotime('-7 days'));
                    $reset_sql = "SELECT * FROM `reset_date` WHERE 
                (`after_91` BETWEEN '$last_week' AND '$today' AND `roi_type` = 'Floating') OR 
                (`after_181` BETWEEN '$last_week' AND '$today' AND `roi_type` = 'Floating') OR 
                (`after_271` BETWEEN '$last_week' AND '$today' AND `roi_type` = 'Floating') OR 
                (`after_361` BETWEEN '$last_week' AND '$today' AND `roi_type` = 'Floating')
                ORDER BY `tstamp` ASC";

                    $reset_result = mysqli_query($conn, $reset_sql);

                    if (mysqli_num_rows($reset_result) > 0) {
                        echo "<h3>Loans to Reset</h3>";
                        echo "<table class='table table-striped'>";
                        echo "<thead><tr><th scope='col'>S.No</th><th scope='col'>DCCB Name</th><th scope='col'>Account No</th><th scope='col'>Purpose</th><th scope='col'>Latest ROI</th><th scope='col'>Loan Amount (in Crore)</th><th scope='col'>Loan Date</th><th scope='col'>Reset Date</th><th scope='col'>After</th><th scope='col'>Last Reset Timestamp</th></tr></thead><tbody>";
                        $sno = 1; // Initialize serial number
                        while ($row = mysqli_fetch_assoc($reset_result)) {
                            // Determine the reset period
                            if ($row['after_91'] >= $last_week && $row['after_91'] <= $today) {
                                $reset_period = '91 days';
                                $reset_date = date('d-m-Y', strtotime($row['after_91']));
                            } elseif ($row['after_181'] >= $last_week && $row['after_181'] <= $today) {
                                $reset_period = '181 days';
                                $reset_date = date('d-m-Y', strtotime($row['after_181']));
                            } elseif ($row['after_271'] >= $last_week && $row['after_271'] <= $today) {
                                $reset_period = '271 days';
                                $reset_date = date('d-m-Y', strtotime($row['after_271']));
                            } elseif ($row['after_361'] >= $last_week && $row['after_361'] <= $today) {
                                $reset_period = '361 days';
                                $reset_date = date('d-m-Y', strtotime($row['after_361']));
                            } else {
                                $reset_period = '';
                                $reset_date = '';
                            }

                            echo '<tr>';
                            echo '<td>' . $sno++ . '</td>'; // Increment and display serial number
                            echo '<td>' . htmlspecialchars($row['dccb_name']) . '</td>';
                            echo '<td>' . htmlspecialchars($row['account_no']) . '</td>';
                            echo '<td>' . htmlspecialchars($row['purpose']) . '</td>';
                            echo '<td>' . htmlspecialchars($row['latest_roi']) . '</td>';
                            echo '<td>' . htmlspecialchars($row['loan_amount']) . '</td>';
                            echo '<td>' . date('d-m-Y', strtotime($row['present_date'])) . '</td>'; // Assuming 'present_date' is the column name for loan given date
                            echo '<td>' . htmlspecialchars($reset_date) . '</td>';
                            echo '<td>' . htmlspecialchars($reset_period) . '</td>';
                            echo '<td>' . date('d-m-Y H:i:s', strtotime($row['tstamp'])) . '</td>'; // Including time in the timestamp
                            echo '</tr>';
                        }

                        echo "</tbody></table>";
                    } else {
                        echo "<p class='alert'>No loans to reset today or in the last 7 days.</p>";
                    }
                }
                ?>

                <h3>Reset Here</h3>
                <!-- Dropdown for Districts -->
                <div class="label-input-group">
                    <label for="districts">Select DCCB:</label>
                    <select id="districts" name="districts" oninput="fetchLoanDetails()">
                        <option value="Srikakulam">Srikakulam</option>
                        <option value="Visakhapatnam">Visakhapatnam</option>
                        <option value="Vizianagaram">Vizianagaram</option>
                        <option value="Kakinada">Kakinada</option>
                        <option value="Eluru">Eluru</option>
                        <option value="Krishna">Krishna</option>
                        <option value="Guntur">Guntur</option>
                        <option value="Prakasam">Prakasam</option>
                        <option value="Nellore">Nellore</option>
                        <option value="Kadapa">Kadapa</option>
                        <option value="Kurnool">Kurnool</option>
                        <option value="Anantapur">Anantapur</option>
                        <option value="Chittoor">Chittoor</option>
                    </select>
                </div>
                <div class="label-input-group">
                    <label for="account_no">Enter Account Number:</label>
                    <input type="text" id="account_no" name="account_no" oninput="fetchLoanDetails()">
                </div>

                <!-- Input for Account Number -->

                <div class="alert">
                </div>
                <!-- Container for Loan Details -->
                <div id="loan-details" style="display: none;">
                    <!-- <h3>Loan Details</h3> -->
                    <form id="loan-form">
                        <p>Last ROI: <input  type="number" id="last_roi" name="last_roi" step="0.01"></p>
                        <p>Loan Amount: <span id="loan_amount"></span> Crore</p>
                        <button type="button" id="update-roi-btn" style="display: none;" onclick="updateROI()">Update
                            ROI</button>
                    </form>
                </div>
            </div>
            <div class="content2 content-section" style="display: none;">
                <?php
                // Get the current date
                $current_date = date('Y-m-d');

                // Check if there is an update made today
                $today_sql = "SELECT * FROM `roi` WHERE DATE(`tstamp`) = '$current_date' ORDER BY `tstamp` DESC LIMIT 1";
                $today_result = mysqli_query($conn, $today_sql);

                // Initialize $roi_data with default values
                $roi_data = array(
                    'sto_fixed' => 0.0,
                    'asao_fixed' => 0.0,
                    'sto_floating' => 0.0,
                    'asao_floating' => 0.0
                );

                // If there is an update made today, fetch the data
                if (mysqli_num_rows($today_result) > 0) {
                    $roi_data = mysqli_fetch_assoc($today_result);
                } else {
                    // If no update made today, get the most recent ROI
                    $roi_sql = "SELECT * FROM `roi` ORDER BY `tstamp` DESC LIMIT 1";
                    $roi_result = mysqli_query($conn, $roi_sql);
                    if (mysqli_num_rows($roi_result) > 0) {
                        $roi_data = mysqli_fetch_assoc($roi_result);
                    }
                }
                ?>
                <h2>Change STO Fixed ROI</h2>
                <form id="stoFixedRoiForm" action="/internship_rf_st/assets/components/update_roi.php" method="POST">
                    <input type="number" id="sto-fixed-rate" name="sto-fixed-rate"
                        placeholder="Enter STO fixed rate of interest" step="0.01" min="0" required
                        value="<?php echo htmlspecialchars($roi_data['sto_fixed']); ?>">
                    <span class="percent-symbol">%</span>
                    <button id="updateStoFixedRoiBtn" type="submit" class="btn btn-primary"
                        style="display: none;">Update STO Fixed ROI</button>
                </form>

                <h2>Change ASAO Fixed ROI</h2>
                <form id="asaoFixedRoiForm" action="/internship_rf_st/assets/components/update_roi.php" method="POST">
                    <input  type="number" id="asao-fixed-rate" name="asao-fixed-rate"
                        placeholder="Enter ASAO fixed rate of interest" step="0.01" min="0" required
                        value="<?php echo htmlspecialchars($roi_data['asao_fixed']); ?>">
                    <span class="percent-symbol">%</span>
                    <button id="updateAsaoFixedRoiBtn" type="submit" class="btn btn-primary"
                        style="display: none;">Update ASAO Fixed ROI</button>
                </form>

                <h2>Change STO Floating ROI</h2>
                <form id="stoFloatingRoiForm" action="/internship_rf_st/assets/components/update_roi.php" method="POST">
                    <input  type="number" id="sto-floating-rate" name="sto-floating-rate"
                        placeholder="Enter STO floating rate of interest" step="0.01" min="0" required
                        value="<?php echo htmlspecialchars($roi_data['sto_floating']); ?>">
                    <span class="percent-symbol">%</span>
                    <button id="updateStoFloatingRoiBtn" type="submit" class="btn btn-primary"
                        style="display: none;">Update STO Floating ROI</button>
                </form>

                <h2>Change ASAO Floating ROI</h2>
                <form id="asaoFloatingRoiForm" action="/internship_rf_st/assets/components/update_roi.php"
                    method="POST">
                    <input type="number" id="asao-floating-rate" name="asao-floating-rate"
                        placeholder="Enter ASAO floating rate of interest" step="0.01" min="0" required
                        value="<?php echo htmlspecialchars($roi_data['asao_floating']); ?>">
                    <span class="percent-symbol">%</span>
                    <button id="updateAsaoFloatingRoiBtn" type="submit" class="btn btn-primary"
                        style="display: none;">Update ASAO Floating ROI</button>
                </form>
            </div>
            <div class="content3 content-section">
                <!-- Content for Change Limits -->
                <h2>Change Limits to DCCB's Under STO (Rs.in Crore)</h2>
                <form id="limitsForm" method="post" action="/internship_rf_st/assets/components/update_limits.php">
                    <table id="limitsTable" class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">S.No</th>
                                <th scope="col">DCCB Name</th>
                                <th scope="col">SAO</th>
                                <th scope="col">ASAO</th>
                                <th scope="col">OSAO</th>
                                <th scope="col">SAO-Fresh Finance</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php
                            $sql = "SELECT * FROM `limits`";
                            $result = mysqli_query($conn, $sql);
                            if (mysqli_num_rows($result) > 0) {
                                while ($row = mysqli_fetch_assoc($result)) {
                                    echo '<tr>';
                                    echo '<th scope="row">' . htmlspecialchars($row['sno']) . '</th>';
                                    echo '<td>' . htmlspecialchars($row['dccb_name']) . '</td>';
                                    echo '<td><input step="0.01" type="number" name="sao[' . htmlspecialchars($row['sno']) . ']" class="form-control" value="' . htmlspecialchars($row['sao']) . '" oninput="addsubmitButton()"></td>';
                                    echo '<td><input step="0.01" type="number" name="asao[' . htmlspecialchars($row['sno']) . ']" class="form-control" value="' . htmlspecialchars($row['asao']) . '" oninput="addsubmitButton()"></td>';
                                    echo '<td><input step="0.01" type="number" name="osao[' . htmlspecialchars($row['sno']) . ']" class="form-control" value="' . htmlspecialchars($row['osao']) . '" oninput="addsubmitButton()"></td>';
                                    echo '<td><input step="0.01" type="number" name="fresh_sao[' . htmlspecialchars($row['sno']) . ']" class="form-control" value="' . htmlspecialchars($row['fresh_sao']) . '" oninput="addsubmitButton()"></td>';
                                    echo '</tr>';
                                }
                            } else {
                                echo "<tr><td colspan='5'>No limit data found for districts.</td></tr>";
                            }
                            ?>
                        </tbody>
                    </table>
                    <button id="updateLimitsBtn" type="submit" class="btn btn-primary" style="display: none;">Update
                        Limits</button>
                </form>

            </div>
            <div class="content4 content-section" style="display: none;">
                <!-- Content for Scrutiny Generator -->
                <h2>Scrutiny Generator</h2>
                <!-- <p>Content for Scrutiny Generator page.</p> -->
                <div class="scrutiny-buttons">
                    <a href="sto2.php">STO Scrutiny Generator</a>
                    <a href="asao.php">ASAO Scrutiny Generator</a>
                    <a href="sao.php">SAO Scrutiny Generator</a>
                </div>
            </div>
            <div class="content5 content-section">
                <h2>Add Loan Info</h2>
                <form id="addLoanForm" method="post" action="/internship_rf_st/assets/components/add_loan.php">
                    <div class="label-input-group">
                        <label for="districts2">Select DCCB:</label>
                        <select id="districts2" name="districts2" oninput="" required>
                            <option value="Srikakulam">Srikakulam</option>
                            <option value="Visakhapatnam">Visakhapatnam</option>
                            <option value="Vizianagaram">Vizianagaram</option>
                            <option value="Kakinada">Kakinada</option>
                            <option value="Eluru">Eluru</option>
                            <option value="Krishna">Krishna</option>
                            <option value="Guntur">Guntur</option>
                            <option value="Prakasam">Prakasam</option>
                            <option value="Nellore">Nellore</option>
                            <option value="Kadapa">Kadapa</option>
                            <option value="Kurnool">Kurnool</option>
                            <option value="Anantapur">Anantapur</option>
                            <option value="Chittoor">Chittoor</option>
                        </select>
                    </div>
                    <div class="label-input-group">
                        <label for="account_no2">Enter Account Number:</label>
                        <input type="text" id="account_no2" name="account_no2" required>
                    </div>
                    <div class="label-input-group">
                        <label for="purpose2">Purpose:</label>
                        <select id="purpose2" name="purpose2" oninput="" required>
                            <!-- <option value="aa-direct">ST Others -AA Direct</option> -->
                            <!-- <option value="ASAO Fixed">ASAO - Fixed</option> -->
                            <option value="ST Others Agri and allied-through PACS">ST Others Agri and allied-through
                                PACS</option>
                            <option value="ST Others Agri and allied-through DIRECT">ST Others Agri and allied-through
                                DIRECT</option>
                            <option value="ST Others BCTT-through PACS">ST Others BCTT-through PACS</option>
                            <option value="ST Others BCTT-through DIRECT">ST Others BCTT-through DIRECT</option>
                            <option value="ST Others FED-through DIRECT">ST Others FED-through DIRECT</option>
                            <option value="ST Others working capital to PACS">ST Others working capital to PACS</option>
                            <option value="ST Others working capital to AH-through PACS">ST Others working capital to
                                AH-through PACS</option>
                            <option value="ST Others working capital to AH-through Direct">ST Others working capital to
                                AH-through Direct</option>
                            <option value="ST Others-concessional">ST Others-concessional</option>
                            <option value="SAO">SAO</option>
                            <option value="ASAO">ASAO</option>
                        </select>
                    </div>
                    <div class="label-input-group" id="type">
                        <label for="roi_type">ROI Type:</label>
                        <select id="roi_type" name="roi_type">
                            <option value="Fixed">Fixed</option>
                            <option value="Floating">Floating</option>
                        </select>
                    </div>

                    <div class="label-input-group">
                        <label for="latest_roi2">ROI:</label>
                        <input type="number" id="latest_roi2" name="latest_roi2" step="0.01" required>
                    </div>
                    <div class="label-input-group">
                        <label for="loan_amount2">Loan Amount (in Crore):</label>
                        <input type="number" id="loan_amount2" name="loan_amount2" step="0.01" required>
                    </div>
                    <div class="label-input-group">
                        <label for="present_date2">Present Date:</label>
                        <input type="date" id="present_date2" name="present_date2" required
                            onchange="calculateResetDates()">
                    </div>
                    <div class="label-input-groupx">
                        <p>Reset Dates:</p>
                        <p>After 91 days: <span id="after_91">00-00-0000</span></p>
                        <p>After 181 days: <span id="after_181">00-00-0000</span></p>
                        <p>After 271 days: <span id="after_271">00-00-0000</span></p>
                        <p>After 361 days: <span id="after_361">00-00-0000</span></p>
                    </div>
                    <div class="label-input-expiry">
                        <p>Expiry Date: <span id="expiry">00-00-0000</span></p>
                    </div>
                    <button type="submit" class="btn btn-primary" id="loan_submit">Submit</button>
                </form>
            </div>
        </div>
    </div>
    <?php include 'assets/components/footer.php'; ?>
    <!-- <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous">
        </script> -->
    <script src="/internship_rf_st/assets/js/after_login.js"></script>
</body>

</html>