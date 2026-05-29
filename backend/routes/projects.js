const express = require('express');
const supabase = require('../utils/supabaseClient');
const auth = require('../middleware/auth');

const router = express.Router();

// GET all projects (with optional status filter)
router.get('/', async (req, res) => {
  try {
    const { status } = req.query;
    let query = supabase.from('projects').select('*');

    if (status) {
      query = query.ilike('status', status);
    }

    const { data, error } = await query.order('created_at', { ascending: false });
    if (error) {
      return res.status(500).json({ message: error.message });
    }

    res.json(data || []);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single project by slug
router.get('/:slug', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('slug', req.params.slug)
      .single();

    if (error) {
      if (error.message?.includes('No rows found')) {
        return res.status(404).json({ message: 'Project not found' });
      }
      return res.status(500).json({ message: error.message });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create project (admin only)
router.post('/', auth, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .insert(req.body)
      .single();

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update project (admin only)
router.put('/:id', auth, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .update(req.body)
      .eq('id', req.params.id)
      .single();

    if (error) {
      if (error.message?.includes('No rows found')) {
        return res.status(404).json({ message: 'Project not found' });
      }
      return res.status(400).json({ message: error.message });
    }

    res.json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE project (admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .delete()
      .eq('id', req.params.id)
      .single();

    if (error) {
      if (error.message?.includes('No rows found')) {
        return res.status(404).json({ message: 'Project not found' });
      }
      return res.status(500).json({ message: error.message });
    }

    res.json({ message: 'Project deleted successfully', project: data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
