import express from "express";

const app = express();
const port = 8000;

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import dotenv from "dotenv";
dotenv.config();

import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.API_KEY,
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));

app.use(
    "/bootstrap",
    express.static("node_modules/bootstrap/dist", { root: __dirname })
);

// Serve static files (images, CSS, JS, etc.)
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index"); // This will render the 'index.ejs' file
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.get("/main", (req, res) => {
    res.render("main");
});

app.listen(port, () => {
    console.log(`Started server on port ${port}`);
});

// Endpoint to handle the AI request
app.post("/generate-haiku", async (req, res) => {
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [{ role: "user", content: "write a haiku about AI" }],
        });

        res.json({ haiku: completion.choices[0].message.content });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to generate haiku" });
    }
});
