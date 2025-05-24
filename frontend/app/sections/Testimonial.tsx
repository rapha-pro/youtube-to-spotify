import { useEffect, useRef, useState } from "react";
import { Button, Card } from "@heroui/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import clsx from "clsx";

import { testimonials } from "@/utils/testimonials";

export default function Testimonial() {
  const testimonialRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const currentTestimonial = testimonials[currentIndex];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from(testimonialRef.current, {
      scrollTrigger: {
        trigger: testimonialRef.current,
        start: "top bottom-=50",
      },
      y: 100,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    });
  }, []);

  // Function to animate testimonial change
  const changeTestimonial = (newIndex: number) => {
    if (isAnimating || newIndex === currentIndex) return;

    setIsAnimating(true);

    // Animate out
    gsap.to(contentRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.3,
      ease: "power2.out",
      onComplete: () => {
        // Change content
        setCurrentIndex(newIndex);

        // Animate in
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: "power2.out",
            onComplete: () => setIsAnimating(false),
          },
        );
      },
    });
  };

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % testimonials.length;

      changeTestimonial(nextIndex);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, isAnimating]);

  return (
    <section
      ref={testimonialRef}
      className="py-20 bg-gradient-to-b from-gray-900 to-black"
    >
      <div className="container mx-auto px-4 max-w-4xl">
        <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700 p-8 md:p-10">
          <div
            ref={contentRef}
            className="flex flex-col items-center text-center"
          >
            <div className="h-16 w-16 bg-gradient-to-r from-green-400 to-purple-500 rounded-full mb-6 flex items-center justify-center">
              <div className="h-14 w-14 bg-gray-900 rounded-full flex items-center justify-center text-2xl">
                {currentTestimonial.icon}
              </div>
            </div>
            <p className="text-xl md:text-2xl mb-6 text-gray-100 italic">
              "{currentTestimonial.quote}"
            </p>
            <div>
              <h4 className="font-bold">{currentTestimonial.name}</h4>
              <p className="text-gray-400 text-sm">
                {currentTestimonial.title}
              </p>
            </div>
          </div>

          {/* navigation dots */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <Button
                key={index}
                className={clsx(
                  "w-2 h-2 rounded-full transition-all duration-300 mx-2",
                  index === currentIndex
                    ? "bg-green-400 scale-110"
                    : "bg-gray-600 hover:bg-gray-500",
                  isAnimating ? "cursor-not-allowed" : "cursor-pointer",
                )}
                disabled={isAnimating}
                onClick={() => changeTestimonial(index)}
              >
				</Button>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
}
