import connection from "../database/database.js";

export async function showRanking(req, res){
    try {
        const ranking = await connection.query(`
            SELECT users.id, users.name, COUNT("userId") AS "linksCount",
            SUM("visitCount") AS "visitCount" FROM users JOIN links
            ON users.id=links."userId" GROUP BY users.id ORDER BY "visitCount" DESC LIMIT 10
        `);

        res.send(ranking.rows).status(200);
    } catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}