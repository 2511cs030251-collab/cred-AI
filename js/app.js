// CredAI - Unified Client-Side Application (With CORS-Free Local Storage Fallback)

// ==========================================
// 1. DATA AND PERSONA DECLARATIONS (data.js)
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
    typicalLoanRequest: {
      amount: 15000,
      tenure: 3,
      purpose: "Purchase high-quality brass kettles and bulk tea/milk inventory for winter rush"
    },
    metrics: { adb: 1400, monthlyInflow: 24800, inflowStability: 94, growthTrend: 6.2, repaymentCapacity: 88 },
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
    description: "Runs a neighborhood grocery store. Has steady cash flow with high UPI volumes (BharatPe merchant QR) and weekly bank deposits. File contains distributor pay-outs.",
    baseMonthlySales: 220000,
    upiRatio: 0.78,
    avgDailyTxCount: 95,
    averageDailyBalance: 24500,
    hasGst: true,
    gstFilingStatus: "Regular (GSTR-3B filed monthly)",
    utilityGrade: "A+",
    sector: "Retail Grocery",
    typicalLoanRequest: {
      amount: 150000,
      tenure: 12,
      purpose: "Inventory expansion to stock fast-moving consumer goods and digital billing counter setup"
    },
    metrics: { adb: 24500, monthlyInflow: 225000, inflowStability: 91, growthTrend: 8.5, repaymentCapacity: 92 },
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
    typicalLoanRequest: {
      amount: 40000,
      tenure: 6,
      purpose: "Major vehicle servicing and replacement of all four tires before monsoon"
    },
    metrics: { adb: 3200, monthlyInflow: 46200, inflowStability: 85, growthTrend: 3.1, repaymentCapacity: 79 },
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
    typicalLoanRequest: {
      amount: 60000,
      tenure: 9,
      purpose: "Fertilizer purchase and high-yield seed procurement for upcoming Kharif sowing season"
    },
    metrics: { adb: 12500, monthlyInflow: 18400, inflowStability: 52, growthTrend: 4.8, repaymentCapacity: 75 },
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
    gstFilingStatus: "Regular (Quarterly GSTR-1 filed)",
    utilityGrade: "B+",
    sector: "Apparel & Design",
    typicalLoanRequest: {
      amount: 100000,
      tenure: 12,
      purpose: "Procurement of specialized sewing machines and digital sewing pattern software"
    },
    metrics: { adb: 29000, monthlyInflow: 138000, inflowStability: 88, growthTrend: 12.4, repaymentCapacity: 86 },
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
    gstFilingStatus: "Regular (Quarterly GSTR-1 filed)",
    utilityGrade: "A",
    sector: "Technology/Freelance",
    typicalLoanRequest: {
      amount: 80000,
      tenure: 12,
      purpose: "MacBook Pro upgrade and co-working space annual membership"
    },
    metrics: { adb: 18000, monthlyInflow: 97000, inflowStability: 78, growthTrend: 9.8, repaymentCapacity: 84 },
    monthlyOutflow: 65000,
    credentials: { panStatus: "Verified", aadhaarStatus: "Verified", gstStatus: "Verified", bankLinked: true }
  }
};

const collaboratedBanks = [
  // ── Public Sector Banks ──
  { id: "sbi",      name: "State Bank of India",      logo: "🏛️", minScore: 720, baseInterest: 10.5, processingFee: 1.0, mode: "Monthly NACH Auto-Debit",          description: "India's largest bank. Lowest rates for highly consistent alternative-score borrowers with active balances." },
  { id: "bob",      name: "Bank of Baroda",           logo: "🏦", minScore: 680, baseInterest: 11.0, processingFee: 1.0, mode: "Monthly NACH Auto-Debit",          description: "Kisan & MSME-focused lending. Strong rural reach with agri-credit and farm-equipment loans." },
  { id: "pnb",      name: "Punjab National Bank",     logo: "🏟️", minScore: 660, baseInterest: 11.5, processingFee: 1.25, mode: "Monthly NACH / Bi-monthly UPI",  description: "Tailored MSME credit for kirana stores, small factories and artisans." },
  // ── Private Banks ──
  { id: "hdfc",     name: "HDFC Bank",                logo: "🏢", minScore: 750, baseInterest: 11.2, processingFee: 1.0, mode: "Monthly NACH / Weekly UPI",       description: "Premium business credit lines with digital-first processing. Fastest disbursals for high scorers." },
  { id: "icici",    name: "ICICI Bank",               logo: "💳", minScore: 680, baseInterest: 12.5, processingFee: 1.5, mode: "Monthly NACH / Weekly UPI",       description: "Flexible MSME loans with quick automated sanctions and working-capital products." },
  { id: "axis",     name: "Axis Bank",                logo: "🔷", minScore: 700, baseInterest: 12.0, processingFee: 1.25, mode: "Monthly NACH / Fortnightly UPI", description: "MSME Prime & Udyam credit products with doorstep banking and digital KYC." },
  { id: "kotak",    name: "Kotak Mahindra Bank",      logo: "🟡", minScore: 720, baseInterest: 11.8, processingFee: 1.0, mode: "Monthly NACH Auto-Debit",          description: "Zero-fee digital current accounts with integrated working-capital credit for freelancers & tech MSMEs." },
  { id: "idfcfirst",name: "IDFC First Bank",          logo: "🔵", minScore: 640, baseInterest: 13.0, processingFee: 1.5, mode: "Weekly UPI Settlement",           description: "Micro-business loans & monthly-income-linked credit with no prepayment penalty." },
  { id: "rbl",      name: "RBL Bank",                 logo: "🔴", minScore: 620, baseInterest: 14.0, processingFee: 1.75, mode: "Weekly UPI QR Settlement",       description: "Merchant cash-advance and supply-chain finance for kirana & micro-retail businesses." },
  // ── Small Finance Banks ──
  { id: "federal",  name: "Federal Bank",             logo: "🏦", minScore: 600, baseInterest: 14.5, processingFee: 2.0, mode: "Weekly UPI QR Settlement",        description: "Sachet repayments tailored for micro-merchants. Kerala-strong with pan-India digital reach." },
  { id: "jana",     name: "Jana Small Finance Bank",  logo: "🌿", minScore: 520, baseInterest: 16.5, processingFee: 2.0, mode: "Weekly UPI / Bi-weekly collect",  description: "MSME micro-loans for vendors, gig workers, and rural entrepreneurs with minimal documentation." },
  { id: "ujjivan",  name: "Ujjivan Small Finance Bank",logo: "☀️", minScore: 480, baseInterest: 17.0, processingFee: 2.0, mode: "Daily/Weekly UPI Collect",        description: "Microfinance-grade loans for informal sector workers with daily or weekly repayments matching cash flow." },
  // ── NBFCs ──
  { id: "muthoot",  name: "Muthoot Finance",          logo: "💰", minScore: 500, baseInterest: 17.5, processingFee: 2.0, mode: "Daily UPI QR Deductions",         description: "No collateral required. Daily repayments computed from real-time sales velocity." },
  { id: "bajaj",    name: "Bajaj Finserv",            logo: "⚡", minScore: 600, baseInterest: 15.0, processingFee: 1.75, mode: "Monthly EMI / Flexi-Loan",       description: "Flexi business loans with part-withdraw & part-repay. Best for boutique and seasonal businesses." },
  { id: "indifi",   name: "Indifi Merchant Capital",  logo: "🚀", minScore: 450, baseInterest: 21.0, processingFee: 2.5, mode: "Daily UPI Split (5% QR sales)",  description: "Revenue-based financing for gig workers & high-frequency vendors. No fixed EMI — repay as you earn." },
  { id: "creditseva",name:"CreditSeva NBFC",          logo: "🤝", minScore: 380, baseInterest: 24.0, processingFee: 3.0, mode: "Daily Micro-Debit (₹50–₹200)",   description: "Last-mile credit for very-first-time borrowers and informal vendors with minimal digital trail." }
];

const sampleUploadFiles = {
  // ── Kirana Store ──
  healthy_kirana: {
    name: "Sunita_Devi_BankStatement_Healthy_6Months.json",
    size: "142 KB",
    type: "application/json",
    content: {
      accountHolder: "Sunita Devi",
      bankName: "State Bank of India",
      analysisPeriod: "Past 6 Months",
      averageDailyBalance: 32000,
      totalInflows: 1420000,
      totalOutflows: 1180000,
      gstStatus: "Verified GSTR-3B (No defaults)",
      chequeBounces: 0,
      adbStability: "94%",
      growthRate: "+10.2%"
    }
  },
  stressed_kirana: {
    name: "Sunita_Devi_BankStatement_Stressed_Shocks.json",
    size: "138 KB",
    type: "application/json",
    content: {
      accountHolder: "Sunita Devi",
      bankName: "State Bank of India",
      analysisPeriod: "Past 6 Months",
      averageDailyBalance: 3100,
      totalInflows: 910000,
      totalOutflows: 950000,
      gstStatus: "Verified GSTR-3B (2 filing delays)",
      chequeBounces: 2,
      adbStability: "42%",
      growthRate: "-15.4%"
    }
  },
  // ── Gig Worker ──
  erratic_gig: {
    name: "Vikram_Rathore_WalletStatement_Fluctuating.json",
    size: "84 KB",
    type: "application/json",
    content: {
      accountHolder: "Vikram Rathore",
      platform: "Uber/Ola Fleet",
      analysisPeriod: "Past 3 Months",
      averageDailyBalance: 820,
      totalInflows: 112000,
      totalOutflows: 111500,
      chequeBounces: 0,
      weeklyPayoutsCount: 11,
      ratingMetrics: "Aggregator Rating: 4.22/5 (Warning)",
      adbStability: "60%",
      growthRate: "-2.5%"
    }
  },
  healthy_gig: {
    name: "Vikram_Rathore_UberOla_HealthyPayout_6Months.json",
    size: "91 KB",
    type: "application/json",
    content: {
      accountHolder: "Vikram Rathore",
      platform: "Uber/Ola Fleet",
      analysisPeriod: "Past 6 Months",
      averageDailyBalance: 4800,
      totalInflows: 282000,
      totalOutflows: 235000,
      chequeBounces: 0,
      weeklyPayoutsCount: 26,
      ratingMetrics: "Aggregator Rating: 4.86/5 (Excellent)",
      adbStability: "85%",
      growthRate: "+6.8%"
    }
  },
  // ── Street Vendor ──
  healthy_vendor: {
    name: "Ramesh_Kumar_UPI_Statement_6Months.json",
    size: "67 KB",
    type: "application/json",
    content: {
      accountHolder: "Ramesh Kumar",
      bankName: "FINO Payments Bank",
      analysisPeriod: "Past 6 Months",
      averageDailyBalance: 2100,
      totalInflows: 148000,
      totalOutflows: 124000,
      gstStatus: "None (Below GST threshold)",
      chequeBounces: 0,
      adbStability: "92%",
      growthRate: "+7.5%"
    }
  },
  stressed_vendor: {
    name: "Ramesh_Kumar_UPI_StressedSeason.json",
    size: "61 KB",
    type: "application/json",
    content: {
      accountHolder: "Ramesh Kumar",
      bankName: "FINO Payments Bank",
      analysisPeriod: "Past 6 Months",
      averageDailyBalance: 700,
      totalInflows: 96000,
      totalOutflows: 102000,
      gstStatus: "None (Below GST threshold)",
      chequeBounces: 1,
      adbStability: "55%",
      growthRate: "-8.3%"
    }
  },
  // ── Farmer ──
  healthy_farmer: {
    name: "Harish_Patel_eNAM_Harvest_Statement.json",
    size: "55 KB",
    type: "application/json",
    content: {
      accountHolder: "Harish Patel",
      bankName: "Bank of Baroda (Kisan Branch)",
      analysisPeriod: "Past 12 Months",
      averageDailyBalance: 18000,
      totalInflows: 320000,
      totalOutflows: 225000,
      gstStatus: "None (Agriculture exempt)",
      chequeBounces: 0,
      pmKisanSubsidies: 3,
      eNamReceipts: "₹2,35,000 (Verified)",
      adbStability: "48%",
      growthRate: "+4.2%"
    }
  },
  // ── Designer Boutique ──
  healthy_boutique: {
    name: "Pooja_Sharma_Boutique_InvoiceStatement_6Months.json",
    size: "118 KB",
    type: "application/json",
    content: {
      accountHolder: "Pooja Sharma",
      bankName: "HDFC Bank",
      analysisPeriod: "Past 6 Months",
      averageDailyBalance: 38500,
      totalInflows: 828000,
      totalOutflows: 621000,
      gstStatus: "Verified GSTR-1 (Quarterly, on time)",
      chequeBounces: 0,
      adbStability: "88%",
      growthRate: "+12.4%"
    }
  },
  stressed_boutique: {
    name: "Pooja_Sharma_Boutique_LowSeason_Shocks.json",
    size: "112 KB",
    type: "application/json",
    content: {
      accountHolder: "Pooja Sharma",
      bankName: "HDFC Bank",
      analysisPeriod: "Past 6 Months",
      averageDailyBalance: 11000,
      totalInflows: 490000,
      totalOutflows: 512000,
      gstStatus: "Verified GSTR-1 (1 late filing)",
      chequeBounces: 1,
      adbStability: "62%",
      growthRate: "-5.1%"
    }
  },
  // ── Freelancer ──
  healthy_freelancer: {
    name: "Aditya_Mehta_ProjectPayments_6Months.json",
    size: "76 KB",
    type: "application/json",
    content: {
      accountHolder: "Aditya Mehta",
      bankName: "Kotak Mahindra Bank",
      analysisPeriod: "Past 6 Months",
      averageDailyBalance: 24000,
      totalInflows: 582000,
      totalOutflows: 398000,
      gstStatus: "Verified GSTR-1 (Quarterly, on time)",
      chequeBounces: 0,
      adbStability: "78%",
      growthRate: "+9.8%"
    }
  },
  stressed_freelancer: {
    name: "Aditya_Mehta_ProjectDrySpell_Statement.json",
    size: "68 KB",
    type: "application/json",
    content: {
      accountHolder: "Aditya Mehta",
      bankName: "Kotak Mahindra Bank",
      analysisPeriod: "Past 6 Months",
      averageDailyBalance: 7200,
      totalInflows: 280000,
      totalOutflows: 305000,
      gstStatus: "Verified GSTR-1 (2 late filings)",
      chequeBounces: 0,
      adbStability: "52%",
      growthRate: "-11.2%"
    }
  }
};

