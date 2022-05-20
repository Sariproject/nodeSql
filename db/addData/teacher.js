let sql = require('mssql')

var config = {
    user: 'javalogin',
    password: '1234',
    server: 'ANC3-01\\NEW_SQL',
    database: 'Shany&Chaya'
}

module.exports = function MyObject(col) {
    var table = col

    this.twoParameters = async (query1, query2) =>{
        console.log(query1, query2);
        let connection = await sql.connect(config)
        let result = await connection.request().query(`exec ${table} '${query1}', ${query2}`)
        console.log(result)
        return result.rowsAffected; 
    }

    this.updateTalent = async (query1, query2, query3) =>{
        console.log(query1, query2, query3);
        let connection = await sql.connect(config)
        let result = await connection.request().query(`exec ${table} '${query1}', ${query2}, '${query3}'`)
        console.log(result)
        return result.rowsAffected; 
    }
    
    this.addAdvice = async (query1, query2, query3) =>{
        console.log(query1, query2, query3);
        let connection = await sql.connect(config)
        let result = await connection.request().query(`exec ${table} '${query1}', ${query2}, ${query3}`)
        console.log(result)
        return result.rowsAffected; 
    }

}