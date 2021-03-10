function getYesterdayDate(toYear, toMonth, toDay) {

    const today = new Date(toYear, toMonth-1 , toDay, 0, 0, 0, 0);
    const yesterday = new Date(today.valueOf() - 1000*60*60*24);

    const yesterYear = yesterday.getFullYear();
    const yesterMonth = yesterday.getMonth() +1;
    const yesterDay = yesterday.getDate();

    return [yesterYear, yesterMonth, yesterDay];
}

/*
// tests
console.log(getYesterdayDate(2020,03,08));
console.log(getYesterdayDate(2020,04,01));
console.log(getYesterdayDate(2020,09,01));
console.log(getYesterdayDate(2020,1,01));
*/

exports.getYesterdayDate = getYesterdayDate;