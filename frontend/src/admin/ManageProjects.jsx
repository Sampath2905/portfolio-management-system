import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function ManageProjects() {
    const [projects, setProjects] = useState([]);
    const [formData, setFormData] = useState({
        title: "", description: "", tech_stack: "", github_url: "", live_url: "", image_urls: []
    });
    const [editId, setEditId] = useState(null);
    const [uploading, setUploading] = useState(false);

    const fetchProjects = async () => {
        const res = await api.get("/projects/");
        setProjects(res.data);
    };

    useEffect(() => { fetchProjects(); }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageUpload = async (e) => {
        const files = Array.from(e.target.files);
        if (!files.length) return;
        setUploading(true);
        const uploadedUrls = [];

        for (const file of files) {
            const data = new FormData();
            data.append("file", file);
            try {
                const res = await api.post("/upload/", data, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                uploadedUrls.push(res.data.file_url);
            } catch (err) {
                alert(`Upload failed for ${file.name}`);
            }
        }

        setFormData((prev) => ({ ...prev, image_urls: [...prev.image_urls, ...uploadedUrls] }));
        setUploading(false);
    };

    const removeImage = (index) => {
        setFormData((prev) => ({
            ...prev,
            image_urls: prev.image_urls.filter((_, i) => i !== index),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editId) {
            await api.put(`/projects/${editId}`, formData);
        } else {
            await api.post("/projects/", formData);
        }
        setFormData({ title: "", description: "", tech_stack: "", github_url: "", live_url: "", image_urls: [] });
        setEditId(null);
        fetchProjects();
    };

    const handleEdit = (project) => {
        setFormData({
            title: project.title,
            description: project.description || "",
            tech_stack: project.tech_stack || "",
            github_url: project.github_url || "",
            live_url: project.live_url || "",
            image_urls: project.image_urls || [],
        });
        setEditId(project.id);
    };

    const handleDelete = async (id) => {
        if (!confirm("Delete this project?")) return;
        await api.delete(`/projects/${id}`);
        fetchProjects();
    };

    return (
        <div className="min-h-screen bg-white text-black p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Manage Projects</h1>
                <Link to="/admin/dashboard" className="underline">Back to Dashboard</Link>
            </div>

            <form onSubmit={handleSubmit} className="border border-black p-6 mb-8 space-y-4">
                <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" required className="w-full border border-black p-2" />
                <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="w-full border border-black p-2" />
                <input name="tech_stack" value={formData.tech_stack} onChange={handleChange} placeholder="Tech Stack (e.g. React, FastAPI)" className="w-full border border-black p-2" />
                <input name="github_url" value={formData.github_url} onChange={handleChange} placeholder="GitHub URL" className="w-full border border-black p-2" />
                <input name="live_url" value={formData.live_url} onChange={handleChange} placeholder="Live Demo URL" className="w-full border border-black p-2" />

                <div>
                    <label className="block mb-2 font-medium">Project Images (select multiple)</label>
                    <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="w-full border border-black p-2" />
                    {uploading && <p className="text-sm mt-1">Uploading...</p>}

                    {formData.image_urls.length > 0 && (
                        <div className="flex flex-wrap gap-3 mt-3">
                            {formData.image_urls.map((url, i) => (
                                <div key={i} className="relative">
                                    <img src={`${import.meta.env.VITE_API_URL || "http://127.0.0.1:8000"}${url}`} alt={`preview-${i}`} className="h-24 w-24 object-cover border border-black" />
                                    <button
                                        type="button"
                                        onClick={() => removeImage(i)}
                                        className="absolute -top-2 -right-2 bg-black text-white rounded-full w-5 h-5 text-xs"
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <button type="submit" className="bg-black text-white px-6 py-2 hover:bg-gray-800">
                    {editId ? "Update Project" : "Add Project"}
                </button>
                {editId && (
                    <button type="button" onClick={() => { setEditId(null); setFormData({ title: "", description: "", tech_stack: "", github_url: "", live_url: "", image_urls: [] }); }} className="ml-4 border border-black px-6 py-2">
                        Cancel Edit
                    </button>
                )}
            </form>

            <div className="space-y-4">
                {projects.map((p) => (
                    <div key={p.id} className="border border-black p-4 flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            {p.image_urls && p.image_urls[0] && (
                                <img src={`${import.meta.env.VITE_API_URL || "http://127.0.0.1:8000"}${p.image_urls[0]}`} alt={p.title} className="h-16 w-16 object-cover border border-black" />
                            )}
                            <div>
                                <h3 className="font-bold">{p.title}</h3>
                                <p className="text-sm">{p.tech_stack}</p>
                                {p.image_urls && p.image_urls.length > 1 && (
                                    <p className="text-xs text-gray-500">+{p.image_urls.length - 1} more image(s)</p>
                                )}
                            </div>
                        </div>
                        <div className="space-x-2">
                            <button onClick={() => handleEdit(p)} className="border border-black px-3 py-1 hover:bg-black hover:text-white">Edit</button>
                            <button onClick={() => handleDelete(p.id)} className="border border-black px-3 py-1 hover:bg-black hover:text-white">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ManageProjects;