async function loadFile(url) {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.arrayBuffer();
  }
  
  async function generateDocument() {
      try {
        const content = await loadFile("/internship_rf_st/assets/docx_templates/asao.docx");
        const zip = new PizZip(content);
        const doc = new window.docxtemplater().loadZip(zip);
        const inputData={
            present:document.getElementById("year-input-start").value,
            next:document.getElementById("year-input-end").value,
            dpresent:document.getElementById("drawal-year-start").value,
            dnext:document.getElementById("drawal-year-end").value,
            drawno:document.getElementById("drawal-number").value,
            drawaldate:formatDate(document.getElementById("date-disbursement").value),
            branch:document.getElementById("districts").value,
            purpose:document.getElementById("purpose").value,
            drawalamount:document.getElementsByClassName("drawal")[0].value,
            recieved:document.getElementById("statusDropdown").value,
            confirm:document.getElementById("confirmationDropdown").value,
            reset_text: document.getElementById("rest_type1") ? document.getElementById("rest_type1").innerText : "",
            reset_dates: document.getElementById("expiry-date") ? document.getElementById("expiry-date").innerText : "",
            osd1:document.getElementById("previous-year").textContent,
            osd2:document.getElementsByClassName("present-year")[0].textContent,
            osd3:document.getElementsByClassName("next-year")[0].textContent,
            ossao2:document.getElementsByClassName("amount21")[0].value,
            osopp2:document.getElementsByClassName("amount22")[0].value,
            osdtp2:document.getElementsByClassName("amount23")[0].value,
            osasao2:document.getElementsByClassName("amount24")[0].value,
            ostot2:document.getElementById("tot2-os").textContent,
            ossao:document.getElementsByClassName("amount1")[0].value,
            osopp:document.getElementsByClassName("amount2")[0].value,
            osdtp:document.getElementsByClassName("amount3")[0].value,
            osasao:document.getElementsByClassName("amount4")[0].value,
            ostot:document.getElementById("used-os").textContent,
            osinput:document.getElementById("tot-os").textContent,
            limit:document.getElementById("limit-mlt").value,
            mlt2:document.getElementById("used-mlt").textContent,
            mlt3:document.getElementById("tot-mlt").textContent,
            mdi:document.getElementById("mdinput").value,
            financial_date:document.getElementsByClassName("financial-year")[0].textContent,
            as_on:formatDate(document.getElementsByClassName("as-on")[0].value),
            md2:document.getElementById("mdpvalue").textContent,
            md4:document.getElementById("tot-md").textContent,
            mnodcinp:document.getElementById("mnodcinput").value,
            mnodctot:document.getElementById("tot-mnodc").textContent,
            nodcosin:document.getElementById("nodcosinput").value,
            nodcos3:document.getElementById("nodcos3").textContent,
            nodcos5:document.getElementById("nodcos5").textContent,
            amtafter:document.getElementById("nodcos7").textContent,
            nodctot:document.getElementById("nodcos8").textContent,
            leasteli:document.getElementById("eliamount").textContent,
            finda:document.getElementsByClassName("drawal")[4].value,
            drawaleligible:document.getElementById("eli5").textContent,
            afterscrutiny:document.getElementById("eli6").textContent,
            under:document.getElementById("under").textContent,
            roitype:document.getElementsByClassName("roitype")[0].textContent,
            riskd:document.getElementById("riskd").value,
            risk2:(document.getElementById("premium").value)||0.00,
            risk3:formatDate(document.getElementById("beforefdate").value),
            roi1:document.getElementById("roilimit").value,
            roi2:document.getElementById("throughrate").value,
            roi3:document.getElementById("risk").value,
            roi4:document.getElementById("totroi").textContent,
        };
        if (document.getElementById("purpose").value==="ASAO Floating") {
          inputData.reset_text = document.getElementById("rest_type2") ? document.getElementById("rest_type2").innerText : "";
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
        saveAs(outputBuffer, "scrutiny_note_asao.docx");
      } catch (error) {
        console.error("Error generating document:", error);
    }
}

    
  
  function formatDate(dateString) {
    const [year, month, day] = dateString.split("-");
    return `${day}-${month}-${year}`;
  }
  
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  