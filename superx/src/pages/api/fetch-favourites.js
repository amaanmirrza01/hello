import { db } from "../../utils/db";

export default async function handler(req, res) {
  const { userId } = req.query;

  try {
    // Validate userId
    if (!userId || isNaN(userId)) {
      res.status(400).json({ message: "Invalid user id" });
      return;
    }

    // Use parameterized queries to prevent SQL Injection
    const results = await new Promise((resolve, reject) => {
      db.query(
        `SELECT f.*, b.* 
         FROM tbl_favorites f
         JOIN tbl_brands b ON f.brandid = b.brandid
         WHERE f.userid = ?`,
        [userId],
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
