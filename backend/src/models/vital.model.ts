export interface Vital {
    id: number;
    userId: number;
    heartRate: number;
    bloodPressure: number;
    temperature: number;
    notes: string;
    createdAt: Date | string;
}
