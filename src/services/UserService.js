const db = require("../db");

class UserService {
  async addUser(user) {
    return await (await db("users").insert(user).returning("*"))[0];
  }
  async getUser(login) {
    return await db("users").where({ login }).first();
  }
}

module.exports = new UserService();
