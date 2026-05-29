const express = require('express');
const supabase = require('../utils/supabaseClient');
const auth = require('../middleware/auth');

const router = express.Router();

// POST create inquiry (public)
router.post('/', async (req, res) => {
  try {
    const inquiry = {
      ...req.body,
      status: 'new',
      created_at: new Date().toISOString(),
    };

    const { data, error } = await supabase.from('inquiries').insert(inquiry).single();
    if (error) {
      return res.status(400).json({ message: error.message });
    }

    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET all inquiries (admin only)
router.get('/', auth, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(500).json({ message: error.message });
    }

    res.json(data || []);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT update inquiry status (admin only)
router.put('/:id/status', auth, async (req, res) => {
  try {
    const { status } = req.body;
    const { data, error } = await supabase
      .from('inquiries')
      .update({ status })
      .eq('id', req.params.id)
      .single();

    if (error) {
      if (error.message?.includes('No rows found')) {
        return res.status(404).json({ message: 'Inquiry not found' });
      }
      return res.status(400).json({ message: error.message });
    }

    res.json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
