import "dotenv/config";
import cors from "cors";
import express from "express";
import { randomUUID } from "node:crypto";
import { requireAdmin, signAdminToken } from "./auth.js";
import { readData, writeData } from "./storage.js";

const app = express();

const port = Number(process.env.PORT || 5050);
const corsOrigin = process.env.CORS_ORIGIN || "http://localhost:5173";

app.use(
  cors({
    origin: corsOrigin,
  })
);

app.use(express.json({ limit: "256kb" }));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, timestamp: new Date().toISOString() });
});

app.post("/api/contact", (req, res) => {
  const name = String(req.body?.name || "").trim();
  const email = String(req.body?.email || "").trim();
  const message = String(req.body?.message || "").trim();

  if (!name || !email || !message) {
    return res.status(400).json({
      ok: false,
      error: "name, email, and message are required",
    });
  }

  (async () => {
    const data = await readData();
    data.contacts.unshift({
      id: randomUUID(),
      name,
      email,
      message,
      createdAt: new Date().toISOString(),
      userAgent: String(req.get("user-agent") || ""),
    });
    await writeData(data);
  })().catch((err) => {
    console.error("[contact] failed to persist", err);
  });

  return res.json({ ok: true });
});

app.get("/api/projects", async (_req, res) => {
  const data = await readData();
  res.json({ ok: true, projects: data.projects });
});

app.post("/api/admin/login", (req, res) => {
  const email = String(req.body?.email || "").trim();
  const password = String(req.body?.password || "");

  const adminEmail = String(process.env.ADMIN_EMAIL || "admin@example.com").trim();
  const adminPassword = String(process.env.ADMIN_PASSWORD || "admin");

  if (email !== adminEmail || password !== adminPassword) {
    return res.status(401).json({ ok: false, error: "Invalid credentials" });
  }

  return res.json({ ok: true, token: signAdminToken() });
});

app.get("/api/admin/projects", requireAdmin, async (_req, res) => {
  const data = await readData();
  res.json({ ok: true, projects: data.projects });
});

app.post("/api/admin/projects", requireAdmin, async (req, res) => {
  const title = String(req.body?.title || "").trim();
  const description = String(req.body?.description || "").trim();
  const image = String(req.body?.image || "").trim();
  const github = String(req.body?.github || "").trim();
  const tags = Array.isArray(req.body?.tags)
    ? req.body.tags.map((t) => String(t).trim()).filter(Boolean)
    : [];

  if (!title || !description) {
    return res.status(400).json({
      ok: false,
      error: "title and description are required",
    });
  }

  const data = await readData();
  const project = {
    id: randomUUID(),
    title,
    description,
    image,
    github,
    tags,
    createdAt: new Date().toISOString(),
  };
  data.projects.unshift(project);
  await writeData(data);

  return res.json({ ok: true, project });
});

app.delete("/api/admin/projects/:id", requireAdmin, async (req, res) => {
  const id = String(req.params.id || "");
  const data = await readData();
  const before = data.projects.length;
  data.projects = data.projects.filter((p) => p.id !== id);
  const after = data.projects.length;
  await writeData(data);

  if (before === after) {
    return res.status(404).json({ ok: false, error: "Not found" });
  }

  return res.json({ ok: true });
});

app.get("/api/admin/contacts", requireAdmin, async (_req, res) => {
  const data = await readData();
  res.json({ ok: true, contacts: data.contacts });
});

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});

