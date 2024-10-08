async function loadFile(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return await response.arrayBuffer();
}

async function generateDocument() {
    try {
      const content = await loadFile("/internship_rf_st/assets/docx_templates/sto.docx");
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
          drawalamount:document.getElementById("wanted-amount").value,
          recieved:document.getElementById("statusDropdown").value,
          confirm:document.getElementById("confirmationDropdown").value,
          reset_text: document.getElementById("rest_type1") ? document.getElementById("rest_type1").innerText : "",
          reset_dates: document.getElementById("expiry-date") ? document.getElementById("expiry-date").innerText : "",
          intresttype:document.getElementById("interest-type").value,
          mldp:document.getElementsByClassName("present")[0].textContent,
          mldn:document.getElementsByClassName("next")[0].textContent,
          mlinput:document.getElementById("credit").value,
          ml21:document.getElementsByClassName("amount1")[0].value,
          ml22:document.getElementsByClassName("amount2")[0].value,
          ml23:document.getElementsByClassName("amount3")[0].value,
          ml24:document.getElementsByClassName("amount4")[0].value,
          ml25:document.getElementsByClassName("amount5")[0].value,
          ml26:document.getElementsByClassName("amount6")[0].value,
          ml2:document.getElementById("used").textContent,
          mltot:document.getElementById("ml-tot").textContent,
          glcinput:document.getElementById("glcinput").value,
          glc21:document.getElementsByClassName("amount12")[0].value,
          glc22:document.getElementsByClassName("amount22")[0].value,
          glc23:document.getElementsByClassName("amount32")[0].value,
          glc24:document.getElementsByClassName("amount42")[0].value,
          glc25:document.getElementsByClassName("amount52")[0].value,
          glc26:document.getElementsByClassName("amount62")[0].value,
          glc2:document.getElementById("glcused").textContent,
          glctot:document.getElementById("glc-tot").textContent,
          nodcdate:formatDate(document.getElementById("nodcdate").value),
          nodcinput:document.getElementById("nodcinput").value,
          nodc21:document.getElementsByClassName("amount13")[0].value,
          nodc22:document.getElementsByClassName("amount23")[0].value,
          nodc23:document.getElementsByClassName("amount33")[0].value,
          nodc24:document.getElementsByClassName("amount43")[0].value,
          nodc25:document.getElementsByClassName("amount53")[0].value,
          nodc26:document.getElementsByClassName("amount63")[0].value,
          nodc2:document.getElementById("nodcused").textContent,
          nodctot:document.getElementById("nodc-tot").textContent,
          nodctinput:document.getElementById("nodctinput").value,
          nodct2:document.getElementById("nodctused").textContent,
          nodct2row:"",
          nodcttot:document.getElementById("nodct-tot").textContent,
          eli5:document.getElementById("eli5").textContent,
          eli7:document.getElementById("eli7").textContent,
          eli8:document.getElementById("eli8").textContent,
          roitype:document.getElementById("interest-type").value,
          riskd:document.getElementById("riskd").value,
          risk2:(document.getElementById("premium").value)||0.00,
          risk3:formatDate(document.getElementById("beforefdate").value),
          roi1:document.getElementById("roilimit").value,
          roi2:document.getElementById("throughrate").value,
          roi3:document.getElementById("risk").value,
          roi4:document.getElementById("totroi").textContent,
          finda:document.getElementById("finda").value,
          under:document.getElementById("under").textContent,
          throughroi:document.getElementById("through").textContent,
      };
      if (document.getElementById("interest-type").value==="Floating") {
        inputData.reset_text = document.getElementById("rest_type2") ? document.getElementById("rest_type2").innerText : "";
        inputData.reset_dates =
    "After 91 days - " + (document.getElementById("date1") ? document.getElementById("date1").innerText + ",\n" : "") +
    "After 181 days - " + (document.getElementById("date2") ? document.getElementById("date2").innerText + ",\n" : "") +
    "After 271 days - " + (document.getElementById("date3") ? document.getElementById("date3").innerText + ",\n" : "") +
    "After 361 days - " + (document.getElementById("date4") ? document.getElementById("date4").innerText + ",\n" : "") +
    "Expiry Date - " + (document.getElementById("date5") ? document.getElementById("date5").innerText + ".\n" : "");
      }
      const purpose = document.getElementById("purpose").value;
      // console.log("Purpose: ", purpose);

      if (purpose === "ST Others Agri and allied-through PACS" || purpose === "ST Others Agri and allied-through DIRECT") {
          inputData.nodct2row = "Normal ST(O) - Rs. " + document.getElementsByClassName("amount14")[0].value + " Crore.";
      } else if (purpose === "ST Others BCTT-through PACS" || purpose === "ST Others BCTT-through DIRECT") {
          inputData.nodct2row = "BCTT - Rs. " + document.getElementsByClassName("amount24")[0].value + " Crore.";
      } else if (purpose === "ST Others FED-through DIRECT") {
          inputData.nodct2row = "Federations - Rs. " + document.getElementsByClassName("amount34")[0].value + " Crore.";
      } else if (purpose === "ST Others working capital to PACS") {
          inputData.nodct2row = "WC loans to PACS - Rs. " + document.getElementsByClassName("amount44")[0].value + " Crore.";
      } else if (purpose === "ST Others working capital to AH-through PACS" || purpose === "ST Others working capital to AH-through Direct") {
          inputData.nodct2row = "WC to Animal Husbandry - Rs. " + document.getElementsByClassName("amount54")[0].value + " Crore.";
      } else if (purpose === "ST Others-concessional") {
          inputData.nodct2row = "ST Others Concessional - Rs. " + document.getElementsByClassName("amount64")[0].value + " Crore.";
      }

      // console.log("nodct2row: ", inputData.nodct2row); // Debug log
      doc.setData(inputData);
      doc.render();
  
      const outputBuffer = doc.getZip().generate({ type: "blob" });
      saveAs(outputBuffer, "scrutiny_note_sto.docx");
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
