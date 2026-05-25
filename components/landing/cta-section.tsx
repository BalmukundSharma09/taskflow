"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CtaSection() {
  return (
    <section className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl border border-blue-500/20 bg-gradient-to-r from-blue-600/10 via-blue-500/5 to-violet-600/10 p-8 md:p-16 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-violet-500/5" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[100px]" />
          
          <div className="relative space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Start Managing Smarter Today
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Join thousands of productive teams using TaskFlow. Get started free, no credit card required.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-blue-600 hover:bg-blue-500 text-white rounded-lg px-8 h-12 text-base shadow-lg shadow-blue-600/25 hover:shadow-blue-500/40 transition-all"
            >
              <Link href="/auth/register">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}