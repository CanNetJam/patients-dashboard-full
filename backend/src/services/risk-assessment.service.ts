// Risk assessment computation: AgeRisk + VitalRisk
// AgeRisk = as we grow older there is higher chance of illness making older age score higher
// VitalRisk = normal rates are scored 0, while lower & higher rates gradually increase in risk score
// Risk level legend:
//      Normal = 0 ~ 0.9
//      At-risk = 1 ~ 1.9
//      Critical = > 2

import { Vital } from "../models/vital.model";

interface RiskAssessment {
    score: number;
    level: "Normal" | "At-risk" | "Critical" | "Not applicable";
}

function getAgeModifier(age: number): number {
    if (age >= 75) return 1.5;
    if (age >= 60) return 1;
    if (age >= 40) return 0.5;
    return 0;
}

export const RiskAssessmentService = {
    computeRisk(age: number, type: Vital["type"], rate: number): RiskAssessment {
        const ageModifier = getAgeModifier(age);
        let baseScore = 0;

        // Early return for invalid types
        if (type === "Height" || type === "Weight" || type === "Note") {
            return {
                score: 0,
                level: "Not applicable"
            };
        }

        // Different vitals have their own range
        if (type === "Heart Rate") {
            if (rate < 40 || rate > 120) baseScore = 2;
            else if (rate < 60 || rate > 100) baseScore = 1;
        }
        if (type === "BloodPressure - Diastolic") {
            if (rate < 90) baseScore = 2;
            else if (rate < 85) baseScore = 1;
        }
        if (type === "BloodPressure - Systolic") {
            if (rate < 130) baseScore = 2;
            else if (rate < 125) baseScore = 1;
        }
        if (type === "Respiratory Rate") {
            if (rate < 10 || rate > 22) baseScore = 2;
            else if (rate < 12 || rate > 20) baseScore = 1;
        }
        if (type === "Temperature") {
            if (rate < 35 || rate > 38.8) baseScore = 2;
            else if (rate < 36.5 || rate > 37.3) baseScore = 1;
        }

        const finalScore = baseScore + ageModifier;
        const level: RiskAssessment["level"] =
            finalScore >= 2 ? "Critical" :
                finalScore >= 1 ? "At-risk" :
                    "Normal";

        return {
            score: finalScore,
            level
        };
    }
}