// Samriddhi AI - Personas and Transaction Data

export const personas = {
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
      tenure: 3, // months
      purpose: "Purchase high-quality brass kettles and bulk tea/milk inventory for winter rush"
    },
    metrics: {
      adb: 1400,
      monthlyInflow: 24800,
      inflowStability: 94, // % consistency
      growthTrend: 6.2, // MoM %
      repaymentCapacity: 88 // Score out of 100
    }
  },
  kirana: {
    id: "kirana",
    name: "Sunita Devi",
    avatar: "🛒",
    businessName: "Devi Provisions & Kirana Store",
    roleName: "Kirana Store Owner",
    location: "Gachibowli, Hyderabad",
    description: "Runs a neighborhood grocery store. Has steady cash flow with high UPI volumes (BharatPe merchant QR) and weekly bank deposits. File contains regular distributor pay-outs.",
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
    metrics: {
      adb: 24500,
      monthlyInflow: 225000,
      inflowStability: 91,
      growthTrend: 8.5,
      repaymentCapacity: 92
    }
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
    upiRatio: 0.90, // driver gets paid digitally via platform wallet/UPI
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
    metrics: {
      adb: 3200,
      monthlyInflow: 46200,
      inflowStability: 85,
      growthTrend: 3.1,
      repaymentCapacity: 79
    }
  },
  farmer: {
    id: "farmer",
    name: "Harish Patel",
    avatar: "🌾",
    businessName: "Patel Organic Farms",
    roleName: "Smallholder Farmer",
    location: "Anand, Gujarat",
    description: "Cultivates cotton and groundnuts on 3 acres. Cash flow is highly seasonal with large cash/digital inflows post-harvest. Receives e-NAM payouts and PM-KISAN quarterly subsidies.",
    baseMonthlySales: 18000, // annualized average
    upiRatio: 0.40,
    avgDailyTxCount: 2, // low frequency but high ticket
    averageDailyBalance: 12500, // high post harvest, low sowing
    hasGst: false,
    utilityGrade: "A",
    sector: "Agriculture",
    typicalLoanRequest: {
      amount: 60000,
      tenure: 9,
      purpose: "Fertilizer purchase and high-yield seed procurement for upcoming Kharif sowing season"
    },
    metrics: {
      adb: 12500,
      monthlyInflow: 18400,
      inflowStability: 52, // seasonal cash flow volatility
      growthTrend: 4.8,
      repaymentCapacity: 75
    }
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
    metrics: {
      adb: 29000,
      monthlyInflow: 138000,
      inflowStability: 88,
      growthTrend: 12.4,
      repaymentCapacity: 86
    }
  }
};

