const express = require('express');
const app = express(); // Inicializamos express
const http = require('http').Server(app); // Le pasamaos la constante app que creamos arriba
const io = require('socket.io')(http); // Le pasamos la constante http

app.use(express.static('./public')); // Indicamos que queremos cargar los archivos estaticos que se encuentran en dicha carpeta
io.on("connection", socket => {
  // either with send()
  socket.send("Hello!");

  // or with emit() and custom event names
  socket.emit("greetings", "Hey!", { "ms": "jane" }, Buffer.from([4, 3, 3, 1]));

  // handle the event sent with socket.send()
  socket.on("message", (data) => {
    console.log(data);
  });

  // handle the event sent with socket.emit()
  socket.on("salutations", (elem1, elem2, elem3) => {
    console.log(elem1, elem2, elem3);
  });
});

http.listen(8080, function () {
  console.log('Server started!');
});

