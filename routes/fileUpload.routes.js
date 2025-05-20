const express = require('express')
const router = express.Router()
const controller = require('../controller/fileUpload.controller');
const { uploadFile } = require('../middleware/fileUploads')
const auth = require('../middleware/auth')

router.post('/file-upload', uploadFile.single('file'), controller.uplodFile)

module.exports = router