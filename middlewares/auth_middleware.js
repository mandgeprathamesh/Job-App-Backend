import Jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/user.js";
import Recruiter from "../models/recruiter.js";

const authenticateuser = asyncHandler(async (req, res, next) => {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
    console.log(token);
    if(token){
        try{
            // console.log("yaha tak aagyaa");
            const decoded=Jwt.decode(token);
            console.log(decoded);
            // const decodeduser=Jwt.verify(token,process.env.JWT_SECRET);
            const user=await User.findById(decoded.id).select("-password");
            
            if(user.role==="candidate"){
                req.user=user;
                next();
            }
            else{
                res.status(401);
                throw new Error("Not authorized, token failed");
            }
        }catch(error){
            console.log("error wale mein aagaya");
            // res.status(401);
            // throw new Error("Not authorized, token failed");
        }
    }
    else{
        res.status(401);
        throw new Error("Not authorized, no token found");
    }
});

const authenticaterecruiter = asyncHandler(async (req, res, next) => {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
    console.log(token);
    if(token){
        try{
            // console.log("yaha tak aagyaa");
            const decoded=Jwt.decode(token);
            console.log(decoded);
            // const decodeduser=Jwt.verify(token,process.env.JWT_SECRET);
            const user=await Recruiter.findById(decoded.id).select("-password");
            
            if(user.role==="recruiter"){
                req.user=user;
                next();
            }
            else{
                res.status(401);
                throw new Error("Not authorized, token failed");
            }
        }catch(error){
            console.log("error wale mein aagaya");
            // res.status(401);
            // throw new Error("Not authorized, token failed");
        }
    }
    else{
        res.status(401);
        throw new Error("Not authorized, no token found");
    }
});

export {authenticateuser,authenticaterecruiter};