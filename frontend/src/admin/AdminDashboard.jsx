import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AdminDashboard() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/admin/login");
    };

    const sections = [
        { name: "Profile", path: "/admin/profile" },
        { name: "Academics", path: "/admin/academics" },
        { name: "Certifications", path: "/admin/certifications" },
        { name: "Projects", path: "/admin/projects" },
        { name: "Experience", path: "/admin/experience" },
        { name: "Skills", path: "/admin/skills" },
    ];

    return (
        <div className="min-h-screen bg-white text-black p-8">
            <div className="flex justify-between items-center mb-10">
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                <button onClick={handleLogout} className="border border-black px-4 py-2 hover:bg-black hover:text-white transition">
                    Logout
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {sections.map((s) => (
                    <Link
                        key={s.path}
                        to={s.path}
                        className="border border-black p-8 text-center font-semibold hover:bg-black hover:text-white transition"
                    >
                        {s.name}
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default AdminDashboard;