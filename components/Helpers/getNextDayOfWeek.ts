export default function getNextDayOfWeek(date: Date, dayOfWeek: number) {
    if(dayOfWeek === 7) dayOfWeek = 0;

    var resultDate = new Date(date.getTime());

    resultDate.setDate(date.getDate() + (7 + dayOfWeek - date.getDay()) % 7);

    return resultDate;
}