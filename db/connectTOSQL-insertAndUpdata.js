const sql = require('mssql')
const castParametrim = require('../functions/castToParameters')

var config = {
    multipleStatements: true,
    user: 'project',
    password: '1234',
    server: 'MEI-BARAK5',
    database: 'Shany&Chaya'

}
module.exports = function getData(procedore) {
    this.execProcedure = async (obj) => {
        let result;
        console.log(obj);
        const parameters = castParametrim(obj)
        console.log(`EXEC ${procedore} ${parameters}`);
        try {
            const connection = await sql.connect(config).then()
            result = await connection.request().query(`EXEC ${procedore} ${parameters}`)
            console.log(result, "תשובה");
        }
        catch (err) {
            console.log(err);
            return "בעיה בחיבור"
        }

        return result.rowsAffected;
    }

    
}

