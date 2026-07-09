import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../../services/api";

const accents = [
    { border: "border-l-accent", gradient: "from-accent/10" },
    { border: "border-l-blue-400", gradient: "from-blue-400/10" },
    { border: "border-l-pink-400", gradient: "from-pink-400/10" },
];

function ProjectImageSlider({ images }) {
    const [index, setIndex] = useState(0);

    if (!images || images.length === 0) return null;

    const goPrev = (e) => {
        e.stopPropagation();
        setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const goNext = (e) => {
        e.stopPropagation();
        setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    return (
        <div className="relative w-full h-full group/slider">
            <img
                src={`http://127.0.0.1:8000${images[index]}`}
                alt=""
                className="w-full h-full object-cover transition-all duration-300"
            />

            {images.length > 1 && (
                <>
                    <button
                        onClick={goPrev}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover/slider:opacity-100 transition-opacity duration-300 hover:bg-black/80"
                    >
                        ‹
                    </button>
                    <button
                        onClick={goNext}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover/slider:opacity-100 transition-opacity duration-300 hover:bg-black/80"
                    >
                        ›
                    </button>

                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                        {images.map((_, i) => (
                            <span
                                key={i}
                                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === index ? "bg-white w-4" : "bg-white/50"}`}
                            ></span>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

function Projects() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        api.get("/projects/").then((res) => setItems(res.data));
    }, []);

    return (
        <section
            id="projects"
            className="relative px-8 md:px-16 py-24 border-b border-black overflow-hidden animate-gradient text-white"
            style={{
                backgroundImage: "linear-gradient(120deg, #1a1a2e, #16213e, #1e2a3a, #24182e)",
            }}
        >
            <div className="relative">
                <div className="font-mono text-xs text-accent uppercase tracking-widest mb-4">// What I've built</div>
                <h2 className="font-display font-bold text-3xl md:text-5xl tracking-tight mb-14">Selected Projects</h2>

                <div className="flex flex-col gap-10">
                    {items.map((project, i) => {
                        const accent = accents[i % 3];
                        return (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.15 }}
                                transition={{ duration: 0.6 }}
                                className={`group relative grid grid-cols-1 md:grid-cols-2 gap-0 bg-white/5 backdrop-blur-sm border border-white/10 border-l-4 ${accent.border} shadow-sm hover:shadow-xl hover:bg-white/10 transition-all duration-300 overflow-hidden ${i % 2 === 1 ? "md:[direction:rtl]" : ""}`}
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br ${accent.gradient} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}></div>

                                {project.image_urls && project.image_urls.length > 0 && (
                                    <div className="md:[direction:ltr] h-64 md:h-full overflow-hidden">
                                        <ProjectImageSlider images={project.image_urls} />
                                    </div>
                                )}
                                <div className="md:[direction:ltr] relative p-8 md:p-10 flex flex-col justify-center">
                                    <div className="font-display font-bold text-sm text-gray-500 mb-3">{String(i + 1).padStart(2, "0")}</div>
                                    <h3 className="font-display font-bold text-2xl mb-3 text-white">{project.title}</h3>
                                    <p className="text-sm text-gray-300 leading-relaxed mb-6">{project.description}</p>
                                    {project.tech_stack && (
                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {project.tech_stack.split(",").map((tech, idx) => (
                                                <span key={idx} className="font-mono text-xs bg-white/10 border border-white/10 px-2.5 py-1 rounded text-gray-300">
                                                    {tech.trim()}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                    <div className="flex gap-4">
                                        {project.live_url && <a href={project.live_url} target="_blank" rel="noreferrer" className="font-mono text-xs text-gray-400 hover:text-accent transition">↗ Live Demo</a>}
                                        {project.github_url && <a href={project.github_url} target="_blank" rel="noreferrer" className="font-mono text-xs text-gray-400 hover:text-accent transition">⌥ GitHub</a>}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export default Projects;