function generateTransactions(personaId) {
  const persona = personas[personaId];
  if (!persona) return [];
  const txList = [];
  const currentDate = new Date();
  
  for (let i = 180; i >= 0; i--) {
    const txDate = new Date();
    txDate.setDate(currentDate.getDate() - i);
    const isWeekend = txDate.getDay() === 0 || txDate.getDay() === 6;
    
    if (personaId === "vendor") {
      const txCount = isWeekend ? Math.floor(Math.random() * 25) + 20 : Math.floor(Math.random() * 50) + 30;
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
          amount: Math.floor(Math.random() * 1200) + 3000,
          status: "Success"
        });
      }
    } else if (personaId === "kirana") {
      if (Math.random() > 0.1) {
        txList.push({
          date: formatDate(txDate),
          type: "Deposit",
          description: `UPI Merchant settlement: PayTM QR`,
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
      if (txDate.getDay() === 6) {
        txList.push({
          date: formatDate(txDate),
          type: "Deposit",
          description: "UPI: Amul Milk Dairy coop",
          category: "UPI Customer Payment",
          amount: Math.floor(Math.random() * 300) + 1200,
          status: "Success"
        });
      }
    } else if (personaId === "boutique") {
      if (txDate.getDay() === 6 || txDate.getDay() === 0) {
        if (Math.random() > 0.4) {
          txList.push({
            date: formatDate(txDate),
            type: "Deposit",
            description: `UPI: Invoice Collection`,
            category: "Invoice Settlement",
            amount: Math.floor(Math.random() * 15000) + 10000,
            status: "Success"
          });
        }
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
          description: "IMPS: Startup Client Project Payment",
          category: "Invoice Settlement",
          amount: Math.floor(Math.random() * 25000) + 15000,
          status: "Success"
        });
      }
      if (txDate.getDay() === 1) {
        txList.push({
          date: formatDate(txDate),
          type: "Withdrawal",
          description: "UPI: WeWork Co-working Space",
          category: "Rent",
          amount: 500,
          status: "Success"
        });
      }
      if (txDate.getDate() === 5) {
        txList.push({
          date: formatDate(txDate),
          type: "Withdrawal",
          description: "NEFT: Flat Rent Koregaon Park",
          category: "Rent",
          amount: 18000,
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
// 2. ALTERNATIVE CREDIT SCORING (scoring.js)
// ==========================================
function evaluateCreditProfile(persona, transactions, customUploadContent = null) {
  const isCustom = !!customUploadContent;
  
  let adb = isCustom ? customUploadContent.averageDailyBalance : (persona.metrics?.adb || 2000);
  let totalInflow = isCustom ? customUploadContent.totalInflows / 6 : (persona.metrics?.monthlyInflow || 30000);
  let growth = isCustom ? parseFloat(customUploadContent.growthRate) : (persona.metrics?.growthTrend || 5.0);
  let stability = isCustom ? parseInt(customUploadContent.adbStability) : (persona.metrics?.inflowStability || 80);
  let hasGst = isCustom ? (customUploadContent.gstStatus && !customUploadContent.gstStatus.includes("None")) : persona.hasGst;
  let bounces = isCustom ? (customUploadContent.chequeBounces || 0) : 0;
  
  let computedOutflow = isCustom ? (customUploadContent.totalOutflows ? (customUploadContent.totalOutflows / 6) : (customUploadContent.monthlyOutflow || customUploadContent.monthlyExpenses || totalInflow * 0.75)) : (persona.monthlyOutflow || totalInflow * 0.75);
  let activeCreds = isCustom ? (customUploadContent.credentials || {
    panStatus: customUploadContent.panStatus || (customUploadContent.panVerified ? "Verified" : "Unverified"),
    aadhaarStatus: customUploadContent.aadhaarStatus || (customUploadContent.aadhaarVerified ? "Verified" : "Unverified"),
    gstStatus: customUploadContent.gstStatus ? (customUploadContent.gstStatus.includes("Verified") ? "Verified" : "Unverified") : (hasGst ? "Verified" : "N/A"),
    bankLinked: customUploadContent.bankLinked !== undefined ? customUploadContent.bankLinked : true
  }) : (persona.credentials || { panStatus: "Verified", aadhaarStatus: "Verified", gstStatus: hasGst ? "Verified" : "N/A", bankLinked: true });

  // If transactions are provided, calculate metrics dynamically from transaction history!
  if (transactions && Array.isArray(transactions) && transactions.length > 0) {
    let depositSum = 0;
    let withdrawalSum = 0;
    let bounceCount = 0;
    let successCount = 0;
    
    const sortedTx = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date));
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
    
    totalInflow = depositSum / 6;
    computedOutflow = withdrawalSum / 6;
    bounces = bounceCount;
    
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
  let adbToInflowRatio = totalInflow > 0 ? (adb / totalInflow) : 0;
  let adbScore = 40;
  if (adbToInflowRatio > 0.20) adbScore = 120;
  else if (adbToInflowRatio > 0.10) adbScore = 100;
  else if (adbToInflowRatio > 0.05) adbScore = 80;
  else if (adbToInflowRatio > 0.02) adbScore = 60;
  
  const expenseRatio = totalInflow > 0 ? (computedOutflow / totalInflow) : 1;
  let expenseScore = 20;
  if (expenseRatio <= 0.60) expenseScore = 60;
  else if (expenseRatio <= 0.80) expenseScore = 45;
  else if (expenseRatio <= 0.90) expenseScore = 30;
  else if (expenseRatio > 0.95) expenseScore = 0;
  
  let discScore = adbScore + expenseScore;
  if (expenseRatio > 0.95) {
    discScore = Math.max(10, discScore - 30);
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
  
  if (activeCreds.panStatus === "Verified") credScore += 10;
  else if (activeCreds.panStatus === "Unverified") hasUnverifiedCritical = true;
  
  if (activeCreds.aadhaarStatus === "Verified") credScore += 10;
  else if (activeCreds.aadhaarStatus === "Unverified") hasUnverifiedCritical = true;
  
  if (activeCreds.gstStatus === "Verified" || activeCreds.gstStatus === "N/A") credScore += 10;
  else if (activeCreds.gstStatus === "Unverified") hasUnverifiedCritical = true;
  
  let digScore = digBaseScore + credScore;
  if (hasUnverifiedCritical) {
    digScore = Math.max(10, digScore - 80);
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
    { feature: "Cash Flow Stability", val: stabScore - baselines.stab, label: stabScore >= baselines.stab ? "Consistent Daily Inflows" : "High Volatility" },
    { feature: "Average Daily Balance", val: discScore - baselines.disc, label: discScore >= baselines.disc ? "Healthy Balance Reserves" : "Low Cash Buffer" },
    { feature: "Digital footprint / GST", val: digScore - baselines.dig, label: digScore >= baselines.dig ? "Strong UPI & GST Filings" : "Limited Digital Integration" },
    { feature: "Revenue Growth Trend", val: perfScore - baselines.perf, label: perfScore >= baselines.perf ? "Positive Sales Momentum" : "Declining Sales Trend" },
    { feature: "Transaction Vol (UPI count)", val: volScore - baselines.vol, label: volScore >= baselines.vol ? "High Business Velocity" : "Low Transaction Frequency" }
  ];
  
  const insights = [];
  if (stability < 75) {
    insights.push({ type: "info", title: "Stabilize Weekly Inflows", desc: "Consolidate sales receipts into your main bank account." });
  } else {
    insights.push({ type: "positive", title: "Excellent Inflow Consistency", desc: "Your steady daily digital inflows indicate highly predictable revenues." });
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
    insights.push({ type: "info", title: "Verify KYC Credentials", desc: "Unverified PAN or Aadhaar credentials limit your credit potential." });
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
    rawSum,
    subscores: {
      volume: Math.round((volScore / 100) * 100),
      stability: Math.round((stabScore / 150) * 100),
      performance: Math.round((perfScore / 150) * 100),
      discipline: Math.round((discScore / 180) * 100),
      digital: Math.round((digScore / 120) * 100)
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

function getLoanTerms(score, requestAmount) {
  const interestRate = Math.max(10.5, 36 - (score / 1000) * 24);
  let multiplier = score >= 850 ? 3.5 : score >= 700 ? 2.0 : score >= 550 ? 1.0 : 0.4;
  return {
    interestRate: parseFloat(interestRate.toFixed(2)),
    maxEligibleAmount: Math.round(requestAmount * multiplier),
    repaymentMode: score > 700 ? "Flexible UPI Split / Weekly" : "Daily UPI QR Deductions (Sachet repayment)"
  };
}

// ==========================================
// 3. UNDERWRITER STRESS TEST ENGINE (simulator.js)
// ==========================================
function runStressTest(persona, baseEvaluation, revenueShock, costShock, volShock) {
  const revFactor = 1 - (revenueShock / 100);
  const costFactor = 1 + (costShock / 100);
  
  const originalInflow = baseEvaluation.metrics.totalInflow;
  const originalAdb = baseEvaluation.metrics.adb;
  const originalStability = baseEvaluation.metrics.stability;
  const originalGrowth = baseEvaluation.metrics.growth;
  
  const stressedInflow = Math.max(1000, originalInflow * revFactor);
  const estimatedOutflows = (originalInflow * 0.85) * costFactor;
  const monthlySavings = stressedInflow - estimatedOutflows;
  
  let stressedAdb = monthlySavings < 0 ? Math.max(200, originalAdb + (monthlySavings * 0.2)) : Math.max(500, originalAdb * revFactor);
  const stressedStability = Math.max(10, originalStability - (volShock * 0.5));
  const stressedGrowth = originalGrowth - (revenueShock * 0.4);
  
  const simulatedUpload = {
    averageDailyBalance: Math.round(stressedAdb),
    totalInflows: Math.round(stressedInflow * 6),
    growthRate: stressedGrowth.toFixed(1) + "%",
    adbStability: Math.round(stressedStability) + "%",
    gstStatus: persona.hasGst ? "Regular" : "None",
    chequeBounces: Math.max(0, Math.floor(volShock / 20))
  };
  
  const stressedEvaluation = evaluateCreditProfile(persona, [], simulatedUpload);
  
  const assumedEmi = originalInflow * 0.15;
  const originalFcf = originalInflow * 0.15;
  const stressedFcf = stressedInflow - estimatedOutflows;
  
  const originalDscr = assumedEmi > 0 ? (originalFcf + assumedEmi) / assumedEmi : 1.5;
  const stressedDscr = assumedEmi > 0 ? (Math.max(0, stressedFcf) + assumedEmi) / assumedEmi : 0.8;
  
  let riskStatus = "Low", riskClass = "risk-low";
  if (stressedEvaluation.pragatiScore < 400 || stressedDscr < 1.0) { riskStatus = "High Risk"; riskClass = "risk-high"; }
  else if (stressedEvaluation.pragatiScore < 600 || stressedDscr < 1.25) { riskStatus = "Medium Risk"; riskClass = "risk-mid"; }
  
  return {
    pragatiScore: stressedEvaluation.pragatiScore,
    scoreDiff: stressedEvaluation.pragatiScore - baseEvaluation.pragatiScore,
    tier: stressedEvaluation.tier,
    tierClass: stressedEvaluation.tierClass,
    metrics: { adb: Math.round(stressedAdb), inflow: Math.round(stressedInflow), stability: Math.round(stressedStability), growth: parseFloat(stressedGrowth.toFixed(1)), dscr: parseFloat(stressedDscr.toFixed(2)) },
    riskStatus, riskClass, originalDscr: parseFloat(originalDscr.toFixed(2))
  };
}

// ==========================================
// 4. CHART UTILITIES (charts.js)
// ==========================================
let cashFlowChartInstance = null;
let shapChartInstance = null;
let forecastChartInstance = null;
let repaymentChartInstance = null;

function destroyChart(instance) {
  if (instance) instance.destroy();
}

function renderCashFlowChart(ctx, transactions) {
  destroyChart(cashFlowChartInstance);
  const monthlyData = aggregateMonthlyData(transactions);
  cashFlowChartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: monthlyData.labels,
      datasets: [
        { label: 'Inflows (Deposits)', data: monthlyData.inflows, backgroundColor: 'rgba(45, 212, 191, 0.65)', borderColor: 'rgb(45, 212, 191)', borderWidth: 1.5, borderRadius: 4 },
        { label: 'Outflows (Withdrawals)', data: monthlyData.outflows, backgroundColor: 'rgba(244, 63, 94, 0.45)', borderColor: 'rgb(244, 63, 94)', borderWidth: 1.5, borderRadius: 4 }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { labels: { color: '#94a3b8' } } },
      scales: {
        x: { grid: { display: false }, ticks: { color: '#64748b' } },
        y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#64748b', callback: (val) => '₹' + (val / 1000) + 'k' } }
      }
    }
  });
}

function renderShapChart(ctx, shapWeights) {
  destroyChart(shapChartInstance);
  const labels = shapWeights.map(w => w.feature);
  const data = shapWeights.map(w => w.val);
  const colors = data.map(v => v >= 0 ? 'rgba(45, 212, 191, 0.7)' : 'rgba(244, 63, 94, 0.7)');
  const borderColors = data.map(v => v >= 0 ? 'rgb(45, 212, 191)' : 'rgb(244, 63, 94)');
  shapChartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{ label: 'Attribution', data: data, backgroundColor: colors, borderColor: borderColors, borderWidth: 1.5, borderRadius: 4 }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#64748b' } },
        y: { grid: { display: false }, ticks: { color: '#94a3b8' } }
      }
    }
  });
}

function renderForecastChart(ctx, transactions, revenueShock = 0) {
  destroyChart(forecastChartInstance);
  const monthlyData = aggregateMonthlyData(transactions);
  const histLabels = monthlyData.labels.slice(-4);
  const histInflows = monthlyData.inflows.slice(-4);
  const avgInflow = histInflows.reduce((a, b) => a + b, 0) / histInflows.length;
  const forecastLabels = [...histLabels, 'Month +1 Proj', 'Month +2 Proj', 'Month +3 Proj'];
  
  const baselineInflowLine = [...histInflows, avgInflow, avgInflow * 1.02, avgInflow * 1.05];
  const stressedInflowLine = [...histInflows, avgInflow * (1 - revenueShock/100), avgInflow * (1 - revenueShock/100) * 0.98, avgInflow * (1 - revenueShock/100) * 0.95];
  
  forecastChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: forecastLabels,
      datasets: [
        { label: 'Historical', data: [...histInflows, null, null, null], borderColor: 'rgba(99, 102, 241, 0.8)', tension: 0.3, borderWidth: 3 },
        { label: 'Baseline', data: [...Array(histInflows.length - 1).fill(null), histInflows[histInflows.length - 1], ...baselineInflowLine.slice(histInflows.length)], borderColor: 'rgba(45, 212, 191, 0.9)', borderDash: [5, 5], tension: 0.3 },
        { label: 'Stressed', data: [...Array(histInflows.length - 1).fill(null), histInflows[histInflows.length - 1], ...stressedInflowLine.slice(histInflows.length)], borderColor: 'rgba(244, 63, 94, 0.9)', borderDash: [5, 5], tension: 0.3 }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { labels: { color: '#94a3b8' } } },
      scales: {
        x: { grid: { display: false }, ticks: { color: '#64748b' } },
        y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#64748b', callback: (val) => '₹' + (val / 1000) + 'k' } }
      }
    }
  });
}

