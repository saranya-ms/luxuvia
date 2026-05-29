import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Building2, Handshake, MapPin, Users, Award } from 'lucide-react';
import API from '../utils/api';
import Reveal from '../components/Reveal';
import ProjectCard from '../components/ProjectCard';
import InquiryForm from '../components/InquiryForm';

export default function HomePage() {
  const [projects, setProjects] = useState([]);
  const [featuredProject, setFeaturedProject] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await API.get('/projects');
        const data = res.data;
        setProjects(data);

        // Find featured project
        const featured = data.find(
          (p) => p.slug === 'sri-laxmi-janardhana-nilayam'
        );
        setFeaturedProject(featured);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="bg-dark-base text-text-white">
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-screen flex items-center pt-24">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://framerusercontent.com/images/on75T1Geer2QQKG88lS0V08.jpg?scale-down-to=1024"
            alt="Hero background"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 hero-gradient"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <Reveal className="max-w-2xl">
              <div className="space-y-6">
                {/* Accent Line */}
                <div className="accent-line animate-in fade-in slide-in-from-left-4" />

                {/* Eyebrow */}
                <p className="text-[#f59218] text-xs font-body font-semibold tracking-[0.35em] uppercase">
                  Luxuvia Constructions & Developers
                </p>

                {/* H1 */}
                <h1 className="font-heading text-4xl md:text-6xl font-semibold leading-tight">
                  Let's hunt for your{' '}
                  <span className="text-[#f59218] italic">dream residence</span>
                </h1>

                {/* Subtext */}
                <p className="font-body text-[#b0bdd0] text-lg">
                  Explore our range of beautiful properties in East Hyderabad. Premium living
                  spaces crafted with uncompromising quality.
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Link
                    to="/contact"
                    className="btn-primary inline-flex items-center justify-center"
                  >
                    BOOK A SITE VISIT →
                  </Link>
                  <Link
                    to="/projects"
                    className="inline-flex items-center justify-center border-2 border-white/30 text-white hover:bg-white/10 px-6 py-3 rounded-sm font-body font-semibold text-sm transition-colors"
                  >
                    VIEW PROJECTS
                  </Link>
                </div>
              </div>
            </Reveal>

            {/* Right Floating Badge */}
            <div className="hidden lg:flex justify-end">
              <Reveal delay={200}>
                <div className="bg-[#0f1628]/80 border border-[#1e2d50] rounded-lg p-6 backdrop-blur-sm">
                  <div className="space-y-2 text-center">
                    <p className="text-sm font-body text-[#8090b0]">✓ Certified</p>
                    <p className="font-heading text-xl text-[#eef1f6]">TS RERA</p>
                    <p className="text-xs font-body text-[#8090b0]">Approved</p>
                    <div className="text-xs font-body text-[#f59218] pt-2">
                      <p>100% Compliant</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS BAR ===== */}
      <section className="bg-[#1e3a8a] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
            {[
              { value: '100+', label: 'Happy Families' },
              { value: '3+', label: 'Projects Delivered' },
              { value: '5+', label: 'Years Experience' },
              { value: '100%', label: 'RERA Approved' },
            ].map((stat, idx) => (
              <Reveal key={idx} delay={idx * 50}>
                <div className="text-center">
                  <p className="font-heading text-3xl md:text-4xl font-semibold text-[#f59218]">
                    {stat.value}
                  </p>
                  <p className="font-body text-xs md:text-[11px] uppercase tracking-wider text-white/70 mt-2">
                    {stat.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED PROJECT ===== */}
      {featuredProject && (
        <section className="bg-[#0a0e1a] py-24 relative noise">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <Reveal className="text-center mb-16">
              <p className="text-[#f59218] text-xs font-body font-semibold tracking-[0.35em] uppercase mb-3">
                Featured Project
              </p>
              <div className="accent-line mx-auto mb-6" />
              <h2 className="font-heading text-4xl md:text-5xl text-[#eef1f6] mb-4">
                {featuredProject.name}
              </h2>
              <p className="font-heading text-2xl text-[#f59218] italic">
                {featuredProject.tagline || 'Premium Living in East Hyderabad'}
              </p>
            </Reveal>

            {/* Image */}
            <Reveal className="mb-12">
              {featuredProject.images && featuredProject.images[0] && (
                <img
                  src={featuredProject.images[0]}
                  alt={featuredProject.name}
                  className="w-full h-96 object-cover rounded-md border border-[#1e2d50]"
                />
              )}
            </Reveal>

            {/* Stats Grid */}
            <Reveal>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                {[
                  { label: 'Total Units', value: featuredProject.total_units || '40' },
                  { label: 'From Infosys', value: '8 km' },
                  { label: 'From Uppal Metro', value: '12 km' },
                  { label: 'Floor Plans', value: featuredProject.floor_plans?.length || '3' },
                ].map((stat, idx) => (
                  <div
                    key={idx}
                    className="bg-[#0f1628] border border-[#1e2d50] p-6 rounded-md text-center"
                  >
                    <p className="font-heading text-3xl text-[#f59218] mb-2">{stat.value}</p>
                    <p className="font-body text-sm text-[#8090b0]">{stat.label}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* CTA Button */}
            <Reveal className="text-center">
              <Link to={`/projects/${featuredProject.slug}`} className="btn-primary inline-block">
                EXPLORE THIS PROJECT →
              </Link>
            </Reveal>
          </div>
        </section>
      )}

      {/* ===== ALL PROJECTS ===== */}
      <section className="bg-[#0d1220] py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
            <Reveal>
              <div>
                <p className="text-[#f59218] text-xs font-body font-semibold tracking-[0.35em] uppercase mb-3">
                  Properties
                </p>
                <div className="accent-line mb-6" />
                <h2 className="font-heading text-4xl md:text-5xl text-[#eef1f6]">
                  Ready to buy your dream home?
                </h2>
              </div>
            </Reveal>
            <Link
              to="/projects"
              className="border-2 border-[#f59218] text-[#f59218] hover:bg-[#f59218]/10 px-6 py-3 rounded-sm font-body font-semibold text-sm transition-colors whitespace-nowrap"
            >
              ALL PROPERTIES
            </Link>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.slice(0, 3).map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="bg-[#1e3a8a] py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <Reveal className="text-center mb-16">
            <p className="text-[#f5b862] text-xs font-body font-semibold tracking-[0.35em] uppercase mb-3">
              How It Works
            </p>
            <div className="accent-line mx-auto mb-6" />
            <h2 className="font-heading text-4xl md:text-5xl text-[#eef1f6]">
              Discover the advantages
            </h2>
          </Reveal>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: Search,
                title: 'Find Your Ideal Property',
                desc: 'Browse our curated listings and find properties that match your dreams.',
              },
              {
                icon: Building2,
                title: 'Schedule a Viewing',
                desc: 'Book a personalized property tour with our experienced team.',
              },
              {
                icon: Handshake,
                title: 'Secure Your Deal',
                desc: 'Close on your dream property with our transparent process.',
              },
            ].map((step, idx) => {
              const Icon = step.icon;
              return (
                <Reveal key={idx} delay={idx * 100} className="group">
                  <div className="text-center">
                    {/* Icon */}
                    <div className="w-16 h-16 bg-white/10 border border-white/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-[#f59218]/20 group-hover:border-[#f59218]/50 transition-all duration-300">
                      <Icon size={24} className="text-white" />
                    </div>

                    {/* Title */}
                    <h3 className="font-heading text-xl text-white mb-3">{step.title}</h3>

                    {/* Description */}
                    <p className="font-body text-white/70 text-sm">{step.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section className="bg-[#0a0e1a] py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left: Image */}
            <Reveal>
              <img
                src="https://framerusercontent.com/images/BeFApd0BHsxGKeT3w5xAG9ehdOk.jpg"
                alt="Interior"
                className="h-[420px] object-cover border border-[#1e2d50] rounded-md"
              />
            </Reveal>

            {/* Right: Content */}
            <Reveal>
              <div>
                <p className="text-[#f59218] text-xs font-body font-semibold tracking-[0.35em] uppercase mb-3">
                  Why Choose Us
                </p>
                <div className="accent-line mb-6" />
                <h2 className="font-heading text-4xl text-[#eef1f6] mb-8">
                  What makes us the right partner?
                </h2>

                {/* Features */}
                <div className="space-y-6">
                  {[
                    {
                      icon: MapPin,
                      title: 'Expert Local Knowledge',
                      desc: 'Extensive experience and insights into the East Hyderabad market.',
                    },
                    {
                      icon: Users,
                      title: 'Personalized Service',
                      desc: 'Customized solutions for a smooth, tailored experience.',
                    },
                    {
                      icon: Award,
                      title: 'Proven Track Record',
                      desc: '100+ successful homes and satisfied families.',
                    },
                  ].map((feature, idx) => {
                    const Icon = feature.icon;
                    return (
                      <div key={idx} className="flex gap-4">
                        <div className="w-11 h-11 bg-[#1e3a8a]/40 border border-[#3b5fc0]/30 flex items-center justify-center rounded-md flex-shrink-0">
                          <Icon size={20} className="text-[#f59218]" />
                        </div>
                        <div>
                          <h3 className="font-heading text-lg text-[#eef1f6] mb-1">
                            {feature.title}
                          </h3>
                          <p className="font-body text-[#8090b0] text-sm">{feature.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== GET IN TOUCH ===== */}
      <section className="bg-[#0d1220] border-y border-[#1e2d50] py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Left: CTA Text */}
            <Reveal>
              <div>
                <p className="text-[#f59218] text-xs font-body font-semibold tracking-[0.35em] uppercase mb-3">
                  Get In Touch
                </p>
                <div className="accent-line mb-6" />
                <h2 className="font-heading text-4xl text-[#eef1f6] mb-6">
                  Ready to make your move in real estate? Book Now.
                </h2>
                <p className="font-body text-[#8090b0] mb-8">
                  Book a free site visit today and experience our premium properties. Our team is
                  ready to assist you.
                </p>
                <a
                  href="tel:+918877555999"
                  className="flex items-center gap-3 text-[#eef1f6] hover:text-[#f59218] transition-colors"
                >
                  <span className="text-2xl">📱</span>
                  <span className="font-body font-semibold">+91 8877 555 999</span>
                </a>
              </div>
            </Reveal>

            {/* Right: Form */}
            <Reveal>
              <div className="bg-[#0f1628] border border-[#1e2d50] p-8 lg:p-10 rounded-md">
                <h3 className="font-heading text-2xl text-[#eef1f6] mb-6">Request a Callback</h3>
                <InquiryForm inquiryType="callback" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
