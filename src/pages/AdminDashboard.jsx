import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/Button";
import { apiFetch, clearAuthToken, getAuthToken } from "@/lib/api";

const parseTags = (raw) => {
  return String(raw || "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
};

export const AdminDashboard = () => {
  const navigate = useNavigate();

  const [token, setToken] = useState(() => getAuthToken());
  const [activeTab, setActiveTab] = useState("projects");
  const [projects, setProjects] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    image: "",
    github: "",
    tags: "",
  });

  useEffect(() => {
    if (!token) {
      navigate("/admin/login", { replace: true });
    }
  }, [navigate, token]);

  const loadAll = async () => {
    setError("");
    setIsLoading(true);
    try {
      const [projRes, contactRes] = await Promise.all([
        apiFetch("/api/admin/projects"),
        apiFetch("/api/admin/contacts"),
      ]);
      setProjects(Array.isArray(projRes?.projects) ? projRes.projects : []);
      setContacts(Array.isArray(contactRes?.contacts) ? contactRes.contacts : []);
    } catch (err) {
      if (err?.status === 401) {
        clearAuthToken();
        setToken("");
        navigate("/admin/login", { replace: true });
        return;
      }
      setError(err?.message || "Failed to load admin data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logout = () => {
    clearAuthToken();
    setToken("");
    navigate("/", { replace: true });
  };

  const createProject = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const res = await apiFetch("/api/admin/projects", {
        method: "POST",
        body: JSON.stringify({
          title: newProject.title,
          description: newProject.description,
          image: newProject.image,
          github: newProject.github,
          tags: parseTags(newProject.tags),
        }),
      });
      if (res?.project) {
        setProjects((prev) => [res.project, ...prev]);
        setNewProject({ title: "", description: "", image: "", github: "", tags: "" });
      }
    } catch (err) {
      setError(err?.message || "Failed to create project");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProject = async (id) => {
    setError("");
    setIsLoading(true);
    try {
      await apiFetch(`/api/admin/projects/${id}`, { method: "DELETE" });
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      setError(err?.message || "Failed to delete project");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-secondary-foreground">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground mt-3">
              Manage your projects and view client messages.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="glass rounded-full px-2 py-1 flex items-center gap-1">
              <button
                type="button"
                onClick={() => setActiveTab("projects")}
                className={
                  activeTab === "projects"
                    ? "px-4 py-2 text-sm rounded-full text-foreground hover:bg-surface"
                    : "px-4 py-2 text-sm rounded-full text-muted-foreground hover:text-foreground hover:bg-surface"
                }
              >
                Projects
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("contacts")}
                className={
                  activeTab === "contacts"
                    ? "px-4 py-2 text-sm rounded-full text-foreground hover:bg-surface"
                    : "px-4 py-2 text-sm rounded-full text-muted-foreground hover:text-foreground hover:bg-surface"
                }
              >
                Contacts
              </button>
            </div>
            <Button size="sm" onClick={logout} disabled={isLoading}>
              Logout
            </Button>
          </div>
        </div>

        {error ? <div className="mt-6 text-sm text-red-400">{error}</div> : null}

        {activeTab === "projects" ? (
          <div className="mt-10 grid lg:grid-cols-5 gap-8 items-start">
            <div className="lg:col-span-2 glass rounded-2xl p-6 md:p-8">
              <h2 className="text-xl font-semibold">Add Project</h2>
              <form className="mt-6 space-y-4" onSubmit={createProject}>
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground">Title</label>
                  <input
                    value={newProject.title}
                    onChange={(e) => setNewProject((p) => ({ ...p, title: e.target.value }))}
                    className="w-full rounded-2xl glass px-4 py-3 bg-transparent text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    placeholder="Project title"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground">Description</label>
                  <textarea
                    value={newProject.description}
                    onChange={(e) =>
                      setNewProject((p) => ({ ...p, description: e.target.value }))
                    }
                    className="w-full min-h-32 rounded-2xl glass px-4 py-3 bg-transparent text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    placeholder="What is this project about?"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground">Image URL</label>
                  <input
                    value={newProject.image}
                    onChange={(e) => setNewProject((p) => ({ ...p, image: e.target.value }))}
                    className="w-full rounded-2xl glass px-4 py-3 bg-transparent text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    placeholder="/projects/my-image.jpg or https://..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground">GitHub URL</label>
                  <input
                    value={newProject.github}
                    onChange={(e) => setNewProject((p) => ({ ...p, github: e.target.value }))}
                    className="w-full rounded-2xl glass px-4 py-3 bg-transparent text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    placeholder="https://github.com/..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground">Tags (comma separated)</label>
                  <input
                    value={newProject.tags}
                    onChange={(e) => setNewProject((p) => ({ ...p, tags: e.target.value }))}
                    className="w-full rounded-2xl glass px-4 py-3 bg-transparent text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    placeholder="React, Node.js, MongoDB"
                  />
                </div>

                <div className="flex items-center justify-end">
                  <Button size="lg" type="submit" disabled={isLoading}>
                    {isLoading ? "Saving..." : "Add Project"}
                  </Button>
                </div>
              </form>
            </div>

            <div className="lg:col-span-3 space-y-4">
              {projects.length === 0 ? (
                <div className="glass rounded-2xl p-6 text-muted-foreground">No projects yet.</div>
              ) : null}

              {projects.map((p) => (
                <div key={p.id} className="glass rounded-2xl p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold">{p.title}</h3>
                      <p className="text-sm text-muted-foreground mt-2">{p.description}</p>
                      {Array.isArray(p.tags) && p.tags.length ? (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {p.tags.map((t) => (
                            <span
                              key={t}
                              className="px-4 py-1.5 rounded-full bg-surface text-xs font-medium border border-border/50 text-muted-foreground"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      ) : null}
                    </div>

                    <Button size="sm" onClick={() => deleteProject(p.id)} disabled={isLoading}>
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-10 glass rounded-2xl p-6 md:p-8">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Client Messages</h2>
              <Button size="sm" onClick={loadAll} disabled={isLoading}>
                Refresh
              </Button>
            </div>

            <div className="mt-6 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-muted-foreground">
                    <th className="text-left font-medium py-3">Date</th>
                    <th className="text-left font-medium py-3">Name</th>
                    <th className="text-left font-medium py-3">Email</th>
                    <th className="text-left font-medium py-3">Message</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.length === 0 ? (
                    <tr>
                      <td className="py-4 text-muted-foreground" colSpan={4}>
                        No messages yet.
                      </td>
                    </tr>
                  ) : null}
                  {contacts.map((c) => (
                    <tr key={c.id} className="border-t border-border/40">
                      <td className="py-4 whitespace-nowrap text-muted-foreground">
                        {c.createdAt ? new Date(c.createdAt).toLocaleString() : ""}
                      </td>
                      <td className="py-4 whitespace-nowrap">{c.name}</td>
                      <td className="py-4 whitespace-nowrap">
                        <a className="text-primary hover:underline" href={`mailto:${c.email}`}>
                          {c.email}
                        </a>
                      </td>
                      <td className="py-4 text-muted-foreground">{c.message}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
