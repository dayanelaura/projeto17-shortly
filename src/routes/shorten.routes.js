import { Router } from "express";
import { shortenUrl } from "../controllers/shortenUrl.js";
import { urlValidation } from "../middlewares/urlValidation.js";
import { authRoutesValidation } from "../middlewares/authRoutesValidation.js";

const router = Router();

router.post('/urls/shorten', authRoutesValidation, urlValidation, shortenUrl);

export default router;