const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
  console.log("Novo cliente conectado");

  // Recebe a imagem do aluno e envia ao professor
  socket.on("frame", (data) => {
    io.emit("frame", data);
  });

  socket.on("disconnect", () => {
    console.log("Cliente desconectado");
  });
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
