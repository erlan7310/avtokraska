const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    let uploadPath = './uploads';

    if (req.baseUrl.includes('/banners')) {
      uploadPath = path.join(uploadPath, 'banners');
    } else if (req.baseUrl.includes('/products')) {
      uploadPath = path.join(uploadPath, 'products');
    } else if (req.baseUrl.includes('/upload-media')) {
      uploadPath = path.join(uploadPath, 'media');
    } else if (req.baseUrl.includes('/news')) {
      uploadPath = path.join(uploadPath, 'news');
    }
    
    fs.mkdirSync(uploadPath, { recursive: true });

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    let newFilename;
    if (req.baseUrl.includes('/banners')) {
      const { id } = req.params; 
      newFilename = `banner_${id}${path.extname(file.originalname)}`;
      const filepath = path.join(__dirname, 'uploads', newFilename);
      
      if (fs.existsSync(filepath)) {
        fs.unlinkSync(filepath);
      }
    } else {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      newFilename = file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname);
    }

    cb(null, newFilename);
  }
});

const upload = multer({ storage: storage });

module.exports = upload;