import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Leaf, UserCircle, LogIn } from "lucide-react";
import { Button } from "./ui/button";

const NavAnchor = ({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      onClick?.();
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className="text-foreground/80 hover:text-primary transition-colors hover:scale-105 transform duration-200"
    >
      {children}
    </a>
  );
};

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full
        ${isScrolled ? "py-2 bg-background/80 backdrop-blur-md shadow-sm border-b border-white/10" : "py-4 bg-transparent"}
      `}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 group"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg transition-transform group-hover:rotate-12">
            <Leaf className="w-6 h-6" />
          </div>
          <span className="text-xl font-bold font-heading bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
            LeafGuard<span className="text-primary">AI</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-6 text-sm font-medium">
            <NavAnchor href="#detect">Detect Disease</NavAnchor>
            <NavAnchor href="#how-it-works">How it Works</NavAnchor>
            <NavAnchor href="#about">About</NavAnchor>
          </div>

          <div className="flex items-center gap-3 pl-6 border-l border-border/50">
            <Link to="/auth?mode=login">
              <Button variant="ghost" size="sm" className="font-normal hover:text-primary">
                Sign In
              </Button>
            </Link>
            <Link to="/auth?mode=signup">
              <Button variant="premium" size="sm" className="rounded-full px-5">
                <UserCircle className="w-4 h-4 mr-2" />
                Get Started
              </Button>
            </Link>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-foreground/80 hover:text-primary transition-colors glass-panel rounded-lg"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-white/10 shadow-2xl animate-accordion-down origin-top">
          <div className="container mx-auto px-4 py-8 flex flex-col gap-4">
            <NavAnchor href="#detect" onClick={toggleMenu}>Detect Disease</NavAnchor>
            <NavAnchor href="#how-it-works" onClick={toggleMenu}>How it Works</NavAnchor>
            <NavAnchor href="#about" onClick={toggleMenu}>About</NavAnchor>

            <div className="h-px bg-white/10 w-full my-2" />

            <Link to="/auth?mode=login" onClick={toggleMenu}>
              <Button variant="outline" className="w-full justify-start border-border/50">
                Sign In
              </Button>
            </Link>
            <Link to="/auth?mode=signup" onClick={toggleMenu}>
              <Button variant="premium" className="w-full">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
