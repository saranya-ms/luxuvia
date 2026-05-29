const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const auth = require('../middleware/auth');

const router = express.Router();
const projectsDir = path.join(__dirname, '..', '..', 'resources', 'projectDetails');

const fileKeyMap = {
  floorPlans: 'floor_plans',
  nearbyPlaces: 'nearby_places',
  projects: 'projects',
};

const buildProjectDefaults = (project) => {
  project._id = project._id || project.slug || project.name;
  project.title = project.title || project.name;
  project.image = project.image || project.image || project.images?.[0] || project.building_images?.[0] || null;
  project.type = project.type || project.type || project.configurations || '2 & 3 BHK Apartments';
  project.area = project.area || project.size_range || 'N/A';
  project.price = project.price || project.price_range || 'Price on Request';
  project.location = project.location || project.address || project.location;
  return project;
};

const loadProjectDir = async (projectDir) => {
  const files = await fs.readdir(projectDir);
  const project = {};

  for (const file of files) {
    if (!file.endsWith('.json')) continue;
    const filePath = path.join(projectDir, file);
    const raw = await fs.readFile(filePath, 'utf8');
    const content = JSON.parse(raw || '{}');
    const key = path.basename(file, '.json');

    if (key === 'project') {
      Object.assign(project, content);
    } else {
      project[fileKeyMap[key] || key] = content;
    }
  }

  return buildProjectDefaults(project);
};

const loadAllProjects = async () => {
  const entries = await fs.readdir(projectsDir, { withFileTypes: true });
  const slugs = entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name);
  const projects = [];

  for (const slug of slugs) {
    try {
      const project = await loadProjectDir(path.join(projectsDir, slug));
      if (project.slug) {
        projects.push(project);
      }
    } catch (error) {
      // Skip invalid project directories
    }
  }

  return projects;
};

// GET all projects (with optional status filter)
router.get('/', async (req, res) => {
  try {
    const { status } = req.query;
    let projects = await loadAllProjects();

    if (status) {
      projects = projects.filter(
        (project) => project.status?.toLowerCase() === status.toLowerCase()
      );
    }

    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single project by slug
router.get('/:slug', async (req, res) => {
  try {
    const slug = req.params.slug.toLowerCase();
    const projectDir = path.join(projectsDir, slug);
    const project = await loadProjectDir(projectDir);

    if (!project || !project.slug) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json(project);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(500).json({ message: error.message });
  }
});

// Project write operations are not supported for file-based storage
router.post('/', auth, async (req, res) => {
  res.status(403).json({ message: 'Project creation is not supported.' });
});

router.put('/:id', auth, async (req, res) => {
  res.status(403).json({ message: 'Project updates are not supported.' });
});

router.delete('/:id', auth, async (req, res) => {
  res.status(403).json({ message: 'Project deletion is not supported.' });
});

module.exports = router;
