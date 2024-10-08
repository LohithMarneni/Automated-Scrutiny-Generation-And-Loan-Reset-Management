
// Function to toggle interest rate inputs based on selected interest type
function toggleInterestInputs() {
  const interestType = document.getElementById("interest-type").value;
  const floatingRateInputs = document.getElementById("floating-rate-inputs");
  const expiryDateRow = document.getElementById("expiry-date-row");
  const resetFrequencyRow = document.getElementById("reset-frequency-row");
  const dateDisbursement = document.getElementById("date-disbursement").value;
  clearResetDates();

  if (interestType === "fixed") {
    floatingRateInputs.style.display = "none";
    expiryDateRow.style.display = "table-row"; // Show expiry date row
    resetFrequencyRow.style.display = "none"; // Hide reset frequency row

    if (dateDisbursement) {
      const disbursementDate = new Date(dateDisbursement);
      const expiryDate = new Date(disbursementDate);
      expiryDate.setFullYear(expiryDate.getFullYear() + 1);
      const formattedExpiryDate = formatDate(expiryDate.toISOString().split("T")[0]);
      document.getElementById("expiry-date").textContent = formattedExpiryDate;
    }
  } else if (interestType === "floating") {
    floatingRateInputs.style.display = "block";
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
  updateMarginThroughTable();
}

document.getElementById('interest-type').addEventListener('change', function() {
  var interestType = this.value;

  // Make an AJAX request to get_roi.php
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '/internship_rf_st/assets/components/get_roi.php', true);
  xhr.onload = function() {
      if (xhr.status === 200) {
          var response = JSON.parse(xhr.responseText);
          if (!response.error) {
              if (interestType === 'fixed') {
                  document.getElementById('interest-rate').value = response.fixed;
                  document.getElementById('floating-rate-inputs').style.display = 'none';
              } else if (interestType === 'floating') {
                  document.getElementById('base-rate').value = response.base;
                  document.getElementById('margin-rate').value = response.margin;
                  let m=parseFloat(response.base) + parseFloat(response.margin);
                  document.getElementById('interest-rate').value=m.toFixed(2);
                  document.getElementById('floating-rate-inputs').style.display = 'block';

              }
              updateMarginThroughTable();
          } else {
              console.error(response.error);
          }
      }
  };
  xhr.send();
});

function markAsOn(){
  const inputElement = document.getElementById('as-on');
  const inputDateValue = inputElement.value;
  const formattedDate = formatDate(inputDateValue);
  for(let i=0;i<4;i++){
    document.getElementsByClassName("before-date")[i].textContent=formattedDate;
  }
  // console.log(formattedDate); // You can use this date as needed
}


// Helper function to clear/reset the reset dates display
function clearResetDates() {
  for (let j = 1; j <= 5; j++) {
    document.getElementById(`date${j}`).textContent = "";
  }
}


// Function to format date as dd-mm-yyyy
function formatDate(dateString) {
  const [year, month, day] = dateString.split("-");
  return `${day}-${month}-${year}`;
}

// Function to calculate floating interest rate based on base rate and margin rate
function calculateFloatingRate() {
  const baseRate = parseFloat(document.getElementById("base-rate").value) || 0;
  const marginRate =
    parseFloat(document.getElementById("margin-rate").value) || 0;
  const totalRate = baseRate + marginRate;
  document.getElementById("interest-rate").value = totalRate.toFixed(2);
  updateMarginThroughTable();
}

