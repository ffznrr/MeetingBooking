const { Booking, Room, Sequelize } = require("../models");

class Booking_service {
  static async createbook(obj) {
    let { book_date, booked_hour, roomId, booked_hour_end, userId } = obj;

    // Split the start and end time
    let booked_hour_split = booked_hour.split(":");
    let booked_hour_end_split = booked_hour_end.split(":");

    // Check if the end time is later than the start time
    if (
      Number(booked_hour_end_split[0]) < Number(booked_hour_split[0]) ||
      (Number(booked_hour_end_split[0]) === Number(booked_hour_split[0]) &&
        Number(booked_hour_end_split[1]) <= Number(booked_hour_split[1]))
    ) {
      throw { name: "The end time must be later than the booking time." };
    }

    // Check for overlapping bookings for the same date and room
    const overlappingBooking = await Booking.findOne({
      where: {
        roomId,
        book_date,
      },
    });

    if (overlappingBooking) {
      let overbookedhour_split = overlappingBooking.booked_hour.split(":");
      let overbookedhour_end_split =
        overlappingBooking.booked_hour_end.split(":");

      // Convert all times into minutes for easier comparison
      let booked_start_minutes =
        Number(booked_hour_split[0]) * 60 + Number(booked_hour_split[1]);
      let booked_end_minutes =
        Number(booked_hour_end_split[0]) * 60 +
        Number(booked_hour_end_split[1]);
      let overbooked_start_minutes =
        Number(overbookedhour_split[0]) * 60 + Number(overbookedhour_split[1]);
      let overbooked_end_minutes =
        Number(overbookedhour_end_split[0]) * 60 +
        Number(overbookedhour_end_split[1]);

      // Check if the booking time overlaps with an existing booking
      if (
        booked_start_minutes < overbooked_end_minutes &&
        booked_end_minutes > overbooked_start_minutes &&
        overlappingBooking.room_condition !== "Canceled"
      ) {
        throw {
          name: "The room has been booked by someone else at the selected time.",
        };
      }
    }

    // Create the booking if no overlap is found
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
    if (!findOne) throw { name: "Data Not Found" };
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
    const booking = await Booking.findOne({
      where: { id, userId },
    });

    if (!booking) {
      throw new Error("Booking not found or doesn't belong to this user");
    }

    const updatedBooking = await booking.update({
      room_condition: "Canceled",
    });

    if (!updatedBooking) {
      throw new Error("Booking not found or doesn't belong to this user");
    }
  }

  static async ViewAdmin_Service(page = 1, limit = 6) {
    const offset = (page - 1) * limit;

    const bookings = await Booking.findAll({
      offset: offset,
      limit: limit,
      include: [
        {
          model: Room,
        },
      ],
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
