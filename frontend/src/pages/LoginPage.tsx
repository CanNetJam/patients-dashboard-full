import { Input } from "@heroui/react";
import ButtonWithState from "../components/ButtonWithState";
import { useLogin } from "../hooks/useLogin";

export default function LoginPage() {
    const {
        userName,
        setUserName,
        submitHandler
    } = useLogin();

    return (
        <div className="h-screen w-full">
            <div className="h-full w-full container mx-auto max-w-6xl flex flex-col justify-center items-center gap-10">
                <h1 className="font-bold text-5xl text-center text-slate-800">Medical Case Management Mini-App</h1>

                <div className="max-w-125 grid gap-1 justify-center">
                    <h3 className="font-medium text-lg text-gray-500">Please enter your name to proceed.</h3>
                    <div className="flex gap-2">
                        <Input
                            value={userName}
                            onValueChange={setUserName}
                        />
                        <ButtonWithState
                            label={"Continue"}
                            size={"md"}
                            variant={"solid"}
                            color={"primary"}
                            isLoading={false}
                            type={"submit"}
                            onPress={submitHandler}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}