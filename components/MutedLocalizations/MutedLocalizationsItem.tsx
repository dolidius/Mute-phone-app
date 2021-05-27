import React, { useContext } from 'react';

import { View, Text, StyleSheet, Image, Pressable } from 'react-native';

import { RootStoreContext } from '../../store/rootStore';

interface IProps {
    name: string;
    type: string;
    icon: string;
    id: string;
}

const MutedLocalizationsItem: React.FC<IProps> = ({ name, type, icon, id }) => {
    const rootStore = useContext(RootStoreContext);
    const { removeLocalizationById } = rootStore.mutedLocalizationsStore;

    return (
        <View style={styles.container}>
            <View>
                <Image
                    style={styles.icon}
                    source={{
                        uri: icon,
                    }}
                />
            </View>
            <View style={styles.title}>
                <Text style={styles.titleMain}>{name}</Text>
                <Text style={styles.titleSecondary}>{type}</Text>
            </View>

            <View style={styles.spacer} />

            <View>
                <Pressable
                    style={styles.btn}
                    onPress={() => removeLocalizationById(id)}>
                    <Text style={styles.btnText}>Delete</Text>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 30,
        paddingHorizontal: 15,
        borderBottomWidth: 2,
        borderBottomColor: 'black',
    },

    icon: {
        width: 40,
        height: 40,
        marginRight: 7,
    },

    spacer: {
        flex: 1,
    },

    title: {
        width: '65%',
    },

    titleMain: {
        fontSize: 16,
        color: 'black',
    },

    titleSecondary: {
        fontSize: 15,
        color: '#6C6C6C',
    },

    btn: {
        backgroundColor: '#E90000',
        borderRadius: 5,
        paddingVertical: 7,
        paddingHorizontal: 20,
        elevation: 2,
    },

    btnText: {
        color: 'white',
        fontSize: 11,
    },
});

export default MutedLocalizationsItem;
