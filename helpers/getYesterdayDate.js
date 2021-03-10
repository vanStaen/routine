function getYesterdayDate(toYear, toMonth, toDay) {

    let today = new Date(toYear, toMonth + 1, toDay, 0, 0, 0, 0);
    const yesterday = today.setDate(today.getDate() - 1);

    const yesterYear = yesterday.getFullYear();
    const yesterMonth = yesterday.getMonth() +1;
    const yesterDay = yesterday.getDate();

    return [yesterYear, yesterMonth, yesterDay];
}