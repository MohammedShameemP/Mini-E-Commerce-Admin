const multer = require("multer");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // specify the destination directory
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname); // use the original file name
    }
  });

  const upload = multer({ storage: storage });

  module.exports = upload