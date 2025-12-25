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

const createNewProject = async (req, res) => {
  const { name, role, description } = req.body;
  try {
    const newProject = await projects.create({
      name,
      role,
      description,
    });

    return res.status(201).json({
      success: true,
      data: newProject,
    });
  } catch (error) {}
};

module.exports = { getAllProjects, createNewProject };
