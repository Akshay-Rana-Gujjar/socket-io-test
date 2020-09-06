var app = require("express")(),
  server = require("http").createServer(app),
  io = require("socket.io").listen(server),
  dotenv = require("dotenv").config(),
  path = require("path"),
  PORT = process.env.PORT;

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "view"));


app.get("/", function (req, res) {
  return res.render("index");

});

io.sockets.on("connection", function (socket) {

  console.log("Socket id =", socket.id);

  socket.on("sent", function (data) {
    console.log("data =", data);
    io.sockets.emit("receive", data);
  });

});


server.listen(PORT, function () {
  console.log(`Running@${PORT} ...`);
});
