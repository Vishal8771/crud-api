
const express = require("express");
const router = express.Router();
const User = require("../models/user");


// Deleted Users
router.get("/deleted-users", async (req, res) => {
    try {

        const users = await User.find({
            isDeleted: true
        });

        res.json({
            success: true,
            count: users.length,
            data: users
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});



// CREATE USER

router.post("/users", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        console.log({ name, email, password });

        const user = await User.create({
            name,
            email,
            password
        });

        console.log("Created User:", user);

        res.status(201).json({
            success: true,
            data: user
        });

    } catch (err) {

        console.log("ERROR:", err);

        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});


// GET ALL USERS
router.get("/user", async (req, res) => {
    try {

        const users = await User.find({
            isDeleted: false
        });

        res.json({
            success: true,
            count: users.length,
            data: users
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// GET SINGLE USER
router.get("/user/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);


        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });

        }

        res.json(user);
    } catch (error) {
        res.status(500).json({

            message: error.message
        });
    }



});


// DELETE USER

router.delete("/user/:id", async (req, res) => {
    try {

        const user = await User.findByIdAndUpdate(
            req.params.id,
            {
                isDeleted: true
            },
            {
                new: true
            }
        );

        res.json({
            success: true,
            message: "User moved to trash",
            data: user
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// RESTORE USER
router.put("/restore-user/:id", async (req, res) => {
    try {

        const user = await User.findByIdAndUpdate(
            req.params.id,
            {
                isDeleted: false
            },
            {
                new: true
            }
        );

        res.json({
            success: true,
            message: "User Restored Successfully",
            data: user
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;