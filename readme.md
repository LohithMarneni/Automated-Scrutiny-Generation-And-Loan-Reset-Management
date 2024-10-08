# Automated Scrutiny Generation and Loan Reset Management

## Project Overview

This project involves developing a web application for dynamic scrutiny generation and loan reset management for APCOB Bank. The application checks the eligibility of DCCBs (District Central Cooperative Banks) for loan sanctioning based on user input values. It generates scrutiny results, evaluates eligibility, and allows for downloading the generated scrutiny notes. I had used Docxtempalter.js library which uses templates to generate the Word document. Additionally, the application supports adding loan details and calculates various reset dates based on the loan sanction date. This Web application was used by Andhra Pradesh State Cooperative Bank Ltd, Vijayawada(APCOB). APCOB sanctions loans for the 13 DCCB's with low intrest compared to market standards which it takes from NABARD. NABARD moniters the loan sanctioning process of APCOB every month. So APCOB have to sanction loans to DCCB's based on how they are using the loans. To sanction a loan APCOB have to veify in various categories, this can be done through Scrutiny Notes. These scrutinies are generated till August 03 2024 manually, after that this application was helping them to generate the scrutinies. This web application generates scrutinies for only short term loans. This web application was specifically used by ST department of APCOB. According to market values within a year intrest of the loans can be reset after every 91 days. This was also done through this webpage.

## Features

- **Dynamic Scrutiny Generation**: Generates scrutiny reports based on user input values.
- **Eligibility Evaluation**: Evaluates and displays the eligibility of loans.
- **Download Option**: Allows users to download the generated scrutiny reports.
- **Add Loan Details**: Facilitates the addition of loan details with account numbers.
- **Reset Date Calculation**: Calculates and stores reset dates (91, 181, 271, 361, 365 days) from the loan sanction date.
- **Daily Reset Display**: Shows loans that need to be reset on the current day.
