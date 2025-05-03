const User_Service = require("../services/user_service");

class Authentication {
  static async register(req, res, next) {
    try {
      const { username, password } = req.body;
      await User_Service.post({ username, password });
      res
        .status(201)
        .json({ message: "Success Create User", status_code: 200 });
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const { username, password } = req.body;
      const result = await User_Service.login({ username, password });
      res.status(200).json({
        access_token: result,
        status: 200,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Authentication;
