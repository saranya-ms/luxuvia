const mongoose = require('mongoose');

const InquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: String,
    email: String,
    message: String,
    project_slug: String,
    project_name: String,
    inquiry_type: {
      type: String,
      enum: ['general', 'callback', 'site_visit', 'project_inquiry', 'apartment_inquiry'],
      default: 'general',
    },
    status: {
      type: String,
      enum: ['new', 'contacted', 'converted', 'closed'],
      default: 'new',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Inquiry', InquirySchema);
