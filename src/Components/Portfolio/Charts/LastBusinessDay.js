function lastBusinessDayOfMonth(year, month) {
    var date = new Date();
    var offset = 0;
    var result = null;
    
    if ('undefined' === typeof year || null === year) {
        year = date.getFullYear();
    }
    
    if ('undefined' === typeof month || null === month) {
        month = date.getMonth();
    }

    do {
        result = new Date(year, month, offset);
        
        offset--;
    } while (0 === result.getDay() || 6 === result.getDay());

    return result;
}

console.log(lastBusinessDayOfMonth(2021,9))