import { vitals } from "../data/vital.store";
import { Vital } from "../models/vital.model";
import { checkLastId } from "../utils/last-id-checker";

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
        let lastId = checkLastId(vitals);

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