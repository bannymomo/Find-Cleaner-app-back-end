const mongoose = require("mongoose");
function connectToDB() {
  const { DB_HOST, DB_PORT, DB_DATABASE } = process.env;
  const connectionString = `mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`;
  return mongoose.connect(connectionString, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });
}

module.exports = connectToDB;
