import { Calendar } from "../types/calendar";

export const thirtyDay: string[] = ["Apr", "Jun", "Sep", "Nov"]
export const months: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
export const dayOfTheWeek: string[] = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

function getSkip(dayOfWeek: string): number {
    switch (dayOfWeek) {
        case "Mon": return 0;
        case "Tue": return 1;
        case "Wed": return 2;
        case "Thu": return 3;
        case "Fri": return 4;
        case "Sat": return 5;
        case "Sun": return 6;
        default: return 400
    }
}


function getDayInMonth(month: string, year: number): number  {
    if (month === "Feb") {
        if (year % 4 === 0) {
            return 29
        }
        else {
            return 28
        }
    }
    else if (thirtyDay.includes(month)) {
        return 30
    }
    else {
        return 31
    }
}


function getPrevMonthCalendar(month: string, year:number ): Calendar[] {
    let idx: number = months.indexOf(month)
    let prevMonth: string;
    if(idx === 0) {
        prevMonth = months[months.length-1]
    }
    else {
        prevMonth = months[idx-1]
    }

    let prevYear: number
    if (prevMonth === "Dec") {
        prevYear = year - 1
    }
    else {
        prevYear = year
    }


    let calendar: Calendar[] = []

    const date = new Date(`1 ${prevMonth} ${prevYear}`).toString()

    const day = getDayInMonth(prevMonth, prevYear)

   let iterat = 1;

   while (iterat < day+1) {
    calendar.push({date: `${iterat}/${prevMonth}/${prevYear}` , notThisMount: true})
    iterat++
   }

    return calendar
}











function getNextMonthCalendar(month: string, year:number ): Calendar[] {
    let idx: number = months.indexOf(month)
    let nextMonth: string;
    if(idx === months.length - 1) {
        nextMonth = months[0]
    }
    else {
        nextMonth = months[idx+1]
    }

    let nextYear: number
    if (nextMonth === "Jan") {
        nextYear = year + 1
    }
    else {
        nextYear = year
    }


    let calendar: Calendar[] = []

    const date = new Date(`1 ${nextMonth} ${nextYear}`).toString()

    const day = getDayInMonth(nextMonth, nextYear)

   let iterat = 1;

   while (iterat < day+1) {
    calendar.push({date: `${iterat}/${nextMonth}/${nextYear}` , notThisMount: true})
    iterat++
   }

    return calendar
}







export function createCalendar(month: string, year: number): Calendar[] {
    let calendar: Calendar[] = []
    console.log(month, year)
    const date = new Date(`1 ${month} ${year}`).toString()
    const dayOfWeek = date.split(" ")[0]
    const skip = getSkip(dayOfWeek)

    if (skip === 400) {
        alert("Что-то пошло не так...")
        return []
    }

    // for (let i = 0; i < skip; i++) {
    //     calendar.push(null)
    // } prev reshenie

    if (skip != 0) {
      const prev = getPrevMonthCalendar(month, year)

      const prevMonthCalendar = prev.slice(-skip)
      calendar = [...prevMonthCalendar, ...calendar]

    }

    const day = getDayInMonth(month, year)

    console.log(day)

   let iterat = 1;

   while (iterat < day+1) {
    calendar.push({date: `${iterat}/${month}/${year}`})
    iterat++
   }

//    while (calendar.length !== 42) {
//     calendar.push(null)
//    }

if (calendar.length !== 42) {
    const sliceCount = 42 - calendar.length;

    const next = getNextMonthCalendar(month, year)
    const nextMonthCalendar = next.slice(0, sliceCount)

    calendar = [...calendar, ...nextMonthCalendar]
}

    return calendar
}




