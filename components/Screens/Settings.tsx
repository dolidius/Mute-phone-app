import React, { useState, useContext } from 'react';

import { View, Text, Switch, StyleSheet } from 'react-native';

import { RootStoreContext } from '../../store/rootStore';
import { observer } from 'mobx-react-lite';

const Settings = () => {
    const rootStore = useContext(RootStoreContext);
    const { MutedFunctionality, changeFunctionality } = rootStore.settingsStore;

    return (
        <View>
            <View style={styles.settingsItem}>
                <Text>Muting functionality</Text>
                <View style={styles.spacer} />
                <Switch
                    onValueChange={changeFunctionality}
                    value={MutedFunctionality}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    settingsItem: {
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },

    spacer: {
        flex: 1,
    },
});

export default observer(Settings);
