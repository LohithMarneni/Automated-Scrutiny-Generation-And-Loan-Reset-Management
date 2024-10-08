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
    document.querySelectorAll('.present').forEach((element) => {
        element.textContent = currentYear;
    });
    
    document.querySelectorAll('.next').forEach((element) => {
        element.textContent = nextYear;
    });
    document.getElementById("riskd").value="Low Risk";
    document.getElementById("premium").value=0.00.toFixed(2);
    document.getElementById("beforefdate").value=getFinancialYearEndDate();
    document.getElementById('risk').value=0.00.toFixed(2);
    document.getElementById("drawal-year-start").value = currentYear;
    document.getElementById("year-input-start").value = currentYear;
    document.getElementById("statusDropdown").value="";
    document.getElementById("confirmationDropdown").value="";
    document.getElementById("year-input-end").value = nextYear;
    document.getElementById("drawal-year-end").value = nextYear;
    var dateInput = document.getElementById("date-disbursement");
    var today = new Date().toISOString().split("T")[0];
    dateInput.value = today;
    document.getElementById("purpose").value = "";
    document.getElementById("districts").value = "";
    document.getElementById("interest-type").value = "";
    // document.getElementById('interest-type').value="";
    updateDate();
  
});
function updateCredit() {
    var district = document.getElementById("districts").value;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/internship_rf_st/assets/components/get_credit.php?district=" + encodeURIComponent(district), true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var response = JSON.parse(xhr.responseText);
            if (response.osao !== null && response.osao !== undefined) {
                let l = parseFloat(response.osao) || 0; // Ensure l is a number
                document.getElementById("credit").value = l.toFixed(2);
            } else {
                document.getElementById("credit").value = "0.00"; // Default value if osao is null or undefined
            }
            updateml();
        }
    };
    xhr.send();
}
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
function updateBranch(){
    // console.log("Branch");
    const branch=document.getElementById("districts").value;
    document.querySelectorAll('.branch').forEach((element) => {
        element.textContent = branch;
    });
    updateCredit();
}
function updatePurpose(){
    // console.log("purpose");
    const purpose=document.getElementById("purpose").value;
    document.querySelectorAll('.for').forEach((element) => {
        element.textContent = purpose;
    });
    if(purpose==="ST Others Agri and allied-through PACS"|| purpose==="ST Others BCTT-through PACS"||purpose==="ST Others working capital to PACS"||purpose==="ST Others working capital to AH-through PACS"){
        document.getElementById("throughrate").value=0.60.toFixed(2);
        document.getElementById("through").textContent="PACS";
    }
    else if(purpose==="ST Others Agri and allied-through DIRECT"|| purpose==="ST Others BCTT-through DIRECT"||purpose==="ST Others FED-through DIRECT"||purpose==="ST Others working capital to AH-through Direct"){
        document.getElementById("throughrate").value=1.00.toFixed(2);
        document.getElementById("through").textContent="Direct";
    }
    else if(purpose==="ST Others-concessional"){
        document.getElementById("throughrate").value=0.60.toFixed(2);
        document.getElementById("through").textContent="ST Others-concessional";
    }
    updateRoi();
    updatenodct();
}
function updateAmount() {
    // console.log("amount");
    const amount = parseFloat(document.getElementById("wanted-amount").value);
    if (!isNaN(amount)) {
        document.querySelectorAll('.amountx').forEach((element) => {
            element.textContent = amount.toFixed(2);
        });
        document.getElementById("finda").value = amount.toFixed(2);
    } 
    calculateEli();
}

function updateRoi() {
    const roiLimit = parseFloat(document.getElementById('roilimit').value) || 0.00;
    const throughRate = parseFloat(document.getElementById('throughrate').value) || 0.00;
    const risk = parseFloat(document.getElementById('risk').value) || 0.00;
    const totalRoi = roiLimit + throughRate + risk;

    document.getElementById('totroi').textContent = totalRoi.toFixed(2);
    document.querySelectorAll('.roitot').forEach((element) => {
        element.textContent = totalRoi.toFixed(2);
    });

}

