import type { Vital } from "./Vital";

export interface Patient {
    id: number;
    name?: string;
    dateOfBirth?: Date | string;
    age?: number;
    sex?: 'male' | 'female';
    vitals?: Vital[];
    createdAt: Date | string;
}

export interface PatientFormEntry {
    name: string;
    dateOfBirth: Date | null;
    age?: number;
    sex?: 'male' | 'female';
}