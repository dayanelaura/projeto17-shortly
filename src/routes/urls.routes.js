import { Router } from "express";
import { findUrlById, deleteUrlById } from "../controllers/url_controllers.js";
import { urlIdValidation, userValidation } from "../middlewares/url_validations.js";
import { authRoutesValidation } from "../middlewares/authRoutesValidation.js";

const router = Router();

router.get('/urls/:id', urlIdValidation, findUrlById);
router.delete('/urls/:id', authRoutesValidation, urlIdValidation, userValidation, deleteUrlById);

export default router;