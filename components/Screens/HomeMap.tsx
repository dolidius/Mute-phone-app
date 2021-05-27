import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import Map from '../Map/Map';

import SystemSetting from 'react-native-system-setting'
import AsyncStorage from '@react-native-async-storage/async-storage';
// import BackgroundTimer from 'react-native-background-timer';


const HomeMap = () => {

    const [volume, setVolume] = useState(0);
    const [oldVolume, setOldVolume] = useState(0);

    const volumeEvent = (event: any) => {
        setVolume(event.volume);
    };

    const mutePhone = () => {
        SystemSetting.setVolume(0, { type: 'ring' });
        SystemSetting.setVolume(0, { type: 'music' });
    }
    return (
        <View>
            <Map />
        </View>
    )

}

export default HomeMap;