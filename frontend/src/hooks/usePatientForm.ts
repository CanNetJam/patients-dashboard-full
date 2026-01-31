import { useState, type FormEvent } from "react";
import { patientService } from "../services/patientService";
import { useNavigate } from "react-router";
import type { PatientFormEntry } from "../types/Patient";

export const usePatientForm = () => {
    const navigate = useNavigate();
    const [patientData, setPatientData] = useState<PatientFormEntry>({
        name: '',
        dateOfBirth: null,
        age: undefined,
        sex: undefined
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (
        name: keyof PatientFormEntry,
        value: string | number | Date | null
    ) => {
        setPatientData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setIsLoading(true);
        try {
            const res = await patientService.addPatient(patientData);

            if (!res.id) alert('Something went wrong')
            else {
                setPatientData({
                    name: '',
                    dateOfBirth: null,
                    age: undefined,
                    sex: undefined
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
            navigate("/dashboard"); 
        }
    };

    return {
        patientData,
        handleChange,
        handleSubmit,
        isLoading
    };
}