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
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Room;
