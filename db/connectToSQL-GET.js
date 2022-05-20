const sql = require('mssql')
const castParametrim = require('../functions/castToParameters')

var config = {
    user: 'project',
    password: '1234',
    server: 'MEI-BARAK5',
    database: 'Shany&Chaya'
}
module.exports = function getData(procedore) {
    this.execProcedure = async (obj) => {
        let result;
        const parameters = castParametrim(obj)
        try {
            const connection = await sql.connect(config)
            console.log(`EXEC ${procedore} ${parameters}`);
            result = await connection.request().query(`EXEC ${procedore} ${parameters}`)
            console.log(result.recordset,"תשובה");
        }
        catch (err) {
            console.log(err);
            return "בעיה בחיבור"
        }
        if (result.recordset.length == 0)
            return undefined
        return result.recordset;
    }
}

