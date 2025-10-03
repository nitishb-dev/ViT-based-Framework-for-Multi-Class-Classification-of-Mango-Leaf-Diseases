import React, { useEffect, useState } from 'react';

const navItems = [
  { name: 'About', href: '#about' },
  { name: 'Introduction', href: '#introduction' },
  { name: 'Methodology', href: '#methodology' },
  { name: 'Predict', href: '#predict' },
  { name: 'Results', href: '#results' },
];

const Navbar = () => {
  const [active, setActive] = useState('about');
  const [menuOpen, setMenuOpen] = useState(false);

  // Scroll-spy effect
  useEffect(() => {
    const handleScroll = () => {
      const offsets = navItems.map((item) => {
        const el = document.getElementById(item.href.replace('#', ''));
        return el ? el.offsetTop - 100 : 0;
      });
      const scrollY = window.scrollY;
      let idx = 0;
      for (let i = 0; i < offsets.length; i++) {
        if (scrollY >= offsets[i]) idx = i;
      }
      setActive(navItems[idx].href.replace('#', ''));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll handler
  const handleNavClick = (e, href) => {
    e.preventDefault();
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 80,
        behavior: 'smooth',
      });
      setActive(id);
      setMenuOpen(false);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold text-green-600 flex items-center gap-2">
          <span role="img" aria-label="mango">
            🥭
          </span>{' '}
          Mango Leaf Disease Classifier
        </h1>
        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className={`transition font-medium px-3 py-1 rounded-lg ${
                active === item.href.replace('#', '')
                  ? 'bg-green-100 text-green-700 shadow'
                  : 'text-gray-600 hover:bg-green-50 hover:text-green-700'
              }`}
            >
              {item.name}
            </a>
          ))}
        </div>
        {/* Mobile Nav */}
        <button
          className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-7 h-7 text-green-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 8h16M4 16h16"
              />
            )}
          </svg>
        </button>
      </div>
      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg px-4 pb-4">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className={`block py-2 px-3 rounded-lg mb-1 ${
                active === item.href.replace('#', '')
                  ? 'bg-green-100 text-green-700'
                  : 'text-gray-600 hover:bg-green-50 hover:text-green-700'
              }`}
            >
              {item.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;