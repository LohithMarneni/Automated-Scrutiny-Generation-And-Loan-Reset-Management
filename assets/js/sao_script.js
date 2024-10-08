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
    document.getElementById("drawal-year-start").value = currentYear;
    document.getElementById("year-input-start").value = currentYear;
    document.getElementById("year-input-end").value = nextYear;
    document.getElementById("drawal-year-end").value = nextYear;
    document.getElementById("riskd").value="Low Risk";
    document.getElementById("premium").value=0.00.toFixed(2);
    document.getElementById("beforefdate").value=getFinancialYearEndDate();
    document.getElementById("districts").value = "";
    document.getElementById("purpose").value = "";
    document.getElementById("roilimit").value=4.50.toFixed(2);
    document.getElementById("throughrate").value=0.50.toFixed(2);
    document.getElementById('risk').value=0.00.toFixed(2);
    var dateInput = document.getElementById("date-disbursement");
            var today = new Date().toISOString().split("T")[0];
            dateInput.value = today;
            document.getElementsByClassName("ondate")[0].textContent=formatDate(today);
    let l=getFinancialYearStartDate();
    document.getElementsByClassName("financial-year")[0].textContent=getBeforeFinancialDate();
    document.getElementsByClassName("financial-year")[1].textContent=l;
    document.getElementsByClassName("financial-year")[2].textContent=l;
     displayYear();
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
function updateBranch(){
    // console.log("branch");
    let branch=document.getElementById("districts").value;
    document.getElementsByClassName("branch")[0].textContent=branch;
    document.getElementsByClassName("branch")[1].textContent=branch;
    document.getElementsByClassName("branch")[2].textContent=branch;
    updateCredit();
}
function displayPurpose(){
    // console.log("purpose");
    let purpose=document.getElementById("purpose").value;
    document.getElementsByClassName("for")[0].textContent=purpose;
    document.getElementsByClassName("for")[1].textContent=purpose;
    calculateNodcos2();
    calculateNodcos();
    calculateEligibility();
}
function calculateNodcos(){
    const input1=parseFloat(document.getElementById("nodcosinput").value)||0.00;
    let n2=parseFloat(document.getElementById("nodcos2").textContent);
    const input3=parseFloat(document.getElementById("nodcosinput3").value)||0.00;
    let n3=(n2/input1)*100;
    document.getElementById("nodcos3").textContent=isFinite(n3) ? n3.toFixed(2) : "0.00";
    let n5=(n2/input3)*100;
    // console.log(n5);
    document.getElementById("nodcos5").textContent=isFinite(n5) ? n5.toFixed(2) : "0.00";
    let val=parseFloat(document.getElementsByClassName("drawal")[0].value)||0.00;
    let l=val+n2;
    document.getElementById("nodcos7").textContent=l.toFixed(2);
    document.getElementById("nodcosam1").textContent=n2.toFixed(2);
    document.getElementById("nodcosam2").textContent=val.toFixed(2);
    let final=(l/input3)*100;
    document.getElementById("nodcos8").textContent=isFinite(final) ? final.toFixed(2) : "0.00";
}
function calculateNodcos2() {
    let val = document.getElementById("purpose").value;
    document.getElementById("sao1").style.display = "none";
    document.getElementById("opp1").style.display = "none";
    document.getElementById("dtp1").style.display = "none";
    document.getElementById("fresh-sao1").style.display = "none";
    let x = 0.00;
    if (val === "SAO") {
        document.getElementById("sao1").style.display = "block";
        x = parseFloat(document.getElementsByClassName("amount21")[0].value) || 0.00;
        document.getElementById("sao2").textContent = x.toFixed(2);
    } else if (val === "OPP") {
        document.getElementById("opp1").style.display = "block";
        x = parseFloat(document.getElementsByClassName("amount22")[0].value) || 0.00;
        document.getElementById("opp2").textContent = x.toFixed(2);
    } else if (val === "DTP") {
        document.getElementById("dtp1").style.display = "block";
        x = parseFloat(document.getElementsByClassName("amount23")[0].value) || 0.00;
        document.getElementById("dtp2").textContent = x.toFixed(2);
    } else if (val === "SAO - Fresh Finance") {
        document.getElementById("fresh-sao1").style.display = "block";
        x = parseFloat(document.getElementsByClassName("amount24")[0].value) || 0.00;
        document.getElementById("fresh-sao2").textContent = x.toFixed(2);
    }
    let y = parseFloat(document.getElementById("nodcosinput2").value) || 0.00;
    let res = (x + y).toFixed(2);
    document.getElementById("nodcos2").textContent = res;
    calculateNodcos();
}

