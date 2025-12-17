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

  // UNIVERSAL FIELD RENDERER
  const renderField = (section, subsection, field, value) => {
    const type = typeof value;

    // CONDITIONAL VISIBILITY
    const rule = conditionalRules?.[section]?.[subsection]?.[field];
    if (rule) {
      const parentValue = formData[section][subsection][rule.dependsOn];
      if (parentValue !== rule.requiredValue) return null;
    }

    // DROPDOWNS
    if (dropdownOptions[field]) {
      return (
        <label>
          {field}:{" "}
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

    // BOOLEAN CHECKBOX
    if (type === "boolean") {
      return (
        <label>
          {field}:{" "}
          <label style={{ marginRight: "10px" }}>
            <input
              type="checkbox"
              checked={value === true}
              onChange={() => handleChange(section, subsection, field, true)}
            />
            Yes
          </label>
          <label>
            <input
              type="checkbox"
              checked={value === false}
              onChange={() => handleChange(section, subsection, field, false)}
            />
            No
          </label>
        </label>
      );
    }

    // NUMBER
    if (type === "number") {
      return (
        <label>
          {field}:{" "}
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

    // TEXT
    return (
      <label>
        {field}:{" "}
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
      <h2>Submit ESG Data for {companyName}</h2>

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
            <legend>{sectionKey}</legend>

            {Object.entries(sectionValue).map(([subKey, subValue]) => (
              <fieldset
                key={subKey}
                style={{
                  padding: "10px",
                  marginLeft: "20px",
                  borderLeft: "3px solid #ccc",
                }}
              >
                <legend>{subKey}</legend>

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
