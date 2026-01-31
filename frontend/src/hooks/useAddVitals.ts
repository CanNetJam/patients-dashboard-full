import { useState, type FormEvent } from "react";
import type { VitalFormEntry } from "../types/Vital";
import { vitalService } from "../services/vitalService";

export const useAddVitals = () => {
    const [vitalData, setVitalData] = useState<VitalFormEntry>({
        userId: undefined,
        type: undefined,
        value: undefined,
        unit: '',
        details: '',
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (
        name: keyof VitalFormEntry,
        value: string | number | Date | null
    ) => {
        setVitalData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setIsLoading(true);
        try {
            const res = await vitalService.addVital(vitalData);

            if (!res.id) alert('Something went wrong')
            else {
                setVitalData({
                    userId: undefined,
                    type: undefined,
                    value: undefined,
                    unit: '',
                    details: '',
                })
            }
        } catch (err) {
            if (err instanceof Error) {
                alert(err.message);
            } else {
                alert("Something went wrong");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return {
        vitalData,
        handleChange,
        handleSubmit,
        isLoading
    };
}