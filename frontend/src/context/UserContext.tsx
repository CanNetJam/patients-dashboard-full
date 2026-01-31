import { createContext, useState } from "react";
import type { CurrentUser, ProviderProps } from "../types/Common";

export const UserContext = createContext<CurrentUser | null>(null);

export const UserContextProvider: React.FC<ProviderProps> = ({ children }) => {
    const [name, setName] = useState<string>('');

    return (
        <UserContext.Provider value={{ name, setName }}>
            {children}
        </UserContext.Provider>
    );
};