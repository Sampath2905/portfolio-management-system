import { useState, useEffect } from "react";

function ScrollProgress() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            setProgress((scrollTop / docHeight) * 100);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="fixed top-0 left-0 h-0.5 bg-black z-[60] transition-all duration-150" style={{ width: `${progress}%` }}></div>
    );
}

export default ScrollProgress;