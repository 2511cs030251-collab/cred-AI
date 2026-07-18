// CredAI - Backend Express Server & Credit Engine

import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 8080;
const DB_FILE = path.join(__dirname, 'database.json');

app.use(express.json());
app.use(express.static(__dirname));

// ==========================================
// MOCK DATABASE ACCESS HELPERS
// ==========================================
let dbInMemory = null;

function loadDatabase() {
  if (dbInMemory) return dbInMemory;
  try {
    if (!fs.existsSync(DB_FILE)) {
      dbInMemory = { applications: [] };
      return dbInMemory;
    }
    const data = fs.readFileSync(DB_FILE, 'utf8');
    dbInMemory = JSON.parse(data);
    return dbInMemory;
  } catch (err) {
    console.error('Error loading database:', err);
    return { applications: [] };
  }
}

function saveDatabase(db) {
  dbInMemory = db;
  fs.writeFile(DB_FILE, JSON.stringify(db, null, 2), 'utf8', (err) => {
    if (err) console.error('Error saving database:', err);
  });
}

// ==========================================
// MOCK DATA & GENERATORS (Ported from data.js)
// ==========================================
const personas = {
  vendor: {
    id: "vendor",
    name: "Ramesh Kumar",
    avatar: "☕",
    businessName: "Ramesh Masala Chai Stall",
    roleName: "Street Vendor",
    location: "Chawri Bazar, Old Delhi",
    description: "Operates a high-footfall tea stall. Collects 95% of sales via UPI (₹10 - ₹50 per transaction). Lacks any formal credit history or bank credit card, but is financially disciplined.",
    baseMonthlySales: 24000,
    upiRatio: 0.95,
    avgDailyTxCount: 42,
    averageDailyBalance: 1400,
    hasGst: false,
    utilityGrade: "A",
    sector: "Micro-Retail",
    typicalLoanRequest: { amount: 15000, tenure: 3, purpose: "Purchase brass kettles & tea inventory" },
    monthlyOutflow: 18000,
    credentials: { panStatus: "Verified", aadhaarStatus: "Verified", gstStatus: "N/A", bankLinked: true }
  },
  kirana: {
    id: "kirana",
    name: "Sunita Devi",
    avatar: "🛒",
    businessName: "Devi Provisions & Kirana Store",
    roleName: "Kirana Store Owner",
    location: "Gachibowli, Hyderabad",
    description: "Runs a neighborhood grocery store. Has steady cash flow with high UPI volumes (BharatPe merchant QR) and weekly bank deposits. File contains GSTR compliance.",
    baseMonthlySales: 220000,
    upiRatio: 0.78,
    avgDailyTxCount: 95,
    averageDailyBalance: 24500,
    hasGst: true,
    gstFilingStatus: "Regular",
    utilityGrade: "A+",
    sector: "Retail Grocery",
    typicalLoanRequest: { amount: 150000, tenure: 12, purpose: "Stock FMCG and digital billing counter" },
    monthlyOutflow: 182000,
    credentials: { panStatus: "Verified", aadhaarStatus: "Verified", gstStatus: "Verified", bankLinked: true }
  },
  gig: {
    id: "gig",
    name: "Vikram Rathore",
    avatar: "🚖",
    businessName: "Vikram Fleet Cab Services",
    roleName: "Gig Worker (Cab Driver)",
    location: "Koramangala, Bengaluru",
    description: "Full-time rideshare driver registered on Uber and Ola. Receives weekly digital payouts from platforms. Maintains high rating (4.86/5) and constant vehicle maintenance spend.",
    baseMonthlySales: 45000,
    upiRatio: 0.90,
    avgDailyTxCount: 15,
    averageDailyBalance: 3200,
    hasGst: false,
    utilityGrade: "B",
    sector: "Logistics/Gig Economy",
    typicalLoanRequest: { amount: 40000, tenure: 6, purpose: "Major vehicle servicing and replacement tires" },
    monthlyOutflow: 38000,
    credentials: { panStatus: "Verified", aadhaarStatus: "Verified", gstStatus: "N/A", bankLinked: true }
  },
  farmer: {
    id: "farmer",
    name: "Harish Patel",
    avatar: "🌾",
    businessName: "Patel Organic Farms",
    roleName: "Smallholder Farmer",
    location: "Anand, Gujarat",
    description: "Cultivates cotton and groundnuts on 3 acres. Cash flow is highly seasonal with large cash/digital inflows post-harvest. Receives e-NAM payouts and PM-KISAN quarterly subsidies.",
    baseMonthlySales: 18000,
    upiRatio: 0.40,
    avgDailyTxCount: 2,
    averageDailyBalance: 12500,
    hasGst: false,
    utilityGrade: "A",
    sector: "Agriculture",
    typicalLoanRequest: { amount: 60000, tenure: 9, purpose: "Agro inputs & fertilizer procurement" },
    monthlyOutflow: 12000,
    credentials: { panStatus: "Verified", aadhaarStatus: "Verified", gstStatus: "N/A", bankLinked: true }
  },
  boutique: {
    id: "boutique",
    name: "Pooja Sharma",
    avatar: "🧵",
    businessName: "Pooja Designer Boutique",
    roleName: "Micro-Business Owner",
    location: "Colaba, Mumbai",
    description: "Bespoke tailoring and wedding wear shop. Registers consistent digital invoice payments and processes GSTR-1 filings. Cash flow shows steady upward trend via Instagram sales.",
    baseMonthlySales: 135000,
    upiRatio: 0.70,
    avgDailyTxCount: 6,
    averageDailyBalance: 29000,
    hasGst: true,
    gstFilingStatus: "Regular",
    utilityGrade: "B+",
    sector: "Apparel & Design",
    typicalLoanRequest: { amount: 100000, tenure: 12, purpose: "Procure sewing machines & pattern software" },
    monthlyOutflow: 98000,
    credentials: { panStatus: "Verified", aadhaarStatus: "Verified", gstStatus: "Verified", bankLinked: true }
  },
  freelancer: {
    id: "freelancer",
    name: "Aditya Mehta",
    avatar: "💻",
    businessName: "Aditya Digital Solutions",
    roleName: "Freelance Web Developer",
    location: "Koregaon Park, Pune",
    description: "Full-stack freelancer building web apps for startups. Receives project-based payments via UPI and bank transfers. Has irregular but growing income with strong digital presence.",
    baseMonthlySales: 95000,
    upiRatio: 0.85,
    avgDailyTxCount: 8,
    averageDailyBalance: 18000,
    hasGst: true,
    gstFilingStatus: "Regular",
    utilityGrade: "A",
    sector: "Technology/Freelance",
    typicalLoanRequest: { amount: 80000, tenure: 12, purpose: "MacBook Pro upgrade and co-working space annual membership" },
    monthlyOutflow: 65000,
    credentials: { panStatus: "Verified", aadhaarStatus: "Verified", gstStatus: "Verified", bankLinked: true }
  }
};

