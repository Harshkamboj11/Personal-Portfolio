const projects = require('../model/projects.model');

const getAllProjects = async (req, res) => {
  try {
    const allProjects = await projects.find();

    return res.status(200).json({
      success: true,
      data: allProjects,
    });
  } catch (error) {}
};

module.exports = getAllProjects;
