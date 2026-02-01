import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    Form,
    Input,
    RadioGroup,
    Radio,
    Textarea
} from "@heroui/react";
import type { ModalProps } from "../types/Common";
import ButtonWithState from "./ButtonWithState";

export default function AddVitalModal({
    size,
    openModal,
    setOpenModal,
    data,
    onChangeHandler,
    submitHandler,
    isLoading,
    availableType
}: ModalProps) {
    return (
        <>
            <Modal
                isOpen={openModal}
                onOpenChange={setOpenModal}
                size={size}
                scrollBehavior={"inside"}
                isDismissable={false}
                hideCloseButton
            >
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">Add Patient Vitals</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={submitHandler}>
                            <div className="w-full border-t border-gray-100">
                                <dl className="divide-y divide-gray-100">
                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm/6 font-medium text-gray-900">Vital Type</dt>
                                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                            <RadioGroup
                                                value={data.type}
                                                onValueChange={(value) =>
                                                    onChangeHandler("type", value)
                                                }
                                                isRequired
                                                orientation="vertical"
                                            >
                                                {availableType?.map((type) => <Radio key={type} value={type}>{type}</Radio>)}
                                            </RadioGroup>
                                        </dd>
                                    </div>
                                    {data.type !== "Note" && (
                                        <>
                                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                <dt className="text-sm/6 font-medium text-gray-900">Value</dt>
                                                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                                    <Input
                                                        value={data.value?.toString()}
                                                        onValueChange={(value) =>
                                                            onChangeHandler("value", Number(value))
                                                        }
                                                        isRequired
                                                        type="number"
                                                        min={1}
                                                        max={500}
                                                        className="max-w-71"
                                                    />
                                                </dd>
                                            </div>
                                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                <dt className="text-sm/6 font-medium text-gray-900">Unit</dt>
                                                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                                    <Input
                                                        value={data.unit}
                                                        onValueChange={(value) =>
                                                            onChangeHandler("unit", value)
                                                        }
                                                        isRequired
                                                        className="max-w-71"
                                                        placeholder="Eg. kg, bpm, etc."
                                                    />
                                                </dd>
                                            </div>
                                        </>
                                    )}
                                    {data.type === "Note" && (
                                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt className="text-sm/6 font-medium text-gray-900">Details</dt>
                                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                                <Textarea
                                                    value={data.details}
                                                    onValueChange={(value) =>
                                                        onChangeHandler("details", value)
                                                    }
                                                    isRequired
                                                    className="max-w-71"
                                                    placeholder="Breif description here..."
                                                />
                                            </dd>
                                        </div>
                                    )}
                                </dl>
                            </div>
                            <div className="w-full flex justify-end gap-2 pb-4">
                                <ButtonWithState
                                    label={"Close"}
                                    size={"md"}
                                    variant={"bordered"}
                                    color={"danger"}
                                    isLoading={isLoading}
                                    type={"button"}
                                    onPress={() => setOpenModal(!openModal)}
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
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}