// collaborated bank list
const collaboratedBanks = [
  // ── Public Sector Banks ──
  { id: "sbi",       name: "State Bank of India",       logo: "🏛️", minScore: 720, baseInterest: 10.5, processingFee: 1.0,  mode: "Monthly NACH Auto-Debit",          description: "India's largest bank. Lowest rates for alternative-score borrowers with active balances." },
  { id: "bob",       name: "Bank of Baroda",            logo: "🏦", minScore: 680, baseInterest: 11.0, processingFee: 1.0,  mode: "Monthly NACH Auto-Debit",          description: "Kisan & MSME-focused lending. Strong rural reach with agri-credit and farm loans." },
  { id: "pnb",       name: "Punjab National Bank",      logo: "🏟️", minScore: 660, baseInterest: 11.5, processingFee: 1.25, mode: "Monthly NACH / Bi-monthly UPI",      description: "MSME credit for kirana stores, small factories and artisans." },
  // ── Private Banks ──
  { id: "hdfc",      name: "HDFC Bank",                 logo: "🏢", minScore: 750, baseInterest: 11.2, processingFee: 1.0,  mode: "Monthly NACH / Weekly UPI",         description: "Premium business credit lines with digital-first processing. Fastest disbursals for high scorers." },
  { id: "icici",     name: "ICICI Bank",                logo: "💳", minScore: 680, baseInterest: 12.5, processingFee: 1.5,  mode: "Monthly NACH / Weekly UPI",         description: "Flexible MSME loans with quick automated sanctions and working-capital products." },
  { id: "axis",      name: "Axis Bank",                 logo: "🔷", minScore: 700, baseInterest: 12.0, processingFee: 1.25, mode: "Monthly NACH / Fortnightly UPI",    description: "MSME Prime & Udyam credit products with doorstep banking and digital KYC." },
  { id: "kotak",     name: "Kotak Mahindra Bank",       logo: "🟡", minScore: 720, baseInterest: 11.8, processingFee: 1.0,  mode: "Monthly NACH Auto-Debit",          description: "Zero-fee digital current accounts with integrated working-capital credit for freelancers." },
  { id: "idfcfirst", name: "IDFC First Bank",           logo: "🔵", minScore: 640, baseInterest: 13.0, processingFee: 1.5,  mode: "Weekly UPI Settlement",            description: "Micro-business loans & monthly-income-linked credit with no prepayment penalty." },
  { id: "rbl",       name: "RBL Bank",                  logo: "🔴", minScore: 620, baseInterest: 14.0, processingFee: 1.75, mode: "Weekly UPI QR Settlement",          description: "Merchant cash-advance and supply-chain finance for kirana & micro-retail businesses." },
  // ── Small Finance Banks ──
  { id: "federal",   name: "Federal Bank",              logo: "🏦", minScore: 600, baseInterest: 14.5, processingFee: 2.0,  mode: "Weekly UPI QR Settlement",         description: "Sachet repayments for micro-merchants. Kerala-strong with pan-India digital reach." },
  { id: "jana",      name: "Jana Small Finance Bank",   logo: "🌿", minScore: 520, baseInterest: 16.5, processingFee: 2.0,  mode: "Weekly UPI / Bi-weekly collect",   description: "MSME micro-loans for vendors, gig workers and rural entrepreneurs with minimal docs." },
  { id: "ujjivan",   name: "Ujjivan Small Finance Bank", logo: "☀️", minScore: 480, baseInterest: 17.0, processingFee: 2.0,  mode: "Daily/Weekly UPI Collect",         description: "Microfinance-grade loans for informal sector workers with daily repayments." },
  // ── NBFCs ──
  { id: "muthoot",   name: "Muthoot Finance",           logo: "💰", minScore: 500, baseInterest: 17.5, processingFee: 2.0,  mode: "Daily UPI QR Deductions",          description: "No collateral required. Daily repayments computed from real-time sales velocity." },
  { id: "bajaj",     name: "Bajaj Finserv",             logo: "⚡", minScore: 600, baseInterest: 15.0, processingFee: 1.75, mode: "Monthly EMI / Flexi-Loan",          description: "Flexi business loans with part-withdraw & part-repay. Best for boutique & seasonal businesses." },
  { id: "indifi",    name: "Indifi Merchant Capital",   logo: "🚀", minScore: 450, baseInterest: 21.0, processingFee: 2.5,  mode: "Daily UPI Split (5% QR sales)",   description: "Revenue-based financing for gig workers & vendors. No fixed EMI — repay as you earn." },
  { id: "creditseva",name: "CreditSeva NBFC",           logo: "🤝", minScore: 380, baseInterest: 24.0, processingFee: 3.0,  mode: "Daily Micro-Debit (₹50–₹200)",    description: "Last-mile credit for very-first-time borrowers and informal vendors." }
];

