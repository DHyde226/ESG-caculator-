const clamp = require("../clamp");

module.exports = function scoreSection3(section) {
  const {
    EnergyResourceEfficentcy,
    CircularEconomy,
    AirEmissions,
    WasteManagement,
    Wastewater,
  } = section;

  let score = 0;

  /* ----------------------------------
     1️⃣ ENERGY & RESOURCE EFFICIENCY (30)
  ----------------------------------- */

  if (EnergyResourceEfficentcy.hasEnergyEfficiencyProgram) score += 10;

  // Efficiency measures (max 20)
  const efficiencyMeasures = [
    EnergyResourceEfficentcy.efficiency_LED,
    EnergyResourceEfficentcy.efficiency_HVAC,
    EnergyResourceEfficentcy.efficiency_SmartMeters,
    EnergyResourceEfficentcy.efficiency_Insulation,
    EnergyResourceEfficentcy.efficiency_HeatPumps,
    EnergyResourceEfficentcy.efficiency_ProcessOptimization,
  ];

  score += Math.min(
    efficiencyMeasures.filter(Boolean).length * 3.5,
    20
  );

  /* ----------------------------------
     2️⃣ CIRCULAR ECONOMY (20)
  ----------------------------------- */

  if (CircularEconomy.circularEconomyStrategy) score += 5;

  if (CircularEconomy.recycledMaterialsPercent >= 50) score += 7;
  else if (CircularEconomy.recycledMaterialsPercent >= 25) score += 4;

  if (CircularEconomy.productsDesignedForRecyclingPercent >= 50) score += 8;
  else if (CircularEconomy.productsDesignedForRecyclingPercent >= 25) score += 4;

  /* ----------------------------------
     3️⃣ AIR EMISSIONS (20)
  ----------------------------------- */

  if (AirEmissions.airEmissionControlsInstalled) score += 10;

  // Penalize high emissions intensity (simple proxy)
  const emissionPenalty =
    (AirEmissions.soxEmissions > 0 ? 3 : 0) +
    (AirEmissions.noxEmissions > 0 ? 3 : 0) +
    (AirEmissions.particulateEmissions > 0 ? 4 : 0);

  score += Math.max(10 - emissionPenalty, 0);

  /* ----------------------------------
     4️⃣ WASTE MANAGEMENT (20)
  ----------------------------------- */

  if (WasteManagement.wasteRecycledPercent >= 50) score += 8;
  else if (WasteManagement.wasteRecycledPercent >= 25) score += 4;

  if (WasteManagement.wasteLandfilledPercent <= 20) score += 5;
  else if (WasteManagement.wasteLandfilledPercent <= 40) score += 2;

  if (
    WasteManagement.hazardousWasteGenerated === 0 ||
    WasteManagement.hazardousWasteProcedures
  ) {
    score += 7;
  }

  /* ----------------------------------
     5️⃣ WASTEWATER MANAGEMENT (10)
  ----------------------------------- */

  if (Wastewater.wastewaterTreatedOnSite) score += 5;
  else if (Wastewater.wastewaterTreatedByThirdParty) score += 5;

  if (Wastewater.wastewaterGenerated === 0) score += 5;

  return {
    score: clamp(score),
    maxScore: 100,
    breakdown: {
      energyEfficiency: EnergyResourceEfficentcy,
      circularEconomy: CircularEconomy,
      airEmissions: AirEmissions,
      waste: WasteManagement,
      wastewater: Wastewater,
    },
  };
};
