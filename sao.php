<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous"> -->
    <link rel="stylesheet" href="/internship_rf_st/assets/css/sao_style.css">
    <link rel="apple-touch-icon" sizes="180x180" href="/internship_rf_st/assets/images/apple-touch-icon.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/internship_rf_st/assets/images/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/internship_rf_st/assets/images/favicon-16x16.png" />
    <link rel="manifest" href="/internship_rf_st/assets/images/site.webmanifest" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/docxtemplater/3.45.0/docxtemplater.js"></script>
    <script src="https://unpkg.com/pizzip@3.1.6/dist/pizzip.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/1.3.8/FileSaver.js"></script>
    <script src="https://unpkg.com/pizzip@3.1.6/dist/pizzip-utils.js"></script>
    <link rel="stylesheet" href="/internship_rf_st/assets/css/nav_style.css">
    <title>SAO Scrutiny- APCOB</title>
</head>

<body>
    <?php
    include 'assets/components/db_connect.php';
    include 'assets/components/nav.php';
    ?>
    <div id="print-element">
        <div class="heading">
            <center>
                <h3>
                    The Andhra Pradesh State Cooperative Bank Ltd., DoR - ST Operations
                    <span>
                        <input type="number" id="year-input-start" name="year-input-start" style="width: 60px;">
                    </span> -
                    <span> <input type="number" id="year-input-end" name="year-input-end" style="width: 40px;"></span>
                    SAO Drawals to DCC Banks for Rabi
                    <span><input type="number" id="drawal-year-start" name="drawal-year-start"
                            style="width: 60px;"></span> -
                    <span><input type="number" id="drawal-year-end" name="drawal-year-end" style="width: 40px;"></span>
                    Drawal -
                    <span><input type="number" id="drawal-number" name="drawal-number" style="width: 50px;"></span>
                </h3>
            </center>
        </div>
        <div class="drawal-details">
            <div class="side-heading">
                <p style="display: inline;">Details of the Drawal</p>
                <p class="units">(Rs. in Crore)</p>
            </div>

            <table border="1">
                <tr>
                    <td>I</td>
                    <td>Name of the DCC Bank</td>
                    <td> <span id="districtspan">
                            <label for="districts"></label>
                            <select id="districts" name="districts" oninput="updateBranch()">
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
                        </span>
                    </td>
                </tr>
                <tr>
                    <td>II</td>
                    <td>Purpose applied for</td>
                    <td><span id="purposespan">
                            <label for="purpose"></label>
                            <select id="purpose" name="purpose" oninput="displayPurpose()">
                                <!-- <option value="aa-direct">ST Others -AA Direct</option> -->
                                <option value="SAO">SAO</option>
                                <option value="OPP">OPP</option>
                                <option value="DTP">DTP</option>
                                <option value="SAO - Fresh Finance">SAO - Fresh Finance</option>
                            </select>
                        </span>
                    </td>
                </tr>
                <tr>
                    <td>
                        III
                    </td>
                    <td>TP Note amount</td>
                    <td>
                        <label for="wanted-amount">Rs.</label>
                        <input type="number" step="0.01" id="wanted-amount" class="drawal" name="wanted-amount"
                            placeholder="Enter amount" min="0" oninput="addDrawalAmount()">
                    </td>
                </tr>
                <!-- <tr>
                    <td>IV</td>
                    <td>Loan A/c No.</td>
                    <td>
                        <label for="account-number"></label>
                        <input type="text" id="account-number" name="account-number" placeholder="Enter account number"
                            pattern="\d{10,18}" title="Account number should be between 10 and 18 digits">
                    </td>

                </tr>
                <tr>
                    <td>
                        V
                    </td>
                    <td>
                        Collateral No.
                    </td>
                    <td>
                        <label for="Collateral-number"></label>
                        <input type="text" id="Collateral-number" name="Collateral-number"
                            placeholder="Enter Collateral number" pattern="\d{10,18}"
                            title="Collateral number should be between 10 and 18 digits">
                    </td>
                </tr>
                <tr>
                    <td>
                        VI
                    </td>
                    <td>
                        Queue Reference No.
                    </td>
                    <td>
                        <label for="queue-reference"></label>
                        <input type="text" id="queue-reference" name="Collateral-number"
                            placeholder="Enter Queue Reference No." pattern="\d{1,10}"
                            title="Collateral number should be between 1 and 10 digits">
                    </td>
                </tr> -->
                <tr>
                    <td>
                        IV
                    </td>
                    <td>
                        Date of Disbursement
                    </td>
                    <td>
                        <label for="date-disbursement"></label>
                        <input type="date" id="date-disbursement" name="date-disbursement" 
                            required>
                    </td>

                </tr>
                <!-- <tr>
                    <td>VIII</td>
                    <td>Rate of Interest</td>
                    <td>
                        <label for="interest-rate"></label>
                        <input type="number" id="interest-rate" name="interest-rate"
                            placeholder="Enter rate of interest" step="0.01" min="0" onchange="updateRoi()" required>%
                    </td>
                </tr> -->
            </table>
        </div>
        <div class="total-os">
            <div class="side-heading">

                <p style="display:inline">1. Total Outstanding</p>
                <p class="units" >(Rs.in Crore)</p>
            </div>
            <table border="1">
                <tr>
                    <td>I</td>
                    <td>XVI A/c outstandings (<span id="previous-year"></span>-<span class="present-year"></span>)</td>
                    <td><div id="tot-os">0.00</div></td>
                </tr>
                <tr>
                    <td>II</td>
                    <td>XVII A/c Disbursements (<span class="present-year"></span>-<span class="next-year"></span>):<br>
                        ( SAO - Rs.<input type="number" step="0.01" class="amount1" name="amount1"
                            onchange="calculateSecOs()" placeholder="Enter amount" min="0"> Crore + OPP
                        -
                        Rs.<input type="number" step="0.01" class="amount2" name="amount2"
                            onchange="calculateSecOs()" placeholder="Enter amount" min="0"> Crore +
                        DTP - Rs.<input type="number" step="0.01" class="amount3" name="amount3"
                            onchange="calculateSecOs()" placeholder="Enter amount" min="0"> Crore +
                        SAO - Fresh Finance - Rs.<input type="number" step="0.01" class="amount4" name="amount4"
                            onchange="calculateSecOs()" placeholder="Enter amount" min="0"> Crore + ASAO - Rs.<input type="number" step="0.01" class="amount5" name="amount5"
                            onchange="calculateSecOs()" placeholder="Enter amount" min="0"> Crore)</td>
                    <td id="used-os">0.00</td>
                </tr>

                <tr>
                    <td>III</td>
                    <td>Less total Outstanding:<br>
                    (SAO - Rs.<input type="number" step="0.01" class="amount21" name="amount21"
                            onchange="calculateThirdOs()" placeholder="Enter amount" min="0"> Crore + OPP
                        -
                        Rs.<input type="number" step="0.01" class="amount22" name="amount22"
                            onchange="calculateThirdOs()" placeholder="Enter amount" min="0"> Crore +
                        DTP - Rs.<input type="number" step="0.01" class="amount23" name="amount23"
                            onchange="calculateThirdOs()" placeholder="Enter amount" min="0"> Crore +
                        SAO - Fresh Finance - Rs.<input type="number" step="0.01" class="amount24" name="amount24"
                            onchange="calculateThirdOs()" placeholder="Enter amount" min="0"> Crore +
                        ASAO - Rs.<input type="number" step="0.01" class="amount25" name="amount25"
                            onchange="calculateThirdOs()" placeholder="Enter amount" min="0"> Crore)
                    </td>
                    <td id="tot2-os">0.00</td>
                </tr>
            </table>
        </div>
        <div class="margin-limit">
            <div class="side-heading">

                <p style="display:inline">2. Margin in Limit</p>
                <p class="units" >(Rs.in Crore)</p>
            </div>
            <table border="1">
                <tr>
                    <td colspan="3">Transactions under Normal Limit</td>
                </tr>
                <tr>
                    <td>I</td>
                    <td>Normal Credit Limit Sanctioned</td>
                    <td><input type="number" step="0.01" id="mlinput" name="mlinput" placeholder="Enter amount" min="0"
                            oninput="calculateML1()"></td>
                </tr>
                <tr>
                    <td>II</td>
                    <td>Less XVII A/c outstanding</td>
                    <td id="ml2t">0.00</td>
                </tr>

                <tr>
                    <td>III</td>
                    <td>Margin in Limit</td>
                    <td id="ml3t">0.00</td>
                </tr>
                <tr>
                    <td colspan="3">Transactions under New Member/Additional Limit</td>
                </tr>
                <tr>
                    <td>I</td>
                    <td>New member Credit Limit Sanctioned</td>
                    <td><input type="number" step="0.01" id="mlinput2" name="mlinput2" placeholder="Enter amount" min="0"
                            oninput="calculateML2()"></td>
                </tr>
                <tr>
                    <td>II</td>
                    <td>Less XVII A/c outstanding</td>
                    <td id="ml2t2">0.00</td>
                </tr>
                <tr>
                    <td>III</td>
                    <td>Margin in Limit</td>
                    <td id="ml3t2">0.00</td>
                </tr>
            </table>
        </div>
        <div class="nios">
            <div class="side-heading">

                <p style="display:inline">3. Net Increase in Outstanding</p>
                <p class="units" >(Rs.in Crore)</p>
            </div>
            <table border="1">
                <tr>
                    <td>I</td>
                    <td>Outstanding as on <span class="financial-year">00-00-0000</span></td>
                    <td><input type="number" step="0.01" id="niosi1" name="niosi1" placeholder="Enter amount" min="0"
                    oninput="calculateNios()"></td>
                </tr>
                <tr>
                    <td>II</td>
                    <td>Outstanding as on <label for="as-on-date1"></label>
                        <input type="date" class="as-on1" id="as-on-date1" name="as-on-date1"
                             required></td>
                    <td><input type="number" step="0.01" id="niosi2" name="niosi2" placeholder="Enter amount" min="0"
                    oninput="calculateNios()"></td>
                </tr>

                <tr>
                    <td>III</td>
                    <td>Net Increase in Outstanding
                    </td>
                    <td id="nios3">0.00</td>
                </tr>
                <tr>
                    <td>IV</td>
                    <td>70% of Net Increase in Outstanding
                    </td>
                    <td id="nios4">0.00</td>
                </tr>
                <tr>
                    <td>V</td>
                    <td>Drawals already allowed
                    </td>
                    <td id="nios5">0.00</td>
                </tr>
                <tr>
                    <td>VI</td>
                    <td>Margin
                    </td>
                    <td id="nios6">0.00</td>
                </tr>
            </table>
        </div>
        <div class="md">
            <div class="side-heading">

                <p style="display:inline">4. Margin in Disbursements</p>
                <p class="units" >(Rs.in Crore)</p>
            </div>
            <table border="1">
                <tr>
                    <td>I</td>
                    <td>CCB's Total Disbursements from <span class="financial-year">00-00-0000</span> to  <label for="as-on-date"></label>
                        <input type="date" class="as-on" id="as-on-date" name="as-on-date"
                            oninput="displayAsOn()" required></td>
                    <td><input type="number" step="0.01" id="mdi1" name="mdi1" placeholder="Enter amount" min="0"
                    oninput="calculateMd()"></td>
                </tr>
                <tr>
                    <td>II</td>
                    <td>of (i) disbursed to New members</td>
                    <td><input type="number" step="0.01" id="mdi2" name="mdi2" placeholder="Enter amount" min="0"
                    oninput="calculateMd()"></td>
                </tr>
                <tr>
                    <td>III</td>
                    <td>Normal SAO Disbursements from <span class="financial-year">00-00-0000</span> to <span class="as-on">00-00-0000</span> </td>
                    <td id="md3">0.00</td>
                </tr>
                <tr>
                    <td>IV</td>
                    <td>70% of disbursements under Normal SAO
                    </td>
                    <td id="md4">0.00</td>
                </tr>
                <tr>
                    <td>V</td>
                    <td>Less Drawals allowed -
                    Normal SAO - Rs.<span class="amount1">0.00</span> Crore + OPP
                        - Rs.<span class="amount2">0.00</span> Crore +
                        DTP - Rs.<span class="amount3">0.00</span> Crore + Excess drawn under ASAO - Rs.<input type="number" step="0.01" id="mdi3" name="mdi3" placeholder="Enter amount" min="0"
                        oninput="calculateMd4()"> Crore
                </td>
                    <td id="md5">0.00</td>
                </tr>
                <tr>
                    <td>VI</td>
                    <td>Margin in Disbursements
                    </td>
                    <td id="md6">0.00</td>
                </tr>
                <tr>
                    <td colspan="3"></tdco>
                </tr>
                <tr>
                    <td>VII</td>
                    <td>Of which disbursements made for New members
                    </td>
                    <td id="md7">0.00</td>
                </tr>
                <tr>
                    <td>VIII</td>
                    <td>70% of disbursements
                    </td>
                    <td id="md8">0.00</td>
                </tr>
                <tr>
                    <td>IX</td>
                    <td>Less drawals allowed
                    </td>
                    <td id="md9" class="amount4">0.00</td>
                </tr>
                <tr>
                    <td>X</td>
                    <td>Margin in Disbursements
                    </td>
                    <td id="md10">0.00</td>
                </tr>
            </table>
        </div>
        <div class="mnodc">
            <div class="side-heading">

                <p style="display:inline">5. Margin in NODC</p>
                <p class="units" >(Rs.in Crore)</p>
            </div>
            <table border="1">
                <tr>
                    <td>I</td>
                    <td>NODC as on <span class="as-on">00-00-0000</span></td>
                    <td><input type="number" step="0.01" id="mnodci1" name="mnodci1"
                    onchange="calculateMnodc()" placeholder="Enter amount" min="0"></td>
                </tr>
                <tr>
                    <td>II</td>
                    <td>Total Outstanding<br>
                     SAO - Rs.<span class="amount21">0.00</span> Crore + OPP
                        - Rs.<span class="amount22">0.00</span> Crore +
                        DTP - Rs.<span class="amount23">0.00</span> Crore + SAO - Fresh Finance - Rs.<span class="amount24">0.00</span> Crore + ASAO - Rs.<span class="amount25">0.00</span> Crore </td>
                    <td id="mnodc2">0.00</td>
                </tr>

                <tr>
                    <td>III</td>
                    <td>Margin in NODC
                    </td>
                    <td id="mnodc3">0.00</td>
                </tr>
            </table>
        </div>
        <div class="nodcos">
            <div class="side-heading">

                <p style="display:inline">6. APCOB Involvement against Outstanding/NODC at DCC Bank Level</p>
                <p class="units" >(Rs.in Crore)</p>
            </div>
            <table border="1">
                <tr>
                    <td>I</td>
                    <td>Total outstanding at DCC Bank Level (SAO + SLF)</td>
                    <td><input type="number" step="0.01" id="nodcosinput" name="nodcosinput" placeholder="Enter amount" min="0"
                    oninput="calculateNodcos()"></td>
                </tr>
                <tr>
                    <td>II</td>
                    <td>Total Outstanding at APCOB Level<br>
                    <span id="purposebased">
                    <span id="sao1" style="display:none">(Normal SAO) - Rs.<span class="amount21" id="sao2">0.00</span> Crore + </span> 
                    <span id="opp1" style="display:none">OPP - Rs.<span class="amount22" id="opp2">0.00</span> Crore + </span> 
                    <span id="dtp1" style="display:none">DTP - Rs.<span class="amount23" id="dtp2">0.00</span> Crore + </span>    
                    <span id="fresh-sao1" style="display:none">SAO - Fresh Finance - Rs.<span class="amount24" id="fresh-sao2">0.00</span> Crore + </span>
                    </span>
                     Excess drawn under ASAO - Rs.<input type="number" step="0.01" id="nodcosinput2" name="nodcosinput2" placeholder="Enter amount" min="0"
                        oninput="calculateNodcos2()"> Crore
                    </td>
                    <td><span id="nodcos2">0.00</span></td>
                </tr>
                <tr>
                    <td>III</td>
                    <td>
                        % of APCOB Involvement
                    </td>
                    <td id="nodcos3">0.00</td>
                </tr>
                <tr>
                    <td>IV</td>
                    <td>
                        NODC at DCC Bank Level
                    </td>
                    <td><input type="number" step="0.01" id="nodcosinput3" name="nodcosinput3" placeholder="Enter amount" min="0"
                    oninput="calculateNodcos()"></td>
                </tr>
                <tr>
                    <td>V</td>
                    <td>
                       % of APCOB Involvement before present drawal
                    </td>
                    <td id="nodcos5">0.00</td>
                </tr>
                <tr>
                    <td>VI</td>
                    <td>
                       Drawal Applied
                    </td>
                    <td id="nodcos6" class="drawal">0.00</td>
                </tr>
                <tr>
                    <td>VII</td>
                    <td>
                    Total Outstanding at APCOB Level after present drawal (<span id="nodcosam1">0.00</span> Crore + <span id="nodcosam2">0.00</span> Crore.)
                    </td>
                    <td id="nodcos7">0.00</td>
                </tr>
                <tr>
                    <td>VIII</td>
                    <td>
                       % of APCOB Involvement after present drawal
                    </td>
                    <td id="nodcos8">0.00</td>
                </tr>
            </table>
        </div>
        <div class="detasao">
            <p id="detasao">
                7. The <span class="branch">XYZ Bank</span> DCCB has applied drawal for an amount of Rs. <span
                    class="drawal">0.00</span> Crore under the purpose of <span class="for">SAO</span>.
            </p>
        </div>
        <div class="eligibility">
            <div class="side-heading">

                <p style="display:inline">8. Eligibility is worked out as below:</p>
                <p class="units" >(Rs.in Crore)</p>
            </div>
            <table border="1">
                <tr>
                    <td></td>
                    <td></td>
                    <td>Normal</td>
                    <td>New Members</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>Margin in Limit
                    </td>
                    <td><span id="eli1">0.00</span>
                    <td><span id="eli12">0.00</span></td>
                </td>
                    
                </tr>
                <tr>
                    <td>2</td>
                    <td>
                        Margin in Disbursements
                    </td>
                    <td id="eli2">0.00</td>
                    <td id="eli22">0.00</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>
                        Margin in NODC
                    </td>
                    <td id="eli3">0.00</td>
                    <td id="eli32">0.00</td>
                </tr>
                <tr>
                    <td>4</td>
                    <td>
                        Net Increase in Outstanding
                    </td>
                    <td id="elix">-</td>
                    <td id="elix2">0.00</td>
                </tr>
                <tr>
                    <td>5</td>
                    <td>
                       Drawal Applied
                    </td>
                    <td id="eli4" class="drawal">0.00</td>
                    <td id="eli42" class="drawal">0.00</td>
                </tr>
                <tr>
                    <td>6</td>
                    <td>
                    Drawal Eligibility Amount
                    </td>
                    <td id="eli5">0.00</td>
                    <td id="eli52">0.00</td>
                </tr>
                <tr>
                    <td>7</td>
                    <td>
                    Remaining Eligible amount
                    </td>
                    <td id="eli6">0.00</td>
                    <td id="eli62">0.00</td>
                </tr>
            </table>
        </div>
        <div class="risktable">
            <div class="side-heading">

                <p style="display:inline">9. Risk rating of the DCCB:</p>
            </div>
            <table border="1">
               <tr>
                <td>
                Rating of the <span class="branch">XYZ</span>  DCCB
                </td>
                <td>
                <span id="riska">
                    <label for="riskd"></label>
                        <select id="riskd" name="riskd">
                            <!-- <option value="aa-direct">ST Others -AA Direct</option> -->
                            <option value="Moderately Low Risk">Moderately Low Risk</option>
                            <option value="Medium Risk">Medium Risk</option>
                            <option value="Fair Risk">Fair Risk</option>
                            <option value="Low Risk">Low Risk</option>
                            </select>
                    </span>
                </td>
               </tr>
               <tr>
                <td>
                Premium
                </td>
                <td>
                <input type="number" id="premium" name="premium" placeholder="Enter rate of interest"
                step="0.01" min="0" required>%
                </td>
                <tr>
                <td>
                Rating arrived as on
                </td>
                <td>
                <label for="beforefdate"></label>
                        <input type="date" id="beforefdate" name="beforefdate"
                         required>
                </td>
               </tr>
               </tr>
            </table>
        </div>
        <div class="roitable">
            <div class="side-heading">
                <p style="display:inline">10. Rate of intrest on <span class="ondate">00-00-0000</span>:</p>
            </div>
            <table>
                <tr>
                    <td>
                         Rate of Intrest
                    </td>
                    <td><input type="number" id="roilimit" name="roilimit" placeholder="Enter rate of interest"
                            step="0.01" min="0" onchange="updateRoi()" required>% from NABARD</td>
                </tr>
                <tr>
                    <td>Margin for SAO</td>
                    <td> <input type="number" id="throughrate" name="throughrate" placeholder="Enter rate of interest"
                            step="0.01" min="0" onchange="updateRoi()" required>%</td>
                </tr>
                <tr>
                    <td>Risk Premium</td>
                    <td> <input type="number" id="risk" name="risk" placeholder="Enter rate of interest" step="0.01"
                            min="0" onchange="updateRoi()" required>%</td>
                </tr>
                <tr>
                    <td>Total Rate of Intrest</td>
                    <td><span id="totroi">0.00</span>%</td>
                </tr>
            </table>
        </div>
        <div class="result">
            <p id="result">
                11. It is Observed that, the least eligibility worked out is under <span id="under">ABC</span> is Rs.<span id="eliamount">0.00</span> Crore. The DCCB has applied drawal for an amount of Rs.<span class="drawal">0.00</span> Crore.<br><br>
            <p id="final">
            As Per the eligibilty worked out it is for consideration to sanction drawal of Rs.<input type="number" step="0.01" id="finda" name="finda" class="drawal" placeholder="Enter amount" min="0"
            oninput="calculateAfter()">  Crore to the <span class="branch">XYZ</span> DCCB under <span class="for">SAO</span> @ <span class="roitot">0.00</span>% .
            </p>
            </p>
        </div>
        <div id="print-button">
     <button type="button" id="download-pdf" onclick="generateDocument()">Download word</button>
     </div> 
    </div>
    <?php
    include 'assets/components/footer.php';
    ?>
    <script src="/internship_rf_st/assets/js/sao_script.js"></script>
    <script src="/internship_rf_st/assets/js/printsao.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js"></script>

    <!-- <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
        crossorigin="anonymous"></script> -->
</body>

</html>