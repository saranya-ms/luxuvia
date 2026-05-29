import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  BadgeCheck,
  Building2,
  Calendar,
  Camera,
  Car,
  CheckCircle,
  Compass,
  Droplets,
  Dumbbell,
  ExternalLink,
  Footprints,
  Factory,
  Heart,
  Leaf,
  MapPin,
  Maximize,
  Phone,
  Sun,
  Zap,
  BedDouble,
  Baby,
  Shield,
  ArrowUpDown,
  BatteryCharging,
  CloudDrizzle,
  ChevronRight,
} from 'lucide-react';
import API from '../utils/api';
import InquiryForm from '../components/InquiryForm';
import Reveal from '../components/Reveal';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

const iconMap = {
  Car,
  Droplets,
  Dumbbell,
  Heart,
  BedDouble,
  Baby,
  Leaf,
  Shield,
  ArrowUpDown,
  BatteryCharging,
  Factory,
  Sun,
  Zap,
  CloudDrizzle,
  Camera,
  Compass,
  Footprints,
  Building2,
  CheckCircle,
  Theater: Building2,
  Trees: Leaf,
};

const fallbackImage =
  'https://images.pexels.com/photos/18435276/pexels-photo-18435276.jpeg?auto=compress&cs=tinysrgb&w=1600';

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedApartment, setSelectedApartment] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await API.get(`/projects/${slug}`);
        setProject(res.data);
      } catch (fetchError) {
        console.error('Error fetching project:', fetchError);
        setError('Unable to load project details.');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [slug]);

  useEffect(() => {
    if (project?.apartments?.length) {
      setSelectedApartment(project.apartments[0]);
    }
  }, [project]);

  const heroImage = useMemo(() => {
    if (!project) return fallbackImage;
    if (slug === 'sri-laxmi-janardhana-nilayam') {
      return project.building_images?.[0] || project.images?.[0] || fallbackImage;
    }
    return project.images?.[0] || project.building_images?.[0] || fallbackImage;
  }, [project, slug]);

  const status = project?.status?.toLowerCase();
  const statusStyles = {
    completed: {
      bg: 'bg-emerald-600/20',
      text: 'text-emerald-300',
      label: 'Completed',
    },
    in_progress: {
      bg: 'bg-[#f59218]/15',
      text: 'text-[#f5a848]',
      label: 'In Progress',
    },
    upcoming: {
      bg: 'bg-[#1e3a8a]/40',
      text: 'text-[#6b8fd4]',
      label: 'Upcoming',
    },
  };
  const statusBadge = statusStyles[status] || statusStyles.upcoming;

  if (loading) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center bg-dark-base text-text-white">
        <div className="w-8 h-8 border-2 border-[#f59218] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="pt-24 min-h-screen flex flex-col items-center justify-center gap-3 bg-dark-base text-text-white px-4">
        <p className="font-heading text-2xl text-white">Project not found</p>
        <Link to="/projects" className="text-[#f59218] font-body text-sm hover:underline">
          Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <main data-testid="project-detail-page" className="bg-dark-base text-text-white">
      <section className="relative h-[50vh] min-h-[380px]">
        <img
          src={heroImage}
          alt={project.name}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e1a] via-[#0a0e1a]/50 to-transparent" />

        <div className="absolute bottom-0 left-0 w-full px-4 pb-8 sm:px-6 lg:px-8">
          <div className="max-w-7xl">
            <Link
              to="/projects"
              data-testid="back-to-projects"
              className="inline-flex items-center gap-1.5 text-[#6b7fa0] hover:text-[#f59218] font-body text-sm mb-3 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              All Projects
            </Link>

            <div className="flex flex-wrap items-center gap-3">
              <span
                className={`${statusBadge.bg} ${statusBadge.text} px-3 py-1 text-[10px] font-body font-semibold uppercase tracking-wider rounded-sm`}
              >
                {statusBadge.label}
              </span>
              {project.rera_id && (
                <span className="flex items-center gap-1 text-emerald-400 text-[11px] font-body">
                  <BadgeCheck className="w-3.5 h-3.5" />
                  RERA: {project.rera_id}
                </span>
              )}
            </div>

            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-white mt-4 mb-2">
              {project.name}
            </h1>

            <div className="inline-flex flex-wrap items-center gap-3 text-[#6b7fa0] font-body text-sm">
              <MapPin className="w-4 h-4 text-[#f59218]" />
              <span>{project.address || project.location}</span>
              {project.map_link && (
                <a
                  href={project.map_link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-[#f59218] hover:underline"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Map
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#1e3a8a] py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
            {[
              { icon: Building2, label: 'Configuration', value: project.configurations },
              { icon: Maximize, label: 'Sizes', value: project.size_range },
              { icon: Building2, label: 'Total Units', value: `${project.total_units} Units` },
              { icon: Calendar, label: 'Possession', value: project.possession_date },
              { icon: BadgeCheck, label: 'Price', value: project.price_range || 'On Request' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-2.5 bg-[#0f1628] border border-[#1e2d50] p-4 rounded-md">
                <item.icon className="w-4 h-4 text-[#f59218] mt-0.5 shrink-0" />
                <div>
                  <p className="font-body text-[10px] text-white/50 uppercase tracking-wider">{item.label}</p>
                  <p className="font-body text-sm text-white">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Tabs defaultValue="overview">
          <TabsList className="bg-[#0f1628] border border-[#1e2d50] p-1 w-full flex flex-wrap justify-start gap-0 h-auto rounded-md mb-10">
            {['Overview', 'Floor Plans', 'Amenities', 'Specifications', 'Location', 'Contact'].map((tab) => {
              const value = tab.toLowerCase().replace(/\s+/g, '-');
              return (
                <TabsTrigger
                  key={value}
                  value={value}
                  data-testid={`tab-${value}`}
                  className="font-body text-[11px] uppercase tracking-wider px-4 py-2.5 rounded-sm data-[state=active]:bg-[#f59218] data-[state=active]:text-white text-[#9bb0d2]"
                >
                  {tab}
                </TabsTrigger>
              );
            })}
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2 space-y-10">
                <Reveal>
                  <div>
                    <h2 className="font-heading text-2xl text-white mb-3">About This Project</h2>
                    <div className="accent-line mb-5" />
                    <p className="font-body text-[#8090b0] leading-relaxed mb-8">
                      {project.description}
                    </p>
                  </div>
                </Reveal>

                {project.highlights?.length > 0 && (
                  <Reveal delay={100}>
                    <div>
                      <h3 className="font-heading text-lg text-white mb-4">Key Highlights</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {project.highlights.map((highlight, idx) => (
                          <div
                            key={idx}
                            className="bg-[#0f1628] border border-[#1e2d50] p-4 rounded-md flex items-start gap-3"
                          >
                            <CheckCircle className="w-4 h-4 text-[#f59218] mt-0.5" />
                            <p className="font-body text-sm text-[#8090b0]">{highlight}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Reveal>
                )}

                {project.building_images?.length > 0 && (
                  <Reveal delay={200}>
                    <div>
                      <h3 className="font-heading text-lg text-white mb-4">Gallery</h3>
                      <div className="grid grid-cols-3 gap-3">
                        {project.building_images.slice(0, 6).map((image, idx) => (
                          <div
                            key={idx}
                            className="aspect-[4/3] overflow-hidden border border-[#1e2d50] rounded-md"
                          >
                            <img
                              src={image}
                              alt={`Gallery ${idx + 1}`}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </Reveal>
                )}
              </div>

              <Reveal className="bg-[#0f1628] border border-[#1e2d50] p-5 sticky top-28 rounded-md">
                <h3 className="font-heading text-lg text-white mb-2">Project Overview</h3>
                <div className="accent-line mb-4" />
                <div className="space-y-3">
                  {[
                    { label: 'Project Size', value: `${project.buildings} Building(s) - ${project.total_units} Units` },
                    { label: 'Floors', value: project.floors ? `${project.floors} Floors` : '�' },
                    { label: 'Area', value: project.project_area || '�' },
                    { label: 'Launch', value: project.launch_date || '�' },
                    { label: 'Possession', value: project.possession_date },
                    { label: 'Avg. Price', value: project.avg_price || 'On Request' },
                    { label: 'RERA', value: project.rera_id || '�' },
                  ].map((row) => (
                    <div key={row.label} className="flex justify-between items-center border-b border-[#1e2d50] pb-2.5 last:border-0">
                      <span className="font-body text-[11px] text-[#4a5a7a] uppercase tracking-wider">{row.label}</span>
                      <span className="font-body text-sm text-white">{row.value}</span>
                    </div>
                  ))}
                </div>
                <Link
                  to="/contact"
                  className="block w-full btn-primary py-3 font-semibold uppercase tracking-[0.2em] text-[11px] font-body text-center rounded-sm mt-5"
                >
                  Enquire Now
                </Link>
              </Reveal>
            </div>
          </TabsContent>

          <TabsContent value="floor-plans">
            <div>
              <h2 className="font-heading text-2xl text-white mb-3">Browse Plans</h2>
              <div className="accent-line mb-6" />
              {project.apartments?.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {project.apartments.map((apt) => (
                    <Link
                      key={apt.num}
                      to={`/projects/${slug}/apartment/${apt.num}`}
                      data-testid={`apt-card-${apt.num}`}
                      className="card-lift bg-[#0f1628] border border-[#1e2d50] overflow-hidden group block rounded-md"
                    >
                      <div className="relative h-40 overflow-hidden">
                        <img
                          src={apt.thumbnail}
                          alt={`Apartment ${apt.num}`}
                          className="card-img w-full h-full object-cover transition-transform duration-500"
                        />
                        <span className="absolute top-2 left-2 rounded-sm bg-[#f59218] px-2 py-1 text-[10px] font-body font-bold text-white">
                          {apt.bhk}
                        </span>
                      </div>
                      <div className="p-4">
                        <h4 className="font-heading text-lg text-white group-hover:text-[#f59218] mb-1">
                          Apartment {apt.num}
                        </h4>
                        <p className="font-body text-xs text-[#6b7fa0] mb-2.5">
                          {apt.facing} � {apt.area} SFT
                        </p>
                        <div className="flex items-center gap-4 text-[#4a5a7a] font-body text-[11px]">
                          <span className="flex items-center gap-1"><BedDouble className="w-4 h-4" /> {apt.beds}</span>
                          <span className="flex items-center gap-1"><BadgeCheck className="w-4 h-4" /> {apt.baths}</span>
                          <span className="flex items-center gap-1"><Maximize className="w-4 h-4" /> {apt.area}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-[#4a5a7a] font-body text-sm py-8 text-center">
                  Apartment details coming soon for this project.
                </p>
              )}
            </div>
          </TabsContent>

          <TabsContent value="amenities">
            <div>
              <h2 className="font-heading text-2xl text-white mb-3">Amenities Included</h2>
              <div className="accent-line mb-8" />
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {project.amenities?.map((amenity, idx) => {
                  const Icon = iconMap[amenity.icon] || CheckCircle;
                  return (
                    <Reveal key={idx} delay={idx * 60}>
                      <div className="group bg-[#0f1628] border border-[#1e2d50] p-5 text-center hover:border-[#f59218]/30 transition-all rounded-md">
                        <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-[#1e3a8a]/30 border border-[#3b5fc0]/30 group-hover:bg-[#f59218]/15 group-hover:border-[#f59218]/40 transition-all">
                          <Icon className="w-5 h-5 text-[#f59218]" />
                        </div>
                        <p className="font-body text-sm text-[#8090b0]">{amenity.name}</p>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="specifications">
            <div>
              <h2 className="font-heading text-2xl text-white mb-3">Specifications</h2>
              <div className="accent-line mb-8" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {project.specifications?.map((spec, idx) => (
                  <Reveal key={idx} delay={idx * 100}>
                    <div className="bg-[#0f1628] border border-[#1e2d50] p-5 rounded-md">
                      <h3 className="font-heading text-lg text-[#f59218] mb-3">{spec.category}</h3>
                      <ul className="space-y-2.5">
                        {spec.items.map((item, itemIdx) => (
                          <li key={itemIdx} className="flex items-start gap-2">
                            <CheckCircle className="w-3.5 h-3.5 text-[#3b5fc0] mt-0.5 shrink-0" />
                            <span className="font-body text-sm text-[#8090b0]">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="location">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <div className="bg-[#0f1628] border border-[#1e2d50] p-5 mb-5 rounded-md">
                  <h3 className="font-heading text-lg text-white mb-2">Address</h3>
                  <p className="font-body text-sm text-[#8090b0]">{project.address}</p>
                  {project.map_link && (
                    <a
                      href={project.map_link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-[#f59218] text-sm font-body mt-3"
                    >
                      Open in Google Maps
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

                <h3 className="font-heading text-lg text-white mb-3">Nearby Landmarks</h3>
                <div className="space-y-2.5">
                  {project.nearby_places?.map((place, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 bg-[#0f1628] border border-[#1e2d50] p-3.5 rounded-md"
                    >
                      <MapPin className="w-4 h-4 text-[#3b5fc0] shrink-0" />
                      <div className="flex-1">
                        <p className="font-body text-sm text-white">{place.name}</p>
                        <p className="font-body text-[11px] text-[#4a5a7a]">{place.type}</p>
                      </div>
                      <p className="font-body text-sm text-[#f59218] shrink-0">{place.distance}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#0f1628] border border-[#1e2d50] min-h-[300px] rounded-md overflow-hidden">
                {project.map_link ? (
                  <iframe
                    title="Project location map"
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(project.address || project.location)}&output=embed`}
                    className="w-full h-full"
                  />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center gap-3 p-8 text-[#8090b0]">
                    <MapPin className="w-10 h-10 text-[#f59218]" />
                    <p className="font-heading text-lg text-white">Location details coming soon</p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="contact">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div>
                <h2 className="font-heading text-2xl text-white mb-3">Interested in {project.name}?</h2>
                <div className="accent-line mb-5" />
                <p className="font-body text-[#6b7fa0] mb-5 leading-relaxed">
                  Fill in the form and our team will get back to you with the latest availability and pricing.
                </p>
                <a href="tel:+918877555999" className="flex items-center gap-2.5 text-[#8090b0] hover:text-[#f59218] transition-colors">
                  <Phone className="w-5 h-5 text-[#f59218]" />
                  <span className="font-body text-lg">+91 8877 555 999</span>
                </a>
              </div>
              <div className="bg-[#0f1628] border border-[#1e2d50] p-7 rounded-md">
                <h3 className="font-heading text-lg text-white mb-5">Request Details</h3>
                <InquiryForm
                  projectSlug={project.slug}
                  projectName={project.name}
                  inquiryType="project_inquiry"
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </main>
  );
}
