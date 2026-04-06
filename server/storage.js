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

export const ensureDataFile = async () => {
  try {
    await fs.access(dataFilePath);
  } catch {
    await fs.writeFile(dataFilePath, JSON.stringify(defaultData, null, 2), "utf8");
  }
};

export const readData = async () => {
  await ensureDataFile();
  const raw = await fs.readFile(dataFilePath, "utf8");
  const parsed = JSON.parse(raw);
  return {
    projects: Array.isArray(parsed.projects) ? parsed.projects : [],
    contacts: Array.isArray(parsed.contacts) ? parsed.contacts : [],
  };
};

export const writeData = async (data) => {
  const safe = {
    projects: Array.isArray(data?.projects) ? data.projects : [],
    contacts: Array.isArray(data?.contacts) ? data.contacts : [],
  };

  const tmpPath = `${dataFilePath}.tmp`;
  await fs.writeFile(tmpPath, JSON.stringify(safe, null, 2), "utf8");
  await fs.rename(tmpPath, dataFilePath);
};
