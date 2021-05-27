import IFormattedTimeInterval from "./IFormattedTimeInterval";


export default interface ITimeInterval {
    Id: string;
    StartingDay: number;
    EndingDay: number;
    StartingTime: Date;
    EndingTime: Date;
    formatInterval: () => IFormattedTimeInterval;
}

