import AddVitalModal from "../components/AddVitalModal";
import { useAddVitals } from "../hooks/useAddVitals";
import { usePatientDetails } from "../hooks/usePatientDetails";
import type { Vital } from "../types/Vital";
import { getVitalColor } from "../utils/vitalColor";

export default function PatientDetails() {
    const {
        patient,
        isLoading,
        error,
        availableVitals
    } = usePatientDetails();
    const {
        isAddingVitals,
        setIsAddingVitals,
        vitalData,
        handleChange,
        handleSubmit,
        isVitalLoading
    } = useAddVitals();
   
    if (error) return <div>Found an error: {error}</div>

    if (isLoading) return <div>Loading...</div>

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

            <div className="h-auto container max-w-6xl bg-white rounded-xl overflow-hidden p-8">
                Patient Details

                <div>
                    {patient?.name}
                    {patient?.age}
                    {patient?.sex}
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                    {patient?.vitals?.map((vital: Vital) => {
                        return (
                            <div key={vital.id} className={`h-full w-full ${getVitalColor(vital.type)} rounded-xl p-6 flex flex-col justify-between`}>
                                <div className="flex gap-1 xl:grid xl:gap-0">
                                    {/* <div className="h-10 xl:h-14 w-10 xl:w-14">
                                    <img className="h-full w-full object-cover" src={a.icon} alt={a.description} />
                                </div> */}

                                    <div className="grid">
                                        <label className="font-medium text-sm">{vital.type}</label>
                                        <span className="font-bold text-xl leading-5">{vital.value}</span>
                                    </div>
                                </div>

                                <span className="text-sm">{vital.details}</span>
                            </div>
                        )
                    })}

                    <div
                        onClick={() => {
                            handleChange("userId", Number(patient?.id))
                            setIsAddingVitals(true)
                        }}
                        className="h-full w-full bg-blue-400 rounded-xl p-6"
                    >
                        <span className="text-white text-lg whitespace-nowrap">Add Vital Record</span>
                    </div>
                </div>
            </div>
        </>
    )
}