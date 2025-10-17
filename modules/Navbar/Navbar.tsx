"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { LogOut, User } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="fixed w-full bg-gray-900 backdrop-blur-md py-2 border-b border-gray-800 text-white">
      <div className="max-w-7xl w-full mx-auto flex items-center justify-between px-6 py-3">
        {/* Left: Logo */}
        <Link href="/dashboard" className="text-xl font-bold text-indigo-400 hover:text-indigo-300">
          ⚡ FlashGen
        </Link>

        {/* Center: Nav Links */}
        <div className="hidden md:flex space-x-8 text-sm font-medium">
          <Link href="/" className="hover:text-indigo-400 transition">
            Home
          </Link>
          <Link href="/faq" className="hover:text-indigo-400 transition">
            FAQ
          </Link>
          <Link href="/how-it-works" className="hover:text-indigo-400 transition">
            How It Works
          </Link>
        </div>

        {/* Right: Profile / Dropdown */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="flex items-center gap-2 bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition"
          >
            <User size={20} />
          </button>

          {/* Dropdown Menu */}
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-gray-800 border border-gray-700 rounded-lg shadow-lg py-2 z-50 animate-fadeIn">
              <button
                onClick={() => alert("Logged out")}
                className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-700 transition"
              >
                <LogOut size={16} className="mr-2" /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
