import Link from "next/link";
import { GraduationCap } from "lucide-react";

// ==========================================
// تعریف آیکون‌های شبکه‌های اجتماعی به صورت SVG
// (چون Lucide در نسخه‌های جدید آیکون برندها را حذف کرده است)
// ==========================================
const FacebookIcon = ({ size = 24, ...props }: any) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const TwitterIcon = ({ size = 24, ...props }: any) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const InstagramIcon = ({ size = 24, ...props }: any) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const YoutubeIcon = ({ size = 24, ...props }: any) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <path d="m10 15 5-3-5-3z" />
  </svg>
);

const LinkedinIcon = ({ size = 24, ...props }: any) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// ==========================================
// کامپوننت اصلی فوتر
// ==========================================
export function Footer() {
  const footerLinks = [
    {
      title: "About",
      links: [
        { name: "About ManaSchool", href: "/about" },
        { name: "Partners", href: "/partners" },
        { name: "Contact Us", href: "/contact" },
      ],
    },
    {
      title: "The Courses",
      links: [
        { name: "Why ManaSchool", href: "/courses" },
        { name: "Do I Qualify", href: "/qualify" },
        { name: "Online Campus Tour", href: "/campus" },
        { name: "FAQ", href: "/faq" },
        { name: "Discounts and Promos", href: "/discounts" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Blog", href: "/blog" },
        { name: "Webinars", href: "/webinars" },
        { name: "Ebooks", href: "/ebooks" },
        { name: "Podcasts", href: "/podcasts" },
      ],
    },
  ];

  const socialLinks = [
    { icon: FacebookIcon, href: "#" },
    { icon: TwitterIcon, href: "#" },
    { icon: InstagramIcon, href: "#" },
    { icon: YoutubeIcon, href: "#" },
    { icon: LinkedinIcon, href: "#" },
  ];

  return (
    <footer className="w-full bg-[#2d2d2d] text-gray-300">
      {/* بخش بالایی فوتر (لینک‌ها) */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-16 md:grid-cols-2 lg:grid-cols-5 lg:px-8">
        
        {/* ستون اول: دکمه‌های ثبت‌نام (Become a Student) */}
        <div className="flex flex-col gap-4 lg:col-span-1">
          <h3 className="mb-2 text-sm font-bold uppercase tracking-wider text-white">
            Become a Student
          </h3>
          <Link
            href="/register"
            className="flex w-full items-center justify-center border border-[#4ade80] px-4 py-2.5 text-sm font-bold tracking-wide text-[#4ade80] transition-colors hover:bg-[#4ade80] hover:text-[#2d2d2d]"
          >
            APPLY NOW
          </Link>
          <Link
            href="/contact"
            className="flex w-full items-center justify-center border border-[#fb923c] px-4 py-2.5 text-sm font-bold tracking-wide text-[#fb923c] transition-colors hover:bg-[#fb923c] hover:text-[#2d2d2d]"
          >
            GET MORE INFO
          </Link>
        </div>

        {/* ستون‌های لینک‌ها */}
        {footerLinks.map((section) => (
          <div key={section.title} className="flex flex-col gap-4">
            <h3 className="mb-2 text-sm font-bold uppercase tracking-wider text-white">
              {section.title}
            </h3>
            <ul className="flex flex-col gap-3">
              {section.links.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:text-white"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* بخش میانی: شبکه‌های اجتماعی (Follow Us) */}
      <div className="w-full border-t border-[#404040] bg-[#1f1f1f] py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center px-6 lg:px-8">
          <h3 className="mb-6 text-sm font-bold uppercase tracking-widest text-white">
            Follow Us
          </h3>
          <div className="flex gap-6">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <Link
                  key={index}
                  href={social.href}
                  className="text-gray-400 transition-colors hover:text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon size={28} strokeWidth={1.5} />
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* بخش پایینی: کپی‌رایت و لوگو */}
      <div className="w-full border-t border-[#404040] bg-[#262626] py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center px-6 lg:px-8">
          
          <div className="mb-8 flex flex-col items-center gap-2">
            <span className="text-xs font-bold tracking-[0.2em] text-gray-400">POWERED BY</span>
            <div className="flex items-center gap-2 text-2xl font-black tracking-tighter text-white">
              <GraduationCap size={28} />
              <span>MANASCHOOL</span>
            </div>
          </div>

          <div className="mb-8 flex gap-6 text-sm text-gray-400">
            <Link href="/terms" className="hover:text-white">Terms of Use</Link>
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
            <Link href="/contact" className="hover:text-white">Contact Us</Link>
          </div>

          <p className="max-w-4xl text-center text-xs leading-relaxed text-gray-500">
            © 2024 ManaSchool Learning, Inc. All rights reserved. ManaSchool, the ManaSchool logo and other ManaSchool marks, logos and trade dress are trademarks or registered trademarks of ManaSchool Learning, Inc. All other trademarks are the property of their respective owners.
          </p>
        </div>
      </div>
    </footer>
  );
}