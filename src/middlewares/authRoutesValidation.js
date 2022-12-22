import connection from "../database/database.js";

export async function authRoutesValidation(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");
    if(!token)
      return res.sendStatus(401);
  
    try{
      const user = await connection.query(`SELECT "userId" FROM bearers WHERE token=$1`, [token]);
      
      if(user.rows[0] === undefined)
        return res.sendStatus(401);

      const userId = user.rows[0].userId;      
      res.locals.userId = userId;
    }catch(err) {
      console.log(err);
      return res.sendStatus(500);
    }
    
    next();
}