// Function to generate simulated transaction log for the past 6 months
export function generateTransactions(personaId) {
  const persona = personas[personaId];
  const txList = [];
  const currentDate = new Date();
  
  // Custom transaction categories
  const depositCategories = ["UPI Customer Payment", "Platform Payout", "e-NAM Harvest Payout", "PM-KISAN Crop Subsidy", "Invoice Settlement"];
  const withdrawalCategories = ["Supplier Settlement", "Fuel Expense", "Rent", "Utility Electricity", "Telecom Recharge", "Raw Material Purchase", "Personal Cash Withdraw", "EMI Payment"];
  
  // Date range: 180 days ago to today
  for (let i = 180; i >= 0; i--) {
    const txDate = new Date();
    txDate.setDate(currentDate.getDate() - i);
    
    const isWeekend = txDate.getDay() === 0 || txDate.getDay() === 6;
    
    // Vendor: Ramesh (High frequency, daily UPI, small amounts)
    if (personaId === "vendor") {
      // High volume daily sales
      const txCount = isWeekend ? Math.floor(Math.random() * 25) + 20 : Math.floor(Math.random() * 50) + 30;
      
      // Daily Inflow
      let dailyInflow = 0;
      for (let t = 0; t < txCount; t++) {
        const amount = Math.floor(Math.random() * 40) + 10; // ₹10 - ₹50
        dailyInflow += amount;
        
        if (Math.random() > 0.4 && txList.length < 50) { // Limit detailed logs
          txList.push({
            date: formatDate(txDate),
            type: "Deposit",
            description: `UPI: Customer-${Math.floor(Math.random() * 9000) + 1000}@upi`,
            category: "UPI Customer Payment",
            amount: amount,
            status: "Success"
          });
        }
      }
      
      // Aggregate rest of daily inflows for performance and cleanliness
      txList.push({
        date: formatDate(txDate),
        type: "Deposit",
        description: `UPI Aggregate: Merchant BharatPe QR (${txCount} sales)`,
        category: "UPI Customer Payment",
        amount: Math.floor(dailyInflow),
        status: "Success"
      });
      
      // Weekly Supplier Payout
      if (txDate.getDay() === 1) { // Mondays
        txList.push({
          date: formatDate(txDate),
          type: "Withdrawal",
          description: "UPI: Mother Dairy Milk Vendor",
          category: "Supplier Settlement",
          amount: Math.floor(Math.random() * 1200) + 3000,
          status: "Success"
        });
      }
      
      // Monthly Personal/Rent Expense
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
      
      // Mobile Recharge
      if (txDate.getDate() === 15) {
        txList.push({
          date: formatDate(txDate),
          type: "Withdrawal",
          description: "Jio Prepaid Plan AutoPay",
          category: "Telecom Recharge",
          amount: 749,
          status: "Success"
        });
      }
    }
    
    // Kirana Store: Sunita (High volume, larger transactions, GST logs)
    else if (personaId === "kirana") {
      // Inflow
      if (Math.random() > 0.1) {
        const amount = Math.floor(Math.random() * 4000) + 2000;
        txList.push({
          date: formatDate(txDate),
          type: "Deposit",
          description: `UPI Merchant settlement: PayTM QR`,
          category: "UPI Customer Payment",
          amount: amount,
          status: "Success"
        });
      }
      
      // Weekly Distributor Settlements (Hindustan Unilever, ITC, etc.)
      if (txDate.getDay() === 3) { // Wednesdays
        const distAmt = Math.floor(Math.random() * 15000) + 25000;
        txList.push({
          date: formatDate(txDate),
          type: "Withdrawal",
          description: "NEFT: ITC Distributor Settlement",
          category: "Supplier Settlement",
          amount: distAmt,
          status: "Success"
        });
      }
      
      // Rent & Bills
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
      if (txDate.getDate() === 7) {
        txList.push({
          date: formatDate(txDate),
          type: "Withdrawal",
          description: "BillPay: TSSPDCL Electricity",
          category: "Utility Electricity",
          amount: Math.floor(Math.random() * 2000) + 4500,
          status: "Success"
        });
      }
    }
    
    // Gig Worker: Vikram (Weekly platform pay-ins, high fuel cost)
    else if (personaId === "gig") {
      // Uber Weekly Deposit (Every Tuesday)
      if (txDate.getDay() === 2) {
        const pay = Math.floor(Math.random() * 4000) + 8500;
        txList.push({
          date: formatDate(txDate),
          type: "Deposit",
          description: "IMPS: Uber India Payout",
          category: "Platform Payout",
          amount: pay,
          status: "Success"
        });
      }
      // Ola Weekly Deposit (Every Friday)
      if (txDate.getDay() === 5) {
        const pay = Math.floor(Math.random() * 1500) + 2500;
        txList.push({
          date: formatDate(txDate),
          type: "Deposit",
          description: "IMPS: Ola Fleet Driver Pay",
          category: "Platform Payout",
          amount: pay,
          status: "Success"
        });
      }
      
      // Daily Fuel (CNG/Petrol)
      if (txDate.getDay() !== 0) { // Off on Sundays
        const fuel = Math.floor(Math.random() * 200) + 550;
        txList.push({
          date: formatDate(txDate),
          type: "Withdrawal",
          description: "UPI: IndianOil Fuel Station",
          category: "Fuel Expense",
          amount: fuel,
          status: "Success"
        });
      }
      
      // Car Maintenance EMI (10th of every month)
      if (txDate.getDate() === 10) {
        txList.push({
          date: formatDate(txDate),
          type: "Withdrawal",
          description: "ACH: Cholamandalam Car Loan EMI",
          category: "EMI Payment",
          amount: 8200,
          status: "Success"
        });
      }
    }
    
    // Farmer: Harish (Seasonal sales, e-NAM transactions)
    else if (personaId === "farmer") {
      // Harvesting Season Sales: Cotton in Nov (Day 150 ago) & Groundnut in Feb (Day 60 ago)
      const daysAgo = 180 - i;
      if (daysAgo === 30) { // Nov Post-Kharif Harvest
        txList.push({
          date: formatDate(txDate),
          type: "Deposit",
          description: "e-NAM: Cotton Crop Auction Yield payout",
          category: "e-NAM Harvest Payout",
          amount: 85000,
          status: "Success"
        });
      }
      
      if (daysAgo === 120) { // Feb Rabi Harvest
        txList.push({
          date: formatDate(txDate),
          type: "Deposit",
          description: "e-NAM: Groundnut Harvest payout",
          category: "e-NAM Harvest Payout",
          amount: 62000,
          status: "Success"
        });
      }
      
      // PM-KISAN Subsidy (Quarterly)
      if (daysAgo === 45 || daysAgo === 135) {
        txList.push({
          date: formatDate(txDate),
          type: "Deposit",
          description: "DBT: PM-KISAN Installment Government of India",
          category: "PM-KISAN Crop Subsidy",
          amount: 2000,
          status: "Success"
        });
      }
      
      // Weekly Milk Pouring Receipts (Recurrent small cash inflow)
      if (txDate.getDay() === 6) { // Saturdays
        txList.push({
          date: formatDate(txDate),
          type: "Deposit",
          description: "UPI: Amul Milk Dairy Pouring Coop",
          category: "UPI Customer Payment",
          amount: Math.floor(Math.random() * 300) + 1200,
          status: "Success"
        });
      }
      
      // Sowing Seeds & Pesticides Outflow (Before Monsoons/Winter)
      if (daysAgo === 5 || daysAgo === 95) {
        txList.push({
          date: formatDate(txDate),
          type: "Withdrawal",
          description: "UPI: Anand Farmer Agro Input Store",
          category: "Raw Material Purchase",
          amount: Math.floor(Math.random() * 4000) + 12000,
          status: "Success"
        });
      }
    }
    
    // Boutique Owner: Pooja (Steady, Invoice Settlements, GST filed)
    else if (personaId === "boutique") {
      // Inflow (Wedding Wear - High ticket, low frequency)
      if (txDate.getDay() === 6 || txDate.getDay() === 0) { // Weekends
        if (Math.random() > 0.4) {
          const val = Math.floor(Math.random() * 15000) + 10000;
          txList.push({
            date: formatDate(txDate),
            type: "Deposit",
            description: `UPI: Invoice Collection-Client-${Math.floor(Math.random() * 80) + 10}`,
            category: "Invoice Settlement",
            amount: val,
            status: "Success"
          });
        }
      } else { // Weekdays
        if (Math.random() > 0.75) {
          const val = Math.floor(Math.random() * 8000) + 3000;
          txList.push({
            date: formatDate(txDate),
            type: "Deposit",
            description: "UPI Merchant settlement: Razorpay",
            category: "UPI Customer Payment",
            amount: val,
            status: "Success"
          });
        }
      }
      
      // Silk/Raw Material Purchase
      if (txDate.getDate() === 10) {
        txList.push({
          date: formatDate(txDate),
          type: "Withdrawal",
          description: "UPI: Surat Silks Wholesaler Corp",
          category: "Raw Material Purchase",
          amount: Math.floor(Math.random() * 8000) + 18000,
          status: "Success"
        });
      }
      
      // Rent & Store Bill
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
      
      // Monthly GST Tax Payment
      if (txDate.getDate() === 20) {
        txList.push({
          date: formatDate(txDate),
          type: "Withdrawal",
          description: "ACH: GSTIN SGST CGST Settlement GST Portal",
          category: "EMI Payment",
          amount: Math.floor(Math.random() * 2000) + 4000,
          status: "Success"
        });
      }
    }
  }
  
  // Sort transactions by date (most recent first)
  return txList.sort((a, b) => new Date(b.date) - new Date(a.date));
}

// Utility to format Date
function formatDate(date) {
  const yyyy = date.getFullYear();
  let mm = date.getMonth() + 1; // Months start at 0
  let dd = date.getDate();
  
  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;
  
  return `${yyyy}-${mm}-${dd}`;
}

// Pre-packaged simulated "statement upload files" for drag-drop testing
export const sampleUploadFiles = {
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
      averageDailyBalance: 3100, // ADB fell significantly!
      totalInflows: 910000, // Sales down
      totalOutflows: 950000, // Outflows exceed inflows!
      gstStatus: "Verified GSTR-3B (2 filing delays)",
      chequeBounces: 2, // Non-sufficient funds bounces
      adbStability: "42%",
      growthRate: "-15.4%" // Negative growth
    }
  },
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
      weeklyPayoutsCount: 11, // Missing 1 week payout
      ratingMetrics: "Aggregator Rating: 4.22/5 (Warning status)", // Rating fell, risking suspension
      adbStability: "60%",
      growthRate: "-2.5%"
    }
  }
};