function renderRepaymentChart(ctx, loanAmount, tenureMonths, interestRate) {
  destroyChart(repaymentChartInstance);
  const totalRepayable = loanAmount * (1 + (interestRate / 100) * (tenureMonths / 12));
  const totalDays = tenureMonths * 30;
  const labels = [];
  const emiLine = [];
  const siphoningLine = [];
  
  const emiAmount = totalRepayable / tenureMonths;
  const dailySiphonRate = totalRepayable / totalDays;
  let currentEmiBal = totalRepayable;
  let currentSiphonBal = totalRepayable;
  
  for (let day = 0; day <= totalDays; day += 15) {
    labels.push(`Day ${day}`);
    if (day > 0 && day % 30 === 0) currentEmiBal = Math.max(0, currentEmiBal - emiAmount);
    emiLine.push(Math.round(currentEmiBal));
    currentSiphonBal = Math.max(0, totalRepayable - (day * dailySiphonRate));
    siphoningLine.push(Math.round(currentSiphonBal));
  }
  
  repaymentChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        { label: 'Monthly EMI (Stair-step)', data: emiLine, borderColor: 'rgba(99, 102, 241, 0.85)', borderWidth: 2, stepped: true },
        { label: 'Daily UPI Siphoning (Smooth)', data: siphoningLine, borderColor: 'rgba(45, 212, 191, 0.95)', borderWidth: 2.5 }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { labels: { color: '#94a3b8' } } },
      scales: {
        x: { grid: { display: false }, ticks: { color: '#64748b' } },
        y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#64748b', callback: (val) => '₹' + (val / 1000) + 'k' } }
      }
    }
  });
}

function aggregateMonthlyData(transactions) {
  const months = {};
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const currentDate = new Date();
  for (let i = 5; i >= 0; i--) {
    const d = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    months[key] = { label: `${monthNames[d.getMonth()]} ${String(d.getFullYear()).slice(-2)}`, inflow: 0, outflow: 0 };
  }
  transactions.forEach(tx => {
    const key = tx.date.slice(0, 7);
    if (months[key]) {
      if (tx.type === "Deposit") months[key].inflow += tx.amount;
      else months[key].outflow += tx.amount;
    }
  });
  const labels = [], inflows = [], outflows = [];
  Object.keys(months).forEach(k => {
    labels.push(months[k].label);
    inflows.push(Math.round(months[k].inflow));
    outflows.push(Math.round(months[k].outflow));
  });
  return { labels, inflows, outflows };
}

// ==========================================
// 5. CORE UI ROUTER AND NETWORK CONTROLLERS
// ==========================================
let personasMap = {};
let activePersona = null;
let activeView = 'landing';
let evaluation = null;
let customUploads = [];
let underwriterApplications = [];
let selectedApplication = null;
let generatedTxCache = {};
let isServerOnline = false; // Set to true if API server responds
let currentTransactions = [];

let navItems, sections;

document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

async function initApp() {
  navItems = document.querySelectorAll('nav li');
  sections = document.querySelectorAll('.tab-content');
  
  // Try to ping server
  try {
    const res = await fetch('/api/personas');
    const personasList = await res.json();
    personasList.forEach(p => {
      personasMap[p.id] = p;
    });
    isServerOnline = true;
    console.log("Connected to Express Backend REST API successfully.");
  } catch (err) {
    console.warn("Backend API offline. Fallback to Local Simulation Mode (localStorage + offline engine).", err);
    isServerOnline = false;
    Object.keys(personas).forEach(key => {
      personasMap[key] = personas[key];
    });
  }
  
  activePersona = personasMap.vendor;
  
  navItems.forEach(item => {
    const tabBtn = item.querySelector('button');
    tabBtn.addEventListener('click', () => {
      const targetView = tabBtn.getAttribute('data-target');
      switchView(targetView);
    });
  });
  
  const personaCards = document.querySelectorAll('.persona-card:not(.custom-builder-trigger)');
  personaCards.forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-id');
      activePersona = personasMap[id];
      customUploads = [];
      switchView('borrower');
      showToast(`Selected ${activePersona.name} (${activePersona.roleName})`, 'success');
    });
  });
  
  const builderTrigger = document.getElementById('card-custom-builder');
  const customForm = document.getElementById('custom-builder-form');
  if (builderTrigger && customForm) {
    builderTrigger.addEventListener('click', () => {
      customForm.style.display = customForm.style.display === 'none' ? 'block' : 'none';
      if (customForm.style.display === 'block') {
        customForm.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
  
  const custSales = document.getElementById('cust-sales');
  const custExpenses = document.getElementById('cust-expenses');
  const custUpi = document.getElementById('cust-upi');
  const custAdb = document.getElementById('cust-adb');
  const custTxCount = document.getElementById('cust-tx-count');
  
  if (custSales) {
    custSales.addEventListener('input', () => { document.getElementById('cust-sales-val').innerText = '₹' + parseInt(custSales.value).toLocaleString('en-IN'); });
  }
  if (custExpenses) {
    custExpenses.addEventListener('input', () => { document.getElementById('cust-expenses-val').innerText = '₹' + parseInt(custExpenses.value).toLocaleString('en-IN'); });
  }
  if (custUpi) {
    custUpi.addEventListener('input', () => { document.getElementById('cust-upi-val').innerText = custUpi.value + '%'; });
  }
  if (custAdb) {
    custAdb.addEventListener('input', () => { document.getElementById('cust-adb-val').innerText = '₹' + parseInt(custAdb.value).toLocaleString('en-IN'); });
  }
  if (custTxCount) {
    custTxCount.addEventListener('input', () => { document.getElementById('cust-tx-count-val').innerText = custTxCount.value + ' Tx'; });
  }
  
  const btnCancelCustom = document.getElementById('btn-cancel-custom');
  const btnSubmitCustom = document.getElementById('btn-submit-custom');
  if (btnCancelCustom && btnSubmitCustom) {
    btnCancelCustom.addEventListener('click', () => { customForm.style.display = 'none'; });
    btnSubmitCustom.addEventListener('click', () => { generateCustomProfile(); });
  }
  
  const dropZone = document.getElementById('upload-zone');
  if (dropZone) {
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eName => {
      dropZone.addEventListener(eName, (e) => e.preventDefault(), false);
    });
    ['dragenter', 'dragover'].forEach(eName => { dropZone.addEventListener(eName, () => dropZone.classList.add('drag-active'), false); });
    ['dragleave', 'drop'].forEach(eName => { dropZone.addEventListener(eName, () => dropZone.classList.remove('drag-active'), false); });
    dropZone.addEventListener('drop', (e) => {
      const files = Object.keys(sampleUploadFiles);
      handleSimulatedUpload(files[Math.floor(Math.random() * files.length)]);
    });
    dropZone.addEventListener('click', () => { handleSimulatedUpload('healthy_kirana'); });
  }
  
  const sampleBtns = document.querySelectorAll('.sample-file-btn');
  sampleBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      handleSimulatedUpload(btn.getAttribute('data-file'));
    });
  });
  
  const loanAmountSlider = document.getElementById('loan-amount');
  const loanTenureSlider = document.getElementById('loan-tenure');
  if (loanAmountSlider && loanTenureSlider) {
    loanAmountSlider.addEventListener('input', () => {
      document.getElementById('loan-amount-val').innerText = '₹' + parseInt(loanAmountSlider.value).toLocaleString('en-IN');
      updateLoanCalculations();
    });
    loanTenureSlider.addEventListener('input', () => {
      document.getElementById('loan-tenure-val').innerText = loanTenureSlider.value + ' Months';
      updateLoanCalculations();
    });
  }
  
  const revShockSlider = document.getElementById('stress-rev-shock');
  const costShockSlider = document.getElementById('stress-cost-shock');
  const volShockSlider = document.getElementById('stress-vol-shock');
  if (revShockSlider && costShockSlider && volShockSlider) {
    [revShockSlider, costShockSlider, volShockSlider].forEach(s => {
      s.addEventListener('input', () => {
        document.getElementById('stress-rev-val').innerText = revShockSlider.value + '%';
        document.getElementById('stress-cost-val').innerText = costShockSlider.value + '%';
        document.getElementById('stress-vol-val').innerText = volShockSlider.value + '%';
        updateStressTestSimulation();
      });
    });
  }
  
  const approveBtn = document.getElementById('btn-approve');
  const rejectBtn = document.getElementById('btn-reject');
  if (approveBtn && rejectBtn) {
    approveBtn.addEventListener('click', () => handleUnderwriterDecision('Approved'));
    rejectBtn.addEventListener('click', () => handleUnderwriterDecision('Rejected'));
  }
  
  // Bind AI Pipeline Map flowchart clicks
  const flowNodes = document.querySelectorAll('.pipeline-node, .pipeline-node-special');
  if (flowNodes.length > 0) {
    flowNodes.forEach(node => {
      node.addEventListener('click', () => {
        flowNodes.forEach(n => n.classList.remove('active'));
        node.classList.add('active');
        const step = node.getAttribute('data-node');
        inspectPipelineStep(step);
      });
    });
  }

  // Theme Toggle
  const themeToggle = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('credai_theme');
  if (savedTheme === 'light') { document.body.classList.add('light-mode'); document.getElementById('theme-label').innerText = 'Dark'; }
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isLight = document.body.classList.toggle('light-mode');
      document.getElementById('theme-label').innerText = isLight ? 'Dark' : 'Light';
      localStorage.setItem('credai_theme', isLight ? 'light' : 'dark');
    });
  }

  // EMI Calculator Modal
  const emiInputs = ['emi-amount', 'emi-rate', 'emi-tenure'];
  function computeEMI() {
    const pEl = document.getElementById('emi-amount');
    const rEl = document.getElementById('emi-rate');
    const nEl = document.getElementById('emi-tenure');
    if (!pEl || !rEl || !nEl) return;
    const P = parseInt(pEl.value);
    const R = parseFloat(rEl.value) / 100 / 12;
    const N = parseInt(nEl.value);
    document.getElementById('emi-amount-val').innerText = '₹' + P.toLocaleString('en-IN');
    document.getElementById('emi-rate-val').innerText = rEl.value + '%';
    document.getElementById('emi-tenure-val').innerText = N + ' Months';
    let emi;
    if (R === 0) emi = Math.round(P / N);
    else emi = Math.round(P * R * Math.pow(1 + R, N) / (Math.pow(1 + R, N) - 1));
    const total = emi * N;
    const interest = total - P;
    const daily = Math.round(total / (N * 30));
    document.getElementById('emi-result').innerText = '₹' + emi.toLocaleString('en-IN');
    document.getElementById('emi-interest-total').innerText = '₹' + interest.toLocaleString('en-IN');
    document.getElementById('emi-total').innerText = '₹' + total.toLocaleString('en-IN');
    document.getElementById('emi-daily').innerText = '₹' + daily.toLocaleString('en-IN');
  }
  emiInputs.forEach(id => { const el = document.getElementById(id); if (el) el.addEventListener('input', computeEMI); });
  computeEMI();

  // Download & Print
  const downloadBtn = document.getElementById('btn-download-report');
  if (downloadBtn) downloadBtn.addEventListener('click', downloadCreditReport);
  const printBtn = document.getElementById('btn-print-report');
  if (printBtn) printBtn.addEventListener('click', () => window.print());

  // Transaction search/filter
  document.addEventListener('input', (e) => {
    if (e.target.id === 'tx-search' || e.target.id === 'tx-filter') {
      const search = document.getElementById('tx-search')?.value || '';
      const filter = document.getElementById('tx-filter')?.value || 'all';
      if (currentTransactions) populateTransactionTable(currentTransactions, search, filter);
    }
  });

  // Apply capital button
  const applyCapitalBtn = document.getElementById('btn-apply-capital');
  if (applyCapitalBtn) {
    applyCapitalBtn.addEventListener('click', () => {
      const bankSection = document.getElementById('bank-offers-container');
      if (bankSection) { bankSection.scrollIntoView({ behavior: 'smooth' }); showToast('Select a bank partner below to apply.', 'info'); }
    });
  }
}

