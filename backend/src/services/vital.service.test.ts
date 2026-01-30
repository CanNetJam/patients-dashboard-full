import { VitalService } from "./vital.service";
import { vitals } from "../data/vital.store";
import { Vital } from "../models/vital.model";

describe("VitalService", () => {
    beforeEach(() => {
        // Reset the vitals array and nextId before each test
        vitals.length = 0;
        vitals.push(
            { id: 1, userId: 1, heartRate: 70, bloodPressure: 120, temperature: 36.5, notes: "Healthy", createdAt: new Date() },
            { id: 2, userId: 2, heartRate: 80, bloodPressure: 130, temperature: 37.0, notes: "Normal", createdAt: new Date() }
        );
    });

    it("should return all vitals", () => {
        const result = VitalService.getAll();
        expect(result).toHaveLength(2);
        expect(result).toEqual(vitals);
    });

    it("should return a vital by userId", () => {
        const result = VitalService.getById(1);
        expect(result).toBeDefined();
        expect(result?.userId).toBe(1);
        expect(result?.heartRate).toBe(70);
    });

    it("should return undefined for a non-existent userId", () => {
        const result = VitalService.getById(999);
        expect(result).toBeUndefined();
    });

    it("should create a new vital", () => {
        const newVital: Omit<Vital, "id" | "createdAt"> = {
            userId: 3,
            heartRate: 90,
            bloodPressure: 110,
            temperature: 36.8,
            notes: "Good condition"
        };

        const createdVital = VitalService.create(
            newVital.userId,
            newVital.heartRate,
            newVital.bloodPressure,
            newVital.temperature,
            newVital.notes
        );

        expect(createdVital).toBeDefined();
        expect(createdVital.id).toBe(3); 
        expect(createdVital.userId).toBe(newVital.userId);
        expect(createdVital.heartRate).toBe(newVital.heartRate);
        expect(createdVital.bloodPressure).toBe(newVital.bloodPressure);
        expect(createdVital.temperature).toBe(newVital.temperature);
        expect(createdVital.notes).toBe(newVital.notes);
        expect(createdVital.createdAt).toBeInstanceOf(Date);

        // Ensure the new vital is added to the vitals array
        expect(vitals).toHaveLength(3);
        expect(vitals).toContainEqual(createdVital);
    });
});