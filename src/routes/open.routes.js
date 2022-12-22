import { Router } from "express";
import { redirectShortUrl } from "../controllers/shorturl_controller.js";
import { shortUrlValidation } from "../middlewares/shortUrlValidation.js";

const router = Router();

router.get('/urls/open/:shortUrl', shortUrlValidation, redirectShortUrl);

export default router;