import moment from "moment";
import { usePatients } from "../hooks/usePatients";
import { Button } from "@heroui/react";
import { useNavigate } from "react-router";
import type { Patient } from "../types/Patient";

export default function PatientList() {
    const navigate = useNavigate();
    const {
        patients,
        isLoading,
        error
    } = usePatients();

    if (error) return <div>Found an error: {error}</div>

    if (isLoading) return <div>Loading...</div>

    return (
        <div className="h-auto min-h-screen container max-w-6xl bg-white rounded-xl overflow-hidden">
            <div className="flex justify-between items-center p-4 sticky top-0 bg-white">
                <div className="flex flex-start items-center gap-4">
                    <label className="text-2xl font-bold">Patients</label>
                    {/* <div className="flex items-center">
                        <input className="w-48 border-b border-gray-200" />
                        <svg className="h-8 w-8 fill-current text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" /></svg>
                    </div> */}
                </div>

                <Button
                    variant="solid"
                    color="primary"
                    size="md"
                    onPress={() => navigate("add-new-patient")}
                >
                    Add Patient
                </Button>
            </div>

            <div className="grid">
                {patients?.map((patient: Patient) => {
                    return (
                        <button
                            onClick={() => navigate(`/dashboard/${patient.id}`)}
                            key={`patient-${patient.id}`}
                            className={`w-full cursor-pointer hover:bg-gray-50 border-b border-gray-200 flex gap-4 px-6 p-2 items-center ${false ? 'bg-green-100' : ''}`}
                        >
                            <div className="h-16 w-16">
                                {/* <img alt={`${'mock'}'s picture`} /> */}
                                <svg className="h-full w-full fill-current text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z" /></svg>
                            </div>

                            <div className="grid sm:flex justify-between sm:items-center w-full">
                                <div className="grid justify-start">
                                    <span className="sm:text-xl font-medium">{patient.name}</span>
                                    <span className="text-gray-500 text-left">
                                        {patient.sex},
                                        {patient.age}
                                    </span>
                                </div>
                                <span className="text-gray-500">
                                    Recorded at: {moment(patient.createdAt).format('YYYY-MM-DD')}
                                    {/* <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z" /></svg> */}
                                </span>
                            </div>
                        </button>
                    )
                })}
            </div>
        </div>
    )
}