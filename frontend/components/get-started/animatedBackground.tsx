"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function AnimatedBackground() {
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = backgroundRef.current;

    if (!container) return;

    // Create floating particles
    const createParticles = () => {
      for (let i = 0; i < 15; i++) {
        const particle = document.createElement("div");

        particle.className = "absolute rounded-full opacity-20";

        // Random size and color
        const size = Math.random() * 20 + 2;
        const colors = [
          "bg-green-400",
          "bg-blue-400",
          "bg-purple-400",
          "bg-red-400",
        ];
        const color = colors[Math.floor(Math.random() * colors.length)];

        particle.classList.add(color);
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;

        container.appendChild(particle);

        // Animate particle
        gsap.to(particle, {
          x: (Math.random() - 0.5) * 200,
          y: (Math.random() - 0.5) * 200,
          duration: Math.random() * 20 + 10,
          ease: "none",
          repeat: -1,
          yoyo: true,
        });

        gsap.to(particle, {
          opacity: Math.random() * 0.3 + 0.1,
          duration: Math.random() * 3 + 2,
          ease: "power2.inOut",
          repeat: -1,
          yoyo: true,
        });
      }
    };

    createParticles();

    // Cleanup function
    return () => {
      if (container) {
        container.innerHTML = "";
      }
    };
  }, []);

  return (
    <div
      ref={backgroundRef}
      className="fixed inset-0 pointer-events-none overflow-hidden"
    >
      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 h-64 w-64 bg-green-500/10 rounded-full filter blur-3xl animate-pulse" />
      <div className="absolute top-3/4 right-1/4 h-64 w-64 bg-blue-500/10 rounded-full filter blur-3xl animate-pulse" />
      <div className="absolute top-1/2 right-1/3 h-48 w-48 bg-purple-500/10 rounded-full filter blur-3xl animate-pulse" />

      {/* Mesh Gradient Background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            radial-gradient(circle at 20% 80%, rgba(34, 197, 94, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)
          `,
        }}
      />
    </div>
  );
}
