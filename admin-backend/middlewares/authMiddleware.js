const jwt = require("jsonwebtoken");
require("dotenv").config();
// const User = require("../models/User");

//auth
exports.authenticate = async (req, res, next) => {
    try{
        console.log("in authenticate");
        //extract token
        const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ", "");
        console.log(token);
        if(!token) {
            return res.status(401).json({
                success:false,
                message:'TOken is missing',
            });
        }
        //verify the token
        try{
            const decode =  jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            req.Admin = decode;
        }
        catch(err) {
            //verification - issue
            return res.status(401).json({
                success:false,
                message:'token is invalid',
            });
        }
        next();
    }
    catch(error) {  
        return res.status(401).json({
            success:false,
            message:'Something went wrong while validating the token',
        });
    }
}

//super_admin
exports.issuper_admin = async (req, res, next) => {
 try{
        if(req.Admin.role !== "super_admin") {
            return res.status(401).json({
                success:false,
                message:'This is a protected route for super_admin only',
            });
        }
        next();
 }
 catch(error) {
    return res.status(500).json({
        success:false,
        message:'User role cannot be verified, please try again'
    })
 }
}


//moderator
exports.ismoderator = async (req, res, next) => {
    try{
           if(req.Admin.role !== "moderator") {
               return res.status(401).json({
                   success:false,
                   message:'This is a protected route for moderator only',
               });
           }
           next();
    }
    catch(error) {
       return res.status(500).json({
           success:false,
           message:'User role cannot be verified, please try again'
       })
    }
   }


//support_staff
exports.issupport_staff = async (req, res, next) => {
    try{    
        //    console.log("Printing AccountType ", req.user.role);
           if(req.Admin.role !== "support_staff") {
               return res.status(401).json({
                   success:false,
                   message:'This is a protected route for support_staff only',
               });
           }
           next();
    }
    catch(error) {
       return res.status(500).json({
           success:false,
           message:'User role cannot be verified, please try again'
       })
    }
   }