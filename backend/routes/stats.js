const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const router = express.Router();
const projectsDir = path.join(__dirname, '..', '..', 'resources', 'projectDetails');
const inquiriesFile = path.join(__dirname, '..', 'data', 'inquiries.json');

const readInquiries = async () => {
  try {
    const raw = await fs.readFile(inquiriesFile, 'utf8');
    return JSON.parse(raw || '[]');
  } catch {
    return [];
  }
};

const loadProject = async (projectDir) => {
  try {
    const files = await fs.readdir(projectDir);
    let project = {};

    for (const file of files) {
      if (!file.endsWith('.json')) continue;
      const raw = await fs.readFile(path.join(projectDir, file), 'utf8');
      const content = JSON.parse(raw || '{}');
      if (path.basename(file, '.json') === 'project') {
        project = { ...project, ...content };
      }
    }

    return project;
  } catch {
    return null;
  }
};

const loadProjectFolders = async () => {
  try {
    const entries = await fs.readdir(projectsDir, { withFileTypes: true });
    return entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name);
  } catch {
    return [];
  }
};

// GET stats
router.get('/', async (req, res) => {
  try {
    const projectFolders = await loadProjectFolders();
    const projects = [];

    for (const slug of projectFolders) {
      const project = await loadProject(path.join(projectsDir, slug));
      if (project) {
        projects.push(project);
      }
    }

    const inquiries = await readInquiries();
    const totalProjects = projects.length;
    const totalInquiries = inquiries.length;
    const newInquiries = inquiries.filter((inq) => inq.status === 'new').length;
    const completedProjects = projects.filter(
      (project) => project.status?.toLowerCase() === 'completed'
    ).length;

    res.json({
      total_projects: totalProjects,
      total_inquiries: totalInquiries,
      new_inquiries: newInquiries,
      completed_projects: completedProjects,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
