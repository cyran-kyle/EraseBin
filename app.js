const express = require("express");
const rateLimit = require("express-rate-limit");
const path = require("path");
const Paste = require("./src/models/paste.js");
const { encrypt, decrypt } = require("./src/models/encryption.js");
const generateURL = require("./src/models/generateUrl.js");
const config = require("./src/config/config.js");
const app = express();

app.set("trust proxy", 1);
app.use(express.json());

// Serve static files from src directory
app.use(express.static(path.join(__dirname, 'src')));

//rate limit
const limiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: config.MAXREQ,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests STFU!." },
  keyGenerator: (req) => {
    return req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  },
});

// Serve the main HTML page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

app.use('/create', limiter);
//skip delete if it's the crawler from WhatsApp,insta, discord
var shouldSkipDelete = (userAgent) => {
  if (!userAgent) return false;
  return [
    "WhatsApp",
    "whatsapp",
    "Instagram",
    "instagram",
    "Discord",
    "discord",
  ].some((str) => userAgent.includes(str));
};

app.post("/create", async (req, res) => {
  try {
    var { content, password } = req.body;
    if (!content) return res.status(400).json({ error: "Content is required" });
    if (content.length > config.PASTE_MAX_CHARACTERS) {
      return res
        .status(400)
        .json({
          error: `Content exceeds ${config.PASTE_MAX_CHARACTERS} characters limit.`,
        });
    }
    var id = generateURL();
    var EncIt = password ? encrypt(content, password) : content;
    await Paste.create({
      id,
      content: EncIt,
      encrypted: !!password,
      password,
      views: 0,
    });
    res.json({ url: `${req.protocol}://${req.get("host")}/${id}` });
  } catch (e) {
    console.error("Failed to create paste:", e);
    res.status(500).json({ error: "Failed to create paste" });
  }
});

app.get("/:id", async (req, res) => {
  try {
    var paste = await Paste.findByPk(req.params.id);
    //console.log(req.headers["user-agent"]);
    if (!paste) return res.status(404).json({ error: "Paste not found it's either burnt or error" });
    var content =
      paste.encrypted && paste.password
        ? decrypt(paste.content, paste.password)
        : paste.content;
    paste.views = (paste.views || 0) + 1;
    await paste.save();
    if (!shouldSkipDelete(req.get("User-Agent")) || paste.views >= 4) {
      await paste.destroy();
    }
    res.json({ content });
  } catch (e) {
    console.log("Failed to get paste:", e);
    res.status(500).json({ error: "Failed to get paste" });
  }
});

module.exports = app;
