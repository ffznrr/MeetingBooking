const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models/index");
const { sign } = require("../helper/jwt");
const { hash } = require("../helper/bcrypt");

beforeAll(async () => {
  await sequelize.queryInterface.bulkInsert("Users", [
    {
      username: "User",
      password: hash("12345"),
      role: "User",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
});

afterAll(async () => {
  await sequelize.queryInterface.bulkDelete("Users", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});

describe("POST /login", () => {
  describe("POST /login - succeed", () => {
    it("should be return an object with access_token", async () => {
      const body = { username: "User", password: "12345" };
      const response = await request(app).post("/login").send(body);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("access_token", expect.any(String));
    });
  });

  describe("POST /login - succeed", () => {
    it("should be return an object with access_token", async () => {
      const body = { username: "tidak ada", password: "12345" };
      const response = await request(app).post("/login").send(body);

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty(
        "message",
        "Username/Password tidak ditemukan"
      );
    });
  });
});
