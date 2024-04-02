import mysql from "mysql";

export const db = mysql.createConnection(process.env["DB_URL"]);

// Connect to MySQL
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connected to MySQL database");
});

export default db;
