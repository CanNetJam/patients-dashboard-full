import { useState, type FormEvent } from "react";
import type { VitalFormEntry } from "../types/Vital";
import { vitalService } from "../services/vitalService";

export const useAddVitals = (
    refresh: boolean,
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>
) => {
    const [isAddingVitals, setIsAddingVitals] = useState(false);
    const [vitalData, setVitalData] = useState<VitalFormEntry>({
        userId: undefined,
        type: undefined,
        value: undefined,
        unit: '',
        details: '',
    });
    const [isVitalLoading, setIsVitalLoading] = useState(false);

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

        setIsVitalLoading(true);
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
                });
            }
        } catch (err) {
            if (err instanceof Error) {
                alert(err.message);
            } else {
                alert("Something went wrong");
            }
        } finally {
            setIsVitalLoading(false);
            setIsAddingVitals(false);
            setRefresh(!refresh);
        }
    };

    return {
        isAddingVitals,
        setIsAddingVitals,
        vitalData,
        handleChange,
        handleSubmit,
        isVitalLoading
    };
}