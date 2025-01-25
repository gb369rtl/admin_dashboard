// const { authenticator } = require('otplib');
// const qrcode = require('qrcode');

// exports.generateSecret = (userEmail) => {
//   const secret = authenticator.generateSecret(); // Generate a unique secret key
//   const otpauth = authenticator.keyuri(userEmail, 'Admin_Dashboard_App', secret);

//   // Optional: Generate a QR code for the user
//   qrcode.toDataURL(otpauth, (err, imageUrl) => {
//     if (err) {
//       console.error('Error generating QR code:', err);
//     } else {
//       console.log('Scan this QR code with your authenticator app:', imageUrl);
//     }
//   });

//   return {secret, otpauth};
// }



// const { authenticator } = require('otplib');
// const QRCode = require('qrcode');
// const Admin = require('../../models/Admin');

// exports.setupMFA = async (req, res) => {
//     try {
//         const { email } = req.body;

//         // Find the user
//         const user = await Admin.findOne({email});
//         if (!user) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'User not found',
//             });
//         }

//         // Generate TOTP Secret
//         const secret = authenticator.generateSecret();
//         user.mfaSecret = secret;
//         // user.mfaEnabled = false; // User needs to confirm
//         await user.save();

//         // Generate QR Code
//         const otpAuthUrl = authenticator.keyuri(user.email, 'YourAppName', secret);
//         const qrCode = await QRCode.toDataURL(otpAuthUrl);

//         res.status(200).json({
//             success: true,
//             message: 'MFA setup initiated. Scan the QR code to complete.',
//             qrCode, // Send QR code for UI
//             secret, // Send secret if needed for manual entry
//         });
//     } catch (err) {
//         res.status(500).json({
//             success: false,
//             message: `Error setting up MFA: ${err.message}`,
//         });
//     }
// };









const { authenticator } = require('otplib');
const QRCode = require('qrcode');
const Admin = require('../../models/Admin');

exports.setupMFA = async (req, res) => {
  try {
    const { email } = req.body;

    // Validate input
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required.',
      });
    }

    // Find the admin
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found.',
      });
    }

    // Generate a new TOTP secret
    const secret = authenticator.generateSecret();
    admin.mfaSecret = secret;
    await admin.save();

    // Generate OTP Auth URL and QR Code
    const otpAuthUrl = authenticator.keyuri(email, 'YourAppName', secret);
    const qrCode = await QRCode.toDataURL(otpAuthUrl);

    res.status(200).json({
      success: true,
      message: 'MFA setup initiated. Scan the QR code to complete setup.',
      qrCode, // Send QR code for frontend display
      secret, // Include secret for manual entry (if needed)
    });
  } catch (err) {
    console.error('Error during MFA setup:', err);
    res.status(500).json({
      success: false,
      message: `Error setting up MFA: ${err.message}`,
    });
  }
};
