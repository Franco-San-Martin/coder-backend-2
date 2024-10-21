const multer = require('multer');
const path = require('path');

// Configuración para Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.mimetype.startsWith('image')) {
            cb(null, path.join(__dirname, '../uploads/pets'));
        } else {
            cb(null, path.join(__dirname, '../uploads/documents'));
        }
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

module.exports = upload;