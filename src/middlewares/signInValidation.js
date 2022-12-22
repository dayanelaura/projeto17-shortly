import connection from "../database/database.js";
import bcrypt from 'bcrypt';
import { signInSchema } from "../models/signInSchema.js";

export async function signInValidation(req, res, next){
    try {
        const { error } = signInSchema.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map((detail) => detail.message);
            return res.status(422).send(errors);
        }

        const { name, password } = req.body;

        const isThereName = await connection.query(`SELECT * FROM users WHERE name = $1`, [name]);
        
        const user = isThereName.rows[0];
        if(user === undefined)
            return res.sendStatus(401);

        const userPassword = user.password;

        const passwordOk = bcrypt.compareSync(password, userPassword); 
        if(!passwordOk)
            return res.sendStatus(401);
        
        res.locals.user = user;
    }catch(err) {
        console.log(err);
        res.sendStatus(500);
    }
    next();
}