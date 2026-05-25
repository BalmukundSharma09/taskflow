"use client";

import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Product Designer",
    avatar: "SC",
    content:
      "TaskFlow transformed how our team manages projects. The Kanban board is incredibly intuitive.",
    rating: 5,
  },
  {
    name: "Marcus Johnson",
    role: "Software Engineer",
    avatar: "MJ",
    content:
      "Best productivity tool I've used. Clean interface, fast performance, and great team features.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Freelancer",
    avatar: "ER",
    content:
      "As a freelancer, TaskFlow helps me stay organized across multiple clients. Absolutely essential.",
    rating: 5,
  },
];

const avatarColors = ["bg-blue-500", "bg-violet-500", "bg-emerald-500"];

export function Testimonials() {
  return (
    <section id="about" className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-400 text-sm">
            Testimonials
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Loved by teams worldwide
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            See what our users have to say about their TaskFlow experience.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <div
              key={testimonial.name}
              className="rounded-xl border border-white/10 bg-white/[0.02] p-6 hover:border-white/20 transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                ))}
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                &ldquo;{testimonial.content}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full ${avatarColors[i]} flex items-center justify-center text-white text-sm font-medium`}
                >
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="text-sm font-medium text-white">{testimonial.name}</div>
                  <div className="text-xs text-gray-500">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}