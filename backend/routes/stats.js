const express = require('express');
const supabase = require('../utils/supabaseClient');

const router = express.Router();

const countRows = async (table, filter = {}) => {
  let query = supabase.from(table).select('*', { count: 'exact', head: true });

  Object.entries(filter).forEach(([key, value]) => {
    query = query.eq(key, value);
  });

  const { count, error } = await query;
  if (error) {
    throw error;
  }

  return count || 0;
};

// GET stats
router.get('/', async (req, res) => {
  try {
    const totalProjects = await countRows('projects');
    const totalInquiries = await countRows('inquiries');
    const newInquiries = await countRows('inquiries', { status: 'new' });
    const completedProjects = await countRows('projects', { status: 'completed' });

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
