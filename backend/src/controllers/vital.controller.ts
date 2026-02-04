import { Request, Response, NextFunction } from "express";
import { VitalService } from "../services/vital.service";
import { success } from "../utils/response";
import { HttpError } from "../utils/http-error";

export const VitalController = {
    getVitals(req: Request, res: Response) {
        // Check if userId query parameter is provided
        const userIdQuery = req.query.userId;

        if (userIdQuery) {
            const userId = Number(userIdQuery);
            if (!isNaN(userId)) {
                const vitals = VitalService.getById(userId);
                return res.json(success(vitals));
            }
        }

        // Return all vitals if no userId query parameter
        res.json(success(VitalService.getAll()));
    },

    getVitalsById(req: Request, res: Response, next: NextFunction) {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return next(new HttpError(400, "Invalid vital id"));
        }

        const vitals = VitalService.getById(id);

        res.json(success(vitals));
    },

    createVital(req: Request, res: Response, next: NextFunction) {
        const {
            userId,
            type,
            value,
            unit,
            details,
        } = req.body;

        console.log(
            userId,
            type,
            value,
            unit,
            details
        )
        // Note: value can be 0, so we need to check differently
        if (!userId || !type || value === undefined || value === null) {
            return next(new HttpError(400, "Please fill out the neccessary fields."));
        }

        try {
            const vital = VitalService.create(userId, type, value, unit, details);
            res.status(201).json(success(vital, 201));
        } catch (error) {
            // Handle patient not found error
            if (error instanceof Error && error.message === "Patient not found") {
                return next(new HttpError(404, "Patient not found"));
            }
            // Handle other errors
            return next(new HttpError(500, "Internal server error"));
        }
    }
}