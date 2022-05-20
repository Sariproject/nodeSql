let my_express = require('express')
var hebrewDate = require('hebrew-date')
let getFormSQL=require('../db/connectToSQL-GET')
let addFromSQL=require('../db/connectTOSQL-insertAndUpdata')


let router = my_express.Router()

router.get('/teacherDetails', async(req, res)=>{
    let conect=new getFormSQL('teacherDetails')
    let ans= await conect.execProcedure(req.query)
    console.log(hebrewDate(new Date()),"aaaaaaaaaaaaaa");
    res.json(ans[0])
})

router.get('/students', async(req, res)=>{
    let conect=new getFormSQL('detailsStudensbyId')
    let ans= await conect.execProcedure(req.query)
    console.log(ans,"students");
    res.json(ans)
})

router.get('/talent', async(req, res)=>{
    let conect=new getFormSQL('AllFromTable')
    let ans= await conect.execProcedure({table:'Talents'})
    console.log(ans,"talent");
    res.json(ans)
})

router.get('/talents', async(req, res)=>{
    
    let conect=new getFormSQL('GetTalentStudentsForclass')
    let ans= await conect.execProcedure(req.query)
    if(ans==undefined){
      ans=[]
    }
    console.log(ans,"talents");
    res.json(ans)
})

router.get('/addTalent', async(req, res)=>{
    let conect=new addFromSQL('insertTalentForStudent')
    let ans= await conect.execProcedure(req.query)
    console.log(ans,"addTalent");
    res.json(ans)
})

router.get('/updateMoreDetails', async(req, res)=>{
    let conect=new addFromSQL('updateDetailsForTalent')
    let ans= await conect.execProcedure(req.query)
    console.log(req.query,"updateTalent");
    res.json(ans)
})

router.get('/deleteTalent', async(req, res)=>{
    let conect=new addFromSQL('deleteDetailsForTalent')
    let ans= await conect.execProcedure(req.query)
    console.log(ans,"deleteTalent");
    res.json(ans)
})

router.get('/addAdvice', async(req, res)=>{
    let conect=new addFromSQL('insertAdviceForStudent')
    let ans= await conect.execProcedure(req.query)
    console.log(ans,"addAdvice");
    res.json(ans)
})

router.get('/updateAdvice', async(req, res)=>{
    let conect=new addFromSQL('updateAdviceForTalent')
    let ans= await conect.execProcedure(req.query)
    console.log(ans,"updateAdvice");
    res.json(ans)
})

router.get('/deleteAdvice', async(req, res)=>{
    let conect=new addFromSQL('deleteAdvice')
    let ans= await conect.execProcedure(req.query)
    console.log(ans,"deleteAdvice");
    res.json(ans)
})
router.get('/insertTalent', async(req, res)=>{
    let conect=new addFromSQL('insertTalent')
    let ans= await conect.execProcedure(req.query)
    console.log(ans,"insertTalent");
    res.json(ans)
})
module.exports = router