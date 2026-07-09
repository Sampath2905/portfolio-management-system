import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function ManageExperience() {
    const [items, setItems] = useState([]);
    const [formData, setFormData] = useState({
        company: "", company_logo_url: "", role: "", duration: "", address: "", city: "", country: "", description: ""
    });
    const [editId, setEditId] = useState(null);
    const [uploadingLogo, setUploadingLogo] = useState(false);

    const fetchItems = async () => {
        const res = await api.get("/experience/");
        setItems(res.data);
    };

    useEffect(() => { fetchItems(); }, []);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleLogoUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setUploadingLogo(true);
        const data = new FormData();
        data.append("file", file);
        try {
            const res = await api.post("/upload/", data, { headers: { "Content-Type": "multipart/form-data" } });
            setFormData({ ...formData, company_logo_url: res.data.file_url });
        } catch (err) {
            alert("Upload failed");
        }
        setUploadingLogo(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editId) {
            await api.put(`/experience/${editId}`, formData);
        } else {
            await api.post("/experience/", formData);
        }
        setFormData({ company: "", company_logo_url: "", role: "", duration: "", address: "", city: "", country: "", description: "" });
        setEditId(null);
        fetchItems();
    };

    const handleEdit = (item) => {
        setFormData({
            company: item.company,
            company_logo_url: item.company_logo_url || "",
            role: item.role,
            duration: item.duration || "",
            address: item.address || "",
            city: item.city || "",
            country: item.country || "",
            description: item.description || "",
        });
        setEditId(item.id);
    };

    const handleDelete = async (id) => {
        if (!confirm("Delete this experience record?")) return;
        await api.delete(`/experience/${id}`);
        fetchItems();
    };

    return (
        <div className="min-h-screen bg-white text-black p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Manage Experience</h1>
                <Link to="/admin/dashboard" className="underline">Back to Dashboard</Link>
            </div>

            <form onSubmit={handleSubmit} className="border border-black p-6 mb-8 space-y-4">
                <input name="company" value={formData.company} onChange={handleChange} placeholder="Company" required className="w-full border border-black p-2" />
                <input name="role" value={formData.role} onChange={handleChange} placeholder="Role" required className="w-full border border-black p-2" />
                <input name="duration" value={formData.duration} onChange={handleChange} placeholder="Duration (e.g. Jan 2025 - May 2025)" className="w-full border border-black p-2" />
                <input name="address" value={formData.address} onChange={handleChange} placeholder="Address (street / area)" className="w-full border border-black p-2" />
                <div className="grid grid-cols-2 gap-4">
                    <input name="city" value={formData.city} onChange={handleChange} placeholder="City" className="w-full border border-black p-2" />
                    <input name="country" value={formData.country} onChange={handleChange} placeholder="Country" className="w-full border border-black p-2" />
                </div>
                <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="w-full border border-black p-2" />

                <div>
                    <label className="block mb-2 font-medium">Company Logo</label>
                    <input type="file" accept="image/*" onChange={handleLogoUpload} className="w-full border border-black p-2" />
                    {uploadingLogo && <p className="text-sm mt-1">Uploading...</p>}
                    {formData.company_logo_url && (
                        <img src={`${import.meta.env.VITE_API_URL || "http://127.0.0.1:8000"}${formData.company_logo_url}`} alt="logo preview" className="mt-2 h-12 object-contain" />
                    )}
                </div>

                <button type="submit" className="bg-black text-white px-6 py-2 hover:bg-gray-800">
                    {editId ? "Update Experience" : "Add Experience"}
                </button>
                {editId && (
                    <button type="button" onClick={() => { setEditId(null); setFormData({ company: "", company_logo_url: "", role: "", duration: "", address: "", city: "", country: "", description: "" }); }} className="ml-4 border border-black px-6 py-2">
                        Cancel Edit
                    </button>
                )}
            </form>

            <div className="space-y-4">
                {items.map((exp) => (
                    <div key={exp.id} className="border border-black p-4 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            {exp.company_logo_url && <img src={`${import.meta.env.VITE_API_URL || "http://127.0.0.1:8000"}${exp.company_logo_url}`} alt="" className="h-8 w-8 object-contain" />}
                            <div>
                                <h3 className="font-bold">{exp.role} — {exp.company}</h3>
                                <p className="text-sm">{exp.duration} {exp.city && `· ${exp.city}, ${exp.country}`}</p>
                            </div>
                        </div>
                        <div className="space-x-2">
                            <button onClick={() => handleEdit(exp)} className="border border-black px-3 py-1 hover:bg-black hover:text-white">Edit</button>
                            <button onClick={() => handleDelete(exp.id)} className="border border-black px-3 py-1 hover:bg-black hover:text-white">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ManageExperience;