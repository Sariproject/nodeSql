let my_express = require('express')
let my_admin = require('./routers/admin')
let my_student = require('./routers/student')
let my_teacher = require('./routers/teacher')
let bd = require('body-parser')
let mycore=require('cors')
let app = my_express()
let login=require('./db/getData/login')
let conectSQL=require('./db/connectToSQL-GET')

app.use(mycore())
app.use(bd.json())
app.use(my_express.json())


//החיבור הראשוני
app.get('/:id',async (req, res)=>{
    let conect = new conectSQL('getUserTypes')
    let ans = await conect.execProcedure({id:req.params.id})
    console.log(ans);
    res.json(ans)
})

app.use('/admin',my_admin)
app.use('/teacher',my_teacher)
app.use('/student',my_student)

app.listen(7900, ()=>{
    console.log('server is listening at http://localhost:7900');  
})
