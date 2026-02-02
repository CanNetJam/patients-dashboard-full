import { useState } from "react"
import { userNameContext } from "./userNameContext";
import { useNavigate } from "react-router";

export const useLogin = () => {
    const navigate = useNavigate();
    const { setName } = userNameContext();
    const [userName, setUserName] = useState<string>('')

    const submitHandler = () => {
        const cleanName: string = userName.trim();

        if (cleanName === '') {
            alert('Please enter your name');
            return;
        }

        localStorage.setItem("UserName", cleanName);

        setName(cleanName);
        setUserName('');
        navigate("/dashboard");
    }

    return {
        userName,
        setUserName,
        submitHandler
    }
}