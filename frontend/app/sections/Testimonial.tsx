export const Testimonial = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our Users Say
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Hear from our satisfied users about their experience with Syncwave.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <p className="text-gray-300 mb-4">
              "Syncwave made transferring my playlists a breeze! I couldn't believe how easy it was."
            </p>
            <h3 className="text-lg font-bold text-white">John Doe</h3>
            <p className="text-gray-500">Music Enthusiast</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <p className="text-gray-300 mb-4">
              "I love how fast and efficient the process is. Highly recommend!"
            </p>
            <h3 className="text-lg font-bold text-white">Jane Smith</h3>
            <p className="text-gray-500">Content Creator</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <p className="text-gray-300 mb-4">
              "Finally, a solution that works! Syncwave is a game changer."
            </p>
            <h3 className="text-lg font-bold text-white">Alice Johnson</h3>
            <p className="text-gray-500">DJ</p>
          </div>
        </div>
      </div>
    </section>
  );
};