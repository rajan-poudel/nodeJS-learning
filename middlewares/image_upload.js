const multer = require('multer');
// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });

  var upload = multer({
    storage: storage,
    fileFilter: function(req, file, callback){
        const allowedFileTypes = ['image/png', 'image/jpg', 'image/jpeg']
        if(!allowedFileTypes.includes(file.mimetype)){
            cb(new Error("This filetype is not supported"))
            return
        }
        callback(null, true)
    },
    limits: {
        fileSize: 1024 * 1024 * 2
    }
})
 
module.exports = upload