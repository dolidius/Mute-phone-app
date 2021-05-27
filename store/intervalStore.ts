import { RootStore } from './rootStore';
import { makeAutoObservable } from 'mobx';
import ITimeInterval from '../classess/interfaces/ITimeInterval';
import TimeInterval from '../classess/TimeInterval';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import getNextDayOfWeek from '../components/Helpers/getNextDayOfWeek';

export default class IntervalStore {
    RootStore: RootStore;
    Intervals: ITimeInterval[] = [];
    ClosestInterval: ITimeInterval | null = null;
    Timeout: ReturnType<typeof setTimeout> | null = null;
    TimeoutUnmute: ReturnType<typeof setTimeout> | null = null;
    CurrentInterval: ITimeInterval | null = null;

    constructor(rootStore: RootStore) {
        this.RootStore = rootStore;
        makeAutoObservable(this);
    }

    checkIfMuted = () => {
        if (this.Timeout) {
            clearTimeout(this.Timeout);
            this.Timeout = null;
        }
        const currDate = new Date();

        this.Intervals.forEach(interval => {
            const hour = interval.StartingTime.getHours();
            const minute = interval.StartingTime.getMinutes();
            let date = new Date();
            date.setHours(hour);
            date.setMinutes(minute);
            date.setSeconds(0);
            date.setMilliseconds(0);

            let futureData = getNextDayOfWeek(date, interval.StartingDay);

            let diff = futureData.getTime() - currDate.getTime();
            if (diff <= 900000 && diff >= 0) {
                this.ClosestInterval = interval;
                this.Timeout = setTimeout(() => {
                    this.RootStore.userStore.mute();
                    this.CurrentInterval = interval;
                    this.ClosestInterval = null;
                    this.setFutureUnmute();
                }, diff);
            }
        });
    };

    setFutureUnmute = () => {
        const shour = this.CurrentInterval!.StartingTime.getHours();
        const sminute = this.CurrentInterval!.StartingTime.getMinutes();
        let sDate = new Date();
        sDate.setHours(shour);
        sDate.setMinutes(sminute);
        sDate.setSeconds(0);
        sDate.setMilliseconds(0);
        let sfutureData = getNextDayOfWeek(
            sDate,
            this.CurrentInterval!.StartingDay,
        );

        const ehour = this.CurrentInterval!.EndingTime.getHours();
        const eminute = this.CurrentInterval!.EndingTime.getMinutes();
        let eDate = new Date();
        eDate.setHours(ehour);
        eDate.setMinutes(eminute);
        eDate.setSeconds(0);
        eDate.setMilliseconds(0);
        let efutureData = getNextDayOfWeek(
            eDate,
            this.CurrentInterval!.EndingDay,
        );

        const diff = efutureData.getTime() - sfutureData.getTime();

        this.TimeoutUnmute = setTimeout(() => {
            this.RootStore.userStore.unmute();
            this.CurrentInterval = null;
        }, diff);
    };

    addInterval = async (
        startingDay: number,
        endingDay: number,
        startingTime: Date,
        endingTime: Date,
    ) => {
        const id = `${startingDay}${endingDay}${startingTime.getHours()}${startingTime.getMinutes()}${endingTime.getHours()}${endingTime.getMinutes()}`;
        let overleaps = false;

        const newInterval: ITimeInterval = new TimeInterval(
            id,
            startingDay,
            endingDay,
            startingTime,
            endingTime,
        );

        this.Intervals.forEach(interval => {
            if (this.intervalsIntersect(interval, newInterval)) {
                Alert.alert(
                    'Adding failed',
                    'There is an interval that overleaps the one you wanted to add.',
                    [{ text: 'OK' }],
                );
                overleaps = true;
            }
        });

        if (!overleaps) {
            this.Intervals = [...this.Intervals, newInterval];
            this.checkIfMuted();

            const updated = JSON.stringify(this.Intervals);

            try {
                await AsyncStorage.setItem('@mutedIntervals', updated);
            } catch (e) {
                console.log(e);
            }
        }
    };

    removeInterval = async (id: string) => {
        this.Intervals = this.Intervals.filter(
            (interval: ITimeInterval) => interval.Id !== id,
        );

        if (this.ClosestInterval && this.ClosestInterval.Id === id) {
            clearTimeout(this.Timeout!);
            this.checkIfMuted();
        }

        if (this.CurrentInterval && this.CurrentInterval.Id === id) {
            clearTimeout(this.TimeoutUnmute!);
        }

        const updated = JSON.stringify(this.Intervals);

        try {
            await AsyncStorage.setItem('@mutedIntervals', updated);
        } catch (e) {
            console.log(e);
        }
    };

    loadIntervals = async () => {
        try {
            let mutedIntervals = await AsyncStorage.getItem('@mutedIntervals');
            let mutedIntervalsArr =
                mutedIntervals != null ? JSON.parse(mutedIntervals) : [];

            const classesArr: ITimeInterval[] = [];

            mutedIntervalsArr.forEach((interval: any) => {
                const newInterval: ITimeInterval = new TimeInterval(
                    interval.Id,
                    interval.StartingDay,
                    interval.EndingDay,
                    new Date(interval.StartingTime),
                    new Date(interval.EndingTime),
                );
                classesArr.push(newInterval);
            });

            this.Intervals = classesArr;
        } catch (e) {
            console.log(e);
        }
    };

    intervalsIntersect = (
        interval1: ITimeInterval,
        interval2: ITimeInterval,
    ): boolean => {
        let startTime1 = parseFloat(
            `${
                interval1.StartingDay * 100 + interval1.StartingTime.getHours()
            }.${interval1.StartingTime.getMinutes()}`,
        );
        let startTime2 = parseFloat(
            `${
                interval2.StartingDay * 100 + interval2.StartingTime.getHours()
            }.${interval2.StartingTime.getMinutes()}`,
        );
        let endTime1 = parseFloat(
            `${
                interval1.EndingDay * 100 + interval1.EndingTime.getHours()
            }.${interval1.EndingTime.getMinutes()}`,
        );
        let endTime2 = parseFloat(
            `${
                interval2.EndingDay * 100 + interval2.EndingTime.getHours()
            }.${interval2.EndingTime.getMinutes()}`,
        );

        return Math.max(startTime1, startTime1) <= Math.min(endTime1, endTime2);

        return false;
    };
}
