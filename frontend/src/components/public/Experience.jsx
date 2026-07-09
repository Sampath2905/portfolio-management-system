import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../../services/api";

const dotColors = ["bg-accent", "bg-blue-500", "bg-pink-500"];

function Experience() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        api.get("/experience/").then((res) => setItems(res.data));
    }, []);

    return (
        <section id="experience" className="bg-amber-50 px-8 md:px-16 py-24 border-b border-black">
            <div className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-4">// Where I've been</div>
            <h2 className="font-display font-bold text-3xl md:text-5xl tracking-tight mb-14">Work Experience</h2>

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col"
            >
                {items.map((exp, i) => (
                    <div key={exp.id} className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-4 md:gap-10 py-9 border-b border-amber-200">
                        <div className="font-mono text-xs text-gray-500 md:text-right pt-1">{exp.duration}</div>
                        <div className="flex items-start gap-4">
                            {exp.company_logo_url ? (
                                <img
                                    src={`http://127.0.0.1:8000${exp.company_logo_url}`}
                                    alt=""
                                    className="w-10 h-10 object-contain flex-shrink-0 bg-white p-1 border border-amber-200 rounded"
                                />
                            ) : (
                                <span className={`w-2.5 h-2.5 rounded-full mt-2 flex-shrink-0 ${dotColors[i % 3]}`}></span>
                            )}
                            <div>
                                <h3 className="font-display font-bold text-xl mb-1">{exp.role}</h3>
                                <div className="font-mono text-sm text-gray-500 mb-1">{exp.company}</div>
                                {(exp.city || exp.country) && (
                                    <div className="font-mono text-xs text-gray-400 mb-3">
                                        {[exp.address, exp.city, exp.country].filter(Boolean).join(", ")}
                                    </div>
                                )}
                                <p className="text-sm text-gray-600 leading-relaxed">{exp.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </motion.div>
        </section>
    );
}

export default Experience;