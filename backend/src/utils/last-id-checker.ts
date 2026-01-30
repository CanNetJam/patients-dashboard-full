import { User } from "../models/user.model";
import { Vital } from "../models/vital.model";

export const checkLastId = (data: Array<User | Vital>) => {
    return data.length > 0 ? data[data.length - 1].id : 1;
}