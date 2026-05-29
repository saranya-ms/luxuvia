require('dotenv').config({ path: require('path').join(__dirname, '.env') });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const seedProjects = [
  {
    name: 'Luxuvia Sri Laxmi Janardhana Nilayam',
    slug: 'sri-laxmi-janardhana-nilayam',
    tagline: 'Premium Residential Living in East Hyderabad',
    description:
      'Luxuvia presents luxurious 2 BHK and 3 BHK homes along the Warangal-Hyderabad Highway. Enjoy a gated community with premium amenities, excellent connectivity, and thoughtful design for modern families.',
    location: 'Narapally, Hyderabad',
    address:
      'Survey No. 45, 49 & 51, Plot No. 33/A & 33/B, Narapally, Pocharam, East Hyderabad, Telangana',
    map_link:
      'https://maps.google.com/?q=Survey+No.+45,+49+%26+51,+Plot+No.+33/A+%26+33/B,+Narapally,+Pocharam,+East+Hyderabad',
    status: 'in_progress',
    rera_id: 'P02200007285',
    configurations: '2 & 3 BHK Apartments',
    size_range: '1,235 - 1,995 sq.ft.',
    total_units: 80,
    buildings: 1,
    floors: 7,
    project_area: '0.96 Acres',
    possession_date: '2026',
    launch_date: '2023',
    price_range: null,
    avg_price: null,
    images: [
      'https://framerusercontent.com/images/TIkUKiWQjk1Ln9nR4qbFAMymVWM.png',
    ],
    building_images: [
      'https://framerusercontent.com/images/TIkUKiWQjk1Ln9nR4qbFAMymVWM.png',
      'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
    highlights: [
      '80 Luxurious Apartments within a secured society',
      'Highway facing on Warangal-Hyderabad Highway',
      '5 mins from Infosys SEZ Pocharam',
      '15 mins from Uppal and Inner Ring Road',
      '5 Unique Floor Plans from 1,235 to 1,995 sq.ft.',
      'RERA Approved - P02200007285',
    ],
    amenities: [
      { name: 'Amphitheatre', icon: 'Theater' },
      { name: 'Children\'s Play Area', icon: 'Baby' },
      { name: 'Guest Rooms', icon: 'BedDouble' },
      { name: 'Multipurpose Hall', icon: 'Building2' },
      { name: 'Outdoor Gym', icon: 'Dumbbell' },
      { name: 'Aerobics/Yoga Station', icon: 'Heart' },
      { name: 'Drivers Waiting Rooms', icon: 'Car' },
      { name: 'Jogging Track', icon: 'Footprints' },
      { name: 'Organic Plantation', icon: 'Leaf' },
      { name: 'Peripheral Tree Planting', icon: 'Trees' },
      { name: '24x7 Security', icon: 'Shield' },
      { name: 'Power Backup', icon: 'BatteryCharging' },
      { name: 'Lift(s)', icon: 'ArrowUpDown' },
      { name: 'Rain Water Harvesting', icon: 'CloudDrizzle' },
      { name: 'Solar Energy', icon: 'Sun' },
      { name: 'Sewage Treatment Plant', icon: 'Factory' },
    ],
    specifications: [
      {
        category: 'Floor & Counter',
        items: [
          'Living/Dining: Vitrified Tiles',
          'Bedrooms: Vitrified Tiles',
          'Kitchen: Vitrified Tiles',
          'Toilets: Anti Skid Ceramic Tiles',
        ],
      },
      {
        category: 'Fittings',
        items: [
          'Electrical: Finolex Cables',
          'Kitchen: Granite Platform with SS Sink',
          'Doors: Teak Wood Frame & Shutter',
          'Windows: Aluminium Powder Coated Glazed',
        ],
      },
      {
        category: 'Wall & Ceiling',
        items: ['Interior: Asian Paints', 'Exterior: Asian Paints'],
      },
    ],
    floor_plans: [
      {
        group: '2 BHK',
        range: '1235-1240 SFT',
        image: 'https://images.pexels.com/photos/323776/pexels-photo-323776.jpeg?auto=compress&cs=tinysrgb&w=1200',
        variants: [
          { desc: '1235 SFT / East Facing', units: 2 },
          { desc: '1235 SFT / West Facing', units: 2 },
          { desc: '1240 SFT / North Facing', units: 4 },
        ],
      },
      {
        group: '3 BHK',
        range: '1530-1995 SFT',
        image: 'https://images.pexels.com/photos/373612/pexels-photo-373612.jpeg?auto=compress&cs=tinysrgb&w=1200',
        variants: [
          { desc: '1680 SFT / West Facing', units: 2 },
          { desc: '1530 SFT / East & West Facing', units: 2 },
          { desc: '1535 SFT / North Facing', units: 2 },
          { desc: '1995 SFT / Corner West Facing', units: 1 },
        ],
      },
    ],
    nearby_places: [
      { name: 'Infosys SEZ Pocharam', type: 'workplace', distance: '5 mins' },
      { name: 'Uppal Metro Station', type: 'transport', distance: '15 mins' },
      { name: 'Inner Ring Road', type: 'transport', distance: '15 mins' },
      { name: 'Rockwoods International School', type: 'school', distance: 'Nearby' },
      { name: 'Alroyce Multi Speciality Hospital', type: 'hospital', distance: '11 mins' },
    ],
    apartments: [
      { num: 1, bhk: '3 BHK', facing: 'Corner Facing | WEST', area: 1995, beds: 3, baths: 3, thumbnail: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1200' },
      { num: 2, bhk: '3 BHK', facing: 'WEST', area: 1680, beds: 3, baths: 3, thumbnail: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=1200' },
      { num: 3, bhk: '2 BHK', facing: 'EAST', area: 1235, beds: 2, baths: 2, thumbnail: 'https://images.pexels.com/photos/2797464/pexels-photo-2797464.jpeg?auto=compress&cs=tinysrgb&w=1200' },
      { num: 4, bhk: '2 BHK', facing: 'NORTH', area: 1240, beds: 2, baths: 2, thumbnail: 'https://images.pexels.com/photos/221455/pexels-photo-221455.jpeg?auto=compress&cs=tinysrgb&w=1200' },
      { num: 5, bhk: '2 BHK', facing: 'EAST', area: 1235, beds: 2, baths: 2, thumbnail: 'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=1200' },
      { num: 6, bhk: '2 BHK', facing: 'NORTH', area: 1240, beds: 2, baths: 2, thumbnail: 'https://images.pexels.com/photos/2797464/pexels-photo-2797464.jpeg?auto=compress&cs=tinysrgb&w=1200' },
      { num: 7, bhk: '3 BHK', facing: 'EAST & WEST', area: 1530, beds: 3, baths: 3, thumbnail: 'https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg?auto=compress&cs=tinysrgb&w=1200' },
      { num: 8, bhk: '3 BHK', facing: 'NORTH', area: 1535, beds: 3, baths: 3, thumbnail: 'https://images.pexels.com/photos/2698509/pexels-photo-2698509.jpeg?auto=compress&cs=tinysrgb&w=1200' },
    ],
  },
  {
    name: 'Luxuvia Padmavati Residency',
    slug: 'padmavati-residency',
    tagline: 'Completed Excellence in East Hyderabad',
    description:
      'Padmavati Residency offers premium 2 & 3 BHK apartments with modern finishes, spacious layouts, and easy access to local schools, retail, and transportation hubs in Peerzadiguda.',
    location: 'Peerzadiguda, East Hyderabad',
    address: 'Peerzadiguda, East Hyderabad, Telangana',
    map_link: 'https://maps.google.com/?q=Peerzadiguda,+East+Hyderabad',
    status: 'completed',
    rera_id: 'P02200007286',
    configurations: '2 & 3 BHK Apartments',
    size_range: '1,214 - 1,455 sq.ft.',
    total_units: 60,
    buildings: 2,
    floors: 9,
    project_area: '1.10 Acres',
    possession_date: '2025',
    launch_date: '2022',
    price_range: '65.56 L - 78.57 L',
    avg_price: '72.06 L',
    images: ['https://images.pexels.com/photos/261051/pexels-photo-261051.jpeg?auto=compress&cs=tinysrgb&w=1200'],
    building_images: ['https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=1200'],
    highlights: ['Completed premium living project', 'Occupancy certificate delivered', 'Trusted local community'],
    amenities: [
      { name: 'Clubhouse', icon: 'Building2' },
      { name: 'Gym', icon: 'Dumbbell' },
      { name: 'Swimming Pool', icon: 'Droplets' },
      { name: 'Security', icon: 'Shield' },
    ],
    specifications: [
      { category: 'Quality', items: ['Vitrified Tiles', 'Granite Kitchen Platform', 'Teak Wood Doors'] },
    ],
    floor_plans: [],
    nearby_places: [
      { name: 'Peerzadiguda Metro', type: 'transport', distance: '10 mins' },
      { name: 'Ramappa Seed Park', type: 'Park', distance: '7 mins' },
    ],
    apartments: [],
  },
  {
    name: 'Luxuvia Venkataramana Residency',
    slug: 'venkataramana-residency',
    tagline: 'Modern Apartments in Pocharam',
    description:
      'Venkataramana Residency is designed for modern families seeking comfort and convenience. The project features well-planned 2 & 3 BHK apartments surrounded by green spaces and essential amenities.',
    location: 'Peerzadiguda, East Hyderabad',
    address: 'Survey No. 18, Peerzadiguda, East Hyderabad, Telangana',
    map_link: 'https://maps.google.com/?q=Peerzadiguda,+East+Hyderabad',
    status: 'in_progress',
    rera_id: 'P02200007287',
    configurations: '2 & 3 BHK Apartments',
    size_range: '1,206 - 1,453 sq.ft.',
    total_units: 72,
    buildings: 2,
    floors: 8,
    project_area: '1.05 Acres',
    possession_date: '2026',
    launch_date: '2024',
    price_range: null,
    avg_price: null,
    images: ['https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1200'],
    building_images: ['https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1200'],
    highlights: ['Upcoming residential community', 'Smart design for modern living', 'Strong connectivity to IT hubs'],
    amenities: [
      { name: 'Garden', icon: 'Leaf' },
      { name: 'Jogging Track', icon: 'Footprints' },
      { name: 'Security', icon: 'Shield' },
      { name: 'Parking', icon: 'Car' },
    ],
    specifications: [
      { category: 'Interiors', items: ['Vitrified Tiles in living areas', 'Anti-skid bathroom tiles'] },
    ],
    floor_plans: [],
    nearby_places: [
      { name: 'Peerzadiguda Bus Stop', type: 'transport', distance: '5 mins' },
      { name: 'Pocharam Lake', type: 'Nature', distance: '1 km' },
    ],
    apartments: [],
  },
];

const seed = async () => {
  try {
    console.log('\n🌱 Starting Supabase seed process...\n');

    // Verify connection
    console.log('📡 Verifying Supabase connection...');
    const { data: connectionTest, error: connError } = await supabase
      .from('projects')
      .select('count')
      .limit(1);

    if (connError) {
      console.error('❌ Connection failed:', connError.message);
      console.error('\n⚠️  IMPORTANT: Please ensure the "projects" table exists with proper columns.');
      console.error('   Run this SQL in your Supabase SQL Editor:\n');
      const fs = require('fs');
      const path = require('path');
      const sqlPath = path.join(__dirname, 'migrations', 'create_projects_table.sql');
      if (fs.existsSync(sqlPath)) {
        const sqlContent = fs.readFileSync(sqlPath, 'utf8');
        console.log(sqlContent);
      }
      process.exit(1);
    }

    console.log('✓ Connection verified!\n');

    // Clear existing data (optional)
    console.log('🗑️  Clearing existing projects...');
    const { error: deleteError } = await supabase.from('projects').delete().neq('id', -1);
    if (deleteError && !deleteError.message.includes('No rows')) {
      console.warn('⚠️  Warning clearing projects:', deleteError.message);
    } else {
      console.log('✓ Cleared existing projects\n');
    }

    // Seed new data
    console.log('📝 Seeding project data...');
    const { data, error } = await supabase
      .from('projects')
      .insert(seedProjects)
      .select('id, slug, name');

    if (error) {
      throw error;
    }

    console.log(`\n✅ Successfully seeded ${data.length} projects:\n`);
    data.forEach((project, idx) => {
      console.log(`  ${idx + 1}. ${project.name}`);
      console.log(`     Slug: ${project.slug}`);
      console.log(`     ID: ${project.id}\n`);
    });

    console.log('🎉 Seeding complete!\n');
  } catch (error) {
    console.error('\n❌ Seed error:', error.message || error);
    console.error('\nStack:', error);
    process.exit(1);
  }
};

// Run the seed
seed();
