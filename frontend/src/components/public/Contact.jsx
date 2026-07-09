function Contact() {
    return (
        <>
            <section id="contact" className="bg-black text-white text-center px-8 py-32">
                <div className="font-mono text-xs text-accent uppercase tracking-widest mb-4">// Get in touch</div>
                <h2 className="font-display font-extrabold text-4xl md:text-6xl tracking-tight mb-6 leading-tight">
                    Let's build something<br />
                    <span style={{ WebkitTextStroke: "1px #6fffb0", color: "transparent" }}>great together.</span>
                </h2>
                <p className="text-gray-400 max-w-md mx-auto mb-11 leading-relaxed">
                    Open to opportunities in Data Science, ML/AI, and quantitative research. Let's talk — I reply within 24 hours.
                </p>
                <div className="flex justify-center gap-4 flex-wrap">
                    <a href="mailto:sampathnaikmudavath@gmail.com" className="flex items-center gap-2 font-mono text-sm bg-accent text-black px-6 py-3 rounded hover:opacity-85 transition">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                        Email Me
                    </a>
                    <a href="https://github.com/Sampath2905" target="_blank" rel="noreferrer" className="flex items-center gap-2 font-mono text-sm border border-white/20 px-6 py-3 rounded hover:border-accent hover:text-accent transition">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55v-1.94c-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.25 3.34.96.1-.74.4-1.25.72-1.54-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.58.23 2.75.11 3.04.74.81 1.18 1.84 1.18 3.1 0 4.43-2.7 5.4-5.28 5.68.42.36.78 1.08.78 2.18v3.23c0 .3.21.66.79.55A10.52 10.52 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z" /></svg>
                        GitHub
                    </a>
                    <a href="https://www.linkedin.com/in/mudavath-sampathnaik-1884b62a8" target="_blank" rel="noreferrer" className="flex items-center gap-2 font-mono text-sm border border-white/20 px-6 py-3 rounded hover:border-accent hover:text-accent transition">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47v6.27zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45z" /></svg>
                        LinkedIn
                    </a>
                </div>
            </section>

            <footer className="bg-black text-white border-t border-white/10 px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-2">
                <p className="font-mono text-xs text-gray-500">© 2026 Sampath — Built with care</p>
                <p className="font-mono text-xs text-gray-500">Andhra Pradesh, India</p>
            </footer>
        </>
    );
}

export default Contact;