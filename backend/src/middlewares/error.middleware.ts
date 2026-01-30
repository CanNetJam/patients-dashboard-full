import { Request, Response, NextFunction } from "express";
import { HttpError } from "../utils/http-error";

export function errorHandler(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (err instanceof HttpError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message
        });
    }

    // fallback (unexpected errors)
    return res.status(500).json({
        success: false,
        message: "Internal server error"
    });
}
