import MapView, {
    PROVIDER_GOOGLE,
    Callout,
    Marker,
    Region,
} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import React, { useState, useEffect, useContext } from 'react';
import { observer } from 'mobx-react-lite';

import { View, StyleSheet, Text } from 'react-native';

import { RootStoreContext } from '../../store/rootStore';

import LocalizationModal from '../LocalizationModal/LocalizationModal';

const Map = () => {
    const [region, setRegion] = useState<Region | undefined>(undefined);

    // object that contains id of location after pressing it on the map
    const [poi, setPoi] = useState<any>(null);

    const [isLocModalOpened, setLocModalOpened] = useState(false);

    const rootStore = useContext(RootStoreContext);
    const {
        updateCurrentLocation,
        currentLocalization,
        loading,
    } = rootStore.userStore;

    useEffect(() => {
        updateCurrentLocation();
    }, []);

    useEffect(() => {
        if (!loading) {
            setRegion(currentLocalization);
        }
    }, [loading]);

    const onPoiClick = (e: any) => {
        const poi = e.nativeEvent;
        setPoi(poi);
        setLocModalOpened(true);
    };

    const onRegionChange = (region: Region) => {
        setRegion(region);
    };

    return (
        <>
            {region && (
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.container}
                    region={{
                        latitude: region!.latitude,
                        longitude: region!.longitude,
                        longitudeDelta: region!.longitudeDelta,
                        latitudeDelta: region!.latitudeDelta,
                    }}
                    onRegionChangeComplete={onRegionChange}
                    onPoiClick={onPoiClick}
                />
            )}

            {poi && (
                <LocalizationModal
                    isClosed={isLocModalOpened}
                    closeModal={setLocModalOpened}
                    placeId={poi.placeId}
                    coordinates={poi.coordinate}
                />
            )}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        // ...StyleSheet.absoluteFillObject,
        height: '100%',
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
});

export default observer(Map);
