# Product Requirement Document (PRD)

## Project Name: CredAI
**Tagline:** *Financial Trust Beyond Credit Scores*  
**Document Version:** 1.0.0  
**Date:** July 17, 2026  

---

## 1. Executive Summary & Purpose

Traditional credit rating agencies (e.g., CIBIL) primarily evaluate creditworthiness based on historical borrowing records, credit cards, and repayment histories. This leaves millions of credit-invisible individuals—including gig workers, street vendors, smallholder farmers, kirana shop owners, and freelancers—without access to formal, affordable credit, despite having stable incomes and disciplined financial behavior.

**CredAI** is an AI-powered alternative credit intelligence platform built to bridge this financial inclusion gap. By securely evaluating verified, consent-based financial transaction data (via India's Account Aggregator framework), CredAI generates a comprehensive, explainable alternative credit score (0–1000) that allows banks and NBFCs to underwrite thin-file borrowers with confidence.

---

## 2. Target Audience & User Personas

CredAI serves six specific underbanked segments:

1. **Street Vendors (e.g., Ramesh Kumar)**: Micro-retailers collecting small daily UPI payments (₹10 - ₹50) with high volume but no formal credit trail.
2. **Kirana Store Owners (e.g., Sunita Devi)**: Small retail grocers with high turnover, regular distributor outflows, and monthly/quarterly GST returns.
3. **Gig Workers (e.g., Vikram Rathore)**: Uber/Ola/Swiggy/Zomato contractors receiving weekly platform payouts with high recurring utility and fuel expenses.
4. **Smallholder Farmers (e.g., Harish Patel)**: Agricultural producers with highly seasonal crop yield income and government subsidies.
5. **Micro-Business Owners (e.g., Pooja Sharma)**: Boutique owners, artisans, and specialized shops with steady invoice collections and digital storefront presence.
6. **Freelancers / Self-Employed (e.g., Aditya Mehta)**: Tech/creative professionals receiving irregular project-based client payments.

---

## 3. Product Architecture & Key Features

### 3.1. Alternative Credit Scoring Engine
- **Score Range**: 0–1000 standard scale.
- **Risk Categorization**:
  - `850–1000`: Excellent
  - `700–850`: Low Risk
  - `550–700`: Medium Risk
  - `350–550`: High Risk
  - `Below 350`: Very High Risk
- **5-Factor Credit Subscores (weighted out of 100)**:
  1. *Transaction Volume*: Business velocity measured by net monthly inflows.
  2. *Cash Flow Stability*: Daily/weekly income consistency and predictability.
  3. *Revenue Performance*: Month-on-Month (MoM) sales growth trend.
  4. *Financial Discipline*: Maintenance of Average Daily Balance (ADB) and avoidance of transaction/cheque bounces.
  5. *Digital Footprint*: UPI transaction ratio, utility bill grades, and GST filing status.

### 3.2. Financial Inclusion Index (FII)
- Generates a holistic 7-axis radar chart showing:
  - *Income Stability*
  - *Cash Flow Health*
  - *Savings Behaviour*
  - *Business Growth*
  - *Payment Discipline*
  - *Fraud Safety*
  - *Digital Activity*
- Allows underwriters to assess specific dimensional strengths rather than relying on a single aggregate number.

### 3.3. Expense Behavior Analysis
- Classifies monthly expenditures into distinct buckets: *Rent, Suppliers, Fuel & Transport, Utilities, Food, Savings, and Other*.
- Visualized via a doughnut chart in the Borrower Dashboard.
- Evaluates the "Luxury/Other" spending ratio to output automated behavioral insights (e.g., flagging high discretionary spending).

### 3.4. Loan Recommendation Engine
- Automatically calculates recommended loan terms based on actual repayment capacity:
  $$\text{Repayment Capacity} = \text{Monthly Inflow} - \text{Monthly Expenses} - \text{Existing EMI}$$
- Outputs personalized pre-approved offers showing:
  - Eligible Loan Amount
  - Tailored Interest Rate
  - Estimated Monthly EMI or Daily Sachet Deductions
  - Suggested Tenure (Months)
  - AI Underwriting Confidence Percentage

### 3.5. Underwriter Stress Testing & XAI (Explainable AI)
- Enables underwriters to apply economic shock simulation sliders (Revenue Drop, Cost Increase, Volatility Rise).
- Recalculates credit scores, Debt Service Coverage Ratio (DSCR), and risk status in real-time under stress conditions.
- Uses **SHAP-inspired feature attribution** bar charts to explain the *why* behind AI score changes.
- Automatically generates natural language **AI Risk Commentary** summarizing buffer margins.

### 3.6. Fraud & Anomaly Detection
- Integrates a real-time Fraud Risk badge in the underwriter panel.
- Simulates anomaly detection checks (Isolation Forest, circular transaction tracking) to identify potential statement manipulation or credit cycling.

### 3.7. Onboarding & Authentication Flow (Login & Sign Up)
- **Multi-Role Portal Entry**: Allows entry through distinct user gates:
  - *Borrower Portal*: Supports entering a 10-digit Mobile Number or Email Address to trigger mock verification code delivery (verification code: `123456`). A Quick Select profile dropdown auto-populates mock borrower credentials for simplified playtesting.
  - *Lender / Underwriter Portal*: Authenticates institutional underwriters securely (defaults: `admin`/`admin`).
- **New User Registration (Sign Up)**: Exposes a signup form collecting borrower details (Name, Business Name, Sector, Utility Bills, Aadhaar Number, Mobile Number, Email Address, Monthly sales, ADB, and UPI ratios). Creates a new persona profile, generates transaction lists, registers the new credentials, and directs the user to the verification gate.
- **Session Logout**: Enables users to terminate their active sessions, clearing state inputs and returning them securely to the login gateway.

---

## 4. Technology Stack

- **Frontend**: Single Page Application built with HTML5, CSS3 (Vanilla CSS, Glassmorphism design system), JavaScript (ES6+), and Chart.js CDN.
- **Backend**: Node.js with Express.js REST APIs.
- **Storage**: JSON-based persistent storage (`database.json`) simulating a document store for hackathon purposes.
- **Protocol**: HTTP/JSON communications, CORS-Free Local Storage fallback for offline simulation.

---

## 5. Security, Privacy & Regulatory Compliance

- **Consent-based Framework**: End-to-end alignment with India's RBI-approved **Account Aggregator (AA)** gateway consent flow.
- **DPDP Act 2023 Compliance**: Customer maintains full data ownership, with consent logs and the ability to revoke data-sharing permissions at any time.
- **Encryption**: Simulator assumes AES-256 state encryption and TLS communication protocols.
- **Security Footer**: Institutional badges in UI displaying security and audit certifications (AES-256, RBI AA, DPDP 2023, RBAC).

---

## 6. Non-Functional Requirements & Design Aesthetics

- **Rich Dark Mode Interface**: Modern, neon-accented glassmorphism aesthetic using CSS variables, harmonized HSL color tokens, and premium typography (Inter/Outfit).
- **Responsive Layout**: Designed for seamless usage across desktop monitors, tablets, and mobile screens.
- **Micro-Animations**: Smooth visual transitions, card hover elevation scales, entry fades, and dynamic count-up score gauges to delight users.
