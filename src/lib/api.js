const apiBase = (import.meta?.env?.VITE_API_BASE || "").replace(/\/$/, "");

export const getAuthToken = () => {
  try {
    return localStorage.getItem("admin_token") || "";
  } catch {
    return "";
  }
};

export const setAuthToken = (token) => {
  try {
    localStorage.setItem("admin_token", token);
  } catch {
    // ignore
  }
};

export const clearAuthToken = () => {
  try {
    localStorage.removeItem("admin_token");
  } catch {
    // ignore
  }
};

export const apiFetch = async (path, options = {}) => {
  const headers = new Headers(options.headers || {});
  if (!headers.has("Content-Type") && options.body) {
    headers.set("Content-Type", "application/json");
  }

  const token = getAuthToken();
  if (token && !headers.has("Authorization")) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const res = await fetch(`${apiBase}${path}`, {
    ...options,
    headers,
  });

  const text = await res.text();
  let json = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    json = null;
  }

  if (!res.ok) {
    const message = json?.error || `Request failed (${res.status})`;
    const err = new Error(message);
    err.status = res.status;
    err.data = json;
    throw err;
  }

  return json;
};

export const sendContact = async ({ name, email, message }) => {
  return apiFetch("/api/contact", {
    method: "POST",
    body: JSON.stringify({ name, email, message }),
    keepalive: true,
  });
};
