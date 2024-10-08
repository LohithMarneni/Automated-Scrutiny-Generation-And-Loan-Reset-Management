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
  // Initialize: Set the initial state (Home page)
  updateContent("home");
  document.getElementById("districts").value = "";
  document.getElementById("districts2").value = "";
  document.getElementById("purpose2").value = "";
  document.getElementById("roi_type").value = "";
  // Add event listeners to sidebar items
  document.querySelectorAll(".sidebar ul li").forEach((item) => {
    item.addEventListener("click", function (event) {
      event.preventDefault();
      let itemId = item.getAttribute("id");
      updateContent(itemId);
    });
  });
  // Function to update content based on sidebar item ID
  function updateContent(itemId) {
    // Reset active class on all sidebar items
    document.querySelectorAll(".sidebar ul li").forEach((item) => {
      item.classList.remove("active");
    });

    // Add active class to the clicked item
    document.getElementById(itemId).classList.add("active");

    // Hide all content sections
    document.querySelectorAll(".content-section").forEach((section) => {
      section.style.display = "none";
    });

    // Show the corresponding content based on itemId
    switch (itemId) {
      case "home":
        document.querySelector(".content1").style.display = "block";
        break;
      case "roi":
        document.querySelector(".content2").style.display = "block";
        break;
      case "limits":
        document.querySelector(".content3").style.display = "block";
        break;
      case "scrutiny":
        document.querySelector(".content4").style.display = "block";
        break;
      case "addLoan":
        document.querySelector(".content5").style.display = "block";
        break;
      default:
        break;
    }
  }

  // Function to show submit button when input is changed
  function addSubmitButton(buttonId) {
    document.getElementById(buttonId).style.display = "inline-block";
  }

  // Event listeners for ROI input changes
  document
    .getElementById("sto-fixed-rate")
    .addEventListener("input", function () {
      addSubmitButton("updateStoFixedRoiBtn");
    });
  document
    .getElementById("asao-fixed-rate")
    .addEventListener("input", function () {
      addSubmitButton("updateAsaoFixedRoiBtn");
    });
  document
    .getElementById("sto-floating-rate")
    .addEventListener("input", function () {
      addSubmitButton("updateStoFloatingRoiBtn");
    });
  document
    .getElementById("asao-floating-rate")
    .addEventListener("input", function () {
      addSubmitButton("updateAsaoFloatingRoiBtn");
    });

  document.getElementById("last_roi").addEventListener("change", function () {
    document.getElementById("update-roi-btn").style.display = "block";
  });
});
// Function to show submit button when input is changed
function addsubmitButton() {
  // Set display to 'inline-block' to show the button
  document.getElementById("updateLimitsBtn").style.display = "inline-block";
}
function fetchLoanDetails() {
  var district = document.getElementById("districts").value;
  var accountNo = document.getElementById("account_no").value;
  document.getElementsByClassName("alert")[1].textContent = "";
  if (district && accountNo) {
    var xhr = new XMLHttpRequest();
    xhr.open(
      "GET",
      "/internship_rf_st/assets/components/fetch_loan_details.php?district=" +
        district +
        "&account_no=" +
        accountNo,
      true
    );
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        var response = JSON.parse(xhr.responseText);
        var loanDetailsDiv = document.getElementById("loan-details");
        if (response.success) {
          document.getElementById("last_roi").value = response.data.latest_roi;
          document.getElementById("loan_amount").textContent =
            response.data.loan_amount;
          loanDetailsDiv.style.display = "block";
          // document.getElementById("update-roi-btn").style.display = "block";
        } else {
          loanDetailsDiv.style.display = "none";
          document.getElementsByClassName("alert")[1].textContent = "No data Found";
        }
      }
    };
    xhr.send();
  }
}

