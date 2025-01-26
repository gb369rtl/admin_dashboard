const mongoose = require("mongoose");
const Admin = require('../models/Admin');
const OTP = require('../models/OTP');
const { generateOTP } = require('../utils/otpUtils');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { authenticator } = require('otplib');
const mailSender = require("../utils/mailSender"); 
const roles = require("../config/roles");


exports.sendOTP = async (req, res) => {
    try {
      const { email } = req.body;
      const checkUserPresent = await Admin.findOne({ email });
      //Check if user already registered 
      if (checkUserPresent) {
        return res.status(401).json({
          success: false,
          message: "User already registered",
        });
      }
      //If not then generate otp
      var otp = generateOTP();
      //Check if OTP is Unique or not
      let result = await OTP.findOne({ otp: otp });
      while (result) {
        otp = generateOTP();
        result = await OTP.findOne({ otp: otp });
      }
      const otpPayload = { email, otp };
      //OTP entry in DB
      const otpBody = OTP.create(otpPayload);
      res.status(200).json({
        success: true,
        message: "OTP sent Sucessfully",
        otp:otp
      });
    } 
    catch (err) {
      return res.status(500).json({
        success: false,
        message: `Error Occured in Sending OTP ${err.message}`,
      });
    }
};

// exports.createAdmin = async (req, res) => {
//     try {
//       const {
//         name,
//         email,
//         password,
//         confirmPassword,
//         otp,
//         role,
//       } = req.body;
//       //Validate if everything came in req body or not
//       if (
//         !name ||
//         !email ||
//         !confirmPassword ||
//         !password ||
//         !otp ||
//         !role
//       ) {
//         return res.status(403).json({
//           success: false,
//           message: "All fields are Required",
//         });
//       }
//       //Validate Password
//       // console.log(password);
//       // console.log(confirmPassword);
//       if (password != confirmPassword) {
//         return res.status(400).json({
//           success: false,
//           message: "Both passwords don't match",
//         });
//       }
//       const existingUser = await Admin.findOne({ email });
//       if (existingUser) {
//         return res.status(400).json({
//           success: false,
//           message: `${role} is already Registered`,
//         });
//       }
//       const recentOtp = await OTP.find({ email })
//         .sort({ createdAt: -1 })
//         .limit(1); //To Get the topmost otp after sorting in descending order
//         // console.log(recentOtp[0].otp);
//       if (recentOtp.length == 0) {
//         return res.status(400).json({
//           success: false,
//           message: "OTP not Found",
//         });
//       } else if (otp != recentOtp[0].otp) {
//         return res.status(400).json({
//           success: false,
//           message: "Invalid OTP",
//           otp:`${recentOtp[0].otp}`
//         });
//       }
//       //Hashing Password
//       const hashedPassword = await bcrypt.hash(password, 10);
//       const user = await Admin.create({
//         name,
//         email,
//         password: hashedPassword,
//         role:role,
//         image: `https://api.dicebear.com/5.x/initials/svg?seed=${name}`, //DiceBear api will convert Random Name to RN img
//       });
//       return res.status(200).json({
//         success: true,
//         message: `${role} Registered Sucessfuly`,
//         data:user
//       });
//     } catch (err) {
//       return res.status(400).json({
//         success: false,
//         message: err.message,
//       });
//     }
// };




// exports.loginAdmin = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ success: false, message: 'Enter all fields' });
//     }

//     const user = await Admin.findOne({ email });
//     if (!user || !(await bcrypt.compare(password, user.password))) {
//       return res.status(401).json({ success: false, message: 'Invalid credentials' });
//     }

//     if (user.accountStatus === 'inactive') {
//       return res.status(403).json({ success: false, message: 'Account is inactive' });
//     }

//     if (user.mfaEnabled) {
//       return res.status(200).json({
//         success: true,
//         tempSession: { email: user.email },
//         message: 'MFA required',
//       });
//     }

//     // If MFA is not enabled, directly set the JWT cookie
//     const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '24h' });
//     res.cookie('token', token, { httpOnly: true }).status(200).json({ success: true, message: 'Logged in successfully' });
//   } catch (err) {
//     return res.status(500).json({ success: false, message: `Server error: ${err.message}` });
//   }
// };



// exports.loginAdmin = async (req, res) => {
//   try {
//     const { email, password, token } = req.body;

//     if (!email || !password) {
//       return res.status(403).json({
//         success: false,
//         message: 'Enter all fields',
//       });
//     }

//     const user = await Admin.findOne({ email });
//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: 'User does not exist',
//       });
//     }

//     if (user.accountStatus === 'inactive') {
//       return res.status(403).json({
//         success: false,
//         message: 'Your account is inactive. Please contact the administrator.',
//       });
//     }

