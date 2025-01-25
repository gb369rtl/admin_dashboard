
const otpGenerator = require("otp-generator");

exports.generateOTP = () => {
    try{
      // generate otp
      var otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      return otp;
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: `Error Occured in Generating OTP ${err.message}`,
      });
    }
  };