"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <motion.header
      className={`fixed top-0 right-0 left-0 z-50 py-4 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 border-b shadow-sm backdrop-blur-md"
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <div className="container flex items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Zap className="text-primary h-6 w-6" />
          <span className="text-xl font-bold">Zyply</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="#features"
            className="hover:text-primary text-sm font-medium transition-colors"
          >
            Features
          </Link>
          <Link
            href="#analytics"
            className="hover:text-primary text-sm font-medium transition-colors"
          >
            Analytics
          </Link>
          <Link
            href="#pricing"
            className="hover:text-primary text-sm font-medium transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="#testimonials"
            className="hover:text-primary text-sm font-medium transition-colors"
          >
            Testimonials
          </Link>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              Log in
            </Button>
            <Button size="sm">Sign up</Button>
            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile Navigation */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Button variant="ghost" size="icon" onClick={toggleMenu}>
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          className="bg-background/95 fixed inset-0 z-40 px-4 pt-20 pb-6 backdrop-blur-sm md:hidden"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <nav className="flex flex-col items-center gap-6 text-center">
            <Link
              href="#features"
              className="hover:text-primary text-lg font-medium transition-colors"
              onClick={toggleMenu}
            >
              Features
            </Link>
            <Link
              href="#analytics"
              className="hover:text-primary text-lg font-medium transition-colors"
              onClick={toggleMenu}
            >
              Analytics
            </Link>
            <Link
              href="#pricing"
              className="hover:text-primary text-lg font-medium transition-colors"
              onClick={toggleMenu}
            >
              Pricing
            </Link>
            <Link
              href="#testimonials"
              className="hover:text-primary text-lg font-medium transition-colors"
              onClick={toggleMenu}
            >
              Testimonials
            </Link>
            <div className="mt-4 flex w-full max-w-xs flex-col gap-3">
              <Button variant="outline" className="w-full" onClick={toggleMenu}>
                Log in
              </Button>
              <Button className="w-full" onClick={toggleMenu}>
                Sign up
              </Button>
            </div>
          </nav>
        </motion.div>
      )}
    </motion.header>
  );
}
