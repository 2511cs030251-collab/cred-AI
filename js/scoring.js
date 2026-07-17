// Samriddhi AI - Credit Scoring Engine

export function evaluateCreditProfile(persona, transactions, customUploadContent = null) {
  // Use uploaded statement details if provided (simulating drag-drop file calculation)
  const isCustom = !!customUploadContent;
  
  const adb = isCustom ? customUploadContent.averageDailyBalance : (persona.metrics.adb || 2000);
  const totalInflow = isCustom ? customUploadContent.totalInflows / 6 : (persona.metrics.monthlyInflow || 30000);
  const growth = isCustom ? parseFloat(customUploadContent.growthRate) : (persona.metrics.growthTrend || 5.0);
  const stability = isCustom ? parseInt(customUploadContent.adbStability) : (persona.metrics.inflowStability || 80);
  
  const hasGst = isCustom ? (customUploadContent.gstStatus && !customUploadContent.gstStatus.includes("N/A") && !customUploadContent.gstStatus.includes("None")) : persona.hasGst;
  const bounces = isCustom ? (customUploadContent.chequeBounces || 0) : (persona.id === "gig" ? 0 : 0); // Mock data bounces
  
  // 1. Transaction Volume Score (Max 100)
  let volScore = 0;
  if (totalInflow > 150000) volScore = 95;
  else if (totalInflow > 80000) volScore = 85;
  else if (totalInflow > 40000) volScore = 75;
  else if (totalInflow > 20000) volScore = 65;
  else volScore = 45;
  
  // 2. Cash Flow Stability Score (Max 150)
  // Higher stability = lower volatility
  let stabScore = Math.min(150, Math.floor((stability / 100) * 150));
  
  // 3. Business Performance Score (Max 150)
  // Evaluates growth trend and volume
  let perfScore = 80;
  if (growth > 10) perfScore = 145;
  else if (growth > 5) perfScore = 125;
  else if (growth > 0) perfScore = 100;
  else if (growth > -10) perfScore = 70;
  else perfScore = 40; // Negative growth penalizes
  
  // 4. Financial Discipline Score (Max 180)
  // Based on Average Daily Balance (ADB) and cheque bounces
  let adbToInflowRatio = totalInflow > 0 ? (adb / totalInflow) : 0;
  let discScore = 100;
  
  if (adbToInflowRatio > 0.20) discScore = 160;
  else if (adbToInflowRatio > 0.10) discScore = 140;
  else if (adbToInflowRatio > 0.05) discScore = 110;
  else if (adbToInflowRatio > 0.02) discScore = 85;
  else discScore = 55;
  
  // Apply deductions for bounces
  discScore = Math.max(30, discScore - (bounces * 40));
  
  // 5. Digital Footprint Score (Max 120)
  // Evaluates utility payments, UPI penetration, and GST compliance
  let digScore = 60;
  if (persona.upiRatio > 0.85) digScore += 20;
  else if (persona.upiRatio > 0.50) digScore += 10;
  
  if (hasGst) {
    digScore += 25;
    if (isCustom && customUploadContent.gstStatus && customUploadContent.gstStatus.includes("delays")) {
      digScore -= 15; // penalty for delayed filings
    }
  }
  if (persona.utilityGrade === "A+" || persona.utilityGrade === "A") {
    digScore += 15;
  } else if (persona.utilityGrade === "B+" || persona.utilityGrade === "B") {
    digScore += 10;
  }
  digScore = Math.min(120, digScore);
  
  // Total Score Calculation (Min 300, Max 900)
  // Scale weights: Sum of Max subscores = 100 + 150 + 150 + 180 + 120 = 700.
  // We offset it so that a raw sum of 0 yields 300, and a raw sum of 700 yields 900.
  // Formula: Score = 300 + (RawSum / 700) * 600
  const rawSum = volScore + stabScore + perfScore + discScore + digScore;
  const pragatiScore = Math.round(300 + (rawSum / 700) * 600);
  
  // Determine credit tier
  let tier = "Average";
  let tierClass = "tier-average";
  if (pragatiScore >= 780) {
    tier = "Excellent";
    tierClass = "tier-excellent";
  } else if (pragatiScore >= 680) {
    tier = "Good";
    tierClass = "tier-good";
  } else if (pragatiScore >= 550) {
    tier = "Average";
    tierClass = "tier-average";
  } else {
    tier = "High Risk";
    tierClass = "tier-poor";
  }
  
  // 6. Explainable AI SHAP/LIME Feature Contributions
  // Calculate relative positive/negative impact weights to show in underwriter dashboard
  // We compare each subscore against its 'average default value' (baseline) to show weight contributions
  const baselines = { vol: 70, stab: 100, perf: 95, disc: 110, dig: 80 };
  
  const shapWeights = [
    {
      feature: "Cash Flow Stability",
      val: stabScore - baselines.stab,
      label: stabScore >= baselines.stab ? "Consistent Daily Inflows" : "High Income Volatility"
    },
    {
      feature: "Average Daily Balance",
      val: discScore - baselines.disc,
      label: discScore >= baselines.disc ? "Healthy Balance Reserves" : "Low Cash Buffer / Overdraft Risk"
    },
    {
      feature: "Digital footprint / GST",
      val: digScore - baselines.dig,
      label: digScore >= baselines.dig ? "Strong UPI & GST Filings" : "Limited Digital Integration"
    },
    {
      feature: "Revenue Growth Trend",
      val: perfScore - baselines.perf,
      label: perfScore >= baselines.perf ? "Positive Sales Momentum" : "Declining Sales / Inflow Trend"
    },
    {
      feature: "Transaction Vol (UPI count)",
      val: volScore - baselines.vol,
      label: volScore >= baselines.vol ? "High Business Velocity" : "Low Transaction Frequency"
    }
  ];
  
  // 7. Dynamic Actionable Optimization Insights
  const insights = [];
  
  // Stability Insight
  if (stability < 75) {
    insights.push({
      type: "info",
      title: "Stabilize Weekly Inflows",
      desc: "Consolidate sales receipts into your main bank account. Avoid keeping bulk earnings in cash to reduce recorded volatility."
    });
  } else {
    insights.push({
      type: "positive",
      title: "Excellent Inflow Consistency",
      desc: "Your steady daily digital inflows indicate highly predictable revenues, boosting lending confidence."
    });
  }
  
  // Balance Insight
  if (adbToInflowRatio < 0.05) {
    insights.push({
      type: "info",
      title: "Increase Cash Reserves",
      desc: "Aim to maintain at least 5% of monthly inflows (approx. ₹" + Math.round(totalInflow * 0.05).toLocaleString('en-IN') + ") as a daily average balance for 30 consecutive days."
    });
  } else {
    insights.push({
      type: "positive",
      title: "Healthy Cash Buffers",
      desc: "You keep a strong average daily balance, which buffers against sudden business slowdowns."
    });
  }
  
  // Digital Footprint Insight
  if (!hasGst && totalInflow * 12 > 4000000) {
    insights.push({
      type: "info",
      title: "GST Registration Recommendation",
      desc: "Your annualized business volume exceeds ₹40 Lakhs. Registering for GST and uploading returns will unlock credit lines up to ₹5 Lakhs."
    });
  } else if (hasGst) {
    insights.push({
      type: "positive",
      title: "GST Compliance Bonus",
      desc: "Active GST status confirms tax compliance and acts as verified collateral for business growth loans."
    });
  }
  
  // Late Payment / Bounce Insight
  if (bounces > 0) {
    insights.push({
      type: "info",
      title: "Zero Tolerance on Bounces",
      desc: "Avoid auto-debit failures. Keep sufficient balance 48 hours prior to scheduled EMIs to regain lost discipline score points."
    });
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
    metrics: { adb, totalInflow, growth, stability, bounces }
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
