interface IEvent {
    id: number,
    name: string,
    time: string
}

export interface IDay {
    date: string,
    notThisMount?: boolean
}

export interface IChangeMonth {
    plus?: boolean,
    value?: string
}

export type Calendar = IDay | null


export interface ICalendarState {
    year: number,
    month: string,
    yearRange: number[],
    calendar: Calendar[]
}
