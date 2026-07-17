// Samriddhi AI - Underwriter Stress Test Simulator Engine

import { evaluateCreditProfile } from './scoring.js';

export function runStressTest(persona, baseEvaluation, revenueShock, costShock, volShock) {
  // Shock values are percentages (e.g. 20 means 20% shock)
  const revFactor = 1 - (revenueShock / 100);
  const costFactor = 1 + (costShock / 100);
  
  // Base metrics
  const originalInflow = baseEvaluation.metrics.totalInflow;
  const originalAdb = baseEvaluation.metrics.adb;
  const originalStability = baseEvaluation.metrics.stability;
  const originalGrowth = baseEvaluation.metrics.growth;
  
  // Calculate stressed values
  const stressedInflow = Math.max(1000, originalInflow * revFactor);
  
  // Margins are compressed: Outflows grow and inflows drop.
  // Stressed ADB is computed by assuming cash reserves drop due to monthly deficits
  const estimatedOutflows = (originalInflow * 0.85) * costFactor; // Assume 85% average burn rate
  const monthlySavings = stressedInflow - estimatedOutflows;
  
  // ADB drops if savings drop
  let stressedAdb = originalAdb;
  if (monthlySavings < 0) {
    // Bleeding reserves
    stressedAdb = Math.max(200, originalAdb + (monthlySavings * 0.2)); // Assume 20% of deficit directly hits ADB
  } else {
    // Scaled down due to lower overall throughput
    stressedAdb = Math.max(500, originalAdb * revFactor);
  }
  
  // Volatility increases reduce stability score
  const stressedStability = Math.max(10, originalStability - (volShock * 0.5));
  
  // Growth is dragged down directly by the revenue shock
  const stressedGrowth = originalGrowth - (revenueShock * 0.4);
  
  // Re-run the evaluation engine with stressed metrics
  const simulatedUpload = {
    averageDailyBalance: Math.round(stressedAdb),
    totalInflows: Math.round(stressedInflow * 6),
    growthRate: stressedGrowth.toFixed(1) + "%",
    adbStability: Math.round(stressedStability) + "%",
    gstStatus: persona.hasGst ? "Regular" : "None",
    chequeBounces: Math.max(0, Math.floor(volShock / 20)) // High volatility increases chance of check bounce
  };
  
  const stressedEvaluation = evaluateCreditProfile(persona, [], simulatedUpload);
  
  // Calculate Debt Service Coverage Ratio (DSCR) or Free Cash Flow Margin
  // DSCR = (Monthly Inflow - Operating Outflows) / Monthly Loan EMI
  // We assume a standard EMI representing 20% of base income.
  const assumedEmi = originalInflow * 0.15;
  const originalFcf = originalInflow * 0.15; // 15% free cash flow margin
  const stressedFcf = stressedInflow - estimatedOutflows;
  
  const originalDscr = assumedEmi > 0 ? (originalFcf + assumedEmi) / assumedEmi : 1.5;
  const stressedDscr = assumedEmi > 0 ? (Math.max(0, stressedFcf) + assumedEmi) / assumedEmi : 0.8;
  
  // Determine Risk Category
  let riskStatus = "Low";
  let riskClass = "risk-low";
  
  if (stressedEvaluation.pragatiScore < 500 || stressedDscr < 1.0) {
    riskStatus = "High Risk";
    riskClass = "risk-high";
  } else if (stressedEvaluation.pragatiScore < 650 || stressedDscr < 1.25) {
    riskStatus = "Medium Risk";
    riskClass = "risk-mid";
  }
  
  return {
    pragatiScore: stressedEvaluation.pragatiScore,
    scoreDiff: stressedEvaluation.pragatiScore - baseEvaluation.pragatiScore,
    tier: stressedEvaluation.tier,
    tierClass: stressedEvaluation.tierClass,
    metrics: {
      adb: Math.round(stressedAdb),
      inflow: Math.round(stressedInflow),
      stability: Math.round(stressedStability),
      growth: parseFloat(stressedGrowth.toFixed(1)),
      dscr: parseFloat(stressedDscr.toFixed(2))
    },
    riskStatus,
    riskClass,
    originalDscr: parseFloat(originalDscr.toFixed(2))
  };
}
