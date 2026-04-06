import jwt from "jsonwebtoken";

export const getJwtSecret = () => {
  return process.env.JWT_SECRET || "dev-secret-change-me";
};

export const signAdminToken = () => {
  return jwt.sign(
    {
      sub: "admin",
      role: "admin",
    },
    getJwtSecret(),
    {
      expiresIn: "7d",
    }
  );
};

export const requireAdmin = (req, res, next) => {
  const authHeader = String(req.headers.authorization || "");
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice("Bearer ".length)
    : "";

  if (!token) {
    return res.status(401).json({ ok: false, error: "Unauthorized" });
  }

  try {
    const payload = jwt.verify(token, getJwtSecret());
    if (payload?.role !== "admin") {
      return res.status(403).json({ ok: false, error: "Forbidden" });
    }
    req.admin = payload;
    return next();
  } catch {
    return res.status(401).json({ ok: false, error: "Unauthorized" });
  }
};
