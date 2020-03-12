const errorList = [
    {
        type: 'errorToGetHostData', 
        code : 500,
        description: "Impossible to get Host Data"
    }
]

function error(type){
    let err = errorList.find(x => x.type === type);
    let errObj;
    if(err) {
        errObj = err
    } else {
        errObj = {
            type: 'notReferencedError', 
            code : 0,
            description: "Generic Error"
        }
    }
    return errObj
}

module.exports = {
    error,
}
