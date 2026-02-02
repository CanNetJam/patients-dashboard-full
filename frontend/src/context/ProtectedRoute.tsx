import type { ReactNode } from "react"
import { userNameContext } from "../hooks/userNameContext";
import { Navigate } from "react-router";

export const ProtectedRoute = ({
    children
}: {
    children: ReactNode
}) => {
    const { name } = userNameContext();

    if (!name) {
        alert("Please login first");
        return <Navigate to="/" />
    }

    return (
        <>
            {children}
        </>
    );
}