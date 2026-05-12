"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

interface BrochureDownloadModalProps {
  children: React.ReactNode;
  brochureUrl?: string;
}

const BrochureDownloadModal = ({ children, brochureUrl = "/assets/brochure.pdf" }: BrochureDownloadModalProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError("Please enter both name and email.");
      return;
    }
    setError("");
    setSubmitted(true);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="bg-white text-slate-900 border border-slate-200 p-6 sm:p-8 shadow-2xl shadow-slate-200/80">
        <DialogHeader className="border-b border-slate-200 pb-4">
          <DialogTitle className="text-lg font-semibold text-slate-950">Download Brochure</DialogTitle>
          <DialogDescription className="text-sm text-slate-500">
            Please share your name and email to access the brochure.
          </DialogDescription>
        </DialogHeader>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="mt-1 space-y-5">
            <div>
              <label className="block text-sm text-slate-600 mb-2">Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-none border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-slate-300 focus:outline-none"
                placeholder="Enter your name"
              />
            </div>
            <div className="">
              <label className="block text-sm text-slate-600 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-none border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-slate-300 focus:outline-none"
                placeholder="Enter your email"
              />
            </div>
            {error ? <p className="text-base text-red-400">{error}</p> : null}
            <DialogFooter className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <DialogClose asChild>
                <button type="button" className="inline-flex justify-center rounded-none border border-slate-300 bg-white px-6 py-3 text-sm text-slate-900 transition hover:bg-slate-100">
                  Cancel
                </button>
              </DialogClose>
              <button type="submit" className="inline-flex justify-center rounded-none bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
                Continue
              </button>
            </DialogFooter>
          </form>
        ) : (
          <div className="mt-8 space-y-5 text-center">
            <p className="text-lg font-semibold text-slate-950">Thank you, {name}!</p>
            <p className="text-sm text-slate-500">
              Your brochure is ready. Click below to download it now.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <a
                href={brochureUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-none bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Download Brochure
              </a>
              <DialogClose asChild>
                <button className="inline-flex justify-center rounded-none border border-slate-200 bg-white px-6 py-3 text-sm text-slate-900 transition hover:bg-slate-100">
                  Close
                </button>
              </DialogClose>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BrochureDownloadModal;