function updateDate(){
    // console.log("Date");
    const Date=formatDate(document.getElementById("date-disbursement").value);
    document.getElementsByClassName("ondate")[0].textContent=Date;
    toggleInterestInputs();
}
function ason(){
    const ason=formatDate(document.getElementById("nodcdate").value);
    document.getElementById("nodcason").textContent=ason;
}
function toggleInterestInputs() {
    // console.log("toggle");
    const interestType = document.getElementById("interest-type").value.toLowerCase(); // Make sure it's lowercase
    const expiryDateRow = document.getElementById("expiry-date-row");
    const resetFrequencyRow = document.getElementById("reset-frequency-row");
    const dateDisbursement = document.getElementById("date-disbursement").value;
    
    document.querySelectorAll('.roitype').forEach((element) => {
        element.textContent = interestType;
    });

    if (interestType === "fixed") {
        expiryDateRow.style.display = "table-row"; // Show expiry date row
        resetFrequencyRow.style.display = "none"; // Hide reset frequency row
        // document.getElementById("throughrate").value=0.60;
        if (dateDisbursement) {
            const disbursementDate = new Date(dateDisbursement);
            const expiryDate = new Date(disbursementDate);
            expiryDate.setFullYear(expiryDate.getFullYear() + 1);
            const formattedExpiryDate = formatDate(expiryDate.toISOString().split("T")[0]);
            document.getElementById("expiry-date").textContent = formattedExpiryDate;
        }
    } else if (interestType === "floating") {
        expiryDateRow.style.display = "none"; // Hide expiry date row
        resetFrequencyRow.style.display = "table-row"; // Show reset frequency row
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
    getRoi();
}

function getRoi() {
    const roiType = document.getElementById('interest-type').value.toLowerCase();
    const scrutinyType = 'sto'; // or retrieve this value dynamically if needed
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/internship_rf_st/assets/components/get_roi.php?type=' + roiType + '&scrutiny=' + scrutinyType, true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            // console.log('Response:', xhr.responseText); // Log the response for debugging

            // Assuming the response is a plain text with ROI value
            var roiValue = parseFloat(xhr.responseText.trim());
            if (!isNaN(roiValue)) {
                document.getElementById('roilimit').value = roiValue.toFixed(2);
                updateRoi();
            } else {
                // console.error('Error: ROI value is not a number');
            }
        } else {
            // console.error('Error fetching ROI: ' + xhr.statusText);
        }
    };

    xhr.onerror = function() {
        // console.error('Network error');
    };

    xhr.send();
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-GB', options).replace(/\//g, '-');
}

function updateml() {
    const amount1 = parseFloat(document.getElementsByClassName("amount1")[0].value) || 0.00;
    const amount2 = parseFloat(document.getElementsByClassName("amount2")[0].value) || 0.00;
    const amount3 = parseFloat(document.getElementsByClassName("amount3")[0].value) || 0.00;
    const amount4 = parseFloat(document.getElementsByClassName("amount4")[0].value) || 0.00;
    const amount5 = parseFloat(document.getElementsByClassName("amount5")[0].value) || 0.00;
    const amount6 = parseFloat(document.getElementsByClassName("amount6")[0].value) || 0.00;

    const val = amount1 + amount2 + amount3 + amount4 + amount5 + amount6;
    if (isNaN(val)) {
        val = 0.00;
    }
    document.getElementById("used").textContent = val.toFixed(2);
    updatemltot();
}

