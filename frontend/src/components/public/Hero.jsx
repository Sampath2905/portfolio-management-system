import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AnimatedBackground from "./AnimatedBackground";
import api from "../../services/api";

function Hero() {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        api.get("/profile/").then((res) => setProfile(res.data));
    }, []);

    return (
        <section className="relative min-h-screen flex flex-col justify-center px-8 md:px-16 pt-32 pb-24 bg-black text-white overflow-hidden">
            <AnimatedBackground />

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="relative z-10 w-32 h-32 md:w-40 md:h-40 rounded-full border-2 border-accent overflow-hidden mb-8"
            >
                {profile?.photo_url && (
                    <img
                        src={profile.photo_url}
                        alt="Sampath"
                        className="w-full h-full object-cover"
                    />
                )}
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="relative z-10 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent mb-7 w-fit">
                <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse"></span>
                Open to opportunities
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="relative z-10 font-display font-extrabold text-5xl md:text-7xl leading-none tracking-tight mb-7 max-w-3xl">
                Sampath<br />
                <span className="text-gray-500">Data Science, </span>
                <span className="text-white">ML Engineer</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="relative z-10 text-gray-400 max-w-xl text-lg leading-relaxed mb-11">
                I build intelligent systems and full-stack applications — from deepfake detection models to complete web platforms. Currently pursuing an M.Sc. in Data Science, focused on ML/AI and quantitative research.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="relative z-10 flex gap-5 items-center mb-16">
                <a href="#projects" className="bg-accent text-black px-8 py-3.5 rounded font-medium hover:opacity-85 transition">View My Work</a>
                <a href="#contact" className="font-mono text-sm text-gray-300 flex items-center gap-2 hover:text-accent transition">→ Let's Talk</a>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.8 }} className="relative z-10 flex items-center gap-3 font-mono text-xs text-gray-500 uppercase tracking-widest">
                <span className="w-10 h-px bg-gray-600"></span>
                Scroll to explore
            </motion.div>
        </section>
    );
}

export default Hero;