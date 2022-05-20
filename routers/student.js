let my_express = require('express')
let add=require('../db/addData/student')
let get=require('../db/getData/student')
let conectSQL=require('../db/connectToSQL-GET')
let addFormSQL=require('../db/connectTOSQL-insertAndUpdata')


let router = my_express.Router()

router.get('/getYears', async (req, res)=>{
    let connect = new conectSQL('spGetYears')
    console.log(req.query,"0");
    let ans = await connect.execProcedure(req.query)
    
    res.json(ans)
})
router.post('/UpdateTasks', async (req, res)=>{
    let connect = new addFormSQL('spUpdateTasks')
    console.log(req.body,"0");
    let ans = await connect.execProcedure(req.body)
    
    res.json(ans)
})
router.get('/getStudentDetails', async (req, res)=>{
    let connect = new conectSQL('getStudentDetails')
    console.log(req.query,"0");
    let ans = await connect.execProcedure(req.query)
    
    res.json(ans)
})
router.get('/getStudentTasks', async (req, res)=>{
    let connect = new conectSQL('getStudentTasks')
    let ans = await connect.execProcedure(req.query)
    
    res.json(ans)
})

router.get('/getStudentTalents', async (req, res)=>{
    let connect = new conectSQL('getStudentTalents')
    let ans = await connect.execProcedure(req.query)
    
    res.json(ans)
})
router.delete('/deleteTasks', async (req, res)=>{
    let connect = new addFormSQL('spDeleteTasks')
    let ans = await connect.execProcedure(req.query)
    
    res.json(ans)
})
router.get('/getStudentbyStudentId', async (req, res)=>{
    let ans=[]
    let connect = new conectSQL('spGetStudentDetailsbyStudentId')
    ans.push(await connect.execProcedure(req.query))
    connect = new conectSQL('spGetStudentTalentsbyStudentId')
    ans.push(await connect.execProcedure(req.query))
    connect = new conectSQL('spGetStudentTasksbyStudentId')
    ans.push(await connect.execProcedure(req.query))
    
    res.json(ans)
})

module.exports = router
