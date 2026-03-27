import express from "express";

const router = express.Router()
export default router

function errorResponse(res, status, reason) {
    return res.status(status).json({error:reason})
}

function validateClassroomID(req, res, classroomId) {
     if(typeof classroomId !== "number") {
        return errorResponse(res, 400,"missing classroomId (int)")
    }
    if(classroomId < 0) {
        return errorResponse(res, 400,"classroomId (int) must be positive")
    }
    return null
}

function validateFilterId(req, res, filterID) {
     if(typeof filterID !== "number") {
        return errorResponse(res, 400,"missing filterID (int)")
    }
    if(filterID < 0) {
        return errorResponse(res, 400,"filterID (int) must be positive")
    }
    return null
}

router.post("/classroom/create",async (req, res)=>{
    const classroomName = req.body.classroomName

    if(typeof classroomName !== "string") {
        return errorResponse(res, 400,"missing classroomName (string)")
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

    const validationFailed = validateClassroomID(req, res, classroomId)
    if(validationFailed) return validationFailed
    
    if(typeof classroomName !== "string") {
        return errorResponse(res, 400,"missing classroomName (string)")
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

    const validationFailed = validateClassroomID(req, res, classroomId)
    if(validationFailed) return validationFailed

    const [results, fields] = await req.db.execute("DELETE FROM classrooms where id=?",[classroomId])

    return res.json({})
})

function validateFilter(res, ip,url) {
    if(ip) {
        if (typeof ip !== "string") {
            return errorResponse(res, 400, "missing ip (string)")
        }
        if (ip.length < 1) {
            return errorResponse(res, 400, "ip (string) is too short")
        }
        if (ip.length > 255) {
            return errorResponse(res, 400, "ip (string) is too long")
        }
    } else {
        if (typeof url !== "string") {
            return errorResponse(res, 400, "missing url (string)")
        }
        if (url.length < 1) {
            return errorResponse(res, 400, "url (string) is too short")
        }
        if (url.length > 255) {
            return errorResponse(res, 400, "url (string) is too long")
        }
    }
    
    return null
}
router.post("/filter/create", async (req, res) => {
    let ip = req.body.ip
    let url = req.body.url
    const classroomId = req.body.classroomId

    // only allow ip or url
    if(ip) {
        url = null
    } else {
        ip = null
    }
    
    let validationFailed = validateFilter(res, ip, url)
    if(validationFailed) return validationFailed
    
    validationFailed = validateClassroomID(req, res, classroomId)
    if(validationFailed) return validationFailed
    
    const [results, fields] = await req.db.execute("INSERT INTO filter (classroom_id, ip,url) VALUES (?, ?, ?)", [classroomId, ip, url])
    
        return res.json({
        classroomID: results.insertId
    })
})

router.get("/filters", async (req, res) => {
    const [rows, fields] = await req.db.execute("SELECT * FROM filter")

    await res.json(rows.map(e=>{return {filterId: e.id, classroomId: e.classroom_id, url:e.url, ip:e.ip}}))
})

router.post("/filter/update", async (req, res) => {
    let ip = req.body.ip
    let url = req.body.url
    const classroomId = req.body.classroomId
    const filterId = req.body.filterId

    // only allow ip or url
    if(ip) {
        url = null
    } else {
        ip = null
    }
    
    let validationFailed = validateFilter(res, ip, url)
    if(validationFailed) return validationFailed
    
    validationFailed = validateClassroomID(req, res, classroomId)
    if(validationFailed) return validationFailed
    
    validationFailed = validateFilterId(req, res, filterId)
    if(validationFailed) return validationFailed
    
    const [results, fields] = await req.db.execute("UPDATE filter SET classroom_id=?, ip=?, url=? where id=?",[classroomId, ip, url, filterId])

    return res.json({})
})

router.post("/filter/delete",async (req, res)=>{
    const filterId = req.body.filterId

    const validationFailed = validateFilterId(req, res, filterId)
    if(validationFailed) return validationFailed

    const [results, fields] = await req.db.execute("DELETE FROM filter where id=?",[filterId])

    return res.json({})
})