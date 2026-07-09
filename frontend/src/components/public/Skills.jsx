import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../../services/api";

const categoryColor = (category) => {
    if (!category) return "bg-accent";
    const cat = category.toLowerCase();
    if (cat.includes("ml") || cat.includes("ai") || cat.includes("data")) return "bg-blue-500";
    if (cat.includes("backend") || cat.includes("api") || cat.includes("database")) return "bg-pink-500";
    return "bg-accent";
};

function Skills() {
    const [items, setItems] = useState([]);
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        api.get("/skills/").then((res) => setItems(res.data));
        api.get("/profile/").then((res) => setProfile(res.data));
    }, []);

    return (
        <section id="about" className="relative bg-white px-8 md:px-16 py-24 border-b border-black overflow-hidden">
            {/* subtle dotted background texture */}
            <div
                className="absolute inset-0 opacity-[0.35] pointer-events-none"
                style={{
                    backgroundImage: "radial-gradient(circle, #00000012 1px, transparent 1px)",
                    backgroundSize: "22px 22px",
                }}
            ></div>

            <div className="relative">
                <div className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-4">// Who I am</div>
                <h2 className="font-display font-bold text-3xl md:text-5xl tracking-tight mb-14 max-w-2xl">
                    Driven by curiosity, grounded in code.
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.6 }}
                        className="space-y-5 text-gray-600 text-base leading-relaxed whitespace-pre-line"
                    >
                        {profile?.about_text
                            ? profile.about_text
                            : "Add your About text through the admin panel's Profile section."}
                    </motion.div>

                    <div className="relative">
                        {items.map((skill, i) => (
                            <motion.div
                                key={skill.id}
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.5, delay: i * 0.08 }}
                                className="flex justify-between items-center py-3.5 border-b border-gray-200 group"
                            >
                                <span className="font-mono text-sm group-hover:translate-x-1 transition-transform duration-300">
                                    {skill.name}
                                </span>
                                {skill.proficiency && (
                                    <div className="flex items-center gap-3">
                                        <span className="font-mono text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            {skill.proficiency}%
                                        </span>
                                        <div className="w-36 h-1.5 bg-gray-100 rounded overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${skill.proficiency}%` }}
                                                viewport={{ once: true, amount: 0.3 }}
                                                transition={{ duration: 1, delay: i * 0.08 + 0.2, ease: "easeOut" }}
                                                className={`h-full rounded ${categoryColor(skill.category)}`}
                                            ></motion.div>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Skills;