const multer = require('multer')
const localImage = 'src/app/public/upload/users'

module.exports =(multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, localImage)
        },
        filename: (req, file, cb) => {
            cb(null, Date.now().toString() + '_' + file.originalname)
        }
    }),
    fileFilter: (req, file, cb) => {
        const extensaoimg = ['image/png', 'image/jpg', 'image/jpeg'].find
        (formatoAceito => formatoAceito === file.mimetype)

        if(extensaoimg){
            return cb(null, true)
        }
        return cb(null, false)
    }

}))