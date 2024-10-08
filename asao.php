<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <link rel="stylesheet" href="/internship_rf_st/assets/css/asao_style.css">
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
    <title>ASAO Scrutiny- APCOB</title>
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
                    ASAO Drawals to DCC Banks for Khariff
                    <span><input type="number" id="drawal-year-start" name="drawal-year-start" style="width: 60px;"></span> -
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
                        <select id="purpose" name="purpose" oninput="toggleFloatingRates()">
                            <!-- <option value="aa-direct">ST Others -AA Direct</option> -->
                            <option value="ASAO Fixed">ASAO - Fixed</option>
                            <option value="ASAO Floating">ASAO - Floating</option>
                            </select>
                    </span>
                    </td>
                </tr>
                <tr>
                    <td>
                        III
                    </td>
                    <td>Drawal amount</td>
                    <td>
                        <label for="wanted-amount">Rs.</label>
                        <input type="number" step="0.01" id="wanted-amount" class="drawal" name="wanted-amount"
                            placeholder="Enter amount" min="0" oninput="addDrawalAmount()">
                    </td>
                </tr>
                <tr>
                    <td>
                        IV
                    </td>
                    <td>
                        Credit Limit Application
                    </td>
                    <td>
                    <label for="statusDropdown" class="dropdown-label"></label>
                        <select id="statusDropdown" class="dropdown">
                            <option value="Received">Received</option>
                            <option value="not Received">Not Received</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>
                        V
                    </td>
                    <td>
                        Member Wise List
                    </td>
                    <td>
                    <label for="confirmationDropdown" class="dropdown-label"></label>
                        <select id="confirmationDropdown" class="dropdown">
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>
                        VI
                    </td>
                    <td>
                        Date of Disbursement
                    </td>
                    <td>
                        <label for="date-disbursement"></label>
                        <input type="date" id="date-disbursement" name="date-disbursement"
                            oninput="displayDate()" required>
                    </td>

                </tr>
                
                <tr id="expiry-date-row" style="display: none;">
                    <td>VII</td>
                    <td id="rest_type1">Expiry Date</td>
                    <td id="expiry-date"></td>
                </tr>
                <tr id="reset-frequency-row" style="display: none;">
                    <td>VII</td>
                    <td id="rest_type2">Reset frequency date</td>
                    <td id="reset-date"> After 91 days - <span id="date1"></span>
                        <br>After 181 days - <span id="date2"></span><br>
                        After 271 days - <span id="date3"></span>
                        <br>After 361 days - <span id="date4"></span>
                        <br>Expiry Date - <span id="date5"></sp>
                    </td>
                </tr>

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
                        (Normal SAO - Rs.<input type="number" step="0.01" class="amount1" name="amount1"
                            onchange="calculateSecOs()" placeholder="Enter amount" min="0"> Crore + OPP
                        -
                        Rs.<input type="number" step="0.01" class="amount2" name="amount2"
                            onchange="calculateSecOs()" placeholder="Enter amount" min="0"> Crore +
                        DTP - Rs.<input  type="number" step="0.01" class="amount3" name="amount3"
                            onchange="calculateSecOs()" placeholder="Enter amount" min="0"> Crore + ASAO - Rs.<input type="number" step="0.01" class="amount4" name="amount4"
                            onchange="calculateSecOs()" placeholder="Enter amount" min="0"> Crore)</td>
                    <td id="used-os">0.00</td>
                </tr>

                <tr>
                    <td>III</td>
                    <td>Less total Outstanding:<br>
                    (SAO - Rs.<input  type="number" step="0.01" class="amount21" name="amount21"
                            onchange="calculateThirdOs()" placeholder="Enter amount" min="0"> Crore + OPP
                        -
                        Rs.<input  type="number" step="0.01" class="amount22" name="amount22"
                            onchange="calculateThirdOs()" placeholder="Enter amount" min="0"> Crore +
                        DTP - Rs.<input  type="number" step="0.01" class="amount23" name="amount23"
                            onchange="calculateThirdOs()" placeholder="Enter amount" min="0"> Crore + 
                        ASAO - Rs.<input type="number" step="0.01" class="amount24" name="amount24"
                            onchange="calculateThirdOs()" placeholder="Enter amount" min="0"> Crore)
                    </td>
                    <td id="tot2-os">0.00</td>
                </tr>
            </table>
        </div>
        <div class="mlt">
            <div class="side-heading">

                <p style="display:inline">2. Margin in Limit under ASAO</p>
                <p class="units" >(Rs.in Crore)</p>
            </div>
            <table border="1">
                <th>
                   <td colspan="2" id="table-head">Transactions under Normal Limit</td>
                </th>
                <tr>
                    <td>I</td>
                    <td>Normal Credit Limit Sanctioned</td>
                    <td><input type="number" step="0.01" id="limit-mlt" name="limit-mlt" placeholder="Enter amount" min="0"
                    oninput="calculateTotMlt()"></td>
                </tr>
                <tr>
                    <td>II</td>
                    <td>Less XVII A/c Outstanding</td>
                    <td id="used-mlt">0.00</td>
                </tr>

                <tr>
                    <td>III</td>
                    <td>Margin in Limit
                    </td>
                    <td id="tot-mlt">0.00</td>
                </tr>
            </table>
        </div>
        <div class="md">
            <div class="side-heading">

                <p style="display:inline">3. Margin in Disbursements</p>
                <p class="units" >(Rs.in Crore)</p>
            </div>
            <table border="1">
                <tr>
                    <td>I</td>
                    <td>CCB's Total Disbursements from <span class="financial-year">00-00-0000</span> to <label for="as-on-date"></label>
                        <input type="date" class="as-on" id="as-on-date" name="as-on-date"
                            oninput="displayAsOn()" required></td>
                    <td><input type="number" step="0.01" id="mdinput" name="mdinput" placeholder="Enter amount" min="0"
                    oninput="calculateMd()"></td>
                </tr>
                <tr>
                    <td>II</td>
                    <td>90% of disbursements under Additional SAO </td>
                    <td><span id="mdpvalue">0.00</span></td>
                </tr>
                <tr>
                    <td>III</td>
                    <td>XVII A/c Disbursements(<span class="present-year">0000</span>-<span class="next-year">0000</span>): <br>
                    (Normal SAO - Rs.<span class="amount1">0.00</span> Crore + OPP
                        -
                        Rs.<span class="amount2">0.00</span> Crore +
                        DTP - Rs.<span class="amount3">0.00</span> Crore + ASAO - Rs.<span class="amount4">0.00</span> Crore)
                </td>
                    <td id="used-md">0.00</td>
                </tr>
                <tr>
                    <td>IV</td>
                    <td>Margin in Disbursements</td>
                    <td id="tot-md">0.00</td>
                </tr>
            </table>
        </div>
        <div class="mnodc">
            <div class="side-heading">

                <p style="display:inline">4. Margin in NODC</p>
                <p class="units" >(Rs.in Crore)</p>
            </div>
            <table border="1">
                <tr>
                    <td>I</td>
                    <td>NODC as on <span class="as-on">00-00-0000</span></td>
                    <td><input type="number" step="0.01" id="mnodcinput" name="mnodcinput" placeholder="Enter amount" min="0"
                    oninput="calculateMnodc()"></td>
                </tr>
                <tr>
                    <td>II</td>
                    <td>Less total Outstanding:<br>
                    (SAO - Rs.<span class="amount21">0.00</span> Crore + OPP
                        -
                        Rs.<span class="amount22">0.00</span> Crore +
                        DTP - Rs.<span class="amount23">0.00</span> Crore +
                        ASAO - Rs.<span class="amount24">0.00</span> Crore)
                    </td>
                    <td><span id="mnodcless">0.00</span></td>
                </tr>
                <tr>
                    <td>III</td>
                    <td>
                        Margin in NODC
                    </td>
                    <td id="tot-mnodc">0.00</td>
                </tr>
            </table>
        </div>
        <div class="nodcos">
            <div class="side-heading">

                <p style="display:inline">5. APCOB Involvement against Outstanding/NODC at DCC Bank Level</p>
                <p class="units" >(Rs.in Crore)</p>
            </div>
            <table border="1">
                <tr>
                    <td>I</td>
                    <td>Total outstanding at DCC Bank Level</td>
                    <td><input type="number" step="0.01" id="nodcosinput" name="nodcosinput" placeholder="Enter amount" min="0"
                    oninput="calculateNodcos()"></td>
                </tr>
                <tr>
                    <td>II</td>
                    <td>Total Outstanding at APCOB Level
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
                    <td id="nodcos4">0.00</td>
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
                6. The <span class="branch">XYZ Bank</span> DCCB has applied drawal for an amount of Rs. <span
                    class="drawal">0.00</span> Crore under the purpose of Additional SAO.
            </p>
        </div>
        <div class="eligibility">
            <div class="side-heading">

                <p style="display:inline">7. Eligibility is worked out as below:</p>
                <p class="units" >(Rs.in Crore)</p>
            </div>
            <table border="1">
                <tr>
                    <td></td>
                    <td></td>
                    <td>Normal</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>Margin in Limit
                    </td>
                    <td><span id="eli1">0.00</span></td>
                    
                </tr>
                <tr>
                    <td>2</td>
                    <td>
                        Margin in Disbursements
                    </td>
                    <td id="eli2">0.00</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>
                        Margin in NODC
                    </td>
                    <td id="eli3">0.00</td>
                </tr>
                <tr>
                    <td>4</td>
                    <td>
                       Drawal Applied
                    </td>
                    <td id="eli4">0.00</td>
                </tr>
                <tr>
                    <td>5</td>
                    <td>
                    Drawal Eligibility Amount
                    </td>
                    <td id="eli5">0.00</td>
                </tr>
                <tr>
                    <td>6</td>
                    <td>
                    Remaining Eligible amount
                    </td>
                    <td id="eli6">0.00</td>
                </tr>
            </table>
        </div>
        <div class="risktable">
            <div class="side-heading">

                <p style="display:inline">8. Risk rating of the DCCB:</p>
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
                <p style="display:inline">9. Rate of intrest on <span class="ondate">00-00-0000</span>:</p>
            </div>
            <table>
                <tr>
                    <td>
                        <span class=roitype>XYZ</span> Rate of Intrest
                    </td>
                    <td><input type="number" id="roilimit" name="roilimit" placeholder="Enter rate of interest"
                            step="0.01" min="0" onchange="updateRoi()" required>% from NABARD</td>
                </tr>
                <tr>
                    <td>Margin for ASAO</td>
                    <td> <input  type="number" id="throughrate" name="throughrate" placeholder="Enter rate of interest"
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
                10. It is Observed that, the least eligibility worked out is under <span id="under">ABC</span> is Rs.<span id="eliamount">0.00</span> Crore. The DCCB has applied drawal for an amount of Rs.<span class="drawal">0.00</span> Crore.<br><br>
            <p id="final">
            As Per the eligibilty worked out it is for consideration to sanction drawal of Rs.<input type="number" step="0.01" id="finda" name="finda" class="drawal" placeholder="Enter amount" min="0"
            oninput="calculateAfter()">  Crore to the <span class="branch">XYZ</span> DCCB under Additional SAO @ <span class="roitot">0.00</span>% <span id="roitype2"></span>.
            </p>
            </p>
        </div>
    </div>
    <div id="print-button">
     <button type="button" id="download-pdf" onclick="generateDocument()">Download word</button>
     </div> 
     <?php
    include 'assets/components/footer.php';
    ?>
    <script src="/internship_rf_st/assets/js/printasao.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js"></script>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
        crossorigin="anonymous"></script>
    <script src="/internship_rf_st/assets/js/asao_script.js"></script>
</body>
</html>