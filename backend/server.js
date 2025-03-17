const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./db"); // Import MongoDB connection function

const app = express();

// -----ENV Setup----- //
require("dotenv").config();
const PORT = process.env.PORT || 4000;
const routes = require("./routes");

// -----Connect to MongoDB----- //
connectDB();

// -----Middleware----- //
app.use(cors());
app.use(bodyParser.json());

// -----Routes----- //
app.use("/api/campaign", routes.campaign);
app.use("/api/user", routes.user);
app.use("/api/donate", routes.payment);
app.use("/api/donation", routes.donation);
app.use("/api/query", routes.query);

// Catch-all route for undefined endpoints (404 Error)
app.get("*", function (req, res) {
  res.send("404 Error");
});

// Start the server
app.listen(PORT, function () {
  console.log(`🚀 Server running on port ${PORT}`);
});
