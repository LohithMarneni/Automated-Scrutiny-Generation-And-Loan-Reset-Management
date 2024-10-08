<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <!-- <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous"> -->
    <link rel="stylesheet" href="/internship_rf_st/assets/css/sto2_style.css">
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
                            <select id="purpose" name="purpose" oninput="updatePurpose()">
                                <!-- <option value="aa-direct">ST Others -AA Direct</option> -->
                                <option value="ST Others Agri and allied-through PACS">ST Others Agri and allied-through
                                    PACS</option>
                                <option value="ST Others Agri and allied-through DIRECT">ST Others Agri and
                                    allied-through DIRECT</option>
                                <option value="ST Others BCTT-through PACS">ST Others BCTT-through PACS</option>
                                <option value="ST Others BCTT-through DIRECT">ST Others BCTT-through DIRECT</option>
                                <option value="ST Others FED-through DIRECT">ST Others FED-through DIRECT</option>
                                <option value="ST Others working capital to PACS">ST Others working capital to PACS
                                </option>
                                <option value="ST Others working capital to AH-through PACS">ST Others working capital
                                    to AH-through PACS</option>
                                <option value="ST Others working capital to AH-through Direct">ST Others working capital
                                    to AH-through Direct</option>
                                <option value="ST Others-concessional">ST Others-concessional</option>
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
                            placeholder="Enter amount" min="0" oninput="updateAmount()">
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
                        VII
                    </td>
                    <td>
                        Date of Disbursement
                    </td>
                    <td>
                        <label for="date-disbursement"></label>
                        <input type="date" id="date-disbursement" name="date-disbursement" oninput="updateDate()"
                            required>
                    </td>

                </tr>
                <tr>
                    <td>VIII</td>
                    <td>Intrest-type</td>
                    <td><label for="interest-type"></label>
                        <select id="interest-type" name="interest-type" required onchange="toggleInterestInputs()">
                            <option value="Fixed">Fixed</option>
                            <option value="Floating">Floating</option>
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
        <div class="ml">
            <div class="side-heading">

                <p style="display:inline">1. Margin in Limit</p>
                <p class="units">(Rs.in Crore)</p>
            </div>
            <table border="1">
                <tr>
                    <td>I</td>
                    <td>Credit Limit Sanctioned for <span class="present">0000</span> - <span class="next">0000</span>
                    </td>
                    <td><input type="number" step="0.01" id="credit" name="credit" placeholder="Enter amount" min="0"
                            oninput="updatemltot()"></td>
                </tr>
                <tr>
                    <td>II</td>
                    <td>Less Disbursements <span class="present">0000</span> - <span class="next">0000</span>:<br>
                        (Normal ST(O) - Rs.<input type="number" step="0.01" class="amount1" name="amount1"
                            onchange="updateml()" placeholder="Enter amount" min="0"> Crore + BCTT
                        -
                        Rs.<input type="number" step="0.01" class="amount2" name="amount2" onchange="updateml()"
                            placeholder="Enter amount" min="0"> Crore +
                        Federations - Rs.<input type="number" step="0.01" class="amount3" name="amount3"
                            onchange="updateml()" placeholder="Enter amount" min="0"> Crore + WC
                        loans to PACS - Rs.<input type="number" step="0.01" class="amount4" name="amount4"
                            onchange="updateml()" placeholder="Enter amount" min="0"> Crore + WC to
                        Animal Husbandry - Rs.<input type="number" step="0.01" class="amount5" name="amount5"
                            onchange="updateml()" placeholder="Enter amount" min="0"> Crore + ST
                        Others Concessional- Rs.<input type="number" step="0.01" class="amount6" name="amount6"
                            onchange="updateml()" placeholder="Enter amount" min="0"> Crore)</td>
                    <td id="used">0.00</td>
                </tr>

                <tr>
                    <td>III</td>
                    <td>Margin in Limit <span class="present">0000</span> - <span class="next">0000</span></td>
                    <td id="ml-tot">0.00</td>
                </tr>
            </table>
        </div>
        <div class="glc">
            <div class="side-heading">

                <p style="display:inline">2. Margin in GLC Total</p>
                <p class="units">(Rs.in Crore)</p>
            </div>
            <table border="1">
                <tr>
                    <td>I</td>
                    <td>GLC at DCCb level for last 12 months</td>
                    <td><input type="number" step="0.01" id="glcinput" name="glcinput" placeholder="Enter amount"
                            min="0" oninput="updateglctot()"></td>
                </tr>
                <tr>
                    <td>II</td>
                    <td>Less Disbursements for last 12 months:<br>
                        (Normal ST(O) - Rs.<input type="number" step="0.01" class="amount12" name="amount12"
                            onchange="updateglc()" placeholder="Enter amount" min="0"> Crore + BCTT
                        -
                        Rs.<input type="number" step="0.01" class="amount22" name="amount22" onchange="updateglc()"
                            placeholder="Enter amount" min="0"> Crore +
                        Federations - Rs.<input type="number" step="0.01" class="amount32" name="amount32"
                            onchange="updateglc()" placeholder="Enter amount" min="0"> Crore + WC
                        loans to PACS - Rs.<input type="number" step="0.01" class="amount42" name="amount42"
                            onchange="updateglc()" placeholder="Enter amount" min="0"> Crore + WC to
                        Animal Husbandry - Rs.<input type="number" step="0.01" class="amount52" name="amount52"
                            onchange="updateglc()" placeholder="Enter amount" min="0"> Crore + ST
                        Others Concessional- Rs.<input type="number" step="0.01" class="amount62" name="amount62"
                            onchange="updateglc()" placeholder="Enter amount" min="0"> Crore)</td>
                    <td id="glcused">0.00</td>
                </tr>

                <tr>
                    <td>III</td>
                    <td>Margin in GLC</td>
                    <td id="glc-tot">0.00</td>
                </tr>
            </table>
        </div>
        <div class="nodc">
            <div class="side-heading">

                <p style="display:inline">3. Margin in NODC -Total</p>
                <p class="units">(Rs.in Crore)</p>
            </div>
            <table border="1">
                <tr>
                    <td>I</td>
                    <td>NODC as on <input type="date" id="nodcdate" name="nodcdate" oninput="ason()"
                    required></td>
                    <td><input type="number" step="0.01" id="nodcinput" name="nodcinput" placeholder="Enter amount"
                            min="0" oninput="updatenodctot()"></td>
                </tr>
                <tr>
                    <td>II</td>
                    <td>Less outstanding:<br>
                        (Normal ST(O) - Rs.<input type="number" step="0.01" class="amount13" name="amount13"
                            onchange="updatenodc()" placeholder="Enter amount" min="0"> Crore + BCTT
                        -
                        Rs.<input type="number" step="0.01" class="amount23" name="amount23" onchange="updatenodc()"
                            placeholder="Enter amount" min="0"> Crore +
                        Federations - Rs.<input type="number" step="0.01" class="amount33" name="amount33"
                            onchange="updatenodc()" placeholder="Enter amount" min="0"> Crore + WC
                        loans to PACS - Rs.<input type="number" step="0.01" class="amount43" name="amount43"
                            onchange="updatenodc()" placeholder="Enter amount" min="0"> Crore + WC to
                        Animal Husbandry - Rs.<input type="number" step="0.01" class="amount53" name="amount53"
                            onchange="updatenodc()" placeholder="Enter amount" min="0"> Crore + ST
                        Others Concessional- Rs.<input type="number" step="0.01" class="amount63" name="amount63"
                            onchange="updatenodc()" placeholder="Enter amount" min="0"> Crore)</td>
                    <td id="nodcused">0.00</td>
                </tr>

                <tr>
                    <td>III</td>
                    <td>Margin in NODC</td>
                    <td id="nodc-tot">0.00</td>
                </tr>
            </table>
        </div>
        <div class="nodct">
            <div class="side-heading">

                <p style="display:inline">4. Margin in NODC - <span class="for">XYZ</span></p>
                <p class="units">(Rs.in Crore)</p>
            </div>
            <table border="1">
                <tr>
                    <td>I</td>
                    <td>NODC as on <span id="nodcason">00-00-0000</span></td>
                    <td><input type="number" step="0.01" id="nodctinput" name="nodctinput" placeholder="Enter amount"
                            min="0" oninput="updatenodcttot()"></td>
                </tr>
                <tr>
                    <td>II</td>
                    <td>Less outstanding:<br>
                        <span id="st" style="display:none">Normal ST(O) - Rs.<input type="number" step="0.01"
                                class="amount14" name="amount14" onchange="updatenodct()" placeholder="Enter amount"
                                min="0"> Crore</span>
                        <span id="bctt" style="display:none">BCTT
                            -
                            Rs.<input type="number" step="0.01" class="amount24" name="amount24"
                                onchange="updatenodct()" placeholder="Enter amount" min="0"> Crore</span>
                        <span id="fed" style="display:none">
                            Federations - Rs.<input type="number" step="0.01" class="amount34" name="amount34"
                                onchange="updatenodct()" placeholder="Enter amount" min="0"> Crore
                        </span>
                        <span id="wcpacs" style="display:none">
                            WC
                            loans to PACS - Rs.<input type="number" step="0.01" class="amount44" name="amount44"
                                onchange="updatenodct()" placeholder="Enter amount" min="0"> Crore
                        </span>
                        <span id="wcah" style="display:none">
                            WC to
                            Animal Husbandry - Rs.<input type="number" step="0.01" class="amount54" name="amount54"
                                onchange="updatenodct()" placeholder="Enter amount" min="0"> Crore
                        </span>
                        <span id="soc" style="display:none">
                            ST
                            Others Concessional- Rs.<input type="number" step="0.01" class="amount64" name="amount64"
                                onchange="updatenodct()" placeholder="Enter amount" min="0"> Crore
                        </span>
                    </td>
                    <td id="nodctused">0.00</td>
                </tr>

                <tr>
                    <td>III</td>
                    <td>Margin in NODC</td>
                    <td id="nodct-tot">0.00</td>
                </tr>
            </table>
        </div>
        <div class="detsto">
            <p>
                5. The <span class="branch">XYZ Bank</span> DCCB has applied drawal for an amount of Rs. <span
                    class="amountx">0.00</span> Crore under <span class="for">XYZ Category</span>.
            </p>
        </div>
        <div class="eligibility">
            <div class="side-heading">

                <p style="display:inline">6. Eligibility is worked out as below:</p>
                <p class="units">(Rs.in Crore)</p>
            </div>
            <table border="1">
                <tr>
                    <td>1</td>
                    <td>Margin in Limit
                    </td>
                    <td><span id="eli1">0.00</span></td>

                </tr>
                <tr>
                    <td>2</td>
                    <td>
                        Margin in GLC for last 12 months
                    </td>
                    <td id="eli2">0.00</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>
                        Margin in NODC(Total)
                    </td>
                    <td id="eli3">0.00</td>
                </tr>
                <tr>
                <tr>
                    <td>4</td>
                    <td>
                        Margin in NODC(<span class="for">XYZ</span>)
                    </td>
                    <td id="eli4">0.00</td>
                </tr>
                <tr>
                    <td>5</td>
                    <td>
                        Least eligible in <span id="under">XYZ</span>
                    </td>
                    <td id="eli5">0.00</td>
                </tr>
                <tr>
                    <td>6</td>
                    <td>
                        Drawal Applied
                    </td>
                    <td class="amountx" id="eli6">0.00</td>
                </tr>
                <tr>
                    <td>7</td>
                    <td>
                        Drawal Eligibility Amount
                    </td>
                    <td id="eli7">0.00</td>
                </tr>
                <tr>
                    <td>8</td>
                    <td>
                    Remaining Eligible amount
                    </td>
                    <td id="eli8">0.00</td>
                </tr>
            </table>
        </div>
        <div class="risktable">
            <div class="side-heading">

                <p style="display:inline">7. Risk rating of the DCCB:</p>
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
                <p style="display:inline">8. Rate of intrest on <span class="ondate">00-00-0000</span>:</p>
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
                    <td>Margin for Through <span id="through">ABC</span></td>
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
                9. Therefore, it is for consideration to sanction the drawal of Rs.<input type="number" step="0.01"
                    id="finda" name="finda" class="drawal" placeholder="Enter amount" min="0"
                    oninput="calculateAfter()">
                as Per the eligibilty worked out to the <span class="branch">xyz</span> DCCB under <span
                    class="for">ABC</span> @ <span class="roitot">0.00</span>%( <span class="roitype">xyz</span>
                rate).
            </p>
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
    <script src="/internship_rf_st/assets/js/printsto.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js"></script>

    <!-- <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
        crossorigin="anonymous"></script> -->
    <script src="/internship_rf_st/assets/js/sto2_script.js"></script>
</body>

</html>