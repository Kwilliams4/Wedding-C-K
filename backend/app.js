const express = require("express");
const db = require("./db");
const http = require("http");
const port = 3000;
const app = express();
const server = http.createServer(app);

app.use(express.json());

// Rutas
app.use("/guests", require("./routes/routes"));

// Health check endpoint
app.get("/health", async (req, res) => {
  try {
    await db.query("SELECT 1");
    res
      .status(200)
      .json({ message: "Servidor y DB funcionando correctamente" });
  } catch (err) {
    res.status(500).json({ message: "DB caída", error: err.message });
  }
});

server.listen(port, "0.0.0.0", () => {
  console.log(`Servidor escuchando en puerto ${port}`);
});
