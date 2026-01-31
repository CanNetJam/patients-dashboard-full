import { Button } from "@heroui/react"
import type { ButtonProps } from "../types/Common"

export default function ButtonWithState({
    label,
    size,
    variant,
    color,
    isLoading,
    type,
    onPress
}: ButtonProps) {
    return (
        <Button
            size={size}
            variant={variant}
            color={color}
            isDisabled={isLoading === true}
            isLoading={isLoading}
            onPress={onPress}
            type={type}
        >
            {isLoading === false ? label : "Loading..."}
        </Button>
    )
}