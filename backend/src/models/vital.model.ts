export interface Vital {
    id: number;
    userId: number;
    type: "Heart Rate" | "Respiratory Rate" | "BloodPressure - Diastolic" | "BloodPressure - Systolic" | "Temperature" | "Height" | "Weight" | "Note";
    value: number;
    unit: string;
    riskScore: "Normal" | "At-risk" | "Critical" | "Not applicable";
    details: string;
    createdAt: Date | string;
}