function switchView(viewName) {
  activeView = viewName;
  navItems.forEach(item => {
    const btn = item.querySelector('button');
    if (btn.getAttribute('data-target') === viewName) item.classList.add('active');
    else item.classList.remove('active');
  });
  sections.forEach(sec => {
    if (sec.id === `section-${viewName}`) sec.classList.add('active');
    else sec.classList.remove('active');
  });
  
  if (viewName === 'borrower') renderBorrowerDashboard();
  else if (viewName === 'underwriter') renderUnderwriterDashboard();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function generateCustomProfile() {
  const name = document.getElementById('cust-name').value || "Ganesh Stores";
  const sector = document.getElementById('cust-sector').value;
  const sectorLabel = document.getElementById('cust-sector').options[document.getElementById('cust-sector').selectedIndex].text;
  const utility = document.getElementById('cust-utility').value;
  const sales = parseInt(document.getElementById('cust-sales').value);
  const expenses = parseInt(document.getElementById('cust-expenses').value);
  const upi = parseInt(document.getElementById('cust-upi').value);
  const adb = parseInt(document.getElementById('cust-adb').value);
  const txCount = parseInt(document.getElementById('cust-tx-count').value);
  const bounces = parseInt(document.getElementById('cust-bounces').value);
  const panStatus = document.getElementById('cust-pan').value;
  const aadhaarStatus = document.getElementById('cust-aadhaar').value;
  const gstStatus = document.getElementById('cust-gst-status').value;
  const customId = `custom_${Date.now()}`;
  
  const newPersona = {
    id: customId, name, avatar: "👤", businessName: `${name} Store`, roleName: sectorLabel,
    location: "Kalyan, Maharashtra",
    description: `Custom business assessment profile. Monthly inflows: ₹${sales.toLocaleString('en-IN')}. Monthly expenditures: ₹${expenses.toLocaleString('en-IN')}.`,
    baseMonthlySales: sales, upiRatio: upi / 100,
    avgDailyTxCount: Math.round(txCount / 30), averageDailyBalance: adb,
    hasGst: gstStatus === 'Verified', utilityGrade: utility, sector,
    typicalLoanRequest: { amount: Math.round(sales * 0.8), tenure: 12, purpose: "Business Inventory" },
    metrics: { adb, monthlyInflow: sales, inflowStability: 85, growthTrend: 6.5 },
    monthlyOutflow: expenses,
    credentials: { panStatus, aadhaarStatus, gstStatus, bankLinked: true }
  };
  
  personasMap[customId] = newPersona;
  activePersona = newPersona;
  generateCustomTransactions(newPersona, expenses, bounces, txCount);
  
  document.getElementById('custom-builder-form').style.display = 'none';
  customUploads = [];
  switchView('borrower');
  showToast(`Custom Profile '${name}' generated!`, 'success');
}

function generateCustomTransactions(persona, expenses = null, bounces = 0, txCount = 60) {
  const txList = [];
  const currentDate = new Date();
  const baseExpenses = expenses !== null ? expenses : (persona.monthlyOutflow || persona.baseMonthlySales * 0.75);
  const dailyExpense = baseExpenses / 30;
  const dailySales = (persona.baseMonthlySales / 30);
  
  const totalDays = 180;
  const totalTxExpected = txCount * 6;
  
  let bouncesRemaining = bounces * 6;
  
  for (let i = totalDays; i >= 0; i--) {
    const txDate = new Date();
    txDate.setDate(currentDate.getDate() - i);
    
    // Inflow
    if (Math.random() > 0.15) {
      const upiDeposit = Math.round(dailySales * (Math.random() * 0.4 + 0.8) * (persona.upiRatio || 0.8));
      if (upiDeposit > 0) {
        txList.push({ date: formatDate(txDate), type: "Deposit", description: "UPI QR Sales Settlement", category: "UPI Customer Payment", amount: upiDeposit, status: "Success" });
      }
    }
    
    // Outflow
    if (Math.random() > 0.25) {
      const expenseAmount = Math.round(dailyExpense * (Math.random() * 0.4 + 0.8));
      if (expenseAmount > 0) {
        let isBounce = false;
        if (bouncesRemaining > 0 && Math.random() < 0.1) {
          isBounce = true;
          bouncesRemaining--;
        }
        txList.push({ 
          date: formatDate(txDate), 
          type: "Withdrawal", 
          description: isBounce ? "Auto-Debit Failure: Insufficient Funds" : "UPI Supplier Settlement", 
          category: isBounce ? "Others" : "Supplier Settlement", 
          amount: expenseAmount, 
          status: isBounce ? "Failed" : "Success" 
        });
      }
    }
  }
  generatedTxCache[persona.id] = txList.sort((a, b) => new Date(b.date) - new Date(a.date));
}

async function getTransactionsForPersona(personaId) {
  if (generatedTxCache[personaId]) return generatedTxCache[personaId];
  if (isServerOnline) {
    try {
      const res = await fetch(`/api/borrowers/${personaId}/transactions`);
      const tx = await res.json();
      generatedTxCache[personaId] = tx;
      return tx;
    } catch (e) {
      console.warn("Fetch transaction failed, returning offline simulation.");
    }
  }
  const tx = generateTransactions(personaId);
  generatedTxCache[personaId] = tx;
  return tx;
}

// ==========================================
// BORROWER RENDERERS
// ==========================================
async function renderBorrowerDashboard() {
  if (!activePersona) return;
  document.getElementById('bor-avatar').innerText = activePersona.avatar;
  document.getElementById('bor-name').innerText = activePersona.name;
  document.getElementById('bor-role').innerText = activePersona.roleName;
  document.getElementById('bor-business').innerText = activePersona.businessName;
  document.getElementById('bor-desc').innerText = activePersona.description;
  document.getElementById('bor-avatar-wrap').className = `profile-avatar ${activePersona.id.startsWith('custom') ? 'kirana' : activePersona.id}`;
  
  let consolidatedUpload = null;
  if (customUploads.length > 0) {
    const count = customUploads.length;
    let sumAdb = 0;
    let sumInflows = 0;
    let sumOutflows = 0;
    let sumBounces = 0;
    let hasGst = false;
    let stabilitySum = 0;
    let growthSum = 0;
    
    let panVerifiedCount = 0;
    let aadhaarVerifiedCount = 0;
    
    customUploads.forEach(file => {
      const content = file.content;
      sumAdb += content.averageDailyBalance || 0;
      sumInflows += content.totalInflows || 0;
      sumOutflows += content.totalOutflows || (content.totalInflows * 0.75) || 0;
      sumBounces += content.chequeBounces || 0;
      if (content.gstStatus && !content.gstStatus.includes("None")) {
        hasGst = true;
      }
      if (content.panStatus === 'Verified' || content.panVerified) panVerifiedCount++;
      if (content.aadhaarStatus === 'Verified' || content.aadhaarVerified) aadhaarVerifiedCount++;
      
      stabilitySum += parseFloat((content.adbStability || "80").toString().replace('%',''));
      growthSum += parseFloat((content.growthRate || "0").toString().replace('%',''));
    });
    
    consolidatedUpload = {
      averageDailyBalance: Math.round(sumAdb / count),
      totalInflows: sumInflows,
      totalOutflows: sumOutflows,
      chequeBounces: sumBounces,
      gstStatus: hasGst ? "Verified GSTR-3B" : "None",
      adbStability: Math.round(stabilitySum / count) + "%",
      growthRate: (growthSum / count).toFixed(1) + "%",
      credentials: {
        panStatus: panVerifiedCount >= (count / 2) ? "Verified" : "Unverified",
        aadhaarStatus: aadhaarVerifiedCount >= (count / 2) ? "Verified" : "Unverified",
        gstStatus: hasGst ? "Verified" : "N/A",
        bankLinked: true
      }
    };
  }
  
  const transactions = await getTransactionsForPersona(activePersona.id);
  currentTransactions = transactions;
  
  if (isServerOnline) {
    try {
      const res = await fetch('/api/score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          personaId: activePersona.id,
          customUploadContent: consolidatedUpload,
          transactions: transactions,
          credentials: consolidatedUpload ? consolidatedUpload.credentials : activePersona.credentials,
          totalOutflow: consolidatedUpload ? consolidatedUpload.totalOutflows : activePersona.monthlyOutflow
        })
      });
      const data = await res.json();
      evaluation = data;
    } catch (e) {
      console.warn("API score calculation failed, falling back to local calculation.", e);
      evaluation = evaluateCreditProfile(activePersona, transactions, consolidatedUpload);
    }
  } else {
    evaluation = evaluateCreditProfile(activePersona, transactions, consolidatedUpload);
  }
  renderUploadZone();
  
  animateScoreGauge(evaluation.pragatiScore, evaluation.tier, evaluation.tierClass);
  const projectedCircle = document.querySelector('.score-projected-circle');
  if (projectedCircle) projectedCircle.style.opacity = '0';
  
  // Track score history
  const historyKey = `credai_score_history_${activePersona.id}`;
  const history = JSON.parse(localStorage.getItem(historyKey) || '[]');
  history.push({ score: evaluation.pragatiScore, ts: Date.now() });
  if (history.length > 10) history.shift();
  localStorage.setItem(historyKey, JSON.stringify(history));
  
  updateSubscoreBar('score-vol', evaluation.subscores.volume);
  updateSubscoreBar('score-stab', evaluation.subscores.stability);
  updateSubscoreBar('score-perf', evaluation.subscores.performance);
  updateSubscoreBar('score-disc', evaluation.subscores.discipline);
  updateSubscoreBar('score-dig', evaluation.subscores.digital);
  
  // Render credentials badges dynamically
  const badgesContainer = document.getElementById('bor-credentials-badges');
  if (badgesContainer) {
    const creds = evaluation.metrics?.credentials || activePersona.credentials || { panStatus: "Verified", aadhaarStatus: "Verified", gstStatus: activePersona.hasGst ? "Verified" : "N/A" };
    let html = '';
    
    if (creds.panStatus === 'Verified') {
      html += `<span class="badge" style="background: rgba(34, 197, 94, 0.1); color: var(--success); border-color: rgba(34, 197, 94, 0.3); display: inline-flex; align-items: center; gap: 0.25rem;"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" style="vertical-align:middle;"><polyline points="20 6 9 17 4 12"/></svg>PAN: Verified</span>`;
    } else {
      html += `<span class="badge" style="background: rgba(244, 63, 94, 0.1); color: var(--danger); border-color: rgba(244, 63, 94, 0.3); display: inline-flex; align-items: center; gap: 0.25rem;"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" style="vertical-align:middle;"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>PAN: Unverified</span>`;
    }
    
    if (creds.aadhaarStatus === 'Verified') {
      html += `<span class="badge" style="background: rgba(34, 197, 94, 0.1); color: var(--success); border-color: rgba(34, 197, 94, 0.3); display: inline-flex; align-items: center; gap: 0.25rem;"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" style="vertical-align:middle;"><polyline points="20 6 9 17 4 12"/></svg>Aadhaar: Verified</span>`;
    } else {
      html += `<span class="badge" style="background: rgba(244, 63, 94, 0.1); color: var(--danger); border-color: rgba(244, 63, 94, 0.3); display: inline-flex; align-items: center; gap: 0.25rem;"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" style="vertical-align:middle;"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>Aadhaar: Unverified</span>`;
    }
    
    if (creds.gstStatus === 'Verified') {
      html += `<span class="badge" style="background: rgba(34, 197, 94, 0.1); color: var(--success); border-color: rgba(34, 197, 94, 0.3); display: inline-flex; align-items: center; gap: 0.25rem;"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" style="vertical-align:middle;"><polyline points="20 6 9 17 4 12"/></svg>GSTIN: Verified</span>`;
    } else if (creds.gstStatus === 'Unverified') {
      html += `<span class="badge" style="background: rgba(244, 63, 94, 0.1); color: var(--danger); border-color: rgba(244, 63, 94, 0.3); display: inline-flex; align-items: center; gap: 0.25rem;"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" style="vertical-align:middle;"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>GSTIN: Unverified</span>`;
    } else {
      html += `<span class="badge" style="background: rgba(255, 255, 255, 0.05); color: var(--text-muted); border-color: var(--border-muted); display: inline-flex; align-items: center; gap: 0.25rem;">GSTIN: Exempt</span>`;
    }
    
    badgesContainer.innerHTML = html;
  }
  
  const flowChartCtx = document.getElementById('bor-flow-chart').getContext('2d');
  renderCashFlowChart(flowChartCtx, transactions);
  populateTransactionTable(transactions);
  
  renderScoreOptimizerChecklist();
  setupLoanCalculator();
  renderBankCollaborationPortal();
  await renderFIIRadarChart();
  renderExpenseDonutChart();
  renderLoanRecommendation();
}

