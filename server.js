import express from "express";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "site")));

app.post("/chat", async (req, res) => {
  const r = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    body: JSON.stringify({
      model: "deepseek-r1:8b",
      prompt: req.body.prompt
    })
  });

  const data = await r.json();
  res.json({ reply: data.response });
});

app.listen(3000);
