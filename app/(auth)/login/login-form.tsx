"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"phone" | "code">("phone");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function sendOtp() {
    setError("");

    if (!/^09\d{9}$/.test(phone)) {
      setError("شماره موبایل نامعتبر است");
      return;
    }

    setLoading(true);
    const res = await fetch("/api/auth/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone }),
    });
    setLoading(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "خطا در ارسال کد");
      return;
    }

    setStep("code");
  }

  async function verify() {
    setLoading(true);
    const res = await signIn("credentials", { phone, code, redirect: false });
    setLoading(false);
    if (res?.error) return alert("کد نامعتبر است");
    router.push("/");
    router.refresh();
  }

  return (
    <div className="max-w-sm mx-auto mt-20 space-y-4 p-6">
      <h1 className="text-xl font-bold">ورود با پیامک</h1>
      {step === "phone" ? (
        <>
          <input
            type="tel"
            placeholder="09123456789"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border p-2 rounded"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            onClick={sendOtp}
            disabled={loading}
            className="w-full bg-blue-600 text-white p-2 rounded disabled:opacity-50"
          >
            {loading ? "..." : "ارسال کد"}
          </button>
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="کد ۶ رقمی"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full border p-2 rounded"
          />
          <button
            onClick={verify}
            disabled={loading}
            className="w-full bg-green-600 text-white p-2 rounded"
          >
            {loading ? "..." : "تأیید و ورود"}
          </button>
        </>
      )}
    </div>
  );
}