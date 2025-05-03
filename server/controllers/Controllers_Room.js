const room_service = require("../services/room_service");

class Room {
  static async createRoom(req, res, next) {
    try {
      const { name, floor, detail } = req.body;

      const result = await room_service.createroom({ name, floor, detail });
      res.status(201).json({ message: result, statusCode: 201 });
    } catch (error) {
      next(error);
    }
  }

  static async getRoom(req, res, next) {
    try {
      const { id, role } = req.additionalData;
      let result;

      if (role == "User") {
        result = room_service.viewroomuser({ id, role });
      } else {
        result = room_service.viewroomadmin({ id, role });
      }

      res.json(200).json({ data: result, statusCode: 200 });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Room;