// Function to update calculations when values change in the second table
function updateSecondTableCalculations() {
  // Get the elements with the specified class names
  const amount1Elements = document.getElementsByClassName("amount1");
  const amount2Elements = document.getElementsByClassName("amount2");
  const amount3Elements = document.getElementsByClassName("amount3");
  const amount4Elements = document.getElementsByClassName("amount4");
  const amount5Elements = document.getElementsByClassName("amount5");
  const amount6Elements = document.getElementsByClassName("amount6");
  // Initialize variables to store the total values
  let secondTableSecondValue = 0;
  let secondTableThirdValue = 0;
  let secondTableFourthValue = 0;
  let secondTableFifthValue = 0;
  let secondTableSixthValue = 0;
  let secondTableSeventhValue = 0;
  // Iterate over the elements and calculate the total values

  secondTableSecondValue += parseFloat(amount1Elements[0].value) || 0;
  secondTableThirdValue += parseFloat(amount2Elements[0].value) || 0;
  secondTableFourthValue += parseFloat(amount3Elements[0].value) || 0;
  secondTableFifthValue += parseFloat(amount4Elements[0].value) || 0;
  secondTableSixthValue += parseFloat(amount5Elements[0].value) || 0;
  secondTableSeventhValue += parseFloat(amount6Elements[0].value) || 0;
  // Update the value of the last cell in the second table's second row
  document.getElementsByClassName("used")[0].textContent = (
    secondTableSecondValue +
    secondTableThirdValue +
    secondTableFourthValue+secondTableFifthValue+secondTableSixthValue+secondTableSeventhValue
  ).toFixed(2);

  // Calculate the value for the last cell in the second table's third row
  const secondTableMarginLimit =
    parseFloat(document.getElementById("credit").value) -
    (secondTableSecondValue + secondTableThirdValue + secondTableFourthValue+ secondTableFifthValue+ secondTableSixthValue+ secondTableSeventhValue);

  // Update the value of the last cell in the second table's third row
  document.getElementById("margin-limit").textContent =
    secondTableMarginLimit.toFixed(2);
  document.getElementById("ml7").textContent=secondTableMarginLimit.toFixed(2);
  updateDisbursementsTable(secondTableSecondValue,
    secondTableThirdValue,
    secondTableFourthValue,
    secondTableFifthValue,
    secondTableSixthValue,secondTableSeventhValue);
    getTotalValue();
    getTotalValueT();
    updateMarginThroughTable();
}
function updateDisbursementsTable(
  secondTableSecondValue,
  secondTableThirdValue,
  secondTableFourthValue,
  secondTableFifthValue,
  secondTableSixthValue,
  secondTableSeventhValue
){
  const purposeAppliedFor = document.getElementById("purpose").value;
  const amount1Elements = document.getElementById("dis-amount1");
  const amount2Elements = document.getElementById("dis-amount2");
  const amount3Elements = document.getElementById("dis-amount3");
  const amount4Elements = document.getElementById("dis-amount4");
  const amount5Elements = document.getElementById("dis-amount5");
  const amount6Elements = document.getElementById("dis-amount6");

  const tamount1Elements = document.getElementById("dist-amount1");
  const tamount2Elements = document.getElementById("dist-amount2");
  const tamount3Elements = document.getElementById("dist-amount3");
  const tamount4Elements = document.getElementById("dist-amount4");
  const tamount5Elements = document.getElementById("dist-amount5");
  const tamount6Elements = document.getElementById("dist-amount6");

 document.getElementById("tstothers").style.display="none";
 document.getElementById("tbcct").style.display="none";
 document.getElementById("tfed").style.display="none";
 document.getElementById("twcpacs").style.display="none";
 document.getElementById("twcah").style.display="none";
 document.getElementById("tstc").style.display="none";
  amount1Elements.textContent = parseFloat(secondTableSecondValue).toFixed(2);
  amount2Elements.textContent = parseFloat(secondTableThirdValue).toFixed(2);
  amount3Elements.textContent =  parseFloat(secondTableFourthValue).toFixed(2);
  amount4Elements.textContent =  parseFloat(secondTableFifthValue).toFixed(2);
  amount5Elements.textContent =  parseFloat(secondTableSixthValue).toFixed(2);
  amount6Elements.textContent =  parseFloat(secondTableSeventhValue).toFixed(2);
  let fourthUsed=0;
  if (purposeAppliedFor=="aapacs"||purposeAppliedFor=="aadir") {
    document.getElementById("tstothers").style.display="block";
    fourthUsed=(parseFloat( tamount1Elements.value))||0.00;
} 
else if(purposeAppliedFor=="bcttpacs"||purposeAppliedFor=="bcttdir"){
  document.getElementById("tbcct").style.display="block";
  fourthUsed=(parseFloat( tamount2Elements.value))||0.00;
}
else if(purposeAppliedFor=="feddir"){
  document.getElementById("tfed").style.display="block";
  tamount3Elements.textContent=amount3Elements.textContent;
  fourthUsed=(parseFloat( tamount3Elements.textContent))||0.00;
}
// else if(){
  // tamount2Elements.textContent=amount2Elements.textContent
// }
else if(purposeAppliedFor=="wcpacs"){
  document.getElementById("twcpacs").style.display="block";
  tamount4Elements.textContent=amount4Elements.textContent;
  fourthUsed=(parseFloat( tamount4Elements.textContent))||0.00;
}
else if(purposeAppliedFor=="wcahpacs"||purposeAppliedFor=="wcahdir"){
  document.getElementById("twcah").style.display="block";
  tamount5Elements.textContent=amount5Elements.textContent;
  fourthUsed=(parseFloat( tamount5Elements.textContent))||0.00;
}

else if(purposeAppliedFor=="stoconcession"){
  document.getElementById("tstc").style.display="block";
  tamount6Elements.textContent=amount6Elements.textContent
  fourthUsed=(parseFloat( tamount6Elements.textContent))||0.00;
}
  // const fourthUsed=(parseFloat( tamount1Elements.value))||0.00+(parseFloat( tamount2Elements.value))||0.00+parseFloat( tamount3Elements.textContent)+parseFloat( tamount4Elements.textContent)+parseFloat( tamount5Elements.textContent)+parseFloat( tamount6Elements.textContent);
  // Calculate the value for the last cell in the third table's second row
  const thirdTableUsedAmount =
    secondTableSecondValue + secondTableThirdValue + secondTableFourthValue+secondTableFifthValue+secondTableSixthValue+secondTableSeventhValue;

  // Update the value of the last cell in the third table's second row
  document.getElementById("total-disbursements").textContent =
    thirdTableUsedAmount.toFixed(2);
   
  document.getElementById("total-disburst").textContent =
    fourthUsed.toFixed(2);
    updateMarginThroughTable();
}
function getTotalValueT(){
  const input2=parseFloat(document.getElementById("disburse-input2").value)||0.00;
  const secondCell=parseFloat(document.getElementById("total-disburst").textContent)||0.00;
  let value=input2.toFixed(2)-secondCell.toFixed(2);
  document.getElementById("mdthrough8").textContent=value.toFixed(2);
  document.getElementById("total-valuet").textContent=value.toFixed(2);
  updateMarginThroughTable();
}
function getTotalValue() {
  const disInputValue = parseFloat(document.getElementById("disburse-input1").value) || 0.00;
  const disTotalValue = parseFloat(document.getElementById("total-disbursements").textContent) || 0.00;
  const totalValueCell = document.getElementById("total-value");

  
  // Perform the arithmetic operation first
  let totalValue = disInputValue - disTotalValue;
  document.getElementById("mdt8").textContent=totalValue.toFixed(2);

  // Format the result to two decimal places
  totalValueCell.textContent = totalValue.toFixed(2);
  updateMarginThroughTable();
}

