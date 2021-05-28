import { action, makeAutoObservable, observable, runInAction } from 'mobx';
import ICoordinates from '../classess/interfaces/ICoordinates';
import { RootStore } from './rootStore';

import { Region } from 'react-native-maps';
import SystemSetting from 'react-native-system-setting';
import VolumeControl from 'react-native-volume-control';
import GetLocation from 'react-native-get-location';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default class UserStore {
    rootStore: RootStore;
    currentLocalization: Region | undefined = undefined;
    mutedPhone: boolean = false;
    prevVolume: number | null = null;
    loading: boolean = false;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeAutoObservable(this);
    }

    updateCurrentLocation = async () => {
        this.loading = true;

        try {
            const location = await GetLocation.getCurrentPosition({
                enableHighAccuracy: true,
                timeout: 15000,
            });
            runInAction(() => {
                const { latitude, longitude } = location;
                this.currentLocalization = {
                    latitude,
                    longitude,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                };
                // always check if new localization of user should be muted or not
                this.rootStore.mutedLocalizationsStore.checkIfMuted();

                this.loading = false;
            });
        } catch (error) {
            runInAction(() => {
                const { code, message } = error;
                this.rootStore.errorStore.GPSDisabled();
                this.loading = false;
            });
        }
    };

    mute = async () => {
        try {
            // we need the previous volume of user to unmute it right later on
            this.prevVolume = await VolumeControl.getVolume();

            try {
                await AsyncStorage.setItem('@prevVolume', `${this.prevVolume}`);
                runInAction(() => {
                    SystemSetting.setVolume(0, { type: 'ring' });
                    SystemSetting.setVolume(0, { type: 'music' });
                    this.mutedPhone = true;
                });
            } catch (e) {
                console.log(e);
            }
        } catch (e) {
            console.log(e);
        }
    };

    unmute = async () => {
        try {
            const prevVolumeStr = await AsyncStorage.getItem('@prevVolume');

            let prevVolume: number;
            if (prevVolumeStr === null) {
                prevVolume = 100;
            } else {
                prevVolume = parseFloat(prevVolumeStr);
            }
            runInAction(() => {
                SystemSetting.setVolume(prevVolume, { type: 'ring' });
                SystemSetting.setVolume(prevVolume, { type: 'music' });
                this.mutedPhone = false;
            });
        } catch (e) {
            console.log(e);
        }
    };
}
