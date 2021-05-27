import React, { useState, useEffect, useContext } from 'react';

import { View, Text, FlatList, StyleSheet, Switch, Pressable, Platform, Modal } from 'react-native';

import MutedTimeItem from '../MutedTime/MutedTimeItem';

import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DayPicker from "./../DayPicker/DayPicker";
import { RootStoreContext } from '../../store/rootStore';
import { observer } from 'mobx-react-lite';


const MutedTimes = () => {
    const rootStore = useContext(RootStoreContext);
    const {
        addInterval,
        Intervals
    } = rootStore.intervalStore;

    const [time, setTime] = useState<Date[]>([]);
    const [days, setDays] = useState<number[]>([]);
    const [mode, setMode] = useState<"time" | "date" | undefined>('time');
    const [show, setShow] = useState(0);



    const onTimeConfirm = (date: Date) => {
        const newTime = [...time];
        newTime.push(date);

        if (show === 4) {
            addInterval(days[0], days[1], newTime[0], newTime[1]);
            onCancel();
        } else {
            setTime(newTime);
            setShow((prevState) => prevState + 1);
        }
    }

    const onDayConfirm = (day: number) => {
        const newDays = [...days];
        newDays.push(day);
        setDays(newDays);
        setShow((prevState) => prevState + 1);
    }

    const onCancel = () => {
        setTime([]);
        setDays([]);
        setShow(0);
    }


    return (
        <View style={{ flex: 1 }}>
            <Pressable onPress={() => setShow(1)} style={styles.addBtn}>
                <Text style={styles.addBtnText}>+</Text>
            </Pressable>

            <FlatList
                data={Intervals}
                renderItem={({ item }) => {
                    const formatted = item.formatInterval();
                    return (<MutedTimeItem
                        key={item.Id}
                        id={item.Id}
                        startHour={formatted.startTime}
                        endHour={formatted.endTime}
                        startDay={formatted.startDay}
                        endDay={formatted.endDay}
                    />)
                }}
            />

            <DateTimePickerModal
                isVisible={show === 2}
                mode="time"
                onConfirm={onTimeConfirm}
                onCancel={onCancel}
            />

            <DateTimePickerModal
                isVisible={show === 4}
                mode="time"
                onConfirm={onTimeConfirm}
                onCancel={onCancel}
            />

            {show === 1 && <DayPicker
                title="Choose starting day"
                isVisible={show === 1}
                onConfirm={onDayConfirm}
                onCancel={onCancel}
            />}

            {show === 3 && <DayPicker
                title="Choose ending day"
                isVisible={show === 3}
                onConfirm={onDayConfirm}
                onCancel={onCancel}
            />}

        </View>
    )
}

const styles = StyleSheet.create({

    addBtn: {
        position: 'absolute',
        bottom: 10,
        alignSelf: 'center',
        width: 60,
        height: 60,
        borderRadius: 100,
        backgroundColor: '#5C7AF7',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 7,
        zIndex: 5
    },

    addBtnText: {
        color: 'white',
        fontSize: 20
    }
})

export default observer(MutedTimes);