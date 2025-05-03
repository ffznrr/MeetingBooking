const bcrypt = require("bcryptjs");

class Hashing {
  static hash(password) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }

  static comparePass(password, passwordHash) {
    return bcrypt.compareSync(password, passwordHash);
  }
}

module.exports = Hashing;
