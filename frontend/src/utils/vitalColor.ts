import type { Vital } from "../types/Vital";

export const getVitalColor = (vital: Vital["type"]): string => {
    const vitalColorMap: Record<Vital["type"], string> = {
        "Heart Rate": "bg-pink-100",                 
        "Respiratory Rate": "bg-blue-100",           
        "BloodPressure - Diastolic": "bg-[#8C6FE6]",  
        "BloodPressure - Systolic": "bg-[#E66FD2]",   
        "Temperature": "bg-red-100",                
        "Height": "bg-green-100",                     
        "Weight": "bg-green-100",                     
        "Note": "bg-gray-100",                       
    };

    return vitalColorMap[vital];
};