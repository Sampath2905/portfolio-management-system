import { useEffect, useState } from "react";
import api from "../../services/api";
import ThemeToggle from "./ThemeToggle";

function Navbar() {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        api.get("/profile/").then((res) => setProfile(res.data));
    }, []);

    return (
        <nav className="fixed top-0 w-full z-50 backdrop-blur bg-black/70 border-b border-white/10 flex justify-between items-center px-8 md:px-16 py-4">
            <div className="font-display font-extrabold text-lg tracking-tight text-white">
                SN<span className="text-accent">.</span>
            </div>
            <ul className="hidden md:flex gap-9 font-mono text-xs uppercase tracking-widest text-gray-400">
                <li><a href="#about" className="hover:text-accent transition">About</a></li>
                <li><a href="#projects" className="hover:text-accent transition">Projects</a></li>
                <li><a href="#experience" className="hover:text-accent transition">Experience</a></li>
                <li><a href="#contact" className="hover:text-accent transition">Contact</a></li>
            </ul>
            <div className="flex items-center gap-4 text-white">
                <ThemeToggle />
                {profile?.resume_url && (
                    <a href={`${import.meta.env.VITE_API_URL || "http://127.0.0.1:8000"}${profile.resume_url}`} target="_blank" rel="noreferrer" className="hidden md:block font-mono text-xs tracking-wide text-gray-400 hover:text-accent transition">
                        Resume ↓
                    </a>
                )}
                <a href="mailto:sampathnaikmudavath@gmail.com" className="font-mono text-xs tracking-wide border border-accent text-accent px-4 py-2 rounded hover:bg-accent hover:text-black transition">
                    hire me
                </a>
            </div>
        </nav>
    );
}

export default Navbar;