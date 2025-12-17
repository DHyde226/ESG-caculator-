const clamp = require("../clamp");

/**
 * Default emission factors.
 * IMPORTANT:
 * - These are placeholders.
 * - Replace with your chosen standard set (GHG Protocol / DEFRA / EPA / EIB / etc.)
 * - Keep units EXACT.
 */
const EF = {
  // -------- Scope 1 fuels (tCO2e per unit) --------
  naturalGas_m3: 0.0019,      // tCO2e / m3  (placeholder)
  diesel_l: 0.00268,          // tCO2e / L   (placeholder)
  gasoline_l: 0.00231,        // tCO2e / L   (placeholder)
  fuelOil_l: 0.0031,          // tCO2e / L   (placeholder)
  propane_l: 0.00151,         // tCO2e / L   (placeholder)
  coal_tonne: 2.4,            // tCO2e / tonne (placeholder)

  // -------- Refrigerants (GWP100, convert kg leak -> tCO2e) --------
  // tCO2e = kg * GWP / 1000
  gwp: {
    R410a: 2088,
    R134a: 1430,
    R404a: 3922,
    R407a: 2107,
    R507a: 3985,
    R123a: 77,   // NOTE: Your field name says R123a; common is R123. keep as you used.
    R32: 675,
  },

  // -------- Process emissions (tCO2e per tonne product) --------
  process: {
    cement_tonne: 0.7,        // placeholder
    lime_tonne: 0.9,          // placeholder
    steel_tonne: 1.8,         // placeholder
    aluminum_tonne: 8.0,      // placeholder
    ammonia_tonne: 2.0,       // placeholder
    glass_tonne: 0.6,         // placeholder
  },

  // Wastewater gases if you are inputting TONNES of CH4 / N2O:
  // tCO2e = tonnes_gas * GWP
  gwp_gas: {
    CH4: 27.2,  // placeholder (AR6/AR5 differs; choose one standard)
    N2O: 273,   // placeholder
  },

  // -------- Scope 2 grid electricity (tCO2e / kWh) --------
  grid_kWh: {
    Canada: 0.00012,   // placeholder
    USA: 0.00038,      // placeholder
    EU: 0.00023,       // placeholder
    "Global Avg": 0.00045, // placeholder
    Custom: 0.0003,    // placeholder
    "": 0.0003,        // fallback
  },

  // -------- Scope 3 (tCO2e per unit) --------
  purchasedGoods_EUR: 0.0003,      // tCO2e / EUR placeholder
  capitalGoods_EUR: 0.00025,       // tCO2e / EUR placeholder
  upstreamTransport_tkm: 0.00009,  // tCO2e / tonne-km placeholder
  downstreamTransport_tkm: 0.00009,// tCO2e / tonne-km placeholder
  businessTravel_km: 0.0002,       // tCO2e / km placeholder
  employeeCommuting_km: 0.00015,   // tCO2e / km placeholder
  leasedAssets_kWh: 0.00023,       // tCO2e / kWh placeholder
  franchiseEnergy_kWh: 0.00023,    // tCO2e / kWh placeholder
  processingSoldProducts_tonne: 0.5, // tCO2e / tonne placeholder

  // Waste treatment (tCO2e per kg waste)
  waste: {
    landfill_kg: 0.0006,       // placeholder
    compost_kg: 0.0001,        // placeholder
    recycling_kg: 0.00005,     // placeholder
    incineration_kg: 0.0007,   // placeholder
  },
};

function num(x) {
  const v = Number(x);
  return Number.isFinite(v) ? v : 0;
}

function refrigerant_tCO2e(kg, gwp) {
  return num(kg) * num(gwp) / 1000;
}

