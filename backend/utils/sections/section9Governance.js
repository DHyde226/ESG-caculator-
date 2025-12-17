const clamp = require("../clamp");
module.exports = function scoreSection9(section){
    const { Emergency, Security, Incidents } = section;
    let score = 0;

    if(Emergency.ohsCertification && Emergency.ohsCertification !== "None"){
        score += 15;
    }

    if (Emergency.emergencyResponsePlan){
        score += 15;
    }

    if(Emergency.emergencyDrillsPerYear >= 2){
        score += 10;
    } else if (Emergency.emergencyDrillsPerYear == 1){
        score += 5;
    }

    if (Incidents.SecurityRiskAssessment){
        score+=15;
    }
    if(Security.SecurityPersonnel){
        if(Security.SecurityUseOfForcePolicy){
            score += 15;
        }else {
            score += 15;
        }
    }

    const incidents = Incidents.workplaceIncidents;

    if(incidents == 0) score += 30;
    else if (incidents <= 2) score += 20;
    else if (incidents <= 5) score += 10;
    else score += 0;

    return {
        score: clamp(score),
        maxScore: 100,
        breakdown: {
            emergencyPreparedness: {
                ohsCertification: Emergency.ohsCertification,
                emergencyResponsePlan: Emergency.emergencyResponsePlan,
                emergencyDrillsPerYear: Emergency.emergencyDrillsPerYear,

            },
            Security: {
                SecurityPersonnel: Security.SecurityPersonnel,
                useOfForcePolicy: Security.SecurityUseOfForcePolicy,
                SecurityRiskAssessment: Incidents.SecurityRiskAssessment,
            },
            incidents: Incidents.workplaceIncidents,
        },
    };
};