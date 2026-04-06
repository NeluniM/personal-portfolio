import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/Button";
import { apiFetch, setAuthToken } from "@/lib/api";

export const AdminLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const res = await apiFetch("/api/admin/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      if (res?.token) {
        setAuthToken(res.token);
        navigate("/admin", { replace: true });
        return;
      }
      setError("Login failed");
    } catch (err) {
      setError(err?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-lg mx-auto glass rounded-2xl p-6 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-secondary-foreground">
            Admin Login
          </h1>
          <p className="text-muted-foreground mt-2">
            Sign in to manage projects and messages.
          </p>

          <form className="mt-8 space-y-5" onSubmit={onSubmit}>
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-2xl glass px-4 py-3 bg-transparent text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                placeholder="admin@example.com"
                type="email"
                autoComplete="username"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-2xl glass px-4 py-3 bg-transparent text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                placeholder="••••••••"
                type="password"
                autoComplete="current-password"
                required
              />
            </div>

            {error ? <div className="text-sm text-red-400">{error}</div> : null}

            <div className="flex items-center justify-end">
              <Button size="lg" type="submit" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
