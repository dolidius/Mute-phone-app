import React, { useContext, useEffect } from 'react';
import { Modal, StyleSheet, Text, View, Pressable, Image, ActivityIndicator } from "react-native";

import Footer from './Footer';
import Header from './Header';
import LocalizationInfo from './LocalizationInfo';
import ICoordinates from '../../classess/interfaces/ICoordinates';
import { observer } from 'mobx-react-lite';

import { RootStoreContext } from '../../store/rootStore';

interface IProps {
    isClosed: boolean,
    closeModal: (close: boolean) => void,
    placeId: string,
    coordinates: ICoordinates,
}

const LocalizationModal: React.FC<IProps> = ({ isClosed, closeModal, placeId, coordinates }) => {

    const rootStore = useContext(RootStoreContext);
    const {
        loadLocalization,
        CurrentLocalization,
        Loading
    } = rootStore.mutedLocalizationsStore;

    useEffect(() => {
        loadLocalization(placeId, coordinates);
    }, [placeId]);


    return (
        <View style={styles.centeredView}>
            <Modal
                visible={isClosed}
                animationType="slide"
                transparent={true}
                onRequestClose={() => closeModal(false)}
            >
                {Loading &&
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <ActivityIndicator />

                        </View>
                    </View>
                }
                {!Loading && CurrentLocalization !== null &&
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>

                            <Header
                                closeModal={closeModal}
                            />

                            <LocalizationInfo />

                            <View style={styles.spacer} />

                            <Footer />

                        </View>
                    </View>
                }
            </Modal>
        </View>
    )

}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },

    modalView: {
        width: '80%',
        height: '40%',
        backgroundColor: "white",
        borderRadius: 20,
        padding: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        position: 'relative'
    },

    spacer: {
        flex: 1,
    },

});

export default observer(LocalizationModal);