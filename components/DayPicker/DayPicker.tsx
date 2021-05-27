import React, { useState } from 'react';

import { View, Modal, Text, StyleSheet, Pressable } from 'react-native';

import Circle from './Circle';

interface IProps {
    isVisible: boolean;
    onConfirm: (day: number) => void;
    onCancel: () => void;
    title: string;
}

const shortcuts = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'];

const DayPicker: React.FC<IProps> = ({
    isVisible,
    onConfirm,
    onCancel,
    title,
}) => {
    const [chosenDay, setChosenDay] = useState(1);

    return (
        <View style={styles.centeredView}>
            <Modal animationType="slide" transparent={true} visible={isVisible}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.title}>{title}</Text>
                        <View style={styles.circles}>
                            {shortcuts.map((s, idx) => (
                                <Circle
                                    key={s}
                                    shortCut={s}
                                    setDay={setChosenDay}
                                    dayNum={idx + 1}
                                    chosenDay={chosenDay}
                                />
                            ))}
                        </View>

                        <View style={styles.submitContainer}>
                            <Pressable
                                style={styles.submit}
                                onPress={() => onCancel()}>
                                <Text
                                    style={[styles.cancel, styles.submitText]}>
                                    Cancel
                                </Text>
                            </Pressable>
                            <Pressable
                                style={styles.submit}
                                onPress={() => onConfirm(chosenDay)}>
                                <Text style={[styles.ok, styles.submitText]}>
                                    Ok
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },

    modalView: {
        width: '90%',
        height: '30%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 30,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
    },

    circles: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    circle: {
        borderWidth: 3,
        borderColor: '#1743F9',
        padding: 7,
        borderRadius: 100,
        marginHorizontal: 3,
    },

    circleText: {
        fontSize: 9,
    },

    title: {
        marginBottom: 10,
        fontSize: 15,
    },

    submitContainer: {
        flexDirection: 'row',
        marginTop: 18,
    },

    submit: {
        marginHorizontal: 10,
        padding: 3,
    },

    cancel: {},

    ok: {},

    submitText: {
        fontSize: 15,
    },
});

export default DayPicker;
