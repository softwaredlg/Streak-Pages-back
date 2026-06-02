const express = require("express");
const cors = require("cors");

const userRoutes = require("./routes/user.routes");
const streakRoutes = require("./routes/streak.routes");
const claimRoutes = require("./routes/claim.routes");
const contentRoutes = require("./routes/content.routes");


const prisma = require("./config/db");

const app = express();

app.set("trust proxy", 1);

app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);
app.use("/streak", streakRoutes);
app.use("/claim", claimRoutes);
app.use("/content", contentRoutes);

//TEST
app.get("/", (req, res) => {
    res.json({
        message: "API WORKS"
    });
});

app.get("/content", async (req, res) => {
    try {
        const content = await prisma.contents.findMany();

        res.json(content);
    } catch (error) {
        console.log(error);

        res.status(500).json({
            error: "Error al obtener datos"
        });
    }
});

module.exports = app;