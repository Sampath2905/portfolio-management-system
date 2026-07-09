function AnimatedBackground() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* subtle grid */}
            <div
                className="absolute inset-0 opacity-[0.05]"
                style={{
                    backgroundImage:
                        "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
                    backgroundSize: "48px 48px",
                }}
            ></div>

            {/* glow orbs */}
            <div className="absolute -top-40 -right-20 w-[500px] h-[500px] bg-accent opacity-[0.08] rounded-full blur-[120px] animate-float-slow"></div>
            <div className="absolute top-1/3 -left-32 w-[400px] h-[400px] bg-blue-400 opacity-[0.07] rounded-full blur-[120px] animate-float-slower"></div>
            <div className="absolute bottom-0 right-1/4 w-[350px] h-[350px] bg-pink-400 opacity-[0.05] rounded-full blur-[120px] animate-float-slow"></div>

            {/* noise texture */}
            <div
                className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
                style={{
                    backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                }}
            ></div>
        </div>
    );
}

export default AnimatedBackground;