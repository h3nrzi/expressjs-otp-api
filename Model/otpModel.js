const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const axios = require('axios');

const otpSchema = Schema(
  {
    number: {
      type: String,
      required: true
    },
    otp: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      index: { expires: 300 } // After 5min it deleted automatically from the database
    }
  },
  { timestamps: true }
);

// SEND THE OTP WITH SMS
otpSchema.methods.sendOtp = function (unHashedOtp) {
  // NOTE: we cannot use this.opt, because it already has became hashed
  const { number } = this;

  const data = JSON.stringify({
    mobile: number,
    templateId: '100000',
    parameters: [{ name: 'Code', value: unHashedOtp }]
  });

  const config = {
    method: 'post',
    url: 'https://api.sms.ir/v1/send/verify',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'text/plain',
      'x-api-key': 'zvhhzzfkmPYmLDqgkJLaU83KQR8aQj4ySe8lojdUq56b0ZJ2BnQwh43qNxFAmhXU'
    },
    data: data
  };

  axios(config)
    .then((res) => console.log(JSON.stringify(res.data)))
    .catch((err) => console.log(err));
};

// HASH OTP BEFORE SAVE
otpSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.otp = await bcrypt.hash(this.otp, salt);
  next();
});

module.exports.Otp = model('Otp', otpSchema);
