import { Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const LOGO = 'https://customer-assets.emergentagent.com/job_luxuvia-dev/artifacts/gjc6gs38_luxuvia%20icon.png';

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'Projects', to: '/projects' },
  { label: 'About Us', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

const projectLinks = [
  { label: 'Sri Laxmi Janardhana Nilayam', to: '/projects/sri-laxmi-janardhana-nilayam' },
  { label: 'Padmavati Residency', to: '/projects/padmavati-residency' },
  { label: 'Venkataramana Residency', to: '/projects/venkataramana-residency' },
];

export default function Footer() {
  return (
    <footer data-testid="footer" className="relative overflow-hidden bg-[#070b15] border-t border-[#1a2440] noise text-[#9ba6bf]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <img src={LOGO} alt="Luxuvia" className="h-8 w-auto mb-4" />
            <p className="font-body text-sm leading-relaxed text-[#8b99b4]">
              Luxuvia Constructions and Developers Pvt. Ltd. builds premium residences in East Hyderabad
              with a focus on quality, transparency, and long-term value.
            </p>
          </div>

          <div>
            <h3 className="font-heading text-lg text-[#eef1f6] mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="font-body text-sm text-[#8b99b4] hover:text-[#f59218] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-lg text-[#eef1f6] mb-6">Our Projects</h3>
            <ul className="space-y-3">
              {projectLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="font-body text-sm text-[#8b99b4] hover:text-[#f59218] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-lg text-[#eef1f6] mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone size={18} className="text-[#f59218] flex-shrink-0 mt-1" />
                <a
                  href="tel:+918877555999"
                  className="font-body text-sm text-[#8b99b4] hover:text-[#f59218] transition-colors"
                >
                  +91 8877 555 999
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={18} className="text-[#f59218] flex-shrink-0 mt-1" />
                <a
                  href="mailto:support@luxuvia.in"
                  className="font-body text-sm text-[#8b99b4] hover:text-[#f59218] transition-colors"
                >
                  support@luxuvia.in
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-[#f59218] flex-shrink-0 mt-1" />
                <p className="font-body text-sm text-[#8b99b4]">
                  Peerzadiguda, East Hyderabad, Telangana
                </p>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#1a2440] pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[#6d7d99]">
          <p className="font-body text-xs">© 2026 Luxuvia Constructions and Developers Pvt. Ltd.</p>
          <p className="font-body text-xs">TS RERA Approved Developer</p>
        </div>
      </div>
    </footer>
  );
}