function resolvePersona(id) {
  if (personas[id]) return personas[id];
  if (id && id.startsWith('custom_')) {
    return {
      id,
      name: "Custom Borrower",
      avatar: "👤",
      businessName: "Custom Store",
      roleName: "Custom Retailer",
      location: "Kalyan, Maharashtra",
      description: "Custom self-built profile",
      baseMonthlySales: 80000,
      upiRatio: 0.8,
      averageDailyBalance: 12000,
      hasGst: true,
      utilityGrade: "A",
      sector: "kirana"
    };
  }
  return null;
}

function generateTransactions(personaId) {
  const persona = resolvePersona(personaId);
  const txList = [];
  const currentDate = new Date();
  
  for (let i = 180; i >= 0; i--) {
    const txDate = new Date();
    txDate.setDate(currentDate.getDate() - i);
    const isWeekend = txDate.getDay() === 0 || txDate.getDay() === 6;
    
    if (personaId === "vendor") {
      const txCount = isWeekend ? Math.floor(Math.random() * 20) + 15 : Math.floor(Math.random() * 40) + 20;
      let dailyInflow = 0;
      for (let t = 0; t < txCount; t++) {
        const amount = Math.floor(Math.random() * 40) + 10;
        dailyInflow += amount;
      }
      txList.push({
        date: formatDate(txDate),
        type: "Deposit",
        description: `UPI Aggregate: Merchant BharatPe QR (${txCount} sales)`,
        category: "UPI Customer Payment",
        amount: Math.floor(dailyInflow),
        status: "Success"
      });
      if (txDate.getDay() === 1) {
        txList.push({
          date: formatDate(txDate),
          type: "Withdrawal",
          description: "UPI: Mother Dairy Milk Vendor",
          category: "Supplier Settlement",
          amount: Math.floor(Math.random() * 1000) + 2500,
          status: "Success"
        });
      }
      if (txDate.getDate() === 5) {
        txList.push({
          date: formatDate(txDate),
          type: "Withdrawal",
          description: "UPI: Stall Ground Rent",
          category: "Rent",
          amount: 2500,
          status: "Success"
        });
      }
    } else if (personaId === "kirana") {
      if (Math.random() > 0.1) {
        txList.push({
          date: formatDate(txDate),
          type: "Deposit",
          description: "UPI Merchant settlement: PayTM QR",
          category: "UPI Customer Payment",
          amount: Math.floor(Math.random() * 4000) + 2000,
          status: "Success"
        });
      }
      if (txDate.getDay() === 3) {
        txList.push({
          date: formatDate(txDate),
          type: "Withdrawal",
          description: "NEFT: ITC Distributor Settlement",
          category: "Supplier Settlement",
          amount: Math.floor(Math.random() * 15000) + 25000,
          status: "Success"
        });
      }
      if (txDate.getDate() === 2) {
        txList.push({
          date: formatDate(txDate),
          type: "Withdrawal",
          description: "Rent: Commercial Complex Owner",
          category: "Rent",
          amount: 22000,
          status: "Success"
        });
      }
    } else if (personaId === "gig") {
      if (txDate.getDay() === 2) {
        txList.push({
          date: formatDate(txDate),
          type: "Deposit",
          description: "IMPS: Uber India Payout",
          category: "Platform Payout",
          amount: Math.floor(Math.random() * 4000) + 8500,
          status: "Success"
        });
      }
      if (txDate.getDay() !== 0) {
        txList.push({
          date: formatDate(txDate),
          type: "Withdrawal",
          description: "UPI: IndianOil Fuel Station",
          category: "Fuel Expense",
          amount: Math.floor(Math.random() * 200) + 550,
          status: "Success"
        });
      }
    } else if (personaId === "farmer") {
      const daysAgo = 180 - i;
      if (daysAgo === 30) {
        txList.push({
          date: formatDate(txDate),
          type: "Deposit",
          description: "e-NAM: Cotton Crop Auction Yield payout",
          category: "e-NAM Harvest Payout",
          amount: 85000,
          status: "Success"
        });
      }
      if (daysAgo === 120) {
        txList.push({
          date: formatDate(txDate),
          type: "Deposit",
          description: "e-NAM: Groundnut Harvest payout",
          category: "e-NAM Harvest Payout",
          amount: 62000,
          status: "Success"
        });
      }
      if (txDate.getDay() === 6) {
        txList.push({
          date: formatDate(txDate),
          type: "Deposit",
          description: "UPI: Amul Milk Dairy Pouring Coop",
          category: "UPI Customer Payment",
          amount: Math.floor(Math.random() * 300) + 1200,
          status: "Success"
        });
      }
    } else if (personaId === "boutique") {
      if (Math.random() > 0.6) {
        txList.push({
          date: formatDate(txDate),
          type: "Deposit",
          description: `UPI: Invoice Collection-Client-${Math.floor(Math.random() * 80) + 10}`,
          category: "Invoice Settlement",
          amount: Math.floor(Math.random() * 15000) + 10000,
          status: "Success"
        });
      }
      if (txDate.getDate() === 1) {
        txList.push({
          date: formatDate(txDate),
          type: "Withdrawal",
          description: "NEFT: Boutique Store Rental Colaba",
          category: "Rent",
          amount: 35000,
          status: "Success"
        });
      }
    } else if (personaId === "freelancer") {
      if (txDate.getDay() === 5) {
        txList.push({
          date: formatDate(txDate),
          type: "Deposit",
          description: `IMPS: Project Payment - Client-${Math.floor(Math.random() * 50) + 1}`,
          category: "Project Payment",
          amount: Math.floor(Math.random() * 25000) + 15000,
          status: "Success"
        });
      }
      if (txDate.getDate() === 5) {
        txList.push({
          date: formatDate(txDate),
          type: "Withdrawal",
          description: "UPI: Rent Payment - Koregaon Park Flat",
          category: "Rent",
          amount: 18000,
          status: "Success"
        });
      }
      if (txDate.getDay() === 1) {
        txList.push({
          date: formatDate(txDate),
          type: "Withdrawal",
          description: "UPI: Co-Working Space Weekly Pass",
          category: "Office Expense",
          amount: 500,
          status: "Success"
        });
      }
    }
  }
  return txList.sort((a, b) => new Date(b.date) - new Date(a.date));
}

