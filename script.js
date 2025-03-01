const express = require("express");
const path = require("path");
const app = express();
const port = 8000;

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

app.listen(port, () => {
    console.log(`Started server on port ${port}`);
});
