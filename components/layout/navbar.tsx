"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, GraduationCap } from "lucide-react";
import { useSession } from "next-auth/react"; // اضافه کردن این خط

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  // گرفتن وضعیت لاگین در سمت کلاینت
  const { data: session, status } = useSession(); 
  const isLoggedIn = status === "authenticated";

  const navLinks = [
    { name: "Courses", href: "/courses" },
    { name: "Mentors", href: "/mentors" },
    { name: "About", href: "/about" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950 text-slate-50">
      <div className="flex h-16 w-full items-center justify-between px-4 md:px-8 lg:px-12">
        
        <div className="flex items-center gap-8 lg:gap-12">
          <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
              <GraduationCap size={20} />
            </div>
            <span className="text-lg font-bold tracking-tight">ManaSchool</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-slate-300 transition-colors hover:text-white"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="hidden md:flex items-center gap-4">
          {isLoggedIn ? (
            <Link
              href="/dashboard"
              className="rounded-md border border-slate-700 bg-slate-800 px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-slate-700"
            >
              Dashboard
            </Link>
          ) : (
            <Link
              href="/login"
              className="text-sm font-medium text-slate-300 transition-colors hover:text-white"
            >
              Login
            </Link>
          )}

          <Link
            href="/register"
            className="rounded-md bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-blue-500"
          >
            Register
          </Link>
        </div>

        <button
          className="md:hidden p-2 text-slate-300 hover:text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-950 px-4 pt-2 pb-6">
          <nav className="flex flex-col gap-4 mt-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-base font-medium text-slate-300 hover:text-white"
              >
                {link.name}
              </Link>
            ))}
            <hr className="border-slate-800 my-2" />
            
            {isLoggedIn ? (
               <Link
               href="/dashboard"
               onClick={() => setIsOpen(false)}
               className="rounded-md border border-slate-700 bg-slate-800 px-5 py-3 text-center text-sm font-semibold text-white transition-all hover:bg-slate-700"
             >
               Dashboard
             </Link>
            ) : (
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="text-center text-sm font-medium text-slate-300 py-2 hover:text-white"
              >
                Login
              </Link>
            )}

            <Link
              href="/register"
              onClick={() => setIsOpen(false)}
              className="rounded-md bg-blue-600 px-5 py-3 text-center text-sm font-semibold text-white transition-all hover:bg-blue-500"
            >
              Register
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}