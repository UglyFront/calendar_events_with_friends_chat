import { statusEnum } from "./user"

export interface HeaderState {
    visible: boolean,
    visibleYear: boolean,
    visibleMonth: boolean,
    createEventModalVisible: boolean,
    eventModalVisible: boolean,
    handlerEvent: boolean,
    selectDay: string,
    events: Array<IEvent>,
    modalAuth: boolean

    newEvent: IEventAdd
}


export interface UserOther {
    id: number,
    img: string,
    name: string,
    status: string,
    statusText: statusEnum,
}

export interface IEvent {
    date: string,
    invites: UserOther[],
    name: string,
    ownerId: number
    description: string,
    timestart: string,
    timeend: string,
    color: string,
}


interface IEventAdd extends IEvent {
    nameError: string,
    descriptionError: string,
    timeStartError: string,
    timeEndError: string,
}

