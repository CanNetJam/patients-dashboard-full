import { Request, Response, NextFunction } from "express";
import { RiskAssessmentService } from "../services/risk-assessment.service";
import { HttpError } from "../utils/http-error";
import { success } from "../utils/response";

export const RiskController = {
    getRiskScore(req: Request, res: Response, next: NextFunction) {
        const { age, type, rate } = req.body;

        const risk = RiskAssessmentService.computeRisk(age, type, rate);
        if (!risk) {
            return next(new HttpError(404, "Risk assessment not found"));
        }

        res.json(success(risk));
    }
}