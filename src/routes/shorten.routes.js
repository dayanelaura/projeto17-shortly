import { Router } from "express";
import { shortenUrl } from "../controllers/url_controllers.js";
import { authRoutesValidation } from "../middlewares/authRoutesValidation.js";
import { urlBodyValidation } from "../middlewares/url_validations.js";

const router = Router();

router.post('/urls/shorten', authRoutesValidation, urlBodyValidation, shortenUrl);

export default router;