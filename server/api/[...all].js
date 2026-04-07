import { app } from "../app.js";

export const config = {
  runtime: "nodejs20.x",
};

export default function handler(req, res) {
  try {
    return app(req, res);
  } catch (err) {
    console.error("[vercel handler] crash", err);
    res
      .status(500)
      .json({ ok: false, error: err?.message || "Internal Server Error" });
  }
}
