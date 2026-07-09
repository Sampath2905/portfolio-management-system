import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import InstitutionAutocomplete from "../components/InstitutionAutocomplete";

function ManageAcademics() {
    const [items, setItems] = useState([]);
    const [formData, setFormData] = useState({ institution: "", institution_logo_url: "", degree: "", year: "", grade: "" });
    const [editId, setEditId] = useState(null);

    const fetchItems = async () => {
        const res = await api.get("/academics/");
        setItems(res.data);
    };

    useEffect(() => { fetchItems(); }, []);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleInstitutionSelect = ({ institution, institution_logo_url }) => {
        setFormData((prev) => ({ ...prev, institution, institution_logo_url }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editId) {
            await api.put(`/academics/${editId}`, formData);
        } else {
            await api.post("/academics/", formData);
        }
        setFormData({ institution: "", institution_logo_url: "", degree: "", year: "", grade: "" });
        setEditId(null);
        fetchItems();
    };

    const handleEdit = (item) => {
        setFormData({
            institution: item.institution,
            institution_logo_url: item.institution_logo_url || "",
            degree: item.degree,
            year: item.year,
            grade: item.grade || "",
        });
        setEditId(item.id);
    };

    const handleDelete = async (id) => {
        if (!confirm("Delete this academic record?")) return;
        await api.delete(`/academics/${id}`);
        fetchItems();
    };

    return (
        <div className="min-h-screen bg-white text-black p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Manage Academics</h1>
                <Link to="/admin/dashboard" className="underline">Back to Dashboard</Link>
            </div>

            <form onSubmit={handleSubmit} className="border border-black p-6 mb-8 space-y-4">
                <InstitutionAutocomplete value={formData.institution} onSelect={handleInstitutionSelect} />
                {formData.institution_logo_url && (
                    <img src={formData.institution_logo_url} alt="logo" className="h-10 object-contain" onError={(e) => (e.target.style.display = "none")} />
                )}
                <input name="degree" value={formData.degree} onChange={handleChange} placeholder="Degree (e.g. B.Tech CSE)" required className="w-full border border-black p-2" />
                <input name="year" value={formData.year} onChange={handleChange} placeholder="Year (e.g. 2021-2025)" required className="w-full border border-black p-2" />
                <input name="grade" value={formData.grade} onChange={handleChange} placeholder="Grade / CGPA" className="w-full border border-black p-2" />

                <button type="submit" className="bg-black text-white px-6 py-2 hover:bg-gray-800">
                    {editId ? "Update Record" : "Add Record"}
                </button>
                {editId && (
                    <button type="button" onClick={() => { setEditId(null); setFormData({ institution: "", institution_logo_url: "", degree: "", year: "", grade: "" }); }} className="ml-4 border border-black px-6 py-2">
                        Cancel Edit
                    </button>
                )}
            </form>

            <div className="space-y-4">
                {items.map((a) => (
                    <div key={a.id} className="border border-black p-4 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            {a.institution_logo_url && <img src={a.institution_logo_url} alt="" className="h-8 w-8 object-contain" onError={(e) => (e.target.style.display = "none")} />}
                            <div>
                                <h3 className="font-bold">{a.institution}</h3>
                                <p className="text-sm">{a.degree} — {a.year} {a.grade && `(${a.grade})`}</p>
                            </div>
                        </div>
                        <div className="space-x-2">
                            <button onClick={() => handleEdit(a)} className="border border-black px-3 py-1 hover:bg-black hover:text-white">Edit</button>
                            <button onClick={() => handleDelete(a.id)} className="border border-black px-3 py-1 hover:bg-black hover:text-white">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ManageAcademics;