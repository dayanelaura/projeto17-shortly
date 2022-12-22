import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

import signUpRoutes from './routes/signup.routes.js';
import signInRoutes from './routes/signin.routes.js';
import shortenRoutes from './routes/shorten.routes.js';

const app = express();
app.use(express.json());
app.use(cors());
app.use(signUpRoutes);
app.use(signInRoutes);
app.use(shortenRoutes);

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});