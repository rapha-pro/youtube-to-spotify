"use client";

import Header from '@/app/sections/Header';
import Hero from '@/app/sections/Hero';
import Features from '@/app/sections/Features';
import HowItWorks from '@/app/sections/HowItWorks';
import Testimonial from '@/app/sections/Testimonial';
import Footer from '@/app/sections/Footer';
import Faq from './sections/faq';
import Cta from './sections/cta';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white overflow-x-hidden">
      <Hero />
      <Features />
      <HowItWorks />
      <Testimonial />
      <Faq />
      <Cta />
      <Footer />
    </div>
  );
}