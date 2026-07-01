"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, AlertCircle } from "lucide-react";
import Swal from 'sweetalert2';

// Validates a 10-digit Indian mobile number (or any 10-digit number)
function validatePhone(phone: string): string | null {
  const stripped = phone.replace(/\D/g, "");
  if (!stripped) return "Please enter your mobile number.";
  if (stripped.length < 10) return "Enter a valid 10-digit mobile number.";
  if (stripped.length > 12) return "Number looks too long. Please check.";
  return null;
}

export function WaitlistForm() {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow only digits, spaces, dashes, plus sign
    const val = e.target.value.replace(/[^\d\s\-+]/g, "");
    setPhone(val);
    if (error) setError(null); // clear error on type
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validatePhone(phone);
    if (validationError) {
      setError(validationError);
      return;
    }
    
    try {
      const response = await fetch('/fylex-waitlist/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone: phone.replace(/\D/g, "") }),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      setPhone("");
      Swal.fire({
        title: 'Success!',
        text: 'User registration successful!',
        icon: 'success',
        background: '#18181b', // dark background matching site
        color: '#ffffff', // white text
        confirmButtonColor: '#10b981',
      });
    } catch (err) {
      console.error(err);
      setError("Failed to register. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-8">
      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col gap-3"
          >
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
                className="relative flex items-center justify-center p-3 ml-2 shrink-0 text-black bg-white rounded-full hover:bg-zinc-200 transition-colors"
              >
                <ArrowRight className="w-5 h-5" />
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
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