function renderScoreOptimizerChecklist() {
  const container = document.getElementById('optimizer-checklist');
  if (!container) return;
  const recommendations = [
    { id: "opt_upi", label: "Route 90%+ cash sales through UPI QR", points: 35, icon: "💳", desc: "Reduces leakage and proves revenues to bank partners." },
    { id: "opt_adb", label: "Increase Average Daily Balance by ₹5,000", points: 25, icon: "💰", desc: "Creates a liquidity shield, avoiding auto-debit bounces." },
    { id: "opt_util", label: "Automate digital utility payments on time", points: 15, icon: "⚡", desc: "Builds a clean monthly billing history." },
    { id: "opt_gst", label: "File GST GSTR-3B filings on-time", points: 45, icon: "🏛️", desc: "Qualifies you for fast low-rate government business credit." }
  ];
  container.innerHTML = '';
  recommendations.forEach(rec => {
    const row = document.createElement('div');
    row.style.background = 'rgba(255,255,255,0.02)';
    row.style.border = '1px solid var(--border-muted)';
    row.style.borderRadius = '8px';
    row.style.padding = '0.75rem 1rem';
    row.style.display = 'flex';
    row.style.alignItems = 'flex-start';
    row.style.gap = '1rem';
    row.innerHTML = `
      <input type="checkbox" id="${rec.id}" style="width:18px; height:18px; cursor:pointer; accent-color:var(--secondary); margin-top:0.25rem;">
      <div style="flex-grow:1;">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <h5 style="font-size:0.9rem; font-weight:600; color:var(--text-main);">${rec.icon} ${rec.label}</h5>
          <span style="font-size:0.75rem; font-weight:700; color:var(--secondary); background:var(--secondary-glow); padding:0.15rem 0.5rem; border-radius:9999px;">+${rec.points} Pts</span>
        </div>
        <p style="font-size:0.78rem; color:var(--text-dim); margin-top:0.25rem; line-height:1.35;">${rec.desc}</p>
      </div>
    `;
    row.querySelector('input').addEventListener('change', () => { evaluateProjectedScore(); });
    container.appendChild(row);
  });
}

function evaluateProjectedScore() {
  const checkboxes = document.querySelectorAll('#optimizer-checklist input[type="checkbox"]');
  let pointsSum = 0;
  const pointsMap = { "opt_upi": 35, "opt_adb": 25, "opt_util": 15, "opt_gst": 45 };
  checkboxes.forEach(chk => { if (chk.checked) pointsSum += pointsMap[chk.id] || 0; });
  
  const projectedCircle = document.querySelector('.score-projected-circle');
  const scoreLabel = document.getElementById('score-tier');
  
  if (pointsSum > 0) {
    const projectedScore = Math.min(1000, evaluation.pragatiScore + pointsSum);
    const ratio = projectedScore / 1000;
    const offset = 565.48 - (565.48 * ratio);
    if (projectedCircle) { projectedCircle.style.opacity = '1'; projectedCircle.style.strokeDashoffset = offset; }
    scoreLabel.innerHTML = `Projected: <span style="color:var(--secondary); font-weight:800;">${projectedScore}</span>`;
    renderBankCollaborationPortal(projectedScore);
  } else {
    if (projectedCircle) projectedCircle.style.opacity = '0';
    scoreLabel.innerText = evaluation.tier;
    scoreLabel.className = `score-tier ${evaluation.tierClass}`;
    renderBankCollaborationPortal(evaluation.pragatiScore);
  }
}

function animateScoreGauge(score, tier, tierClass) {
  const scoreNumEl = document.getElementById('score-number');
  const scoreTierEl = document.getElementById('score-tier');
  const circle = document.querySelector('.score-fill-circle');
  
  let currentVal = 0;
  const timer = setInterval(() => {
    currentVal += score / 30;
    if (currentVal >= score) { scoreNumEl.innerText = score; clearInterval(timer); }
    else scoreNumEl.innerText = Math.round(currentVal);
  }, 15);
  
  const ratio = score / 1000;
  const offset = 565.48 - (565.48 * ratio);
  if (circle) circle.style.strokeDashoffset = offset;
  scoreTierEl.innerText = tier;
  scoreTierEl.className = `score-tier ${tierClass}`;
}

function updateSubscoreBar(elementId, value) {
  const fill = document.getElementById(`${elementId}-fill`);
  const valText = document.getElementById(`${elementId}-val`);
  if (fill && valText) { fill.style.width = `${value}%`; valText.innerText = `${value}/100`; }
}

function populateTransactionTable(transactions, search = '', filter = 'all') {
  const tbody = document.getElementById('bor-tx-body');
  if (!tbody) return;
  
  let filtered = transactions;
  if (filter !== 'all') filtered = filtered.filter(tx => tx.type === filter);
  if (search) filtered = filtered.filter(tx => 
    tx.description.toLowerCase().includes(search.toLowerCase()) ||
    tx.category.toLowerCase().includes(search.toLowerCase())
  );
  
  const display = filtered.slice(0, 20);
  const countEl = document.getElementById('tx-count');
  if (countEl) countEl.innerText = `${display.length} of ${filtered.length}`;
  
  tbody.innerHTML = '';
  display.forEach(tx => {
    const tr = document.createElement('tr');
    const isDeposit = tx.type === 'Deposit';
    tr.innerHTML = `
      <td>${tx.date}</td>
      <td>${tx.description}</td>
      <td><span class="badge">${tx.category}</span></td>
      <td class="${isDeposit ? 'inflow' : 'outflow'}">${isDeposit ? '+' : '-'}₹${tx.amount.toLocaleString('en-IN')}</td>
      <td><span style="color:var(--success); font-weight:600;">● ${tx.status}</span></td>
    `;
    tbody.appendChild(tr);
  });
}

function setupLoanCalculator() {
  const loanAmt = document.getElementById('loan-amount');
  let min = 5000, max = 50000, step = 5000, def = 15000;
  if (activePersona.id === 'kirana' || activePersona.id.startsWith('custom')) { min = 20000; max = 300000; step = 10000; def = 150000; }
  else if (activePersona.id === 'boutique') { min = 10000; max = 150000; step = 10000; def = 100000; }
  else if (activePersona.id === 'gig') { min = 10000; max = 70000; step = 5000; def = 40000; }
  else if (activePersona.id === 'farmer') { min = 10000; max = 100000; step = 5000; def = 60000; }
  else if (activePersona.id === 'freelancer') { min = 15000; max = 200000; step = 5000; def = 80000; }
  loanAmt.min = min; loanAmt.max = max; loanAmt.step = step; loanAmt.value = def;
  document.getElementById('loan-amount-val').innerText = '₹' + def.toLocaleString('en-IN');
  updateLoanCalculations();
}

function updateLoanCalculations() {
  if (!evaluation) return;
  
  const amount = parseInt(document.getElementById('loan-amount').value);
  const tenure = parseInt(document.getElementById('loan-tenure').value);
  const terms = getLoanTerms(evaluation.pragatiScore, amount);
  const totalRepayment = amount * (1 + (terms.interestRate / 100) * (tenure / 12));
  const emi = Math.round(totalRepayment / tenure);
  const dailyDeduct = Math.round(totalRepayment / (tenure * 30));
  const isDaily = evaluation.pragatiScore < 700;
  
  document.getElementById('calc-eligible-cap').innerText = '₹' + terms.maxEligibleAmount.toLocaleString('en-IN');
  document.getElementById('calc-interest-rate').innerText = terms.interestRate.toFixed(1) + '% p.a.';
  document.getElementById('calc-repay-mode').innerText = isDaily ? "Daily UPI QR Deductions" : "Flexible UPI Split / Weekly";
  
  const emiBlock = document.getElementById('calc-emi-wrap');
  if (isDaily) {
    emiBlock.innerHTML = `
      <span style="font-size: 0.8rem; color:var(--text-dim);">Estimated Daily Deductions</span>
      <h3 style="font-size:1.5rem; color:var(--secondary);">₹${dailyDeduct} <span style="font-size:0.85rem; color:var(--text-muted);">/ day</span></h3>
    `;
  } else {
    emiBlock.innerHTML = `
      <span style="font-size: 0.8rem; color:var(--text-dim);">Estimated Monthly EMI</span>
      <h3 style="font-size:1.5rem; color:var(--primary);">₹${emi} <span style="font-size:0.85rem; color:var(--text-muted);">/ mo</span></h3>
    `;
  }
  evaluateProjectedScore();
}

