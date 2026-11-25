
"use client";

import { useState } from "react";
import API from "@/src/lib/api";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Check,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function RegisterForm() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleMobileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value
      .replace(/\D/g, "")
      .slice(0, 10);

    setForm((prev) => ({
      ...prev,
      mobile: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.mobile.trim()
    ) {
      return toast.error("All fields required");
    }

    if (form.mobile.length !== 10) {
      return toast.error("Mobile must be 10 digits");
    }

    if (form.password.length < 6) {
      return toast.error("Password must be 6+ characters");
    }

    if (form.password !== form.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    const toastId = toast.loading("Creating your account...");

    try {
      setLoading(true);

      const res = await API.post("/register", {
        name: form.name,
        email: form.email,
        mobile: form.mobile,
        password: form.password,
      });

      if (res.data.response === "success") {
        toast.success("Account created successfully 🎉", {
          id: toastId,
        });

        setTimeout(() => {
          router.push("/auth/login");
        }, 800);
      } else {
        toast.error(
          res.data.message || "Unable to create account",
          {
            id: toastId,
          }
        );
      }
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message || "Server error",
        {
          id: toastId,
        }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4 py-8 md:px-8">

      {/* Premium Container */}
      <div className="w-full max-w-6xl">

        <div className="grid lg:grid-cols-2 overflow-hidden rounded-[2rem] border border-border bg-surface shadow-[0_25px_80px_rgba(40,23,13,0.12)]">

          {/* =====================================================
              LEFT — YARCHE BRAND / CRAFT SECTION
          ====================================================== */}
          <section className="relative hidden lg:flex min-h-[760px] overflow-hidden bg-footer">

            {/* Decorative glow */}
            <div className="absolute -top-28 -left-24 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />

            <div className="absolute -bottom-32 -right-28 h-96 w-96 rounded-full bg-secondary/30 blur-3xl" />

            {/* Handmade dot pattern */}
            <div className="absolute inset-0 opacity-[0.055]">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `
                    radial-gradient(circle at 20% 20%, white 1px, transparent 1px),
                    radial-gradient(circle at 80% 70%, white 1px, transparent 1px)
                  `,
                  backgroundSize: "32px 32px",
                }}
              />
            </div>

            <div className="relative z-10 flex w-full flex-col justify-between p-12">

              {/* Brand */}
              <div>

                <div className="mb-12 flex items-center gap-3">

                  <div className="mb-8">
  <Image
    src="/logo.png"
    alt="Yarche"
    width={180}
    height={60}
    priority
    className="h-auto w-[180px] object-contain"
  />
</div>

                </div>

                <div className="max-w-md">

                  <p className="mb-3 font-sans text-xs font-semibold uppercase tracking-[0.28em] text-primary">
                    Become Part of Yarche
                  </p>

                  <h1 className="text-6xl leading-[0.94] font-medium text-footer-heading">
                    Made by hands,
                    <br />
                    <span className="italic text-primary">
                      chosen by you.
                    </span>
                  </h1>

                  <p className="mt-7 max-w-sm font-sans text-sm leading-7 text-footer-text/70">
                    Create your Yarche account and discover beautiful
                    handcrafted products created with patience,
                    warmth and a love for timeless craftsmanship.
                  </p>

                </div>

              </div>

              {/* Benefits */}
              <div>

                <div className="mb-7 h-px w-20 bg-primary" />

                <p className="mb-6 font-heading text-2xl italic text-footer-heading">
                  Your journey into handmade living starts here.
                </p>

                <div className="space-y-4">

                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full border border-footer-text/15 bg-footer-text/5">
                      <Check
                        size={16}
                        className="text-primary"
                      />
                    </div>

                    <p className="font-sans text-xs text-footer-text/75">
                      Discover thoughtfully handcrafted products
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full border border-footer-text/15 bg-footer-text/5">
                      <Check
                        size={16}
                        className="text-primary"
                      />
                    </div>

                    <p className="font-sans text-xs text-footer-text/75">
                      Save your details for a faster checkout
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full border border-footer-text/15 bg-footer-text/5">
                      <ShieldCheck
                        size={16}
                        className="text-primary"
                      />
                    </div>

                    <p className="font-sans text-xs text-footer-text/75">
                      Your account information stays secure
                    </p>
                  </div>

                </div>

              </div>

            </div>
          </section>

          {/* =====================================================
              RIGHT — REGISTER FORM
          ====================================================== */}
          <section className="flex min-h-[760px] items-center justify-center bg-surface px-5 py-10 sm:px-8 md:px-12">

            <div className="w-full max-w-md">

              {/* Mobile Brand */}
              <div className="mb-8 flex justify-center lg:hidden">

                <div className="flex items-center gap-3">

                  <div className="mb-9 flex items-center justify-center lg:hidden">
  <Image
    src="/logo3.png"
    alt="Yarche"
    width={180}
    height={60}
    priority
    className="h-auto w-[180px] object-contain"
  />
</div>

                </div>

              </div>

              {/* Header */}
              <div className="mb-7">

                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-light text-primary">
                  <User
                    size={25}
                    strokeWidth={1.8}
                  />
                </div>

                <p className="mb-2 font-sans text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                  Create Your Account
                </p>

                <h2 className="text-4xl leading-tight font-medium text-foreground">
                  Join the
                  <span className="block italic text-secondary">
                    Yarche family
                  </span>
                </h2>

                <p className="mt-3 font-sans text-sm leading-6 text-text-secondary">
                  Create an account to make your handmade shopping
                  experience simple and beautiful.
                </p>

              </div>

              {/* Register Form */}
              <form
                onSubmit={handleSubmit}
                className="space-y-4"
              >

                {/* Full Name */}
                <div>

                  <label
                    htmlFor="name"
                    className="mb-2 block font-sans text-xs font-semibold text-foreground-2"
                  >
                    Full Name
                  </label>

                  <div className="group relative">

                    <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary transition-colors group-focus-within:text-primary">
                      <User
                        size={18}
                        strokeWidth={1.8}
                      />
                    </div>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={form.name}
                      onChange={handleChange}
                      autoComplete="name"
                      className="h-13 w-full rounded-2xl border border-border bg-surface pl-12 pr-4 font-sans text-sm text-foreground placeholder:text-muted outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10"
                    />

                  </div>
                </div>

                {/* Email */}
                <div>

                  <label
                    htmlFor="email"
                    className="mb-2 block font-sans text-xs font-semibold text-foreground-2"
                  >
                    Email Address
                  </label>

                  <div className="group relative">

                    <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary transition-colors group-focus-within:text-primary">
                      <Mail
                        size={18}
                        strokeWidth={1.8}
                      />
                    </div>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      value={form.email}
                      onChange={handleChange}
                      autoComplete="email"
                      className="h-13 w-full rounded-2xl border border-border bg-surface pl-12 pr-4 font-sans text-sm text-foreground placeholder:text-muted outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10"
                    />

                  </div>
                </div>

                {/* Mobile */}
                <div>

                  <label
                    htmlFor="mobile"
                    className="mb-2 block font-sans text-xs font-semibold text-foreground-2"
                  >
                    Mobile Number
                  </label>

                  <div className="group relative">

                    <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary transition-colors group-focus-within:text-primary">
                      <Phone
                        size={18}
                        strokeWidth={1.8}
                      />
                    </div>

                    <input
                      id="mobile"
                      name="mobile"
                      type="tel"
                      inputMode="numeric"
                      maxLength={10}
                      placeholder="10 digit mobile number"
                      value={form.mobile}
                      onChange={handleMobileChange}
                      autoComplete="tel"
                      className="h-13 w-full rounded-2xl border border-border bg-surface pl-12 pr-4 font-sans text-sm text-foreground placeholder:text-muted outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10"
                    />

                  </div>
                </div>

                {/* Password */}
                <div>

                  <label
                    htmlFor="password"
                    className="mb-2 block font-sans text-xs font-semibold text-foreground-2"
                  >
                    Password
                  </label>

                  <div className="group relative">

                    <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary transition-colors group-focus-within:text-primary">
                      <Lock
                        size={18}
                        strokeWidth={1.8}
                      />
                    </div>

                    <input
                      id="password"
                      name="password"
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      placeholder="Create a password"
                      value={form.password}
                      onChange={handleChange}
                      autoComplete="new-password"
                      className="h-13 w-full rounded-2xl border border-border bg-surface pl-12 pr-12 font-sans text-sm text-foreground placeholder:text-muted outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(
                          (prev) => !prev
                        )
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary transition-colors hover:text-primary"
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>

                  </div>

                </div>

                {/* Confirm Password */}
                <div>

                  <label
                    htmlFor="confirmPassword"
                    className="mb-2 block font-sans text-xs font-semibold text-foreground-2"
                  >
                    Confirm Password
                  </label>

                  <div className="group relative">

                    <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary transition-colors group-focus-within:text-primary">
                      <Lock
                        size={18}
                        strokeWidth={1.8}
                      />
                    </div>

                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={
                        showConfirmPassword
                          ? "text"
                          : "password"
                      }
                      placeholder="Confirm your password"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      autoComplete="new-password"
                      className="h-13 w-full rounded-2xl border border-border bg-surface pl-12 pr-12 font-sans text-sm text-foreground placeholder:text-muted outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(
                          (prev) => !prev
                        )
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary transition-colors hover:text-primary"
                      aria-label={
                        showConfirmPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>

                  </div>

                </div>

                {/* Terms */}
                <div className="flex items-start gap-2 pt-1">

                  <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border border-border bg-background">
                    <Check
                      size={10}
                      className="text-primary"
                    />
                  </div>

                  <p className="font-sans text-[11px] leading-5 text-text-secondary">
                    By creating an account, you agree to our
                    terms and understand that your information
                    will be kept secure.
                  </p>

                </div>

                {/* Create Account */}
                <button
                  type="submit"
                  disabled={loading}
                  className="group flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 font-sans text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-dark hover:shadow-xl hover:shadow-primary/25 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? (
                    <>
                      <svg
                        className="h-5 w-5 animate-spin"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="9"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="opacity-30"
                        />

                        <path
                          d="M21 12a9 9 0 0 0-9-9"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>

                      Creating Account...
                    </>
                  ) : (
                    <>
                      Create Account

                      <ArrowRight
                        size={18}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </>
                  )}
                </button>

              </form>

              {/* Login Divider */}
              <div className="my-6 flex items-center gap-4">

                <div className="h-px flex-1 bg-border" />

                <span className="font-sans text-[10px] uppercase tracking-[0.18em] text-muted">
                  Already a member?
                </span>

                <div className="h-px flex-1 bg-border" />

              </div>

              {/* Login */}
              <Link
                href="/auth/login"
                className="group flex h-14 w-full items-center justify-center gap-2 rounded-2xl border border-border bg-background font-sans text-sm font-semibold text-foreground transition-all hover:border-primary hover:bg-primary-light"
              >
                <Lock
                  size={17}
                  strokeWidth={1.8}
                  className="text-secondary transition-colors group-hover:text-primary"
                />

                Sign In to Yarche

                <ArrowRight
                  size={17}
                  className="text-muted transition-all group-hover:translate-x-1 group-hover:text-primary"
                />
              </Link>

              {/* Security */}
              <div className="mt-6 flex items-center justify-center gap-2">

                <ShieldCheck
                  size={15}
                  className="text-success"
                />

                <p className="font-sans text-[11px] text-text-secondary">
                  Your personal information is protected.
                </p>

              </div>

              {/* Footer */}
              <p className="mt-7 text-center font-sans text-[10px] tracking-wide text-muted">
                © {new Date().getFullYear()} Yarche · Handmade with care
              </p>

            </div>
          </section>

        </div>
      </div>
    </main>
  );
}

