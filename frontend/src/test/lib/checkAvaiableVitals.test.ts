import { describe, it, expect } from "vitest";
import { checkAvailableVitals } from "../../utils/checkAvailableVitals";
import type { Vital } from "../../types/Vital";

const baseVital = {
    userId: 1,
    value: 1,
    unit: "unit",
    riskScore: "low",
    details: "",
    createdAt: new Date(),
};

describe("checkAvailableVitals", () => {
    it("returns all vitals when input is undefined", () => {
        const result = checkAvailableVitals(undefined);

        expect(result).toEqual([
            "Heart Rate",
            "Respiratory Rate",
            "BloodPressure - Diastolic",
            "BloodPressure - Systolic",
            "Temperature",
            "Height",
            "Weight",
            "Note",
        ]);
    });

    it("filters out existing vitals", () => {
        const vitals: Vital[] = [
            {
                id: 1,
                type: "Heart Rate",
                ...baseVital,
            },
            {
                id: 2,
                type: "Temperature",
                ...baseVital,
            },
        ];

        const result = checkAvailableVitals(vitals);

        expect(result).not.toContain("Heart Rate");
        expect(result).not.toContain("Temperature");
        expect(result).toContain("Weight");
    });

    it("returns empty array when all vitals exist", () => {
        const allVitals: Vital["type"][] = [
            "Heart Rate",
            "Respiratory Rate",
            "BloodPressure - Diastolic",
            "BloodPressure - Systolic",
            "Temperature",
            "Height",
            "Weight",
            "Note",
        ];

        const vitals: Vital[] = allVitals.map((type, index) => ({
            id: index,
            type,
            ...baseVital,
        }));

        const result = checkAvailableVitals(vitals);

        expect(result).toEqual([]);
    });
});