function renderBankCollaborationPortal(overrideScore = null) {
  const container = document.getElementById('bank-offers-container');
  if (!container || !evaluation) return;
  const amountSlider = document.getElementById('loan-amount');
  const amount = amountSlider ? parseInt(amountSlider.value) : 20000;
  const score = overrideScore !== null ? overrideScore : evaluation.pragatiScore;
  container.innerHTML = '';
  
  collaboratedBanks.forEach(bank => {
    const isApproved = score >= bank.minScore;
    const scoreDiscount = (score - bank.minScore) * 0.02;
    const finalInterest = isApproved ? Math.max(9.5, bank.baseInterest - scoreDiscount) : bank.baseInterest;
    let multiplier = score >= 850 ? 3.2 : score >= 700 ? 1.8 : score >= 550 ? 1.0 : 0.5;
    const maxLimit = Math.round(amount * multiplier);
    
    const card = document.createElement('div');
    card.className = `glass-card ${isApproved ? 'glow-secondary' : ''}`;
    card.style.padding = '1.25rem';
    card.style.display = 'flex';
    card.style.flexDirection = 'column';
    card.style.justifyContent = 'space-between';
    card.style.height = '100%';
    card.innerHTML = `
      <div>
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.75rem;">
          <div style="display:flex; align-items:center; gap:0.5rem;">
            <span style="font-size:1.5rem;">${bank.logo}</span>
            <h4 style="font-size:1.05rem; font-weight:700;">${bank.name}</h4>
          </div>
          <span class="badge" style="background:${isApproved ? 'var(--success-glow)' : 'var(--danger-glow)'}; color:${isApproved ? 'var(--success)' : 'var(--danger)'};">${isApproved ? 'Approved' : 'Insufficient Score'}</span>
        </div>
        <p style="font-size:0.8rem; color:var(--text-muted); margin-bottom:1rem; line-height:1.3;">${bank.description}</p>
        <div style="background:rgba(255,255,255,0.02); border:1px solid var(--border-muted); border-radius:6px; padding:0.65rem; font-size:0.8rem; display:flex; flex-direction:column; gap:0.35rem; margin-bottom:1.25rem;">
          <div style="display:flex; justify-content:space-between;"><span>Interest Rate:</span><strong style="color:var(--secondary);">${finalInterest.toFixed(1)}%</strong></div>
          <div style="display:flex; justify-content:space-between;"><span>Max Limit:</span><strong>₹${maxLimit.toLocaleString('en-IN')}</strong></div>
          <div style="display:flex; justify-content:space-between; align-items:center; margin-top:0.2rem; border-top:1px dashed var(--border-muted); padding-top:0.2rem;">
            <span style="font-size:0.75rem; color:var(--text-dim);">Repayment:</span><strong style="font-size:0.75rem; text-align:right;">${bank.mode}</strong>
          </div>
        </div>
      </div>
      <button class="btn btn-primary" style="width:100%; padding:0.5rem 1rem; font-size:0.85rem; ${!isApproved ? 'opacity:0.4; cursor:not-allowed;' : ''}" ${!isApproved ? 'disabled' : ''}>Apply Now</button>
    `;
    if (isApproved) {
      card.querySelector('button').addEventListener('click', () => { submitLoanApplication(bank.id, bank.name); });
    }
    container.appendChild(card);
  });
}

// 6. DUAL-MODE INTEGRATED APPLICATION SUBMITTER
async function submitLoanApplication(bankId, bankName) {
  const amount = parseInt(document.getElementById('loan-amount').value);
  const tenure = parseInt(document.getElementById('loan-tenure').value);
  const purpose = activePersona.typicalLoanRequest.purpose;
  
  // Calculate consolidated values for payload
  let consolidatedUpload = null;
  if (customUploads.length > 0) {
    const count = customUploads.length;
    let sumAdb = 0; let sumInflows = 0; let sumBounces = 0; let hasGst = false;
    let stabilitySum = 0; let growthSum = 0;
    customUploads.forEach(file => {
      const content = file.content;
      sumAdb += content.averageDailyBalance || 0;
      sumInflows += content.totalInflows || 0;
      sumBounces += content.chequeBounces || 0;
      if (content.gstStatus && !content.gstStatus.includes("None")) hasGst = true;
      stabilitySum += parseFloat((content.adbStability || "80").toString().replace('%',''));
      growthSum += parseFloat((content.growthRate || "0").toString().replace('%',''));
    });
    consolidatedUpload = {
      averageDailyBalance: Math.round(sumAdb / count),
      totalInflows: sumInflows,
      chequeBounces: sumBounces,
      gstStatus: hasGst ? "Verified GSTR-3B" : "None",
      adbStability: Math.round(stabilitySum / count) + "%",
      growthRate: (growthSum / count).toFixed(1) + "%"
    };
  }

  const payload = {
    personaId: activePersona.id,
    borrowerName: activePersona.name,
    score: evaluation.pragatiScore,
    bankId,
    requestedAmount: amount,
    tenureMonths: tenure,
    purpose,
    customDetails: (activePersona.id.startsWith('custom_') || customUploads.length > 0) ? {
      baseMonthlySales: consolidatedUpload ? Math.round(consolidatedUpload.totalInflows / 6) : activePersona.baseMonthlySales,
      upiRatio: activePersona.upiRatio,
      averageDailyBalance: consolidatedUpload ? consolidatedUpload.averageDailyBalance : activePersona.averageDailyBalance,
      hasGst: consolidatedUpload ? (consolidatedUpload.gstStatus !== "None") : activePersona.hasGst,
      utilityGrade: activePersona.utilityGrade,
      sector: activePersona.sector,
      businessName: activePersona.businessName,
      roleName: activePersona.roleName
    } : null
  };

  // Try REST call
  if (isServerOnline) {
    try {
      const res = await fetch('/api/loans/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await res.json();
      if (result.success) {
        showToast(`Applied successfully to ${bankName}!`, 'success');
        setTimeout(() => { switchView('landing'); }, 1200);
        return;
      }
    } catch (err) {
      console.warn("Failed to contact server, switching to Local Storage submission.");
    }
  }

  // Fallback: Local Storage Mode
  const bank = collaboratedBanks.find(b => b.id === bankId);
  const isApproved = evaluation.pragatiScore >= bank.minScore;
  const scoreDiscount = (evaluation.pragatiScore - bank.minScore) * 0.02;
  const interestRate = parseFloat((isApproved ? Math.max(9.5, bank.baseInterest - scoreDiscount) : bank.baseInterest).toFixed(1));
  const inflow = payload.customDetails ? payload.customDetails.baseMonthlySales : activePersona.baseMonthlySales;
  const emi = (amount * (1 + (interestRate/100) * (tenure/12))) / tenure;
  const operatingOutflows = inflow * 0.82;
  const dscr = parseFloat(((inflow - operatingOutflows + emi) / emi).toFixed(2));
  
  const localApp = {
    id: `app_${Date.now()}`,
    personaId: activePersona.id,
    borrowerName: activePersona.name,
    businessName: activePersona.businessName,
    roleName: activePersona.roleName,
    location: activePersona.location,
    requestedAmount: amount,
    tenureMonths: tenure,
    purpose,
    score: evaluation.pragatiScore,
    bankId,
    bankName: bank.name,
    interestRate,
    repaymentMode: bank.mode,
    status: "Pending",
    dscr,
    riskStatus: evaluation.pragatiScore < 550 || dscr < 1.0 ? "High Risk" : "Low Risk",
    createdAt: new Date().toISOString(),
    customDetails: payload.customDetails
  };

  const currentApps = JSON.parse(localStorage.getItem('credai_loans') || '[]');
  currentApps.unshift(localApp);
  localStorage.setItem('credai_loans', JSON.stringify(currentApps));
  
  showToast(`[Local Mode] Applied successfully to ${bankName}!`, 'success');
  setTimeout(() => { switchView('landing'); }, 1200);
}

function handleSimulatedUpload(fileKey) {
  const file = sampleUploadFiles[fileKey];
  if (!file) return;
  if (customUploads.find(f => f.name === file.name)) {
    showToast(`File ${file.name} is already uploaded.`, 'info');
    return;
  }
  
  // Inject default verified credentials if they are missing
  const content = {
    panStatus: "Verified",
    aadhaarStatus: "Verified",
    bankLinked: true,
    ...file.content
  };
  
  customUploads.push({ key: fileKey, name: file.name, size: file.size, content: content });
  renderBorrowerDashboard();
  showToast(`Added statement: ${file.name}. Score recalculated.`, 'success');
}

function removeUploadedFile(index) {
  customUploads.splice(index, 1);
  renderBorrowerDashboard();
  showToast("Statement removed. Recalculating score.", "info");
}

function clearUpload() {
  customUploads = [];
  renderBorrowerDashboard();
  showToast("All simulated uploads cleared.", "info");
}

function renderUploadZone() {
  const dropZone = document.getElementById('upload-zone');
  if (!dropZone) return;
  
  if (customUploads.length === 0) {
    dropZone.innerHTML = `
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
      <p>Upload Digital Statement</p>
      <span>Drag & Drop Bank Statement PDF or GST logs here.</span>
    `;
  } else {
    let filesHtml = `<div style="display:flex; flex-direction:column; gap:0.5rem; width:100%; text-align:left; margin-bottom:1rem;">`;
    customUploads.forEach((file, idx) => {
      filesHtml += `
        <div style="background:rgba(255,255,255,0.03); border:1px solid var(--border-muted); border-radius:6px; padding:0.5rem 0.75rem; display:flex; justify-content:space-between; align-items:center;">
          <div style="display:flex; align-items:center; gap:0.5rem; overflow:hidden; flex-grow:1; margin-right:0.5rem;">
            <span style="font-size:1.2rem; flex-shrink:0;">📄</span>
            <div style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">
              <span style="font-size:0.8rem; font-weight:600; color:var(--text-main);">${file.name}</span>
              <span style="font-size:0.7rem; color:var(--text-dim); display:block;">Size: ${file.size} ● Aggregator Verified</span>
            </div>
          </div>
          <button class="btn-remove-file" data-idx="${idx}" style="background:transparent; border:none; color:var(--danger); font-size:1.2rem; cursor:pointer; padding:0 0.5rem; font-weight:700;">×</button>
        </div>
      `;
    });
    filesHtml += `</div>`;
    
    let sumAdb = 0; let sumInflows = 0;
    customUploads.forEach(f => {
      sumAdb += f.content.averageDailyBalance || 0;
      sumInflows += f.content.totalInflows || 0;
    });
    
    dropZone.innerHTML = `
      ${filesHtml}
      <div style="background:var(--secondary-glow); border:1px solid var(--secondary); border-radius:8px; padding:0.6rem 0.8rem; font-size:0.78rem; text-align:left; width:100%; margin-bottom:0.75rem; color:#c7d2fe;">
        <strong>Consolidated Aggregated Profile:</strong>
        <div style="display:flex; justify-content:space-between; margin-top:0.25rem;">
          <span>Combined Inflows: <strong>₹${sumInflows.toLocaleString('en-IN')}</strong></span>
          <span>Average Balance: <strong>₹${Math.round(sumAdb / customUploads.length).toLocaleString('en-IN')}</strong></span>
        </div>
      </div>
      <div style="display:flex; gap:0.5rem; width:100%;">
        <button class="btn btn-secondary" id="btn-clear-uploads" style="flex:1; font-size:0.75rem; padding:0.35rem 0.5rem;">Clear All</button>
      </div>
    `;
    
    dropZone.querySelectorAll('.btn-remove-file').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        removeUploadedFile(parseInt(btn.getAttribute('data-idx')));
      });
    });
    
    const clearBtn = document.getElementById('btn-clear-uploads');
    if (clearBtn) {
      clearBtn.addEventListener('click', (e) => { e.stopPropagation(); clearUpload(); });
    }
  }
  rebindDropZone();
}

function rebindDropZone() {
  const dropZone = document.getElementById('upload-zone');
  if (!dropZone) return;
  ['dragenter','dragover','dragleave','drop'].forEach(e => dropZone.addEventListener(e, ev => ev.preventDefault()));
  ['dragenter','dragover'].forEach(e => dropZone.addEventListener(e, () => dropZone.classList.add('drag-active')));
  ['dragleave','drop'].forEach(e => dropZone.addEventListener(e, () => dropZone.classList.remove('drag-active')));
  dropZone.addEventListener('drop', () => {
    const files = Object.keys(sampleUploadFiles);
    handleSimulatedUpload(files[Math.floor(Math.random() * files.length)]);
  });
  dropZone.addEventListener('click', ev => {
    if (ev.target.closest('button')) return;
    handleSimulatedUpload('healthy_kirana');
  });
}

