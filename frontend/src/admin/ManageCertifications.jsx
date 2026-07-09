import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function ManageCertifications() {
    const [items, setItems] = useState([]);
    const [formData, setFormData] = useState({
        title: "", issuer: "", issuer_logo_url: "", date: "", credential_url: "", image_url: ""
    });
    const [editId, setEditId] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [uploadingLogo, setUploadingLogo] = useState(false);

    const fetchItems = async () => {
        const res = await api.get("/certifications/");
        setItems(res.data);
    };

    useEffect(() => { fetchItems(); }, []);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setUploading(true);
        const data = new FormData();
        data.append("file", file);
        try {
            const res = await api.post("/upload/", data, { headers: { "Content-Type": "multipart/form-data" } });
            setFormData({ ...formData, image_url: res.data.file_url });
        } catch (err) {
            alert("Upload failed");
        }
        setUploading(false);
    };

    const handleLogoUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setUploadingLogo(true);
        const data = new FormData();
        data.append("file", file);
        try {
            const res = await api.post("/upload/", data, { headers: { "Content-Type": "multipart/form-data" } });
            setFormData({ ...formData, issuer_logo_url: res.data.file_url });
        } catch (err) {
            alert("Upload failed");
        }
        setUploadingLogo(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editId) {
            await api.put(`/certifications/${editId}`, formData);
        } else {
            await api.post("/certifications/", formData);
        }
        setFormData({ title: "", issuer: "", issuer_logo_url: "", date: "", credential_url: "", image_url: "" });
        setEditId(null);
        fetchItems();
    };

    const handleEdit = (item) => {
        setFormData({
            title: item.title,
            issuer: item.issuer,
            issuer_logo_url: item.issuer_logo_url || "",
            date: item.date || "",
            credential_url: item.credential_url || "",
            image_url: item.image_url || "",
        });
        setEditId(item.id);
    };

    const handleDelete = async (id) => {
        if (!confirm("Delete this certification?")) return;
        await api.delete(`/certifications/${id}`);
        fetchItems();
    };

    return (
        <div className="min-h-screen bg-white text-black p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Manage Certifications</h1>
                <Link to="/admin/dashboard" className="underline">Back to Dashboard</Link>
            </div>

            <form onSubmit={handleSubmit} className="border border-black p-6 mb-8 space-y-4">
                <input name="title" value={formData.title} onChange={handleChange} placeholder="Certification Title" required className="w-full border border-black p-2" />
                <input name="issuer" value={formData.issuer} onChange={handleChange} placeholder="Issuer (e.g. Coursera, AWS)" required className="w-full border border-black p-2" />
                <input name="date" value={formData.date} onChange={handleChange} placeholder="Date (e.g. 2026-05)" className="w-full border border-black p-2" />
                <input name="credential_url" value={formData.credential_url} onChange={handleChange} placeholder="Credential URL" className="w-full border border-black p-2" />

                <div>
                    <label className="block mb-2 font-medium">Issuer Logo</label>
                    <input type="file" accept="image/*" onChange={handleLogoUpload} className="w-full border border-black p-2" />
                    {uploadingLogo && <p className="text-sm mt-1">Uploading...</p>}
                    {formData.issuer_logo_url && (
                        <img src={`http://127.0.0.1:8000${formData.issuer_logo_url}`} alt="logo preview" className="mt-2 h-12 object-contain" />
                    )}
                </div>

                <div>
                    <label className="block mb-2 font-medium">Certificate Image / PDF</label>
                    <input type="file" accept=".jpg,.jpeg,.png,.webp,.pdf,.gif" onChange={handleImageUpload} className="w-full border border-black p-2" />
                    {uploading && <p className="text-sm mt-1">Uploading...</p>}
                    {formData.image_url && (
                        formData.image_url.endsWith(".pdf") ? (
                            <a href={`http://127.0.0.1:8000${formData.image_url}`} target="_blank" rel="noreferrer" className="mt-2 inline-block underline text-sm">View uploaded PDF</a>
                        ) : (
                            <img src={`http://127.0.0.1:8000${formData.image_url}`} alt="preview" className="mt-2 h-24 object-cover" />
                        )
                    )}
                </div>

                <button type="submit" className="bg-black text-white px-6 py-2 hover:bg-gray-800">
                    {editId ? "Update Certification" : "Add Certification"}
                </button>
                {editId && (
                    <button type="button" onClick={() => { setEditId(null); setFormData({ title: "", issuer: "", issuer_logo_url: "", date: "", credential_url: "", image_url: "" }); }} className="ml-4 border border-black px-6 py-2">
                        Cancel Edit
                    </button>
                )}
            </form>

            <div className="space-y-4">
                {items.map((c) => (
                    <div key={c.id} className="border border-black p-4 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            {c.issuer_logo_url && <img src={`http://127.0.0.1:8000${c.issuer_logo_url}`} alt="" className="h-8 w-8 object-contain" />}
                            <div>
                                <h3 className="font-bold">{c.title}</h3>
                                <p className="text-sm">{c.issuer} — {c.date}</p>
                            </div>
                        </div>
                        <div className="space-x-2">
                            <button onClick={() => handleEdit(c)} className="border border-black px-3 py-1 hover:bg-black hover:text-white">Edit</button>
                            <button onClick={() => handleDelete(c.id)} className="border border-black px-3 py-1 hover:bg-black hover:text-white">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ManageCertifications;