function formatDate(date) {
  const yyyy = date.getFullYear();
  let mm = date.getMonth() + 1;
  let dd = date.getDate();
  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;
  return `${yyyy}-${mm}-${dd}`;
}

// ==========================================
// SCORING ENGINE LOGIC (Ported from scoring.js)
// ==========================================
function evaluateCredit(persona, stability, adb, growth, hasGst, bounces, credentials = null, totalOutflow = null, transactions = null) {
  let totalInflow = persona.baseMonthlySales;
  let computedOutflow = totalOutflow !== null ? totalOutflow : (persona.monthlyOutflow || totalInflow * 0.75);
  
  // If transactions are provided, calculate metrics dynamically from transaction history!
  if (transactions && Array.isArray(transactions) && transactions.length > 0) {
    let depositSum = 0;
    let withdrawalSum = 0;
    let bounceCount = 0;
    let successCount = 0;
    
    // Sort transactions chronologically to calculate running balance
    const sortedTx = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date));
    
    // Reconstruct daily balance
    let currentBalance = adb || 10000;
    let dailyBalances = {};
    
    sortedTx.forEach(tx => {
      const txAmount = parseFloat(tx.amount) || 0;
      if (tx.type === 'Deposit') {
        depositSum += txAmount;
        currentBalance += txAmount;
      } else if (tx.type === 'Withdrawal') {
        withdrawalSum += txAmount;
        currentBalance -= txAmount;
      }
      
      const desc = (tx.description || "").toLowerCase();
      const status = (tx.status || "").toLowerCase();
      if (desc.includes("bounce") || desc.includes("fail") || desc.includes("returned") || desc.includes("insufficient") || status === 'failed') {
        bounceCount++;
      } else {
        successCount++;
      }
      
      dailyBalances[tx.date] = currentBalance;
    });
    
    // Assume 6 month statement evaluation period
    totalInflow = depositSum / 6;
    computedOutflow = withdrawalSum / 6;
    bounces = bounceCount;
    
    // Calculate Average Daily Balance
    const dates = Object.keys(dailyBalances);
    if (dates.length > 0) {
      let sum = 0;
      dates.forEach(d => sum += dailyBalances[d]);
      adb = sum / dates.length;
    } else {
      adb = currentBalance;
    }
    
    const totalTx = sortedTx.length;
    const successRatio = totalTx > 0 ? (successCount / totalTx) : 1.0;
    stability = Math.min(100, Math.round(successRatio * 100));
  }
  
  // 1. Transaction Volume Score (Max 100)
  let volScore = 45;
  if (totalInflow > 150000) volScore = 95;
  else if (totalInflow > 80000) volScore = 85;
  else if (totalInflow > 40000) volScore = 75;
  else if (totalInflow > 20000) volScore = 65;
  
  // 2. Cash Flow Stability Score (Max 150)
  let stabScore = Math.min(150, Math.floor((stability / 100) * 150));
  
  // 3. Business Performance Score (Max 150)
  let perfScore = 80;
  if (growth > 10) perfScore = 145;
  else if (growth > 5) perfScore = 125;
  else if (growth > 0) perfScore = 100;
  else if (growth > -10) perfScore = 70;
  else perfScore = 40;
  
  // 4. Financial Discipline & Expenditure (Max 180)
  // ADB component (Max 120)
  let adbToInflowRatio = totalInflow > 0 ? (adb / totalInflow) : 0;
  let adbScore = 40;
  if (adbToInflowRatio > 0.20) adbScore = 120;
  else if (adbToInflowRatio > 0.10) adbScore = 100;
  else if (adbToInflowRatio > 0.05) adbScore = 80;
  else if (adbToInflowRatio > 0.02) adbScore = 60;
  
  // Expenditure / Inflow component (Max 60)
  const expenseRatio = totalInflow > 0 ? (computedOutflow / totalInflow) : 1;
  let expenseScore = 20;
  if (expenseRatio <= 0.60) expenseScore = 60;
  else if (expenseRatio <= 0.80) expenseScore = 45;
  else if (expenseRatio <= 0.90) expenseScore = 30;
  else if (expenseRatio > 0.95) expenseScore = 0;
  
  let discScore = adbScore + expenseScore;
  if (expenseRatio > 0.95) {
    discScore = Math.max(10, discScore - 30); // Expenditure penalty
  }
  
  discScore = Math.max(20, discScore - (bounces * 45));
  discScore = Math.min(180, discScore);
  
  // 5. Digital Footprint & Verified Credentials Score (Max 120)
  let digBaseScore = 50;
  if (persona.upiRatio > 0.85) digBaseScore += 25;
  else if (persona.upiRatio > 0.50) digBaseScore += 15;
  
  if (persona.utilityGrade === "A+" || persona.utilityGrade === "A") digBaseScore += 15;
  else if (persona.utilityGrade === "B+" || persona.utilityGrade === "B") digBaseScore += 10;
  
  let credScore = 10;
  let hasUnverifiedCritical = false;
  
  const activeCreds = credentials || persona.credentials || { panStatus: "Verified", aadhaarStatus: "Verified", gstStatus: hasGst ? "Verified" : "N/A", bankLinked: true };
  
  if (activeCreds.panStatus === "Verified") credScore += 10;
  else if (activeCreds.panStatus === "Unverified") hasUnverifiedCritical = true;
  
  if (activeCreds.aadhaarStatus === "Verified") credScore += 10;
  else if (activeCreds.aadhaarStatus === "Unverified") hasUnverifiedCritical = true;
  
  if (activeCreds.gstStatus === "Verified" || activeCreds.gstStatus === "N/A") credScore += 10;
  else if (activeCreds.gstStatus === "Unverified") hasUnverifiedCritical = true;
  
  let digScore = digBaseScore + credScore;
  if (hasUnverifiedCritical) {
    digScore = Math.max(10, digScore - 80); // Fraud penalty
  }
  digScore = Math.min(120, digScore);
  
  const rawSum = volScore + stabScore + perfScore + discScore + digScore;
  const pragatiScore = Math.round((rawSum / 700) * 1000);
  
  let tier = "Average";
  let tierClass = "tier-average";
  if (pragatiScore >= 850) {
    tier = "Excellent";
    tierClass = "tier-excellent";
  } else if (pragatiScore >= 700) {
    tier = "Low Risk";
    tierClass = "tier-good";
  } else if (pragatiScore >= 550) {
    tier = "Medium Risk";
    tierClass = "tier-average";
  } else if (pragatiScore >= 350) {
    tier = "High Risk";
    tierClass = "tier-poor";
  } else {
    tier = "Very High Risk";
    tierClass = "tier-poor";
  }
  
  const baselines = { vol: 70, stab: 100, perf: 95, disc: 110, dig: 80 };
  const shapWeights = [
    { feature: "Cash Flow Stability", val: stabScore - baselines.stab },
    { feature: "Average Daily Balance", val: discScore - baselines.disc },
    { feature: "Digital footprint / GST", val: digScore - baselines.dig },
    { feature: "Revenue Growth Trend", val: perfScore - baselines.perf },
    { feature: "Transaction Vol (UPI count)", val: volScore - baselines.vol }
  ];
  
  const insights = [];
  if (stability < 75) {
    insights.push({ type: "info", title: "Stabilize Weekly Inflows", desc: "Consolidate sales receipts into your main bank account." });
  } else {
    insights.push({ type: "positive", title: "Excellent Inflow Consistency", desc: "Steady digital inflows indicate highly predictable revenues." });
  }
  if (adbToInflowRatio < 0.05) {
    insights.push({ type: "info", title: "Increase Cash Reserves", desc: "Aim to maintain at least 5% of monthly inflows as a daily balance." });
  } else {
    insights.push({ type: "positive", title: "Healthy Cash Buffers", desc: "Strong average daily balance buffers against sudden slowdowns." });
  }
  if (activeCreds.gstStatus === "Verified") {
    insights.push({ type: "positive", title: "GST Compliance Bonus", desc: "Active GST status confirms tax compliance and acts as verified profile strength." });
  }
  if (hasUnverifiedCritical) {
    insights.push({ type: "info", title: "Verify KYC Credentials", desc: "Unverified PAN or Aadhaar credentials limit your credit potential and increase risk rating." });
  }
  if (expenseRatio > 0.90) {
    insights.push({ type: "info", title: "Optimize Expenditures", desc: "High monthly expenditures (spending " + Math.round(expenseRatio * 100) + "% of inflows) compress your repayment buffer." });
  } else if (expenseRatio <= 0.70) {
    insights.push({ type: "positive", title: "Strong Savings Surplus", desc: "Low monthly expenditure ratio leaves a healthy cash buffer for loan repayments." });
  }
  
  return { 
    pragatiScore, 
    tier, 
    tierClass, 
    subscores: { 
      volume: Math.round((volScore/100)*100), 
      stability: Math.round((stabScore/150)*100), 
      performance: Math.round((perfScore/150)*100), 
      discipline: Math.round((discScore/180)*100), 
      digital: Math.round((digScore/120)*100) 
    }, 
    shapWeights, 
    insights, 
    metrics: { 
      adb: Math.round(adb), 
      totalInflow: Math.round(totalInflow), 
      growth, 
      stability, 
      bounces, 
      totalOutflow: Math.round(computedOutflow),
      expenseRatio: parseFloat(expenseRatio.toFixed(2)),
      credentials: activeCreds
    } 
  };
}

