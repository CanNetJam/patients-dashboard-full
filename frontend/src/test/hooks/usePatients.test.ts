import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";

import { usePatients } from "../../hooks/usePatients";
import { patientService } from "../../services/patientService";
import { getCache, setCache } from "../../utils/localStorageCache";
import type { Patient } from "../../types/Patient";

// ------------------------------
// Mock modules
// ------------------------------
vi.mock("../../services/patientService", () => ({
    patientService: {
        getPatients: vi.fn(),
    },
}));

vi.mock("../../utils/localStorageCache", () => ({
    getCache: vi.fn(),
    setCache: vi.fn(),
}));

// ------------------------------
// Tests
// ------------------------------
describe("usePatients", () => {
    const mockedGetPatients = vi.mocked(patientService.getPatients);
    const mockedGetCache = vi.mocked(getCache);
    const mockedSetCache = vi.mocked(setCache);

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("loads patients from API if cache is empty", async () => {
        const patientsData: Patient[] = [
            { id: 1, name: "John Doe", dateOfBirth: "2000-01-01", age: 22, sex: "male", vitals: [], createdAt: "2026-01-01" },
            { id: 2, name: "Jane Doe", dateOfBirth: "1990-01-01", age: 36, sex: "female", vitals: [], createdAt: "2026-01-01" },
        ];

        mockedGetCache.mockReturnValue(null);
        mockedGetPatients.mockResolvedValue(patientsData);

        const { result } = renderHook(() => usePatients());

        await act(async () => {
            await waitFor(() => result.current.isLoading === false);
        });
        
        expect(mockedGetCache).toHaveBeenCalled();
        expect(mockedGetPatients).toHaveBeenCalled();
        expect(mockedSetCache).toHaveBeenCalledWith("patients_cache", patientsData, 60000);

        expect(result.current.patients).toEqual(patientsData);
        expect(result.current.error).toBeNull();
        expect(result.current.isLoading).toBe(false);
    });

    it("loads patients from cache if available", async () => {
        const cachedData = [
            { id: 3, name: "Cached Patient", dateOfBirth: "1980-01-01", age: 46, sex: "male", vitals: [], createdAt: "2026-01-01" },
        ];

        mockedGetCache.mockReturnValue(cachedData);

        const { result } = renderHook(() => usePatients());

        await act(async () => {
            await waitFor(() => expect(result.current.isLoading).toBe(false));
        });

        expect(mockedGetCache).toHaveBeenCalled();
        expect(mockedGetPatients).not.toHaveBeenCalled();
        expect(mockedSetCache).not.toHaveBeenCalled();

        expect(result.current.patients).toEqual(cachedData);
        expect(result.current.error).toBeNull();
        expect(result.current.isLoading).toBe(false);
    });

    it("handles API errors gracefully", async () => {
        mockedGetCache.mockReturnValue(null);
        mockedGetPatients.mockRejectedValue(new Error("Network error"));

        const { result } = renderHook(() => usePatients());

        await act(async () => {
            await waitFor(() => result.current.isLoading === false);
        });        

        expect(result.current.patients).toBeUndefined();
        expect(result.current.error).toBe("Network error");
        expect(result.current.isLoading).toBe(false);
    });
});