function updateThirdTableInput(){
  let usedSum=0;
  for(let i=0;i<5;i++){
    usedSum+=parseFloat(document.getElementsByClassName("amt-input")[i].value)||0.00;
  }
  document.getElementsByClassName("used")[1].textContent =
  usedSum.toFixed(2);
  updateThirdTableCalculations();
  addStValue()
  updateMarginThroughTable();
}

function updateThirdTableCalculations() {
  const thirdTableFirstValue =
    parseFloat(document.getElementById("nodc").value) || 0.00;
  // Calculate the value for the last cell in the third table's third row
  const thirdTableUsedAmount = parseFloat(
    document.getElementsByClassName("used")[1].textContent
  );
  const thirdTableMarginLimit = thirdTableFirstValue - thirdTableUsedAmount;
  // Update the value of the last cell in the third table's third row
  document.getElementById("nodc-limit").textContent =
    thirdTableMarginLimit.toFixed(2);
  document.getElementById("mnodct7").textContent=thirdTableMarginLimit.toFixed(2);
  updateMarginThroughTable();
}
function updateLastTableCalculations() {
  // PACS Row
  const pacsValue1 =
    parseFloat(document.querySelectorAll(".pacs")[0].value) || 0.00;
  const pacsValue2 =
    parseFloat(document.querySelectorAll(".pacs")[1].value) || 0.00;
  const pacsDifference = pacsValue1 - pacsValue2;
  document.getElementById("pacs-value").textContent = pacsDifference.toFixed(2);

  // DIR Row
  const dirValue1 = parseFloat(document.querySelectorAll(".dir")[0].value) || 0.00;
  const dirValue2 = parseFloat(document.querySelectorAll(".dir")[1].value) || 0.00;
  const dirDifference = dirValue1 - dirValue2;
  document.getElementById("dir-value").textContent = dirDifference.toFixed(2);

  // Total Row
  const totalAA = pacsValue1 + dirValue1;
  const totalBorrowings = pacsValue2 + dirValue2;
  const totalSplit = pacsDifference + dirDifference;
  document.getElementById("aa").textContent = totalAA.toFixed(2);
  document.getElementById("borrowings").textContent =
    totalBorrowings.toFixed(2);
  document.getElementById("nodc-borrow").textContent =
    totalBorrowings.toFixed(2);
  document.getElementById("diff").textContent = (
    parseFloat(document.getElementById("st").textContent) -
    totalBorrowings.toFixed(2)
  ).toFixed(2);
  // console.log(document.getElementById("diff").textContent);
  document.getElementById("total-split").textContent = totalSplit.toFixed(2);
  document.getElementsByClassName("nodc-borrowings")[0].textContent =
    pacsValue2;
  document.getElementsByClassName("nodc-borrowings")[1].textContent = dirValue2;
  document.getElementsByClassName("nodc-borrowings")[2].textContent =
    totalBorrowings;
    updateData2Table();
  updateMarginThroughTable();
}

