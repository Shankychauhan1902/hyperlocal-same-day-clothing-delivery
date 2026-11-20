import { pool } from "../config/db.js";

export async function listProducts(req, res) {
  const { category } = req.query;
  try {
    const params = [];
    let filter =
      "p.approval_status = 'approved' AND s.is_approved = TRUE AND s.is_open = TRUE AND ps.is_available = TRUE AND ps.stock_qty > 0";
    if (typeof category === "string" && category.length <= 80) {
      filter += " AND p.category = ?";
      params.push(category);
    }
    const [rows] = await pool.execute(
      `SELECT p.product_id, p.title, p.category, p.price, p.color, p.fit_notes, p.image_url, s.shop_name, s.pincode, ps.size_id, ps.size_label, ps.stock_qty, ps.measurement_inches FROM products p JOIN shops s ON s.shop_id = p.shop_id JOIN product_sizes ps ON ps.product_id = p.product_id WHERE ${filter} ORDER BY p.created_at DESC LIMIT 100`,
      params,
    );
    const byId = new Map();
    for (const row of rows) {
      const { size_id, size_label, stock_qty, measurement_inches, ...product } =
        row;
      const entry = byId.get(row.product_id) || { ...product, sizes: [] };
      entry.sizes.push({ size_id, size_label, stock_qty, measurement_inches });
      byId.set(row.product_id, entry);
    }
    return res.json({ products: [...byId.values()] });
  } catch {
    return res
      .status(503)
      .json({ error: "Catalog is temporarily unavailable." });
  }
}
