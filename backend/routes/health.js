const express = require("express");
const router = express.Router();
const db = require("./db");

router.get("/", async (req, res) => {
  try {
    await db.query("SELECT 1");
    res
      .status(200)
      .json({ message: "Servidor y DB funcionando correctamente" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal Server Error ", error: err.message });
  }
});

module.exports = router;