function addStValue() {
  const amount = parseFloat(
    document.getElementById("amt1-input").value
  )||0.00;
  document.getElementById("st").textContent = amount.toString();
  document.getElementById("diff").textContent = (
    parseFloat(document.getElementById("st").textContent) -
    parseFloat(document.getElementById("nodc-borrow").textContent)
  ).toFixed(2);
  // console.log(amount);
  updateData2Table();
}

document
  .getElementsByClassName("amount1")[0]
  .addEventListener("input", addStValue);
function updateData2Table() {
  const pacsValue=parseFloat(document.getElementById("pacs-value").textContent)||0.00;
  const dirValue=parseFloat(document.getElementById("dir-value").textContent)||0.00;
  const tValue=parseFloat(document.getElementById("total-split").textContent);
  let pacsp = (pacsValue.toFixed(2)/tValue.toFixed(2))*100.00;
  let dirp = (dirValue.toFixed(2)/tValue.toFixed(2))*100.00;

  document.getElementById("pacsp").textContent= pacsp.toFixed(2);
  document.getElementById("dirp").textContent = dirp.toFixed(2);


  const amount = parseFloat(document.getElementById("diff").textContent);
  const pacsSplit = (amount * pacsp.toFixed(2)) / 100;
  const dirSplit = (amount * dirp.toFixed(2)) / 100;
  const totalSplit = pacsSplit + dirSplit;

  document.getElementsByClassName("split")[0].textContent =
    pacsSplit.toFixed(2);
  document.getElementsByClassName("split")[1].textContent = dirSplit.toFixed(2);
  document.getElementsByClassName("split")[2].textContent =
    totalSplit.toFixed(2);
  document.getElementsByClassName("borrow-split")[0].textContent = (
    parseFloat(document.getElementsByClassName("split")[0].textContent) +
    parseFloat(
      document.getElementsByClassName("nodc-borrowings")[0].textContent
    )
  ).toFixed(2);

  document.getElementsByClassName("borrow-split")[1].textContent = (
    parseFloat(document.getElementsByClassName("split")[1].textContent) +
    parseFloat(
      document.getElementsByClassName("nodc-borrowings")[1].textContent
    )
  ).toFixed(2);

  document.getElementsByClassName("borrow-split")[2].textContent = (
    parseFloat(document.getElementsByClassName("borrow-split")[0].textContent) +
    parseFloat(document.getElementsByClassName("borrow-split")[1].textContent)
  ).toFixed(2);
  updateMarginThroughTable();
}
// Function to update values in the Margin in NODC - Through table
function updateMarginThroughTable() {
  // Get the selected option in the Purpose applied for dropdown
  const purposeAppliedFor = document.getElementById("purpose").value;
  // Get the elements of the Margin in NODC - Through table
  const xCell = document.getElementById("x");
  const amt1Cell = document.getElementById("amt1");
  const amt2Cell = document.getElementById("amt2");
  const amt3Cell = document.getElementById("amt3");
  const amt4Cell = document.getElementById("amt4");
  const amt5Cell = document.getElementById("amt5");
  const amt6Cell = document.getElementById("amt6");
  const yCell = document.getElementById("y");
  const nodcMarginCell = document.getElementById("nodc-margin");
  const marginNodcInput=document.getElementById("margin-nodc-input");
  amt1Cell.textContent=0.00;
  amt2Cell.textContent=0.00;
  amt3Cell.textContent=0.00;
  amt4Cell.textContent=0.00;
  amt5Cell.textContent=0.00;
  amt6Cell.textContent=0.00;
  // Get the values from the corresponding rows in the Data 2 table

  if (purposeAppliedFor=="aapacs") {
      // amt1Value = parseFloat(document.getElementById("pacsp").value) || 0;
      xCell.textContent = parseFloat(
          document.getElementsByClassName("pacs")[0].value || 0.00
      ).toFixed(2);
      amt1Cell.textContent = parseFloat(
          document.getElementsByClassName("borrow-split")[0].textContent || 0.00
      );
      // document.getElementsByClassName("through")[0].textContent = "THROUGH PACS";
      // document.getElementsByClassName("through")[1].textContent = "THROUGH PACS";
  } else if (purposeAppliedFor=="aadir") {
      // amt1Value = parseFloat(document.getElementById("dirp").value) || 0;
      xCell.textContent = parseFloat(
          document.getElementsByClassName("dir")[0].value || 0.00
      ).toFixed(2);
      amt1Cell.textContent = parseFloat(
          document.getElementsByClassName("borrow-split")[1].textContent || 0.00
      );
      // document.getElementsByClassName("through")[0].textContent =
      //     "THROUGH DIRECT";
      //     document.getElementsByClassName("through")[1].textContent =
      //     "THROUGH DIRECT";
  }
  else if(purposeAppliedFor=="bcttpacs"||purposeAppliedFor=="bcttdir"){
    amt2Cell.textContent = parseFloat(
      document.getElementsByClassName("amt-input")[1].value )|| 0.00;
  }
  else if(purposeAppliedFor=="wcpacs"){
    amt4Cell.textContent = parseFloat(
      document.getElementsByClassName("amt-input")[3].value)|| 0.00;
  }
  else if(purposeAppliedFor=="wcahpacs"){
    amt5Cell.textContent = parseFloat(
      document.getElementsByClassName("amt-input")[4].value)|| 0.00;
  }
  else if(purposeAppliedFor=="feddir"){
    amt3Cell.textContent = parseFloat(
      document.getElementsByClassName("amt-input")[2].value )|| 0.00;
  }
  else if(purposeAppliedFor=="stoconcession"){
    amt3Cell.textContent = parseFloat(
      document.getElementsByClassName("amt-input")[5].value )|| 0.00;
  }
  // Get the values from the second table's corresponding cells
  const amt1Value = parseFloat(amt1Cell.textContent || 0.00);
  const amt2Value = parseFloat(amt2Cell.textContent || 0.00);
  const amt3Value = parseFloat(amt3Cell.textContent || 0.00);
  const amt4Value = parseFloat(amt4Cell.textContent || 0.00);
  const amt5Value = parseFloat(amt5Cell.textContent || 0.00);
  const amt6Value = parseFloat(amt6Cell.textContent || 0.00);
  // Update the y value as the sum of amt1, amt2, and amt3
  let nodcMarginValue=0.00;
  const yValue = amt1Value + amt2Value + amt3Value + amt4Value + amt5Value+amt6Value;
  yCell.textContent = yValue.toFixed(2);
  if(marginNodcInput.style.display=="block"){
    // yCell.textContent=100.00;
    // console.log("before assigning");

    nodcMarginValue = (parseFloat(marginNodcInput.value)||0.00) - yValue.toFixed(2);
    // console.log("after assigning");
  }
  else{
    nodcMarginValue = parseFloat(xCell.textContent) - yValue.toFixed(2);
  }
  
  nodcMarginCell.textContent = nodcMarginValue.toFixed(2);
  document.getElementsByClassName("mnodcp7")[0].textContent = nodcMarginCell.textContent;
  let wantedAmount = parseFloat(document.getElementById("wanted-amount").value)||0.00;
  const minValue = Math.min(parseFloat(document.getElementById("ml7").textContent), parseFloat(document.getElementById("mnodct7").textContent),parseFloat(document.getElementById("mdthrough8").textContent),parseFloat(document.getElementById("mdt8").textContent), nodcMarginValue.toFixed(2));
  const under=document.getElementById("under");
    under.textContent="";
    if(minValue===parseFloat(document.getElementById("ml7").textContent)){
        under.textContent="Margin in Limit";
    }
    else if(minValue===parseFloat(document.getElementById("mdt8").textContent)){
        under.textContent="Margin in Disbursements(Total)";
    }
    else if(minValue===parseFloat(document.getElementById("mdthrough8").textContent)){
      under.textContent="Margin in Disbursements through "+document.getElementsByClassName("through")[0].textContent;
  }
    else if(minValue=== parseFloat(document.getElementById("mnodct7").textContent)){
        under.textContent="Margin in NODC(Total)";
    }
    else if(minValue=== parseFloat(document.getElementsByClassName("mnodcp7")[0].textContent)){
      under.textContent="Margin in NODC "+document.getElementsByClassName("through")[0].textContent;
  }
  document.getElementById("least-eligible").textContent =minValue.toFixed(2);
  let l=parseFloat(document.getElementsByClassName("required")[3].value)||0.00;
  let eligible = (minValue.toFixed(2)) - (l.toFixed(2));
  document.getElementById("after-scrutiny").textContent = eligible.toFixed(2);
  // Show or hide the 9th point based on the eligibility value
  // const confirmation9 = document.getElementById("confirmation9");
  const interestRate = document.getElementById("interest-rate").value;
  document.getElementById("type-value").textContent = interestRate;
  document.getElementById("type").textContent=document.getElementById("interest-type").value;
  let value1=parseFloat(document.getElementById("wanted-amount").value)||0.00;
  let t=Math.min(minValue,parseFloat(document.getElementsByClassName("required")[1].textContent));
  document.getElementsByClassName("deligible")[0].textContent=t.toFixed(2);
  for(let i=0;i<3;i++){
    document.getElementsByClassName("required")[i].textContent=value1.toFixed(2);
  }
  document.getElementsByClassName("required")[3].value=value1.toFixed(2);
  if (wantedAmount- (minValue.toFixed(2)) > 0) {
      // confirmation9.style.display = "block";
      let m=minValue.toFixed(2)-(Math.floor(minValue).toFixed(2))
      document.getElementById("after-scrutiny").textContent =m.toFixed(2);
      // console.log(minValue);
      // for(let i=0;i<4;i++){
      //   document.getElementsByClassName("required")[i].textContent=Math.floor(minValue).toFixed(2);
      // }
      document.getElementsByClassName("required")[3].value=Math.floor(minValue).toFixed(2);
  }
  // updateSecondTableCalculations()
}
function calculateAfter(){
  const minValue = Math.min(parseFloat(document.getElementById("ml7").textContent), parseFloat(document.getElementById("mnodct7").textContent),parseFloat(document.getElementById("mdthrough8").textContent),parseFloat(document.getElementById("mdt8").textContent), parseFloat(document.getElementById("nodc-margin").textContent));
  const under=document.getElementById("under");
    under.textContent="";
    if(minValue===parseFloat(document.getElementById("ml7").textContent)){
        under.textContent="Margin in Limit";
    }
    else if(minValue===parseFloat(document.getElementById("mdt8").textContent)){
        under.textContent="Margin in Disbursements(Total)";
    }
    else if(minValue===parseFloat(document.getElementById("mdthrough8").textContent)){
      under.textContent="Margin in Disbursements through "+document.getElementsByClassName("through")[0].textContent;
  }
    else if(minValue=== parseFloat(document.getElementById("mnodct7").textContent)){
        under.textContent="Margin in NODC(Total)";
    }
    else if(minValue=== parseFloat(document.getElementsByClassName("mnodcp7")[0].textContent)){
      under.textContent="Margin in NODC "+document.getElementsByClassName("through")[0].textContent;
  }
  let l=parseFloat(document.getElementsByClassName("required")[3].value)||0.00;
  let eligible = (minValue.toFixed(2)) - (l.toFixed(2));
  document.getElementById("after-scrutiny").textContent = eligible.toFixed(2);
}

