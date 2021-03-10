export function getYesterdayDate(toYear, toMonth, toDay) {

    let today = new Date(toYear, toMonth-1 , toDay, 0, 0, 0, 0);
    var yesterday = new Date(today.valueOf() - 1000*60*60*24);

    const yesterYear = yesterday.getFullYear();
    const yesterMonth = yesterday.getMonth() +1;
    const yesterDay = yesterday.getDate();

    return [yesterYear, yesterMonth, yesterDay];
}