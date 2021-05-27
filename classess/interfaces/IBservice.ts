import { RootStore } from "../../store/rootStore";

export interface IBService {
    Options: IOptions,
    checkIfMutedInterval: () => void,
    updateCurrentLocalization: () => void,
    Start: () => void,
    Stop: () => void,
}

export interface IOptions {
    taskName: string,
    taskTitle: string,
    taskDesc: string,
    taskIcon: ITaskIcon,
    color: string,
    parameters: IParameters,
    actions: string
}

export interface ITaskIcon {
    name: string,
    type: string
}

export interface IParameters {
    delay: number
}