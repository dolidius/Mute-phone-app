import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Pressable } from "react-native";

import ICoordinates from '../../classess/interfaces/ICoordinates';
import { observer } from 'mobx-react-lite';


import { RootStoreContext } from '../../store/rootStore';

const Footer = () => {

    const rootStore = useContext(RootStoreContext);
    const {
        Localizations,
        addLocalization,
        removeLocalization,
        CurrentLocalization
    } = rootStore.mutedLocalizationsStore;

    const { IsMuted } = CurrentLocalization!;

    const btnFunction = () => {
        if (!IsMuted) {
            addLocalization();
        } else {
            removeLocalization();
        }
    }

    return (
        <View>
            <View>
                <Text style={[styles.muteInfo, !IsMuted && { color: '#11FF00' }]}>
                    {IsMuted ? "Phone mutes phone automatically in this localization" : "Phone will not mute in this localization"}
                </Text>
            </View>
            <View style={styles.buttons}>
                <Pressable onPress={btnFunction} style={[styles.btn, !IsMuted && { backgroundColor: '#11FF00' }]}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={styles.btnText}>{IsMuted ? "Cancel Mute" : "Mute"}</Text>
                    </View>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    muteInfo: {
        color: '#E90000',
        fontSize: 9
    },

    buttons: {
        marginTop: 12,
    },

    btn: {
        backgroundColor: '#E90000',
        borderRadius: 20,
        paddingVertical: 8,
        width: '50%',
        elevation: 2,
    },

    btnText: {
        color: 'white',
        fontSize: 12,
    }
});

export default observer(Footer);