let my_express = require('express')
let multer = require('multer')
let readXlsxFile = require('read-excel-file/node')
let bd = require('body-parser')
let get = require('../db/getData/admin')
let getFormSQL = require('../db/connectToSQL-GET')
let addFormSQL = require('../db/connectTOSQL-insertAndUpdata')
const { isInteger } = require('read-excel-file/commonjs/types/Integer')
var hebrewDate = require('hebrew-date')
let router = my_express.Router()
let path = ''

router.use(function (req, res, next) {
    //set headers to allow cross origin request.
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
router.use(bd.json({ limit: '50mb' }))
router.use(bd.urlencoded({ limit: '50mb', extended: true }))



var storage = multer.diskStorage({
    destination: function (req, file, cb) {

        cb(null, './uploads')
    },
    filename: function (req, file, cb) {

        cb(null, file.originalname)

    }
})
let upload = multer({ storage: storage }).single('myFile')

// router.get('/activityList', async (req, res) => {
//     let admin = new get('Activity')
//     let ans = await admin.details()
//     console.log("activityList");
//     res.json(ans)
// })
router.get('/activityList', async (req, res) => {
    let conect = new getFormSQL('AllFromTable')
    let ans = await conect.execProcedure({ table: 'Activity' })
    console.log(ans, "activityList");
    res.json(ans)
})

router.get('/talent', async (req, res) => {
    let conect = new getFormSQL('AllFromTable')
    let ans = await conect.execProcedure({ table: 'Talents' })
    console.log(ans, "talent");
    res.json(ans)
})
router.get('/year', async (req, res) => {
    let conect = new getFormSQL('AllFromTable')
    let ans = await conect.execProcedure({ table: 'Years' })
    console.log(ans, "year");
    res.json(ans)
})
router.get('/getStudentsByClass', async (req, res) => {
    let conect = new getFormSQL('detailsStudensbyClass')
    let ans = await conect.execProcedure(req.query)
    console.log(ans, "detailsStudensbyClass");
    res.json(ans)
})
router.get('/insertStudents', async (req, res) => {
    let conect = new addFormSQL('insertStusent')
    let ans = await conect.execProcedure(req.query)
    console.log(ans, "insertStusent");
    res.json(ans)
})
router.get('/insertTalent', async (req, res) => {
    let conect = new addFormSQL('insertTalent')
    let ans = await conect.execProcedure(req.query)
    console.log(ans, "insertTalent");
    res.json(ans)
})
router.get('/insertActivity', async (req, res) => {
    let conect = new addFormSQL('insertActivity')
    let ans = await conect.execProcedure(req.query)
    console.log(ans, "insertActivity");
    res.json(ans)
})

router.post('/getDate', async (req, res) => {
    let ans = hebrewDate(new Date());
    console.log(ans, "Date");
    res.json(ans)
})

router.post('/insertDate', async (req, res) => {
    let conect = new addFormSQL('spInsertYear')
    let ans = await conect.execProcedure(req.body)
    res.json(ans)
})

router.post('/updateClass', async (req, res) => {
    let conect = new addFormSQL('spUpdateClassYear')
    let ans = await conect.execProcedure(`"2"`)
    res.json(ans)
})
router.get('/studentsList/:letter', async (req, res) => {

    let data = `select StudentId,FirstName+' '+LastName as name,Class,Id 
                from Students where FirstName+' '+LastName like '${req.params.letter}%'`
    let admin = new get()
    let ans = await admin.details2(data)
    console.log("studentsList");
    res.json(ans)
})
router.post('/SearchTasks', async (req, res) => {
    let text = ''
    for (const item of req.body) {
        console.log(item);
        text = text + `${item.table}='${item.value}' and `
    }
    text = text.substring(0, text.length - 4)
    console.log(text);
    let admin = new getFormSQL('SearchTasks')
    let ans = await admin.execProcedure(`"${text}"`)
    console.log("SearchTasks");
    res.json(ans)
})
router.post('/SearchTalent', async (req, res) => {
    let text = ''
    console.log(req);
    for (const item of req.body) {
        console.log(item);
        text = text + `${item.table}='${item.value}' and `
    }
    text = text.substring(0, text.length - 4)
    console.log(text);
    let admin = new getFormSQL('SearchTalent')
    let ans = await admin.execProcedure(`"${text}"`)
    console.log("SearchTalent");
    res.json(ans)
})
router.post('/Search', async (req, res) => {
    console.log(req.body);
    let ans = []
    let admin = new getFormSQL('SearchDetails')
    ans.push(await admin.execProcedure(`" "`))
    admin = new getFormSQL('SearchTalents')
    ans.push(await admin.execProcedure(`" "`))
    admin = new getFormSQL('SearchTask')
    ans.push(await admin.execProcedure(`" "`))
    console.log("Search", ans);


    res.json(ans)
})


router.get('/insertTaskForStudent', async (req, res) => {
    console.log(hebrewDate(new Date()), "aaaaaaaaaaaaaa");
    console.log(req.query);
    let tasks = {}
    tasks = {
        studentId: req.query.studentId,
        year: hebrewDate(new Date()).year,
        activity: req.query.activity,
        talent: req.query.talent,
        size: req.query.size,
        misgeret: req.query.misgeret,
        more: req.query.more
    }
    console.log(tasks);
    let admin = new addFormSQL('insertTasksforStudent')
    let ans = await admin.execProcedure(tasks)
    console.log("insertTaskForStudent");
    res.json(ans)
})

router.post('/files', async (req, res) => {
    let ans=0
    let r="vvvv"
    r
    //console.log(req.body, "ppppp");
    for (let i = 1; i < req.body.length; i++) {
        
        let conect = new getFormSQL('getDetails')
        let a = await conect.execProcedure({ Id: req.body[i]['ת. זהות'] })
        console.log(a,"ans");
        if (a == undefined) {

            console.log("l",req.body[i]);
           
            let conect = new addFormSQL('insertStusent')
            req.body[i]['כתובת בית']=req.body[i]['כתובת בית'].replace(`'`,'"')
            console.log(req.body[i]['כתובת בית']);
            let y=await conect.execProcedure(req.body[i])
            if(y[0]==1){
                ans++
            }
        }
    }
    res.json(ans)
})

// router.post('/files', (req, res) => {
//     let ans = []
//     console.log('hello');
//     upload(req, res, function (err) {
//         if (err instanceof multer.MulterError) {
//             console.log('error');
//             // An error occurred when uploading
//             console.log(err);
//             return res.status(422).send("an Error occured")
//         } else if (err) {
//             console.log('error');
//             // An error occurred when uploading
//             console.log(err);
//             return res.status(422).send("an Error occured")
//         }

//         // No error occured.
//         path = req.file.path;

//         res.redirect('/admin/readXlsxFile')

//     })

// })
// router.get('/readXlsxFile', async (req, res) => {
//     let ans = []
//     let count = 0
//     let ez = 0
//     readXlsxFile(path).then(async (rows) => {
//         if (rows[0].length <= 10) {
//             ez++
//             rows.forEach(async r => {
//                 //console.log(r == rows[0]);

//                 if (r != rows[0] && r != rows[1]) {

//                     let conect = new getFormSQL('getDetails')
//                     let a = await conect.execProcedure({ Id: r[4] })
//                     if (a == undefined) {
//                         //console.log("l");
//                         let conect = new addFormSQL('insertStusent')
//                         ans.push(await conect.execProcedure({
//                             lastName: r[1],
//                             firstName: r[2],
//                             class: r[3],
//                             Id: r[4],
//                             address: r[5],
//                             phone: r[6]
//                         }))

//                     }
//                     if (a != undefined) {
//                         console.log(count);
//                         count++
//                         console.log(count);

//                     }

//                 }

//             });


//         }

//         else {
//             rows.forEach(async r => {

//                 if (r != rows[0]) {
//                     let name = r[1].split(' ');
//                     lastName = name[0]
//                     name = name.join(" ").substring(lastName.length + 1)

//                     for (let i = 2; i < 20; i = i + 2) {
//                         let conect = new getFormSQL('GetTalentId')
//                         let talentId = await conect.execProcedure({ talentNmae: rows[0][i] })
//                         if (r[i] != null) {
//                             conect = new addFormSQL('insertTalentForStudentByClass')
//                             let a = await conect.execProcedure({ firstName: name, lastName: lastName, class: r[0], talent: talentId[0].talentId })
//                         }
//                         if (r[i + 1] != null) {
//                             let countAdvice = r[i + 1]
//                             let countAdviceandMore = null
//                             if (isInteger(r[i + 1]) == false) {
//                                 countAdviceandMore = r[i + 1].split(' ')
//                                 countAdvice = countAdviceandMore[0]
//                                 countAdviceandMore = countAdviceandMore.join(" ").substring(2)
//                                 console.log(countAdviceandMore, "countAdvice");
//                                 console.log(countAdvice, "countAdvice");
//                             }
//                             conect = new addFormSQL('insertAdviceForStudentByClass')
//                             let a = await conect.execProcedure({ firstName: name, lastName: lastName, class: r[0], talent: talentId[0].talentId, text: countAdviceandMore })
//                             if (r[i] != null && countAdviceandMore != null) {
//                                 conect = new addFormSQL('updateDetailsForTalentByClass')
//                                 let a = await conect.execProcedure({ firstName: name, lastName: lastName, class: r[0], talent: talentId[0].talentId, text: countAdviceandMore })
//                             }
//                         }
//                     }
//                 }
//             })
//         }

//         await res.json(ez)
//         //res.json(count)
//     })


// })




module.exports = router