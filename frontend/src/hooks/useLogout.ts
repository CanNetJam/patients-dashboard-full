import { useNavigate } from "react-router";
import { userNameContext } from "./userNameContext";

export const useLogOut = () => {
    const navigate = useNavigate();
    const { setName } = userNameContext();

    const logOut = () => {
        navigate("/");
        setName('');
        localStorage.clear();
    }

    return {
        logOut
    }
}