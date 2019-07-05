const multer = require('multer');
const express = require('express');
const app = express();

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/');
    },
    filename: function (req, file, cb) {

        cb(null, file.originalname);
    }
});

var upload = multer({ storage: storage });

app.use(function (err, req, res) {
    if (err instanceof multer.MulterError) res.status(500).send(err.message);
});

module.exports = { storage, upload };