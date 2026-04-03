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
    console.log("Message:", message);

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: message }]
      })
    });

    const data = await response.json();

    console.log("OpenAI:", data);

    res.json({
      reply: data.choices?.[0]?.message?.content || "No reply from AI"
    });

  } catch (err) {
    console.log("Chat error:", err);
    res.json({ reply: "Server error" });
  }
});
// Logout
router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/api/login");
});

module.exports = router;