import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../../services/api";

const cardStyles = [
    { border: "border-t-accent", glow: "hover:shadow-accent/20", tag: "bg-accent/10 text-emerald-700" },
    { border: "border-t-blue-400", glow: "hover:shadow-blue-400/20", tag: "bg-blue-50 text-blue-700" },
    { border: "border-t-pink-400", glow: "hover:shadow-pink-400/20", tag: "bg-pink-50 text-pink-700" },
    { border: "border-t-amber-400", glow: "hover:shadow-amber-400/20", tag: "bg-amber-50 text-amber-700" },
    { border: "border-t-purple-400", glow: "hover:shadow-purple-400/20", tag: "bg-purple-50 text-purple-700" },
];

function Certifications() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        api.get("/certifications/").then((res) => setItems(res.data));
    }, []);

    return (
        <section
            id="certifications"
            className="relative px-8 md:px-16 py-24 border-b border-black overflow-hidden animate-gradient"
            style={{
                backgroundImage: "linear-gradient(120deg, #ffffff, #f7f7fa, #fafafa, #f5f5f7)",
            }}
        >
            <div className="relative">
                <div className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-4">// Credentials</div>
                <h2 className="font-display font-bold text-3xl md:text-5xl tracking-tight mb-14">Certifications</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {items.map((item, i) => {
                        const style = cardStyles[i % cardStyles.length];
                        return (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                whileHover={{ y: -6 }}
                                className={`bg-white border border-gray-200 border-t-4 ${style.border} shadow-sm ${style.glow} hover:shadow-xl transition-shadow duration-300 p-6 flex items-start gap-4`}
                            >
                                {item.issuer_logo_url ? (
                                    <img
                                        src={`${import.meta.env.VITE_API_URL || "http://127.0.0.1:8000"}${item.issuer_logo_url}`}
                                        alt=""
                                        className="w-10 h-10 object-contain flex-shrink-0"
                                    />
                                ) : (
                                    <div className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center font-display font-bold text-sm ${style.tag}`}>
                                        {item.issuer ? item.issuer.charAt(0).toUpperCase() : "?"}
                                    </div>
                                )}
                                <div>
                                    <h3 className="font-display font-bold text-lg mb-1">{item.title}</h3>
                                    <span className={`inline-block font-mono text-[10px] uppercase tracking-wide px-2 py-0.5 rounded mb-2 ${style.tag}`}>
                                        {item.issuer} {item.date}
                                    </span>
                                    <br />
                                    {item.credential_url && (
                                        <a href={item.credential_url} target="_blank" rel="noreferrer" className="font-mono text-xs underline text-gray-600 hover:text-black transition">
                                            View Credential
                                        </a>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export default Certifications;