import { users } from "../data/user.store";
import { vitals } from "../data/vital.store";
import { Vital } from "../models/vital.model";
import { RiskAssessmentService } from "./risk-assessment.service";

export const VitalService = {
    getAll(): Vital[] {
        return vitals;
    },

    getById(id: number): Vital[] {
        return vitals
            .filter(v => v.userId === id)
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    },

    create(
        userId: number,
        type: "Heart Rate" | "Respiratory Rate" | "BloodPressure - Diastolic" | "BloodPressure - Systolic" | "Temperature" | "Height" | "Weight" | "Note",
        value: number,
        unit: string,
        details?: string, // Make details optional
    ): Vital {
        let lastId = vitals.length > 0 ? vitals[vitals.length - 1].id : 0;
        const patient = users.find(u => u.id === userId);

        if (!patient) throw new Error("Patient not found");

        const riskAssessment = RiskAssessmentService.computeRisk(patient.age, type, value);
        const riskScore = riskAssessment.level;

        const vital: Vital = {
            id: lastId + 1,
            userId,
            type,
            value,
            unit,
            riskScore,
            details: details || "", // Provide default empty string if details not provided
            createdAt: new Date(Date.now())
        };

        vitals.push(vital);
        return vital;
    }
}