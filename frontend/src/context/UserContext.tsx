import { createContext, useEffect, useState } from "react";
import type { CurrentUser, ProviderProps } from "../types/Common";

export const UserContext = createContext<CurrentUser | null>(null);

const USERNAME_KEY = "UserName";

export const UserContextProvider: React.FC<ProviderProps> = ({ children }) => {
    const [name, setName] = useState<string>(() => {
        return localStorage.getItem(USERNAME_KEY) ?? "";
    });

    useEffect(() => {
        if (name) {
            localStorage.setItem(USERNAME_KEY, name);
        } else {
            localStorage.removeItem(USERNAME_KEY);
        }
    }, [name]);

    return (
        <UserContext.Provider value={{ name, setName }}>
            {children}
        </UserContext.Provider>
    );
};