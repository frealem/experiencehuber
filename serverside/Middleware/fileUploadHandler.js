const path = require('path');
const multer = require('multer');
const { callbackify } = require('util');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Upload');
    },
    filename: (req, file, cb) => {
        let extension = path.extname(file.originalname);
        console.log("ite was here")
        cb(null, Date.now() + extension);
    }
});


const fileUploadHandler = multer ({
    storage: storage,
    fileFilter: (req, file, callback) => {
        if(
            file.mimetype == "image/png" ||
            file.mimetype == "image/jpg" ||
            file.mimetype == "image/jpeg"
        ){
            callback(null, true);
        }else {
            console.log('only jpg, png or jpeg file form');
            callback(null, false);
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 1024 * 24,
    }
})

module.exports = fileUploadHandler;