// ==========================================
// REST API ENDPOINTS
// ==========================================

// 1. Get Borrower Personas
app.get('/api/personas', (req, res) => {
  res.json(Object.values(personas));
});

const transactionCache = {};

// 2. Get Transactions for Persona
app.get('/api/borrowers/:id/transactions', (req, res) => {
  const id = req.params.id;
  if (!resolvePersona(id)) return res.status(404).json({ error: 'Persona not found' });
  if (!transactionCache[id]) {
    transactionCache[id] = generateTransactions(id);
  }
  res.json(transactionCache[id]);
});

// 3. Compute Score
app.post('/api/score', (req, res) => {
  const { personaId, customUploadContent, transactions, credentials, totalOutflow } = req.body;
  const persona = resolvePersona(personaId);
  if (!persona) return res.status(404).json({ error: 'Persona not found' });
  
  // Scoring parameters (with defaults or upload overrides)
  let stability = 80, adb = 2000, growth = 5.0, hasGst = persona.hasGst, bounces = 0;
  let computedOutflow = totalOutflow !== undefined && totalOutflow !== null ? totalOutflow : persona.monthlyOutflow;
  let activeCreds = credentials || persona.credentials;
  
  if (personaId === 'vendor') { stability = 94; adb = 1400; growth = 6.2; }
  else if (personaId === 'kirana') { stability = 91; adb = 24500; growth = 8.5; }
  else if (personaId === 'gig') { stability = 85; adb = 3200; growth = 3.1; }
  else if (personaId === 'farmer') { stability = 52; adb = 12500; growth = 4.8; }
  else if (personaId === 'boutique') { stability = 88; adb = 29000; growth = 12.4; }
  else if (personaId === 'freelancer') { stability = 78; adb = 18000; growth = 9.8; }

  if (customUploadContent) {
    adb = customUploadContent.averageDailyBalance;
    stability = parseInt(customUploadContent.adbStability);
    growth = parseFloat(customUploadContent.growthRate);
    hasGst = customUploadContent.gstStatus && !customUploadContent.gstStatus.includes("None");
    bounces = customUploadContent.chequeBounces || 0;
    computedOutflow = customUploadContent.totalOutflows ? (customUploadContent.totalOutflows / 6) : (customUploadContent.monthlyOutflow || customUploadContent.monthlyExpenses || computedOutflow);
    if (customUploadContent.credentials) {
      activeCreds = customUploadContent.credentials;
    } else {
      activeCreds = {
        panStatus: customUploadContent.panStatus || (customUploadContent.panVerified ? "Verified" : "Unverified"),
        aadhaarStatus: customUploadContent.aadhaarStatus || (customUploadContent.aadhaarVerified ? "Verified" : "Unverified"),
        gstStatus: customUploadContent.gstStatus ? (customUploadContent.gstStatus.includes("Verified") ? "Verified" : "Unverified") : (hasGst ? "Verified" : "N/A"),
        bankLinked: customUploadContent.bankLinked !== undefined ? customUploadContent.bankLinked : true
      };
    }
  }
  
  const evalResults = evaluateCredit(persona, stability, adb, growth, hasGst, bounces, activeCreds, computedOutflow, transactions);
  res.json(evalResults);
});