//     if (!await bcrypt.compare(password, user.password)) {
//       return res.status(401).json({
//         success: false,
//         message: 'Incorrect Password',
//       });
//     }

//     if (roles[user.role].permissions.mfa && user.mfaEnabled) {
//       return res.status(200).json({
//         success: true,
//         mfaEnabled: user.mfaEnabled,
//         tempSession: { email: user.email },
//         message: 'MFA required',
//       });
//     }

//     // const role = user.role;

//     // // Check MFA settings
//     // if (roles[role]?.permissions?.mfa) {
//     //   if (user.mfaEnabled) {
//     //     // If MFA is enabled, verify the token
//     //     if (!token) {
//     //       return res.status(401).json({
//     //         success: false,
//     //         message: 'MFA token required',
//     //       });
//     //     }

//         // const isTokenValid = authenticator.verify({ token, secret: user.mfaSecret });
//         // if (!isTokenValid) {
//         //   return res.status(401).json({
//         //     success: false,
//         //     message: 'Invalid MFA token',
//         //   });
//         // }
//       // }
//       // } else {
//       //   // If MFA is required but not enabled
//       //   const currentDate = new Date();

//       //   if (role === 'super_admin') {
//       //     return res.status(403).json({
//       //       success: false,
//       //       message: 'MFA is not enabled. Please set it up for enhanced security.',
//       //       action: 'set_mfa',
//       //     });
//       //   }

//       //   if (currentDate > user.mfaDeadline) {
//       //     user.status = 'inactive';
//       //     await user.save();
//       //     return res.status(403).json({
//       //       success: false,
//       //       message: 'Account inactive due to not enabling MFA within the deadline.',
//       //     });
//       //   }

//       //   const daysLeft = Math.ceil((user.mfaDeadline - currentDate) / (1000 * 60 * 60 * 24));
//       //   return res.status(403).json({
//       //     success: false,
//       //     message: `MFA not enabled. You have ${daysLeft} days left to enable MFA.`,
//       //     action: 'set_mfa',
//       //   });
//       // }
//     // }

//     // Generate JWT and set cookies
//     const payload = {
//       email: user.email,
//       id: user._id,
//       role: user.role,
//     };

//     const cookie_token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
//     user.token = cookie_token;
//     user.password = undefined;

//     const options = {
//       expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // Cookie expiry
//       httpOnly: true, // Prevent access to cookies via JavaScript
//       // secure: process.env.NODE_ENV === 'production', // Ensure cookies are only sent over HTTPS in production
//     };

//     res.cookie('token', cookie_token, options).status(200).json({
//       success: true,
//       mfaEnabled: user.mfaEnabled,
//       cookie_token,
//       user,
//       message: `${user.role} Logged In`,
//     });
//   } catch (err) {
//     return res.status(400).json({
//       success: false,
//       message: `Error occurred during login: ${err.message}`,
//     });
//   }
// };

// exports.verifyMFA = async (req, res) => {
//   try {
//     const { email, token } = req.body;
//     const user = await Admin.findOne({ email });

//     console.log(token);
//     console.log(authenticator.verify({ token, secret: user.mfaSecret }));

//     if (!user || !authenticator.verify({ token, secret: user.mfaSecret })) {
//       return res.status(401).json({ success: false, message: 'Invalid MFA token' });
//     }

//     const payload = {
//       email: user.email,
//       id: user._id,
//       role: user.role,
//     };

//     const cookie_token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '25h' });
//     user.token = cookie_token;
//     user.password = undefined;

//     const options = {
//       expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // Cookie expiry
//       httpOnly: true, // Prevent access to cookies via JavaScript
//       // secure: process.env.NODE_ENV === 'production', // Ensure cookies are only sent over HTTPS in production
//     };

//     res.cookie('token', cookie_token, options).status(200).json({
//       success: true,
//       tempSession: { email: user.email },
//       user,
//       message: 'MFA verified, logged in',
//     });

//     // const jwtToken = jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '24h' });
//     // res.cookie('token', jwtToken, { httpOnly: true }).status(200).json({ success: true, message: 'MFA verified, logged in' });
//   } catch (err) {
//     return res.status(500).json({ success: false, message: `Server error: ${err.message}` });
//   }
// };







// exports.loginAdmin = async (req, res) => {
//     try {
//       const { email, password } = req.body;
//       if (!email || !password) {
//         return res.status(403).json({
//           success: false,
//           message: "Enter all fields",
//         });
//       }
//       const user = await Admin.findOne({ email });
//       //If user dont exist
//       if (!user) {
//         return res.status(404).json({
//           success: false,
//           message: "User does not exist",
//         });
//       }
//     //   console.log(user);

//         if (user.accountStatus === 'inactive') {
//             return res.status(403).json({
//                 success: false,
//                 message: 'Your account is inactive. Please contact the administrator.',
//             });
//         }
    
