import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import UnifiedFooter from '../components/UnifiedFooter';

export default function NotFound() {
  return (
    <div className="bg-[#FAF9F6] min-h-screen flex flex-col">
      <Helmet>
        <title>404 Page Not Found | Karrcholai Construction</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-grow flex flex-col items-center justify-center text-center px-6 pt-32 pb-20"
      >
        <h1 className="text-8xl md:text-[12rem] font-black mb-4 tracking-tighter text-dark/10">
          404
        </h1>
        <h2 className="text-2xl md:text-4xl font-black mb-4 text-dark uppercase tracking-widest">
          Lost in Space
        </h2>
        <p className="text-dark/40 mb-12 max-w-md font-light leading-relaxed">
          The architectural marvel you are seeking has not been built yet or has moved to a new location.
        </p>
        <Link
          to="/"
          className="px-12 py-5 bg-[#B85C38] text-white rounded-full text-[10px] font-black tracking-[0.4em] uppercase hover:bg-dark transition-all duration-500 shadow-xl"
        >
          Return Home
        </Link>
      </motion.div>
      <UnifiedFooter />
    </div>
  );
}
