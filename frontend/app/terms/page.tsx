"use client";

import { useEffect, useRef } from "react";
import { Button } from "@heroui/react";
import { ArrowLeft, FileText, AlertTriangle, Users, Gavel } from "lucide-react";
import { gsap } from "gsap";
import { useRouter } from "next/navigation";
import { emailAddress } from "@/utils/socialLinks";

export default function TermsOfService() {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    // Kill any existing animations first
    gsap.killTweensOf([".page-header", ".main-content"]);

    // Animate page elements
    const timeoutId = setTimeout(() => {
      gsap.fromTo(
        ".page-header",
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      );

      gsap.fromTo(
        ".main-content",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: "power3.out" },
      );
    }, 50);

    return () => clearTimeout(timeoutId);
  }, []);

  const handleBackClick = () => {
    router.push("/");
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="page-header relative z-10 pt-8 pb-4 px-4">
        <div className="container mx-auto max-w-4xl pt-20">
          <Button
            className="group mb-6"
            startContent={
              <ArrowLeft
                className="group-hover:-translate-x-1 transition-transform"
                size={18}
              />
            }
            variant="ghost"
            onPress={handleBackClick}
          >
            Back to Home
          </Button>

          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 rounded-full bg-purple-500/20 flex items-center justify-center">
                <FileText className="text-purple-400" size={32} />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                Terms of Service
              </span>
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              The terms and conditions for using Syncwave
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content relative z-10 px-4 pb-16">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert max-w-none">
            <div className="bg-gray-800/50 rounded-lg p-8 space-y-8">
              <div className="text-sm text-gray-400 mb-6">
                Last updated: {new Date().toLocaleDateString()}
              </div>

              <section className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <Users className="text-green-400" size={24} />
                  <h2 className="text-2xl font-bold text-white">
                    Acceptance of Terms
                  </h2>
                </div>
                <p className="text-gray-300">
                  By accessing and using Syncwave, you accept and agree to be
                  bound by the terms and provision of this agreement. If you do
                  not agree to abide by the above, please do not use this
                  service.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-white">
                  Service Description
                </h2>
                <p className="text-gray-300">
                  Syncwave is a free service that allows users to transfer
                  playlists between YouTube and Spotify. The service requires
                  users to authenticate with both platforms to access their
                  playlist data.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-white">
                  User Responsibilities
                </h2>
                <p className="text-gray-300">
                  When using Syncwave, you agree to:
                </p>
                <ul className="text-gray-300 space-y-2 ml-6">
                  <li>
                    • Use the service only for legitimate playlist transfers
                  </li>
                  <li>• Respect the terms of service of Spotify and YouTube</li>
                  <li>• Not attempt to abuse, hack, or disrupt the service</li>
                  <li>
                    • Only transfer playlists you have permission to access
                  </li>
                  <li>
                    • Not use the service for commercial purposes without
                    permission
                  </li>
                </ul>
              </section>

              <section className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="text-yellow-400" size={24} />
                  <h2 className="text-2xl font-bold text-white">
                    Service Limitations
                  </h2>
                </div>
                <p className="text-gray-300">Please understand that:</p>
                <ul className="text-gray-300 space-y-2 ml-6">
                  <li>• Not all songs may be available on both platforms</li>
                  <li>
                    • Transfer success depends on third-party API availability
                  </li>
                  <li>
                    • Service may be temporarily unavailable for maintenance
                  </li>
                  <li>• We cannot guarantee 100% transfer accuracy</li>
                  <li>• Rate limits may apply to prevent abuse</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-white">
                  Intellectual Property
                </h2>
                <p className="text-gray-300">
                  The service and its original content, features, and
                  functionality are owned by Syncwave and are protected by
                  international copyright, trademark, patent, trade secret, and
                  other intellectual property laws.
                </p>
              </section>

              <section className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <Gavel className="text-red-400" size={24} />
                  <h2 className="text-2xl font-bold text-white">Disclaimers</h2>
                </div>
                <p className="text-gray-300">
                  Syncwave is provided "as is" without any representations or
                  warranties:
                </p>
                <ul className="text-gray-300 space-y-2 ml-6">
                  <li>
                    • We make no warranties about service availability or
                    reliability
                  </li>
                  <li>
                    • We are not responsible for content accuracy or
                    completeness
                  </li>
                  <li>• We cannot guarantee uninterrupted service</li>
                  <li>• Use of the service is at your own risk</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-white">
                  Limitation of Liability
                </h2>
                <p className="text-gray-300">
                  In no event shall Syncwave be liable for any indirect,
                  incidental, special, consequential, or punitive damages,
                  including without limitation, loss of profits, data, use,
                  goodwill, or other intangible losses.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-white">Termination</h2>
                <p className="text-gray-300">
                  We may terminate or suspend your access immediately, without
                  prior notice or liability, for any reason whatsoever,
                  including without limitation if you breach the Terms.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-white">
                  Changes to Terms
                </h2>
                <p className="text-gray-300">
                  We reserve the right to modify or replace these Terms at any
                  time. If a revision is material, we will try to provide at
                  least 30 days notice prior to any new terms taking effect.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-white">
                  Contact Information
                </h2>
                <p className="text-gray-300">
                  If you have any questions about these Terms of Service, please
                  contact us at:
                </p>
                <div className="bg-gray-700/50 p-4 rounded-lg">
                  <p className="text-white">{emailAddress}</p>
                </div>
              </section>

              <div className="border-t border-gray-700 pt-6 text-center text-gray-400 text-sm">
                <p>
                  These Terms of Service are effective as of{" "}
                  {new Date().toLocaleDateString()} and will remain in effect
                  except with respect to any changes in its provisions in the
                  future.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
