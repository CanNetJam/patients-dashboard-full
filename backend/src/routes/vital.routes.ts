import { Router } from "express";
import { VitalController } from "../controllers/vital.controller";

const router = Router();

router.get("/", VitalController.getVitals);
router.get("/:id", VitalController.getVitalsById);
router.post("/", VitalController.createVital);

export default router;