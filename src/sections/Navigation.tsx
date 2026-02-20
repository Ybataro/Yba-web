import { useState, useEffect } from 'react';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { useFrozenCartStore } from '@/stores/frozenCartStore';

const navItems = [
  { label: '招牌產品', href: '#products' },
  { label: '線上選購', href: '#frozen-shop' },
  { label: '品牌故事', href: '#brand-story' },
  { label: '門市資訊', href: '#stores' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems, setCartOpen } = useFrozenCartStore();
  const count = totalItems();

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
            ? 'bg-[hsl(25,10%,88%)]/95 backdrop-blur-xl border-b border-[hsl(var(--amber))]/15 shadow-[0_2px_20px_rgba(0,0,0,0.06)]'
            : 'bg-transparent'
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
              <span className={`text-xl sm:text-2xl font-bold transition-colors duration-500 ${
                isScrolled ? 'text-[hsl(var(--dark-brown))]' : 'text-white'
              }`}>
                阿爸的<span className={`transition-colors duration-500 ${
                  isScrolled ? 'text-[hsl(var(--amber))]' : 'text-[hsl(var(--amber-light))]'
                }`}>芋圓</span>
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className={`transition-colors duration-300 text-sm font-medium ${
                    isScrolled
                      ? 'text-[hsl(var(--dark-brown))]/65 hover:text-[hsl(var(--amber))]'
                      : 'text-white/75 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* 右側：購物車 + CTA */}
            <div className="hidden md:flex items-center gap-4">
              {/* 購物車圖示 */}
              <button
                onClick={() => setCartOpen(true)}
                className={`relative p-2 rounded-full transition-colors duration-300 ${
                  isScrolled
                    ? 'text-[hsl(var(--dark-brown))]/70 hover:text-[hsl(var(--amber))]'
                    : 'text-white/80 hover:text-white'
                }`}
                aria-label="購物車"
              >
                <ShoppingCart className="w-5 h-5" />
                {count > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 min-w-[18px] bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {count}
                  </span>
                )}
              </button>

              {/* CTA Button */}
              <a
                href="#frozen-shop"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('#frozen-shop');
                }}
                className="px-6 py-2.5 bg-[hsl(var(--amber))] text-white text-sm font-bold rounded-full hover:bg-[hsl(var(--amber-dark))] transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
              >
                立即選購
              </a>
            </div>

            {/* Mobile: Cart + Menu Button */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={() => setCartOpen(true)}
                className={`relative p-2 rounded-full transition-colors duration-300 ${
                  isScrolled
                    ? 'text-[hsl(var(--dark-brown))]'
                    : 'text-white'
                }`}
                aria-label="購物車"
              >
                <ShoppingCart className="w-5 h-5" />
                {count > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {count}
                  </span>
                )}
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`w-10 h-10 flex items-center justify-center transition-colors duration-300 ${
                  isScrolled ? 'text-[hsl(var(--dark-brown))]' : 'text-white'
                }`}
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
          className="absolute inset-0 bg-[hsl(25,10%,88%)]/95 backdrop-blur-xl"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu Content */}
        <div className="relative h-full flex flex-col items-center justify-center gap-8">
          {navItems.map((item, index) => (
            <button
              key={item.href}
              onClick={() => handleNavClick(item.href)}
              className={`text-2xl font-medium text-[hsl(var(--dark-brown))] hover:text-[hsl(var(--amber))] transition-all duration-300 ${
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
            href="#frozen-shop"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#frozen-shop');
            }}
            className={`mt-4 px-8 py-3 bg-[hsl(var(--amber))] text-white font-bold rounded-full transition-all duration-300 shadow-md ${
              isMobileMenuOpen
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            立即選購
          </a>
        </div>
      </div>
    </>
  );
}
