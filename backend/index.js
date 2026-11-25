
require("dotenv").config();

const express = require("express");
const router = require("./router");
const adminRouter = require("./router/adminRoute");
const db = require("./db/connect");
const cors = require("cors");
const path = require("path");
const { initSocket } = require("./socket/socket");

const app = express();

// CORS configuration
const allowedOrigins = [
  "https://yarche-six.vercel.app",
  "https://yarche-frontend.vercel.app",
  "http://localhost:3000",
  "http://10.45.11.215:3000",
  "http://192.168.1.39:8081",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("Blocked CORS Origin:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "adminauthorization",
  ],
  credentials: true,
};

// CORS must run before routes
app.use(cors(corsOptions));
app.use(express.json());

// Static folder
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

// Database
db();

// Routes
app.use(router);
app.use("/admin", adminRouter);

// Server start
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});

initSocket(server);
