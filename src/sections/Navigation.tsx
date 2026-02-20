import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: '品牌故事', href: '#brand-story' },
  { label: '招牌產品', href: '#products' },
  { label: '美味瞬間', href: '#gallery' },
  { label: '冷凍宅配', href: '#frozen-products' },
  { label: '門市資訊', href: '#stores' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-xl border-b border-[hsl(var(--camel))]/15 shadow-[0_2px_20px_rgba(0,0,0,0.06)]'
            : 'bg-white/60 backdrop-blur-md'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2"
            >
              <span className="text-xl sm:text-2xl font-bold text-[hsl(var(--dark-brown))]">
                阿爸的<span className="text-[hsl(var(--camel))]">芋圓</span>
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className="text-[hsl(var(--dark-brown))]/65 hover:text-[hsl(var(--camel))] transition-colors duration-300 text-sm font-medium"
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <a
                href="#stores"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('#stores');
                }}
                className="px-6 py-2.5 bg-[hsl(var(--camel))] text-white text-sm font-bold rounded-full hover:bg-[hsl(var(--camel-dark))] transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
              >
                尋找門市
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center text-[hsl(var(--dark-brown))]"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-white/95 backdrop-blur-xl"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu Content */}
        <div className="relative h-full flex flex-col items-center justify-center gap-8">
          {navItems.map((item, index) => (
            <button
              key={item.href}
              onClick={() => handleNavClick(item.href)}
              className={`text-2xl font-medium text-[hsl(var(--dark-brown))] hover:text-[hsl(var(--camel))] transition-all duration-300 ${
                isMobileMenuOpen
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              {item.label}
            </button>
          ))}
          <a
            href="#stores"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#stores');
            }}
            className={`mt-4 px-8 py-3 bg-[hsl(var(--camel))] text-white font-bold rounded-full transition-all duration-300 shadow-md ${
              isMobileMenuOpen
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            尋找門市
          </a>
        </div>
      </div>
    </>
  );
}
