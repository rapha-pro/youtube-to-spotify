export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 bg-black">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How It Works
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Three simple steps to transfer your music collections
          </p>
        </div>

        <div className="space-y-16">
          <div className="step-card grid md:grid-cols-5 gap-6 items-center">
            <div className="md:col-span-2 order-2 md:order-1">
              <div className="h-12 w-12 rounded-full bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center text-xl font-bold mb-4">
                1
              </div>
              <h3 className="text-2xl font-bold mb-3">Connect YouTube</h3>
              <p className="text-gray-400">
                Login with your Google account to access your YouTube playlists. We'll scan your account and show you all available playlists.
              </p>
            </div>
            <div className="md:col-span-3 order-1 md:order-2">
              {/* Additional content can be added here */}
            </div>
          </div>

          <div className="step-card grid md:grid-cols-5 gap-6 items-center">
            {/* Additional steps can be added here */}
          </div>
        </div>
      </div>
    </section>
  );
};