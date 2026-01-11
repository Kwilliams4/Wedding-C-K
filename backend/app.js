const express = require("express");
const http = require("http");
const port = 3000;
const app = express();
const server = http.createServer(app);
const errorHandler = require("./middleware/errorHandler");

app.use(express.json());

// Rutas
app.use("/guests", require("./routes/guests"));
app.use("/health", require("./routes/health"));

// Manejo de errores
app.use(errorHandler);

server.listen(port, "0.0.0.0", () => {
  console.log(`Servidor escuchando en puerto ${port}`);
});
