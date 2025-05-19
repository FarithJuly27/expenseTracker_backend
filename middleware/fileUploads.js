const multer = require('multer');
const fs = require('fs');
const { fileStorageDestination } = require('../functions/validation');
const { extname } = require('path');

const uploadFile = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            const { path } = fileStorageDestination(file);
            if (!fs.existsSync(path)) {
                fs.mkdirSync(path, { recursive: true });
            }
            cb(null, path);
        },
        filename: function (req, file, cb) {
            const { type } = fileStorageDestination(file);
            const filename = file.originalname.split(',')[0].replace(/\s+/g, '');
            cb(null, `${type}-${filename}-${Date.now()}${extname(file.originalname)}`);
        }
    })
});

module.exports = {
    uploadFile
};
