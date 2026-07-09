import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import ManageAcademics from "./admin/ManageAcademics";
import ManageCertifications from "./admin/ManageCertifications";
import ManageProjects from "./admin/ManageProjects";
import ManageExperience from "./admin/ManageExperience";
import ManageSkills from "./admin/ManageSkills";
import ManageProfile from "./admin/ManageProfile";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/admin/profile" element={<ProtectedRoute><ManageProfile /></ProtectedRoute>} />
          <Route path="/" element={<Home />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/academics" element={<ProtectedRoute><ManageAcademics /></ProtectedRoute>} />
          <Route path="/admin/certifications" element={<ProtectedRoute><ManageCertifications /></ProtectedRoute>} />
          <Route path="/admin/projects" element={<ProtectedRoute><ManageProjects /></ProtectedRoute>} />
          <Route path="/admin/experience" element={<ProtectedRoute><ManageExperience /></ProtectedRoute>} />
          <Route path="/admin/skills" element={<ProtectedRoute><ManageSkills /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;