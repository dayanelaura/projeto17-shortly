import { Router } from "express";
import { signIn } from "../controllers/signIn.js";
import { signInValidation } from "../middlewares/signInValidation.js";

const router = Router();

router.post('/signin', signInValidation, signIn);

export default router;