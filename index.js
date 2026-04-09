import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = process.env.OPENAI_API_KEY;

app.post("/ask", async (req, res) => {
  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: req.body.message
      })
    });

    const data = await response.json();

    res.json({
      reply: data.output[0].content[0].text
    });

  } catch (err) {
    res.json({ reply: "Error dari server." });
  }
});

app.get("/", (req, res) => {
  res.send("Backend aktif");
});

app.listen(3000, () => {
  console.log("Server jalan");
});
