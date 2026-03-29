const express = require("express");
const path = require("path");

const app = express();
const port = process.env.FRONTEND_PORT || 5500;
const gatewayBase =
  process.env.GATEWAY_BASE_URL ||
  "https://gateway.ashyplant-ea07b56b.eastasia.azurecontainerapps.io";

app.use(express.static(path.join(__dirname)));

app.get("/config", (_req, res) => {
  res.status(200).json({ gatewayBase });
});

app.get("/health", async (_req, res) => {
  try {
    const response = await fetch(`${gatewayBase}/health`);
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(502).json({
      error: "Gateway unreachable",
      details: error.message,
      gatewayBase
    });
  }
});

app.listen(port, () => {
  console.log(`Frontend listening on port ${port}`);
  console.log(`Proxying /health to ${gatewayBase}/health`);
});
