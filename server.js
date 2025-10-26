import express from "express";
import { config } from "dotenv";
import deployContract from "./deploy.js";
import path from "path";
import { fileURLToPath } from "url";

config();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(express.static(path.join(__dirname, "public")));

let latestAddress = null;

app.get("/api/deploy", async (req, res) => {
  try {
    const result = await deployContract();
    latestAddress = result.address;
    res.json({ success: true, address: result.address });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get("/api/status", (_, res) => {
  res.json({
    status: "alive",
    lastDeployed: latestAddress || "No deployment yet"
  });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
