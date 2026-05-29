const mongoose = require('mongoose');
require('dotenv').config();

const Project = require('./models/Project');

const seedProjects = [
  {
    name: 'Sri Laxmi Janardhana Nilayam',
    slug: 'sri-laxmi-janardhana-nilayam',
    tagline: 'Premium Residential Living in Peerzadiguda',
    description:
      'An exclusive residential project in the heart of Peerzadiguda, designed for those who seek luxury and comfort. Sri Laxmi Janardhana Nilayam offers spacious apartments with world-class amenities and modern architecture.',
    location: 'Peerzadiguda',
    address: 'Peerzadiguda, East Hyderabad, Telangana',
    map_link: 'https://maps.google.com',
    status: 'in_progress',
    rera_id: 'P02400007368',
    configurations: '2 BHK, 2.5 BHK, 3 BHK',
    size_range: '1100 - 1650 SFT',
    total_units: 40,
    buildings: 1,
    floors: 7,
    project_area: '8 acres',
    possession_date: 'December 2025',
    launch_date: 'January 2023',
    price_range: '₹45 Lakhs - ₹85 Lakhs',
    avg_price: '₹65 Lakhs',
    images: [
      'https://framerusercontent.com/images/on75T1Geer2QQKG88lS0V08.jpg?scale-down-to=1024',
    ],
    building_images: [
      'https://framerusercontent.com/images/BeFApd0BHsxGKeT3w5xAG9ehdOk.jpg',
    ],
    highlights: ['2/2.5/3 BHK Apartments', 'Modern Architecture', 'Premium Amenities'],
    amenities: [
      { name: 'Swimming Pool', icon: 'Droplet' },
      { name: 'Gym', icon: 'Dumbbell' },
      { name: 'Garden', icon: 'Trees' },
      { name: 'Parking', icon: 'Car' },
      { name: 'Security', icon: 'Shield' },
      { name: 'Club House', icon: 'Building' },
    ],
    specifications: [
      {
        category: 'Structure',
        items: ['RCC Frame', 'Earthquake Resistant', 'Premium Finishes'],
      },
      {
        category: 'Amenities',
        items: ['24/7 Security', 'Swimming Pool', 'Gymnasium', 'Community Hall'],
      },
    ],
    floor_plans: [
      {
        group: '2 BHK',
        range: '1100-1200 SFT',
        image: '',
        variants: [
          { desc: 'East Facing', units: 10 },
          { desc: 'West Facing', units: 8 },
        ],
      },
    ],
    nearby_places: [
      { name: 'Infosys', type: 'Tech Park', distance: '8 km' },
      { name: 'Uppal Metro', type: 'Metro Station', distance: '12 km' },
      { name: 'Gachibowli Playgrounds', type: 'Sports', distance: '5 km' },
    ],
  },
  {
    name: 'Padmavati Residency',
    slug: 'padmavati-residency',
    tagline: 'Completed Excellence in Narapally',
    description:
      'A successfully completed residential project in Narapally offering premium 2 and 3 BHK apartments. Padmavati Residency is home to 100+ happy families.',
    location: 'Narapally',
    address: 'Narapally, East Hyderabad, Telangana',
    map_link: 'https://maps.google.com',
    status: 'completed',
    rera_id: 'P02400007369',
    configurations: '2 BHK, 3 BHK',
    size_range: '1050 - 1450 SFT',
    total_units: 36,
    buildings: 1,
    floors: 6,
    project_area: '6 acres',
    possession_date: 'March 2023',
    launch_date: 'June 2021',
    price_range: '₹40 Lakhs - ₹75 Lakhs',
    avg_price: '₹60 Lakhs',
    images: [
      'https://framerusercontent.com/images/on75T1Geer2QQKG88lS0V08.jpg?scale-down-to=1024',
    ],
    building_images: [
      'https://framerusercontent.com/images/BeFApd0BHsxGKeT3w5xAG9ehdOk.jpg',
    ],
    highlights: ['Completed Project', 'Occupancy Certificate', 'Verified Reviews'],
    amenities: [
      { name: 'Swimming Pool', icon: 'Droplet' },
      { name: 'Gym', icon: 'Dumbbell' },
      { name: 'Garden', icon: 'Trees' },
      { name: 'Community Hall', icon: 'Building' },
    ],
    specifications: [
      {
        category: 'Structure',
        items: ['RCC Frame', 'Premium Finishes', 'Energy Efficient'],
      },
    ],
    floor_plans: [],
    nearby_places: [
      { name: 'Hi-Tech City', type: 'Tech Hub', distance: '6 km' },
      { name: 'Gachibowli', type: 'Commercial Area', distance: '4 km' },
    ],
  },
  {
    name: 'Venkataramana Residency',
    slug: 'venkataramana-residency',
    tagline: 'Premium Living in Pocharam',
    description:
      'An elegant residential community in Pocharam designed for modern families. Venkataramana Residency combines luxury with affordability.',
    location: 'Pocharam',
    address: 'Pocharam, East Hyderabad, Telangana',
    map_link: 'https://maps.google.com',
    status: 'completed',
    rera_id: 'P02400007370',
    configurations: '2 BHK, 3 BHK',
    size_range: '1000 - 1400 SFT',
    total_units: 32,
    buildings: 1,
    floors: 5,
    project_area: '5 acres',
    possession_date: 'September 2023',
    launch_date: 'January 2022',
    price_range: '₹38 Lakhs - ₹70 Lakhs',
    avg_price: '₹55 Lakhs',
    images: [
      'https://framerusercontent.com/images/on75T1Geer2QQKG88lS0V08.jpg?scale-down-to=1024',
    ],
    building_images: [
      'https://framerusercontent.com/images/BeFApd0BHsxGKeT3w5xAG9ehdOk.jpg',
    ],
    highlights: ['Modern Design', 'Green Spaces', 'Family Friendly'],
    amenities: [
      { name: 'Garden', icon: 'Trees' },
      { name: 'Parking', icon: 'Car' },
      { name: 'Security', icon: 'Shield' },
    ],
    specifications: [],
    floor_plans: [],
    nearby_places: [
      { name: 'Pocharam Lake', type: 'Nature', distance: '1 km' },
    ],
  },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✓ MongoDB connected for seeding');

    // Clear existing projects
    await Project.deleteMany({});
    console.log('✓ Cleared existing projects');

    // Insert seed data
    const result = await Project.insertMany(seedProjects);
    console.log(`✓ Seeded ${result.length} projects successfully`);

    // List seeded projects
    const projects = await Project.find();
    console.log('\n📋 Seeded Projects:');
    projects.forEach((p) => {
      console.log(`  - ${p.name} (${p.slug})`);
    });

    mongoose.connection.close();
    console.log('\n✓ Database seeded successfully!');
  } catch (error) {
    console.error('✗ Seeding error:', error);
    process.exit(1);
  }
};

seed();
