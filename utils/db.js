const mongoose = require('mongoose');

class Database {
  constructor() {
    if (Database.instance) return Database.instance;
    Database.instance = this;
  }

  async connect() {
    if (this.connection) return this.connection;
    this.connection = await mongoose.connect(process.env.MONGO_URI);
    return this.connection;
  }
}

module.exports = new Database();

