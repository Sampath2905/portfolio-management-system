import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../../services/api";

function Academics() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        api.get("/academics/").then((res) => setItems(res.data));
    }, []);

    return (
        <section
            id="academics"
            className="relative px-8 md:px-16 py-24 border-b border-black overflow-hidden animate-gradient text-white"
            style={{
                backgroundImage: "linear-gradient(120deg, #0a0a12, #12121f, #0d1a17, #1a0f1a)",
            }}
        >
            <div className="relative">
                <div className="font-mono text-xs text-accent uppercase tracking-widest mb-4">// Education</div>
                <h2 className="font-display font-bold text-3xl md:text-5xl tracking-tight mb-14">Academics</h2>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col"
                >
                    {items.map((item) => (
                        <div key={item.id} className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-4 md:gap-10 py-9 border-b border-white/10">
                            <div className="font-mono text-xs text-gray-400 md:text-right pt-1">{item.year}</div>
                            <div className="flex items-center gap-4">
                                {item.institution_logo_url && (
                                    <img
                                        src={item.institution_logo_url}
                                        alt=""
                                        className="w-10 h-10 object-contain rounded bg-white p-1 border border-white/10 shadow-sm"
                                        onError={(e) => (e.target.style.display = "none")}
                                    />
                                )}
                                <div>
                                    <h3 className="font-display font-bold text-xl mb-1 text-white">{item.institution}</h3>
                                    <div className="font-mono text-sm text-gray-400">{item.degree} {item.grade && `— ${item.grade}`}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

export default Academics;