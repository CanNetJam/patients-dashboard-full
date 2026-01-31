import { useEffect, useState } from "react";
import { patientService } from "../services/patientService";
import { getCache, setCache } from "../utils/localStorageCache";
import type { Patient } from "../types/Patient";

const CACHE_KEY = 'patients_cache';
const CACHE_TTL = 1 * 60 * 1000; // 1 minute

export const usePatients = () => {
    const [patients, setPatients] = useState<Patient[]>();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        const fetchPatient = async () => {
            try {
                setIsLoading(true);

                // Try cache first
                const cachedPatients = getCache<Patient[]>(CACHE_KEY);
                if (cachedPatients) {
                    if (isMounted) {
                        setPatients(cachedPatients);
                        setIsLoading(false);
                    }
                    return;
                }

                // Fetch from API
                const data = await patientService.getPatients();

                if (isMounted) {
                    setPatients(data);
                    setCache(CACHE_KEY, data, CACHE_TTL);
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

        fetchPatient();

        return () => {
            isMounted = false;
        };
    }, []);

    return {
        patients,
        isLoading,
        error
    }
}