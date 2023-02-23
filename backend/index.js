const express = require("express");
const cors = require("cors");
const { db, auth } = require("./firebase");
const { fetchAllBirthdays } = require("./api");
const PORT = 8000;
const VerifyToken = require("./middlewares/VerifyToken");
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(VerifyToken);

// Base Route with API data
app.get("/", (req, res) => {
    return res.status(200).send({
        message: "Welcome to Birthday Wisher Backend API",
        routes: {
            "/birthdays": "Get all birthdays in DB",
            "/birthdays/:id": "Get a specific birthday by ID",
            "/birthdays/add": "Add a birthday to DB",
            "/birthdays/:id/update": "Update a specific birthday data by ID",
            "/birthdays/:id/delete": "Delete a specific birthday by ID",
        },
    });
});

// Get All Birthdays
app.get("/birthdays", async (req, res) => {
    try {
        const birthdays = await fetchAllBirthdays(req.user.uid);
        return res.status(200).send(birthdays);
    } catch (e) {
        return res.status(400).send({
            message: e.message,
        });
    }
});

// Create a Birthday
app.post("/birthday", async (req, res) => {
    const { birthday, email, username } = req.body;
    try {
        const collection = db.collection("users");
        const data = {
            birthday,
            email,
            username,
            friends: [],
            wishList: [],
        };
        const docRef = await collection.add(data);
        return res.status(200).send({
            message: docRef.id,
        });
    } catch (e) {
        return res.status(400).send({ message: e.message });
    }
});

app.listen(PORT, () => {
    console.log("Server is live at the port " + PORT);
});
