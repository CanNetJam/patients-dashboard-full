import { Request, Response, NextFunction } from "express";
import { VitalService } from "../services/vital.service";
import { success } from "../utils/response";
import { HttpError } from "../utils/http-error";

export const VitalController = {
    getVitals(req: Request, res: Response) {
        res.json(success(VitalService.getAll()));
    },

    getVitalsById(req: Request, res: Response, next: NextFunction) {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return next(new HttpError(400, "Invalid vital id"));
        }

        const vital = VitalService.getById(id);
        if (!vital) {
            return next(new HttpError(404, "Vital not found"));
        }

        res.json(success(vital));
    },

    createVital(req: Request, res: Response, next: NextFunction) {
        const {
            userId,
            type,
            value,
            unit,
            details,
        } = req.body;

        if (!userId || !type || !value || !unit) {
            return next(new HttpError(400, "Please fill out the neccessary fields."));
        }

        const vital = VitalService.create(userId, type, value, unit, details);
        res.status(201).json(success(vital, 201));
    }
}