import { nanoid } from "nanoid";
import connection from "../database/database.js";

export async function shortenUrl(req, res){
    const userId = res.locals.userId;
    const { url } = req.body; 
    try {
        const shortUrl = nanoid(8);

        await connection.query(`INSERT INTO links ("userId", "shortUrl", url) VALUES ($1, $2, $3)`, [userId, shortUrl, url]);
        
        res.status(201).send({ shortUrl });
    } catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}

export async function findUrlById(req, res){
    try{
        const link = req.locals;
        const urlObject = {
            id: link.id,
            shortUrl: link.shortUrl,
            url: link.url
        };
        res.status(200).send(urlObject);
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}

export async function deleteUrlById(req, res){
    try{
        const link = req.locals;
        await connection.query(`DELETE FROM links WHERE id=$1`, [link.id]);
        res.sendStatus(204);
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}

export async function showMyUrls(req, res){
    try{
        const userId = res.locals.userId;

        const userData = await connection.query(`
            SELECT users.id, users.name, SUM("visitCount") AS "visitCount" 
            FROM users JOIN links
            ON users.id=links."userId" 
            WHERE "userId"=${userId} GROUP BY users.id
        `);
        const object1 = userData.rows[0];

        const userLinks = await connection.query(`
        SELECT id, "shortUrl", url, "visitCount"
        FROM links 
        WHERE "userId"=${userId} 
        `);
        const object2 = userLinks.rows;
        
        const { id, name, visitCount } = object1;
        const object3 = {
            id,
            name,
            visitCount,
            shortenedUrls: object2
        }

        res.send(object3).status(200);
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}