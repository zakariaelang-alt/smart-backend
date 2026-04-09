import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = process.env.GROQ_API_KEY;

app.post("/ask", async (req, res) => {
  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [
          { role: "user", content: req.body.message }
        ]
      })
    });

    const data = await response.json();
    console.log("Response Groq:", JSON.stringify(data));

    res.json({
      reply: data.choices?.[0]?.message?.content || "AI ga kasih jawaban"
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: "Error dari server." });
  }
});

app.get("/", (req, res) => {
  res.send("Backend aktif");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server jalan di port ${PORT}`);
});
