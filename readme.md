# Automated Scrutiny Generation and Loan Reset Management

## Project Overview
<p align="center">
  <img src="screenshots/home.png" alt="Home Page" width="500" style="border: 2px solid #ccc; border-radius: 10px;">
</p>

This web application was developed for the **Andhra Pradesh State Cooperative Bank Ltd (APCOB)** to streamline the scrutiny process for short-term loans. APCOB sanctions loans to **13 District Cooperative Central Banks (DCCBs)** at lower interest rates than market standards, relying on funding from **NABARD**. NABARD monitors APCOB's loan sanctioning process monthly, necessitating thorough verification through scrutiny notes.

**Previously, scrutiny notes were generated manually until August 3, 2024. This application automates the generation of scrutiny notes, enhancing efficiency for the ST department of APCOB. Additionally, it includes loan reset management functionality, allowing interest rates to be adjusted based on market values every 91 days, ensuring compliance and optimizing loan servicing.**


## Features

- **Dynamic Scrutiny Generation**: Generates scrutiny reports based on user input values.
- **Eligibility Evaluation**: Evaluates and displays the eligibility of loans.
- **Download Option**: Allows users to download the generated scrutiny reports.
- **Add Loan Details**: Facilitates the addition of loan details with account numbers.
- **Reset Date Calculation**: Calculates and stores reset dates (91, 181, 271, 361, 365 days) from the loan sanction date.
- **Daily Reset Display**: Shows loans that need to be reset on the current day.