function updateROI() {
  var district = document.getElementById("districts").value;
  var accountNo = document.getElementById("account_no").value;
  var newROI = document.getElementById("last_roi").value;

  var xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    "/internship_rf_st/assets/components/update_reset_roi.php?district=" +
      district +
      "&account_no=" +
      accountNo +
      "&new_roi=" +
      newROI,
    true
  );
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      alert("ROI value reset successfull!");
      location.reload();
      fetchLoanDetails();
    }
  };
  xhr.send();
}
function calculateResetDates() {
  const presentDate = new Date(document.getElementById("present_date2").value);
  const after91 = new Date(presentDate.getTime() + 90 * 24 * 60 * 60 * 1000);
  const after181 = new Date(presentDate.getTime() + 180 * 24 * 60 * 60 * 1000);
  const after271 = new Date(presentDate.getTime() + 270 * 24 * 60 * 60 * 1000);
  const after361 = new Date(presentDate.getTime() + 360 * 24 * 60 * 60 * 1000);
  const expiryDate = new Date(presentDate);
  expiryDate.setFullYear(expiryDate.getFullYear() + 1);
  document.getElementById("expiry").textContent = formatDate(
    expiryDate.toISOString().split("T")[0]
  );
  document.getElementById("after_91").textContent = formatDate(
    after91.toISOString().split("T")[0]
  );
  document.getElementById("after_181").textContent = formatDate(
    after181.toISOString().split("T")[0]
  );
  document.getElementById("after_271").textContent = formatDate(
    after271.toISOString().split("T")[0]
  );
  document.getElementById("after_361").textContent = formatDate(
    after361.toISOString().split("T")[0]
  );
}

function formatDate(dateString) {
  const [year, month, day] = dateString.split("-");
  return `${day}-${month}-${year}`;
}
// Function to toggle visibility of fields based on purpose and ROI type
function toggleFields() {
  var purpose = document.getElementById("purpose2").value;

  document.getElementById("type").style.display = "none";
  document.getElementsByClassName("label-input-groupx")[0].style.display =
    "none";
  document.getElementsByClassName("label-input-expiry")[0].style.display =
    "none";
  // Hide/reset fields based on purpose
  if (purpose === "SAO") {
    // For SAO and ASAO, hide ROI Type, Reset Dates, and Expiry Date
    document.getElementById("type").style.display = "none";
    document.getElementsByClassName("label-input-groupx")[0].style.display =
      "none";
    document.getElementsByClassName("label-input-expiry")[0].style.display =
      "none";
  } else {
    // For other purposes, show ROI Type, Reset Dates, and Expiry Date
    document.getElementById("type").style.display = "block";
    document.getElementsByClassName("label-input-groupx")[0].style.display =
      "block";
    document.getElementsByClassName("label-input-expiry")[0].style.display =
      "block";
  }
}
function toggleDates() {
  // Hide/reset fields based on ROI Type
  var roiType = document.getElementById("roi_type").value;

  document.getElementById("type").style.display = "block";
  document.getElementsByClassName("label-input-groupx")[0].style.display =
    "block";
  document.getElementsByClassName("label-input-expiry")[0].style.display =
    "block";
  if (roiType === "Fixed") {
    // For Fixed ROI, hide Reset Dates except Expiry Date
    document.getElementsByClassName("label-input-groupx")[0].style.display =
      "none";
  } else {
    // For Floating ROI, show all Reset Dates and Expiry Date
    document.getElementsByClassName("label-input-groupx")[0].style.display =
      "block";
  }
}
// Event listeners to trigger toggleFields on change
document.getElementById("purpose2").addEventListener("change", toggleFields);
document.getElementById("roi_type").addEventListener("change", toggleDates);

// Initial call to toggleFields to set initial visibility based on default values
toggleFields();
toggleDates();
document
  .getElementById("addLoanForm")
  .addEventListener("submit", function (event) {
    if (!confirm("Are you sure you want to add these loan details?")) {
      // User clicked Cancel, prevent the form from submitting
      event.preventDefault();
    }
  });