function addDrawalAmount(){
    // console.log("drawal amount");
    let val=parseFloat(document.getElementsByClassName("drawal")[0].value)||0.00;
    for(let i=1;i<6;i++){
        document.getElementsByClassName("drawal")[i].textContent=val.toFixed(2);
    }
    document.getElementsByClassName("drawal")[6].value=val.toFixed(2);
    calculateEligibility();
}

function updateRoi(){
    // console.log("roi");
    const roiLimit = parseFloat(document.getElementById('roilimit').value) || 0.00;
    const throughRate = parseFloat(document.getElementById('throughrate').value) || 0.00;
    const risk = parseFloat(document.getElementById('risk').value) || 0.00;
    const totalRoi = roiLimit + throughRate + risk;

    document.getElementById('totroi').textContent = totalRoi.toFixed(2);
    document.querySelectorAll('.roitot').forEach((element) => {
        element.textContent = totalRoi.toFixed(2);
    });
}
function calculateThirdOs(){
    const amount231=parseFloat(document.getElementsByClassName("amount21")[0].value)||0.00;
    const amount232=parseFloat(document.getElementsByClassName("amount22")[0].value)||0.00;
    const amount233=parseFloat(document.getElementsByClassName("amount23")[0].value)||0.00;
    const amount234=parseFloat(document.getElementsByClassName("amount24")[0].value)||0.00;
    const amount235=parseFloat(document.getElementsByClassName("amount25")[0].value)||0.00;
    
    document.getElementsByClassName("amount21")[1].textContent=amount231.toFixed(2);
    document.getElementsByClassName("amount22")[1].textContent=amount232.toFixed(2);
    document.getElementsByClassName("amount23")[1].textContent=amount233.toFixed(2);
    document.getElementsByClassName("amount24")[1].textContent=amount234.toFixed(2);
    document.getElementsByClassName("amount25")[1].textContent=amount234.toFixed(2);
    let totValue=amount231+amount232+amount233+amount234+amount235;
    // console.log("hi");
    document.getElementById("mnodc2").textContent=totValue.toFixed(2);
    const tot2Os=document.getElementById("tot2-os");
    // document.getElementById("mnodcless").textContent=totValue.toFixed(2);
    // calculateMnodc();
    // document.getElementById("nodcos2").textContent=totValue.toFixed(2);
    // document.getElementById("nodcosam1").textContent=totValue.toFixed(2);
    // calculateNodcos();
    tot2Os.textContent=totValue.toFixed(2);
    calculateTotOs();
    calculateNodcos2();
    calculateNodcos();
}
function calculateSecOs(){
    const amount221=parseFloat(document.getElementsByClassName("amount1")[0].value)||0.00;
    const amount222=parseFloat(document.getElementsByClassName("amount2")[0].value)||0.00;
    const amount223=parseFloat(document.getElementsByClassName("amount3")[0].value)||0.00;
    const amount224=parseFloat(document.getElementsByClassName("amount4")[0].value)||0.00;
    const amount225=parseFloat(document.getElementsByClassName("amount5")[0].value)||0.00;
    document.getElementsByClassName("amount1")[1].textContent=amount221.toFixed(2);
    document.getElementsByClassName("amount2")[1].textContent=amount222.toFixed(2);
    document.getElementsByClassName("amount3")[1].textContent=amount223.toFixed(2);
    document.getElementsByClassName("amount4")[1].textContent=amount224.toFixed(2);
    calculateMd4();
    let val=amount221+amount222+amount223;
    document.getElementById("ml2t").textContent=val.toFixed(2);
    calculateML1();
    document.getElementById("ml2t2").textContent=amount224.toFixed(2);
    calculateML2();
    document.getElementById("nios5").textContent=amount224.toFixed(2);
    calculateNios();
    // document.getElementsByClassName("amount1")[1].textContent=amount221.toFixed(2);
    // document.getElementsByClassName("amount2")[1].textContent=amount222.toFixed(2);
    // document.getElementsByClassName("amount3")[1].textContent=amount223.toFixed(2);
    // document.getElementsByClassName("amount4")[1].textContent=amount224.toFixed(2);
    // document.getElementsByClassName("amount5")[1].textContent=amount225.toFixed(2);
    let totValue=amount221+amount222+amount223+amount224+amount225;
    const usedOs=document.getElementById("used-os");
    usedOs.textContent=totValue.toFixed(2);
    // document.getElementById("used-mlt").textContent=totValue.toFixed(2);
    // document.getElementById("used-md").textContent=totValue.toFixed(2);
    calculateTotOs();
    calculateMd();
    // calculateTotMlt();
}
function calculateMnodc(){
    let i1=parseFloat(document.getElementById("mnodci1").value)||0.00;
    let i2=parseFloat(document.getElementById("mnodc2").textContent);
    let mnodc3=i1-i2;
    document.getElementById("mnodc3").textContent=mnodc3.toFixed(2);
    document.getElementById("eli3").textContent=mnodc3.toFixed(2);
    document.getElementById("eli32").textContent=mnodc3.toFixed(2);
    calculateEligibility();
}
function calculateMd4(){
    let amt1=parseFloat(document.getElementsByClassName("amount1")[1].textContent);
    let amt2=parseFloat(document.getElementsByClassName("amount2")[1].textContent);
    let amt3=parseFloat(document.getElementsByClassName("amount3")[1].textContent);
    let amt4=parseFloat(document.getElementById("mdi3").value)||0.00;
    let x=amt1+amt2+amt3+amt4;
    document.getElementById("md5").textContent=x.toFixed(2);
    calculateMd();
}
function calculateMd(){
    let a1=parseFloat(document.getElementById("mdi1").value)||0.00;
    let a2=parseFloat(document.getElementById("mdi2").value)||0.00;
    document.getElementById("md7").textContent=a2.toFixed(2);
    let xa=a1-a2;
    document.getElementById("md3").textContent=xa.toFixed(2);
    let xa2=(70*xa)/100;
    document.getElementById("md4").textContent=xa2.toFixed(2);
    let xa3=parseFloat(document.getElementById("md5").textContent);
    let xa4=xa2-xa3;
    document.getElementById("md6").textContent=xa4.toFixed(2);
    document.getElementById("eli2").textContent=xa4.toFixed(2);
    let l8=70*(parseFloat(document.getElementById("md7").textContent))/100;
    document.getElementById("md8").textContent=l8.toFixed(2);
    let m9=parseFloat(document.getElementById("md9").textContent);
    let md10=l8.toFixed(2)-m9.toFixed(2);
    document.getElementById("md10").textContent=md10.toFixed(2);
    document.getElementById("eli22").textContent=md10.toFixed(2);
    calculateEligibility();
}
function calculateNios(){
    const input1=parseFloat(document.getElementById("niosi1").value)||0.00;
    const input2=parseFloat(document.getElementById("niosi2").value)||0.00;
    let nincrease=input2.toFixed(2)-input1.toFixed(2);
    document.getElementById("nios3").textContent=nincrease.toFixed(2);
    let pvalue=(70*nincrease)/100;
    document.getElementById("nios4").textContent=pvalue.toFixed(2);
    let total=pvalue.toFixed(2)-parseFloat(document.getElementById("nios5").textContent);
    document.getElementById("nios6").textContent=total.toFixed(2);
    document.getElementById("elix2").textContent=total.toFixed(2);
    calculateEligibility();
}
function calculateML1(){
    let val1=parseFloat(document.getElementById("mlinput").value)||0.00;
    let val2=parseFloat(document.getElementById("ml2t").textContent)||0.00;
    let res=val1.toFixed(2)-val2.toFixed(2);
    document.getElementById("ml3t").textContent=res.toFixed(2);
    document.getElementById("eli1").textContent=res.toFixed(2);
    calculateEligibility();
}
function calculateML2(){
    let val1=parseFloat(document.getElementById("mlinput2").value)||0.00;
    let val2=parseFloat(document.getElementById("ml2t2").textContent)||0.00;
    let res=val1.toFixed(2)-val2.toFixed(2);
    document.getElementById("ml3t2").textContent=res.toFixed(2);
    document.getElementById("eli12").textContent=res.toFixed(2);
    calculateEligibility();
}
function calculateTotOs(){
    const totOs=document.getElementById("tot-os");
    const totalValue=(parseFloat(document.getElementById("tot2-os").textContent)||0.00)-(parseFloat(document.getElementById("used-os").textContent)||0.00)
    totOs.textContent=totalValue.toFixed(2);
}
function updateCredit() {
    var district = document.getElementById("districts").value; // Get selected district
    var xhr = new XMLHttpRequest();

    // Prepare and send GET request to get_sao.php with district parameter
    xhr.open("GET", "/internship_rf_st/assets/components/get_sao.php?district=" + encodeURIComponent(district), true);

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var response = JSON.parse(xhr.responseText); // Parse JSON response
            document.getElementById("mlinput").value = response.sao.toFixed(2); // Update normal credit limit element
            document.getElementById("mlinput2").value = response.fresh_sao.toFixed(2); // Update new member credit limit element
        }
    };

    xhr.send(); // Send the request
}
function displayAsOn(){
    // console.log("as-on");
    let date=formatDate(document.getElementsByClassName("as-on")[0].value);
    document.getElementsByClassName("as-on")[1].textContent=date;
    document.getElementsByClassName("as-on")[2].textContent=date;
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
  function getBeforeFinancialDate() {
    let today = new Date();
    let year = today.getFullYear();

    // Financial year starts on April 1st
    let financialYearStart = new Date(year, 3, 1);

    // If today's date is before April 1st, the financial year started on April 1st of the previous year
    if (today < financialYearStart) {
        financialYearStart = new Date(year - 1, 3, 1);
    }

    // Get the date before the financial year start date
    let dayBefore = new Date(financialYearStart);
    dayBefore.setDate(dayBefore.getDate() - 1);

    // Formatting the date to "dd-mm-yyyy"
    let day = String(dayBefore.getDate()).padStart(2, '0');
    let month = String(dayBefore.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed in JavaScript
    let formattedDate = `${day}-${month}-${dayBefore.getFullYear()}`;

    return formattedDate;
}
function formatDate(dateString) {
    const [year, month, day] = dateString.split("-");
    return `${day}-${month}-${year}`;
}
// function calculateEligibility(){
//     let val=parseFloat(document.getElementsByClassName("drawal")[0].value)||0.00;
//     for(let i=1;i<6;i++){
//         document.getElementsByClassName("drawal")[i].textContent=val.toFixed(2);
//     }
//     document.getElementsByClassName("drawal")[6].value=val.toFixed(2);
//     const eli1=parseFloat(document.getElementById("eli1").textContent);
//     const eli2=parseFloat(document.getElementById("eli2").textContent);
//     const eli3=parseFloat(document.getElementById("eli3").textContent);
//     const eli4=parseFloat(document.getElementById("eli4").textContent);
//     let drawaleli=Math.min(eli1,eli2,eli3,eli4);
//     let mineli=Math.min(eli1,eli2,eli3);
//     document.getElementById("eli5").textContent=drawaleli.toFixed(2);
//     let purpose=document.getElementById("purpose").value;
//     if(purpose==="SAO"||purpose==="OPP"||purpose==="DTP"){
//         // document.getElementById("finda").textContent=
//         document.getElementById("eli6").textContent=drawaleli.toFixed(2);
//         if (val-mineli> 0.00) {
//             document.getElementsByClassName("drawal")[6].value = Math.floor(val).toFixed(2);
//             document.getElementById("eliamount").textContent=mineli.toFixed(2);
//         }
//        let temp=mineli.toFixed(2)-parseFloat(document.getElementsByClassName("drawal")[4].value);
//         document.getElementById("eli6").textContent=temp.toFixed(2);
//     }

// }
// function calculateEligibility2(){
//     let val=parseFloat(document.getElementsByClassName("drawal")[0].value)||0.00;
//     for(let i=1;i<6;i++){
//         document.getElementsByClassName("drawal")[i].textContent=val.toFixed(2);
//     }
//     document.getElementsByClassName("drawal")[6].value=val.toFixed(2);
//     const eli12=parseFloat(document.getElementById("eli12").textContent);
//     const eli22=parseFloat(document.getElementById("eli22").textContent);
//     const eli32=parseFloat(document.getElementById("eli32").textContent);
//     const eli42=parseFloat(document.getElementById("eli42").textContent);
//     let drawaleli=Math.min(eli12,eli22,eli32,eli42);
//     let mineli=Math.min(eli12,eli22,eli32);
//     document.getElementById("eli52").textContent=drawaleli.toFixed(2);
//     document.getElementById("eli62").textContent=drawaleli.toFixed(2);
//     if(purpose==="SAO - Fresh Finance"){
//         document.getElementById("eliamount").textContent=mineli.toFixed(2);
//         if (val-mineli> 0.00) {
//             document.getElementsByClassName("drawal")[6].value = Math.floor(val).toFixed(2);
//             document.getElementById("eliamount").textContent=mineli.toFixed(2);
//         }
//        let temp=mineli.toFixed(2)-parseFloat(document.getElementsByClassName("drawal")[4].value);
//         document.getElementById("eli62").textContent=temp.toFixed(2)
//     }
// }
// function calculateAfter(){
//     if(purpose==="SAO"||purpose==="OPP"||purpose==="DTP"){
//     const val1 = parseFloat(document.getElementById("eli1").textContent);
//     const val2 = parseFloat(document.getElementById("eli2").textContent);
//     const val3 = parseFloat(document.getElementById("eli3").textContent);
//     // const val4 = parseFloat(document.getElementById("eli4").textContent); // Assuming this value is used somewhere
//     let val = Math.min(val1, val2, val3);
//     const val22=parseFloat(document.getElementsByClassName("drawal")[4].value)||0.00;
//     let temp=val.toFixed(2)-val22.toFixed(2);
//     document.getElementById("eli6").textContent=temp.toFixed(2);
//     }
//     else if(purpose==="SAO - Fresh Finance"){
//         const val1 = parseFloat(document.getElementById("eli12").textContent);
//         const val2 = parseFloat(document.getElementById("eli22").textContent);
//         const val3 = parseFloat(document.getElementById("eli32").textContent);
//         // const val4 = parseFloat(document.getElementById("eli4").textContent); // Assuming this value is used somewhere
//         let val = Math.min(val1, val2, val3);
//         const val22=parseFloat(document.getElementsByClassName("drawal")[4].value)||0.00;
//         let temp=val.toFixed(2)-val22.toFixed(2);
//         document.getElementById("eli62").textContent=temp.toFixed(2);
//     }
// }
function calculateEligibility() {
    document.getElementById("eli5").textContent="-";
    document.getElementById("eli52").textContent="-";
    document.getElementById("eli6").textContent="-";
    document.getElementById("eli62").textContent="-";
    let purpose=document.getElementById("purpose").value;
    if(purpose==="SAO"||purpose==="OPP"||purpose==="DTP"){
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
    let varia=parseFloat(document.getElementsByClassName("drawal")[0].value)||0.00;
    for(let i=1;i<6;i++){
        document.getElementsByClassName("drawal")[i].textContent=varia.toFixed(2);
    }
    document.getElementsByClassName("drawal")[6].value=varia.toFixed(2);
    // document.getElementsByClassName("drawal")[4].value =drawal.toFixed(2);
    // document.getElementsByClassName("drawal")[4].value =drawal.toFixed(2);
    // document.getElementsByClassName("drawal")[3].textContent =drawal.toFixed(2);
    // document.getElementsByClassName("drawal")[2].textContent =drawal.toFixed(2);
    // document.getElementsByClassName("drawal")[1].textContent =drawal.toFixed(2);
    document.getElementById("eli4").textContent =drawal.toFixed(2);
    let temp=val.toFixed(2)-(Math.floor(val).toFixed(2));
    // console.log(document.getElementsByClassName("drawal")[4].textContent);
    if (drawal -val> 0.00) {
        document.getElementsByClassName("drawal")[6].value = Math.floor(val).toFixed(2);
        // document.getElementsByClassName("drawal")[3].textContent=Math.floor(val).toFixed(2);
        // document.getElementsByClassName("drawal")[2].textContent=Math.floor(val).toFixed(2);
        // document.getElementsByClassName("drawal")[1].textContent=Math.floor(val).toFixed(2);
        // document.getElementById("eli4").textContent=Math.floor(val).toFixed(2);
        document.getElementById("eliamount").textContent=val.toFixed(2);
        // console.log(document.getElementsByClassName("drawal")[4].value);
    }
    temp=val.toFixed(2)-parseFloat(document.getElementsByClassName("drawal")[6].value);
    document.getElementById("eli6").textContent=temp.toFixed(2);
}
else if(purpose==="SAO - Fresh Finance"){
    const val1 = parseFloat(document.getElementById("eli12").textContent);
    const val2 = parseFloat(document.getElementById("eli22").textContent);
    const val3 = parseFloat(document.getElementById("eli32").textContent);
    const valx = parseFloat(document.getElementById("elix2").textContent);
    const val4 = parseFloat(document.getElementById("eli42").textContent); // Assuming this value is used somewhere
    let val = Math.min(val1, val2, val3,valx);
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
    else if(val===valx){
        under.textContent="Net Increase in Outstanding";
    }
    const element = document.getElementById("eliamount");
    element.textContent = val.toFixed(2);
    let drawal = parseFloat(document.getElementsByClassName("drawal")[0].value);
    document.getElementById("eli52").textContent=Math.min(val,drawal).toFixed(2);
    let varia=parseFloat(document.getElementsByClassName("drawal")[0].value)||0.00;
    for(let i=1;i<6;i++){
        document.getElementsByClassName("drawal")[i].textContent=varia.toFixed(2);
    }
    document.getElementsByClassName("drawal")[6].value=varia.toFixed(2);
    // document.getElementsByClassName("drawal")[4].value =drawal.toFixed(2);
    // document.getElementsByClassName("drawal")[4].value =drawal.toFixed(2);
    // document.getElementsByClassName("drawal")[3].textContent =drawal.toFixed(2);
    // document.getElementsByClassName("drawal")[2].textContent =drawal.toFixed(2);
    // document.getElementsByClassName("drawal")[1].textContent =drawal.toFixed(2);
    document.getElementById("eli42").textContent =drawal.toFixed(2);
    let temp=val.toFixed(2)-(Math.floor(val).toFixed(2));
    // console.log(document.getElementsByClassName("drawal")[4].textContent);
    if (drawal -val> 0.00) {
        document.getElementsByClassName("drawal")[6].value = Math.floor(val).toFixed(2);
        // document.getElementsByClassName("drawal")[3].textContent=Math.floor(val).toFixed(2);
        // document.getElementsByClassName("drawal")[2].textContent=Math.floor(val).toFixed(2);
        // document.getElementsByClassName("drawal")[1].textContent=Math.floor(val).toFixed(2);
        // document.getElementById("eli4").textContent=Math.floor(val).toFixed(2);
        document.getElementById("eliamount").textContent=val.toFixed(2);
        // console.log(document.getElementsByClassName("drawal")[4].value);
    }
    temp=val.toFixed(2)-parseFloat(document.getElementsByClassName("drawal")[6].value);
    document.getElementById("eli62").textContent=temp.toFixed(2);
}
}

// Ensure that `drawal` is a value and the 5th element with the class "drawal" exists
// Also, make sure the correct elements and classes are used in your HTML
function calculateAfter(){
    document.getElementById("eli6").textContent="-";
    document.getElementById("eli62").textContent="-";
    let purpose=document.getElementById("purpose").value;
    if(purpose==="SAO"||purpose==="OPP"||purpose==="DTP"){
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
    const val22=parseFloat(document.getElementsByClassName("drawal")[6].value)||0.00;
    let temp=val.toFixed(2)-val22.toFixed(2);
    document.getElementById("eli6").textContent=temp.toFixed(2);
}
else if(purpose==="SAO - Fresh Finance"){
    const val1 = parseFloat(document.getElementById("eli12").textContent);
    const val2 = parseFloat(document.getElementById("eli22").textContent);
    const val3 = parseFloat(document.getElementById("eli32").textContent);
    const valx = parseFloat(document.getElementById("elix2").textContent);
    // const val4 = parseFloat(document.getElementById("eli4").textContent); // Assuming this value is used somewhere
    let val = Math.min(val1, val2, val3,valx);
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
    else if(val===valx){
        under.textContent="Net Increase in Outstanding";
    }
    const val22=parseFloat(document.getElementsByClassName("drawal")[6].value)||0.00;
    let temp=val.toFixed(2)-val22.toFixed(2);
    document.getElementById("eli62").textContent=temp.toFixed(2);
}
}
