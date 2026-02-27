import { db } from "../db.js";

// CREATE PRODUCT
export const createProduct = async (req, res) => {
  try {
    const { name, price } = req.body;
    const image = req.file ? req.file.filename : null;

    const [result] = await db.execute(
      "INSERT INTO product (name, price, image, student_id) VALUES (?, ?, ?, ?)",
      [name, price, image, req.user.id]
    );

    res.status(201).json({
      message: "Product created",
      productId: result.insertId
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL PRODUCTS (only logged user)
export const getProducts = async (req, res) => {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM product WHERE student_id = ?",
      [req.user.id]
    );

    res.json(rows);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE PRODUCT
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price } = req.body;

    const [result] = await db.execute(
      "UPDATE product SET name = ?, price = ? WHERE id = ? AND student_id = ?",
      [name, price, id, req.user.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product updated" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE PRODUCT
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.execute(
      "DELETE FROM product WHERE id = ? AND student_id = ?",
      [id, req.user.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};