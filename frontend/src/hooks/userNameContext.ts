import { useContext } from "react";
import { UserContext } from "../context/userContext";
import type { CurrentUser } from "../types/Common";

export const userNameContext = (): CurrentUser => {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error('userNameContext must be used within a NameProvider');
    }

    return context;
};