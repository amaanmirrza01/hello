import { db } from "../../utils/db";

export default async function handler(req, res) {
  const { userId, brandId } = req.query;

  try {
    // Use parameterized queries to prevent SQL Injection
    const results = await new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO tbl_favorites (userid, brandid) VALUES (?, ?)",
        [userId, brandId],
        (error, results) => {
          if (error) {
            console.error("Error occurred during database query:", error);
            reject(error);
            return;
          }
          resolve(results);
        }
      );
    });

    return res.status(200).json(results);
  } catch (error) {
    console.error("Internal server error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
