const http = require("http");
const app = require("./app.js");
const port = process.env.PORT || 3000;
const {initializeSocketIo} = require("./socket.js")

const server = http.createServer(app);

//websocket initialization
initializeSocketIo(server);

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
