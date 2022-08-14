export interface HeaderState {
    visible: boolean,
    visibleYear: boolean,
    visibleMonth: boolean,
    eventModalVisible: boolean,
    selectDay: string,
}

export interface IEvent {
    date: string,
    invites: number,
    name: string,
    description: string,
    timeStart: string,
    timeEnd: string,
    color: string
}


export interface IEventState {
    events: IEvent[],
}