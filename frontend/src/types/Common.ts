import type { ReactNode } from "react";

export interface ButtonProps {
    label: string;
    size: "sm" | "md" | "lg";
    variant: "solid" | "faded" | "bordered" | "light" | "flat" | "ghost" | "shadow";
    color: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
    isLoading: boolean;
    type: "button" | "submit";
    onPress?: () => void;
}

export interface CurrentUser {
    name: string;
    setName: (name: string) => void;
}

export interface ProviderProps {
    children: ReactNode;
}

export interface API<T> {
    success: boolean;
    status: number;
    data: T;
}