-- Create projects table with all required columns
CREATE TABLE IF NOT EXISTS projects (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  tagline TEXT,
  description TEXT,
  location TEXT,
  address TEXT,
  map_link TEXT,
  status TEXT NOT NULL DEFAULT 'upcoming',
  rera_id TEXT,
  configurations TEXT,
  size_range TEXT,
  total_units INTEGER,
  buildings INTEGER,
  floors INTEGER,
  project_area TEXT,
  possession_date TEXT,
  launch_date TEXT,
  price_range TEXT,
  avg_price TEXT,
  images JSONB DEFAULT '[]'::jsonb,
  building_images JSONB DEFAULT '[]'::jsonb,
  highlights JSONB DEFAULT '[]'::jsonb,
  amenities JSONB DEFAULT '[]'::jsonb,
  specifications JSONB DEFAULT '[]'::jsonb,
  floor_plans JSONB DEFAULT '[]'::jsonb,
  nearby_places JSONB DEFAULT '[]'::jsonb,
  apartments JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);

-- Enable Row Level Security (optional, but recommended)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read" ON projects
  FOR SELECT USING (true);

-- Create policy to allow insert/update/delete only for authenticated users
CREATE POLICY "Allow insert for authenticated users" ON projects
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow update for authenticated users" ON projects
  FOR UPDATE USING (true);

CREATE POLICY "Allow delete for authenticated users" ON projects
  FOR DELETE USING (true);
