const e = require("express");

const ErrorHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = "Internal Server Error";

  if (err.name === "Room name already taken") {
    message = "Room name already taken";
    statusCode = 400;
  }

  if (err.name == "Booking not found or doesn't belong to this user") {
    message = "Booking not found or doesn't belong to this user";
    statusCode = 404;
  }

  if (
    err.name == "The room has been booked by someone else at the selected time."
  ) {
    message = "The room has been booked by someone else at the selected time.";
    statusCode = 400;
  }

  if (err.name == "Data Not Found") {
    message = "Data Not Found";
    statusCode = 404;
  }

  if (err.message == "timeerr") {
    message = err.name;
    statusCode = 400;
  }

  if (err.name == "the room has been booked by someone else") {
    message = err.name;
    statusCode = 400;
  }

  if (err.name === "The end time must be later than the booking time.") {
    message = "The end time must be later than the booking time.";
    statusCode = 400;
  }

  if (err.name == "Room has been Booked by someone else") {
    message = "Room has been Booked by someone else";
    statusCode = 400;
  }

  if (err.name == "can't delete booking, room is not booked by anyone") {
    message = "can't delete booking, room is not booked before by anyone";
    statusCode = 400;
  }

  if (err.name === "Room is Booked, Change your Schedule") {
    message = "Room is Booked, Change your Schedule";
    statusCode = 401;
  }

  if (err.name === "SequelizeValidationError") {
    (message = err.errors.map((e) => e.message).join(", ")), (statusCode = 400);
  }

  if (err.name == "UNAUTHENTICATED") {
    message = "UNAUTHENTICATED";
    statusCode = 401;
  }

  if (err.message === "Username is already taken") {
    message = "Username is already taken";
    statusCode = 400;
  }

  if (err.name == "Invalid Login") {
    message = "Invalid Login";
    statusCode = 400;
  }

  if (err.name == "FORBIDDEN") {
    message = "FORBIDDEN";
    statusCode = 403;
  }

  if (err.message == "Username/Password tidak ditemukan") {
    message = "Username/Password tidak ditemukan";
    statusCode = 404;
  }

  if (err.message === "Username/Password tidak ditemukan") {
    message = "Username/Password tidak ditemukan";
    statusCode = 404;
  }

  res.status(statusCode).json({
    message,
    statusCode,
  });
};

module.exports = ErrorHandler;
