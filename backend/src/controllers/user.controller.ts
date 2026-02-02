import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/user.service";
import { success } from "../utils/response";
import { HttpError } from "../utils/http-error";

export const UserController = {
    getUsers(req: Request, res: Response) {
        res.json(success(UserService.getAll()));
    },

    getUserById(req: Request, res: Response, next: NextFunction) {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return next(new HttpError(400, "Invalid user id"));
        }

        const user = UserService.getById(id);
        if (!user) {
            return next(new HttpError(404, "User not found"));
        }

        res.json(success(user));
    },

    createUser(req: Request, res: Response, next: NextFunction) {
        const { name, dateOfBirth, age, sex } = req.body;

        // Note: age can be 0, so we need to check differently
        if (!name || !dateOfBirth || age === undefined || age === null || !sex) {
            return next(new HttpError(400, "Please fill out the neccessary fields"));
        }

        // Validate age is not negative (0 is allowed for newborns)
        if (age < 0) {
            return next(new HttpError(400, "Age should be a positive number"));
        }

        const user = UserService.create(name, dateOfBirth, age, sex);
        res.status(201).json(success(user));
    }
};