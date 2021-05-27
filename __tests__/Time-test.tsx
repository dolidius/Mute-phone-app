import 'react-native';


import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStore } from '../store/rootStore';
import TimeInterval from '../classess/TimeInterval';
import ITimeInterval from '../classess/interfaces/ITimeInterval';

const root = new RootStore()
const startingDate = new Date();
startingDate.setHours(3)
startingDate.setMinutes(27);

const endingDate = new Date();
endingDate.setHours(14)
endingDate.setMinutes(27);

const id = "233271427";
const interval: ITimeInterval = new TimeInterval(id, 2, 3, startingDate, endingDate);

describe("Formatting interval", () => {
    it('should format the interval correctly', () => {
        let formattedInterval = interval.formatInterval();

        expect(formattedInterval).toStrictEqual({
            startTime: "3:27",
            endTime: "14:27",
            startDay: "Tuesday",
            endDay: "Wednesday"
        });
    });

});

describe("Adding interval", () => {

    it("should add new interval to local database", async () => {
        const { addInterval } = root.intervalStore;

        await addInterval(2, 3, startingDate, endingDate);

        let muted = await AsyncStorage.getItem("@mutedIntervals");
        let mutedArr: ITimeInterval[] = JSON.parse(muted!);

        let exists = false;
        mutedArr.forEach(inter => {
            if (inter.Id === id) {
                exists = true;
            }
        });

        expect(exists).toBe(true);

    });


    it("should add new interval to the intervals array", async () => {
        const { addInterval } = root.intervalStore;
        await addInterval(2, 3, startingDate, endingDate);

        const { Intervals } = root.intervalStore;

        let exists = false;
        Intervals.forEach((inter: ITimeInterval) => {
            if (inter.Id === id) {
                exists = true;
            }
        });

        expect(exists).toBe(true);

    });


});


describe("Removing interval", () => {
    beforeEach(() => {
        const { Intervals } = root.intervalStore;
        Intervals.push(interval);
    });


    it("should remove interval from local database", async () => {
        const { removeInterval } = root.intervalStore;

        await removeInterval(id);
        let muted = await AsyncStorage.getItem("@mutedIntervals");
        let mutedArr: ITimeInterval[] = JSON.parse(muted!);

        let exists = false;
        mutedArr.forEach(inter => {
            if (inter.Id === id) {
                exists = true;
            }
        });

        expect(exists).toBe(false);

    });

    it("should remove localization from the localizations array", async () => {
        const { removeInterval } = root.intervalStore;

        await removeInterval(id);

        const { Intervals } = root.intervalStore;

        let exists = false;
        Intervals.forEach((inter: ITimeInterval) => {
            if (inter.Id === id) {
                exists = true;
            }
        });

        expect(exists).toBe(false);

    });

});

describe("Loading intervals", () => {
    it('should load all muted intervals', async () => {
        const { loadIntervals } = root.intervalStore;

        await loadIntervals();

        const { Intervals } = root.intervalStore;

        expect(Array.isArray(Intervals)).toBe(true);

        Intervals.forEach((inter: ITimeInterval) => {
            expect(inter.Id).toBe(id);
            expect(inter).toHaveProperty('Id');
            expect(inter).toHaveProperty('StartingDay');
            expect(inter).toHaveProperty('EndingDay');
            expect(inter).toHaveProperty('StartingTime');
            expect(inter).toHaveProperty('EndingTime');
        });

    });
})


describe("Intersecting intervals", () => {

    it("should return true if two intervals are intersecting", () => {
        const { intervalsIntersect } = root.intervalStore;

        const startingDate = new Date();
        startingDate.setHours(4);
        startingDate.setMinutes(27);
        
        const endingDate = new Date();
        endingDate.setHours(13);
        endingDate.setMinutes(27);
        
        const interval2 = new TimeInterval("234271327", 2, 3, startingDate, endingDate);
        
        expect(intervalsIntersect(interval, interval2)).toBe(true);
    })


    // it("should return false if two intervals are not intersecting", () => {
    //     const { intervalsIntersect } = root.intervalStore;

    //     const startingDate = new Date();
    //     startingDate.setHours(13);
    //     startingDate.setMinutes(40);
        
    //     const endingDate = new Date();
    //     endingDate.setHours(15);
    //     endingDate.setMinutes(27);
        
    //     const interval2 = new TimeInterval("3313401527", 3, 3, startingDate, endingDate);
        
    //     expect(intervalsIntersect(interval, interval2)).toBe(false);
    // })


})