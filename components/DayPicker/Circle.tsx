import React, { useState } from 'react';

import { Pressable, Text, StyleSheet } from 'react-native';

interface IProps {
    shortCut: string;
    setDay: (dayNum: number) => void;
    dayNum: number;
    chosenDay: number;
}

const Circle: React.FC<IProps> = ({ shortCut, setDay, dayNum, chosenDay }) => {
    return (
        <Pressable onPress={() => setDay(dayNum)} style={chosenDay === dayNum ? [styles.circle, styles.chosen] : styles.circle}>
            <Text style={chosenDay === dayNum ? [styles.circleText, styles.chosenText] : styles.circleText}>{shortCut}</Text>
        </Pressable>
    )

}

const styles = StyleSheet.create({
    circle: {
        borderWidth: 3,
        borderColor: '#1743F9',
        padding: 7,
        borderRadius: 100,
        marginHorizontal: 3
    },

    circleText: {
        fontSize: 9,
        color: 'black',
    },

    chosen: {
        backgroundColor: '#1743F9',
    },

    chosenText: {
        color: 'white',
        borderWidth: 0
    }
});

export default Circle;