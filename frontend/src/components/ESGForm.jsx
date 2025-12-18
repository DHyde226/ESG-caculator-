import React, { useState } from "react";
import axios from "axios";

const ESGForm = ({ token, companyId, companyName }) => {
  const [formData, setFormData] = useState({
    Section0: {
      CompanyInformation: {
        companyName: "",
        reportingDate: "",
        industrialSector: "",
        country: "",
        numberOfEmployees: 0,
        annualRevenue: 0,
        esgContactPerson: "",
        esgContactEmail: "",
      },
    },

    Section1: {
      ImpactAssessments: {
        eiaConducted: false,
        socialImpactAssessment: false,
        requiresSEA: false,
        seaCompleted: false,
      },
      HumanRightsDillagence: {
        HumanRightsSCreaningConducted: false,
        hriaRequired: false,
        hriaCompleted: false,
      },
      ManagementSystems: {
        esmsInPlace: false,
        esgPolicy: false,
        contractorsFollowESG: false,
      },
      ProjectScreening: {
        numProjectsWithEIA: 0,
        numProjectsRequiringEIA_NotCompleted: 0,
      },
      esgRisk: {
        ComapnayMainatainesgRisk: false,
      },
      Monitoring: {
        monitoringFrequency: "",
      },
    },

    Section2: {
      EngagmentPlanning: {
        stakeholderEngagementPlan: false,
        numPublicMeetings: 0,
      },
      GrievenceMechanism: {
        grievanceMechanism: false,
        grievancePublicAccess: false,
        grievancesResolvedPercent: 0,
      },
      Discloser: {
        projectInformationDisclosed: false,
      },
      EngagmentCloser: {
        engagementCoverage: "",
      },
    },

    Section3: {
      EnergyResourceEfficentcy: {
        totalEnergyConsumption: 0,
        renewableEnergyShare: 0,
        hasEnergyEfficiencyProgram: false,
        efficiency_LED: false,
        efficiency_HVAC: false,
        efficiency_SmartMeters: false,
        efficiency_Insulation: false,
        efficiency_HeatPumps: false,
        efficiency_ProcessOptimization: false,
      },
      CircularEconomy: {
        rawMaterialsUsed: 0,
        recycledMaterialsPercent: 0,
        productsDesignedForRecyclingPercent: 0,
        circularEconomyStrategy: false,
      },
      AirEmissions: {
        airEmissionControlsInstalled: false,
        soxEmissions: 0,
        noxEmissions: 0,
        particulateEmissions: 0,
      },
      WasteManagement: {
        wasteGenerated: 0,
        wasteRecycledPercent: 0,
        wasteLandfilledPercent: 0,
        wasteIncineratedPercent: 0,
        hazardousWasteGenerated: 0,
        hazardousWasteProcedures: false,
      },
      Wastewater: {
        wastewaterGenerated: 0,
        wastewaterTreatedOnSite: false,
        wastewaterTreatedByThirdParty: false,
      },
    },

    Section4: {
      biodiversityContext: {
        nearProtectedAreas: false,
        biodiversityManagementPlan: false,
        biodiversityImpactLevel: "",
        ecosystemServicesAssessment: false,
        restorationActions: false,
      },
    },

    Section5: {
      Scope1: {
        scope1_naturalGas_m3: 0,
        scope1_diesel_l: 0,
        scope1_gasoline_l: 0,
        scope1_fuelOil_l: 0,
        scope1_propane_l: 0,
        scope1_coal_tonnes: 0,
        scope1_R410a_kg: 0,
        scope1_R134a_kg: 0,
        scope1_R404a_kg: 0,
        scope1_R407a_kg: 0,
        scope1_R507a_kg: 0,
        scope1_R123a_kg: 0,
        scope1_R32_kg: 0,
        scope1_cement_tonne: 0,
        scope1_lime_tonne: 0,
        scope1_steel_tonne: 0,
        scope1_alumininum_tonne: 0,
        scope1_ammonia_tonne: 0,
        scope1_glass_tonne: 0,
        scope1_direct_flare_tonne: 0,
        scope1_Wastewater_Methane_tonne: 0,
        scope1_WasteWater_nitous_oxide_tonne: 0,

      },
      Scope2: {
        scope2_electricityPurchased_kWh: 0,
        scope2_region: "",
        scope2_heat_kWh: 0,
        scope2_cooling_kWh: 0,
        scope2_renewableSharePercent: 0,
      },
      Scope3: {
        scope3_purchasedGoods_EUR: 0,
        scope3_capitalGoods_EUR: 0,
        scope3_upstreamTransport_tkm: 0,
        scope3_waste_landfill_kg: 0,
        scope3_waste_compost_kg: 0,
        scope3_waste_recycling_kg: 0,
        scope3_waste_Incineration_kg: 0,
        scope3_businessTravel_km: 0,
        scope3_employeeCommuting_km: 0,
        scope3_upstreamLeasedAssets_kWh: 0,
        scope3_downstreamTransport_tkm: 0,
        scope3_processingSoldProducts_tonnes: 0,
        scope3_downstreamLeasedAssets_kWh: 0,
        scope3_franchiseEnergy_kWh: 0,
        scope3_financedEmissions_tCO2e: 0,
      },
      AdditionalEmissions: {
        LastYearScope1: 0,
        LastYearScope2: 0,
        LastYearScope3: 0,
        activityDataQuality: "",
        emissionFactorQuality: "",
        verificationLevel: "",
      },
      ClimateRisk: {
        climateRiskAssessment: false,
        climateRiskLevel: "",
        scenarioAnalysis: false,
        adaptationPlan: false,
        physicalRisksConsidered: false,
        transitionRisksConsidered: false,
      },
    },

    Section6: {
      InvolenteryReasettlement: {
        requiresLandAcquisition: false,
        resettlementPlan: false,
        compensationAlignedWithLaw: false,
        resettlementConsultations: false,
      },
    },

    Section7: {
      IndigineousPeoples: {
        impactsIndigenousPeoples: false,
        fpicApplied: false,
      },
      VulnerableGroups: {
        vulnerableGroupsMeasures: false,
      },
      Gender: {
        genderActionPlan: false,
        percentWomenWorkforce: 0,
        percentWomenManagement: 0,
      },
      Policies: {
        nondiscriminationPolicy: false,
        antiHarassmentPolicy: false,
      },
    },

    Section8: {
      LabourRights: {
        collectiveBargargingCoveragePercent: 0,
        childLabourPolicy: false,
        forcedLabourPolicy: false,
      },
      OccupationalHealth: {
        ohsPolicy: false,
        lostTimeInjuryRate: 0,
        fatalities: 0,
        trainingHoursPerEmployee: 0,
      },
      WorkerGrievence: {
        workerGrievanceMechanism: false,
        workerResolutionRatePercent: 0,
      },
      SupplyChainLabour: {
        supplyChainRiskAssessment: false,
        suppliersScreenedPercent: 0,
        suppliersFollowESG: false,
      },
    },

    Section9: {
      Emergency: {
        ohsCertification: "",
        emergencyResponsePlan: false,
        emergencyDrillsPerYear: 0,
      },
      Security: {
        securityPersonnel: false,
        securityUseOfForcePolicy: false,
      },
      Incidents: {
        workplaceIncidents: 0,
        securityRiskAssessment: false,
      },
    },

    Section10: {
      culturalHeritage: {
        involvesCulturalHeritage: false,
        heritageImpactAssessed: false,
        chanceFindProcedure: false,
        culturalAuthoritiesConsulted: false,
        affectsIntangibleHeritage: false,
      },
    },
    Section11: {
      finance: {
        isFinancialInstitution: false,
        portfolioESGScreenedPercent: 0,
        portfolioHighClimateRiskPercent: 0,
        reportsFinancedEmissions: false,
        exclusionList: false,
      },
    },

    Section12: {
      Governance: {
        percentIndependentBoard: 0,
        esgBoardCommittee: false,
      },
      Policies: {
        antiCorruptionPolicy: false,
        whistleblowerMechanism: false,
        whistleblowerReports: 0,
      },
      CyberSecurity: {
        gdprCompliance: false,
        cybersecurityPolicy: false,
        cybersecurityIncidents: 0,
        dataBreachResponsePlan: false,
      },
    },
  });

  // CONDITIONAL FIELD LOGIC
  const conditionalRules = {
    Section1: {
      ImpactAssessments: {
        seaCompleted: { dependsOn: "requiresSEA", requiredValue: true },
      },
      HumanRightsDillagence: {
        hriaCompleted: { dependsOn: "hriaRequired", requiredValue: true },
      },
    },

    Section4: {
      biodiversityContext: {
        biodiversityImpactLevel: { dependsOn: "nearProtectedAreas", requiredValue: true },
        ecosystemServicesAssessment: { dependsOn: "nearProtectedAreas", requiredValue: true },
        restorationActions: { dependsOn: "nearProtectedAreas", requiredValue: true },
        biodiversityManagementPlan: { dependsOn: "nearProtectedAreas", requiredValue: true },
      },
    },

    Section9: {
      Security: {
        securityUseOfForcePolicy: {
          dependsOn: "securityPersonnel",
          requiredValue: true,
        },
      },
    },

    Section6: {
      InvolenteryReasettlement: {
        resettlementPlan: { dependsOn: "requiresLandAcquisition", requiredValue: true },
        compensationAlignedWithLaw: { dependsOn: "requiresLandAcquisition", requiredValue: true },
        resettlementConsultations: { dependsOn: "requiresLandAcquisition", requiredValue: true },
      },
    },
    Section7: {
      IndigineousPeoples: {
        fpicApplied: { dependsOn: "impactsIndigenousPeoples", requiredValue: true },
      },
    },
    Section10: {
      culturalHeritage: {
        heritageImpactAssessed: { dependsOn: "involvesCulturalHeritage", requiredValue: true },
        chanceFindProcedure: { dependsOn: "involvesCulturalHeritage", requiredValue: true },
        culturalAuthoritiesConsulted: { dependsOn: "involvesCulturalHeritage", requiredValue: true },
        affectsIntangibleHeritage: { dependsOn: "involvesCulturalHeritage", requiredValue: true },
      },
    },

    Section11: {
      finance: {
        portfolioESGScreenedPercent: { dependsOn: "isFinancialInstitution", requiredValue: true },
        portfolioHighClimateRiskPercent: { dependsOn: "isFinancialInstitution", requiredValue: true },
        reportsFinancedEmissions: { dependsOn: "isFinancialInstitution", requiredValue: true },
        exclusionList: { dependsOn: "isFinancialInstitution", requiredValue: true },
      },
    },
  };

  const dropdownOptions = {
    monitoringFrequency: ["None", "Annual", "Semi-annual", "Quarterly"],
    engagementCoverage: ["None", "Limited projects", "Most projects", "All projects"],
    biodiversityImpactLevel: ["None", "Low", "Medium", "High"],
    scope2_region: ["Canada", "USA", "EU", "Global Avg", "Custom"],
    activityDataQuality: ["A", "B", "C", "D", "E"],
    emissionFactorQuality: ["Tier 1", "Tier 2", "Tier 3"],
    verificationLevel: ["None", "Limited", "Reasonable"],
    climateRiskLevel: ["Low", "Medium", "High"],
    ohsCertification: ["None", "ISO 45001", "Other"],
  };
  const sectionLabels = {
  Section0: "Section 0: Company Information",
  Section1: "Section 1: Environmental & Social Risk Management",
  Section2: "Section 2: Stakeholder Engagement & Disclosure",
  Section3: "Section 3: Resource Efficiency & Pollution Prevention",
  Section4: "Section 4: Biodiversity & Ecosystems",
  Section5: "Section 5: Climate Change & Greenhouse Gas Emissions",
  Section6: "Section 6: Land Acquisition & Involuntary Resettlement",
  Section7: "Section 7: Indigenous Peoples, Gender & Vulnerable Groups",
  Section8: "Section 8: Labour & Working Conditions",
  Section9: "Section 9: Occupational Health, Safety & Security",
  Section10: "Section 10: Cultural Heritage",
  Section11: "Section 11: Financial Institutions & Financed Emissions",
  Section12: "Section 12: Governance, Ethics & Cybersecurity",
};

const subsectionLabels = {
  /* Section 0 */
  CompanyInformation: "Company Profile",

  /* Section 1 */
  ImpactAssessments: "Environmental & Social Impact Assessments",
  HumanRightsDillagence: "Human Rights Due Diligence",
  ManagementSystems: "Management Systems & Policies",
  ProjectScreening: "Project Screening",
  esgRisk: "ESG Risk Management",
  Monitoring: "Monitoring & Oversight",

  /* Section 2 */
  EngagmentPlanning: "Stakeholder Engagement Planning",
  GrievenceMechanism: "Grievance Mechanisms",
  Discloser: "Disclosure & Transparency",
  EngagmentCloser: "Engagement Coverage",

  /* Section 3 */
  EnergyResourceEfficentcy: "Energy & Resource Efficiency",
  CircularEconomy: "Circular Economy",
  AirEmissions: "Air Emissions",
  WasteManagement: "Waste Management",
  Wastewater: "Wastewater Management",

  /* Section 4 */
  biodiversityContext: "Biodiversity Context & Impacts",

  /* Section 5 */
  Scope1: "Scope 1: Direct Emissions",
  Scope2: "Scope 2: Indirect Energy Emissions",
  Scope3: "Scope 3: Value Chain Emissions",
  AdditionalEmissions: "Emissions Quality & Historical Data",
  ClimateRisk: "Climate Risk & Resilience",

  /* Section 6 */
  InvolenteryReasettlement: "Involuntary Resettlement",

  /* Section 7 */
  IndigineousPeoples: "Indigenous Peoples",
  VulnerableGroups: "Vulnerable Groups",
  Gender: "Gender Equality",
  Policies: "Social Policies",

  /* Section 8 */
  LabourRights: "Labour Rights",
  OccupationalHealth: "Occupational Health & Safety",
  WorkerGrievence: "Worker Grievance Mechanisms",
  SupplyChainLabour: "Supply Chain Labour Standards",

  /* Section 9 */
  Emergency: "Emergency Preparedness",
  Security: "Security Practices",
  Incidents: "Incidents & Risk Assessments",

  /* Section 10 */
  culturalHeritage: "Cultural Heritage",

  /* Section 11 */
  finance: "Financial Institution ESG Practices",

  /* Section 12 */
  Governance: "Corporate Governance",
  Policies: "Ethics & Anti-Corruption",
  CyberSecurity: "Cybersecurity & Data Protection",
};



  const fieldLabels = {
  /* ───────── SECTION 0: COMPANY INFORMATION ───────── */
  companyName: "What is the legal name of the company?",
  reportingDate: "What is the ESG reporting date?(yyyy-mm-dd)",
  industrialSector: "Which industrial sector does the company operate in?",
  country: "In which country is the company headquartered?",
  numberOfEmployees: "How many employees does the company have?",
  annualRevenue: "What is the company’s annual annual revenue (EUR)?",
  esgContactPerson: "Who is the primary ESG contact person?",
  esgContactEmail: "What is the ESG contact email address?",

  /* ───────── SECTION 1: MANAGEMENT & RISK ───────── */
  eiaConducted: "Has an Environmental Impact Assessment (EIA) been conducted?",
  socialImpactAssessment:
    "Has a Social Impact Assessment been conducted?",
  requiresSEA:
    "Does the project require a Strategic Environmental Assessment (SEA)?",
  seaCompleted:
    "If required, has the Strategic Environmental Assessment (SEA) been completed?",

  HumanRightsSCreaningConducted:
    "Has a human rights screening been conducted?",
  hriaRequired:
    "Was a Human Rights Impact Assessment (HRIA) required?",
  hriaCompleted:
    "If required, has the Human Rights Impact Assessment (HRIA) been completed?",

  esmsInPlace:
    "Is an Environmental and Social Management System (ESMS) in place?",
  esgPolicy:
    "Does the company have a formal ESG policy?",
  contractorsFollowESG:
    "Are contractors required to comply with ESG standards?",

  numProjectsWithEIA:
    "How many projects have undergone an Environmental Impact Assessment?",
  numProjectsRequiringEIA_NotCompleted:
    "How many projects required an EIA but have not completed one?",

  ComapnayMainatainesgRisk:
    "Does the company maintain an ESG risk register?",

  monitoringFrequency:
    "How frequently are ESG risks and impacts monitored?",

  /* ───────── SECTION 2: STAKEHOLDER ENGAGEMENT ───────── */
  stakeholderEngagementPlan:
    "Is there a formal stakeholder engagement plan in place?",
  numPublicMeetings:
    "How many public stakeholder meetings were conducted?",

  grievanceMechanism:
    "Is there a grievance mechanism available to external stakeholders?",
  grievancePublicAccess:
    "Is the grievance mechanism publicly accessible?",
  grievancesResolvedPercent:
    "What percentage of grievances were resolved?",

  projectInformationDisclosed:
    "Is project-related information publicly disclosed?",

  engagementCoverage:
    "What level of project coverage does stakeholder engagement achieve?",

  /* ───────── SECTION 3: ENVIRONMENT ───────── */
  totalEnergyConsumption:
    "What is the company’s total energy consumption (kWh)?",
  renewableEnergyShare:
    "What percentage of total energy comes from renewable sources?",
  hasEnergyEfficiencyProgram:
    "Does the company have an energy efficiency program in place?",

  efficiency_LED:
    "Has LED lighting been implemented?",
  efficiency_HVAC:
    "Have HVAC efficiency improvements been implemented?",
  efficiency_SmartMeters:
    "Are smart meters used for energy monitoring?",
  efficiency_Insulation:
    "Has building insulation been improved?",
  efficiency_HeatPumps:
    "Are heat pumps used to improve energy efficiency?",
  efficiency_ProcessOptimization:
    "Has process optimization been implemented to reduce energy use?",

  rawMaterialsUsed:
    "What is the total quantity of raw materials used?",
  recycledMaterialsPercent:
    "What percentage of raw materials are recycled?",
  productsDesignedForRecyclingPercent:
    "What percentage of products are designed for recycling?",
  circularEconomyStrategy:
    "Does the company have a circular economy strategy?",

  airEmissionControlsInstalled:
    "Are air emission control systems installed?",
  soxEmissions:
    "What are the SOx emissions (tonnes)?",
  noxEmissions:
    "What are the NOx emissions (tonnes)?",
  particulateEmissions:
    "What are the particulate matter emissions (tonnes)?",

  wasteGenerated:
    "What is the total amount of waste generated (kg)?",
  wasteRecycledPercent:
    "What percentage of waste is recycled?",
  wasteLandfilledPercent:
    "What percentage of waste is landfilled?",
  wasteIncineratedPercent:
    "What percentage of waste is incinerated?",
  hazardousWasteGenerated:
    "How much hazardous waste is generated (kg)?",
  hazardousWasteProcedures:
    "Are procedures in place for hazardous waste handling?",

  wastewaterGenerated:
    "What volume of wastewater is generated?",
  wastewaterTreatedOnSite:
    "Is wastewater treated on-site?",
  wastewaterTreatedByThirdParty:
    "Is wastewater treated by a third party?",

  /* ───────── SECTION 4: BIODIVERSITY ───────── */
  nearProtectedAreas:
    "Are operations located near protected or sensitive biodiversity areas?",
  biodiversityManagementPlan:
    "Is a biodiversity management plan in place?",
  biodiversityImpactLevel:
    "What is the level of biodiversity impact?",
  ecosystemServicesAssessment:
    "Has an ecosystem services assessment been conducted?",
  restorationActions:
    "Are biodiversity restoration actions implemented?",

  /* ───────── SECTION 5: CLIMATE & EMISSIONS ───────── */
  scope1_naturalGas_m3:
    "Natural gas consumption (m³)",
  scope1_diesel_l:
    "Diesel fuel consumption (litres)",
  scope1_gasoline_l:
    "Gasoline consumption (litres)",
  scope1_fuelOil_l:
    "Fuel oil consumption (litres)",
  scope1_propane_l:
    "Propane consumption (litres)",
  scope1_coal_tonnes:
    "Coal consumption (tonnes)",

  scope1_R410a_kg:"R410a leaked (kg)",

  scope1_R134a_kg:"R134a leaked (kg)",

  scope1_R404a_kg:"R404a leaked (kg)",

  scope1_R407a_kg:"R407a leaked (kg)",

  scope1_R507a_kg:"R507a leaked (kg)",

  scope1_R123a_kg:"R123a leaked (kg)",

  scope1_R32_kg:"R32 leaked (kg)",

  scope1_cement_tonne:"Cement Production (tonnes)",

  scope1_lime_tonne:"lime Production (tonnes)",

  scope1_steel_tonne:"steel Production (tonnes)",

  scope1_alumininum_tonne:"alumininum Production (tonnes)",

  scope1_ammonia_tonne:"ammonia Production (tonnes)",

  scope1_glass_tonne:"glass Production (tonnes)",

  scope1_direct_flare_tonne:"Direct Flare (Tonnes)",

  scope1_Wastewater_Methane_tonne:"Wastewater Methane production (tonnes)",

  scope1_WasteWater_nitous_oxide_tonne:"Wastewater Methane production (tonnes)",



  scope2_electricityPurchased_kWh:
    "Purchased electricity consumption (Scope 2, kWh)",
  scope2_region:
    "Which electricity grid region applies?",
  scope2_heat_kWh:
    "Purchased heat consumption (Scope 2, kWh)",
  scope2_cooling_kWh:
    "Purchased cooling consumption (Scope 2, kWh)",
  scope2_renewableSharePercent:
    "What percentage of Scope 2 energy is renewable?",

  scope3_businessTravel_km:
    "Total distance travelled for business travel (km)",
  scope3_employeeCommuting_km:
    "Total distance travelled by employees commuting (km)",
  scope3_upstreamTransport_tkm:
    "Upstream transport activity (tonne-km)",
  scope3_downstreamTransport_tkm:
    "Downstream transport activity (tonne-km)",
  scope3_financedEmissions_tCO2e:
    "Total financed emissions (tCO₂e)",



  scope3_processingSoldProducts_tonnes:"Processing of sold products (tonnes)",

  scope3_downstreamLeasedAssets_kWh:"Downstream leased assets (kWh)",

  scope3_franchiseEnergy_kWh:"Franchises energy use (kWh)",

  scope3_upstreamLeasedAssets_kWh:"Downstream transport (tonne-km)",

  scope3_purchasedGoods_EUR:"Purchased goods/services (EUR)",

  scope3_capitalGoods_EUR:"Capital goods (EUR)",

  scope3_waste_landfill_kg:"Landfill waste generated in operations (kg)",

  scope3_waste_compost_kg:"Compost waste generated in operations (kg)",

  scope3_waste_recycling_kg:"recycling waste generated in operations (kg)",

  scope3_waste_Incineration_kg:"Incineration waste generated in operations (kg)",

  LastYearScope1:"Last Year Scope 1",

  LastYearScope2:"Last Year Scope 2",

  LastYearScope3:"Last Year Scope 3",

  activityDataQuality:"Activity data quality score",

  emissionFactorQuality:"Emission factor quality rating",

  verificationLevel:"Verification level",

  climateRiskAssessmentYesNo:"Climate risk assessment conducted?",

  climateRiskLevel:"Climate risk level",

  scenarioAnalysis:"Climate scenario analysis conducted?",

  adaptationPlan:"Does a climate adaptation plan exist?",

  physicalRisksConsidered:"Physical climate risks considered in design?",

  transitionRisksConsidered:"Transition risks considered?",


  /* ───────── SECTION 6: RESETTLEMENT ───────── */
  requiresLandAcquisition:
    "Does the project require land acquisition?",
  resettlementPlan:
    "Is a resettlement plan in place?",
  compensationAlignedWithLaw:
    "Is compensation aligned with legal requirements?",
  resettlementConsultations:
    "Have resettlement consultations been conducted?",

  /* ───────── SECTION 7: SOCIAL ───────── */
  impactsIndigenousPeoples:
    "Does the project impact Indigenous Peoples?",
  fpicApplied:
    "Was Free, Prior and Informed Consent (FPIC) applied?",

  vulnerableGroupsMeasures:
    "Are measures in place to protect vulnerable groups?",

  genderActionPlan:
    "Is a gender action plan in place?",
  percentWomenWorkforce:
    "What percentage of the workforce are women?",
  percentWomenManagement:
    "What percentage of management positions are held by women?",

  nondiscriminationPolicy:
    "Is there a non-discrimination policy?",
  antiHarassmentPolicy:
    "Is there an anti-harassment policy?",

  /* ───────── SECTION 8: LABOUR ───────── */
  collectiveBargargingCoveragePercent:
    "What percentage of workers are covered by collective bargaining?",
  childLabourPolicy:
    "Is there a child labour policy?",
  forcedLabourPolicy:
    "Is there a forced labour policy?",

  ohsPolicy:
    "Is an occupational health and safety policy in place?",
  lostTimeInjuryRate:
    "What is the lost time injury rate?",
  fatalities:
    "How many workplace fatalities occurred?",
  trainingHoursPerEmployee:
    "How many training hours per employee were provided?",

  workerGrievanceMechanism:
    "Is there a worker grievance mechanism?",
  workerResolutionRatePercent:
    "What percentage of worker grievances were resolved?",

  supplyChainRiskAssessment:
    "Has a supply chain labour risk assessment been conducted?",
  suppliersScreenedPercent:
    "What percentage of suppliers have been screened?",
  suppliersFollowESG:
    "Are suppliers required to follow ESG standards?",

  /* ───────── SECTION 9: HEALTH & SAFETY ───────── */
  ohsCertification:
    "What occupational health and safety certification is held?",
  emergencyResponsePlan:
    "Is an emergency response plan in place?",
  emergencyDrillsPerYear:
    "How many emergency drills are conducted per year?",

  securityPersonnel:
    "Are security personnel employed?",
  securityUseOfForcePolicy:
    "Is there a policy governing the use of force by security personnel?",

  workplaceIncidents:
    "How many workplace incidents occurred?",
  securityRiskAssessment:
    "Has a security risk assessment been conducted?",

  /* ───────── SECTION 10: CULTURAL HERITAGE ───────── */
  involvesCulturalHeritage:
    "Does the project involve cultural heritage?",
  heritageImpactAssessed:
    "Has a cultural heritage impact assessment been conducted?",
  chanceFindProcedure:
    "Is a chance find procedure in place?",
  culturalAuthoritiesConsulted:
    "Have cultural authorities been consulted?",
  affectsIntangibleHeritage:
    "Does the project affect intangible cultural heritage?",

  /* ───────── SECTION 11: FINANCE ───────── */
  isFinancialInstitution:
    "Is the company a financial institution?",
  portfolioESGScreenedPercent:
    "What percentage of the portfolio is ESG-screened?",
  portfolioHighClimateRiskPercent:
    "What percentage of the portfolio is high climate risk?",
  reportsFinancedEmissions:
    "Does the institution report financed emissions?",
  exclusionList:
    "Is an ESG exclusion list applied?",

  /* ───────── SECTION 12: GOVERNANCE ───────── */
  percentIndependentBoard:
    "What percentage of board members are independent?",
  esgBoardCommittee:
    "Is there a dedicated ESG board committee?",

  antiCorruptionPolicy:
    "Is an anti-corruption policy in place?",
  whistleblowerMechanism:
    "Is there a whistleblower mechanism?",
  whistleblowerReports:
    "How many whistleblower reports were received?",

  gdprCompliance:
    "Is the company compliant with GDPR?",
  cybersecurityPolicy:
    "Is there a cybersecurity policy?",
  cybersecurityIncidents:
    "How many cybersecurity incidents occurred?",
  dataBreachResponsePlan:
    "Is a data breach response plan in place?",
};


  // UNIVERSAL FIELD RENDERER
const renderField = (section, subsection, field, value) => {
  const labelText = fieldLabels[field] || field;
  const type = typeof value;

  const rule = conditionalRules?.[section]?.[subsection]?.[field];
  if (rule) {
    const parentValue = formData[section][subsection][rule.dependsOn];
    if (parentValue !== rule.requiredValue) return null;
  }

  if (dropdownOptions[field]) {
    return (
      <label>
        {labelText}
        <select
          value={value}
          onChange={(e) =>
            handleChange(section, subsection, field, e.target.value)
          }
        >
          <option value="">-- Select --</option>
          {dropdownOptions[field].map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </label>
    );
  }

  if (type === "boolean") {
    return (
      <label>
        {labelText}
        <label style={{ marginLeft: "10px" }}>
          <input
            type="radio"
            checked={value === true}
            onChange={() => handleChange(section, subsection, field, true)}
          />
          Yes
        </label>
        <label style={{ marginLeft: "10px" }}>
          <input
            type="radio"
            checked={value === false}
            onChange={() => handleChange(section, subsection, field, false)}
          />
          No
        </label>
      </label>
    );
  }

  if (type === "number") {
    return (
      <label>
        {labelText}
        <input
          type="number"
          step="any"
          value={value}
          onChange={(e) =>
            handleChange(
              section,
              subsection,
              field,
              e.target.value === "" ? "" : parseFloat(e.target.value)
            )
          }
        />
      </label>
    );
  }

  return (
    <label>
      {labelText}
      <input
        type="text"
        value={value}
        onChange={(e) =>
          handleChange(section, subsection, field, e.target.value)
        }
      />
    </label>
  );
};


  // STATE UPDATER
  const handleChange = (section, subsection, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [subsection]: {
          ...prev[section][subsection],
          [field]: value,
        },
      },
    }));
  };

  // REPORTING DATE FIXED
  const handleDateChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      Section0: {
        ...prev.Section0,
        CompanyInformation: {
          ...prev.Section0.CompanyInformation,
          reportingDate: e.target.value,
        },
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/esg-score`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("ESG Data Submitted!");
    } catch (err) {
      console.error(err);
      alert("Failed to submit ESG data.");
    }
  };

  return (
    <div>
      <h2>ESG Questionnaire{companyName}</h2>

      <form onSubmit={handleSubmit}>
        <label>
          Reporting Date:
          <input
            type="date"
            value={formData.Section0.CompanyInformation.reportingDate}
            onChange={handleDateChange}
          />
        </label>

        {Object.entries(formData).map(([sectionKey, sectionValue]) => (
          <fieldset key={sectionKey} style={{ marginBottom: "1em" }}>
            <legend>{sectionLabels[sectionKey] || sectionKey}</legend>

            {Object.entries(sectionValue).map(([subKey, subValue]) => (
              <fieldset
                key={subKey}
                style={{
                  padding: "10px",
                  marginLeft: "20px",
                  borderLeft: "3px solid #ccc",
                }}
              >
                <legend>{subsectionLabels[subKey] || subKey}</legend>

                {Object.entries(subValue).map(([field, value]) => (
                  <div key={field} style={{ marginBottom: "6px" }}>
                    {renderField(sectionKey, subKey, field, value)}
                  </div>
                ))}
              </fieldset>
            ))}
          </fieldset>
        ))}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ESGForm;
