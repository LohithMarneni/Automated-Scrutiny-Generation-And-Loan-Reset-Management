async function loadFile(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return await response.arrayBuffer();
}

async function generateDocument() {
  const selectedOption=document.getElementById("purpose").value;
  if(!(selectedOption==="aapacs"||selectedOption==="aadir")){
    try {
      const content = await loadFile("/internship_rf_st/assets/docx_templates/sto_non_aa.docx");
      const zip = new PizZip(content);
      const doc = new window.docxtemplater().loadZip(zip);
  
      const inputData = {
        present: document.getElementById("year-input-start").value,
        next: document.getElementById("year-input-end").value,
        npresent: document.getElementById("drawal-year-start").value,
        nnext: document.getElementById("drawal-year-end").value,
        drawal: document.getElementById("drawal-number").value,
        dccb_name: document.getElementById("districts").value,
        purpose: document.getElementById("purpose").options[document.getElementById("purpose").selectedIndex].text,
        drawal_amount: document.getElementById("wanted-amount").value,
        acc_no: document.getElementById("account-number").value,
        col_no: document.getElementById("Collateral-number").value,
        que_no: document.getElementById("queue-reference").value,
        on_date: formatDate(document.getElementById("date-disbursement").value),
        rof_value: document.getElementById("interest-rate").value,
        rof_type: capitalizeFirstLetter(document.getElementById("interest-type").value),
        roi_con:"",
        reset_freq: document.getElementById("rest_type1") ? document.getElementById("rest_type1").innerText : "",
        reset_dates: document.getElementById("expiry-date") ? document.getElementById("expiry-date").innerText : "",
        credit_limit:document.getElementById("credit").value,
        financial_year:document.getElementsByClassName("financial-date")[0].innerText,
        ml_sto:document.getElementsByClassName("amount1")[0].value,
        ml_bctt:document.getElementsByClassName("amount2")[0].value,
        ml_fed:document.getElementsByClassName("amount3")[0].value,
        ml_wcpacs:document.getElementsByClassName("amount4")[0].value,
        ml_wcah:document.getElementsByClassName("amount5")[0].value,
        ml_con:document.getElementsByClassName("amount6")[0].value,
        ml_stotal:document.getElementsByClassName("used")[0].innerText,
        ml_total:document.getElementById("margin-limit").innerText,
        md_input:document.getElementById("disburse-input1").value,
        as_on:formatDate(document.getElementById("as-on").value),
        md_total:document.getElementById("total-value").innerText,
        mdt_input:document.getElementById("disburse-input2").value,
        mdt_sto:document.getElementById("dist-amount1").value,
        mdt_bctt:document.getElementById("dist-amount2").value,
        mdt_fed:document.getElementById("dist-amount3").innerText,
        mdt_wcpacs:document.getElementById("dist-amount4").innerText,
        mdt_wcah:document.getElementById("dist-amount5").innerText,
        mdt_con:document.getElementById("dist-amount6").innerText,
        mdt_used:document.getElementById("total-disburst").innerText,
        mdt_total:document.getElementById("total-valuet").innerText,
        mnodc_input:document.getElementById("nodc").value,
        mnodc_sto:document.getElementById("amt1-input").value,
        mnodc_bctt:document.getElementById("amt2-input").value,
        mnodc_fed:document.getElementById("amt3-input").value,
        mnodc_wcpacs:document.getElementById("amt4-input").value,
        mnodc_wcah:document.getElementById("amt5-input").value,
        mnodc_con:document.getElementById("amt6-input").value,
        mnodc_used:document.getElementsByClassName("used")[1].textContent,
        mnodc_total:document.getElementById("nodc-limit").innerText,
        mnodct_input:document.getElementById("margin-nodc-input").value,
        mnodct_sto:0.00,
        mnodct_bctt:0.00,
        mnodct_fed:0.00,
       mnodct_wcpacs:0.00,
       mnodct_wcah:0.00,
       mnodct_con:0.00,
        mnodct_used:document.getElementById("y").textContent,
        mnodct_total:document.getElementById("nodc-margin").textContent,
        after_draw:document.getElementById("after-scrutiny").textContent,
        min_amount:document.getElementById("least-eligible").textContent,
        drawal_eligible:document.getElementsByClassName("deligible")[0].textContent,
        finda:document.getElementsByClassName("required")[3].value,
        under:document.getElementById("under").textContent,
      };
      
      if (document.getElementById("interest-type").value==="floating") {
        inputData.roi_con ="("+
    (document.getElementById("base-rate").value || "") + " + " +
    (document.getElementById("margin-rate").value || "") + " = " +
    (document.getElementById("interest-rate").value || "")+"%)";
        inputData.reset_freq = document.getElementById("rest_type2") ? document.getElementById("rest_type2").innerText : "";
        inputData.reset_dates =
    "After 91 days - " + (document.getElementById("date1") ? document.getElementById("date1").innerText + ",\n" : "") +
    "After 181 days - " + (document.getElementById("date2") ? document.getElementById("date2").innerText + ",\n" : "") +
    "After 271 days - " + (document.getElementById("date3") ? document.getElementById("date3").innerText + ",\n" : "") +
    "After 361 days - " + (document.getElementById("date4") ? document.getElementById("date4").innerText + ",\n" : "") +
    "Expiry Date - " + (document.getElementById("date5") ? document.getElementById("date5").innerText + ".\n" : "");
      }
      
      if(selectedOption=="bcttpacs"||selectedOption==="bcttdir"){
        inputData.mnodct_bctt=document.getElementById("amt2-input").value;
      }
      else if(selectedOption=="feddir"){
        inputData.mnodct_fed=document.getElementById("amt3-input").value;
      }
      else if(selectedOption=="wcpacs"){
        inputData.mnodct_wcpacs=document.getElementById("amt4-input").value;
      }
      else if(selectedOption=="wcahpacs"||selectedOption=="wcahdir"){
        inputData.mnodct_wcah=document.getElementById("amt5-input").value;
      }
      else if(selectedOption=="stoconcession"){
        inputData.mnodct_con=document.getElementById("amt6-input").value;
      }
      doc.setData(inputData);
      doc.render();
  
      const outputBuffer = doc.getZip().generate({ type: "blob" });
      saveAs(outputBuffer, "scrutiny_note_non_aa.docx");
    } catch (error) {
      console.error("Error generating document:", error);
    }
  }

  else{
    try {
      const content = await loadFile("/internship_rf_st/assets/docx_templates/sto_aa.docx");
      const zip = new PizZip(content);
      const doc = new window.docxtemplater().loadZip(zip);
  
      const inputData = {
        present: document.getElementById("year-input-start").value,
        next: document.getElementById("year-input-end").value,
        npresent: document.getElementById("drawal-year-start").value,
        nnext: document.getElementById("drawal-year-end").value,
        drawal: document.getElementById("drawal-number").value,
        dccb_name: document.getElementById("districts").value,
        purpose: document.getElementById("purpose").options[document.getElementById("purpose").selectedIndex].text,
        drawal_amount: document.getElementById("wanted-amount").value,
        acc_no: document.getElementById("account-number").value,
        col_no: document.getElementById("Collateral-number").value,
        que_no: document.getElementById("queue-reference").value,
        on_date: formatDate(document.getElementById("date-disbursement").value),
        rof_value: document.getElementById("interest-rate").value,
        rof_type: capitalizeFirstLetter(document.getElementById("interest-type").value),
        roi_con:"",
        reset_freq: document.getElementById("rest_type1") ? document.getElementById("rest_type1").innerText : "",
        reset_dates: document.getElementById("expiry-date") ? document.getElementById("expiry-date").innerText : "",
        credit_limit:document.getElementById("credit").value,
        financial_year:document.getElementsByClassName("financial-date")[0].innerText,
        ml_sto:document.getElementsByClassName("amount1")[0].value,
        ml_bctt:document.getElementsByClassName("amount2")[0].value,
        ml_fed:document.getElementsByClassName("amount3")[0].value,
        ml_wcpacs:document.getElementsByClassName("amount4")[0].value,
        ml_wcah:document.getElementsByClassName("amount5")[0].value,
        ml_con:document.getElementsByClassName("amount6")[0].value,
        ml_stotal:document.getElementsByClassName("used")[0].innerText,
        ml_total:document.getElementById("margin-limit").innerText,
        md_input:document.getElementById("disburse-input1").value,
        as_on:formatDate(document.getElementById("as-on").value),
        md_total:document.getElementById("total-value").innerText,
        mdt_input:document.getElementById("disburse-input2").value,
        mdt_sto:document.getElementById("dist-amount1").value,
        mdt_bctt:document.getElementById("dist-amount2").value,
        mdt_fed:document.getElementById("dist-amount3").innerText,
        mdt_wcpacs:document.getElementById("dist-amount4").innerText,
        mdt_wcah:document.getElementById("dist-amount5").innerText,
        mdt_con:document.getElementById("dist-amount6").innerText,
        mdt_used:document.getElementById("total-disburst").innerText,
        mdt_total:document.getElementById("total-valuet").innerText,
        sto_pacs:document.getElementById("sto_pacs").value,
        sto_dir:document.getElementById("sto_dir").value,
        bor_pacs:document.getElementById("bor_pacs").value,
        bor_dir:document.getElementById("bor_dir").value,
        tot_pacs:document.getElementById("pacs-value").innerText,
        tot_dir:document.getElementById("dir-value").textContent,
        tot_sto:document.getElementById("aa").innerText,
        tot_nodc:document.getElementById("borrowings").innerText,
        tot_tot:document.getElementById("total-split").textContent,
        p_value:document.getElementById("diff").textContent,
        pacsp:document.getElementById("pacsp").textContent,
        dirp:document.getElementById("dirp").textContent,
        pacs_val:document.getElementById("pacs_val").innerText,
        dir_val:document.getElementById("dir_val").innerText,
        tot_split:document.getElementById("tot_split").innerText,
        tot2_pacs:document.getElementsByClassName("borrow-split")[0].textContent,
        tot2_dir:document.getElementsByClassName("borrow-split")[1].textContent,
        tot2_tot:document.getElementsByClassName("borrow-split")[2].textContent,
        mar_input:document.getElementById("nodc").value,
        mar_sto:document.getElementById("amt1-input").value,
        mar_wcbctt:document.getElementById("amt2-input").value,
        mar_wcfed:document.getElementById("amt3-input").value,
        mar_wcpacs:document.getElementById("amt4-input").value,
        mar_wcah:document.getElementById("amt5-input").value,
        mar_con:document.getElementById("amt6-input").value,
        marx_tot:document.getElementById("marx_tot").textContent,
        mar_tot:document.getElementById("nodc-limit").textContent,
        mart_input:document.getElementById("x").textContent,
        mart_sto:document.getElementById("amt1").textContent,
        martx_tot:document.getElementById("y").textContent,
        mart_tot:document.getElementById("nodc-margin").textContent,
        after_draw:document.getElementById("after-scrutiny").textContent,
        min_amount:document.getElementById("least-eligible").textContent,
        drawal_eligible:document.getElementsByClassName("deligible")[0].textContent,
        finda:document.getElementsByClassName("required")[3].value,
        under:document.getElementById("under").textContent,
      };
  
      if (document.getElementById("interest-type").value==="floating") {
        inputData.roi_con ="("+
    (document.getElementById("base-rate").value || "") + " + " +
    (document.getElementById("margin-rate").value || "") + " = " +
    (document.getElementById("interest-rate").value || "")+"%)";
        inputData.reset_freq = document.getElementById("rest_type2") ? document.getElementById("rest_type2").innerText : "";
        inputData.reset_dates =
    "After 91 days - " + (document.getElementById("date1") ? document.getElementById("date1").innerText + ",\n" : "") +
    "After 181 days - " + (document.getElementById("date2") ? document.getElementById("date2").innerText + ",\n" : "") +
    "After 271 days - " + (document.getElementById("date3") ? document.getElementById("date3").innerText + ",\n" : "") +
    "After 361 days - " + (document.getElementById("date4") ? document.getElementById("date4").innerText + ",\n" : "") +
    "Expiry Date - " + (document.getElementById("date5") ? document.getElementById("date5").innerText + ".\n" : "");
      }
     
  
      doc.setData(inputData);
      doc.render();
  
      const outputBuffer = doc.getZip().generate({ type: "blob" });
      saveAs(outputBuffer, "scrutiny_note_aa.docx");
    } catch (error) {
      console.error("Error generating document:", error);
    }
  }
}

function formatDate(dateString) {
  const [year, month, day] = dateString.split("-");
  return `${day}-${month}-${year}`;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
