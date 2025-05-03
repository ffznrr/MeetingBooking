"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Booking.belongsTo(models.User, {
        foreignKey: "userId",
      });
      Booking.belongsTo(models.Room, {
        foreignKey: "roomId",
      });
    }
  }
  Booking.init(
    {
      book_date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: {
            msg: "booked Date Is Required",
          },
          notEmpty: {
            msg: "booked Date Is Required",
          },
        },
      },
      booked_hour: {
        type: DataTypes.TIME,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Booked hour is required",
          },
          notEmpty: {
            msg: "Booked hour is required",
          },
        },
      },
      booked_hour_end: {
        type: DataTypes.TIME,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Booked hour end is required",
          },
          notEmpty: {
            msg: "Booked hour end is required",
          },
        },
      },
      room_condition: {
        type: DataTypes.ENUM("Booked", "Canceled"),
        defaultValue: "Booked",
        allowNull: false,
        validate: {
          notNull: {
            msg: "Room Condition Is Required",
          },
          notEmpty: {
            msg: "Room Condition Is Required",
          },
        },
      },
      roomId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Room ID Is Required",
          },
          notEmpty: {
            msg: "Room ID Is Required",
          },
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "User Id Is Required",
          },
          notEmpty: {
            msg: "User Id Is Required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Booking",
    }
  );
  return Booking;
};
