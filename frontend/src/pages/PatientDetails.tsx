import moment from "moment";
import AddVitalModal from "../components/AddVitalModal";
import { useAddVitals } from "../hooks/useAddVitals";
import { usePatientDetails } from "../hooks/usePatientDetails";
import type { Vital } from "../types/Vital";
import { getVitalColor } from "../utils/vitalColor";
import { Button } from "@heroui/react";
import VitalImage from "../components/VitalImage";
import EmptyIndicator from "../components/EmptyIndicator";
import PatientDetailsSkeleton from "../components/skeleton/PatientDetailsSkeleton";
import { ErrorState } from "../components/ErrorState";

export default function PatientDetails() {
    const {
        patient,
        isLoading,
        error,
        availableVitals,
        refresh,
        setRefresh
    } = usePatientDetails();
    const {
        isAddingVitals,
        setIsAddingVitals,
        vitalData,
        handleChange,
        handleSubmit,
        isVitalLoading
    } = useAddVitals(refresh, setRefresh);

    if (error) return <ErrorState
        title="Failed to load data"
        message="We couldn’t fetch patient details. Please check your connection."
    />;

    if (isLoading) return <PatientDetailsSkeleton />;

    return (
        <>
            <AddVitalModal
                size={'md'}
                openModal={isAddingVitals}
                setOpenModal={setIsAddingVitals}
                data={vitalData}
                onChangeHandler={handleChange}
                submitHandler={handleSubmit}
                isLoading={isVitalLoading}
                availableType={availableVitals}
            />

            <div className="h-auto min-h-[90vh] sm:max-h-[50vh] container max-w-6xl bg-white rounded-xl overflow-hidden flex flex-col gap-2 p-4 sm:p-8">
                <div className="flex gap-4 justify-between items-start">
                    <label className="text-xl sm:text-2xl font-bold">Patient Details</label>
                    
                    {availableVitals.length > 0 && (
                        <Button
                            onPress={() => {
                                handleChange("userId", Number(patient?.id))
                                setIsAddingVitals(true)
                            }}
                            color="primary"
                            size={"md"}
                        >
                            Add Vitals
                        </Button>
                    )}
                </div>

                <div className="h-32 w-full flex gap-4 items-center rounded-xl bg-linear-to-r from-blue-200 via-yellow-50 to-blue-200 p-2 sm:p-4 mb-4 sm:mb-6 shadow-md">
                    <div className="h-14 w-14 sm:h-24 sm:w-24">
                        <svg className="h-full w-full fill-current text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z" /></svg>
                    </div>
                    <div className="">
                        <div className="text-xl font-bold text-slate-700">{patient?.name}</div>
                        <div className=" font-medium text-slate-500">{patient?.age} years old</div>
                        <div className="capitalize font-medium text-slate-500">{patient?.sex}</div>
                    </div>
                </div>

                <label className="text-xl text-gray-700 font-semibold">Vitals</label>

                {patient!.vitals!.length > 0 ?
                    <div className="grid sm:grid-cols-3 gap-2 sm:gap-4">
                        {patient?.vitals?.map((vital: Vital) => {
                            return (
                                <div key={vital.id} className={`h-full w-full ${getVitalColor(vital.type)} rounded-xl p-4 sm:p-6 flex flex-col gap-2 sm:gap-4 justify-between`}>
                                    <div className="flex gap-4 items-center">
                                        <div className="h-16 w-16 bg-white rounded-full p-3 flex justify-center items-center">
                                            <VitalImage type={vital.type} />
                                        </div>

                                        <div className="flex flex-col sm:gap-1">
                                            <label className="font-medium text-sm sm:text-base text-gray-700">{vital.type}</label>
                                            {vital.type == "Note" ?
                                                <>
                                                    <span className="text-sm">{vital.details}</span>
                                                </>
                                                :
                                                <>
                                                    <p className="font-bold text-2xl sm:text-3xl leading-5 text-slate-800 my-1">{vital.value}<span className="ml-2 text-xs">{vital.unit}</span></p>
                                                    <span className="text-sm italic">{vital.riskScore !== "Not applicable" ? vital.riskScore : ""}</span>
                                                </>
                                            }
                                        </div>
                                    </div>

                                    <span className="text-sm text-gray-600">Recorded at {moment(vital.createdAt).format('YYYY-MM-DD')} | {moment(vital.createdAt).fromNow()}</span>
                                </div>
                            )
                        })}
                    </div>
                    :
                    <div className="h-[90vh] w-full">
                        <EmptyIndicator />
                    </div>
                }
            </div>
        </>
    )
}