"use client";

import { Hero, Features, HowItWorks, Testimonial, Footer } from '@/app/sections';


export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white overflow-x-hidden">
      <Hero />
      <Features />
      <HowItWorks />
      <Testimonial />
      <Footer />
    </div>
  );
}