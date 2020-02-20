let nDate =  new Date();
function nowDate(){
    return nDate.getFullYear() 
    + "-" + (nDate.getMonth() + 1) + 
    "-" + nDate.getDate();
}

function lastMonthDate(){
        return nDate.getFullYear() 
        + "-" + (nDate.getMonth()) + 
        "-" + nDate.getDate();
}
export {
    nowDate,
    lastMonthDate
}