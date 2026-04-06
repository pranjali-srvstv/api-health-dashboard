const path = require("path");
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// NEW ROUTE
app.post("/check-api", async (req, res) => {
  const { url } = req.body;

  const start = Date.now();

  try {
    const response = await axios.get(url);
    const end = Date.now();

    res.json({
      success: true,
      status: response.status,
      time: end - start,
      data: response.data
    });
  } catch (error) {
    const end = Date.now();

    res.json({
      success: false,
      status: error.response?.status || 500,
      time: end - start,
      error: error.message
    });
  }
});
app.use(express.static(path.resolve(__dirname, "client/build")));

app.use((req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});
app.listen(5000, () => {
  console.log("Server running on port 5000");
});