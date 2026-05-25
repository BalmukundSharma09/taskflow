import Link from "next/link";
import { CheckSquare, Github, Twitter, Linkedin, Mail } from "lucide-react";

const footerLinks = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Dashboard", href: "/auth/login" },
    { label: "About", href: "#about" },
  ],
  Company: [
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Press", href: "#" },
    { label: "Contact", href: "#contact" },
  ],
  Legal: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
    { label: "Security", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer id="contact" className="border-t border-white/[0.06] pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="p-1 rounded-lg bg-blue-500/10">
                <CheckSquare className="h-4 w-4 text-blue-400" />
              </div>
              <span className="font-semibold text-white">TaskFlow</span>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs mb-4">
              Modern productivity platform for teams and individuals.
            </p>
            <div className="flex items-center gap-3">
              <Link href="#" className="w-8 h-8 rounded-lg border border-white/[0.06] flex items-center justify-center text-gray-500 hover:text-white hover:border-white/20 transition-colors">
                <Github className="h-3.5 w-3.5" />
              </Link>
              <Link href="#" className="w-8 h-8 rounded-lg border border-white/[0.06] flex items-center justify-center text-gray-500 hover:text-white hover:border-white/20 transition-colors">
                <Twitter className="h-3.5 w-3.5" />
              </Link>
              <Link href="#" className="w-8 h-8 rounded-lg border border-white/[0.06] flex items-center justify-center text-gray-500 hover:text-white hover:border-white/20 transition-colors">
                <Linkedin className="h-3.5 w-3.5" />
              </Link>
              <Link href="#" className="w-8 h-8 rounded-lg border border-white/[0.06] flex items-center justify-center text-gray-500 hover:text-white hover:border-white/20 transition-colors">
                <Mail className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-medium text-white mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-500 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/[0.06] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-600">
          <p>&copy; {new Date().getFullYear()} TaskFlow. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="#" className="hover:text-gray-400 transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-gray-400 transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}