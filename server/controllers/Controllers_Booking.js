const Booking_service = require("../services/booking_service");

class Booking {
  static async controllers_createBook(req, res, next) {
    try {
      const { id } = req.additionalData;
      const { book_date, booked_hour, booked_hour_end, roomId } = req.body;

      await Booking_service.createbook({
        book_date,
        booked_hour,
        booked_hour_end,
        roomId,
        userId: id,
      });

      res.status(200).json({
        message: `You have just booked room on ${book_date} for the ${booked_hour} session.`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async controllers_cancelBooking(req, res, next) {
    try {
      const { role } = req.additionalData;
      const { id } = req.params;
      const userId = req.additionalData.id;

      await Booking_service.checkstatus_service(id);

      let result;
      if (role == "User") {
        result = await Booking_service.CancelBookUser_Service(id, userId);
      } else {
        result = await Booking_service.CancelBookAdmin_Service(id);
      }

      res
        .status(200)
        .json({ message: "Status Sukses di ganti", statusCode: 200 });
    } catch (error) {
      next(error);
    }
  }

  static async controllers_viewbook(req, res, next) {
    try {
      const { id, role } = req.additionalData;
      const { page = 1, limit = 6 } = req.query;
      let result;
      if (role == "User") {
        result = await Booking_service.ViewUser_Service(page, limit, id);
      } else {
        result = await Booking_service.ViewAdmin_Service(page, limit);
      }

      if (result.length < 1) {
        throw { name: "Data Not Found", status: 404 };
      }

      res.status(200).json({ message: result, statusCode: 200 });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Booking;