//       if (!await bcrypt.compare(password, user.password)) {
//         return res.status(401).json({
//           success: false,
//           message: `Incorrect Password`,
//         });
//       }

//       const role = await user.role;

//       // console.log(roles[role]);

//       // console.log(roles[role].permissions.mfa)

//     if (roles[role].permissions.mfa) {
//         if (await user.mfaEnabled) {
//             const { token } = req.body; // Get TOTP from request
//             const isTokenValid = authenticator.verify({ token, secret: user.mfaSecret });
    
//             if (!isTokenValid) {
//                 return res.status(401).json({
//                     success: false,
//                     message: 'Invalid TOTP',
//                 });
//             }
//         } else {
//             const currentDate = new Date();
    
//             if (user.role === "super_admin") {
//                 return res.status(403).json({
//                     success: false,
//                     message: 'MFA is not enabled on your account. Please set it up for enhanced security.',
//                     action: 'set_mfa', // Include an actionable field for UI
//                 });
//             }
    
//             // Check if the deadline has passed
//             if (currentDate > user.mfaDeadline) {
//                 // Set account status to inactive
//                 user.status = 'inactive';
//                 await user.save();
    
//                 return res.status(403).json({
//                     success: false,
//                     message: 'Your account has been set to inactive due to not enabling MFA within 15 days.',
//                 });
//             } else {
//                 const daysLeft = Math.ceil((user.mfaDeadline - currentDate) / (1000 * 60 * 60 * 24));
    
//                 return res.status(403).json({
//                     success: false,
//                     message: `MFA not enabled. You have ${daysLeft} days left to enable MFA.`,
//                     action: 'set_mfa', // Include an actionable field for UI
//                 });
//             }
//         }
//     }
    
      
//         const payload = {
//           email: user.email,
//           id: user._id,
//           role: role,
//         };
//         //Created JWT Token
//         const token = jwt.sign(payload, process.env.JWT_SECRET, {
//           expiresIn: "25h",
//         });
//         user.token = token;
//         user.password = undefined;
//         const options = {
//           expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
//           httpOnly: true,
//         };
//         res.cookie("token", token, options).status(200).json({
//           success: true,
//           token, 
//           user,
//           message: `${user.role} Logged In`,
//         });
//     } catch (err) {
//       return res.status(400).json({
//         success: false,
//         message: `Error occured in logging in ${err.message}`,
//       });
//     }
// };


async function sendChangedPWDMail(email) {
    try {
      const mailResponse = await mailSender(
        email,
        "Password",
        "Password Changed Sucessfully -  Admin-App",
      );
    } catch (err) {
      console.log("Error in Password Changed Mail " ,err);
    }
  } 

exports.changePassword = async (req, res) => {
  try{
    const {email,oldPassword,newPassword,confirmNewPassword}=req.body;
    if( !email || !oldPassword || !newPassword, !confirmNewPassword){
      return res.status(400).json({
        success:false,
        message:"Enter all fields"
      })
    }
    if(newPassword == confirmNewPassword){
      return res.status(400).json({
        success:false,
        message:"New Password should be other than old password"
      })
    }
    const user = await Admin.findOne({email});
    user.password=await bcrypt.hash(newPassword,10);
    sendChangedPWDMail(email);
    return res.status(200).json({
      success:true,
      message:"Changed Password Sucessfully"
    })
  }
  catch(err){
    return res.status(400).json({
      success:true,
      message:"Changed Password UnSucessfully"
    })
  }
}







// exports.editAdmin = async (req, res) => {
//   const { id } = req.params;
//   const { updates } = req.body;

//   try {
//     const admin = await Admin.findByIdAndUpdate(id, updates, { new: true });
//     if (!admin) return res.status(404).json({ message: 'Admin not found' });

//     res.status(200).json({ message: 'Admin updated successfully', admin });
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to update admin', error: error.message });
//   }
// };

// exports.deleteAdmin = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const admin = await Admin.findByIdAndDelete(id);
//     if (!admin) return res.status(404).json({ message: 'Admin not found' });

//     res.status(200).json({ message: 'Admin deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to delete admin', error: error.message });
//   }
// };

// exports.getAdmins = async (req, res) => {
//   try {
//     const admins = await Admin.find();
//     res.status(200).json(admins);
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to fetch admins', error: error.message });
//   }
// };
















// const Admin = require('../models/Admin');
const Role = require('../models/Role');
// const OTP = require('../models/OTP'); // Assuming OTP model exists
// const bcrypt = require('bcrypt');

