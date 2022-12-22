import { nanoid } from "nanoid";
import connection from "../database/database.js";

export async function shortenUrl(req, res){
    const userId = res.locals.userId;
    const { url } = req.body; 
    try {
        const shortUrl = nanoid();

        await connection.query(`INSERT INTO links ("userId", "shortUrl", url) VALUES ($1, $2, $3)`, [userId, shortUrl, url]);
        
        res.status(201).send({ shortUrl });
    } catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}