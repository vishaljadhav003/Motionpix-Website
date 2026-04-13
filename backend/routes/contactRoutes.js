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

const franc = require("franc");

router.post("/chat", async (req, res) => {
  const { message } = req.body;

  try {
    // 🌍 DETECT LANGUAGE
   const langCode = franc(message);

// 🔥 STRONG Hinglish detection
const hinglishWords = [
  "kya","hai","kaise","tum","aap","mera","meri","kar","raha","kyu",
  "ka","ki","ke","hona","bata","bolo","samajh","chal","de","le"
];

const servicesList = `
Animations, AR/VR, Web Design, Branding, Print Media, SOP,
Motion Graphics, Graphics Design, Digital Marketing,
E-Learning, Live Shoots
`;

const isHinglish = hinglishWords.some(word =>
  message.toLowerCase().includes(word)
);

let langInstruction = "Reply in English";

if (isHinglish) {
  langInstruction = "Reply in Hinglish (Hindi written in English letters)";
}
else if (langCode === "hin") {
  langInstruction = "Reply in Hindi (Devanagari script)";
}
else if (langCode === "mar") {
  langInstruction = "Reply in Marathi (Devanagari script)";
}


    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "mistralai/mixtral-8x7b-instruct", // 🔥 better than llama
        messages: [
         {
  role: "system",
  content: `
You are MotionPix AI assistant.

CRITICAL RULE:
You MUST reply ONLY in the SAME language as the user.

Language mapping:
- If user writes Hinglish → reply in Hinglish ONLY
- If user writes Hindi → reply in Hindi ONLY
- If user writes Marathi → reply in Marathi ONLY
- If user writes English → reply in English ONLY

DO NOT translate.
DO NOT switch language.
DO NOT explain language.

Examples:
User: tum kya karte ho  
Assistant: hum animation aur web design services dete hain

User: mala sang kasa ahes  
Assistant: mi changla ahe, tumhala kasa madat karu?

Keep answers short, friendly.
${servicesList}
When user asks about services:
→ Always list ALL services properly.
Never reduce services. Always mention full list.

`
},
          {
            role: "user",
            content: message
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