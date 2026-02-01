import { vitals } from "../data/vital.store";
import { Vital } from "../models/vital.model";

export const VitalService = {
    getAll(): Vital[] {
        return vitals;
    },

    getById(id: number): Vital[] {
        return vitals.filter(u => u.userId === id);
    },

    create(
        userId: number,
        type: "Heart Rate" | "Respiratory Rate" | "BloodPressure - Diastolic" | "BloodPressure - Systolic" | "Temperature" | "Height" | "Weight" | "Note",
        value: number,
        unit: string,
        //riskScore: string,
        details: string,
    ): Vital {
        let lastId = vitals.length > 0 ? vitals[vitals.length - 1].id : 0;

        const user: Vital = {
            id: lastId + 1,
            userId,
            type,
            value,
            unit,
            //riskScore,
            details,
            createdAt: new Date(Date.now())
        };

        vitals.push(user);
        return user;
    }
}