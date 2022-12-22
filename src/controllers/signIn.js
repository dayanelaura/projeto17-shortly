import connection from "../database/database.js";
import { v4 as uuidV4 } from "uuid";

export async function signIn(req, res){
    const user = res.locals.user;
    const token = uuidV4();
    
    try {
        await connection.query(`INSERT INTO bearers ("userId", token) VALUES ($1, $2)`, [user.id, token]);
        res.send({ token });
    } catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}