function updatemltot() {
    const mlinput = parseFloat(document.getElementById("credit").value) || 0.00;
    const used = parseFloat(document.getElementById("used").textContent) || 0.00;

    let val = mlinput - used;
    if (isNaN(val)) {
        val = 0.00;
    }
    document.getElementById("ml-tot").textContent = val.toFixed(2);
    calculateEli();
}
function updateglc() {
    const amount1 = parseFloat(document.getElementsByClassName("amount12")[0].value) || 0.00;
    const amount2 = parseFloat(document.getElementsByClassName("amount22")[0].value) || 0.00;
    const amount3 = parseFloat(document.getElementsByClassName("amount32")[0].value) || 0.00;
    const amount4 = parseFloat(document.getElementsByClassName("amount42")[0].value) || 0.00;
    const amount5 = parseFloat(document.getElementsByClassName("amount52")[0].value) || 0.00;
    const amount6 = parseFloat(document.getElementsByClassName("amount62")[0].value) || 0.00;

    const val = amount1 + amount2 + amount3 + amount4 + amount5 + amount6;
    if (isNaN(val)) {
        val = 0.00;
    }
    document.getElementById("glcused").textContent = val.toFixed(2);
    updateglctot();
}

function updateglctot() {
    const mlinput = parseFloat(document.getElementById("glcinput").value) || 0.00;
    const used = parseFloat(document.getElementById("glcused").textContent) || 0.00;

    let val = mlinput - used;
    if (isNaN(val)) {
        val = 0.00;
    }
    document.getElementById("glc-tot").textContent = val.toFixed(2);
    calculateEli();
}

function updatenodc() {
    const amount1 = parseFloat(document.getElementsByClassName("amount13")[0].value) || 0.00;
    const amount2 = parseFloat(document.getElementsByClassName("amount23")[0].value) || 0.00;
    const amount3 = parseFloat(document.getElementsByClassName("amount33")[0].value) || 0.00;
    const amount4 = parseFloat(document.getElementsByClassName("amount43")[0].value) || 0.00;
    const amount5 = parseFloat(document.getElementsByClassName("amount53")[0].value) || 0.00;
    const amount6 = parseFloat(document.getElementsByClassName("amount63")[0].value) || 0.00;

    const val = amount1 + amount2 + amount3 + amount4 + amount5 + amount6;
    if (isNaN(val)) {
        val = 0.00;
    }
    document.getElementById("nodcused").textContent = val.toFixed(2);
    updatenodctot();
}

function updatenodctot() {
    const mlinput = parseFloat(document.getElementById("nodcinput").value) || 0.00;
    const used = parseFloat(document.getElementById("nodcused").textContent) || 0.00;

    let val = mlinput - used;
    if (isNaN(val)) {
        val = 0.00;
    }
    document.getElementById("nodc-tot").textContent = val.toFixed(2);
    calculateEli();
}

function updatenodct(){
    const purpose=document.getElementById("purpose").value;
    document.getElementById("st").style.display="none";
    document.getElementById("bctt").style.display="none";
    document.getElementById("fed").style.display="none";
    document.getElementById("wcpacs").style.display="none";
    document.getElementById("wcah").style.display="none";
    document.getElementById("soc").style.display="none";
    let val=0.00;
    if(purpose==="ST Others Agri and allied-through PACS" || purpose==="ST Others Agri and allied-through DIRECT" ){
        document.getElementById("st").style.display="block";
        val= parseFloat(document.getElementsByClassName("amount14")[0].value)||0.00;
    }
    else  if(purpose==="ST Others BCTT-through PACS" || purpose==="ST Others BCTT-through DIRECT" ){
        document.getElementById("bctt").style.display="block";
        val= parseFloat(document.getElementsByClassName("amount24")[0].value)||0.00;
    }
    else  if(purpose==="ST Others FED-through DIRECT"){
        document.getElementById("fed").style.display="block";
        val= parseFloat(document.getElementsByClassName("amount34")[0].value)||0.00;
    }
    else  if(purpose==="ST Others working capital to PACS"){
        document.getElementById("wcpacs").style.display="block";
        val= parseFloat(document.getElementsByClassName("amount44")[0].value)||0.00;
    }
    else  if(purpose==="ST Others working capital to AH-through PACS" || purpose==="ST Others working capital to AH-through Direct"){
        document.getElementById("wcah").style.display="block";
        val= parseFloat(document.getElementsByClassName("amount54")[0].value)||0.00;
    }
    else  if(purpose==="ST Others-concessional"){
        document.getElementById("soc").style.display="block";
        val= parseFloat(document.getElementsByClassName("amount64")[0].value)||0.00;
    }
    document.getElementById("nodctused").textContent=val.toFixed(2);
    updatenodcttot();
}
function updatenodcttot() {
    const nodctinput = parseFloat(document.getElementById("nodctinput").value) || 0.00;
    const used = parseFloat(document.getElementById("nodctused").textContent) || 0.00;

    let val = nodctinput - used;
    if (isNaN(val)) {
        val = 0.00;
    }
    document.getElementById("nodct-tot").textContent = val.toFixed(2);
    calculateEli();
}

