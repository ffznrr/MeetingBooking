const { Booking, Room, Sequelize } = require("../models");

class Booking_service {
  static async createbook(obj) {
    let { book_date, booked_hour, roomId, booked_hour_end, userId } = obj;
    let booked_hour_split = booked_hour.split(":");
    let booked_hour_end_split = booked_hour_end.split(":");
    if (booked_hour_end_split[0] < booked_hour_split[0]) {
      throw { name: "The end time must be later than the booking time." };
    } else if (booked_hour_end_split[0] == booked_hour_split[0]) {
      if (booked_hour_end_split[1] <= booked_hour_split[1]) {
        throw { name: "The end time must be later than the booking time." };
      }
    }
    const overlappingBooking = await Booking.findOne({
      where: {
        roomId,
        book_date,
      },
    });

    if (overlappingBooking) {
      let overbookedhour = overlappingBooking.booked_hour.split(":");
      let overbookedhourend = overlappingBooking.booked_hour_end.split(":");

      if (
        booked_hour_split[0] <= overbookedhourend[0] &&
        booked_hour_split[0] >= overbookedhour[0]
      ) {
        throw { name: "the room has been booked by someone else" };
      } else if (
        booked_hour_end_split[0] <= overbookedhourend[0] &&
        booked_hour_end_split[0] >= overbookedhour[0]
      ) {
        throw {
          name: `you can end your session between ${overbookedhour[0]} o'clock and ${overbookedhourend[0]} o'clock`,
          message: "timeerr",
        };
      }
    }

    const result = await Booking.create({
      book_date,
      booked_hour,
      roomId,
      booked_hour_end,
      userId,
    });

    return result;
  }

  static async checkstatus_service(id) {
    const result = await Booking.findOne({ where: { id } });
    if (!result) throw { name: "Data Not Found" };
  }

  static async ViewUser_Service(page = 1, limit = 10, userId) {
    const offset = (page - 1) * limit;

    const bookings = await Booking.findAll({
      where: { userId: userId },
      offset: offset,
      limit: limit,
      include: [
        {
          model: Room,
          required: true,
        },
      ],
    });

    const totalBookings = await Booking.count({
      where: { userId: userId },
    });

    const totalPages = Math.ceil(totalBookings / limit);

    return {
      bookings,
      totalBookings,
      totalPages,
      currentPage: page,
    };
  }

  static async CancelBookAdmin_Service(id) {
    const findOne = await Booking.findOne({ where: { id } });
    const result = await Booking.update(
      {
        room_condition:
          findOne.room_condition == "Booked" ? "Canceled" : "Booked",
      },
      { where: { id } }
    );
    return result;
  }

  static async CancelBookUser_Service(id, userId) {
    const findOne = await Booking.findOne({ where: { id } });

    if (findOne.userId !== userId) {
      throw { name: "UNAUTHENTICATED" };
    }
  }

  static async ViewAdmin_Service(page = 1, limit = 10) {
    const offset = (page - 1) * limit;

    const bookings = await Booking.findAll({
      offset: offset,
      limit: limit,
    });

    const totalBookings = await Booking.count();

    const totalPages = Math.ceil(totalBookings / limit);

    return {
      bookings,
      totalBookings,
      totalPages,
      currentPage: page,
    };
  }

  static async findName(id) {
    const result = await Room.findOne({ where: { id } });
    return result;
  }
}

module.exports = Booking_service;
