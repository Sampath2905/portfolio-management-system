function StatsBar() {
    const stats = [
        { num: "1", label: "Year of ML/AI Focus", color: "text-accent" },
        { num: "5+", label: "Projects Built", color: "text-blue-500" },
        { num: "2", label: "Internships Completed", color: "text-pink-500" },
        { num: "2028", label: "Target QR Career Start", color: "text-accent" },
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 bg-black border-b border-white/10">
            {stats.map((s, i) => (
                <div key={i} className="p-8 border-r border-white/10 last:border-r-0">
                    <div className={`font-display font-extrabold text-3xl tracking-tight ${s.color}`}>{s.num}</div>
                    <div className="font-mono text-xs text-gray-500 uppercase tracking-wide mt-1">{s.label}</div>
                </div>
            ))}
        </div>
    );
}

export default StatsBar;