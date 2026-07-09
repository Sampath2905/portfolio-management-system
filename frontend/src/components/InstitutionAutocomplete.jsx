import { useState, useEffect, useRef } from "react";

function InstitutionAutocomplete({ value, onSelect }) {
    const [query, setQuery] = useState(value || "");
    const [suggestions, setSuggestions] = useState([]);
    const [showList, setShowList] = useState(false);
    const debounceRef = useRef(null);

    useEffect(() => setQuery(value || ""), [value]);

    const handleInput = (e) => {
        const val = e.target.value;
        setQuery(val);
        onSelect({ institution: val, institution_logo_url: "" });

        clearTimeout(debounceRef.current);
        if (val.length < 3) {
            setSuggestions([]);
            return;
        }
        debounceRef.current = setTimeout(async () => {
            try {
                const res = await fetch(`http://universities.hipolabs.com/search?name=${encodeURIComponent(val)}`);
                const data = await res.json();
                setSuggestions(data.slice(0, 6));
                setShowList(true);
            } catch (err) {
                setSuggestions([]);
            }
        }, 400);
    };

    const handleSelect = (uni) => {
        const domain = uni.domains && uni.domains[0];
        const logoUrl = domain ? `https://logo.clearbit.com/${domain}` : "";
        setQuery(uni.name);
        onSelect({ institution: uni.name, institution_logo_url: logoUrl });
        setShowList(false);
        setSuggestions([]);
    };

    return (
        <div className="relative">
            <input
                value={query}
                onChange={handleInput}
                onFocus={() => suggestions.length && setShowList(true)}
                placeholder="Institution (start typing...)"
                required
                className="w-full border border-black p-2"
            />
            {showList && suggestions.length > 0 && (
                <div className="absolute z-10 bg-white border border-black w-full max-h-56 overflow-y-auto">
                    {suggestions.map((uni, i) => (
                        <div
                            key={i}
                            onClick={() => handleSelect(uni)}
                            className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                        >
                            {uni.domains && uni.domains[0] && (
                                <img
                                    src={`https://logo.clearbit.com/${uni.domains[0]}`}
                                    alt=""
                                    className="w-5 h-5 object-contain"
                                    onError={(e) => (e.target.style.display = "none")}
                                />
                            )}
                            <span>{uni.name}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default InstitutionAutocomplete;