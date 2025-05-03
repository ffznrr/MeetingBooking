const Booking_service = require("../services/booking_service");

class Booking {
  static async controllers_createBook(req, res, next) {
    try {
      const { id } = req.additionalData;
      const { book_date, booked_hour, roomId } = req.body;

      const [_, findRoomName] = await Promise.all([
        Booking_service.createbook({
          book_date,
          booked_hour,
          roomId,
          userId: id,
        }),
        Booking_service.findName(roomId),
      ]);
      res.status(200).json({
        message: `You have just booked ${findRoomName.name} room on ${book_date} for the ${booked_hour} session.`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async controllers_cancelBooking(req, res, next) {
    try {
      const { role } = req.additionalData;
      const { id } = req.params;

      const checkStatus = await Booking_service.checkstatus_service(id);

      let result;
      // if(role == "User"){
      //  result = await Booking_service.CancelBookUser_Service
      // }else{
      //   result = await Booking_service.CancelBookAdmin_Service
      // }
    } catch (error) {
      next(error);
    }
  }

  static async controllers_viewbook(req, res, next) {
    try {
      const { id, role } = req.additionalData;
      let result;
      if (role == "User") {
        result = await Booking_service.ViewUser_Service(id);
      } else {
        result = await Booking_service.ViewAdmin_Service();
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
