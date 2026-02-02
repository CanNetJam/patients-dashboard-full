import { describe, it, expect } from "vitest";
import { getVitalColor } from "../../utils/vitalColor";
import type { Vital } from "../../types/Vital";

describe("getVitalColor", () => {
    it("returns correct color for each vital type", () => {
        const cases: Array<[Vital["type"], string]> = [
            ["Heart Rate", "bg-pink-100"],
            ["Respiratory Rate", "bg-blue-100"],
            ["BloodPressure - Diastolic", "bg-purple-100"],
            ["BloodPressure - Systolic", "bg-fuchsia-200"],
            ["Temperature", "bg-red-100"],
            ["Height", "bg-green-100"],
            ["Weight", "bg-yellow-100"],
            ["Note", "bg-gray-100"],
        ];

        cases.forEach(([type, expectedColor]) => {
            expect(getVitalColor(type)).toBe(expectedColor);
        });
    });
});
