import connection from "../database/database.js";
import { signUpSchema } from "../models/signUpSchema.js";

export async function signUpValidation(req, res, next){
    const { email, password, confirmPassword } = req.body;

    const user = req.body;
    const { error } = signUpSchema.validate(user, { abortEarly: false });
    if (error) {
        const errors = error.details.map((detail) => detail.message);
        return res.status(422).send(errors);
    }

    const isThereEmail = await connection.query(`SELECT * FROM users WHERE email = $1`, [email]);
    if(isThereEmail.rows[0] !== undefined)
        return res.sendStatus(409);

    res.locals.user = user;
    next();
}