import { Router } from "express";
import { RiskController } from "../controllers/risk.controller";
const router = Router();

router.post("/", RiskController.getRiskScore);

export default router;
