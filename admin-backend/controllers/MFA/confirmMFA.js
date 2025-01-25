// const Admin = require("../../models/Admin");
// const { authenticator } = require("otplib");

const { authenticator } = require("otplib");
const Admin = require("../../models/Admin");

// exports.confirmMFA = async (req, res) => {
//   try {
//     const { email, token } = req.body;

//     // Validate input
//     if (!email || !token) {
//       return res.status(400).json({
//         success: false,
//         message: "Email and token are required.",
//       });
//     }

//     // Find the user
//     const user = await Admin.findOne({ email });
//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found.",
//       });
//     }

//     // Verify TOTP
//     const isTokenValid = authenticator.verify({ token, secret: user.mfaSecret });
//     if (!isTokenValid) {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid token. Please try again.",
//       });
//     }

//     // Enable MFA
//     if (!user.mfaEnabled) {
//       user.mfaEnabled = true;
//       await user.save();
//     }

//     res.status(200).json({
//       success: true,
//       message: "MFA setup successfully!",
//     });
//   } catch (err) {
//     console.error("Error confirming MFA:", err);
//     res.status(500).json({
//       success: false,
//       message: `Internal server error: ${err.message}`,
//     });
//   }
// };









exports.confirmMFA = async (req, res) => {
  try {
    const { email, token } = req.body;

    // Validate input
    if (!email || !token) {
      return res.status(400).json({
        success: false,
        message: "Email and MFA token are required.",
      });
    }

    // Find the admin
    const user = await Admin.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Admin not found.",
      });
    }

    // Verify the MFA token
    const isTokenValid = authenticator.verify({ token, secret: user.mfaSecret });
    if (!isTokenValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid MFA token. Please try again.",
      });
    }

    // Enable MFA if not already enabled
    if (!user.mfaEnabled) {
      user.mfaEnabled = true;
      await user.save();
    }

    res.status(200).json({
      success: true,
      mfaEnabled: user.mfaEnabled,
      message: "MFA has been successfully set up.",
    });
  } catch (err) {
    console.error("Error confirming MFA:", err);
    res.status(500).json({
      success: false,
      message: `An error occurred during MFA setup: ${err.message}`,
    });
  }
};
