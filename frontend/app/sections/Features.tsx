"use client";

import Card from '@/components/Card';

export const Features = () => {
  return (
    <section id="features" className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-purple-500">Syncwave</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            The easiest and most reliable way to transfer your music collections between streaming platforms.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="feature-card bg-gray-800/50 border border-gray-700 p-6 hover:border-green-500/50 transition-colors">
            <div className="h-12 w-12 rounded-lg bg-green-900/30 flex items-center justify-center mb-4">
              <Rocket className="text-green-400" size={20} />
            </div>
            <h3 className="text-xl font-bold mb-2">Lightning Fast</h3>
            <p className="text-gray-400">
              Transfer your playlists in seconds, not hours. Our optimized matching algorithm works at incredible speeds.
            </p>
          </Card>

          <Card className="feature-card bg-gray-800/50 border border-gray-700 p-6 hover:border-green-500/50 transition-colors">
            <div className="h-12 w-12 rounded-lg bg-purple-900/30 flex items-center justify-center mb-4">
              <Music className="text-purple-400" size={20} />
            </div>
            <h3 className="text-xl font-bold mb-2">99% Match Rate</h3>
            <p className="text-gray-400">
              Our advanced audio fingerprinting ensures nearly perfect matching, even for obscure tracks and remixes.
            </p>
          </Card>

          <Card className="feature-card bg-gray-800/50 border border-gray-700 p-6 hover:border-green-500/50 transition-colors">
            <div className="h-12 w-12 rounded-lg bg-blue-900/30 flex items-center justify-center mb-4">
              <CheckCircle className="text-blue-400" size={20} />
            </div>
            <h3 className="text-xl font-bold mb-2">Effortless Process</h3>
            <p className="text-gray-400">
              Just two logins and you're done. No complicated setup or configuration required.
            </p>
          </Card>

          <Card className="feature-card bg-gray-800/50 border border-gray-700 p-6 hover:border-green-500/50 transition-colors">
            <div className="h-12 w-12 rounded-lg bg-red-900/30 flex items-center justify-center mb-4">
              <YoutubeIcon className="text-red-400" size={20} />
            </div>
            <h3 className="text-xl font-bold mb-2">YouTube Integration</h3>
            <p className="text-gray-400">
              Access all your YouTube Music playlists and liked videos with a simple Google login.
            </p>
          </Card>

          <Card className="feature-card bg-gray-800/50 border border-gray-700 p-6 hover:border-green-500/50 transition-colors">
            <div className="h-12 w-12 rounded-lg bg-green-900/30 flex items-center justify-center mb-4">
              <SpotifyIcon className="text-green-400" size={20} />
            </div>
            <h3 className="text-xl font-bold mb-2">Spotify Integration</h3>
            <p className="text-gray-400">
              Seamlessly create new playlists in your Spotify account with all your favorite tracks.
            </p>
          </Card>

          <Card className="feature-card bg-gray-800/50 border border-gray-700 p-6 hover:border-green-500/50 transition-colors">
            <div className="h-12 w-12 rounded-lg bg-yellow-900/30 flex items-center justify-center mb-4">
              <CheckCircle className="text-yellow-400" size={20} />
            </div>
            <h3 className="text-xl font-bold mb-2">Safe & Secure</h3>
            <p className="text-gray-400">
              We never store your passwords and use OAuth for secure authentication with both platforms.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};