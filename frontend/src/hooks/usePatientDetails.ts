import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { patientService } from "../services/patientService";
import type { Patient } from "../types/Patient";
import { vitalService } from "../services/vitalService";
import { checkAvailableVitals } from "../utils/checkAvailableVitals";

export const usePatientDetails = () => {
    const urlParams = useParams();
    const [patient, setPatient] = useState<Patient>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [availableVitals, setAvailableVitals] = useState<string[]>([]);
    // We opted on the refresh approach instead of updating the state because we need the risk level computation on the backend api
    const [refresh, setRefresh] = useState<boolean>(true); 

    useEffect(() => {
        let isMounted = true;

        const fetchPatients = async () => {
            try {
                if (!urlParams.patientId) return;

                setIsLoading(true);
                let fullPatientData: Patient = {
                    id: 0,
                    name: '',
                    dateOfBirth: '',
                    age: 0,
                    sex: 'male',
                    vitals: [],
                    createdAt: ''
                }

                // Fetch from patient details first
                const data = await patientService.getPatientById(urlParams.patientId);
                if (data) {
                    // Then fetch their vitals
                    const data2 = await vitalService.getVitalsById(urlParams.patientId);

                    fullPatientData = {
                        id: data.id,
                        name: data.name,
                        dateOfBirth: data.dateOfBirth,
                        age: data.age,
                        sex: data.sex,
                        vitals: data2,
                        createdAt: data.createdAt
                    }
                }

                if (isMounted) {
                    setPatient(fullPatientData);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err instanceof Error ? err.message : 'Unknown error');
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        fetchPatients();

        return () => {
            isMounted = false;
        };
    }, [refresh]);

    useEffect(() => {
        const remainingVitals = checkAvailableVitals(patient?.vitals);
        setAvailableVitals(remainingVitals);
    }, [patient?.vitals])

    return {
        patient,
        isLoading,
        error,
        availableVitals,
        refresh,
        setRefresh
    }
}