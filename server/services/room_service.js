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

  static async viewroomdetail_service(id) {
    const result = await Room.findOne({
      include: [
        {
          model: Booking,
          required: false,
        },
      ],
      where: { id },
    });

    return result;
  }

  static async getroom(id, page = 1, limit = 10) {
    const offset = (page - 1) * limit;

    const totalRooms = await Room.count();

    const rooms = await Room.findAll({
      offset: offset,
      limit: limit,
      include: [
        {
          model: Booking,
          required: false,
        },
      ],
      order: [["id", "ASC"]],
    });

    const totalPages = Math.ceil(totalRooms / limit);

    return {
      rooms,
      totalRooms,
      totalPages,
      currentPage: page,
    };
  }
}

module.exports = room_service;
