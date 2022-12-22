import connection from "../database/database.js";
import bcrypt from "bcrypt";

export async function signUp(req, res) {
  const { name, email, password } = res.locals.user;
  const passwordHash = bcrypt.hashSync(password, 10);

  try {
    await connection.query(`INSERT INTO users (name, email, password) VALUES ('${name}', '${email}', '${passwordHash}')`);
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}