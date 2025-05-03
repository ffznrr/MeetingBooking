const { Booking, Room } = require("../models");

class Booking_service {
  static async createbook(obj) {
    const { book_date, booked_hour, roomId } = obj;
    const find = await Booking.findOne({
      where: { book_date, booked_hour, roomId },
    });
    if (find) throw { name: "Room is Booked, Change your Schedule" };

    const result = await Booking.create(obj);

    return result;
  }

  static async checkstatus_service(id) {
    const result = await Booking.findOne({ where: { id } });
    if (result.room_condition !== "Booked")
      throw { name: "can't delete booking, room is not booked by anyone" };
  }

  static async ViewUser_Service(id) {
    let res = await Booking.findAll({ where: { userId: id } });

    return res;
  }

  static async CancelBookAdmin_Service(id) {}

  static async CancelBookUser_Service(id) {}

  static async ViewAdmin_Service() {
    return await Booking.findAll();
  }

  static async findName(id) {
    const result = await Room.findOne({ where: { id } });
    return result;
  }
}

module.exports = Booking_service;
