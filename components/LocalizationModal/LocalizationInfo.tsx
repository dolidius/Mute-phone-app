import React, { useContext } from 'react';
import { RootStoreContext } from '../../store/rootStore';

import { StyleSheet, Text, View, Image } from "react-native";

const LocalizationInfo = () => {
    const rootStore = useContext(RootStoreContext);
    const { CurrentLocalization } = rootStore.mutedLocalizationsStore;

    return (
        <View style={styles.info}>
            <View style={styles.address}>
                <Image
                    style={styles.addressIcon}
                    source={{
                        uri: 'https://cdn3.iconfinder.com/data/icons/general-25/76/Location-512.png'
                    }}
                />
                <Text style={styles.addressText}>{CurrentLocalization!.Address.formatAddress()}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    info: {
        marginTop: 20
    },

    address: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    addressIcon: {
        width: 20,
        height: 30
    },

    addressText: {
        marginLeft: 8
    },
})

export default LocalizationInfo;