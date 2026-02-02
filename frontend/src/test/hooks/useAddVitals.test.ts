import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import type React from "react";

import { useAddVitals } from "../../hooks/useAddVitals";
import { vitalService } from "../../services/vitalService";

// Mock the vital service
vi.mock("../../services/vitalService", () => ({
    vitalService: {
        addVital: vi.fn(),
    },
}));

// Helper: mock form submit event
const mockFormEvent = () =>
({
    preventDefault: vi.fn(),
} as unknown as React.FormEvent<HTMLFormElement>);

describe("useAddVitals", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("initializes with correct default state", () => {
        const setRefresh = vi.fn();

        const { result } = renderHook(() =>
            useAddVitals(false, setRefresh)
        );

        expect(result.current.isAddingVitals).toBe(false);
        expect(result.current.isVitalLoading).toBe(false);
        expect(result.current.vitalData).toEqual({
            userId: undefined,
            type: undefined,
            value: undefined,
            unit: "",
            details: "",
        });
    });

    it("updates vitalData when handleChange is called", () => {
        const setRefresh = vi.fn();

        const { result } = renderHook(() =>
            useAddVitals(false, setRefresh)
        );

        act(() => {
            result.current.handleChange("unit", "bpm");
            result.current.handleChange("value", 80);
        });

        expect(result.current.vitalData.unit).toBe("bpm");
        expect(result.current.vitalData.value).toBe(80);
    });

    it("submits vital data successfully and resets form", async () => {
        const setRefresh = vi.fn();

        vi.mocked(vitalService.addVital).mockResolvedValue({
            id: 1,
            userId: 0,
            type: "Heart Rate",
            value: 120,
            unit: "bpm",
            riskScore: "Normal",
            details: "",
            createdAt: new Date()
        });

        const { result } = renderHook(() =>
            useAddVitals(false, setRefresh)
        );

        // Fill in form
        act(() => {
            result.current.handleChange("userId", 1);
            result.current.handleChange("type", "Heart Rate");
            result.current.handleChange("value", 72);
            result.current.handleChange("unit", "bpm");
            result.current.handleChange("details", "resting");
        });

        await act(async () => {
            await result.current.handleSubmit(mockFormEvent());
        });

        expect(vitalService.addVital).toHaveBeenCalledWith(
            expect.objectContaining({
                userId: 1,
                type: "Heart Rate",
                value: 72,
                unit: "bpm",
                details: "resting",
            })
        );

        expect(result.current.vitalData).toEqual({
            userId: undefined,
            type: undefined,
            value: undefined,
            unit: "",
            details: "",
        });

        expect(result.current.isVitalLoading).toBe(false);
        expect(setRefresh).toHaveBeenCalledWith(true);
    });

    it("handles service errors and still resets loading state", async () => {
        const setRefresh = vi.fn();
        const alertSpy = vi
            .spyOn(window, "alert")
            .mockImplementation(() => { });

        vi.mocked(vitalService.addVital).mockRejectedValue(
            new Error("Network error")
        );

        const { result } = renderHook(() =>
            useAddVitals(false, setRefresh)
        );

        await act(async () => {
            await result.current.handleSubmit(mockFormEvent());
        });

        expect(alertSpy).toHaveBeenCalledWith("Network error");
        expect(result.current.isVitalLoading).toBe(false);
        expect(setRefresh).toHaveBeenCalled();

        alertSpy.mockRestore();
    });
});
