import express from "express";

const router = express.Router()
export default router

function errorResponse(res, status, reason) {
    return res.status(status).json({error:reason})
}

router.post("/classroom/create",async (req, res)=>{
    const classroomName = req.body.classroomName

    if(typeof classroomName !== "string") {
        return errorResponse(req, 400,"missing classroomName (string)")
    }
    if(classroomName.length < 1) {
        return errorResponse(res, 400,"classroomName (string) is too short")
    }
    if(classroomName.length > 255) {
        return errorResponse(res, 400,"classroomName (string) is too long")
    }

    const [results, fields] = await req.db.execute("INSERT INTO classrooms (name) VALUES (?)",[classroomName])

    return res.json({
        classroomID: results.insertId
    })
})

router.get("/classrooms", async (req, res) => {
    const [rows, fields] = await req.db.execute("SELECT * FROM classrooms")

    await res.json(rows.map(e=>{return {classroomId: e.id, classroomName: e.name}}))
})

router.post("/classroom/update",async (req, res)=> {
    const classroomId = req.body.classroomId
    const classroomName = req.body.classroomName

    if(typeof classroomId !== "number") {
        return errorResponse(req, 400,"missing classroomId (int)")
    }
    if(classroomId < 0) {
        return errorResponse(res, 400,"classroomId (int) must be positive")
    }
    if(typeof classroomName !== "string") {
        return errorResponse(req, 400,"missing classroomName (string)")
    }
    if(classroomName.length < 1) {
        return errorResponse(res, 400,"classroomName (string) is too short")
    }
    if(classroomName.length > 255) {
        return errorResponse(res, 400,"classroomName (string) is too long")
    }

    const [results, fields] = await req.db.execute("UPDATE classrooms SET name=? where id=?",[classroomName, classroomId])

    return res.json({})
})

router.post("/classroom/delete",async (req, res)=>{
    const classroomId = req.body.classroomId

    if(typeof classroomId !== "number") {
        return errorResponse(req, 400,"missing classroomId (int)")
    }
    if(classroomId < 0) {
        return errorResponse(res, 400,"classroomId (int) must be positive")
    }

    const [results, fields] = await req.db.execute("DELETE FROM classrooms where id=?",[classroomId])

    return res.json({})
})