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

        const b = await connection.query(`SELECT SUM("visitCount") AS "visitCount" 
        FROM links WHERE "userId"=${userId}`);
        
        const userData = await connection.query(`SELECT users.id, users.name, SUM(links."visitCount") as "visitCount", json_build_object('id', links.id, 'shortUrl', links."shortUrl", 'url', url, 'visitCount', links."visitCount") AS "shortenedUrls"
            FROM   links
            JOIN   users ON users.id = links."userId"
            WHERE links."userId"=${userId}
            GROUP  BY users.id, links.id;`);
/* 
        const userData = await connection.query(`SELECT users.id, users.name, SUM(links."visitCount") as "visitCount" 
            FROM links JOIN users ON users.id=links."userId"
            WHERE links."userId"=${userId}
            GROUP  BY users.id, links.id;
        `);
 */
/*         const userData = await connection.query(`SELECT JSON_agg(links.id, links."shortUrl", links.url, links."visitCount") FROM links WHERE links."userId"=${userId}
        `); */
/*         const userData = await connection.query(`SELECT json_each(links)
            FROM links
            WHERE links."userId"=${userId}
        `); */

        /* 
        const a = await connection.query(`
            SELECT users.id, users.name, SUM(links."visitCount") as "visitCount", 
                json_agg(
                    SELECT (id, "shortUrl", url, "visitCount") 
                    FROM  links
                    WHERE links."userId"=${userId}
                ) AS "shortenedUrls"
            FROM users
            JOIN links ON users.id = links."userId"
            WHERE links."userId"=${userId}
            GROUP BY users.id, links.id;
        `); */

        res.send(b).status(200);
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}