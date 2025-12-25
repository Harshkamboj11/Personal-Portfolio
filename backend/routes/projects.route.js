const express = require('express');
const router = express.Router();

const upload = require('../middlewares/multer.js');
const { uploadImage } = require('../controller/upload.controller.js');
const {
  getAllProjects,
  createNewProject,
} = require('../controller/projects.controller');

router.get('/get-all-projects', getAllProjects);
router.post('/create-new-project', createNewProject);
router.put('/projects/:id/image', upload.single('image'), uploadImage);

module.exports = router;
