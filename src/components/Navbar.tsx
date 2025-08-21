"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {  Menu, X, Sparkle } from "lucide-react";
import Button from "./ui/Button";
import Image from "next/image";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Collections", href: "/collections" },
    { name: "Rings", href: "/rings" },
    { name: "Necklaces", href: "/necklaces" },
    { name: "Earrings", href: "/earrings" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-black/90 backdrop-blur-md py-2 shadow-xl"
            : "bg-transparent py-4"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group">
              <div>
                <Image
                  src="/logo.png"
                  alt="KVR Jewelry Logo"
                  width={40}
                  height={40}
                  className="h-14 w-14 rounded-full animate-coin-flip"
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 group/nav ${
                    pathname === item.href
                      ? "text-yellow-400"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  {item.name}
                  <span
                    className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-yellow-400 transition-all duration-300 ${
                      pathname === item.href ? "w-8" : "w-0 group-hover/nav:w-8"
                    }`}
                  ></span>
                </Link>
              ))}
            </nav>

            {/* Right side icons */}
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full bg-black/30 hover:bg-yellow-400/10 transition-colors duration-300 group">
                <div className="relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-300 group-hover:text-yellow-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                  <span className="absolute -top-2 -right-2 bg-yellow-500 text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    3
                  </span>
                </div>
              </button>

              <Button>Login</Button>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2 rounded-full bg-black/30 hover:bg-yellow-400/10 transition-colors duration-300"
              >
                {isOpen ? (
                  <X className="h-6 w-6 text-yellow-400" />
                ) : (
                  <Menu className="h-6 w-6 text-gray-300" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden bg-black/95 backdrop-blur-lg transition-all duration-500 overflow-hidden ${
            isOpen ? "max-h-96 py-4" : "max-h-0 py-0"
          }`}
        >
          <div className="container mx-auto px-4">
            <nav className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
                    pathname === item.href
                      ? "bg-yellow-400/10 text-yellow-400"
                      : "text-gray-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <button className="flex items-center justify-center space-x-2 bg-gradient-to-r from-yellow-500 to-yellow-700 px-4 py-3 rounded-lg text-base font-medium text-black mt-2">
                <Sparkle className="w-5 h-5" />
                <span>Book Appointment</span>
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Add custom animation to tailwind config */}
      <style jsx global>{`
        @keyframes coin-flip {
          0% {
            transform: rotateY(0deg);
          }
          50% {
            transform: rotateY(180deg);
          }
          100% {
            transform: rotateY(360deg);
          }
        }
        .animate-coin-flip {
          animation: coin-flip 2s infinite ease-in-out;
        }
      `}</style>
    </>
  );
};

export default Navbar;