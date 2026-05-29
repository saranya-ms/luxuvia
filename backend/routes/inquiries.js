const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const auth = require('../middleware/auth');

const router = express.Router();
const inquiriesFile = path.join(__dirname, '..', 'data', 'inquiries.json');

const ensureInquiriesFile = async () => {
  try {
    await fs.access(inquiriesFile);
  } catch (error) {
    await fs.mkdir(path.dirname(inquiriesFile), { recursive: true });
    await fs.writeFile(inquiriesFile, '[]', 'utf8');
  }
};

const readInquiries = async () => {
  await ensureInquiriesFile();
  const raw = await fs.readFile(inquiriesFile, 'utf8');
  return JSON.parse(raw || '[]');
};

const writeInquiries = async (inquiries) => {
  await ensureInquiriesFile();
  await fs.writeFile(inquiriesFile, JSON.stringify(inquiries, null, 2), 'utf8');
};

const createInquiryId = () => `${Date.now()}-${Math.floor(Math.random() * 100000)}`;

// POST create inquiry (public)
router.post('/', async (req, res) => {
  try {
    const inquiries = await readInquiries();
    const newInquiry = {
      _id: createInquiryId(),
      status: 'new',
      createdAt: new Date().toISOString(),
      ...req.body,
    };

    inquiries.unshift(newInquiry);
    await writeInquiries(inquiries);

    res.status(201).json(newInquiry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET all inquiries (admin only)
router.get('/', auth, async (req, res) => {
  try {
    const inquiries = await readInquiries();
    inquiries.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json(inquiries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT update inquiry status (admin only)
router.put('/:id/status', auth, async (req, res) => {
  try {
    const { status } = req.body;
    const inquiries = await readInquiries();
    const index = inquiries.findIndex((inquiry) => inquiry._id === req.params.id);

    if (index === -1) {
      return res.status(404).json({ message: 'Inquiry not found' });
    }

    inquiries[index].status = status;
    await writeInquiries(inquiries);

    res.json(inquiries[index]);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
