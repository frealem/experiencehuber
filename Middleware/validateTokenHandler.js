const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const Role = require('../Modules/SystemMonitoringModule/Models/Role');
const ACCESSLEVEL = require('../Constants/accessLevel');

const validateTokenLevel1 = asyncHandler(async ( req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer")){
        res.status(401);
        throw new Error("User is not authorized!");
    }
    token = authHeader.split(" ")[1];

    if(!token){
        res.status(401);
        throw new Error("User is not authorized!");
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRETE, (err,decoded) => {
        if(err){
            res.status(401);
            throw new Error("User is not authorized!");
        }
        req.user = decoded.user;
        next();
    });
});

const validateTokenLevel2 = asyncHandler(async(req, res,next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer")){
        res.status(401);
        throw new Error("User is not authorized!");
    }
    token = authHeader.split(" ")[1];

    if(!token){
        res.status(401);
        throw new Error("User is not authorized!");
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRETE, async (err,decoded) => {
        if(err){
            res.status(401);
            throw new Error("User is not authorized!");
        }
        const role = await Role.findById(decoded.user.role);
        if(role.accessLevel < 2){
            res.status(401);
            throw new Error("User is not authorized!");
        }
        req.user = decoded.user;
        next();
    });
});

const validateTokenLevel3 = asyncHandler(async(req, res,next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer")){
        res.status(401);
        throw new Error("User is not authorized!");
    }
    token = authHeader.split(" ")[1];

    if(!token){
        res.status(401);
        throw new Error("User is not authorized!");
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRETE, async (err,decoded) => {
        if(err){
            res.status(401);
            throw new Error("User is not authorized!");
        }
        const role = await Role.findById(decoded.user.role);
        if(role.accessLevel < 3){
            res.status(401);
            throw new Error("User is not authorized!");
        }
        req.user = decoded.user;
        next();
    });
});

module.exports = {validateTokenLevel1, validateTokenLevel2, validateTokenLevel3};