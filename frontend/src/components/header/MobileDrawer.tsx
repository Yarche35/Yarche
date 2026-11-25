
"use client";

import Link from "next/link";
import Image from "next/image";
import {
  IconArrowLeft,
  IconChevronRight,
  IconX,
  IconUser,
  IconPackage,
  IconBrandInstagram,
  IconBrandFacebook,
  IconBrandYoutube,
  IconBrandWhatsapp,
  IconLogin,
  IconLogout,
} from "@tabler/icons-react";

interface Category {
  _id: string;
  category: string;
  images?: {
    url?: string;
    public_id?: string;
  }[];
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

interface Props {
  user: any;
  logout: () => void;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (value: boolean) => void;
  showCategories: boolean;
  setShowCategories: (value: boolean) => void;
  categories: Category[];
  navLinks: {
    name: string;
    href: string;
  }[];
}

export default function MobileDrawer({
  user,
  logout,
  isDrawerOpen,
  setIsDrawerOpen,
  showCategories,
  setShowCategories,
  categories,
  navLinks,
}: Props) {
  return (
    <div
      className={`fixed inset-0 z-[2000] md:hidden ${
        isDrawerOpen ? "visible" : "invisible"
      }`}
    >
      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          isDrawerOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={() => setIsDrawerOpen(false)}
      />

      {/* Drawer */}
      <div
        className={`absolute left-0 top-0 h-full w-[86%] bg-background shadow-2xl transform transition-transform duration-300 flex flex-col ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-foreground-2 via-foreground-2 to-secondary text-white px-5 pt-6 pb-5">
          <div className="flex items-center justify-between">
            {/* YARCHE LOGO */}
            <Link
              href="/"
              onClick={() => setIsDrawerOpen(false)}
              className="flex items-center"
            >
              <Image
                src="/logo3.png"
                alt="Yarche"
                width={180}
                height={70}
                priority
                className="w-[125px] h-auto object-contain brightness-0 invert"
              />
            </Link>

            <button
              onClick={() => setIsDrawerOpen(false)}
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center"
            >
              <IconX size={22} />
            </button>
          </div>

          {/* User Card */}
          {user ? (
            <Link
              href="/account/profile"
              onClick={() => setIsDrawerOpen(false)}
              className="mt-6 flex items-center gap-4 rounded-2xl bg-white/10 backdrop-blur p-4"
            >
              <div className="w-16 h-16 rounded-full overflow-hidden bg-white/20 flex items-center justify-center text-xl font-bold">
                {user?.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  user?.name?.charAt(0)?.toUpperCase()
                )}
              </div>

              <div>
                <p className="text-xs text-white/70">Welcome Back</p>

                <h3 className="font-semibold text-lg">
                  {user.name}
                </h3>

                <p className="text-xs text-white/60">
                  Manage your account
                </p>
              </div>
            </Link>
          ) : (
            <Link
              href="/auth/login"
              onClick={() => setIsDrawerOpen(false)}
              className="mt-6 flex items-center justify-center gap-2 h-12 rounded-xl bg-white text-foreground-2 font-semibold"
            >
              <IconLogin size={18} />
              Login / Register
            </Link>
          )}
        </div>

        {/* Scroll Area */}
        <div className="flex-1 overflow-y-auto px-3 py-3">
          {!showCategories ? (
            <>
              {user && (
                <>
                  <Link
                    href="/account/profile"
                    onClick={() => setIsDrawerOpen(false)}
                    className="flex items-center gap-4 rounded-xl px-4 py-4 hover:bg-surface-3 transition"
                  >
                    <IconUser size={22} />
                    <span className="font-medium">My Profile</span>
                  </Link>

                  <Link
                    href="/account/orders"
                    onClick={() => setIsDrawerOpen(false)}
                    className="flex items-center gap-4 rounded-xl px-4 py-4 hover:bg-surface-3 transition"
                  >
                    <IconPackage size={22} />
                    <span className="font-medium">My Orders</span>
                  </Link>

                  <button
                    onClick={() => {
                      logout();
                      setIsDrawerOpen(false);
                    }}
                    className="w-full flex items-center gap-4 rounded-xl px-4 py-4 hover:bg-error-light text-error transition"
                  >
                    <IconLogout size={22} />
                    <span className="font-medium">Logout</span>
                  </button>

                  <div className="my-3 border-t border-border" />
                </>
              )}

              {/* Categories Button */}
              <button
                onClick={() => setShowCategories(true)}
                className="w-full flex items-center justify-between rounded-xl px-4 py-4 hover:bg-surface-3 transition font-semibold"
              >
                <span>Shop By Categories</span>
                <IconChevronRight size={20} />
              </button>

              {/* Navigation Links */}
              <div className="mt-2 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsDrawerOpen(false)}
                    className="flex items-center justify-between rounded-xl px-4 py-4 text-[15px] font-medium text-foreground-3 hover:bg-surface-3 transition-all duration-200"
                  >
                    {link.name}

                    <IconChevronRight size={18} />
                  </Link>
                ))}
              </div>
            </>
          ) : (
            <>
              {/* Back */}
              <button
                onClick={() => setShowCategories(false)}
                className="flex items-center gap-3 rounded-xl px-4 py-4 font-semibold hover:bg-surface-3 transition"
              >
                <IconArrowLeft size={20} />
                Back
              </button>

              {/* Categories */}
              <div className="mt-2 space-y-1">
                {categories.map((cat) => (
                  <Link
                    key={cat._id}
                    href={`/categories/${encodeURIComponent(cat.category)}`}
                    onClick={() => {
                      setIsDrawerOpen(false);
                      setShowCategories(false);
                    }}
                    className="flex items-center justify-between rounded-xl px-4 py-4 text-[15px] hover:bg-surface-3 transition"
                  >
                    <span>{cat.category}</span>

                    <IconChevronRight size={18} />
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border px-5 py-5 bg-white">
          <p className="text-xs uppercase tracking-[2px] text-gray-500 font-semibold mb-4">
            Follow Us
          </p>

          <div className="flex items-center justify-between">
            <a
              href="https://www.instagram.com/yarche.in"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-surface-3 flex items-center justify-center hover:bg-border transition"
            >
              <IconBrandInstagram size={22} />
            </a>

            <a
              href="https://facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-surface-3 flex items-center justify-center hover:bg-border transition"
            >
              <IconBrandFacebook size={22} />
            </a>

            <a
              href="https://youtube.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-surface-3 flex items-center justify-center hover:bg-border transition"
            >
              <IconBrandYoutube size={22} />
            </a>

            <a
              href="https://wa.me/919999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-surface-3 flex items-center justify-center hover:bg-border transition"
            >
              <IconBrandWhatsapp size={22} />
            </a>
          </div>

          {/* Bottom Logo */}
          <div className="mt-5 flex flex-col items-center">
            <Image
              src="/logo3.png"
              alt="Yarche"
              width={180}
              height={70}
              className="w-[110px] h-auto object-contain"
            />

            <p className="text-[11px] text-gray-400 mt-3">
              © 2026 Yarche. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