// ==========================================
// UNDERWRITER DASHBOARD RENDERERS
// ==========================================
async function renderUnderwriterDashboard() {
  const applicantListEl = document.getElementById('underwriter-applicants');
  applicantListEl.innerHTML = '';
  
  if (isServerOnline) {
    try {
      const res = await fetch('/api/underwriter/applications');
      underwriterApplications = await res.json();
    } catch (e) {
      console.warn("REST load applications failed, using local storage.");
      underwriterApplications = JSON.parse(localStorage.getItem('credai_loans') || '[]');
    }
  } else {
    underwriterApplications = JSON.parse(localStorage.getItem('credai_loans') || '[]');
  }
  
  if (underwriterApplications.length === 0) {
    applicantListEl.innerHTML = `<div style="text-align:center; color:var(--text-dim); padding:2rem;">No loan applications pending.</div>`;
    return;
  }
  
  if (!selectedApplication || !underwriterApplications.find(a => a.id === selectedApplication.id)) {
    selectedApplication = underwriterApplications[0];
  } else {
    selectedApplication = underwriterApplications.find(a => a.id === selectedApplication.id);
  }
  
  underwriterApplications.forEach(app => {
    const card = document.createElement('div');
    const isActive = app.id === selectedApplication.id;
    card.className = `applicant-card ${isActive ? 'active' : ''}`;
    card.innerHTML = `
      <div class="applicant-card-header"><span class="applicant-name">${app.borrowerName}</span><span class="applicant-score">${app.score}</span></div>
      <div class="applicant-card-details"><span>${app.bankName}</span><span>₹${app.requestedAmount.toLocaleString('en-IN')}</span><span style="font-weight:600; color:${app.status === 'Approved' ? 'var(--success)' : 'var(--warning)'};">${app.status}</span></div>
    `;
    card.addEventListener('click', () => {
      selectedApplication = app;
      document.getElementById('stress-rev-shock').value = 0;
      document.getElementById('stress-cost-shock').value = 0;
      document.getElementById('stress-vol-shock').value = 0;
      document.getElementById('stress-rev-val').innerText = '0%';
      document.getElementById('stress-cost-val').innerText = '0%';
      document.getElementById('stress-vol-val').innerText = '0%';
      renderUnderwriterDashboard();
    });
    applicantListEl.appendChild(card);
  });
  
  const targetPersona = personasMap[selectedApplication.personaId] || activePersona;
  document.getElementById('und-avatar').innerText = targetPersona.avatar;
  document.getElementById('und-avatar-wrap').className = `profile-avatar ${targetPersona.id.startsWith('custom') ? 'kirana' : targetPersona.id}`;
  document.getElementById('und-name').innerText = selectedApplication.borrowerName;
  document.getElementById('und-role').innerText = selectedApplication.roleName;
  document.getElementById('und-business').innerText = selectedApplication.businessName;
  document.getElementById('und-location').innerText = selectedApplication.location;
  document.getElementById('und-bank').innerText = selectedApplication.bankName;
  
  const baseEval = evaluateCreditProfile(targetPersona, [], null);
  document.getElementById('stat-inflow').innerText = '₹' + Math.round(baseEval.metrics.totalInflow).toLocaleString('en-IN');
  document.getElementById('stat-adb').innerText = '₹' + Math.round(baseEval.metrics.adb).toLocaleString('en-IN');
  document.getElementById('stat-stability').innerText = baseEval.metrics.stability + '%';
  document.getElementById('stat-growth').innerText = baseEval.metrics.growth + '%';
  
  document.getElementById('und-repay-amount').innerText = '₹' + selectedApplication.requestedAmount.toLocaleString('en-IN');
  document.getElementById('und-repay-tenure').innerText = selectedApplication.tenureMonths + ' Months';
  document.getElementById('und-repay-purpose').innerText = `"${selectedApplication.purpose}"`;
  document.getElementById('und-emi-traditional').innerText = `₹${Math.round((selectedApplication.requestedAmount * 1.1) / selectedApplication.tenureMonths).toLocaleString('en-IN')} / mo`;
  
  const repayCtx = document.getElementById('und-repay-chart').getContext('2d');
  renderRepaymentChart(repayCtx, selectedApplication.requestedAmount, selectedApplication.tenureMonths, selectedApplication.interestRate);
  
  updateStressTestSimulation();
  updateFraudRiskIndicator();
}

async function updateStressTestSimulation() {
  if (!selectedApplication) return;
  const revShock = parseInt(document.getElementById('stress-rev-shock').value);
  const costShock = parseInt(document.getElementById('stress-cost-shock').value);
  const volShock = parseInt(document.getElementById('stress-vol-shock').value);
  
  const targetPersona = personasMap[selectedApplication.personaId] || activePersona;
  
  let stressed;
  if (isServerOnline) {
    try {
      const res = await fetch(`/api/underwriter/applications/${selectedApplication.id}/stress`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ revenueShock: revShock, costShock: costShock, volShock: volShock })
      });
      stressed = await res.json();
    } catch (e) {
      console.warn("API stress test calculation failed, falling back to local calculation.", e);
      const baseEval = evaluateCreditProfile(targetPersona, [], null);
      stressed = runStressTest(targetPersona, baseEval, revShock, costShock, volShock);
    }
  } else {
    const baseEval = evaluateCreditProfile(targetPersona, [], null);
    stressed = runStressTest(targetPersona, baseEval, revShock, costShock, volShock);
  }
  
  document.getElementById('und-score-stressed').innerText = stressed.pragatiScore;
  const scoreDiffEl = document.getElementById('und-score-diff');
  if (stressed.scoreDiff === 0) {
    scoreDiffEl.innerText = '(No change)'; scoreDiffEl.style.color = 'var(--text-dim)';
  } else {
    scoreDiffEl.innerText = `(${stressed.scoreDiff} points)`; scoreDiffEl.style.color = 'var(--danger)';
  }
  
  const riskBadge = document.getElementById('und-risk-status');
  riskBadge.innerText = stressed.riskStatus;
  riskBadge.parentNode.className = `stat-box ${stressed.riskClass}`;
  
  document.getElementById('und-dscr').innerText = `${stressed.metrics.dscr}x`;
  const dscrBox = document.getElementById('und-dscr').parentNode;
  dscrBox.className = stressed.metrics.dscr < 1.0 ? 'stat-box risk-high' : stressed.metrics.dscr < 1.25 ? 'stat-box risk-mid' : 'stat-box risk-low';
  
  const tempEval = evaluateCreditProfile(targetPersona, [], {
    averageDailyBalance: stressed.metrics.adb,
    totalInflows: stressed.metrics.inflow * 6,
    growthRate: stressed.metrics.growth + "%",
    adbStability: stressed.metrics.stability + "%",
    gstStatus: targetPersona.hasGst ? "Regular" : "None",
    chequeBounces: Math.max(0, Math.floor(volShock / 20))
  });
  
  const shapCtx = document.getElementById('und-shap-chart').getContext('2d');
  renderShapChart(shapCtx, tempEval.shapWeights);
  
  const forecastCtx = document.getElementById('und-forecast-chart').getContext('2d');
  const transactions = await getTransactionsForPersona(selectedApplication.personaId);
  renderForecastChart(forecastCtx, transactions, revShock);
  
  generateSmartCommentary(stressed, revShock, costShock, volShock);
}

function generateSmartCommentary(stressed, rev, cost, vol) {
  const commEl = document.getElementById('und-ai-commentary');
  if (!commEl) return;
  const name = selectedApplication.borrowerName;
  const sector = selectedApplication.roleName;
  let report = "";
  const appScore = selectedApplication ? selectedApplication.score : (evaluation ? evaluation.pragatiScore : 0);
  
  if (rev === 0 && cost === 0 && vol === 0) {
    report = `<strong>AI Assessment:</strong> ${name} (${sector}) displays a baseline score of <strong style="color:var(--secondary);">${appScore}</strong>. `;
    if (appScore >= 750) report += `Liquidity reserves are solid. Recommended for fast-track underwriting.`;
    else report += `Satisfactory discipline. Suggested for daily siphoning MCA terms.`;
  } else {
    report = `<strong>Stressed Risk Analysis:</strong> `;
    if (stressed.metrics.dscr < 1.0) {
      report += `<span style="color:var(--danger); font-weight:700;">LIQUIDITY ALERT.</span> Under ${rev}% drop and ${cost}% cost rise, FCF falls to ${stressed.metrics.dscr}x DSCR, risking defaults.`;
    } else {
      report += `<span style="color:var(--success); font-weight:700;">RESILIENT BUFFER.</span> Maintain ${stressed.metrics.dscr}x DSCR. Approved under stress conditions.`;
    }
  }
  commEl.innerHTML = report;
}

