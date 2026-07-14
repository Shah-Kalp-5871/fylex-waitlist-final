"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, AlertCircle } from "lucide-react";

// Validates a 10-digit Indian mobile number
function validatePhone(phone: string): string | null {
  const stripped = phone.replace(/\D/g, "");
  if (!stripped) return "Please enter your mobile number.";
  if (stripped.length !== 10) return "Mobile number must be exactly 10 digits.";
  if (!/^[6-9]/.test(stripped)) return "Enter a valid Indian mobile number.";
  return null;
}

export function WaitlistForm() {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow only digits and limit to 10 characters
    const val = e.target.value.replace(/\D/g, "").slice(0, 10);
    setPhone(val);
    if (error) setError(null); // clear error on type
    if (success) setSuccess(null); // clear success on type
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validatePhone(phone);
    if (validationError) {
      setError(validationError);
      return;
    }
    
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone: phone.replace(/\D/g, "") }),
      });

      if (response.status === 409) {
        setPhone("");
        setSuccess("You are already registered.");
        return;
      }

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      setPhone("");
      setSuccess("Success! Your spot is secured. We will notify you the moment our doors open.");
    } catch (err) {
      console.error(err);
      setError("Failed to register. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-8">
      <AnimatePresence mode="wait">
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col gap-3"
          >
            <div className="flex justify-center w-full mb-1">
              <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/[0.02] border border-white/10 backdrop-blur-sm shadow-sm">
                <span className="text-zinc-500 text-[8px] md:text-[9px] uppercase tracking-[0.3em] font-bold">Reward</span>
                <div className="w-px h-3 bg-white/20"></div>
                <span className="text-zinc-300 text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-medium">
                  500 Fylex Credit
                </span>
              </div>
            </div>
            <motion.form
              onSubmit={handleSubmit}
              className={`relative flex items-center w-full p-1 rounded-full transition-all duration-300 ${
                isFocused
                  ? "bg-white/10 border-white/30 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                  : error
                  ? "bg-red-500/5 border-red-500/40"
                  : "bg-white/5 border-white/10"
              } border backdrop-blur-md`}
            >
              {/* Country code prefix */}
              <span className="pl-4 pr-1 text-zinc-400 text-sm font-medium select-none shrink-0">
                +91
              </span>
              <div className="w-px h-4 bg-white/15 mx-1 shrink-0" />

              <input
                suppressHydrationWarning
                type="tel"
                inputMode="numeric"
                pattern="[0-9\s\-]*"
                value={phone}
                onChange={handleChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Enter your mobile number..."
                autoComplete="tel"
                maxLength={15}
                className="flex-1 min-w-0 bg-transparent px-3 md:px-4 py-3 text-xs md:text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-0"
              />
              <button
                suppressHydrationWarning
                type="submit"
                className="fylex-cta px-6 py-3 ml-2 shrink-0 text-[10px] md:text-xs"
              >
                Join the Fylex world
              </button>
            </motion.form>

            {/* Inline error */}
            <AnimatePresence>
              {error && (
                <motion.p
                  key="error"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="flex items-center gap-1.5 text-red-400 text-xs px-4"
                >
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  {error}
                </motion.p>
              )}
            </AnimatePresence>
            {/* Inline success */}
            <AnimatePresence>
              {success && (
                <motion.p
                  key="success"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="flex items-center gap-1.5 text-emerald-400 text-xs px-4 mt-2"
                >
                  <Check className="w-3.5 h-3.5 shrink-0" />
                  {success}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
      </AnimatePresence>
    </div>
  );
}
