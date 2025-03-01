const express = require("express");
const app = express();
const port = 8000;

app.use(express.static("public"));

app.use(
    "/bootstrap",
    express.static("node_modules/bootstrap/dist", { root: __dirname })
);

app.get("/", (req, res) => {
    res.sendFile("./public/index.html", { root: __dirname });
});

app.listen(port, () => {
    console.log(`Started server on port ${port}`);
});
