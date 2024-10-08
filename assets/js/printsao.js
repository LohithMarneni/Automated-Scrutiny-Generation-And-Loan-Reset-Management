async function loadFile(url) {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.arrayBuffer();
  }
  
  async function generateDocument() {
      try {
        const content = await loadFile("/internship_rf_st/assets/docx_templates/sao.docx");
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
            // acc_no: document.getElementById("account-number").value,
            // col_no: document.getElementById("Collateral-number").value,
            // que_no: document.getElementById("queue-reference").value,
            osd1:document.getElementById("previous-year").textContent,
            osd2:document.getElementsByClassName("present-year")[0].textContent,
            osd3:document.getElementsByClassName("next-year")[0].textContent,
            osinput:document.getElementById("tot-os").textContent,
            ossao1:document.getElementsByClassName("amount1")[0].value,
            osopp1:document.getElementsByClassName("amount2")[0].value,
            osdtp1:document.getElementsByClassName("amount3")[0].value,
            osfsao1:document.getElementsByClassName("amount4")[0].value,
            osasao1:document.getElementsByClassName("amount5")[0].value,
            ostot:document.getElementById("used-os").textContent,
            ossao2:document.getElementsByClassName("amount21")[0].value,
            osopp2:document.getElementsByClassName("amount22")[0].value,
            osdtp2:document.getElementsByClassName("amount23")[0].value,
            osfsao2:document.getElementsByClassName("amount24")[0].value,
            osasao2:document.getElementsByClassName("amount25")[0].value,
            ostot2:document.getElementById("tot2-os").textContent,
            ml1:document.getElementById("mlinput").value,
            ml2:document.getElementById("ml2t").textContent,
            ml3:document.getElementById("ml3t").textContent,
            ml4:document.getElementById("mlinput2").value,
            ml6:document.getElementById("ml3t2").textContent,
            fbefore:document.getElementsByClassName("financial-year")[0].textContent,
            nos1:document.getElementById("niosi1").value,
            as_on1:formatDate(document.getElementById("as-on-date1").value),
            nos2:document.getElementById("niosi2").value,
            nos3:document.getElementById("nios3").textContent,
            nos4:document.getElementById("nios4").textContent,
            nos6:document.getElementById("nios6").textContent,
            financialdate:document.getElementsByClassName("financial-year")[1].textContent,
            as_on:document.getElementsByClassName("as-on")[1].textContent,
            md1:document.getElementById("mdi1").value,
            md2:document.getElementById("mdi2").value,
            md3:document.getElementById("md3").textContent,
            md4:document.getElementById("md4").textContent,
            md54:document.getElementById("mdi3").value,
            md5:document.getElementById("md5").textContent,
            md6:document.getElementById("md6").textContent,
            md7:document.getElementById("md7").textContent,
            md8:document.getElementById("md8").textContent,
            md10:document.getElementById("md10").textContent,
            mnodc1:document.getElementById("mnodci1").value,
            mnodc3:document.getElementById("mnodc3").textContent,
            nodcos1:document.getElementById("nodcosinput").value,
            purposebased:document.getElementById("purposebased").innerText,
            nodcos22:document.getElementById("nodcosinput2").value,
            nodcos2:document.getElementById("nodcos2").textContent,
            nodcos3:document.getElementById("nodcos3").textContent,
            nodcos4:document.getElementById("nodcosinput3").value,
            nodcos5:document.getElementById("nodcos5").textContent,
            nodcos7:document.getElementById("nodcos7").textContent,
            nodcos8:document.getElementById("nodcos8").textContent,
            eli5:document.getElementById("eli5").textContent,
            eli6:document.getElementById("eli6").textContent,
            eli52:document.getElementById("eli52").textContent,
            eli62:document.getElementById("eli62").textContent,
            mineli:document.getElementById("eliamount").textContent,
            finda:document.getElementById("finda").value,
            under:document.getElementById("under").textContent,
            riskd:document.getElementById("riskd").value,
            risk2:(document.getElementById("premium").value)||0.00,
            risk3:formatDate(document.getElementById("beforefdate").value),
            roi1:document.getElementById("roilimit").value,
            roi2:document.getElementById("throughrate").value,
            roi3:document.getElementById("risk").value,
            roi4:document.getElementById("totroi").textContent,
        };
        doc.setData(inputData);
        doc.render();
    
        const outputBuffer = doc.getZip().generate({ type: "blob" });
        saveAs(outputBuffer, "scrutiny_note_sao.docx");
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
  