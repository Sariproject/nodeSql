const { isInteger } = require("read-excel-file/commonjs/types/Integer");
const { isObject } = require("util");


module.exports = function castToParameters(obj) {
    let parameters = "";
    if (isObject(obj) == true) {
        for (let item in obj) {

            if (isInteger(obj[item]) == true || obj[item] == null) {

                parameters = parameters + obj[item] + ', '
            }
            else {
                parameters = parameters + `'${obj[item]}'` + ', '
            }
        }


        parameters = parameters.substr(0, parameters.length - 2)
        console.log(parameters);
        return parameters
    }
    return obj
} 