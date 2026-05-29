const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    tagline: String,
    description: String,
    location: String,
    address: String,
    map_link: String,
    status: {
      type: String,
      enum: ['completed', 'in_progress', 'upcoming'],
      default: 'upcoming',
    },
    rera_id: String,
    configurations: String,
    size_range: String,
    total_units: Number,
    buildings: Number,
    floors: Number,
    project_area: String,
    possession_date: String,
    launch_date: String,
    price_range: String,
    avg_price: String,
    images: [String],
    building_images: [String],
    highlights: [String],
    amenities: [
      {
        name: String,
        icon: String,
      },
    ],
    specifications: [
      {
        category: String,
        items: [String],
      },
    ],
    floor_plans: [
      {
        group: String,
        range: String,
        image: String,
        variants: [
          {
            desc: String,
            units: Number,
          },
        ],
      },
    ],
    nearby_places: [
      {
        name: String,
        type: String,
        distance: String,
      },
    ],
    apartments: [
      {
        num: Number,
        bhk: String,
        area: Number,
        beds: Number,
        baths: Number,
        balconies: Number,
        facing: String,
        thumbnail: String,
        images: [String],
        floor_plan_img: String,
        walkthrough_url: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', ProjectSchema);
