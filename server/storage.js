import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataFilePath = path.join(__dirname, "data.json");

const defaultData = {
  projects: [],
  contacts: [],
};

let memoryData = { ...defaultData };

const isServerless = () => {
  // Vercel sets VERCEL=1, but keep this generic.
  return Boolean(process.env.VERCEL);
};

const normalizeData = (data) => {
  return {
    projects: Array.isArray(data?.projects) ? data.projects : [],
    contacts: Array.isArray(data?.contacts) ? data.contacts : [],
  };
};

export const ensureDataFile = async () => {
  if (isServerless()) {
    return;
  }

  try {
    await fs.access(dataFilePath);
  } catch {
    await fs.writeFile(dataFilePath, JSON.stringify(defaultData, null, 2), "utf8");
  }
};

export const readData = async () => {
  if (isServerless()) {
    return normalizeData(memoryData);
  }

  try {
    await ensureDataFile();
    const raw = await fs.readFile(dataFilePath, "utf8");
    const parsed = JSON.parse(raw);
    return normalizeData(parsed);
  } catch {
    // If disk isn't writable/readable (or file is corrupted), fall back.
    return normalizeData(memoryData);
  }
};

export const writeData = async (data) => {
  const safe = normalizeData(data);

  if (isServerless()) {
    memoryData = safe;
    return;
  }

  const tmpPath = `${dataFilePath}.tmp`;
  try {
    await fs.writeFile(tmpPath, JSON.stringify(safe, null, 2), "utf8");
    await fs.rename(tmpPath, dataFilePath);
  } catch {
    memoryData = safe;
  }
};
