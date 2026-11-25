
"use client";

import { useEffect, useState } from "react";
import API from "@/src/lib/api";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  KeyRound,
  Loader2,
  Lock,
  Mail,
  Phone,
  RefreshCw,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

type Step = "identifier" | "otp" | "password";

export default function ForgotPasswordPage() {
  const router = useRouter();

  const [step, setStep] = useState<Step>("identifier");

  const [identifier, setIdentifier] = useState("");
  const [otp, setOtp] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  const [countdown, setCountdown] = useState(0);

  const [resetToken, setResetToken] = useState("");

  const isEmail = identifier.includes("@");

  /* =========================================================
     OTP COUNTDOWN
  ========================================================== */

  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  /* =========================================================
     SEND OTP
  ========================================================== */

  const handleSendOtp = async () => {
    const value = identifier.trim();

    if (!value) {
      toast.error("Please enter your email or phone number.");
      return;
    }

    if (value.includes("@")) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(value)) {
        toast.error("Please enter a valid email address.");
        return;
      }
    } else {
      const phoneRegex = /^[0-9]{10}$/;

      if (!phoneRegex.test(value)) {
        toast.error("Please enter a valid 10-digit phone number.");
        return;
      }
    }

    setLoading(true);

    const loadingToast = toast.loading("Sending OTP...");

    try {
      const payload = {
        email: value.includes("@") ? value : "",
        mobile: !value.includes("@") ? value : "",
      };

      const res = await API.post("/forgot-password/send-otp", payload);

      if (res.data?.response === "success") {
        toast.success("OTP sent successfully.", {
          id: loadingToast,
        });

        setStep("otp");
        setCountdown(60);
        setOtp("");

        return;
      }

      toast.error(res.data?.message || "Unable to send OTP.", {
        id: loadingToast,
      });
    } catch (error: any) {
      console.error("Send OTP Error:", error);

      toast.error(
        error?.response?.data?.message ||
          "Unable to send OTP. Please try again.",
        {
          id: loadingToast,
        }
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     VERIFY OTP
  ========================================================== */

  const handleVerifyOtp = async () => {
    const value = otp.trim();

    if (!value) {
      toast.error("Please enter the OTP.");
      return;
    }

    if (!/^[0-9]{4,6}$/.test(value)) {
      toast.error("Please enter a valid OTP.");
      return;
    }

    setLoading(true);

    const loadingToast = toast.loading("Verifying OTP...");

    try {
      const payload = {
        email: isEmail ? identifier.trim() : "",
        mobile: !isEmail ? identifier.trim() : "",
        otp: value,
      };

      const res = await API.post(
        "/forgot-password/verify-otp",
        payload
      );

      if (res.data?.response === "success") {
        toast.success("OTP verified successfully.", {
          id: loadingToast,
        });

        /*
         * Backend should ideally return a temporary
         * reset token here.
         */
        setResetToken(
          res.data?.resetToken ||
            res.data?.token ||
            ""
        );

        setStep("password");

        return;
      }

      toast.error(res.data?.message || "Invalid OTP.", {
        id: loadingToast,
      });
    } catch (error: any) {
      console.error("Verify OTP Error:", error);

      toast.error(
        error?.response?.data?.message ||
          "Invalid or expired OTP.",
        {
          id: loadingToast,
        }
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     RESEND OTP
  ========================================================== */

  const handleResendOtp = async () => {
    if (countdown > 0 || resending) return;

    setResending(true);

    try {
      const payload = {
        email: isEmail ? identifier.trim() : "",
        mobile: !isEmail ? identifier.trim() : "",
      };

      const res = await API.post(
        "/forgot-password/send-otp",
        payload
      );

      if (res.data?.response === "success") {
        toast.success("A new OTP has been sent.");
        setCountdown(60);
        setOtp("");
      } else {
        toast.error(
          res.data?.message || "Unable to resend OTP."
        );
      }
    } catch (error: any) {
      console.error("Resend OTP Error:", error);

      toast.error(
        error?.response?.data?.message ||
          "Unable to resend OTP."
      );
    } finally {
      setResending(false);
    }
  };

  /* =========================================================
     RESET PASSWORD
  ========================================================== */

  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      toast.error("Please enter both passwords.");
      return;
    }

    if (newPassword.length < 6) {
      toast.error(
        "Password must be at least 6 characters."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);

    const loadingToast = toast.loading(
      "Updating your password..."
    );

    try {
      const payload = {
        email: isEmail ? identifier.trim() : "",
        mobile: !isEmail ? identifier.trim() : "",
        otp,
        newPassword,
        confirmPassword,
        resetToken,
      };

      const res = await API.post(
        "/forgot-password/reset-password",
        payload
      );

      if (res.data?.response === "success") {
        toast.success(
          "Password updated successfully. Please login.",
          {
            id: loadingToast,
          }
        );

        router.push("/auth/login");

        return;
      }

      toast.error(
        res.data?.message ||
          "Unable to update password.",
        {
          id: loadingToast,
        }
      );
    } catch (error: any) {
      console.error("Reset Password Error:", error);

      toast.error(
        error?.response?.data?.message ||
          "Unable to reset password.",
        {
          id: loadingToast,
        }
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     STEP CONTENT
  ========================================================== */

  const stepNumber =
    step === "identifier"
      ? 1
      : step === "otp"
      ? 2
      : 3;

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4 py-8 md:px-8">
      <div className="w-full max-w-6xl">
        <div className="grid lg:grid-cols-2 overflow-hidden rounded-[2rem] border border-border bg-surface shadow-[0_25px_80px_rgba(40,23,13,0.12)]">

          {/* =====================================================
              LEFT — BRAND SECTION
          ====================================================== */}

          <section className="relative hidden lg:flex min-h-[680px] overflow-hidden bg-footer">
            {/* Decorative circles */}
            <div className="absolute -top-28 -left-28 h-72 w-72 rounded-full bg-primary/20 blur-2xl" />

            <div className="absolute -bottom-32 -right-24 h-80 w-80 rounded-full bg-secondary/30 blur-3xl" />

            {/* Pattern */}
            <div className="absolute inset-0 opacity-[0.06]">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `
                    radial-gradient(
                      circle at 20% 20%,
                      white 1px,
                      transparent 1px
                    ),
                    radial-gradient(
                      circle at 80% 70%,
                      white 1px,
                      transparent 1px
                    )
                  `,
                  backgroundSize: "32px 32px",
                }}
              />
            </div>

            <div className="relative z-10 flex w-full flex-col justify-between p-12">

              {/* Logo */}
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
                    Account Recovery
                  </p>

                  <h1 className="text-6xl leading-[0.95] font-medium text-footer-heading">
                    A fresh start
                    <br />

                    <span className="italic text-primary">
                      begins here.
                    </span>
                  </h1>

                  <p className="mt-7 max-w-sm font-sans text-sm leading-7 text-footer-text/70">
                    Securely recover your Yarche account and
                    continue exploring handcrafted pieces made
                    with warmth, character and care.
                  </p>
                </div>
              </div>

              {/* Bottom Feature */}
              <div>
                <div className="mb-7 h-px w-20 bg-primary" />

                <p className="max-w-md font-heading text-2xl italic leading-relaxed text-footer-heading">
                  “Your account, your space, securely protected.”
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
                      Secure Account Recovery
                    </p>

                    <p className="font-sans text-[11px] text-footer-text/50">
                      Your information stays protected
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* =====================================================
              RIGHT — FORGOT PASSWORD
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

              {/* Back */}
              <Link
                href="/auth/login"
                className="mb-7 inline-flex items-center gap-2 text-xs font-semibold text-text-secondary transition hover:text-primary"
              >
                <ArrowLeft size={15} />
                Back to Login
              </Link>

              {/* Header */}
              <div className="mb-8">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-light text-primary">
                  {step === "identifier" && (
                    <KeyRound
                      size={25}
                      strokeWidth={1.8}
                    />
                  )}

                  {step === "otp" && (
                    <ShieldCheck
                      size={25}
                      strokeWidth={1.8}
                    />
                  )}

                  {step === "password" && (
                    <Lock
                      size={25}
                      strokeWidth={1.8}
                    />
                  )}
                </div>

                <p className="mb-2 font-sans text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                  {step === "identifier"
                    ? "Account Recovery"
                    : step === "otp"
                    ? "Verify Identity"
                    : "Almost There"}
                </p>

                <h2 className="text-4xl leading-tight font-medium text-foreground">
                  {step === "identifier" && (
                    <>
                      Forgot your
                      <span className="block italic text-secondary">
                        password?
                      </span>
                    </>
                  )}

                  {step === "otp" && (
                    <>
                      Verify your
                      <span className="block italic text-secondary">
                        account
                      </span>
                    </>
                  )}

                  {step === "password" && (
                    <>
                      Create a new
                      <span className="block italic text-secondary">
                        password
                      </span>
                    </>
                  )}
                </h2>

                <p className="mt-3 max-w-sm font-sans text-sm leading-6 text-text-secondary">
                  {step === "identifier" &&
                    "Enter your registered email or phone number and we'll send you a secure OTP."}

                  {step === "otp" &&
                    `Enter the verification code sent to ${
                      isEmail
                        ? identifier
                        : `+91 ${identifier}`
                    }.`}

                  {step === "password" &&
                    "Choose a strong password to keep your Yarche account secure."}
                </p>
              </div>

              {/* =================================================
                  PROGRESS
              ================================================== */}

              <div className="mb-8">
                <div className="flex items-center gap-2">
                  {[1, 2, 3].map((item) => (
                    <div
                      key={item}
                      className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                        item <= stepNumber
                          ? "bg-primary"
                          : "bg-border"
                      }`}
                    />
                  ))}
                </div>

                <div className="mt-2 flex justify-between">
                  <span className="text-[10px] text-muted">
                    Contact
                  </span>

                  <span className="text-[10px] text-muted">
                    Verification
                  </span>

                  <span className="text-[10px] text-muted">
                    New Password
                  </span>
                </div>
              </div>

              {/* =================================================
                  STEP 1 — EMAIL / PHONE
              ================================================== */}

              {step === "identifier" && (
                <div className="space-y-5">
                  <div>
                    <label
                      htmlFor="identifier"
                      className="mb-2 block font-sans text-xs font-semibold text-foreground-2"
                    >
                      Email or Phone Number
                    </label>

                    <div className="group relative">
                      <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary transition group-focus-within:text-primary">
                        {isEmail ? (
                          <Mail
                            size={18}
                            strokeWidth={1.8}
                          />
                        ) : (
                          <Phone
                            size={18}
                            strokeWidth={1.8}
                          />
                        )}
                      </div>

                      <input
                        id="identifier"
                        type="text"
                        value={identifier}
                        onChange={(e) =>
                          setIdentifier(e.target.value)
                        }
                        placeholder="Enter your email or phone"
                        autoComplete="username"
                        className="h-14 w-full rounded-2xl border border-border bg-surface pl-12 pr-4 font-sans text-sm text-foreground placeholder:text-muted outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10"
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={loading}
                    className="group flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 font-sans text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-dark hover:shadow-xl hover:shadow-primary/25 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {loading ? (
                      <>
                        <Loader2
                          size={19}
                          className="animate-spin"
                        />
                        Sending OTP...
                      </>
                    ) : (
                      <>
                        Send OTP
                        <ArrowRight
                          size={18}
                          className="transition-transform group-hover:translate-x-1"
                        />
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* =================================================
                  STEP 2 — OTP
              ================================================== */}

              {step === "otp" && (
                <div className="space-y-5">
                  <div>
                    <label
                      htmlFor="otp"
                      className="mb-2 block font-sans text-xs font-semibold text-foreground-2"
                    >
                      Enter OTP
                    </label>

                    <div className="relative">
                      <input
                        id="otp"
                        type="text"
                        inputMode="numeric"
                        maxLength={6}
                        value={otp}
                        onChange={(e) =>
                          setOtp(
                            e.target.value.replace(
                              /\D/g,
                              ""
                            )
                          )
                        }
                        placeholder="Enter 6-digit OTP"
                        className="h-14 w-full rounded-2xl border border-border bg-surface px-4 text-center text-lg font-semibold tracking-[0.5em] text-foreground placeholder:text-muted placeholder:tracking-normal outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10"
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleVerifyOtp}
                    disabled={loading}
                    className="group flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 font-sans text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-dark hover:shadow-xl hover:shadow-primary/25 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {loading ? (
                      <>
                        <Loader2
                          size={19}
                          className="animate-spin"
                        />
                        Verifying...
                      </>
                    ) : (
                      <>
                        Verify OTP
                        <ArrowRight
                          size={18}
                          className="transition-transform group-hover:translate-x-1"
                        />
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-between pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        setStep("identifier");
                        setOtp("");
                      }}
                      className="text-xs font-semibold text-text-secondary hover:text-primary transition"
                    >
                      Change email / phone
                    </button>

                    <button
                      type="button"
                      disabled={
                        countdown > 0 || resending
                      }
                      onClick={handleResendOtp}
                      className="flex items-center gap-1.5 text-xs font-semibold text-primary disabled:cursor-not-allowed disabled:text-muted"
                    >
                      <RefreshCw
                        size={13}
                        className={
                          resending
                            ? "animate-spin"
                            : ""
                        }
                      />

                      {countdown > 0
                        ? `Resend in ${countdown}s`
                        : "Resend OTP"}
                    </button>
                  </div>
                </div>
              )}

              {/* =================================================
                  STEP 3 — NEW PASSWORD
              ================================================== */}

              {step === "password" && (
                <div className="space-y-5">
                  {/* New Password */}
                  <div>
                    <label
                      htmlFor="newPassword"
                      className="mb-2 block font-sans text-xs font-semibold text-foreground-2"
                    >
                      New Password
                    </label>

                    <div className="group relative">
                      <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary transition group-focus-within:text-primary">
                        <Lock
                          size={18}
                          strokeWidth={1.8}
                        />
                      </div>

                      <input
                        id="newPassword"
                        type={
                          showPassword
                            ? "text"
                            : "password"
                        }
                        value={newPassword}
                        onChange={(e) =>
                          setNewPassword(e.target.value)
                        }
                        placeholder="Enter new password"
                        autoComplete="new-password"
                        className="h-14 w-full rounded-2xl border border-border bg-surface pl-12 pr-12 font-sans text-sm text-foreground placeholder:text-muted outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowPassword(
                            (prev) => !prev
                          )
                        }
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary hover:text-primary transition"
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
                      <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary transition group-focus-within:text-primary">
                        <Lock
                          size={18}
                          strokeWidth={1.8}
                        />
                      </div>

                      <input
                        id="confirmPassword"
                        type={
                          showConfirmPassword
                            ? "text"
                            : "password"
                        }
                        value={confirmPassword}
                        onChange={(e) =>
                          setConfirmPassword(
                            e.target.value
                          )
                        }
                        placeholder="Confirm your password"
                        autoComplete="new-password"
                        className="h-14 w-full rounded-2xl border border-border bg-surface pl-12 pr-12 font-sans text-sm text-foreground placeholder:text-muted outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(
                            (prev) => !prev
                          )
                        }
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary hover:text-primary transition"
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Password Requirements */}
                  <div className="rounded-2xl border border-border bg-background p-4">
                    <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-text-secondary">
                      Password should contain
                    </p>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle2
                          size={14}
                          className={
                            newPassword.length >= 6
                              ? "text-success"
                              : "text-muted"
                          }
                        />

                        <span className="text-xs text-text-secondary">
                          At least 6 characters
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <CheckCircle2
                          size={14}
                          className={
                            newPassword &&
                            confirmPassword &&
                            newPassword ===
                              confirmPassword
                              ? "text-success"
                              : "text-muted"
                          }
                        />

                        <span className="text-xs text-text-secondary">
                          Passwords should match
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleResetPassword}
                    disabled={loading}
                    className="group flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 font-sans text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-dark hover:shadow-xl hover:shadow-primary/25 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {loading ? (
                      <>
                        <Loader2
                          size={19}
                          className="animate-spin"
                        />
                        Updating Password...
                      </>
                    ) : (
                      <>
                        Reset Password
                        <ArrowRight
                          size={18}
                          className="transition-transform group-hover:translate-x-1"
                        />
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* Trust */}
              <div className="mt-8 flex items-center justify-center gap-2 text-center">
                <ShieldCheck
                  size={15}
                  className="text-success"
                />

                <p className="font-sans text-[11px] text-text-secondary">
                  Your account information is kept secure.
                </p>
              </div>

              {/* Footer */}
              <p className="mt-7 text-center font-sans text-[10px] tracking-wide text-muted">
                © {new Date().getFullYear()} Yarche · Handmade
                with care
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

