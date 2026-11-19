import { pool } from '../config/db.js';

export async function checkZone(req, res) {
  const { pincode } = req.params;
  if (!/^\d{6}$/.test(pincode)) return res.status(400).json({ error: 'Enter a valid 6-digit pincode.' });
  try {
    const [rows] = await pool.execute(
      'SELECT pincode, area_name, delivery_fee, min_order_amount FROM serviceable_pincodes WHERE pincode = ? AND is_active = TRUE',
      [pincode],
    );
    if (!rows.length) return res.json({ serviceable: false });
    return res.json({ serviceable: true, ...rows[0] });
  } catch {
    return res.status(503).json({ error: 'Serviceability is temporarily unavailable.' });
  }
}
