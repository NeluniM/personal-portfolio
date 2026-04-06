import { Route, Routes } from "react-router-dom";
import { Navbar } from "@/layout/Navbar";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Home } from "@/pages/Home";
import { AboutPage } from "@/pages/AboutPage";
import { ProjectsPage } from "@/pages/ProjectsPage";
import { ExperiencePage } from "@/pages/ExperiencePage";
import { ContactPage } from "@/pages/ContactPage";
import { AdminLogin } from "@/pages/AdminLogin";
import { AdminDashboard } from "@/pages/AdminDashboard";


function App() {
  return <div className="min-h-screen overflow-x-hidden">
    <Navbar/>

    <main>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/experience" element={<ExperiencePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </main>
  </div>
}

export default App;
