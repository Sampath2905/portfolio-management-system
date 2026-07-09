import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function ManageSkills() {
    const [items, setItems] = useState([]);
    const [formData, setFormData] = useState({ name: "", category: "", proficiency: "" });
    const [editId, setEditId] = useState(null);

    const fetchItems = async () => {
        const res = await api.get("/skills/");
        setItems(res.data);
    };

    useEffect(() => { fetchItems(); }, []);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = { ...formData, proficiency: formData.proficiency ? parseInt(formData.proficiency) : null };
        if (editId) {
            await api.put(`/skills/${editId}`, payload);
        } else {
            await api.post("/skills/", payload);
        }
        setFormData({ name: "", category: "", proficiency: "" });
        setEditId(null);
        fetchItems();
    };

    const handleEdit = (item) => {
        setFormData({ name: item.name, category: item.category || "", proficiency: item.proficiency || "" });
        setEditId(item.id);
    };

    const handleDelete = async (id) => {
        if (!confirm("Delete this skill?")) return;
        await api.delete(`/skills/${id}`);
        fetchItems();
    };

    return (
        <div className="min-h-screen bg-white text-black p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Manage Skills</h1>
                <Link to="/admin/dashboard" className="underline">Back to Dashboard</Link>
            </div>

            <form onSubmit={handleSubmit} className="border border-black p-6 mb-8 space-y-4">
                <input name="name" value={formData.name} onChange={handleChange} placeholder="Skill Name (e.g. Python)" required className="w-full border border-black p-2" />
                <input name="category" value={formData.category} onChange={handleChange} placeholder="Category (e.g. Programming, ML)" className="w-full border border-black p-2" />
                <input name="proficiency" type="number" min="1" max="100" value={formData.proficiency} onChange={handleChange} placeholder="Proficiency (1-100)" className="w-full border border-black p-2" />

                <button type="submit" className="bg-black text-white px-6 py-2 hover:bg-gray-800">
                    {editId ? "Update Skill" : "Add Skill"}
                </button>
                {editId && (
                    <button type="button" onClick={() => { setEditId(null); setFormData({ name: "", category: "", proficiency: "" }); }} className="ml-4 border border-black px-6 py-2">
                        Cancel Edit
                    </button>
                )}
            </form>

            <div className="space-y-4">
                {items.map((s) => (
                    <div key={s.id} className="border border-black p-4 flex justify-between items-center">
                        <div>
                            <h3 className="font-bold">{s.name}</h3>
                            <p className="text-sm">{s.category} {s.proficiency && `— ${s.proficiency}%`}</p>
                        </div>
                        <div className="space-x-2">
                            <button onClick={() => handleEdit(s)} className="border border-black px-3 py-1 hover:bg-black hover:text-white">Edit</button>
                            <button onClick={() => handleDelete(s.id)} className="border border-black px-3 py-1 hover:bg-black hover:text-white">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ManageSkills;