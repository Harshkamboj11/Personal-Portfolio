const cloudinary = require('../config/cloudinary.js');
const fs = require('fs');
const projects = require('../model/projects.model.js');
const certificates = require('../model/certificate.model.js');

const uploadImage = async (req, res) => {
  const id = req.params.id;
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file provided' });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'portfolio', // Cloudinary folder
    });

    // temp file delete (important)
    fs.unlinkSync(req.file.path);

    const finalUpload =
      (await projects.findById(id)) || (await certificates.findById(id));
    finalUpload.image = result.secure_url;
    await finalUpload.save();

    res.status(200).json({
      success: true,
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Cloudinary upload failed' });
  }
};

module.exports = { uploadImage };
