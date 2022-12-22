import { Router } from "express";
import { findUrlById } from "../controllers/url_controllers.js";
import { urlIdValidation } from "../middlewares/url_validations.js";

const router = Router();

router.get('/urls/:id', urlIdValidation, findUrlById);

export default router;