import ITimeInterval from './interfaces/ITimeInterval';
import IFormattedTimeInterval from './interfaces/IFormattedTimeInterval';

export default class TimeInterval implements ITimeInterval {
    public Id: string;
    public StartingDay: number;
    public EndingDay: number;
    public StartingTime: Date;
    public EndingTime: Date;

    constructor(
        id: string,
        startingDay: number,
        endingDay: number,
        startingTime: Date,
        endingTime: Date,
    ) {
        this.Id = id;
        this.StartingDay = startingDay;
        this.EndingDay = endingDay;
        this.StartingTime = startingTime;
        this.EndingTime = endingTime;
    }

    public formatInterval = (): IFormattedTimeInterval => {

        let startMinutes: string | number = this.StartingTime.getMinutes();
        let endMinutes: string | number = this.EndingTime.getMinutes();

        if (startMinutes >= 1 && startMinutes <= 9) {
            startMinutes = `0${startMinutes}`
        }

        if (endMinutes >= 1 && endMinutes <= 9) {
            endMinutes = `0${endMinutes}`
        }

        return {
            startTime: `${this.StartingTime.getHours()}:${startMinutes}`,
            endTime: `${this.EndingTime.getHours()}:${endMinutes}`,
            startDay: this.dayStringFromNumber(this.StartingDay),
            endDay: this.dayStringFromNumber(this.EndingDay),
        };
    };

    private dayStringFromNumber = (x: number): string => {
        switch (x) {
            case 1:
                return 'Monday';
            case 2:
                return 'Tuesday';
            case 3:
                return 'Wednesday';
            case 4:
                return 'Thursday';
            case 5:
                return 'Friday';
            case 6:
                return 'Saturday';
            case 7:
                return 'Sunday';
            default: 
                return 'Monday';
        }
    };
}
