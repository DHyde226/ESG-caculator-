const clamp = require("../clamp");

module.exports=function scoreSection10(section){
    const heritage = section.culturalHeritage;

    if(!heritage.involvesCulturalHeritage){
        return {
            score: 100,
            maxScore: 100,
            notApplicable: true,
            breakdown: {
                reason: "No cultural heritage affected",
            },
        };
    }
    let score = 0;

    if(heritage.heritageImpactAssessed) score += 30;
    if(heritage.chanceFindProcedure)score += 25;
    if(heritage.culturalAuthoritiesConsulted)score += 25;
    if(heritage.affectsIntangibleHeritage == false)score += 20;

    return{
        score: clamp(score),
        maxScore: 100,
        breakdown: {
            heritageImpactAssessed: heritage.heritageImpactAssessed,
            chanceFindProcedure: heritage.chanceFindProcedure,
            authoritiesConsulted: heritage.culturalAuthoritiesConsulted,
            intangibleHeritageProtected: !heritage.affectsIntangibleHeritage,
        },
    };


};