const stringMonthToNumber = (month: any): number => {
    switch (month) {
        case "Jan": return 0;
        case "Feb": return 1;
        case "Mar": return 2;
        case "Apr": return 3;
        case "May": return 4;
        case "Jun": return 5;
        case "Jul": return 6;
        case "Aug": return 7;
        case "Sep": return 8;
        case "Oct": return 9;
        case "Nov": return 10;
        case "Dec": return 11;
        default: return 400
    }
}





export const biggestDayNow = (selectDate: (string | number)[]): boolean => {
    const dayToday: number = +new Date().getDate()
    const monthToday: number = +new Date().getMonth()
    const yearToday: number = +new Date().getFullYear()

    
    const daySelect: number = +selectDate[0]
    const monthSelect: number = stringMonthToNumber(selectDate[1])
    const yearSelect: number = +selectDate[2]


    if (yearSelect < yearToday) {
        alert("Вы не можете запланировать мероприятие на прошедший год")
        return false
    }
    else {
        if (monthSelect < monthToday && yearSelect <= yearToday) {
            alert("Вы не можете запланировать мероприятие на прошедший месяц")
            return false
        } 
        else {
            return true
        }
    }
}


