// Samriddhi AI - Credit Scoring Engine

export function evaluateCreditProfile(persona, transactions, customUploadContent = null) {
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
export function getLoanTerms(score, requestAmount) {
  // Compute customized loan offers based on Pragati Score
  // Base rates: Score 300 has 36% interest, Score 900 has 12% interest
  const rateSlope = (36 - 12) / (900 - 300);
  const interestRate = Math.max(10.5, 36 - (score - 300) * rateSlope);
  
  // Max Loan multiplier based on score
  let multiplier = 0.5;
  if (score >= 780) multiplier = 3.5;
  else if (score >= 680) multiplier = 2.0;
  else if (score >= 550) multiplier = 1.0;
  else multiplier = 0.4;
  
  const maxEligibleAmount = Math.round(requestAmount * multiplier);
  
  return {
    interestRate: parseFloat(interestRate.toFixed(2)),
    maxEligibleAmount,
    repaymentMode: score > 680 ? "Flexible UPI Split / Weekly" : "Daily UPI QR Deductions (Sachet repayment)"
  };
}
