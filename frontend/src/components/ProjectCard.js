import { Link } from 'react-router-dom';
import { ArrowUpRight, MapPin } from 'lucide-react';
import Reveal from './Reveal';

const statusStyles = {
  'In Progress': 'bg-[#f59218]/15 border-[#f59218]/30 text-[#f5a848]',
  Completed: 'bg-emerald-600/20 border-emerald-500/30 text-emerald-300',
  Upcoming: 'bg-blue-600/20 border-blue-500/30 text-blue-300',
};

export default function ProjectCard({ project }) {
  const status = project.status || 'Upcoming';
  const statusClass = statusStyles[status] || statusStyles.Upcoming;

  return (
    <Reveal>
      <Link
        to={`/projects/${project.slug}`}
        data-testid={`project-card-${project.slug}`}
        className="card-lift block overflow-hidden rounded-[24px] border border-[#1e2d50] bg-[#0f1628] shadow-pop transition-transform duration-300 hover:-translate-y-1"
      >
        <div className="relative h-52 overflow-hidden bg-[#08162f]">
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className="card-img h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-[#0a0e1a]/80 text-[#8090b0]">
              Image not available
            </div>
          )}
          <span
            className={`absolute left-3 top-3 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] ${statusClass}`}
          >
            {status}
          </span>
        </div>

        <div className="space-y-4 p-5">
          <div className="flex items-center gap-2 text-[#6b7fa0]">
            <MapPin size={16} className="text-[#f59218]" />
            <p className="font-body text-xs">{project.location}</p>
          </div>

          <h3 className="font-heading text-xl text-[#eef1f6] group-hover:text-[#f59218] transition-colors">
            {project.title}
          </h3>

          <p className="font-body text-xs text-[#4a5a7a]">
            {project.type} · {project.area}
          </p>

          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-body text-sm font-semibold text-[#f59218]">{project.price}</p>
            </div>
            <div className="inline-flex items-center gap-2 text-[#f59218] font-body text-sm font-semibold transition-all duration-300 group-hover:translate-x-1">
              Explore <ArrowUpRight size={16} />
            </div>
          </div>
        </div>
      </Link>
    </Reveal>
  );
}
