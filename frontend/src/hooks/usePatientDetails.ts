import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getCache, setCache } from "../utils/localStorageCache";
import { patientService } from "../services/patientService";
import type { Patient } from "../types/Patient";
import { vitalService } from "../services/vitalService";

export const usePatientDetails = () => {
    const urlParams = useParams();
    const [patient, setPatient] = useState<Patient>();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        const fetchPatients = async () => {
            try {
                if (!urlParams.patientId) return;

                const CACHE_KEY = `patient-${urlParams.patientId}_cache`;
                const CACHE_TTL = 1 * 60 * 1000; // 1 minute

                setIsLoading(true);

                // Try cache first
                const cachedPatient = getCache<Patient>(CACHE_KEY);
                if (cachedPatient) {
                    if (isMounted) {
                        setPatient(cachedPatient);
                        setIsLoading(false);
                    }
                    return;
                }

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
                    setCache(CACHE_KEY, fullPatientData, CACHE_TTL);
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
    }, []);

    return {
        patient,
        isLoading,
        error
    }
}