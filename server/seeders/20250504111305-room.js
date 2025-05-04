"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    return queryInterface.bulkInsert("Rooms", [
      {
        name: "Lavender",
        floor: 1,
        detail: "Papan Tulis, Proyektor, Meja, Spidol ,Kapasitas 6 Orang",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Liquid",
        floor: 1,
        detail: "Papan Tulis, Proyektor, Meja, Spidol ,Kapasitas 10 Orang",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Pacquiao",
        floor: 2,
        detail: "Papan Tulis, Proyektor, Meja, Spidol ,Kapasitas 12 Orang",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Flora",
        floor: 2,
        detail: "Papan Tulis, Proyektor, Meja, Spidol ,Kapasitas 20 Orang",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("Rooms", null, {});
  },
};
