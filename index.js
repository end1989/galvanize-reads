const express = require("express");
const app = express();
const cors = require("cors");
const port = parseInt(process.env.PORT || 9000);
const database = require("./database-connection");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const queries = require("./queries.js");

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(cors());
app.use(morgan());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/books", (req, res, next) => {
    queries
        .listBooks()
        .then(books => {
            res.json({ books });
        })
        .catch(next);
});

app.listen(port);
