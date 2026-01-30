import { vitals } from "../data/vital.store";
import { Vital } from "../models/vital.model";

export const VitalService = {
    getAll(): Vital[] {
        return vitals;
    },

    getById(id: number): Vital | undefined {
        return vitals.find(u => u.userId === id);
    },

    create(
        userId: number,
        heartRate: number,
        bloodPressure: number,
        temperature: number,
        notes: string
    ): Vital {
        let lastId = vitals.length > 0 ? vitals[vitals.length - 1].id : 0;

        const user: Vital = {
            id: lastId + 1,
            userId,
            heartRate,
            bloodPressure,
            temperature,
            notes,
            createdAt: new Date(Date.now())
        };

        vitals.push(user);
        return user;
    }
}