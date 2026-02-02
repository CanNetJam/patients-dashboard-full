import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import type React from "react";

import { usePatientForm } from "../../hooks/usePatientForm";
import { patientService } from "../../services/patientService";

// Mock the patient service
vi.mock("../../services/patientService", () => ({
    patientService: {
        addPatient: vi.fn(),
    },
}));

// Mock useNavigate
const mockedNavigate = vi.fn();
vi.mock("react-router", () => ({
    useNavigate: () => mockedNavigate,
}));

// Helper: mock form event
const mockFormEvent = () =>
({
    preventDefault: vi.fn(),
} as unknown as React.FormEvent<HTMLFormElement>);

describe("usePatientForm", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("initializes with default state", () => {
        const { result } = renderHook(() => usePatientForm());

        expect(result.current.patientData).toEqual({
            name: "",
            dateOfBirth: null,
            age: undefined,
            sex: undefined,
        });
        expect(result.current.isLoading).toBe(false);
    });

    it("updates patientData when handleChange is called", () => {
        const { result } = renderHook(() => usePatientForm());

        act(() => {
            result.current.handleChange("name", "John Doe");
            result.current.handleChange("age", 30);
        });

        expect(result.current.patientData.name).toBe("John Doe");
        expect(result.current.patientData.age).toBe(30);
    });

    it("submits patient data successfully and resets form", async () => {
        vi.mocked(patientService.addPatient).mockResolvedValue({
            id: 1,
            name: "John Doe",
            dateOfBirth: new Date(),
            age: 30,
            sex: 'male',
            vitals: [],
            createdAt: new Date()
        });

        const { result } = renderHook(() => usePatientForm());

        act(() => {
            result.current.handleChange("name", "Jane Doe");
            result.current.handleChange("age", 25);
            result.current.handleChange("sex", "F");
        });

        await act(async () => {
            await result.current.handleSubmit(mockFormEvent());
        });

        expect(patientService.addPatient).toHaveBeenCalledWith(
            expect.objectContaining({
                name: "Jane Doe",
                age: 25,
                sex: "F",
            })
        );

        expect(result.current.patientData).toEqual({
            name: "",
            dateOfBirth: null,
            age: undefined,
            sex: undefined,
        });

        expect(result.current.isLoading).toBe(false);
        expect(mockedNavigate).toHaveBeenCalledWith("/dashboard");
    });

    it("handles service errors and shows alert", async () => {
        const alertSpy = vi.spyOn(window, "alert").mockImplementation(() => { });
        vi.mocked(patientService.addPatient).mockRejectedValue(new Error("Network error"));

        const { result } = renderHook(() => usePatientForm());

        await act(async () => {
            await result.current.handleSubmit(mockFormEvent());
        });

        expect(alertSpy).toHaveBeenCalledWith("Network error");
        expect(result.current.isLoading).toBe(false);
        expect(mockedNavigate).toHaveBeenCalledWith("/dashboard");

        alertSpy.mockRestore();
    });

    it("handleCancel resets form and navigates", () => {
        const { result } = renderHook(() => usePatientForm());

        act(() => {
            result.current.handleChange("name", "Test");
        });

        act(() => {
            result.current.handleCancel();
        });

        expect(result.current.patientData).toEqual({
            name: "",
            dateOfBirth: null,
            age: undefined,
            sex: undefined,
        });

        expect(mockedNavigate).toHaveBeenCalledWith("/dashboard");
    });
});
