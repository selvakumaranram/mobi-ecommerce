const express = require('express');
const router = express.Router();
const fs = require('fs');
const multer = require('multer');
const path = require("path");
// var upload = multer({dest:'./../uploads/'});

var dir = path.join(`${__dirname}/../uploads`);
// var dir1=path.join(`${__dirname}/../uploads/document`);
// var dir2=path.join(`${__dirname}/../uploads/images`);
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);

}

const storage = multer.diskStorage(

    {
        destination: (req, file, callback) => {
            callback(null, path.join(`${__dirname}/../uploads`));
        },
        filename: (req, file, callback) => {

            callback(null, Date.now() + '-' + file.originalname);
        }
    });
const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
const newFilter = function (req, file, cb) {
    const extension = path.extname(file.originalname).toLowerCase();
    const mimetyp = file.mimetype;
    if (
        extension !== '.jpg' ||
        extension !== '.jpeg' ||
        extension !== '.png' ||
        mimetyp !== 'image/png' ||
        mimetyp !== 'image/jpg' ||
        mimetyp !== 'image/jpeg'
    ) {
        cb('error message', true);
    }
}
const imageFilter = function(req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
const upload = multer({ storage: storage }).any('file');
const imageupload = multer({ storage: storage, fileFilter: newFilter });


router.use('/', async (req, res) => {

    upload(req, res, (err) => {
        if (err) {
            return res.status(400).send({
                message: err
            });
        }
        let results = req.files.map((file) => {
            return {
                mediaName: file.filename,
                origMediaName: file.originalname,
                mediaSource: 'http://' + req.headers.host+'/uploads/' + file.filename
            }
        });
        res.status(200).json({  statusCode: "200",
        msg: "uploaded sucessfully", 
        success: true,results});
    });
})

router.use('/imageonly', async (req, res) => {

    imageupload(req, res, (err) => {
        if (err) {
            return res.status(400).send({
                message: err
            });
        }
        let results = req.files.map((file) => {
            return {
                mediaName: file.filename,
                origMediaName: file.originalname,
                mediaSource: 'http://' + req.headers.host + file.filename
            }
        });
        res.status(200).json(results);
    });
})

module.exports = router;