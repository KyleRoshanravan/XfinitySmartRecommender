import express from "express";

const app = express();
const port = 8000;

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import dotenv from "dotenv";
dotenv.config();

import $ from "jquery";

app.use("/js", express.static(__dirname + "/node_modules/jquery/dist"));

app.locals.$ = $;

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

app.use(express.json());

import { GoogleGenerativeAI } from "@google/generative-ai";
// Endpoint to handle POST request and call OpenAI API
app.post("/generateResponse", async (req, res) => {
    const { prompt } = req.body; // Get the prompt from the frontend

    const genAI = new GoogleGenerativeAI(process.env.API_KEY);

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    try {
        const result = await model.generateContent(prompt);
        // console.log(result.response.text());

        res.json({ message: result.response.text() });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({
            error: "Failed to generate response from OpenAI",
        });
    }
});