// 4. Get Bank Offers matching Borrower Profile
app.get('/api/banks/offers', (req, res) => {
  const score = parseInt(req.query.score) || 600;
  const requestedAmount = parseInt(req.query.amount) || 20000;
  
  const offers = collaboratedBanks.map(bank => {
    const isApproved = score >= bank.minScore;
    
    // Adjust interest rate slightly based on credit score strength
    const rateSlope = (36 - 12) / (900 - 300);
    const scoreDiscount = (score - bank.minScore) * 0.02;
    const finalInterest = isApproved 
      ? Math.max(9.5, bank.baseInterest - scoreDiscount) 
      : bank.baseInterest;
      
    // Max eligible limit
    let multiplier = 0.5;
    if (score >= 780) multiplier = 3.2;
    else if (score >= 680) multiplier = 1.8;
    else if (score >= 580) multiplier = 1.0;
    else multiplier = 0.5;
    
    const maxLimit = Math.round(requestedAmount * multiplier);
    
    return {
      id: bank.id,
      name: bank.name,
      logo: bank.logo,
      isApproved,
      interestRate: parseFloat(finalInterest.toFixed(1)),
      processingFee: bank.processingFee,
      mode: bank.mode,
      maxLimit,
      description: bank.description,
      minScore: bank.minScore
    };
  });
  
  res.json(offers);
});

