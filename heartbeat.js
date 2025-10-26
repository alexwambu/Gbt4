import fetch from "node-fetch";

const URL = process.env.RENDER_EXTERNAL_URL || "https://gbtnetwork-deployer.onrender.com";

setInterval(async () => {
  try {
    const res = await fetch(`${URL}/api/status`);
    console.log("💓 Heartbeat:", await res.text());
  } catch (err) {
    console.error("Heartbeat failed:", err.message);
  }
}, 240000); // every 4 min
