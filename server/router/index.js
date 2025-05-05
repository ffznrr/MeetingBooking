const Authentication = require("../controllers/Controllers_authentication");
const express = require("express");
const UserAuthentication = require("../middleware/UserAuthentication");
const AdminAuthorization = require("../middleware/AdminAuthorization");
const Room = require("../controllers/Controllers_Room");
const Booking = require("../controllers/Controllers_Booking");
const app = express();

app.post("/register", Authentication.register);
app.post("/login", Authentication.login);

app.use(UserAuthentication);
// Room
app.post("/createroom", AdminAuthorization.AdminAuth, Room.createRoom);
app.get("/viewroom", Room.ViewRoom_controllers);
app.get("/viewroomdetail/:id", Room.ViewRoomDetail_controllers);

// Booking
app.post("/createbooking", Booking.controllers_createBook);
app.get("/viewbooking", Booking.controllers_viewbook);
app.put("/cancelbooking/:id", Booking.controllers_cancelBooking);

module.exports = app;