exports.createAdmin = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, otp, role } = req.body;

    // Validate required fields
    if (!name || !email || !confirmPassword || !password || !otp || !role) {
      return res.status(403).json({
        success: false,
        message: 'All fields are required',
      });
    }

    // Validate password match
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords don't match",
      });
    }

    // Check if admin already exists
    const existingUser = await Admin.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Admin with this email is already registered',
      });
    }

    // Find role by name, not by _id
    const roleData = await Role.findOne({ role });
    if (!roleData) {
      return res.status(400).json({
        success: false,
        message: 'Invalid role specified',
      });
    }

    // Validate OTP
    const recentOtp = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
    if (recentOtp.length == 0) {
      return res.status(400).json({
        success: false,
        message: 'OTP not found',
      });
    } else if (otp !== recentOtp[0].otp) {
      return res.status(400).json({
        success: false,
        message: 'Invalid OTP',
        otp: `${recentOtp[0].otp}`, // Optional: Provide the correct OTP for debugging (remove in production)
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin
    const user = await Admin.create({
      name,
      email,
      password: hashedPassword,
      role: roleData._id, // Save the actual ObjectId reference
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${name}`, // Optional avatar generation
    });

    return res.status(200).json({
      success: true,
      message: `${roleData.role} registered successfully`,
      data: user,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Failed to create admin',
      error: err.message,
    });
  }
};


exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(403).json({
        success: false,
        message: 'Email and password are required',
      });
    }

    const user = await Admin.findOne({ email }).populate('role');
    // console.log(user)
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Admin does not exist',
      });
    }
    // console.log(user.role.mfa);
    if (user.accountStatus === 'inactive') {
      return res.status(403).json({
        success: false,
        message: 'Your account is inactive. Please contact the administrator.',
      });
    }
    // console.log("one")
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Incorrect password',
      });
    }
    // console.log("two")
    // Check if MFA is required based on role permissions
    // const requiresMFA = user.role.permissions.some(
    //   (permission) => permission.resource === 'mfa' && permission.actions.includes('required')
    // );

    if (user.role.mfa && user.mfaEnabled) {
      return res.status(200).json({
        success: true,
        mfa: user.role.mfa,
        mfaEnabled: true,
        tempSession: { email: user.email },
        message: 'MFA verification required',
      });
    }

    // console.log("three")
    // Generate JWT
    const payload = {
      email: user.email,
      id: user._id,
      role: user.role.role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
    user.token = token;
    user.password = undefined;

    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
      httpOnly: true, // Prevent access to cookies via JavaScript
    };

    res.cookie('token', token, options).status(200).json({
      success: true,
      mfaRequired: false,
      mfa: user.role.mfa,
      token,
      user,
      message: `${user.role.role} logged in successfully`,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: `Error occurred during login: ${err.message}`,
    });
  }
};


exports.verifyMFA = async (req, res) => {
  try {
    const { email, token } = req.body;

    if (!email || !token) {
      return res.status(400).json({
        success: false,
        message: 'Email and MFA token are required',
      });
    }

    const user = await Admin.findOne({ email }).populate('role');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Admin does not exist',
      });
    }

    const isMfaValid = authenticator.verify({ token, secret: user.mfaSecret });
    if (!isMfaValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid MFA token',
      });
    }

    // Generate JWT
    const payload = {
      email: user.email,
      id: user._id,
      role: user.role.role,
    };

    const jwtToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
    user.token = jwtToken;
    user.password = undefined;

    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
      httpOnly: true,
    };

    res.cookie('token', jwtToken, options).status(200).json({
      success: true,
      token: jwtToken,
      user,
      message: 'MFA verified and logged in successfully',
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: `Server error: ${err.message}`,
    });
  }
};


exports.logoutAdmin = async (req, res) => {
  try {
    console.log("In logout")
    res.cookie('token', '', {
      expires: new Date(0), // Expire the cookie immediately
      httpOnly: true,
    });

    return res.status(200).json({
      success: true,
      message: 'Logged out successfully',
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: `Error during logout: ${err.message}`,
    });
  }
};







exports.editAdmin = async (req, res) => {
  const { id } = req.params;
  const { updates } = req.body;

  try {
    // If the role is being updated, ensure it exists in the Role collection
    if (updates.role) {
      const roleData = await Role.findById(updates.role);
      if (!roleData) {
        return res.status(400).json({
          success: false,
          message: 'Invalid role specified',
        });
      }
    }

    // Update admin details
    const admin = await Admin.findByIdAndUpdate(id, updates, { new: true });
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Admin updated successfully',
      data: admin,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update admin',
      error: error.message,
    });
  }
};


exports.deleteAdmin = async (req, res) => {
  const { id } = req.params;

  try {
    const admin = await Admin.findByIdAndDelete(id);
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Admin deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete admin',
      error: error.message,
    });
  }
};


exports.getAdmins = async (req, res) => {
  try {
    // Populate the role field to include role details
    const admins = await Admin.find().populate('role', 'role permissions');
    res.status(200).json({
      success: true,
      data: admins,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch admins',
      error: error.message,
    });
  }
};
