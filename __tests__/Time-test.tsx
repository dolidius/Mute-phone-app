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

const interval: ITimeInterval = new TimeInterval("1", 2, 3, startingDate, endingDate);


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

        const id = "233271427";
        
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


    // it('should add only correct intervals', async () => {

    //     const intervalWrong: IInterval = {
    //         Id: 2,
    //         StartingDay: 4,
    //         EndingDay: 4,
    //         StartTime: "15:27",
    //         EndTime: "14:27"
    //     }

    //     const { addInteval } = root.mutedIntervals;
    //     await addInteval(interval);
    //     await addInteval(intervalWrong);

    //     let muted = await AsyncStorage.getItem("mutedIntervals");
    //     let mutedArr: IInterval[] = JSON.parse(muted!);

    //     let exists = false;
    //     let existsWrong = false;
    //     mutedArr.forEach(inter => {
    //         if (inter.Id === interval.Id) {
    //             exists = true;
    //         }

    //         if (inter.Id === intervalWrong.Id) {
    //             existsWrong = true;
    //         }

    //     });

    //     expect(exists).toBe(true);
    //     expect(existsWrong).toBe(false);

    // })

    // it("should add new interval to the intervals array", () => {
    //     const { addInterval, intervals } = root.mutedIntervals;
    //     addInterval(interval).then(() => {
    //         let exists = false;
    //         intervals.forEach((inter: IInterval) => {
    //             if (inter.Id === interval.Id) {
    //                 exists = true;
    //             }
    //         });

    //         expect(exists).toBe(true);

    //     });

    // });

});


// describe("Removing interval", () => {

//     it("should remove interval from local database", () => {
//         const { removeInterval } = root.mutedIntervals;
//         removeInterval(interval).then(async () => {
//             let muted = await AsyncStorage.getItem("mutedIntervals");
//             let mutedArr: IInterval[] = JSON.parse(muted!);

//             let exists = false;
//             mutedArr.forEach(inter => {
//                 if (inter.Id === interval.Id) {
//                     exists = true;
//                 }
//             });

//             expect(exists).toBe(false);

//         });

//     });

//     it("should remove localization from the localizations array", () => {
//         const { removeInterval, intervals } = root.mutedIntervals;
//         removeInterval(interval).then(async () => {

//             let exists = false;
//             intervals.forEach((inter: IInterval) => {
//                 if (inter.Id === interval.Id) {
//                     exists = true;
//                 }
//             });

//             expect(exists).toBe(true);

//         });

//     });



// });

// describe("Loading intervals", () => {
//     it('should load all muted intervals', () => {
//         const { loadIntervals, intervals } = root.mutedIntervals;

//         loadIntervals().then(() => {

//             expect(Array.isArray(intervals)).toBe(true);

//             intervals.forEach((inter: IInterval) => {
//                 expect(inter).toHaveProperty('Id');
//                 expect(inter).toHaveProperty('StartingDay');
//                 expect(inter).toHaveProperty('EndingDay');
//                 expect(inter).toHaveProperty('StartTime');
//                 expect(inter).toHaveProperty('EndTime');
//             });

//         });
//     });
// })





// describe("Intersecting intervals", () => {
//     const { intersecting } = root.mutedIntervals;

//     it("should return true if two intervals are intersecting", () => {
//         const interval2: IInterval = {
//             Id: 2,
//             StartingDay: 2,
//             EndingDay: 3,
//             StartTime: "04:27",
//             EndTime: "13:27"
//         }
//         expect(intersecting(interval.Id, interval2.Id)).toBe(true);
//     })


//     it("should return false if two intervals are not intersecting", () => {
//         const interval2: IInterval = {
//             Id: 2,
//             StartingDay: 3,
//             EndingDay: 3,
//             StartTime: "13:40",
//             EndTime: "15:27"
//         }
//         expect(intersecting(interval.Id, interval2.Id)).toBe(false);
//     })


// })