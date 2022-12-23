import { Router } from "express";
import { showRanking } from "../controllers/ranking.js";

const router = Router();

router.get('/ranking', showRanking);

export default router;