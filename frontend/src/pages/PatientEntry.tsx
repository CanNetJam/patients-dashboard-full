import { DatePicker, Form, Input, Radio, RadioGroup } from "@heroui/react";
import ButtonWithState from "../components/ButtonWithState";
import { parseDate } from "@internationalized/date";
import { usePatientForm } from "../hooks/usePatientForm";

export default function PatientEntry() {
    const {
        patientData,
        handleChange,
        handleSubmit,
        isLoading,
        handleCancel
    } = usePatientForm();

    return (
        <div className="h-auto container max-w-6xl bg-white rounded-xl overflow-hidden p-8">
            <Form
                onSubmit={handleSubmit}
                className="h-full w-full"
            >
                <div className="w-full px-4 sm:px-0">
                    <h3 className="text-xl font-semibold text-gray-900">Patient Information</h3>
                    <p className="mt-1 max-w-2xl text-sm/6 text-gray-500">Personal details of the patient.</p>
                </div>
                <div className="w-full mt-6 border-t border-gray-100">
                    <dl className="divide-y divide-gray-100">
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">Full name</dt>
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                <Input
                                    value={patientData.name}
                                    onValueChange={(value) =>
                                        handleChange("name", value)
                                    }
                                    isRequired
                                    className="max-w-71"
                                    placeholder="Eg. John Doe"
                                />
                            </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">Date of birth</dt>
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                <DatePicker
                                    value={
                                        patientData.dateOfBirth !== null ?
                                            parseDate(patientData.dateOfBirth.toISOString().split("T")[0])
                                            :
                                            null
                                    }
                                    onChange={(date) =>
                                        handleChange("dateOfBirth", new Date(date!.toString()))
                                    }
                                    isRequired
                                    className="max-w-71"
                                />
                            </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">Age</dt>
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                <Input
                                    value={patientData.age?.toString()}
                                    onValueChange={(value) =>
                                        handleChange("age", Number(value))
                                    }
                                    isRequired
                                    type="number"
                                    min={1}
                                    max={150}
                                    className="max-w-71"
                                />
                            </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">Sex</dt>
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                <RadioGroup
                                    value={patientData.sex}
                                    onValueChange={(value) =>
                                        handleChange("sex", value as "male" | "female")
                                    }
                                    isRequired
                                    orientation="horizontal"
                                >
                                    <Radio value="male">Male</Radio>
                                    <Radio value="female">Female</Radio>
                                </RadioGroup>
                            </dd>
                        </div>
                    </dl>
                </div>

                <div className="w-full flex justify-end gap-2 border-t border-gray-100 pt-4">
                    <ButtonWithState
                        label={"Cancel"}
                        size={"md"}
                        variant={"bordered"}
                        color={"danger"}
                        isLoading={isLoading}
                        type={"button"}
                        onPress={handleCancel}
                    />
                    <ButtonWithState
                        label={"Submit"}
                        size={"md"}
                        variant={"solid"}
                        color={"primary"}
                        isLoading={isLoading}
                        type={"submit"}
                    />
                </div>
            </Form>
        </div >
    )
}