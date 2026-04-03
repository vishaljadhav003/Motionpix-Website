const express = require("express");
const cors = require("cors");
const path = require("path");
const session = require("express-session");
const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config();
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// 🔥 SOCKET GLOBAL
app.set("io", io);
app.set("trust proxy", 1);

// 🔐 SESSION
app.use(
  session({
    secret: "secret123",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      secure: false, // 🔥 CHANGE THIS
    },
  })
);

// 🔐 CACHE FIX (IMPORTANT FOR BACK BUTTON LOGIN ISSUE)
app.use((req, res, next) => {
  res.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
  next();
});
app.use(cors({
  origin: [
  "http://localhost:5173",
  "https://motionpixpuneindia.netlify.app"
],
credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// ROUTES
const contactRoutes = require("./routes/contactRoutes");
app.use("/api", contactRoutes);

// 🔐 AUTH GUARD (IMPORTANT)
function isAuth(req, res, next) {
  if (req.session && req.session.isAuth) {
    return next();
  }
  return res.redirect("/api/login");
}

// HOME
app.get("/", (req, res) => {
  res.redirect("/api/admin");
});



// SOCKET
io.on("connection", (socket) => {
  console.log("🟢 Admin Connected");

  socket.on("disconnect", () => {
    console.log("🔴 Disconnected");
  });
});

server.listen(5000, () => {
  console.log("Server running on http://localhost:5000 🚀");
});