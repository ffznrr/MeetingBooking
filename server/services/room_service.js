const { Room, Booking } = require("../models");

class room_service {
  static async createroom(obj) {
    const findOne = await Room.findOne({ where: { name: obj.name } });
    if (findOne) {
      throw { name: "Room name already taken" };
    }

    const result = await Room.create(obj);

    return result;
  }
}

module.exports = room_service;
