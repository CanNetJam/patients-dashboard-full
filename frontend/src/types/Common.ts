import type { FormEvent, ReactNode } from "react";
import type { VitalFormEntry } from "./Vital";

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

export interface ModalProps {
    size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
    openModal: boolean;
    setOpenModal: (open: boolean) => void;
    data: VitalFormEntry; // Since this is the only use case, but we can change this if future forms needed this too
    onChangeHandler: (name: any, value: any) => void;
    submitHandler: (e: FormEvent<HTMLFormElement>) => Promise<void>;
    isLoading: boolean;
    availableType?: string[]; // Specific only to vital entry
}