const router = require('express').Router();
const uploadImg = require('../config/cloudinary.config');

router.post('/upload', uploadImg.single('picture'), (req, res) => {
  if (!req.file) {
    return res.status(500).json({ msg: 'Uploads fail.' });
  }

  return res.status(201).json({ url: req.file.path });
});

module.exports = router;
