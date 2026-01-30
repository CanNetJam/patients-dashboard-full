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
        const { firstName, lastName, age, sex } = req.body;

        if (!firstName || !lastName || !age) {
            return next(new HttpError(400, "Name and age are required"));
        }

        if (age < 0) {
            return next(new HttpError(400, "Age should be a positive number"));
        }

        const user = UserService.create(firstName, lastName, age, sex);
        res.status(201).json(success(user));
    }
};
