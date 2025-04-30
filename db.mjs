//4.30

import mysql from "mysql2";
import { config } from "./config.mjs";

const pool = mysql.createPool({
  host: config.db.host,
  user: config.db.user,
  database: config.db.database,
  password: config.db.password,
});

// mysql.createConnection 그때그떄 mysql에 ㅓㅂ속, 허지만 느림

export const db = pool.promise();
