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

// Logout
router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/api/login");
});

module.exports = router;