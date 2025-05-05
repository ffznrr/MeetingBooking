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

  static async ViewRoomDetail_controllers(req, res, next) {
    try {
      const { id } = req.params;
      const result = await room_service.viewroomdetail_service(id);
      if (result.length < 1) throw { name: "Data Not Found" };
      res.status(200).json({ message: result, statusCode: 200 });
    } catch (error) {
      next(error);
    }
  }

  static async ViewRoom_controllers(req, res, next) {
    try {
      const { id } = req.additionalData;
      const { page = 1, limit = 10 } = req.query;
      const result = await room_service.getroom(id, page, limit);
      if (result.rooms.length < 1) {
        throw { name: "Data Not Found" };
      }

      return res.json({
        rooms: result.rooms,
        totalRooms: result.totalRooms,
        totalPages: result.totalPages,
        currentPage: result.currentPage,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Room;
