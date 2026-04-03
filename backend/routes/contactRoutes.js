const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactController");
const auth = require("../middleware/auth");

router.post("/contact", contactController.createContact);

// 🔐 Protected admin route
router.get("/admin", auth, contactController.getContacts);

router.get("/complete/:id", contactController.markComplete);
router.get("/delete/:id", contactController.deleteContact);

// Login page
router.get("/login", (req, res) => {
  res.render("login");
});



// Login POST
const db = require("../config/db");

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  const sql = "SELECT * FROM admin WHERE username=? AND password=?";

  db.query(sql, [username, password], (err, result) => {
    if (err) throw err;

    if (result.length > 0) {
      req.session.user = result[0];
      req.session.isAuth = true;
      res.redirect("/api/admin");
    } else {
      res.send("Invalid credentials");
    }
  });
});

const fetch = require("node-fetch");

router.post("/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "mistralai/mixtral-8x7b-instruct",
        messages: [
          {
            role: "system",
            content: "You are a helpful AI assistant for a creative agency called MotionPix."
          },
          {
            role: "user",
            content: message
          },
          {
            role: "system",
            content: `
            You are an AI assistant for MotionPix, a creative agency.
            Services: Animations, AR/VR, Web Design, Branding, Print-Media.
            Be short, friendly and helpful.
            `
          }
        ]
      })
    });

    const data = await response.json();

    res.json({
      reply: data.choices?.[0]?.message?.content || "No reply"
    });

  } catch (err) {
    console.log("Chat error:", err);
    res.json({ reply: "Error getting AI response" });
  }
});
// Logout
router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/api/login");
});

module.exports = router;