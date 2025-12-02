const mongoose = require("mongoose");
const port = process.env.DB_CONNECT;

function connectToDb() {
  mongoose
    .connect(port)
    .then(() => console.log("connected to db"))
    .catch((err) => console.log(err));
}

module.exports = connectToDb;