import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import type React from "react";

import { usePatientDetails } from "../../hooks/usePatientDetails";
import { patientService } from "../../services/patientService";
import { vitalService } from "../../services/vitalService";
import { checkAvailableVitals } from "../../utils/checkAvailableVitals";
import { useParams } from "react-router";
import type { Patient } from "../../types/Patient";
import type { Vital } from "../../types/Vital";


vi.mock("../../services/patientService", () => ({
    patientService: {
        getPatientById: vi.fn(),
    },
}));

vi.mock("../../services/vitalService", () => ({
    vitalService: {
        getVitalsById: vi.fn(),
    },
}));

vi.mock("../../utils/checkAvailableVitals", () => ({
    checkAvailableVitals: vi.fn(),
}));

vi.mock("react-router", () => ({
    useParams: vi.fn(),
}));

describe("usePatientDetails", () => {
    const mockedGetPatientById = vi.mocked(patientService.getPatientById);
    const mockedGetVitalsById = vi.mocked(vitalService.getVitalsById);
    const mockedCheckAvailableVitals = vi.mocked(checkAvailableVitals);
    const mockedUseParams = vi.mocked(useParams);

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("initializes with loading state", () => {
        mockedUseParams.mockReturnValue({ patientId: "1" });

        mockedGetPatientById.mockImplementation(() => new Promise(() => {}));
        mockedGetVitalsById.mockImplementation(() => new Promise(() => {}));

        const { result } = renderHook(() => usePatientDetails());

        expect(result.current.patient).toBeUndefined();
        expect(result.current.isLoading).toBe(true);
        expect(result.current.error).toBeNull();
    });

    it("fetches patient and vitals successfully", async () => {
        mockedUseParams.mockReturnValue({ patientId: "1" });

        const patientData: Patient = {
            id: 1,
            name: "John Doe",
            dateOfBirth: "2000-01-01",
            age: 22,
            sex: "male",
            vitals: [],
            createdAt: "2026-01-01",
        };

        const vitalsData: Vital[] = [
            { 
                id: 1, 
                userId: 1,
                type: "Heart Rate", 
                value: 80, 
                unit: "bpm", 
                riskScore: "Normal", 
                details: "", 
                createdAt: new Date() 
            }
        ];

        mockedGetPatientById.mockResolvedValue(patientData);
        mockedGetVitalsById.mockResolvedValue(vitalsData);
        mockedCheckAvailableVitals.mockReturnValue(["Temperature", "Weight"]);

        const { result } = renderHook(() => usePatientDetails());

        // wait for async effects
        await waitFor(() => expect(result.current.isLoading).toBe(false));

        expect(mockedGetPatientById).toHaveBeenCalledWith("1");
        expect(mockedGetVitalsById).toHaveBeenCalledWith("1");
        expect(result.current.patient).toEqual(
            expect.objectContaining({
                id: 1,
                name: "John Doe",
                vitals: vitalsData,
            })
        );
        expect(mockedCheckAvailableVitals).toHaveBeenCalledWith(vitalsData);
        expect(result.current.availableVitals).toEqual(["Temperature", "Weight"]);
    });

    it("handles error during fetch", async () => {
        mockedUseParams.mockReturnValue({ patientId: "1" });

        mockedGetPatientById.mockRejectedValue(new Error("Network error"));

        const { result } = renderHook(() => usePatientDetails());

        await waitFor(() => expect(result.current.isLoading).toBe(false));

        expect(result.current.error).toBe("Network error");
        expect(result.current.patient).toBeUndefined();
    });

    it("computes availableVitals as empty array if no vitals", async () => {
        mockedUseParams.mockReturnValue({ patientId: "1" });

        const patientData: Patient = {
            id: 2,
            name: "Jane Doe",
            dateOfBirth: "1990-01-01",
            age: 36,
            sex: "female",
            createdAt: "2026-01-01",
        };

        mockedGetPatientById.mockResolvedValue(patientData);
        mockedGetVitalsById.mockResolvedValue([]);
        mockedCheckAvailableVitals.mockReturnValue([
            "Heart Rate",
            "Respiratory Rate",
            "BloodPressure - Diastolic",
            "BloodPressure - Systolic",
            "Temperature",
            "Height",
            "Weight",
            "Note",
        ]);

        const { result } = renderHook(() => usePatientDetails());

        await waitFor(() => expect(result.current.isLoading).toBe(false));

        expect(result.current.availableVitals.length).toBe(8);
    });
});
