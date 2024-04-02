import { db } from "../../utils/db";

export default async function handler(req, res) {
  const { searchTerm } = req.query;

  // Validate searchTerm
  if (!searchTerm) {
    res.status(400).json({ message: "Invalid searchTerm" });
    return;
  }

  try {
    // Use parameterized queries to prevent SQL Injection
    const results = await new Promise((resolve, reject) => {
      db.query(
        `SELECT 'tbl_categories' AS source_table, categoryid AS id, categoryname AS name, NULL AS description
        FROM tbl_categories
        WHERE categoryname LIKE ? OR SOUNDEX(categoryname) = SOUNDEX(?)
        UNION
        SELECT 'tbl_brands' AS source_table, brandid AS id, brandname AS name, branddescription AS description
        FROM tbl_brands
        WHERE brandname LIKE ? OR branddescription LIKE ? OR SOUNDEX(brandname) = SOUNDEX(?) OR SOUNDEX(branddescription) = SOUNDEX(?)
        UNION
        SELECT 'tbl_products' AS source_table, productid AS id, productname AS name, NULL AS description
        FROM tbl_products
        WHERE productname LIKE ?`,
        [
          `%${searchTerm}%`, // for categoryname LIKE
          searchTerm, // for SOUNDEX(categoryname)
          `%${searchTerm}%`, // for brandname LIKE
          `%${searchTerm}%`, // for branddescription LIKE
          searchTerm, // for SOUNDEX(brandname)
          searchTerm, // for SOUNDEX(branddescription)
          `%${searchTerm}%`, // for productname LIKE
        ],
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
