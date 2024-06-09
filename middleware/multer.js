const multer = require('multer');
const path = require('path')

function uploadFile(){
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, 'src/public/uploads')
        },
        filename: function (req, file, cb) {
          console.log(file)
          //cb(null, Date.now() + path.extname(file.originalname))
          cb(null, `${Date.now()}-${file.originalname}`)
        }
      })
      
    const upload = multer({ storage: storage }).single('image')

    return upload;
}

module.exports = uploadFile;