import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const { sign } = jwt;
const auth = express.Router();
export default auth;

const generateToken = async (userId) => {
    const secret = process.env.JWT_SECRET;
    const payload = { time: Date(), userId };
    return sign(payload, secret, { expiresIn: "1h" });
}

auth.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ status: 400, message: "Username and password required." });
        }

        const [rows] = await req.db.execute("SELECT * FROM user WHERE username = ?", [username]);
        if (rows.length === 0) {
            return res.status(401).json({ status: 401, message: "Invalid username or password." });
        }

        const user = rows[0];
        const match = await bcrypt.compare(password, user.hash);
        if (!match) {
            return res.status(401).json({ status: 401, message: "Invalid username or password." });
        }

        const token = await generateToken(user.id);
        return res.status(200).json({ status: 200, token });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ status: 500, message: "Server error." });
    }
});

auth.post("/register", async (req, res) => {
    try {
        const { username, password, confirmPassword } = req.body;
        if (!username || !password || !confirmPassword) {
            return res.status(400).json({ status: 400, message: "All fields are required." });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ status: 400, message: "Passwords do not match." });
        }

        const hash = await bcrypt.hash(password, 10);

        const [result] = await req.db.execute(
            "INSERT INTO user (username, hash) VALUES (?, ?);",
            [username, hash]
        );

        const token = await generateToken(result.insertId);
        return res.status(200).json({ status: 200, token });
    } catch (err) {
        console.error(err);
        if (err.code === "ER_DUP_ENTRY") {
            return res.status(409).json({ status: 409, message: "Username already exists." });
        }
        return res.status(500).json({ status: 500, message: "Server error." });
    }
});