function updateRequired(){
  let val=parseFloat(document.getElementById("wanted-amount").value)||0.00;
  for(let i=0;i<3;i++){
    document.getElementsByClassName("required")[i].textContent=val.toFixed(2);
  }
  document.getElementsByClassName("required")[3].value=val.toFixed(2);
  updateMarginThroughTable();
}
function updateBranch(){
  const word=document.getElementById("districts").value;
  for(let i=0;i<2;i++){
    document.getElementsByClassName("branch")[i].textContent=word.charAt(0).toUpperCase() + word.slice(1);
  }
  updateCredit();
}
// Attach the toggleTablesAndInput function to the purpose dropdown's input event
document.getElementById("purpose").addEventListener('input', (event) => {
  const selectedOption = event.target.options[event.target.selectedIndex].text;
  document.getElementsByClassName("category")[0].textContent = selectedOption;
  document.getElementsByClassName("category")[1].textContent = selectedOption;
  document.getElementsByClassName("through")[0].textContent = selectedOption;
  document.getElementsByClassName("through")[1].textContent = selectedOption;
  document.getElementsByClassName("through")[2].textContent = selectedOption;
  document.getElementsByClassName("through")[3].textContent = selectedOption;

  toggleTablesAndInput();
  updateMarginThroughTable()
});
// Function to toggle visibility of tables and input tag based on selected purpose
function toggleTablesAndInput() {
  const purposeAppliedFor = document.getElementById("purpose").value;
  const dataTable = document.getElementsByClassName("data")[0];
  const data2Table = document.getElementsByClassName("data2")[0];
  const eye2 = document.getElementById("margin-nodc-input");
  const eye1 = document.getElementById("x");
  const amtInput=document.getElementsByClassName("amt-input");
  // Hide/Show tables and input tag based on the selected purpose
  if (purposeAppliedFor === "aapacs" || purposeAppliedFor === "aadir") {
    dataTable.style.display = "block";
    data2Table.style.display = "block";
    eye2.style.display = "none";
    eye1.style.display = "block";
  } else {
    dataTable.style.display = "none";
    data2Table.style.display = "none";
    eye2.style.display = "block";
    eye1.style.display = "none";
}
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
function updateCredit() {
  var district = document.getElementById("districts").value;
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "/internship_rf_st/assets/components/get_credit.php?district=" + encodeURIComponent(district), true);
  xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
          var response = JSON.parse(xhr.responseText);
          let l=response.osao;
          document.getElementById("credit").value = l.toFixed(2);
          updateSecondTableCalculations();
      }
  };
  xhr.send();
}