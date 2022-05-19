const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: 'emlane',
  api_key: '675875561863717',
  api_secret: 'caqireYFBv-qaG0Rw1-F8sn6wbA',
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'img-folder',
    format: async (req) => 'png',
    use_filename: true,
  },
});

const uploadImg = multer({ storage });

module.exports = uploadImg;
