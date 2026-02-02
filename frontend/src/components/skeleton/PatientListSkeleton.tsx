import { Button, Skeleton } from "@heroui/react"

export default function PatientListSkeleton() {
    return (
        <div className="h-auto min-h-screen container max-w-6xl bg-white rounded-xl overflow-hidden">
            <div className="flex justify-between items-center p-4 sticky top-0 bg-white">
                <div className="flex flex-start items-center gap-4">
                    <label className="text-2xl font-bold">Patients</label>
                </div>

                <Button
                    variant="solid"
                    color="primary"
                    size="md"
                >
                    Add Patient
                </Button>
            </div>

            <div className="grid">
                {[1,2,3,4,5,6,7,8,9,10]?.map((num: number) => {
                    return (
                        <div
                            key={`patient-${num}`}
                            className={`w-full cursor-pointer hover:bg-gray-50 border-b border-gray-200 flex gap-4 px-6 p-2 items-center ${false ? 'bg-green-100' : ''}`}
                        >
                            <div className="h-16 w-16">
                                <svg className="h-full w-full fill-current text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z" /></svg>
                            </div>

                            <div className="grid sm:flex gap-1 justify-between sm:items-center w-full">
                                <div className="grid justify-start gap-1">
                                    <span className="sm:text-xl font-medium">
                                        <Skeleton className="h-6 w-64 rounded-lg" />
                                    </span>
                                    <span className="text-gray-500 capitalize text-left text-sm sm:text-base">
                                        <Skeleton className="h-5 w-32 rounded-lg" />
                                    </span>
                                </div>

                                <span className="text-gray-500 text-sm sm:text-base">
                                    <Skeleton className="h-5 w-48 rounded-lg" />
                                </span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}