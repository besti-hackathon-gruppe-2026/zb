import express from "express";

import bcrypt from "bcrypt";

const auth = express.Router()
export default auth

auth.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const [results, fields] = await req.db.execute("SELECT * FROM user WHERE username = ?;", [username])
    
    
    
    return res.json({
        status: 200
    });
});

auth.post("/register", async (req, res) => {
    const { username, password, confirmPassword } = req.body;
    
    if (password !== confirmPassword) {
        return res.json({
            status: 400
        })
    }

    const hash = await bcrypt.hash(password);
    
    const [results, fields] = await req.db.execute("INSERT INTO user VALUES (?, ?);", [username, hash])

});