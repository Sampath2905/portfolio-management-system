import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function ManageProfile() {
    const [formData, setFormData] = useState({ about_text: "", resume_url: "", photo_url: "" });
    const [uploadingResume, setUploadingResume] = useState(false);
    const [uploadingPhoto, setUploadingPhoto] = useState(false);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        api.get("/profile/").then((res) => setFormData(res.data));
    }, []);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const uploadFile = async (file, field, setUploading) => {
        setUploading(true);
        const data = new FormData();
        data.append("file", file);
        try {
            const res = await api.post("/upload/", data, { headers: { "Content-Type": "multipart/form-data" } });
            setFormData((prev) => ({ ...prev, [field]: res.data.file_url }));
        } catch (err) {
            alert("Upload failed");
        }
        setUploading(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await api.put("/profile/", formData);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div className="min-h-screen bg-white text-black p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Manage Profile</h1>
                <Link to="/admin/dashboard" className="underline">Back to Dashboard</Link>
            </div>

            <form onSubmit={handleSubmit} className="border border-black p-6 max-w-2xl space-y-6">
                <div>
                    <label className="block mb-2 font-medium">Profile Photo</label>
                    <input type="file" accept="image/*" onChange={(e) => uploadFile(e.target.files[0], "photo_url", setUploadingPhoto)} className="w-full border border-black p-2" />
                    {uploadingPhoto && <p className="text-sm mt-1">Uploading...</p>}
                    {formData.photo_url && (
                        <img src={`${import.meta.env.VITE_API_URL || "http://127.0.0.1:8000"}${formData.photo_url}`} alt="preview" className="mt-2 h-24 w-24 object-cover rounded-full border border-black" />
                    )}
                </div>

                <div>
                    <label className="block mb-2 font-medium">Resume (PDF)</label>
                    <input type="file" accept=".pdf" onChange={(e) => uploadFile(e.target.files[0], "resume_url", setUploadingResume)} className="w-full border border-black p-2" />
                    {uploadingResume && <p className="text-sm mt-1">Uploading...</p>}
                    {formData.resume_url && (
                        <a href={`${import.meta.env.VITE_API_URL || "http://127.0.0.1:8000"}${formData.resume_url}`} target="_blank" rel="noreferrer" className="text-sm underline mt-2 inline-block">
                            View current resume
                        </a>
                    )}
                </div>

                <div>
                    <label className="block mb-2 font-medium">About Section Text</label>
                    <textarea
                        name="about_text"
                        value={formData.about_text || ""}
                        onChange={handleChange}
                        rows={6}
                        placeholder="Write your about section here..."
                        className="w-full border border-black p-2"
                    />
                </div>

                <button type="submit" className="bg-black text-white px-6 py-2 hover:bg-gray-800">
                    Save Profile
                </button>
                {saved && <span className="ml-4 text-green-600 text-sm">Saved!</span>}
            </form>
        </div>
    );
}

export default ManageProfile;