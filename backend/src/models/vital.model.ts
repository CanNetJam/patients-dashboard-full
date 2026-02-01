export interface Vital {
    id: number;
    userId: number;
    type: "Heart Rate" | "Respiratory Rate" | "BloodPressure - Diastolic" | "BloodPressure - Systolic" | "Temperature" | "Height" | "Weight" | "Note";
    value: number;
    unit: string;
    //riskScore: string;
    details: string;
    createdAt: Date | string;
}