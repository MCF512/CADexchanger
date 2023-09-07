const express = require(`express`);

const app = express();
const port = process.env.PORT || 3010;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let cors = require("cors");
app.use(cors({ origin: "*" }));

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send("Internal Server Error");
});

const chalk = require("chalk");

app.listen(port, () =>
    console.log(chalk.green("Server started on port " + port))
);

app.post("/math", async function (req, res) {
    let { height, radius, sections } = req.body;

    const coordinates = [];
    const indices = [];

    for (let i = 0; i <= sections; i++) {
        let x = radius * Math.cos(2 * Math.PI * i / sections);
        let y = radius * Math.sin(2 * Math.PI * i / sections);

        coordinates.push(x, y, -height);
        indices.push(i, sections + 1, i + 1);
    }


    res.send({
        coordinates,
        indices,
        radius,
        sections,
        height
    });
});
