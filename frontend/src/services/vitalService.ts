import type { API } from "../types/Common";
import type { Vital, VitalFormEntry } from "../types/Vital";

export const vitalService = {
    async getVitals(): Promise<Vital[]> {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API_BASE_URL}/vitals`);

        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }

        const data: API<Vital[]> = await response.json();

        return data.data || [];
    },

    async addVital(payload: VitalFormEntry): Promise<Vital> {
        const response = await fetch(
            `${import.meta.env.VITE_BACKEND_API_BASE_URL}/vitals`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            }
        );

        if (!response.ok) {
            throw new Error("Failed to add patient vitals");
        }

        const data: API<Vital> = await response.json();

        return data.data;
    },

    async getVitalsById(id: string): Promise<Vital[]> {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API_BASE_URL}/vitals/${id}`);

        if (!response.ok) {
            throw new Error('Failed to fetch the vitals of user');
        }

        const data: API<Vital[]> = await response.json();

        return data.data || [];
    },
}