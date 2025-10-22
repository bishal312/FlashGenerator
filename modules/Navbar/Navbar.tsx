"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { LogOut, User } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [pending, setPending] = useState<boolean>(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setPending(true);
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/sign-in");
          },
          onError: ({ error }) => {
            toast.error(error.message);
          },
        },
      });
    } catch {
      toast.error("Something went wrong!");
    } finally {
      setPending(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full bg-gray-900/95 backdrop-blur-md border-b border-gray-800 text-white">
      <div className="max-w-7xl w-full mx-auto flex items-center justify-between px-4 sm:px-6 py-4">
        {/* Left: Logo */}
        <Link
          href="/dashboard"
          className="flex flex-col hover:opacity-90 transition group"
        >
          <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Make Million
          </span>
          <span className="text-[10px] sm:text-xs text-gray-400 -mt-1 tracking-wide">
            powered by{" "}
            <span className="text-indigo-400 font-medium">flashgenz</span>
          </span>
        </Link>

        {/* Center: Nav Links */}
        <div className="hidden md:flex space-x-8 text-sm font-medium">
          <Link href="/" className="hover:text-indigo-400 transition">
            Home
          </Link>
          <Link href="/faq" className="hover:text-indigo-400 transition">
            FAQ
          </Link>
          <Link
            href="/how-it-works"
            className="hover:text-indigo-400 transition"
          >
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
              {!pending ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-700 transition"
                  disabled={pending}
                >
                  <LogOut size={16} className="mr-2" />
                  Logout
                </button>
              ) : (
                <div className="flex flex-col items-center gap-4">
                  <Button disabled className="w-full">
                    <Spinner />
                    Logging out...
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
