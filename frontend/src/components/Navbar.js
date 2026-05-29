import { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const LOGO = 'https://customer-assets.emergentagent.com/job_luxuvia-dev/artifacts/gjc6gs38_luxuvia%20icon.png';

const links = [
  { label: 'Home', path: '/' },
  { label: 'Projects', path: '/projects' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      data-testid="navbar"
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-dark border-b border-[#1a2440]/60 py-3' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <Link to="/" data-testid="logo-link" className="flex items-center gap-3">
            <img src={LOGO} alt="Luxuvia" className="h-12 sm:h-14 object-contain" />
          </Link>

          <div className="hidden md:flex items-center gap-9">
            {links.map(({ label, path }) => (
              <Link
                key={path}
                to={path}
                data-testid={`nav-${label.toLowerCase()}`}
                className={`font-body text-[13px] uppercase tracking-[0.22em] transition-colors ${
                  pathname === path
                    ? 'text-[#f59218]'
                    : 'text-[#8090b0] hover:text-[#eef1f6]'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:+918877555999"
              data-testid="nav-phone"
              className="flex items-center gap-2 text-[#8090b0] hover:text-[#f59218] transition-colors font-body text-[13px]"
            >
              <Phone size={14} className="w-3.5 h-3.5" />
              <span>+91 8877 555 999</span>
            </a>
            <Link
              to="/contact"
              data-testid="nav-book-visit"
              className="btn-primary px-6 py-2.5 font-semibold uppercase tracking-[0.2em] text-[11px] font-body rounded-sm"
            >
              Book a Visit
            </Link>
          </div>

          <button
            type="button"
            data-testid="mobile-menu-toggle"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-[#eef1f6] hover:text-[#f59218] focus:outline-none"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden mt-6 rounded-3xl border border-[#1a2440] bg-[#08162f]/90 p-5 shadow-pop">
            <div className="flex flex-col gap-4" data-testid="navbar-mobile-links">
              {links.map(({ label, path }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setIsOpen(false)}
                  data-testid={`nav-${label.toLowerCase()}`}
                  className={`font-body text-[13px] uppercase tracking-[0.22em] transition-colors ${
                    pathname === path
                      ? 'text-[#f59218]'
                      : 'text-[#8090b0] hover:text-[#eef1f6]'
                  }`}
                >
                  {label}
                </Link>
              ))}
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="btn-primary w-full text-center px-6 py-2.5 font-semibold uppercase tracking-[0.2em] text-[11px] font-body rounded-sm"
              >
                Book a Visit
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
