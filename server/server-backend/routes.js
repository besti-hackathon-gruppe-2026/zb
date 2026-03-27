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
        return errorResponse(req, 400,"classroomName (string) is too short")
    }

    const [results, fields] = await req.db.execute("INSERT INTO classrooms VALUES (?)",[classroomName])

    console.log(results, fields)

    return res.json({

    })
})