const { fileTypes } = require('../constant/fileUpload')
const { extname } = require('path')

const fileStorageDestination = (file) => {
    try {
        const fileExtension = extname(file.originalname).slice(1).toLowerCase();
        let typeEntry = fileTypes.find(t => t.types?.includes(fileExtension));

        if (!typeEntry) {
            return {
                path: 'uploads/unknown',
                type: 'unknown'
            };
        }

        const type = typeEntry.name;
        let resultDest = '';

        switch (type) {
            case 'image':
                resultDest = 'uploads/images';
                break;
            case 'video':
                resultDest = 'uploads/videos';
                break;
            case 'pdf':
                resultDest = 'uploads/pdf';
                break;
            case 'audio':
                resultDest = 'uploads/audios';
                break;
            default:
                resultDest = 'uploads/unknown';
                break;
        }

        return {
            path: resultDest,
            type
        }

    } catch (error) {
        console.error('fileStorageDestination error:', error);
        return { success: false, message: 'Internal server error', error };
    }
}

module.exports = {
    fileStorageDestination
}
