export const Footer = () => {
  return (
    <footer className="py-6 bg-gray-800 text-gray-400">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Syncwave. All rights reserved.</p>
        <div className="mt-4">
          <a href="#privacy" className="hover:text-green-400">Privacy Policy</a>
          <span className="mx-2">|</span>
          <a href="#terms" className="hover:text-green-400">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};
