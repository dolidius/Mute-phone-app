import React, { useContext } from 'react';

import { StyleSheet, Text, View, Pressable, Image } from "react-native";

interface IProps {
    closeModal: Function
}

import { RootStoreContext } from '../../store/rootStore';

const Header: React.FC<IProps> = ({ closeModal }) => {

    const rootStore = useContext(RootStoreContext);
    const {
        CurrentLocalization
    } = rootStore.mutedLocalizationsStore;

    return (
        <View style={styles.header}>
            <View style={styles.iconContainer}>
                <Image
                    style={styles.icon}
                    source={{
                        uri: CurrentLocalization!.Icon
                    }}
                />
            </View>
            <View style={{ width: '60%' }}>
                <Text style={styles.nameMain}>{CurrentLocalization!.Name}</Text>
                <Text style={styles.nameSecondary}>{CurrentLocalization!.Type}</Text>
            </View>
            <View style={styles.spacer} />
            <View>
                <Pressable style={{ height: 20, width: 20 }} onPress={() => closeModal(false)}>
                    <Image
                        style={{ height: 20, width: 20 }}
                        source={{
                            uri: 'https://static.thenounproject.com/png/2172423-200.png'
                        }}
                    />
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
    },

    icon: {
        width: 50,
        height: 50
    },

    iconContainer: {
        marginRight: 10
    },

    nameMain: {
        marginBottom: 2,
        fontSize: 14,
        flexWrap: 'wrap'
        // textAlign: "center"
    },

    nameSecondary: {
        fontSize: 12,
        marginBottom: 15,
        color: '#6C6C6C',
        fontWeight: '100'
    },

    spacer: {
        flex: 1
    }
})

export default Header;