import { motion } from "framer-motion";

export default function ColumnWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      transition={{ bounce: 0 }}
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="column-wrapper"
    >
      {children}
    </motion.div>
  );
}