function calculateEli(){
    document.getElementById("eli1").textContent=document.getElementById("ml-tot").textContent;
    document.getElementById("eli2").textContent=document.getElementById("glc-tot").textContent;
    document.getElementById("eli3").textContent=document.getElementById("nodc-tot").textContent;
    document.getElementById("eli4").textContent=document.getElementById("nodct-tot").textContent;
    const val1=parseFloat(document.getElementById("eli1").textContent);
    const val2=parseFloat(document.getElementById("eli2").textContent);
    const val3=parseFloat(document.getElementById("eli3").textContent);
    const val4=parseFloat(document.getElementById("eli4").textContent);
    const minValue=Math.min(val1,val2,val3,val4);
    const under=document.getElementById("under");
    under.textContent="";
    if(minValue===val1){
        under.textContent="Margin in Limit";
    }
    else if(minValue===val2){
        under.textContent="Margin in GLC for last 12 months";
    }
    else if(minValue===val3){
        under.textContent="Margin in NODC(Total)";
    }
    else if(minValue===val4){
        under.textContent="Margin in NODC under "+document.getElementsByClassName("for")[0].textContent;
    }
    document.getElementById("eli5").textContent=minValue.toFixed(2);
    let drawal=parseFloat(document.getElementById("wanted-amount").value)||0.00;
    document.getElementsByClassName("drawal")[0].value=drawal.toFixed(2);
    document.getElementById("eli7").textContent=Math.min(minValue,drawal).toFixed(2);
    if (drawal - minValue> 0.00) {
        document.getElementsByClassName("drawal")[0].value = Math.floor(minValue).toFixed(2);
        document.getElementById("eli5").textContent=minValue.toFixed(2);
    }
    let temp=minValue.toFixed(2)-parseFloat(document.getElementsByClassName("drawal")[0].value);
    document.getElementById("eli8").textContent=temp.toFixed(2);
}
function calculateAfter(){
    const val1 = parseFloat(document.getElementById("eli1").textContent);
    const val2 = parseFloat(document.getElementById("eli2").textContent);
    const val3 = parseFloat(document.getElementById("eli3").textContent);
    const val4 = parseFloat(document.getElementById("eli4").textContent);
    let val = Math.min(val1, val2, val3,val4);
    const under=document.getElementById("under");
    under.textContent="";
    if(val===val1){
        under.textContent="Margin in Limit";
    }
    else if(val===val2){
        under.textContent="Margin in GLC for last 12 months";
    }
    else if(val===val3){
        under.textContent="Margin in NODC(Total)";
    }
    else if(val===val4){
        under.textContent="Margin in NODC under "+document.getElementsByClassName("for")[0].textContent;
    }
    const val22=parseFloat(document.getElementsByClassName("drawal")[0].value)||0.00;
    let temp=val.toFixed(2)-val22.toFixed(2);
    document.getElementById("eli8").textContent=temp.toFixed(2);
}



