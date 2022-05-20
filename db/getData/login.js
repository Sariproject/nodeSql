// let sql = require('mssql')
// let config=require('../../model/Config')

// module.exports = function MyObject(col) {
//     var table = col

//     this.typeUser = async (query) =>{
//         let connection = await sql.connect(config)
//         let result = await connection.request().query(`select dbo.userType(${query}) as t `)
//         console.log(result)
//         return result.recordset[0].t; 
//     }

// }