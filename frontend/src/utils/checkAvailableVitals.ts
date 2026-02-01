import type { Vital } from "../types/Vital";

// To avoid duplicate entries, we check existing patient vitals
export const checkAvailableVitals = (vitals: Vital[] | undefined): string[] => {
    const allVitals: string[] = [
        "Heart Rate",
        "Respiratory Rate",
        "BloodPressure - Diastolic",
        "BloodPressure - Systolic",
        "Temperature",
        "Height",
        "Weight",
        "Note"
    ];

    if (vitals === undefined) return allVitals;

    const patientVitalRef = new Map(vitals.map(vital => [vital.type as string, null]));

    let avaiableVitals: string[] = [];
    for (const vital of allVitals) {
        if (!patientVitalRef.has(vital)) avaiableVitals.push(vital)
    }

    return avaiableVitals;
};