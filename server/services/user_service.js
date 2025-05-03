const Hashing = require("../helper/bcrypt");
const { sign } = require("../helper/jwt");
const { User } = require("../models");

class User_Service {
  static async post(obj) {
    const user = await User.findOne({ where: { username: obj.username } });

    if (user) {
      const error = new Error("Username is already taken");
      error.statusCode = 400;
      throw error;
    }

    const result = await User.create(obj);

    return result;
  }

  static async login(obj) {
    const user = await User.findOne({ where: { username: obj.username } });
    if (!user) {
      const error = new Error("Username/Password tidak ditemukan");
      error.statusCode = 404;
      throw error;
    }
    if (!Hashing.comparePass(obj.password, user.password)) {
      throw { name: "Invalid Login" };
    }

    const payload = {
      id: user.id,
      role: user.role,
    };

    return sign(payload);
  }
}

module.exports = User_Service;