module.exports = function scoreSection5(section) {
  const { Scope1, Scope2, Scope3, AdditionalEmissions, ClimateRisk } = section;

  // -------------------------
  // 1) CALCULATE SCOPE 1 tCO2e
  // -------------------------
  const scope1_fuels =
    num(Scope1.scope1_naturalGas_m3) * EF.naturalGas_m3 +
    num(Scope1.scope1_diesel_l) * EF.diesel_l +
    num(Scope1.scope1_gasoline_l) * EF.gasoline_l +
    num(Scope1.scope1_fuelOil_l) * EF.fuelOil_l +
    num(Scope1.scope1_propane_l) * EF.propane_l +
    num(Scope1.scope1_coal_tonnes) * EF.coal_tonne;

  const scope1_refrigerants =
    refrigerant_tCO2e(Scope1.scope1_R410a_kg, EF.gwp.R410a) +
    refrigerant_tCO2e(Scope1.scope1_R134a_kg, EF.gwp.R134a) +
    refrigerant_tCO2e(Scope1.scope1_R404a_kg, EF.gwp.R404a) +
    refrigerant_tCO2e(Scope1.scope1_R407a_kg, EF.gwp.R407a) +
    refrigerant_tCO2e(Scope1.scope1_R507a_kg, EF.gwp.R507a) +
    refrigerant_tCO2e(Scope1.scope1_R123a_kg, EF.gwp.R123a) +
    refrigerant_tCO2e(Scope1.scope1_R32_kg, EF.gwp.R32);

  const scope1_process =
    num(Scope1.scope1_cement_tonne) * EF.process.cement_tonne +
    num(Scope1.scope1_lime_tonne) * EF.process.lime_tonne +
    num(Scope1.scope1_steel_tonne) * EF.process.steel_tonne +
    num(Scope1.scope1_alumininum_tonne) * EF.process.aluminum_tonne +
    num(Scope1.scope1_ammonia_tonne) * EF.process.ammonia_tonne +
    num(Scope1.scope1_glass_tonne) * EF.process.glass_tonne;

  // If these are already entered as "tonnes CO2e", keep as direct add.
  const scope1_direct =
    num(Scope1.scope1_direct_flare_tonne);

  // If these are TONNES of CH4 / N2O, apply GWP to convert -> tCO2e
  const scope1_wastewater =
    num(Scope1.scope1_Wastewater_Methane_tonne) * EF.gwp_gas.CH4 +
    num(Scope1.scope1_WasteWater_nitous_oxide_tonne) * EF.gwp_gas.N2O;

  const scope1_tCO2e =
    scope1_fuels + scope1_refrigerants + scope1_process + scope1_direct + scope1_wastewater;

  // -------------------------
  // 2) CALCULATE SCOPE 2 tCO2e
  // -------------------------
  const region = Scope2.scope2_region || "";
  const gridEF = EF.grid_kWh[region] ?? EF.grid_kWh[""] ?? 0.0003;

  // Apply renewable share as a simple market-based adjustment:
  // effective EF = gridEF * (1 - renewableShare)
  const renewShare = Math.max(0, Math.min(100, num(Scope2.scope2_renewableSharePercent))) / 100;
  const effectiveGridEF = gridEF * (1 - renewShare);

  const scope2_kWh =
    num(Scope2.scope2_electricityPurchased_kWh) +
    num(Scope2.scope2_heat_kWh) +
    num(Scope2.scope2_cooling_kWh);

  const scope2_tCO2e = scope2_kWh * effectiveGridEF;

  // -------------------------
  // 3) CALCULATE SCOPE 3 tCO2e
  // -------------------------
  const scope3_goods =
    num(Scope3.scope3_purchasedGoods_EUR) * EF.purchasedGoods_EUR +
    num(Scope3.scope3_capitalGoods_EUR) * EF.capitalGoods_EUR;

  const scope3_transport =
    num(Scope3.scope3_upstreamTransport_tkm) * EF.upstreamTransport_tkm +
    num(Scope3.scope3_downstreamTransport_tkm) * EF.downstreamTransport_tkm;

  const scope3_travel =
    num(Scope3.scope3_businessTravel_km) * EF.businessTravel_km +
    num(Scope3.scope3_employeeCommuting_km) * EF.employeeCommuting_km;

  const scope3_energy =
    num(Scope3.scope3_upstreamLeasedAssets_kWh) * EF.leasedAssets_kWh +
    num(Scope3.scope3_downstreamLeasedAssets_kWh) * EF.leasedAssets_kWh +
    num(Scope3.scope3_franchiseEnergy_kWh) * EF.franchiseEnergy_kWh;

  const scope3_processing =
    num(Scope3.scope3_processingSoldProducts_tonnes) * EF.processingSoldProducts_tonne;

  const scope3_waste =
    num(Scope3.scope3_waste_landfill_kg) * EF.waste.landfill_kg +
    num(Scope3.scope3_waste_compost_kg) * EF.waste.compost_kg +
    num(Scope3.scope3_waste_recycling_kg) * EF.waste.recycling_kg +
    num(Scope3.scope3_waste_Incineration_kg) * EF.waste.incineration_kg;

  // Already tCO2e according to your field name
  const scope3_financed = num(Scope3.scope3_financedEmissions_tCO2e);

  const scope3_tCO2e =
    scope3_goods + scope3_transport + scope3_travel + scope3_energy + scope3_processing + scope3_waste + scope3_financed;

  // -------------------------
  // 4) TOTAL + TREND
  // -------------------------
  const currentTotal = scope1_tCO2e + scope2_tCO2e + scope3_tCO2e;

  const lastYearTotal =
    num(AdditionalEmissions.LastYearScope1) +
    num(AdditionalEmissions.LastYearScope2) +
    num(AdditionalEmissions.LastYearScope3);

  // -------------------------
  // 5) SCORING (0–100)
  // -------------------------
  let score = 0;

  // A) Emissions performance / trend (45)
  if (lastYearTotal > 0) {
    const reduction = (lastYearTotal - currentTotal) / lastYearTotal;
    if (reduction >= 0.10) score += 45;
    else if (reduction >= 0.05) score += 35;
    else if (reduction > 0) score += 25;
    else score += 10;
  } else {
    // no baseline given
    score += 20;
  }

  // B) Scope 2 decarb (15)
  if (Scope2.scope2_renewableSharePercent >= 80) score += 15;
  else if (Scope2.scope2_renewableSharePercent >= 50) score += 10;
  else if (Scope2.scope2_renewableSharePercent >= 20) score += 5;

  // C) Scope 3 coverage (15) – count categories with non-zero values
  const scope3CategoriesReported = Object.entries(Scope3)
    .filter(([_, v]) => typeof v === "number" && v > 0).length;

  if (scope3CategoriesReported >= 10) score += 15;
  else if (scope3CategoriesReported >= 6) score += 10;
  else if (scope3CategoriesReported >= 3) score += 5;

  // D) Data quality & verification (10)
  if (AdditionalEmissions.activityDataQuality === "A") score += 4;
  else if (AdditionalEmissions.activityDataQuality === "B") score += 3;
  else if (AdditionalEmissions.activityDataQuality === "C") score += 2;

  if (AdditionalEmissions.emissionFactorQuality === "Tier 3") score += 4;
  else if (AdditionalEmissions.emissionFactorQuality === "Tier 2") score += 2;

  if (AdditionalEmissions.verificationLevel === "Reasonable") score += 2;
  else if (AdditionalEmissions.verificationLevel === "Limited") score += 1;

  // E) Climate risk & transition (15)
  if (ClimateRisk.climateRiskAssessment) score += 5;
  if (ClimateRisk.scenarioAnalysis) score += 4;
  if (ClimateRisk.adaptationPlan) score += 3;
  if (ClimateRisk.physicalRisksConsidered && ClimateRisk.transitionRisksConsidered) score += 3;

  return {
    score: clamp(score),
    maxScore: 100,
    breakdown: {
      scope1: {
        tCO2e: scope1_tCO2e,
        fuels: scope1_fuels,
        refrigerants: scope1_refrigerants,
        process: scope1_process,
        direct: scope1_direct,
        wastewater: scope1_wastewater,
      },
      scope2: {
        tCO2e: scope2_tCO2e,
        region,
        gridEF,
        effectiveGridEF,
        renewableSharePercent: Scope2.scope2_renewableSharePercent,
        kWh: scope2_kWh,
      },
      scope3: {
        tCO2e: scope3_tCO2e,
        goods: scope3_goods,
        transport: scope3_transport,
        travel: scope3_travel,
        energy: scope3_energy,
        processing: scope3_processing,
        waste: scope3_waste,
        financed: scope3_financed,
        categoriesReported: scope3CategoriesReported,
      },
      totals: {
        currentTotal_tCO2e: currentTotal,
        lastYearTotal_tCO2e: lastYearTotal,
      },
      dataQuality: AdditionalEmissions,
      climateRisk: ClimateRisk,
    },
  };
};
