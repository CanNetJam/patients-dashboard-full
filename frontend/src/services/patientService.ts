import type { API } from "../types/Common";
import type { Patient, PatientFormEntry } from "../types/Patient";

export const patientService = {
    async getPatients(): Promise<Patient[]> {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API_BASE_URL}/users`);

        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }

        const data: API<Patient[]> = await response.json();

        return data.data || [];
    },

    async addPatient(payload: PatientFormEntry): Promise<Patient> {
        const response = await fetch(
            `${import.meta.env.VITE_BACKEND_API_BASE_URL}/users`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            }
        );

        if (!response.ok) {
            throw new Error("Failed to add patient");
        }

        const data: API<Patient> = await response.json();

        return data.data;
    },

    async getPatientById(id: string): Promise<Patient> {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API_BASE_URL}/users/${id}`);

        if (!response.ok) {
            throw new Error('Failed to fetch the user');
        }

        const data: API<Patient> = await response.json();

        return data.data;
    },
};