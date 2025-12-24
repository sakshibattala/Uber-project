const socketIo = require("socket.io");
const userModel = require("./models/user.model");
const captainModel = require("./models/captain.model");

let io;

const initializeSocketIo = (server) => {
  io = socketIo(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    socket.on("join", async (data) => {
      const { id, userType } = data;

      console.log(`${id} connected as ${userType}`);

      if (userType === "user") {
        await userModel.findByIdAndUpdate(id, { socketId: socket.id });
      } else if (userType === "captain") {
        await captainModel.findByIdAndUpdate(id, { socketId: socket.id });
      }
    });

    socket.on("update-captain-location", async (data) => {
      const { id, location } = data;

      if (!location || !location.ltd || !location.lng)
        return socket.emit("error", { message: "Invalid location data" });

      await captainModel.findByIdAndUpdate(id, {
        location: {
          type: "Point",
          coordinates: [location.lng, location.ltd],
        },
      });
    });

    socket.on("disconnect", () => {
      console.log(`client disconnected on socket id ${socket.id}`);
    });
  });
};

const sendMessageToSocketId = (socketId, messageObject) => {
  if (io) {
    io.to(socketId).emit(messageObject.event, messageObject.data);
  } else {
    console.log("socket io is not defined");
  }
};

module.exports = { initializeSocketIo, sendMessageToSocketId };
