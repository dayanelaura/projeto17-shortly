import connection from "../database/database.js";
import { urlSchema } from "../models/urlSchema.js";

export async function urlBodyValidation(req, res, next){

    const { error } = urlSchema.validate(req.body, { abortEarly: false });
    if (error) {
        const errors = error.details.map((detail) => detail.message);
        return res.status(422).send(errors);
    }
    next();
}

export async function urlIdValidation(req, res, next){
    const { id } = req.params;
    try{
        const link = await connection.query(`SELECT * FROM links WHERE id=$1`, [id]);

        if (link.rows[0] === undefined)
            return res.sendStatus(404);
        
        req.locals = link.rows[0];
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
    next();
}

export async function userValidation(req, res, next){
    try{
        const linkObject = req.locals;
        const userId = res.locals.userId;
        
        if(linkObject.userId !== userId)
            return res.sendStatus(401);
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
    next();
}