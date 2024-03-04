const bcrypt = require('bcrypt');
const _ = require('lodash');
const otpGenerator = require('otp-generator');

const { User } = require('../Model/userModel');
const { Otp } = require('../Model/otpModel');

async function generateOtp(number) {
  // 1) Generate OTP
  const unHashedOtp = otpGenerator.generate(6, {
    digits: true,
    alphabets: false,
    upperCase: false,
    specialChars: false
  });

  // 2) Show Otp on the console
  console.log({ unHashedOtp });

  // 3) Create new OTP document
  // 📝 NOTE: We cannot use Model.create(), because it runs document middlewares
  const unSaveOtpDocument = await new Otp({ number, otp: unHashedOtp });

  // 4)TODO: Send unHashed Otp with SMS
  // unSaveOtpDocument.sendOtp(unHashedOtp);

  // 5) Save the hashed OTP
  // 📝 NOTE: Before save document in the DB, We Hash the otp
  await unSaveOtpDocument.save();
}

/////////////////////////////////

exports.signupOpt = async (req, res) => {
  try {
    // 1) Check if user already exists
    const user = await User.findOne({ number: req.body.number });
    if (user) return res.status(400).send('کاربر قبلا ثبت نام کرده است!');a

    // 2) Generate Otp Document
    await generateOtp(req.body.number);

    // 3) Response
    return res.status(200).json({
      status: 'success',
      message: 'رمز یکبار مصرف با موفقیت ارسال شد!'
    });
  } catch (error) {
    console.error('Error during signup:', error);
    return res.status(500).send('خطای سرور، لطفا دوباره امتحان کنید!');
  }
};

// exports.loginOpt = async (req, res) => {
//   try {
//     // 1) Check if the user exists
//     const user = await User.findOne({ number: req.body.number });
//     if (!user) return res.status(400).send('کاربری با این شماره وجود ندارد!');

//     // 2) Generate And Send Otp with SMS
//     await generateOtp(req.body.number);

//     // 3) Response
//     return res.status(200).json({
//       status: 'success',
//       message: 'رمز یکبار مصرف با موفقیت ارسال شد!'
//     });
//   } catch (error) {
//     console.error('Error during signup:', error);
//     return res.status(500).send('خطای سرور، لطفا دوباره امتحان کنید!');
//   }
// };

exports.verifyOtp = async (req, res) => {
  try {
    // 1) Find the OTP holder by their number
    const otpHolder = await Otp.find({ number: req.body.number });
    if (otpHolder.length === 0)
      return res.status(400).send('شما از یک رمز عبور یک بار مصرف منقضی شده استفاده می کنید!');

    // 2) Get the latest OTP for the user
    const rightOtpFind = otpHolder[otpHolder.length - 1];

    // 3) Compare the provided OTP with the stored OTP
    const validUser = await bcrypt.compare(req.body.otp, rightOtpFind.otp);

    // 4) If OTP is valid and belongs to the correct user, proceed with user creation
    if (rightOtpFind.number === req.body.number && validUser) {
      const user = await User.create(_.pick(req.body, ['number']));
      const token = user.generateJWT();
      const result = await user.save();
      // Delete all OTPs associated with the verified number
      await Otp.deleteMany({ number: rightOtpFind.number });

      return res.status(200).json({
        status: 'success',
        token,
        message: 'کاربر با موفقیت ثبت نام کرد!',
        data: result
      });
    } else {
      // If OTP is invalid or doesn't match the user's number, send error response
      return res.status(400).send('رمز یکبار مصرف شما اشتباه بود!');
    }
  } catch (error) {
    console.error('Error during signup:', error);
    return res.status(500).send('خطای سرور، لطفا دوباره امتحان کنید!');
  }
};
