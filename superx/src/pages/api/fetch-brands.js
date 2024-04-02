import { db } from "../../utils/db";

export default async function handler(req, res) {
  const { categoryId } = req.query;

  // Validate categoryId
  if (!categoryId || isNaN(categoryId)) {
    res.status(400).json({ message: "Invalid categoryId" });
    return;
  }

  try {
    // Use parameterized queries to prevent SQL Injection
    const results = await new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM tbl_brands WHERE categoryid = ?`,
        [categoryId],
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
