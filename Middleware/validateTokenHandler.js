const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const Role = require('../Modules/SystemMonitoringModule/Models/Role');
const ACCESSLEVEL = require('../Constants/accessLevel');

const validateTokenLevel1 = asyncHandler(async ( req, res, next) => {
    let token;
    let authHeader = req.header.Authorization || req.header.authorization;
    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRETE, (err,decoded) => {
            if(err){
                res.status(401);
                throw new Error("User is not authorized!");
            }
            req.user = decoded.user;
            next();
        });

        if(!token){
            res.status(401);
            throw new Error("User is not authorized!");
        }
    }
});

const validateTokenLevel2 = asyncHandler(async(req, res,next) => {
    let token;
    let authHeader = req.header.Authorization || req.header.authorization;
    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRETE, (err,decoded) => {
            if(err){
                res.status(401);
                throw new Error("User is not authorized!");
            }
            const role = Role.find(decoded.user.role);
            if(role.accessLevel < ACCESSLEVEL.ADMIN){
                res.status(401);
                throw new Error("Access level not authorized!");
            }
            req.user = decoded.user;
            next();
        });

        if(!token){
            res.status(401);
            throw new Error("User is not authorized!");
        }
    }
});

const validateTokenLevel3 = asyncHandler(async(req, res,next) => {
    let token;
    let authHeader = req.header.Authorization || req.header.authorization;
    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRETE, (err,decoded) => {
            if(err){
                res.status(401);
                throw new Error("User is not authorized!");
            }
            const role = Role.find(decoded.user.role);
            if(role.accessLevel < ACCESSLEVEL.SUPERADMIN){
                res.status(401);
                throw new Error("Access level not authorized!");
            }
            req.user = decoded.user;
            next();
        });

        if(!token){
            res.status(401);
            throw new Error("User is not authorized!");
        }
    }
})

module.exports = {validateTokenLevel1, validateTokenLevel2, validateTokenLevel3};