// 5. Apply for a Loan
app.post('/api/loans/apply', (req, res) => {
  const { personaId, borrowerName, score, bankId, requestedAmount, tenureMonths, purpose, customDetails } = req.body;
  let persona = resolvePersona(personaId);
  if (persona && customDetails) {
    persona = {
      ...persona,
      baseMonthlySales: customDetails.baseMonthlySales,
      upiRatio: customDetails.upiRatio,
      averageDailyBalance: customDetails.averageDailyBalance,
      hasGst: customDetails.hasGst,
      utilityGrade: customDetails.utilityGrade,
      sector: customDetails.sector,
      businessName: customDetails.businessName || persona.businessName,
      roleName: customDetails.roleName || persona.roleName,
      monthlyOutflow: customDetails.monthlyOutflow !== undefined ? customDetails.monthlyOutflow : (customDetails.monthlyExpenses || persona.monthlyOutflow),
      credentials: customDetails.credentials || persona.credentials
    };
  }
  const bank = collaboratedBanks.find(b => b.id === bankId);
  
  if (!persona || !bank) {
    return res.status(400).json({ error: 'Invalid persona or bank selection' });
  }
  
  const db = loadDatabase();
  const newAppId = `app_${Date.now()}`;
  
  // Calculate specific interest rate and eligibility
  const isApproved = score >= bank.minScore;
  const scoreDiscount = (score - bank.minScore) * 0.02;
  const interestRate = parseFloat((isApproved ? Math.max(9.5, bank.baseInterest - scoreDiscount) : bank.baseInterest).toFixed(1));
  
  // Calculate Debt service DSCR
  const inflow = persona.baseMonthlySales;
  const assumedEmi = (requestedAmount * (1 + (interestRate/100) * (tenureMonths/12))) / tenureMonths;
  const operatingOutflows = persona.monthlyOutflow !== undefined ? persona.monthlyOutflow : inflow * 0.82;
  const freeCashFlow = inflow - operatingOutflows;
  const dscr = parseFloat(((freeCashFlow + assumedEmi) / assumedEmi).toFixed(2));
  
  let riskStatus = "Low";
  if (score < 550 || dscr < 1.0) riskStatus = "High Risk";
  else if (score < 680 || dscr < 1.25) riskStatus = "Medium Risk";

  const newApplication = {
    id: newAppId,
    personaId,
    borrowerName,
    businessName: persona.businessName,
    roleName: persona.roleName,
    location: persona.location,
    requestedAmount: parseInt(requestedAmount),
    tenureMonths: parseInt(tenureMonths),
    purpose,
    score: parseInt(score),
    bankId,
    bankName: bank.name,
    interestRate,
    repaymentMode: bank.mode,
    status: isApproved ? "Pending" : "Rejected", // Rejected if score below bank criteria
    dscr,
    riskStatus,
    createdAt: new Date().toISOString(),
    customDetails: customDetails || null
  };
  
  db.applications.unshift(newApplication);
  saveDatabase(db);
  
  res.json({ success: true, application: newApplication });
});

// 6. Get Underwriter Applications
app.get('/api/underwriter/applications', (req, res) => {
  const db = loadDatabase();
  res.json(db.applications);
});

// 7. Approve / Reject Application
app.post('/api/underwriter/applications/:id/decision', (req, res) => {
  const appId = req.params.id;
  const { status } = req.body; // "Approved" or "Rejected"
  
  const db = loadDatabase();
  const appIdx = db.applications.findIndex(a => a.id === appId);
  
  if (appIdx === -1) return res.status(404).json({ error: 'Application not found' });
  
  db.applications[appIdx].status = status;
  saveDatabase(db);
  
  res.json({ success: true, application: db.applications[appIdx] });
});

