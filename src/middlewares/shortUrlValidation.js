import connection from "../database/database.js";

export async function shortUrlValidation(req, res, next){
    const { shortUrl } = req.params;
    try{
        const link = await connection.query(`SELECT * FROM links WHERE "shortUrl"=$1`, [shortUrl]);
    
        if (link.rows[0] === undefined)
            return res.sendStatus(404);
        
        res.locals.link = link.rows[0];
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
    next();
}