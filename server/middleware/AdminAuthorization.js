class AdminAuthorization {
  static async AdminAuth(req, res, next) {
    try {
      const { role } = req.additionalData;

      if (role != "Admin") throw { name: "FORBIDDEN" };
      next();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AdminAuthorization;
