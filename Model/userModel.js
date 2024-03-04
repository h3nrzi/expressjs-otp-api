const { Schema, model } = require('mongoose');
const jwt = require('jsonwebtoken');

const { JWT_SECRET_KEY, JWT_EXPIRED } = process.env;

const userSchema = Schema(
  {
    number: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

userSchema.methods.generateJWT = function () {
  const token = jwt.sign({ _id: this._id, number: this.number }, JWT_SECRET_KEY, {
    expiresIn: JWT_EXPIRED
  });
  return token;
};

module.exports.User = model('User', userSchema);
