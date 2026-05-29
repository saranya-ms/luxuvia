import Reveal from '../components/Reveal';
import { Target, Heart, Shield, Award, Users, LayoutTemplate } from 'lucide-react';

const values = [
  {
    icon: Shield,
    title: 'Transparency',
    description: '100% RERA compliant with clear documentation.',
  },
  {
    icon: Award,
    title: 'Quality',
    description: 'Premium materials that stand the test of time.',
  },
  {
    icon: Users,
    title: 'Customer First',
    description: 'Personalized service from visit to possession.',
  },
  {
    icon: LayoutTemplate,
    title: 'Innovation',
    description: 'Modern designs optimized for Indian families.',
  },
];

export default function AboutPage() {
  return (
    <main data-testid="about-page" className="bg-dark-base text-text-white min-h-screen pt-32">
      <section className="bg-[#0d1220] border-b border-[#1e2d50] py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <p className="font-body text-[11px] uppercase tracking-[0.35em] text-[#f59218] mb-2">ABOUT US</p>
            <div className="accent-line mx-auto mb-5" />
            <h1 className="font-heading text-4xl sm:text-5xl text-white mb-3">Our Story</h1>
            <p className="font-body text-sm text-[#6b7fa0] mx-auto max-w-2xl leading-7">
              Building dream homes in Hyderabad with uncompromising quality, transparency, and customer satisfaction.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <Reveal>
              <div>
                <h2 className="font-heading text-3xl font-semibold text-white mb-1">
                  Luxuvia Constructions & Developers Pvt. Ltd.
                </h2>
                <div className="accent-line mb-5" />
                <div className="space-y-4 font-body text-sm text-[#8090b0] leading-relaxed">
                  <p>
                    Luxuvia Constructions and Developers Pvt. Ltd. is a reputed real estate developer based in Hyderabad, Telangana. Since our inception, we have been dedicated to creating premium residential spaces that combine modern architecture with thoughtful design.
                  </p>
                  <p>
                    Our projects in East Hyderabad — spanning Peerzadiguda, Narapally, and Pocharam — are strategically located near IT hubs, metro stations, and essential amenities. Each project is RERA approved, ensuring complete transparency and trust.
                  </p>
                  <p>
                    We believe that a home is more than just walls and a roof. It's where families grow, memories are made, and dreams take shape. That's why every Luxuvia home is built with premium materials — from teak wood doors to vitrified tiles — and features modern amenities for comfortable living.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal>
              <div className="relative">
                <img
                  src="https://framerusercontent.com/images/Zg7BtvLfz3jIjRBcMTxccPa3mE.jpg"
                  alt="Luxuvia team"
                  className="w-full rounded-md object-cover h-[420px]"
                />
                <div className="absolute -bottom-5 -left-5 rounded-sm bg-[#f59218] px-6 py-4 shadow-xl">
                  <p className="font-heading text-3xl sm:text-4xl font-semibold text-white">5+</p>
                  <p className="font-body text-sm text-white/80 uppercase tracking-wider">
                    YEARS OF TRUST
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-[#1e3a8a] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Reveal>
              <div className="bg-[#162d7a] border border-[#2a4aaa] rounded-lg p-8">
                <Target className="mb-4 h-8 w-8 text-[#f59218]" />
                <h3 className="font-heading text-2xl text-white mb-3">Our Mission</h3>
                <p className="font-body text-white/70 leading-relaxed">
                  To deliver premium quality homes at the most competitive prices, with complete transparency and adherence to RERA guidelines.
                </p>
              </div>
            </Reveal>
            <Reveal>
              <div className="bg-[#162d7a] border border-[#2a4aaa] rounded-lg p-8">
                <Heart className="mb-4 h-8 w-8 text-[#f59218]" />
                <h3 className="font-heading text-2xl text-white mb-3">Our Vision</h3>
                <p className="font-body text-white/70 leading-relaxed">
                  To become East Hyderabad's most trusted residential developer, known for architectural excellence and timely delivery.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-[#0a0e1a] py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="font-body text-[11px] uppercase tracking-[0.35em] text-[#f59218] mb-2">
              OUR VALUES
            </p>
            <div className="accent-line mx-auto mb-5" />
            <h2 className="font-heading text-3xl text-white mb-12">What Drives Us</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div key={value.title} className="text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#0f1e3d] text-[#f59218]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h4 className="font-heading text-lg text-white mb-2">{value.title}</h4>
                  <p className="font-body text-xs text-[#6b7fa0] leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
