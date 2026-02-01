import type { Vital } from "../types/Vital";
import fallback from "../assets/fallback.png";
import heartRate from "../assets/heart.png";
import diastolic from "../assets/diastolic.png";
import systolic from "../assets/systolic.png";
import temperature from "../assets/thermometer.png";
import lungs from "../assets/lungs.png";
import height from "../assets/height.png";
import weight from "../assets/scale.png";
import note from "../assets/notepad.png";

export default function VitalImage({
    type
}: {
    type: Vital["type"];
}) {
    let image = fallback

    switch (type) {
        case "Heart Rate":
            image = heartRate
            break
        case "BloodPressure - Systolic":
            image = systolic
            break
        case "BloodPressure - Diastolic":
            image = diastolic
            break
        case "Respiratory Rate":
            image = lungs
            break
        case "Temperature":
            image = temperature
            break
        case "Height":
            image = height
            break
        case "Weight":
            image = weight
            break
        case "Note":
            image = note
            break
    }

    return (

        <img
            className="h-full w-full object-cover"
            src={image}
            alt={type + " logo"}
        />
    )
}