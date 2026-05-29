import { useState } from 'react';
import ProjectCard from '../components/ProjectCard';
import Reveal from '../components/Reveal';

const projects = [
  {
    slug: 'sri-laxmi-janardhana-nilayam',
    title: 'Luxuvia Sri Laxmi Janardhana Nilayam',
    location: 'Narapally, Hyderabad',
    type: '2 & 3 BHK Apartments',
    area: '1,235 - 1,995 sq.ft.',
    price: 'Price on Request',
    status: 'In Progress',
    image: 'https://framerusercontent.com/images/TIkUKiWQjk1Ln9nR4qbFAMymVWM.png',
  },
  {
    slug: 'padmavati-residency',
    title: 'Luxuvia Padmavati Residency',
    location: 'Peerzadiguda, East Hyderabad',
    type: '2 & 3 BHK Apartments',
    area: '1,214 - 1,455 sq.ft.',
    price: '65.56 L - 78.57 L',
    status: 'Completed',
    image: 'https://images.pexels.com/photos/18435276/pexels-photo-18435276.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    slug: 'venkataramana-residency',
    title: 'Luxuvia Venkataramana Residency',
    location: 'Peerzadiguda, East Hyderabad',
    type: '2 & 3 BHK Apartments',
    area: '1,206 - 1,453 sq.ft.',
    price: 'Price on Request',
    status: 'In Progress',
    image: 'https://images.pexels.com/photos/18435276/pexels-photo-18435276.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];

const filters = [
  { value: 'All', label: 'All Projects' },
  { value: 'Completed', label: 'Completed' },
  { value: 'In Progress', label: 'In Progress' },
  { value: 'Upcoming', label: 'Upcoming' },
];

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredProjects =
    activeFilter === 'All'
      ? projects
      : projects.filter((project) => project.status === activeFilter);

  return (
    <section data-testid="projects-page" className="bg-dark-base text-text-white min-h-screen pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="bg-[#0d1220] border-b border-[#1e2d50] rounded-[32px] px-6 py-16 lg:px-12 lg:py-20 mb-10">
          <Reveal>
            <p className="font-body text-[11px] uppercase tracking-[0.35em] text-[#f59218] mb-2">Our Portfolio</p>
            <div className="accent-line mb-5" />
            <h1 className="font-heading text-4xl sm:text-5xl text-white mb-4">Projects</h1>
            <p className="font-body text-sm text-[#6b7fa0] max-w-2xl leading-7">
              From thoughtfully designed apartments to premium residential communities, explore Luxuvia’s latest developments in East Hyderabad.
            </p>
          </Reveal>
        </section>

        <Reveal className="mb-8">
          <div className="flex flex-wrap gap-2.5">
            {filters.map((filter) => (
              <button
                key={filter.value}
                type="button"
                data-testid={`filter-${filter.value.toLowerCase().replace(/\s+/g, '_')}`}
                onClick={() => setActiveFilter(filter.value)}
                className={`rounded-full px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.12em] transition-all ${
                  activeFilter === filter.value
                    ? 'btn-primary'
                    : 'border border-[#1e2d50] bg-transparent text-[#6b7fa0] hover:border-[#f59218] hover:text-[#f59218]'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </Reveal>

        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        ) : (
          <div className="rounded-[32px] border border-[#1e2d50] bg-[#08162f] p-12 text-center text-[#8090b0]">
            No projects found for this filter.
          </div>
        )}
      </div>
    </section>
  );
}
