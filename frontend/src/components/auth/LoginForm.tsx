
"use client";

import { useState } from "react";
import API from "@/src/lib/api";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/src/store/authStore";
import Image from "next/image";
import {
  Loader2,
  Mail,
  Lock,
  User,
  LogIn,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function LoginForm() {
  const router = useRouter();

  const setAuth = useAuthStore((state) => state.setAuth);

  const [form, setForm] = useState({
    identifier: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.identifier.trim() || !form.password.trim()) {
      toast.error("Please enter your email/phone and password.");
      return;
    }

    setLoading(true);

    const loadingToast = toast.loading("Signing you in...");

    try {
      const payload = {
        email: form.identifier.includes("@") ? form.identifier : "",
        mobile: !form.identifier.includes("@") ? form.identifier : "",
        password: form.password,
      };

      // Normal User Login
      const res = await API.post("/login", payload);

      if (res.data.response === "success") {
        setAuth(res.data.user, res.data.token);

        toast.success("Welcome back to Yarche ✨", {
          id: loadingToast,
        });

        router.push("/");
        return;
      }
    } catch (userErr) {
      try {
        // Admin Login
        const adminRes = await API.post("/admin/login", {
          adminUser: form.identifier,
          password: form.password,
        });

        console.log("ADMIN RESPONSE:", adminRes.data);

        if (adminRes.data.response === "success") {
          localStorage.setItem(
            "adminToken",
            adminRes.data.adminToken
          );

          toast.success("Welcome Admin 👑", {
            id: loadingToast,
          });

          router.push("/admin");
          return;
        }
      } catch (adminErr: any) {
        toast.error(
          adminErr?.response?.data?.message ||
            "Invalid email/phone or password.",
          {
            id: loadingToast,
          }
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4 py-8 md:px-8">

      {/* Main Premium Container */}
      <div className="w-full max-w-6xl">

        <div className="grid lg:grid-cols-2 overflow-hidden rounded-[2rem] border border-border bg-surface shadow-[0_25px_80px_rgba(40,23,13,0.12)]">

          {/* =====================================================
              LEFT — BRAND / CRAFT SECTION
          ====================================================== */}
          <section className="relative hidden lg:flex min-h-[680px] overflow-hidden bg-footer">

            {/* Decorative circles */}
            <div className="absolute -top-28 -left-28 h-72 w-72 rounded-full bg-primary/20 blur-2xl" />
            <div className="absolute -bottom-32 -right-24 h-80 w-80 rounded-full bg-secondary/30 blur-3xl" />

            {/* Craft pattern */}
            <div className="absolute inset-0 opacity-[0.06]">
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

              {/* Logo / Brand */}
              <div>
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

                <div className="max-w-md">
                  <p className="mb-3 font-sans text-xs font-semibold uppercase tracking-[0.28em] text-primary">
                    Welcome to Yarche
                  </p>

                  <h1 className="text-6xl leading-[0.95] font-medium text-footer-heading">
                    Crafted for
                    <br />
                    <span className="italic text-primary">
                      beautiful living.
                    </span>
                  </h1>

                  <p className="mt-7 max-w-sm font-sans text-sm leading-7 text-footer-text/70">
                    Discover thoughtfully handcrafted pieces made to bring
                    warmth, character and timeless beauty into your everyday
                    spaces.
                  </p>
                </div>
              </div>

              {/* Bottom Quote / Feature */}
              <div>
                <div className="mb-7 h-px w-20 bg-primary" />

                <p className="max-w-md font-heading text-2xl italic leading-relaxed text-footer-heading">
                  “Every handmade piece carries a little story of the hands
                  that created it.”
                </p>

                <div className="mt-8 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border border-footer-text/20">
                    <ShieldCheck
                      size={17}
                      className="text-primary"
                    />
                  </div>

                  <div>
                    <p className="font-sans text-xs font-semibold text-footer-text">
                      Thoughtfully Crafted
                    </p>
                    <p className="font-sans text-[11px] text-footer-text/50">
                      Made with care & attention
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* =====================================================
              RIGHT — LOGIN FORM
          ====================================================== */}
          <section className="flex min-h-[680px] items-center justify-center bg-surface px-5 py-10 sm:px-8 md:px-12">

            <div className="w-full max-w-md">

              {/* Mobile Logo */}
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

              {/* Header */}
              <div className="mb-9">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-light text-primary">
                  <LogIn size={25} strokeWidth={1.8} />
                </div>

                <p className="mb-2 font-sans text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                  Welcome Back
                </p>

                <h2 className="text-4xl leading-tight font-medium text-foreground">
                  Sign in to your
                  <span className="block italic text-secondary">
                    Yarche account
                  </span>
                </h2>

                <p className="mt-3 max-w-sm font-sans text-sm leading-6 text-text-secondary">
                  Continue exploring handcrafted pieces made with warmth,
                  character and care.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleLogin} className="space-y-5">

                {/* Email / Phone */}
                <div>
                  <label
                    htmlFor="identifier"
                    className="mb-2 block font-sans text-xs font-semibold text-foreground-2"
                  >
                    Email or Phone Number
                  </label>

                  <div className="group relative">
                    <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary transition group-focus-within:text-primary">
                      <Mail size={18} strokeWidth={1.8} />
                    </div>

                    <input
                      id="identifier"
                      name="identifier"
                      type="text"
                      value={form.identifier}
                      onChange={handleChange}
                      placeholder="Enter your email or phone"
                      autoComplete="username"
                      className="h-14 w-full rounded-2xl border border-border bg-surface pl-12 pr-4 font-sans text-sm text-foreground placeholder:text-muted outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="font-sans text-xs font-semibold text-foreground-2"
                    >
                      Password
                    </label>

                    <Link
                      href="/auth/forgot-password"
                      className="font-sans text-xs font-semibold text-primary transition hover:text-primary-dark"
                    >
                      Forgot Password?
                    </Link>
                  </div>

                  <div className="group relative">
                    <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary transition group-focus-within:text-primary">
                      <Lock size={18} strokeWidth={1.8} />
                    </div>

                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={form.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      className="h-14 w-full rounded-2xl border border-border bg-surface pl-12 pr-12 font-sans text-sm text-foreground placeholder:text-muted outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword((prev) => !prev)
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary transition hover:text-primary"
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

                {/* Sign In */}
                <button
                  type="submit"
                  disabled={loading}
                  className="group flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 font-sans text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-dark hover:shadow-xl hover:shadow-primary/25 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? (
                    <>
                      <Loader2
                        size={19}
                        className="animate-spin"
                      />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight
                        size={18}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="my-7 flex items-center gap-4">
                <div className="h-px flex-1 bg-border" />
                <span className="font-sans text-[10px] uppercase tracking-[0.18em] text-muted">
                  New to Yarche?
                </span>
                <div className="h-px flex-1 bg-border" />
              </div>

              {/* Register */}
              <Link
                href="/auth/register"
                className="group flex h-14 w-full items-center justify-center gap-2 rounded-2xl border border-border bg-background font-sans text-sm font-semibold text-foreground transition-all hover:border-primary hover:bg-primary-light"
              >
                <User
                  size={18}
                  strokeWidth={1.8}
                  className="text-secondary transition-colors group-hover:text-primary"
                />

                Create New Account

                <ArrowRight
                  size={17}
                  className="text-muted transition-all group-hover:translate-x-1 group-hover:text-primary"
                />
              </Link>

              {/* Trust text */}
              <div className="mt-7 flex items-center justify-center gap-2 text-center">
                <ShieldCheck
                  size={15}
                  className="text-success"
                />

                <p className="font-sans text-[11px] text-text-secondary">
                  Your account information is kept secure.
                </p>
              </div>

              {/* Footer */}
              <p className="mt-8 text-center font-sans text-[10px] tracking-wide text-muted">
                © {new Date().getFullYear()} Yarche · Handmade with care
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

