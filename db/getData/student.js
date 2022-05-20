let sql = require('mssql')

var config = {
    user: 'javalogin',
    password: '1234',
    server: 'ANC3-01\\NEW_SQL',
    database: 'Shany&Chaya'
}

module.exports = function MyObject(col) {
    var table = col

    this.details = async (query) =>{
        console.log(query);
        let connection = await sql.connect(config)
        let result = await connection.request().query(`select * from ${table} where Id='${query}'`)
        console.log(result)
        return result.recordset[0]; 
    }

    this.detailsFunction = async (query) =>{
        console.log(query);
        let connection = await sql.connect(config)
        let result = await connection.request().query(`select * from ${table}('${query}')`)
        console.log(result)
        return result.recordset; 
    }
  

}