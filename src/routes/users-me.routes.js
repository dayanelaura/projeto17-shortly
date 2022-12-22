import { Router } from "express";
import { showMyUrls } from "../controllers/url_controllers.js";
import { authRoutesValidation } from "../middlewares/authRoutesValidation.js";

const router = Router();

router.get('/users/me', authRoutesValidation, showMyUrls);

export default router;