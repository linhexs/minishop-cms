let nDate =  new Date();
let year = nDate.getFullYear()
let month = nDate.getMonth()
let day = nDate.getDate()
function nowDate(){
    return year 
    + "-" + (month + 1) + 
    "-" +day;
}

function lastMonthDate(){
        return  year
        + "-" + month + 
        "-" + day;
}
function weekDate(){
    if(day-7 < 0){
        return  year
        + "-" + month + 
        "-" + (Math.abs(day-7+30));
    }else{
        return  year
        + "-" + month + 
        "-" + (day-7);
    }
}
export {
    nowDate,
    lastMonthDate,
    weekDate
}