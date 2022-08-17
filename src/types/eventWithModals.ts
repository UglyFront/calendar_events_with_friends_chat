export interface HeaderState {
    visible: boolean,
    visibleYear: boolean,
    visibleMonth: boolean,
    createEventModalVisible: boolean,
    eventModalVisible: boolean,
    handlerEvent: boolean,
    selectDay: string,
    events: Array<IEvent>,

    newEvent: IEventAdd
}

export interface IEvent {
    date: string,
    invites: number[],
    name: string,
    description: string,
    timeStart: string,
    timeEnd: string,
    color: string,
}


interface IEventAdd extends IEvent {
    nameError: string,
    descriptionError: string,
    timeStartError: string,
    timeEndError: string,
}