// 7. INTEGRATED UNDERWRITER DECISION CONTROLLER
async function handleUnderwriterDecision(status) {
  if (!selectedApplication) return;
  
  if (isServerOnline) {
    try {
      const res = await fetch(`/api/underwriter/applications/${selectedApplication.id}/decision`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      const result = await res.json();
      if (result.success) {
        showToast(`Loan Application has been ${status.toUpperCase()}!`, status === 'Approved' ? 'success' : 'error');
        renderUnderwriterDashboard();
        return;
      }
    } catch (err) {
      console.warn("Failed to contact server for decision, falling back to Local Storage.");
    }
  }

  // Fallback: Local Storage Mode
  const currentApps = JSON.parse(localStorage.getItem('credai_loans') || '[]');
  const match = currentApps.find(a => a.id === selectedApplication.id);
  if (match) {
    match.status = status;
    localStorage.setItem('credai_loans', JSON.stringify(currentApps));
    showToast(`[Local Mode] Loan has been ${status.toUpperCase()}!`, status === 'Approved' ? 'success' : 'error');
    renderUnderwriterDashboard();
  }
}

// ==========================================
// TOAST NOTIFICATIONS
// ==========================================
function showToast(message, type = 'success') {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    document.body.appendChild(toast);
  }
  toast.className = `toast ${type}`;
  const svgIcon = type === 'success'
    ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`
    : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;
  toast.innerHTML = `${svgIcon}<span style="font-size:0.9rem; font-weight:500;">${message}</span>`;
  toast.classList.add('show');
  setTimeout(() => { toast.classList.remove('show'); }, 4000);
}

// ==========================================
// 6. Technical Flowchart Inspection Metadata
// ==========================================
const pipelineDetails = {
  user: {
    name: "USER / Borrowing Merchant",
    desc: "Initiates the alternative credit evaluation. The process begins when a merchant, vendor, or gig worker clicks 'Apply' or 'Overview' on their borrower portal app.",
    code: `{
  "action": "INITIATE_APPLICATION",
  "source": "borrower_portal_web",
  "client_ip": "192.168.1.104",
  "session_id": "sess_83749281023",
  "timestamp": "2026-07-17T12:00:00Z"
}`
  },
  otp: {
    name: "Aadhaar & Mobile OTP Consent",
    desc: "A Aadhaar-authenticated OTP verifies the borrower's identity, automatically generating the legal digitally signed consent artifact for public and private data extraction.",
    code: `{
  "event": "CONSENT_OTP_VERIFIED",
  "aadhaar_masked": "XXXX-XXXX-8374",
  "consent_approved": true,
  "consent_valid_until": "2026-08-17T12:00:00Z",
  "digital_signature": "sha256$8fbc2e1a90c128f73b64c..."
}`
  },
  aa: {
    name: "Account Aggregator (AA) Gateway",
    desc: "Uses the RBI-approved Account Aggregator consent framework (Sahamati network) to pull certified financial information from banks/providers (FIPs) to our credit portal (FIU).",
    code: `<ConsentResponse>
  <ConsentId>AA-CONSENT-9382910</ConsentId>
  <FIP>State Bank of India</FIP>
  <FIU>CredAI Credit Engine</FIU>
  <DataRange start="2026-01-17" end="2026-07-17"/>
  <DigitalSignature>MEQCID3L98sbc65e/21...</DigitalSignature>
</ConsentResponse>`
  },
  sources: {
    name: "Verified Financial Data Sources Hub",
    desc: "Direct integration with 10 secure financial APIs to compile bank deposits, UPI logs, GSTR filings, tax records, utility balances, e-commerce stores, and active salary tracks.",
    code: `{
  "source_integration": {
    "bank_statements_fip": "Retrieved (SBI, 6 Months)",
    "upi_transactions_qr": "Retrieved (PhonePe/BharatPe)",
    "gstin_tax_filing": "Active (Regular GSTR-3B filings)",
    "electricity_billpay": "Retrieved (Grade A+)",
    "e_commerce_amazon": "Retrieved (Active Store)"
  }
}`
  },
  cleaning: {
    name: "Data Cleaning & Parsing Pipeline",
    desc: "Cleans raw logs. Filters duplicate transfer hashes, filters self-transfers, isolates merchant-only UPI transactions, and normalizes formatting across different FIP structures.",
    code: `// Normalization Engine Pipeline
function cleanTransaction(tx) {
  if (tx.status !== 'Success') return null;
  // Filter self-to-self ledger transfers
  if (tx.narration.includes("SELF-TRANSFER")) return null;
  return {
    date: tx.timestamp.split('T')[0],
    amount: parseFloat(tx.amount),
    type: tx.direction === 'IN' ? 'Deposit' : 'Withdrawal'
  };
}`
  },
  scoring: {
    name: "CredAI Credit Scoring Engine",
    desc: "Calculates scores based on transaction volume, stability, growth, discipline, and digital footprints, scaling the score to a standardized 0-1000 credit score.",
    code: `{
  "credit_evaluation": {
    "score_category": "PRAGATI_TIER_EXCELLENT",
    "score_raw_sum": "612/700",
    "standard_pragati_score": 820,
    "equivalent_scale_1000": 875,
    "dscr_baseline": "1.45x",
    "evaluation_timestamp": "2026-07-17T12:05:00Z"
  }
}`
  },
  explain: {
    name: "Explainable AI (SHAP / LIME)",
    desc: "Runs SHAP (SHapley Additive exPlanations) to assign a contribution weight to each feature relative to baseline defaults, making alternative credit decisions completely transparent.",
    code: `{
  "explainable_ai_weights": [
    { "feature": "Cash Flow Stability", "weight": +45.2, "label": "Highly Consistent Inflows" },
    { "feature": "Average Daily Balance", "weight": +28.5, "label": "Strong Liquid Reserves" },
    { "feature": "Delayed Utility Bill", "weight": -12.4, "label": "Late Payment Penalty" }
  ]
}`
  },
  decision: {
    name: "Lender Dispatch & Instant Decision",
    desc: "Matches the credit profile and SHAP weight map with collaborated bank criteria, producing an instant decision (e.g. Auto-Approved with SBI or HDFC) for disbursement.",
    code: `{
  "decision_dispatch": {
    "status": "AUTO_APPROVED",
    "matching_lender": "State Bank of India",
    "disbursed_amount": 150000,
    "interest_rate": "10.1% p.a.",
    "repayment_mode": "Monthly NACH Auto-Debit",
    "reference_id": "TXN_DISB_9281039120",
    "disbursement_state": "DISBURSED_SUCCESSFULLY"
  }
}`
  }
};

function inspectPipelineStep(step) {
  const details = pipelineDetails[step];
  if (!details) return;
  
  const titleEl = document.getElementById('inspector-step-title');
  if (titleEl) titleEl.innerText = `Viewing details for: ${details.name}`;
  const nameEl = document.getElementById('inspect-node-name');
  if (nameEl) nameEl.innerText = details.name;
  const descEl = document.getElementById('inspect-node-description');
  if (descEl) descEl.innerText = details.desc;
  
  const codeEl = document.getElementById('inspect-node-code');
  if (codeEl) codeEl.innerText = details.code;
}

// ==========================================
// FINANCIAL INCLUSION INDEX RADAR CHART
// ==========================================
let fiiChartInstance = null;

async function renderFIIRadarChart() {
  if (!activePersona || !evaluation) return;
  const canvas = document.getElementById('fii-radar-chart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (fiiChartInstance) fiiChartInstance.destroy();
  
  const p = activePersona;
  const income = p.baseMonthlySales;
  const adb = p.averageDailyBalance || p.metrics?.adb || 2000;
  
  let data = null;
  if (isServerOnline && !p.id.startsWith('custom_')) {
    try {
      const res = await fetch(`/api/financial-inclusion-index/${p.id}`);
      data = await res.json();
    } catch (e) {
      console.warn("API Financial Inclusion Index failed, falling back to local calculation.", e);
    }
  }
  
  if (!data) {
    data = {
      incomeStability: p.id === 'farmer' ? 45 : p.id === 'gig' ? 65 : p.id === 'freelancer' ? 72 : p.metrics?.inflowStability || 80,
      cashFlowHealth: Math.min(100, Math.round((adb / income) * 500)),
      savingsBehaviour: Math.min(100, Math.round((adb / income) * 400)),
      businessGrowth: p.metrics?.growthTrend ? Math.min(100, p.metrics.growthTrend * 8) : 60,
      paymentDiscipline: p.utilityGrade === 'A+' ? 95 : p.utilityGrade === 'A' ? 88 : p.utilityGrade === 'B+' ? 75 : 62,
      fraudRisk: 92,
      digitalActivity: Math.min(100, Math.round(p.upiRatio * 100 + (p.hasGst ? 15 : 0)))
    };
  }
  
  fiiChartInstance = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: ['Income Stability', 'Cash Flow Health', 'Savings Behaviour', 'Business Growth', 'Payment Discipline', 'Fraud Safety', 'Digital Activity'],
      datasets: [{
        label: 'Financial Inclusion Index',
        data: [data.incomeStability, data.cashFlowHealth, data.savingsBehaviour, data.businessGrowth, data.paymentDiscipline, data.fraudRisk, data.digitalActivity],
        backgroundColor: 'rgba(45, 212, 191, 0.15)',
        borderColor: 'rgba(45, 212, 191, 0.8)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(45, 212, 191, 1)',
        pointBorderColor: '#fff',
        pointRadius: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        r: {
          beginAtZero: true,
          max: 100,
          grid: { color: 'rgba(255,255,255,0.06)' },
          angleLines: { color: 'rgba(255,255,255,0.06)' },
          pointLabels: { color: '#94a3b8', font: { size: 11 } },
          ticks: { display: false }
        }
      }
    }
  });
}

// ==========================================
// EXPENSE BEHAVIOR DONUT CHART
// ==========================================
let expenseChartInstance = null;

function renderExpenseDonutChart() {
  if (!activePersona) return;
  const canvas = document.getElementById('expense-donut-chart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (expenseChartInstance) expenseChartInstance.destroy();
  
  const income = activePersona.baseMonthlySales;
  const expenses = {
    'Rent': activePersona.id === 'vendor' ? 2500 : activePersona.id === 'kirana' ? 22000 : activePersona.id === 'freelancer' ? 18000 : activePersona.id === 'boutique' ? 35000 : 5000,
    'Suppliers': Math.round(income * 0.35),
    'Fuel & Transport': activePersona.id === 'gig' ? Math.round(income * 0.35) : Math.round(income * 0.05),
    'Utilities': Math.round(income * 0.04),
    'Food': Math.round(income * 0.08),
    'Savings': Math.round(income * 0.12),
    'Other': Math.round(income * 0.06)
  };
  
  const labels = Object.keys(expenses);
  const data = Object.values(expenses);
  const colors = [
    'rgba(99, 102, 241, 0.8)',
    'rgba(45, 212, 191, 0.8)',
    'rgba(245, 158, 11, 0.8)',
    'rgba(139, 92, 246, 0.8)',
    'rgba(244, 63, 94, 0.8)',
    'rgba(34, 197, 94, 0.8)',
    'rgba(100, 116, 139, 0.8)'
  ];
  
  expenseChartInstance = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: labels,
      datasets: [{ data: data, backgroundColor: colors, borderWidth: 0, hoverOffset: 8 }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '65%',
      plugins: {
        legend: { position: 'right', labels: { color: '#94a3b8', font: { size: 11 }, padding: 12 } }
      }
    }
  });
  
  const summaryEl = document.getElementById('expense-summary');
  if (summaryEl) {
    const totalExpense = data.reduce((a, b) => a + b, 0);
    const savings = expenses['Savings'];
    const luxuryRatio = Math.round(((expenses['Other'] + expenses['Food']) / totalExpense) * 100);
    summaryEl.innerHTML = `
      <div style="display:flex; justify-content:space-between; font-size:0.82rem; padding:0.4rem 0; border-bottom:1px solid var(--border-muted);">
        <span style="color:var(--text-muted);">Monthly Income</span>
        <strong style="color:var(--secondary);">₹${income.toLocaleString('en-IN')}</strong>
      </div>
      <div style="display:flex; justify-content:space-between; font-size:0.82rem; padding:0.4rem 0; border-bottom:1px solid var(--border-muted);">
        <span style="color:var(--text-muted);">Total Expenses</span>
        <strong style="color:var(--danger);">₹${(totalExpense - savings).toLocaleString('en-IN')}</strong>
      </div>
      <div style="display:flex; justify-content:space-between; font-size:0.82rem; padding:0.4rem 0;">
        <span style="color:var(--text-muted);">Monthly Savings</span>
        <strong style="color:var(--success);">₹${savings.toLocaleString('en-IN')}</strong>
      </div>
      <div style="font-size:0.75rem; color:${luxuryRatio > 25 ? 'var(--warning)' : 'var(--success)'}; margin-top:0.25rem;">
        ${luxuryRatio > 25 ? '⚠️' : '✅'} Discretionary spending: ${luxuryRatio}% of total
      </div>
    `;
  }
}

// ==========================================
// LOAN RECOMMENDATION ENGINE
// ==========================================
function renderLoanRecommendation() {
  if (!evaluation) return;
  const score = evaluation.pragatiScore;
  const income = activePersona.baseMonthlySales;
  const expenses = income * 0.7;
  const existingEmi = activePersona.id === 'gig' ? 8200 : 0;
  const repaymentCapacity = income - expenses - existingEmi;
  
  const eligibleAmount = Math.round(repaymentCapacity * (score >= 850 ? 18 : score >= 700 ? 12 : score >= 550 ? 8 : 4));
  const interestRate = Math.max(10.5, 36 - (score / 1000) * 24);
  const duration = score >= 700 ? 60 : score >= 550 ? 36 : 12;
  const monthlyEmi = Math.round((eligibleAmount * (1 + (interestRate/100) * (duration/12))) / duration);
  const confidence = Math.min(98, Math.round(50 + (score / 1000) * 48));
  
  const amountEl = document.getElementById('rec-amount');
  const interestEl = document.getElementById('rec-interest');
  const emiEl = document.getElementById('rec-emi');
  const durationEl = document.getElementById('rec-duration');
  const confidenceEl = document.getElementById('rec-confidence');
  const confidenceBar = document.getElementById('rec-confidence-bar');
  
  if (amountEl) amountEl.innerText = '₹' + eligibleAmount.toLocaleString('en-IN');
  if (interestEl) interestEl.innerText = interestRate.toFixed(1) + '%';
  if (emiEl) emiEl.innerText = '₹' + monthlyEmi.toLocaleString('en-IN');
  if (durationEl) durationEl.innerText = duration + ' Mo';
  if (confidenceEl) confidenceEl.innerText = confidence + '%';
  if (confidenceEl) confidenceEl.innerText = confidence + '%';
  if (confidenceBar) confidenceBar.style.width = confidence + '%';
}

function downloadCreditReport() {
  if (!activePersona || !evaluation) { showToast('Please select a borrower profile first.', 'error'); return; }
  const report = {
    reportTitle: 'CredAI Alternative Credit Report',
    generatedAt: new Date().toISOString(),
    borrowerProfile: {
      name: activePersona.name,
      business: activePersona.businessName,
      role: activePersona.roleName,
      location: activePersona.location,
      sector: activePersona.sector
    },
    creditScore: {
      credAIScore: evaluation.pragatiScore,
      tier: evaluation.tier,
      subscores: evaluation.subscores
    },
    loanRecommendation: {
      eligibleAmount: '₹' + Math.round((activePersona.baseMonthlySales * 0.3) * (evaluation.pragatiScore >= 850 ? 18 : evaluation.pragatiScore >= 700 ? 12 : 8)).toLocaleString('en-IN'),
      suggestedRate: Math.max(10.5, 36 - (evaluation.pragatiScore / 1000) * 24).toFixed(1) + '%'
    },
    verifiedData: {
      gstCompliant: activePersona.hasGst,
      utilityGrade: activePersona.utilityGrade,
      upiTransactionRatio: (activePersona.upiRatio * 100).toFixed(0) + '%',
      averageDailyBalance: '₹' + (activePersona.averageDailyBalance || 0).toLocaleString('en-IN')
    },
    disclaimer: 'This report is generated by CredAI and is based on verified alternative financial data. It complies with RBI Account Aggregator guidelines and DPDP Act 2023.'
  };
  const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `CredAI_Report_${activePersona.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('Credit report downloaded!', 'success');
}

// ==========================================
// FRAUD RISK INDICATOR (Underwriter)
// ==========================================
function updateFraudRiskIndicator() {
  const fraudEl = document.getElementById('stat-fraud');
  const fraudBox = document.getElementById('fraud-risk-box');
  if (!fraudEl || !fraudBox) return;
  
  const score = selectedApplication ? selectedApplication.score : 0;
  let risk = 'Low';
  let color = 'var(--success)';
  let boxClass = 'risk-low';
  
  if (score < 400) { risk = 'High'; color = 'var(--danger)'; boxClass = 'risk-high'; }
  else if (score < 600) { risk = 'Medium'; color = 'var(--warning)'; boxClass = 'risk-mid'; }
  
  fraudEl.innerText = risk;
  fraudEl.style.color = color;
  fraudBox.className = `stat-box ${boxClass}`;
}
