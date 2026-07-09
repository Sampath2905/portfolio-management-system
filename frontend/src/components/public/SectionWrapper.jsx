import { motion } from "framer-motion";

function SectionWrapper({ children, id }) {
    return (
        <motion.section
            id={id}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="min-h-screen flex flex-col justify-center px-8 md:px-20 py-16 border-b border-black"
        >
            {children}
        </motion.section>
    );
}

export default SectionWrapper;