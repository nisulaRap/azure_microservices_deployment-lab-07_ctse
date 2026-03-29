const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok", service: "gateway" });
});

app.get("/", (_req, res) => {
  res.status(200).json({
    message: "Gateway service is running",
    endpoints: ["/health"]
  });
});

app.listen(port, () => {
  console.log(`Gateway listening on port ${port}`);
});
