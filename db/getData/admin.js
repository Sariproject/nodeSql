let sql = require('mssql')

var config = {
    user: 'javalogin',
    password: '1234',
    server: 'ANC3-01\\NEW_SQL',
    database: 'Shany&Chaya'
}

module.exports = function MyObject(col) {
    var table = col

    this.details = async () =>{
        let connection = await sql.connect(config)
        let result = await connection.request().query(`select * from ${table}`)
        console.log(result)
        return result.recordset; 
    }

    this.details2 = async (query) =>{
        console.log(query);
        let connection = await sql.connect(config)
        let result = await connection.request().query(query)
        console.log(result)
        return result.recordset;
    }




}