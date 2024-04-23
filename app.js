const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();
const PORT = 3005;

app.get("/citations", async (req, res) => {
  try {
    const response = await axios.get("https://quotes.toscrape.com/");
    const $ = cheerio.load(response.data);

    const citations = [];

    $(".quote").each((index, element) => {
      const text = $(element).find(".text").text();
      const author = $(element).find(".author").text();
      citations.push({ text, author });
    });

    res.json(citations);
  } catch (error) {
    res.status(500).json({ error: "Erro ao obter citações" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
