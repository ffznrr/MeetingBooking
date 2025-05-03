const { verify } = require("../helper/jwt");
const { User } = require("../models");

const UserAuthentication = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) throw { name: "UNAUTHENTICATED" };
    const token = authorization.split(" ")[1];
    if (!token) throw { name: "UNAUTHENTICATED" };

    const payload = verify(token);
    const foundUser = await User.findByPk(payload.id);

    if (!foundUser) throw { name: "UNAUTHENTICATED" };
    req.additionalData = {
      id: foundUser.id,
      username: foundUser.username,
      role: foundUser.role,
    };

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = UserAuthentication;
