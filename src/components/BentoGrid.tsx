import BentoLargeGrid from "./BentoLargeGrid";
import BentoIndividualPost from "./BentoIndividualPost";
import BentoDetection from "./BentoDetection";
import BentoUpload from "./BentoUpload";
import BentoDownload from "./BentoDownload";
import { motion } from "framer-motion";

export default function BentoGrid() {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, staggerChildren: 0.15, delayChildren: 0.3 }}
    >
      <motion.div
        className="lg:col-span-2 lg:row-span-2 h-full"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <BentoLargeGrid />
      </motion.div>
      <motion.div
        className="h-full"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <BentoIndividualPost />
      </motion.div>
      <motion.div
        className="h-full"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <BentoUpload />
      </motion.div>
      <motion.div
        className="h-full"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        <BentoDetection />
      </motion.div>
      <motion.div
        className="h-full"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <BentoDownload />
      </motion.div>
    </motion.div>
  );
}
