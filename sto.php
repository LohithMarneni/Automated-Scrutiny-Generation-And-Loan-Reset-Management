<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <!-- <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous"> -->
    <link rel="stylesheet" href="/internship_rf_st/assets/css/sto_style.css">
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
    <title>ST(Others) Scrutiny - APCOB</title>
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
                    The Andhra Pradesh State Cooperative Bank Ltd., L&A - ST Operations
                    <span>
                    <input type="number" id="year-input-start" name="year-input-start" style="width: 60px;">
                    </span> -
                   <span> <input type="number" id="year-input-end" name="year-input-end" style="width: 40px;"></span>
                    ST (Others) Drawals to DCC Banks for
                    <span><input type="number" id="drawal-year-start" name="drawal-year-start" style="width: 60px;"></span> -
                    <span><input type="number" id="drawal-year-end" name="drawal-year-end" style="width: 40px;"></span>
                    Drawal -
                    <span><input type="number" id="drawal-number" name="drawal-number" style="width: 50px;"></span>
                </h3>
            </center>
        </div>

        <div class="drawal-details">
        <div class="side-heading">
             <p style="display: inline;">1. Details of the Drawal</p>
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
                        <select id="purpose" name="purpose" oninput="updateMarginThroughTable()">
                            <!-- <option value="aa-direct">ST Others -AA Direct</option> -->
                            <option value="aapacs">ST Others Agri and allied-through PACS</option>
                            <option value="aadir">ST Others Agri and allied-through DIRECT</option>
                            <option value="bcttpacs">ST Others BCTT-through PACS</option>
                            <option value="bcttdir">ST Others BCTT-through DIRECT</option>
                            <option value="feddir">ST Others FED-through DIRECT</option>
                            <option value="wcpacs">ST Others working capital to PACS</option>
                            <option value="wcahpacs">ST Others working capital to AH-through PACS</option>
                            <option value="wcahdir">ST Others working capital to AH-through Direct</option>
                            <option value="stoconcession">ST Others-concessional</option>
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

                        <input type="number" step="0.01" id="wanted-amount" name="wanted-amount"
                            placeholder="Enter amount" min="0" oninput="updateRequired()">
                    </td>
                </tr>
                <tr>
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
                </tr>
                <tr>
                    <td>
                        VII
                    </td>
                    <td>
                        Date of Disbursement
                    </td>
                    <td>
                        <label for="date-disbursement"></label>
                        <input type="date" id="date-disbursement" name="date-disbursement"
                            oninput="toggleInterestInputs()" required>
                    </td>

                </tr>
                <tr>
                    <td>VIII</td>
                    <td>Rate of Interest for present drawal</td>
                    <td>
                        <label for="interest-rate"></label>
                        <input type="number" id="interest-rate" name="interest-rate"
                            placeholder="Enter rate of interest" step="0.01" min="0" onchange="updateMarginThroughTable()" required>

                        <label for="interest-type"></label>
                        <select id="interest-type" name="interest-type" required onchange="toggleInterestInputs()">
                            <option value="fixed">Fixed</option>
                            <option value="floating">Floating</option>
                        </select>

                        <!-- Floating rate additional inputs -->
                        <div id="floating-rate-inputs" style="display: none;">
                            <input type="number" id="base-rate" placeholder="Enter Base rate" step="0.01" min="0"
                                onchange="calculateFloatingRate()">
                            <input type="number" id="margin-rate" placeholder="Enter Margin rate" step="0.01" min="0"
                                onchange="calculateFloatingRate()">
                        </div>
                    </td>
                </tr>
                <tr id="expiry-date-row" style="display: none;">
                    <td>IX</td>
                    <td id="rest_type1">Expiry Date</td>
                    <td id="expiry-date"></td>
                </tr>
                <tr id="reset-frequency-row" style="display: none;">
                    <td>IX</td>
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
        <div class="margin-limit">
            <div class="side-heading">

                <p style="display:inline">2. Margin in Limit</p>
                <p class="units" >(Rs.in Crore)</p>
            </div>
            <table border="1">
                <tr>
                    <td>I</td>
                    <td>Credit Limit Sanctioned</td>
                    <td><input type="number" step="0.01" id="credit" name="credit" placeholder="Enter amount" min="0"
                            oninput="updateSecondTableCalculations()"></td>
                </tr>
                <tr>
                    <td>II</td>
                    <td>Drawals under ST Others to DCCBs from APCOB from <span class="financial-date">00-00-0000</span>:<br>
                        (Normal ST(O) - Rs.<input type="number" step="0.01" class="amount1" name="amount1"
                            onchange="updateSecondTableCalculations()" placeholder="Enter amount" min="0"> Crore + BCTT
                        -
                        Rs.<input type="number" step="0.01" class="amount2" name="amount2"
                            onchange="updateSecondTableCalculations()" placeholder="Enter amount" min="0"> Crore +
                        Federations - Rs.<input type="number" step="0.01" class="amount3" name="amount3"
                            onchange="updateSecondTableCalculations()" placeholder="Enter amount" min="0"> Crore + WC
                        loans to PACS - Rs.<input type="number" step="0.01" class="amount4" name="amount4"
                            onchange="updateSecondTableCalculations()" placeholder="Enter amount" min="0"> Crore + WC to
                        Animal Husbandry - Rs.<input type="number" step="0.01" class="amount5" name="amount5"
                            onchange="updateSecondTableCalculations()" placeholder="Enter amount" min="0"> Crore + ST
                        Others Concessional- Rs.<input type="number" step="0.01" class="amount6" name="amount6"
                            onchange="updateSecondTableCalculations()" placeholder="Enter amount" min="0"> Crore)</td>
                    <td class="used">0.00</td>
                </tr>

                <tr>
                    <td>III</td>
                    <td>Margin in Limit</td>
                    <td id="margin-limit">0.00</td>
                </tr>
            </table>
        </div>
        <div class="margin-disbursements">
            <div class="side-heading">
                <p style="display:inline">3. Margin in Disbursements Total</p>
                <p class="units" >(Rs.in Crore)</p>
            </div>
            <table border="1">
                <tr>
                    <td>I</td>
                    <td>Disbursements (GLC) at DCCB Level from <span class="financial-date">00-00-0000</span> to <label for="as-on"></label>
                        <input type="date" id="as-on" name="as-on"
                            oninput="markAsOn()" required></td>
                    <td>
                        <label for="disburse-input1"></label>
                        <input type="number" step="0.01" name="disburse-input1" placeholder="Enter amount" min="0"
                            id="disburse-input1" oninput="getTotalValue()">
                    </td>
                </tr>
                <tr>
                    <td>II</td>
                    <td>Drawals under ST others to DCCBs from APCOB from <span class="financial-date">00-00-0000</span>
                        (Normal ST(O) - Rs.<span id="dis-amount1">0.00</span> Crore
                        + BCTT - Rs. <span id="dis-amount2">0.00</span> Crore
                        + Federations - Rs. <span id="dis-amount3">0.00</span> Crore
                        + WC loans to PACS - Rs. <span id="dis-amount4">0.00</span> Crore +
                        WC to Animal Husbandry - Rs. <span id="dis-amount5">0.00</span> Crore +
                        ST Others Concessional - Rs. <span id="dis-amount6">0.00</span> Crore)
                    </td>
                    <td id="total-disbursements">0.00</td>
                </tr>
                <tr>
                    <td>III</td>
                    <td>Margin in Disbursements
                    </td>
                    <td id="total-value">0.00</td>
                </tr>
            </table>
        </div>
        <div class="margin-dis-through">
            <div class="side-heading">
                <p style="display:inline">4. Margin in Disbursements of <span class="through"></span></p>
                <p class="units" >(Rs.in Crore)</p>
            </div>
            <table border="1">
                <tr>
                    <td>I</td>
                    <td>Disbursements (GLC) at DCCB Level from <span class="financial-date">00-00-0000</span> to <span
                            class="before-date">00-00-0000</span></td>
                    <td>
                        <label for="disburse-input2"></label>
                        <input type="number" step="0.01" name="disburse-input2" placeholder="Enter amount" min="0"
                            id="disburse-input2" oninput="getTotalValueT()">
                    </td>
                </tr>
                <tr>
                    <td>II</td>
                    <td>Drawals under ST others to DCCBs from APCOB from <span class="financial-date">00-00-0000</span>
                        (
                        <span id="tstothers" style="display: none;">Normal ST(O) - Rs.<input type="number" step="0.01"
                                name="dist-amount1" placeholder="Enter amount" min="0" id="dist-amount1"
                                value="0.00" oninput="updateSecondTableCalculations()"> Crore</span>
                        <span id="tbcct" style="display: none;">BCTT - Rs. <input type="number" step="0.01"
                                value="0.00" name="dist-amount2" placeholder="Enter amount" min="0" id="dist-amount2"
                                oninput="updateSecondTableCalculations()"> Crore</span>
                        <span id="tfed" style="display: none;">Federations - Rs. <span id="dist-amount3">0.00</span>
                            Crore</span>
                        <span id="twcpacs" style="display: none;">WC loans to PACS - Rs. <span
                                id="dist-amount4">0.00</span> Crore </span>
                        <span id="twcah" style="display: none;">WC to Animal Husbandry - Rs. <span
                                id="dist-amount5">0.00</span> Crore </span>
                        <span id="tstc" style="display: none;"> ST Others Concessional - Rs. <span
                                id="dist-amount6">0.00</span> Crore</span>)
                    </td>
                    <td id="total-disburst">0.00</td>
                </tr>
                <tr>
                    <td>III</td>
                    <td>Margin in Disbursements
                    </td>
                    <td id="total-valuet">0.00</td>
                </tr>
            </table>
        </div>

        <div class="data">
            <div class="side-heading">
                <p style="display:inline"></p>
                <p class="units" >(Rs.in Crore)</p>
            </div>
            <table border="1">
                <tr>
                    <td></td>
                    <td>AA NODC As on <span class="before-date">00-00-0000</span> <br>
                        <div class="notation">(1)</div>
                    </td>
                    <td>Known borrowings for NODC <br>
                        <div class="notation">(2)</div>
                    </td>
                    <td>Unknown split of NODC <br>
                        <div class="notation"> (3)=(1)-(2)</div>
                    </td>
                </tr>
                <tr>
                    <td>PACS</td>
                    <td><input type="number" step="0.01" id="sto_pacs" class="pacs" name="amount" placeholder="Enter amount" min="0"
                            oninput="updateLastTableCalculations()"></td>
                    <td><input type="number" step="0.01" id="bor_pacs" class="pacs" name="amount" placeholder="Enter amount" min="0"
                            oninput="updateLastTableCalculations()"></td>
                    <td>
                        <div id="pacs-value">0.00</div>
                    </td>
                </tr>
                <tr>
                    <td>DIR</td>
                    <td><input type="number" step="0.01" class="dir" id="sto_dir" name="amount" placeholder="Enter amount" min="0"
                            oninput="updateLastTableCalculations()"></td>
                    <td><input type="number" step="0.01" class="dir" id="bor_dir" name="amount" placeholder="Enter amount" min="0"
                            oninput="updateLastTableCalculations()"></td>
                    <td>
                        <div id="dir-value">0.00</div>
                    </td>
                </tr>
                <tr>
                    <td>Total</td>
                    <td id="aa">0.00</td>
                    <td id="borrowings">0.00</td>
                    <td>
                        <div id="total-split">0.00</div>
                    </td>
                </tr>
            </table>
        </div>
        <div class="data2">
            <div class="side-heading">
                <p style="display:inline"></p>
                <p class="units" >(Rs.in Crore)</p>
            </div>
            <table border="1">
                <tr>
                    <td><span id="st"> 0.00 </span> - <span id="nodc-borrow">0.00</span>
                        = <span id="diff">0.00</span>
                    </td>
                    <td>Split unknown borrowings (proportionated acc. To unknown split of NODC)<div class="notation">(4)
                        </div>
                    </td>
                    <td>Known borrowings for nodc<div class="notation">(same as (2))</div>
                    </td>
                    <td>Borrowings split<div class="notation"> (5)=(4)+(2)</div>
                    </td>
                </tr>
                <tr>
                    <td>PACS(
                        <!-- <input type="number" step="0.01" min="0" max="100" id="pacsp" placeholder="PACS %" required
                            oninput="updateData2Table(1)"> -->
                        <span id="pacsp">0.00</span>
                        %)
                    </td>
                    <td class="split" id="pacs_val">0.00</td>
                    <td class="nodc-borrowings">0.00</td>
                    <td class="borrow-split">0.00</td>
                </tr>
                <tr>
                    <td>DIR(
                        <!-- <input type="number" step="0.01" min="0" max="100" id="dirp" placeholder="DIR %" required
                            oninput="updateData2Table(2)"> -->
                        <span id="dirp">100.00</span>
                        %)
                    </td>
                    <td class="split" id="dir_val">0.00</td>
                    <td class="nodc-borrowings">0.00</td>
                    <td class="borrow-split">0.00</td>
                </tr>
                <tr>
                    <td>Total</td>
                    <td class="split" id="tot_split">0.00</td>
                    <td class="nodc-borrowings">0.00</td>
                    <td class="borrow-split">0.00</td>
                </tr>
            </table>
        </div>
        <div class="margin-nodc">
            <div class="side-heading">
                <p style="display:inline">5. Margin in NODC(TOTAL)</p>
                <p class="units" >(Rs.in Crore)</p>
            </div>
            <table border="1">
                <tr>
                    <td>I</td>
                    <td>NODC as on
                        <span class="before-date">00-00-0000</span>
                        <!-- <input type="date" id="date" name="date" required oninput="updateDate()"> -->
                    </td>
                    <td><input type="number" step="0.01" id="nodc" name="amount" placeholder="Enter amount" min="0"
                            onchange="updateThirdTableCalculations()"></td>
                </tr>
                <tr>
                    <td>II</td>
                    <td>Less outstanding (Normal ST(O) - Rs. <label for="amt1-input"></label>
                        <input type="number" step="0.01" name="amt1-input" placeholder="Enter amount" min="0"
                            class="amt-input" id="amt1-input" oninput="updateThirdTableInput()">
                        + BCTT - Rs. <label for="amt2-input"></label><input type="number" step="0.01" name="amt2-input"
                            placeholder="Enter amount" min="0" id="amt2-input" class="amt-input"
                            oninput="updateThirdTableInput()">
                        + Federations - Rs. <label for="amt3-input"></label><input type="number" step="0.01"
                            name="amt3-input" placeholder="Enter amount" min="0" id="amt3-input" class="amt-input"
                            oninput="updateThirdTableInput()">
                        + WC loans to PACS - Rs. <label for="amt4-input"></label><input type="number" step="0.01"
                            name="amt4-input" placeholder="Enter amount" min="0" id="amt4-input" class="amt-input"
                            oninput="updateThirdTableInput()"> +
                        WC to Animal Husbandry - Rs. <label for="amt5-input"></label><input type="number" step="0.01"
                            name="amt5-input" placeholder="Enter amount" min="0" id="amt5-input" class="amt-input"
                            oninput="updateThirdTableInput()"> +
                        ST Others Concessional - Rs. <label for="amt6-input"></label><input type="number" step="0.01"
                            name="amt6-input" placeholder="Enter amount" min="0" id="amt6-input" class="amt-input"
                            oninput="updateThirdTableInput()">)
                    </td>
                    <td class="used" id="marx_tot">0.00</td>
                </tr>
                <tr>
                    <td>III</td>
                    <td>Margin in NODC</td>
                    <td id="nodc-limit">0.00</td>
                </tr>
            </table>
        </div>
        <div class="margin-through">
            <div class="side-heading">
                <p style="display:inline">6. Margin in NODC (<span class="through"></span>)</p>
                <p class="units" >(Rs.in Crore)</p>
            </div>
            <table border="1">
                <tr>
                    <td>I</td>
                    <td>NODC as on <span class="before-date">00-00-0000</span> </td>
                    <td><span id="x">0.00</span>
                        <label for="margin-nodc-input"></label>
                        <input type="number" step="0.01" name="margin-nodc-input" placeholder="Enter amount" min="0"
                            id="margin-nodc-input" style="display: none;" oninput="updateMarginThroughTable()">
                    </td>
                </tr>
                <tr>
                    <td>II</td>
                    <td>Less outstanding (Normal ST(O) - Rs.<span id="amt1">0.00</span> Crore
                        + BCTT - Rs. <span id="amt2">0.00</span> Crore
                        + Federations - Rs. <span id="amt3">0.00</span> Crore
                        + WC loans to PACS - Rs. <span id="amt4">0.00</span> Crore +
                        WC to Animal Husbandry - Rs. <span id="amt5">0.00</span> Crore +
                        ST Others Concessional - Rs. <span id="amt6">0.00</span> Crore)
                    </td>
                    <td id="y">0.00</td>
                </tr>
                <tr>
                    <td>III</td>
                    <td>Margin in NODC
                    </td>
                    <td id="nodc-margin">0.00</td>
                </tr>
            </table>
        </div>

        <div class="details">
            <p id="details6">
                7. The <span class="branch">XYZ Bank</span> DCCB has applied drawal for an amount of Rs. <span
                    class="required">0.00</span> Crore under <span class="category">XYZ Category</span>.
            </p>
        </div>
        <div class="checking">
            <p id="checking7">
                8. Eligibility is worked out as below:
            </p>
            <ul>
                <li>Margin in limit : <span id="ml7">0.00</span> Crore</li>
                <li>Margin in Disbursements(TOTAL): <span id="mdt8">0.00</span> Crore</li>
                <li>Margin in Disbursements(<span class="through"></span>): <span id="mdthrough8">0.00</span> Crore</li>
                <li>Margin in NODC(Total) : <span id="mnodct7">0.00</span> Crore</li>
                <li>Margin in NODC(<span class="through"></span>) : <span class="mnodcp7">0.00</span> Crore</li>
                <li>Drawal Applied : <span class="required">0.00</span> Crore</li>
                <li>Drawal Eligible : <span class="deligible">0.00</span> Crore</li>
                <li>Eligible amount after Scrutiny : <span id="after-scrutiny">0.00</span> Crore</li>
            </ul>
        </div>
        <div class="result">
            <p id="result8">
                9. The least eligibility worked out is <span id="under">ABC</span> is Rs. <span id="least-eligible">0.00</span>
                Crore but the DCCB has applied for drawal for an amount of Rs. <span class="required">0.00</span>
                Crore.
            </p>
        </div>
        <div class="confirmation">
            <p id="confirmation9">
                10. Therefore, it is for consideration to sanction the drawal of Rs.<input type="number" step="0.01" id="finda" name="finda" class="required" placeholder="Enter amount" min="0"
                oninput="calculateAfter()"> Crore
                to the <span class="branch">XYZ Bank</span> under <span class="category">XYZ Category</span>
                at <span id="type"></span> rate of intrest at <span id="type-value">0.00</span> AS DISBURSEMENTS ARE
                DONE.
            </p>
        </div>
    </div>
    <!-- <div id="print-button">
    <form id="reportForm" method="post" action="generate_word.php">
            <textarea id="htmlContent" name="htmlContent" style="display: none;"></textarea>
            <button type="button" id="download-pdf" onclick="printWord()">Download word</button>
            </form>
        </div> -->
        <div id="print-button">
     <button type="button" id="download-pdf" onclick="generateDocument()">Download word</button>
     </div> 

    <?php
    include 'assets/components/footer.php';
    ?>
    <script>
        // Initial call to set up the correct visibility on page load
        document.addEventListener("DOMContentLoaded", function () {
            const decimalInputs = document.querySelectorAll(
    'input[type="number"][step="0.01"]'
  );
  const integerInputs = document.querySelectorAll(
    'input[type="number"]:not([step="0.01"])'
  );

  decimalInputs.forEach((input) => {
    input.addEventListener("blur", formatDecimalInput);
  });

  integerInputs.forEach((input) => {
    input.addEventListener("blur", formatIntegerInput);
  });

  function formatDecimalInput(event) {
    let value = parseFloat(event.target.value);

    if (!isNaN(value)) {
      event.target.value = value.toFixed(2);
    }
    else{
      event.target.value =0.00.toFixed(2);
    }
  }

  function formatIntegerInput(event) {
    let value = parseInt(event.target.value, 10);

    if (isNaN(value) || value < 0) {
      event.target.value = "";
    } else {
      event.target.value = value;
    }
  }
            const currentYear = new Date().getFullYear();
            const nextYear = currentYear + 1;
            //   console.log(currentYear);
            document.getElementById("drawal-year-start").value = currentYear;
            document.getElementById("year-input-start").value = currentYear;
            document.getElementById("year-input-end").value = nextYear;
            document.getElementById("drawal-year-end").value = nextYear;
            //   const defaultCredit=700.00;
            //  console.log("Hello");
            //   document.getElementById("credit").value=defaultCredit.toFixed(2);
            // var confirmation9 = document.getElementById("confirmation9");
            // confirmation9.style.display = "none";
            var dateInput = document.getElementById("date-disbursement");
            var today = new Date().toISOString().split("T")[0];
            dateInput.value = today;
            toggleInterestInputs();
            document.getElementById("purpose").value = "";
            document.getElementById("districts").value = "";
            document.getElementById('interest-type').value="";
            //  console.log('Initial x value set to:', document.getElementById("x").textContent);
            document.getElementById("x").textContent = "0.00";
            toggleTablesAndInput(); // Initial call to set the visibility
            for (let i = 0; i < 5; i++) {
                document.getElementsByClassName("financial-date")[i].textContent = getFinancialYearStartDate();
            }
            updateSecondTableCalculations();
        });
    </script>
    <script src="/internship_rf_st/assets/js/printword.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js"></script>

    <!-- <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
        crossorigin="anonymous"></script> -->
    <script src="/internship_rf_st/assets/js/sto_script.js"></script>
</body>

</html>