// 8. Run Underwriter Stress test calculation
app.post('/api/underwriter/applications/:id/stress', (req, res) => {
  const appId = req.params.id;
  const { revenueShock, costShock, volShock } = req.body;
  
  const db = loadDatabase();
  const loanApp = db.applications.find(a => a.id === appId);
  
  if (!loanApp) return res.status(404).json({ error: 'Application not found' });
  
  let persona = resolvePersona(loanApp.personaId);
  
  // Base parameters
  let stability = 80, adb = 2000, growth = 5.0;
  let monthlyOutflow = persona ? (persona.monthlyOutflow || persona.baseMonthlySales * 0.75) : 15000;
  let credentials = persona ? (persona.credentials || { panStatus: "Verified", aadhaarStatus: "Verified", gstStatus: persona.hasGst ? "Verified" : "N/A" }) : null;
  
  if (loanApp.customDetails) {
    const cd = loanApp.customDetails;
    persona = {
      ...persona,
      baseMonthlySales: cd.baseMonthlySales,
      upiRatio: cd.upiRatio,
      averageDailyBalance: cd.averageDailyBalance,
      hasGst: cd.hasGst,
      utilityGrade: cd.utilityGrade,
      sector: cd.sector,
      businessName: cd.businessName,
      roleName: cd.roleName,
      monthlyOutflow: cd.monthlyOutflow !== undefined ? cd.monthlyOutflow : (cd.monthlyExpenses || (cd.baseMonthlySales * 0.75)),
      credentials: cd.credentials || (persona ? persona.credentials : null)
    };
    stability = 85;
    adb = cd.averageDailyBalance;
    growth = 6.5;
    monthlyOutflow = persona.monthlyOutflow;
    credentials = persona.credentials;
  } else if (persona) {
    if (loanApp.personaId === 'vendor') { stability = 94; adb = 1400; growth = 6.2; }
    else if (loanApp.personaId === 'kirana') { stability = 91; adb = 24500; growth = 8.5; }
    else if (loanApp.personaId === 'gig') { stability = 85; adb = 3200; growth = 3.1; }
    else if (loanApp.personaId === 'farmer') { stability = 52; adb = 12500; growth = 4.8; }
    else if (loanApp.personaId === 'boutique') { stability = 88; adb = 29000; growth = 12.4; }
    else if (loanApp.personaId === 'freelancer') { stability = 78; adb = 18000; growth = 9.8; }
    monthlyOutflow = persona.monthlyOutflow;
    credentials = persona.credentials;
  }

  // Apply shocks
  const revFactor = 1 - (revenueShock / 100);
  const costFactor = 1 + (costShock / 100);
  
  const stressedInflow = Math.max(1000, persona.baseMonthlySales * revFactor);
  const estimatedOutflows = (monthlyOutflow) * costFactor;
  const monthlySavings = stressedInflow - estimatedOutflows;
  
  let stressedAdb = adb;
  if (monthlySavings < 0) {
    stressedAdb = Math.max(200, adb + (monthlySavings * 0.2));
  } else {
    stressedAdb = Math.max(500, adb * revFactor);
  }
  
  const stressedStability = Math.max(10, stability - (volShock * 0.5));
  const stressedGrowth = growth - (revenueShock * 0.4);
  const bounces = Math.max(0, Math.floor(volShock / 20));
  
  // Recompute score
  const stressedScoring = evaluateCredit(persona, stressedStability, stressedAdb, stressedGrowth, persona.hasGst, bounces, credentials, estimatedOutflows);
  
  // Recalculate DSCR
  const assumedEmi = (loanApp.requestedAmount * (1 + (loanApp.interestRate/100) * (loanApp.tenureMonths/12))) / loanApp.tenureMonths;
  const stressedFcf = stressedInflow - estimatedOutflows;
  const stressedDscr = assumedEmi > 0 ? (Math.max(0, stressedFcf) + assumedEmi) / assumedEmi : 0.8;
  
  let riskStatus = "Low";
  let riskClass = "risk-low";
  if (stressedScoring.pragatiScore < 400 || stressedDscr < 1.0) {
    riskStatus = "High Risk";
    riskClass = "risk-high";
  } else if (stressedScoring.pragatiScore < 600 || stressedDscr < 1.25) {
    riskStatus = "Medium Risk";
    riskClass = "risk-mid";
  }
  
  res.json({
    pragatiScore: stressedScoring.pragatiScore,
    scoreDiff: stressedScoring.pragatiScore - loanApp.score,
    tier: stressedScoring.tier,
    tierClass: stressedScoring.tierClass,
    metrics: {
      adb: Math.round(stressedAdb),
      inflow: Math.round(stressedInflow),
      stability: Math.round(stressedStability),
      growth: parseFloat(stressedGrowth.toFixed(1)),
      dscr: parseFloat(stressedDscr.toFixed(2))
    },
    riskStatus,
    riskClass
  });
});

// 9. Financial Inclusion Index
app.get('/api/financial-inclusion-index/:personaId', (req, res) => {
  const persona = resolvePersona(req.params.personaId);
  if (!persona) return res.status(404).json({ error: 'Persona not found' });
  
  const income = persona.baseMonthlySales;
  const adb = persona.averageDailyBalance;
  
  const index = {
    incomeStability: persona.id === 'farmer' ? 45 : persona.id === 'gig' ? 65 : persona.id === 'freelancer' ? 72 : 85,
    cashFlowHealth: Math.min(100, Math.round((adb / income) * 500)),
    savingsBehaviour: Math.min(100, Math.round((adb / income) * 400)),
    businessGrowth: persona.id === 'boutique' ? 92 : persona.id === 'freelancer' ? 88 : persona.id === 'kirana' ? 82 : 68,
    paymentDiscipline: persona.utilityGrade === 'A+' ? 95 : persona.utilityGrade === 'A' ? 88 : persona.utilityGrade === 'B+' ? 75 : 62,
    fraudRisk: 8,
    digitalActivity: Math.min(100, Math.round(persona.upiRatio * 100 + (persona.hasGst ? 15 : 0)))
  };
  
  res.json(index);
});

app.listen(PORT, () => {
  console.log(`CredAI Backend Server listening on http://localhost:${PORT}`);
  console.log(`Database File: ${DB_FILE}`);
});
