document.addEventListener("DOMContentLoaded", function() {
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
    document.getElementById("riskd").value="Low Risk";
    document.getElementById("premium").value=0.00.toFixed(2);
    document.getElementById("beforefdate").value=getFinancialYearEndDate();
    document.getElementById("drawal-year-start").value = currentYear;
    document.getElementById("year-input-start").value = currentYear;
    document.getElementById("year-input-end").value = nextYear;
    document.getElementById("drawal-year-end").value = nextYear;
    document.getElementById("districts").value = "";
    document.getElementById("purpose").value = "";
    document.getElementById("statusDropdown").value = "";
    document.getElementById("confirmationDropdown").value = "";
    document.getElementById("throughrate").value=0.60.toFixed(2);
    document.getElementById('risk').value=0.00.toFixed(2);
    var dateInput = document.getElementById("date-disbursement");
            var today = new Date().toISOString().split("T")[0];
            dateInput.value = today;
            document.getElementsByClassName("ondate")[0].textContent=formatDate(today);
    document.getElementsByClassName("financial-year")[0].textContent=getFinancialYearStartDate();
    displayYear();
    document.getElementById("purpose").addEventListener("change", function() {
        var purpose = this.value;
        if (purpose === "ASAO Fixed" || purpose === "ASAO Floating") {
            fetchRoiValues(purpose);
        }
    });

function fetchRoiValues(purpose) {
    // var xhr = new XMLHttpRequest();
    // xhr.open("GET", "/internship_rf_st/assets/components/get_roi.php", true);
    // xhr.onreadystatechange = function() {
    //     if (xhr.readyState === 4 && xhr.status === 200) {
    //         var response = JSON.parse(xhr.responseText);
    //         if (response.error) {
    //             console.error(response.error);
    //         } else {
    //             let m=parseFloat(response.base) + parseFloat(response.margin);
    //             document.getElementById("interest-rate").value = purpose === "ASAO Fixed" ? response.fixed : (m.toFixed(2));
    //             document.getElementById("base-rate").value = response.base;
    //             document.getElementById("margin-rate").value = response.margin;

    //             if (purpose === "ASAO Floating") {
    //                 document.getElementById("floating-rate-inputs").style.display = "block";
    //             } else {
    //                 document.getElementById("floating-rate-inputs").style.display = "none";
    //             }
    //             updateRoi();
    //         }
    //     }
    // };
    // xhr.send();
    const roiType = document.getElementsByClassName('roitype')[0].textContent.toLowerCase();
    const scrutinyType = 'asao'; // or retrieve this value dynamically if needed

    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/internship_rf_st/assets/components/get_roi.php?type=' + roiType + '&scrutiny=' + scrutinyType, true);

    xhr.onload = function() {
        if (xhr.status === 200) {
            // Assuming the response is a plain text with ROI value
            var roiValue = parseFloat(xhr.responseText.trim());
            if (!isNaN(roiValue)) {
                document.getElementById('roilimit').value = roiValue.toFixed(2);
                updateRoi();
            } else {
                console.error('Error: ROI value is not a number');
            }
        } else {
            console.error('Error fetching ROI: ' + xhr.statusText);
        }
    };

    xhr.onerror = function() {
        console.error('Network error');
    };

    xhr.send();
}
    updateRoi();
});
function getFinancialYearEndDate() {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    let financialYearEndDate;

    if (currentMonth >= 3) { // April (3) to December (11)
        financialYearEndDate = new Date(currentYear, 2, 31); // March 31 of the next year
    } else { // January (0) to March (2)
        financialYearEndDate = new Date(currentYear-1, 2, 31); // March 31 of the current year
    }

    // Format the date as yyyy-mm-dd
    const year = financialYearEndDate.getFullYear();
    const month = String(financialYearEndDate.getMonth() + 1).padStart(2, '0');
    const day = String(financialYearEndDate.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}
function toggleFloatingRates() {
    const selectedOption = document.getElementById("purpose").value;

    const expiryDateRow = document.getElementById("expiry-date-row");
    const resetFrequencyRow = document.getElementById("reset-frequency-row");
    // const interestType = document.getElementById("intrest-type");
    const interestType=document.getElementsByClassName("roitype")[0];
    const dateDisbursement = document.getElementById("date-disbursement").value;
    clearResetDates();
    
    if (selectedOption === "ASAO Fixed") {
        expiryDateRow.style.display = "table-row";
        resetFrequencyRow.style.display = "none";
        // interestType.textContent = "(Fixed)";
        interestType.textContent = "Fixed";
        document.getElementById("roitype2").textContent="(Fixed)";
        if (dateDisbursement) {
            const disbursementDate = new Date(dateDisbursement);
            const expiryDate = new Date(disbursementDate);
            expiryDate.setFullYear(expiryDate.getFullYear() + 1);
            const formattedExpiryDate = formatDate(expiryDate.toISOString().split("T")[0]);
            document.getElementById("expiry-date").textContent = formattedExpiryDate;
        }
    } else if (selectedOption === "ASAO Floating") {
        resetFrequencyRow.style.display = "table-row";
        expiryDateRow.style.display = "none";
        // interestType.textContent = "(Floating)";
        interestType.textContent = "Floating";
        document.getElementById("roitype2").textContent= "(Floating)";
        if (dateDisbursement) {
            const disbursementDate = new Date(dateDisbursement);
            
            // Calculate reset dates after 91, 181, 271, and 361 days
            const resetDates = [];
            for (let i = 90; i <= 360; i += 90) {
                const resetDate = new Date(disbursementDate);
                resetDate.setDate(resetDate.getDate() + i);
                resetDates.push(resetDate);
            }
            
            // Format and display reset dates
            for (let j = 0; j < resetDates.length; j++) {
                const formattedResetDate = formatDate(resetDates[j].toISOString().split("T")[0]);
                document.getElementById(`date${j + 1}`).textContent = formattedResetDate;
            }
            
            // Calculate and display expiry date
            const expiryDate = new Date(disbursementDate);
            expiryDate.setFullYear(expiryDate.getFullYear() + 1);
            const formattedExpiryDate = formatDate(expiryDate.toISOString().split("T")[0]);
            document.getElementById("date5").textContent = formattedExpiryDate;
        }
    }
}
function updateRoi(){
    const roiLimit = parseFloat(document.getElementById('roilimit').value) || 0.00;
    const throughRate = parseFloat(document.getElementById('throughrate').value) || 0.00;
    const risk = parseFloat(document.getElementById('risk').value) || 0.00;
    const totalRoi = roiLimit + throughRate + risk;

    document.getElementById('totroi').textContent = totalRoi.toFixed(2);
    document.querySelectorAll('.roitot').forEach((element) => {
        element.textContent = totalRoi.toFixed(2);
    });
}
function clearResetDates() {
    for (let j = 1; j <= 5; j++) {
        document.getElementById(`date${j}`).textContent = "";
    }
}

function formatDate(dateString) {
    const [year, month, day] = dateString.split("-");
    return `${day}-${month}-${year}`;
}
function displayDate(){
    const today=formatDate(document.getElementById("date-disbursement").value);
    document.getElementsByClassName("ondate")[0].textContent=today;
    toggleFloatingRates();
}
// function calculateFloatingRate() {
//     const baseRate = parseFloat(document.getElementById("base-rate").value) || 0;
//     const marginRate =
//       parseFloat(document.getElementById("margin-rate").value) || 0;
//     const totalRate = baseRate + marginRate;
//     document.getElementById("interest-rate").value = totalRate.toFixed(2);
//     updateRoi();
//   }
function displayYear(){
      // Get the current year
      var currentYear = new Date().getFullYear();
    
      // Calculate the previous and next years
      var previousYear = currentYear - 1;
      var nextYear = currentYear + 1;
      
      // Update the HTML elements with the calculated years
      document.getElementById('previous-year').textContent = previousYear;
      document.querySelectorAll('.present-year').forEach(function(element) {
          element.textContent = currentYear;
      });
      document.querySelectorAll('.next-year').forEach(function(element) {
        element.textContent = nextYear;
    });
}
function calculateThirdOs(){
    const amount231=parseFloat(document.getElementsByClassName("amount21")[0].value)||0.00;
    const amount232=parseFloat(document.getElementsByClassName("amount22")[0].value)||0.00;
    const amount233=parseFloat(document.getElementsByClassName("amount23")[0].value)||0.00;
    const amount234=parseFloat(document.getElementsByClassName("amount24")[0].value)||0.00;
    document.getElementsByClassName("amount21")[1].textContent=amount231.toFixed(2);
    document.getElementsByClassName("amount22")[1].textContent=amount232.toFixed(2);
    document.getElementsByClassName("amount23")[1].textContent=amount233.toFixed(2);
    document.getElementsByClassName("amount24")[1].textContent=amount234.toFixed(2);
    let totValue=amount231+amount232+amount233+amount234;
    const tot2Os=document.getElementById("tot2-os");
    document.getElementById("mnodcless").textContent=totValue.toFixed(2);
    calculateMnodc();
    document.getElementById("nodcos2").textContent=totValue.toFixed(2);
    document.getElementById("nodcosam1").textContent=totValue.toFixed(2);
    calculateNodcos();
    tot2Os.textContent=totValue.toFixed(2);
    calculateTotOs();
}
function calculateSecOs(){
    const amount221=parseFloat(document.getElementsByClassName("amount1")[0].value)||0.00;
    document.getElementsByClassName("amount1")[1].textContent=amount221.toFixed(2);
    const amount222=parseFloat(document.getElementsByClassName("amount2")[0].value)||0.00;
    document.getElementsByClassName("amount2")[1].textContent=amount222.toFixed(2);
    const amount223=parseFloat(document.getElementsByClassName("amount3")[0].value)||0.00;
    document.getElementsByClassName("amount3")[1].textContent=amount223.toFixed(2);
    const amount224=parseFloat(document.getElementsByClassName("amount4")[0].value)||0.00;
    document.getElementsByClassName("amount4")[1].textContent=amount224.toFixed(2);
    let totValue=amount221+amount222+amount223+amount224;
    const usedOs=document.getElementById("used-os");
    usedOs.textContent=totValue.toFixed(2);
    document.getElementById("used-mlt").textContent=totValue.toFixed(2);
    document.getElementById("used-md").textContent=totValue.toFixed(2);
    calculateTotOs();
    calculateMd();
    calculateTotMlt();
}

function calculateTotOs(){
    const totOs=document.getElementById("tot-os");
    const totalValue=(parseFloat(document.getElementById("tot2-os").textContent)||0.00)-(parseFloat(document.getElementById("used-os").textContent)||0.00)
    totOs.textContent=totalValue.toFixed(2);
}
function calculateTotMlt(){
    const totalMlt=(parseFloat(document.getElementById("limit-mlt").value))-(parseFloat(document.getElementById("used-mlt").textContent))
    document.getElementById("tot-mlt").textContent=totalMlt.toFixed(2);
    document.getElementById("eli1").textContent=totalMlt.toFixed(2);
    calculateEligibility();
}
function updateBranch(){
    document.getElementsByClassName("branch")[0].textContent=document.getElementById("districts").value;
    document.getElementsByClassName("branch")[1].textContent=document.getElementById("districts").value;
    document.getElementsByClassName("branch")[2].textContent=document.getElementById("districts").value;
    updateCredit();
}
function updateCredit() {
    var district = document.getElementById("districts").value; // Get selected district
    var xhr = new XMLHttpRequest();
    
    // Prepare and send GET request to get_asao.php with district parameter
    xhr.open("GET", "/internship_rf_st/assets/components/get_asao.php?district=" + encodeURIComponent(district), true);
    
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var response = JSON.parse(xhr.responseText); // Parse JSON response
            document.getElementById("limit-mlt").value = response.asao.toFixed(2); // Update limit-mlt element
        }
    };
    
    xhr.send(); // Send the request
}
function displayAsOn(){
    const date=formatDate(document.getElementsByClassName("as-on")[0].value)
    // for(let i=;i<1;i++){
        document.getElementsByClassName("as-on")[1].textContent=date;
    // }
}
function calculateMd(){
    const input1=parseFloat(document.getElementById("mdinput").value)||0.00;
    let inputp=(input1*90)/100;
    document.getElementById("mdpvalue").textContent=inputp.toFixed(2);
    let val=inputp.toFixed(2)-parseFloat(document.getElementById("used-md").textContent);
    document.getElementById("tot-md").textContent=val.toFixed(2);
    document.getElementById("eli2").textContent=val.toFixed(2);
    calculateEligibility();
}
function getFinancialYearStartDate() {
    let today = new Date();
    let year = today.getFullYear();
    
    // Financial year starts on April 1st
    let financialYearStart = new Date(year, 3, 1);
    
    // If today's date is before April 1st, the financial year started on April 1st of the previous year
    if (today < financialYearStart) {
        financialYearStart = new Date(year - 1, 3, 1);
    }
    
    // Formatting the date to "dd-mm-yyyy"
    let day = String(financialYearStart.getDate()).padStart(2, '0');
    let month = String(financialYearStart.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed in JavaScript
    let formattedDate = `${day}-${month}-${financialYearStart.getFullYear()}`;
    
    return formattedDate;
  }
function calculateMnodc(){
    const input1=parseFloat(document.getElementById("mnodcinput").value)||0.00;
    document.getElementById("nodcos4").textContent=input1.toFixed(2);
    calculateNodcos();
    let val=input1.toFixed(2)-parseFloat(document.getElementById("mnodcless").textContent);
    document.getElementById("tot-mnodc").textContent=val.toFixed(2);
    document.getElementById("eli3").textContent=val.toFixed(2);
    calculateEligibility();
}
function addDrawalAmount(){
    const val=document.getElementsByClassName("drawal")[0].value;
    // console.log(val);
    document.getElementsByClassName("drawal")[1].textContent=val;
    document.getElementsByClassName("drawal")[2].textContent=val;
    document.getElementsByClassName("drawal")[3].textContent=val;
    // document.getElementsByClassName("drawal")[4].value=val;
    document.getElementById("eli4").textContent=val;
    document.getElementById("nodcosam2").textContent=val;
    calculateNodcos();
    calculateEligibility();
}
function calculateNodcos() {
    const nodcos2 = parseFloat(document.getElementById("nodcos2").textContent);
    const nodcosInput = parseFloat(document.getElementById("nodcosinput").value) || 0.00;
    const nodcos4 = parseFloat(document.getElementById("nodcos4").textContent) || 0.00;
    const drawal1 = parseFloat(document.getElementsByClassName("drawal")[1].textContent);

    const p1 = document.getElementById("nodcos3");
    let value = (nodcos2 / nodcosInput) * 100;
    p1.textContent = isFinite(value) ? value.toFixed(2) : "0.00";

    const p2 = document.getElementById("nodcos5");
    value = (nodcos2 / nodcos4) * 100;
    p2.textContent = isFinite(value) ? value.toFixed(2) : "0.00";

    const r7 = document.getElementById("nodcos7");
    value = nodcos2 + drawal1;
    r7.textContent = value.toFixed(2);

    const r8 = document.getElementById("nodcos8");
    value = (parseFloat(r7.textContent) / nodcos4) * 100;
    r8.textContent = isFinite(value) ? value.toFixed(2) : "0.00";
}
function calculateEligibility() {
    const val1 = parseFloat(document.getElementById("eli1").textContent);
    const val2 = parseFloat(document.getElementById("eli2").textContent);
    const val3 = parseFloat(document.getElementById("eli3").textContent);
    const val4 = parseFloat(document.getElementById("eli4").textContent); // Assuming this value is used somewhere
    let val = Math.min(val1, val2, val3);
    const under=document.getElementById("under");
    under.textContent="";
    if(val===val1){
        under.textContent="Margin in Limit";
    }
    else if(val===val2){
        under.textContent="Margin in Disbursements";
    }
    else if(val===val3){
        under.textContent="Margin in NODC";
    }
    const element = document.getElementById("eliamount");
    element.textContent = val.toFixed(2);
    let drawal = parseFloat(document.getElementsByClassName("drawal")[0].value);
    document.getElementById("eli5").textContent=Math.min(val,drawal).toFixed(2);
    document.getElementsByClassName("drawal")[4].value =drawal.toFixed(2);
    document.getElementsByClassName("drawal")[4].value =drawal.toFixed(2);
    document.getElementsByClassName("drawal")[3].textContent =drawal.toFixed(2);
    document.getElementsByClassName("drawal")[2].textContent =drawal.toFixed(2);
    document.getElementsByClassName("drawal")[1].textContent =drawal.toFixed(2);
    document.getElementById("eli4").textContent =drawal.toFixed(2);
    let temp=val.toFixed(2)-(Math.floor(val).toFixed(2));
    // console.log(document.getElementsByClassName("drawal")[4].textContent);
    if (drawal -val> 0.00) {
        document.getElementsByClassName("drawal")[4].value = Math.floor(val).toFixed(2);
        // document.getElementsByClassName("drawal")[3].textContent=Math.floor(val).toFixed(2);
        // document.getElementsByClassName("drawal")[2].textContent=Math.floor(val).toFixed(2);
        // document.getElementsByClassName("drawal")[1].textContent=Math.floor(val).toFixed(2);
        // document.getElementById("eli4").textContent=Math.floor(val).toFixed(2);
        document.getElementById("eliamount").textContent=val.toFixed(2);
        // console.log(document.getElementsByClassName("drawal")[4].value);
    }
    temp=val.toFixed(2)-parseFloat(document.getElementsByClassName("drawal")[4].value);
    document.getElementById("eli6").textContent=temp.toFixed(2);
}

// Ensure that `drawal` is a value and the 5th element with the class "drawal" exists
// Also, make sure the correct elements and classes are used in your HTML
function calculateAfter(){
    const val1 = parseFloat(document.getElementById("eli1").textContent);
    const val2 = parseFloat(document.getElementById("eli2").textContent);
    const val3 = parseFloat(document.getElementById("eli3").textContent);
    // const val4 = parseFloat(document.getElementById("eli4").textContent); // Assuming this value is used somewhere
    let val = Math.min(val1, val2, val3);
    const under=document.getElementById("under");
    under.textContent="";
    if(val===val1){
        under.textContent="Margin in Limit";
    }
    else if(val===val2){
        under.textContent="Margin in Disbursements";
    }
    else if(val===val3){
        under.textContent="Margin in NODC";
    }
    const val22=parseFloat(document.getElementsByClassName("drawal")[4].value)||0.00;
    let temp=val.toFixed(2)-val22.toFixed(2);
    document.getElementById("eli6").textContent=temp.toFixed(2);
}
