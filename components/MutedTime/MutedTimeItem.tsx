import React, { useState, useContext } from 'react';

import { View, Text, Switch, Pressable, StyleSheet } from 'react-native';
import { RootStoreContext } from '../../store/rootStore';

interface IProps {
    id: string;
    startHour: string;
    endHour: string,
    startDay: string,
    endDay: string
}

const MutedTimeItem: React.FC<IProps> = ({ id, startHour, endHour, startDay, endDay }) => {

    const rootStore = useContext(RootStoreContext);
    const {
        removeInterval
    } = rootStore.intervalStore;

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.titleMain}>{startHour} - {endHour}</Text>
                <Text style={styles.titleSecondary}>{startDay} - {endDay}</Text>
            </View>
            <View style={styles.spacer} />
            <View>
                <Pressable onPress={() => removeInterval(id)} style={styles.btn}>
                    <Text style={styles.btnText}>Delete</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 30,
        paddingHorizontal: 20,
        borderBottomWidth: 2,
        borderBottomColor: 'black'
    },

    spacer: {
        flex: 1,
    },

    titleMain: {
        fontSize: 28,
        color: 'black'
    },

    titleSecondary: {
        fontSize: 13,
        color: '#6C6C6C',
    },

    btn: {
        marginTop: 5,
        backgroundColor: '#E90000',
        borderRadius: 5,
        paddingVertical: 7,
        paddingHorizontal: 20,
        elevation: 2,
    },

    btnText: {
        color: 'white',
        fontSize: 11
    }

});

export default MutedTimeItem;