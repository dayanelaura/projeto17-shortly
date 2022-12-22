import connection from "../database/database.js";

export async function redirectShortUrl(req, res, next){
    try{
        const link = res.locals.link;
        const visitCount = link.visitCount + 1;
        const id = link.id;

        await connection.query(`UPDATE links SET "visitCount" = ${visitCount} WHERE id=$1`, [id]);

        res.redirect(`/urls/${id}`);
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}