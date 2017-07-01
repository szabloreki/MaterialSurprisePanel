const express = require('express');
const router = express.Router();
const files = require ('./details');
const path = require('path');
const jwt = require('express-jwt');
const secret = require('../../token/sekret');
const multer = require('multer');

const upload = multer.diskStorage(
    {
        destination: 'uploads/',
        filename: (req, file, cb) => {
            cb(null, file.name + '-' + Date.now() + path.extname(file.originalname))
        },
        fileFilter: (req, file, cb) => {
            if (!file.originalname.match(/\.(jpg|jpeg|png|gif|pdf|doc)$/)) {
                return cb(new Error('Only image files are allowed!'));
            }
            cb(null, true);
        }
    }
);

const a = multer({storage: upload})

router

  .get('/', files.get)
  .post('/',a.single('file'), files.post)
  .delete('/:id', files.delete);

module.exports = router;
