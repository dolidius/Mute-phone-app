import { RootStore } from './rootStore';
import { makeAutoObservable } from 'mobx';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { IOptions, IBService } from '../classess/interfaces/IBservice';
import BService from '../classess/BService';

const options: IOptions = {
    taskName: 'Mute app',
    taskTitle: 'Mute app is watching your time and localization...',
    taskDesc: 'Mute app',
    taskIcon: {
        name: 'ic_launcher',
        type: 'mipmap',
    },
    color: '#ff00ff',
    parameters: {
        delay: 1000000,
    },
    actions: '["Exit"]',
};

export default class SettingsStore {
    RootStore: RootStore;

    // boolean that lets us know if user wants the background service to work
    MutedFunctionality: boolean = true;

    // boolean that lets us know if the background service is started
    IsActive: boolean = false;

    BackgroudService: IBService;

    constructor(rootStore: RootStore) {
        this.RootStore = rootStore;

        this.BackgroudService = new BService(
            options,
            this.RootStore.userStore.updateCurrentLocation,
            this.RootStore.intervalStore.checkIfMuted,
        );
        makeAutoObservable(this);
    }

    loadSettings = async () => {
        try {
            /*
                async storage cannot have boolea values, so it works like this:
                "1" - true
                "0" - false
            */
            const mf = await AsyncStorage.getItem('@mutedFunctionality');
            const iA = await AsyncStorage.getItem('@isActive');

            if (this.MutedFunctionality === null) {
                this.MutedFunctionality = true;
            } else {
                this.MutedFunctionality = mf === '1';
            }

            this.IsActive = iA === '1';

            if (!this.IsActive && this.MutedFunctionality) {
                this.openBackgroundService();
            }
        } catch (e) {
            console.log(e);
        }
    };

    openBackgroundService = async () => {
        try {
            this.IsActive = true;
            await AsyncStorage.setItem('@isActive', '1');
            this.BackgroudService.Start();
        } catch (e) {
            console.log(e);
        }
    };

    stopBackgroundService = async () => {
        try {
            this.IsActive = false;
            await AsyncStorage.setItem('@isActive', '0');
            this.BackgroudService.Stop();
        } catch (e) {
            console.log(e);
        }
    };

    // function that enables user to turn on or turn off the background service
    changeFunctionality = async () => {
        try {
            this.MutedFunctionality = !this.MutedFunctionality;

            if (this.MutedFunctionality) this.openBackgroundService();
            if (!this.MutedFunctionality) this.stopBackgroundService();

            await AsyncStorage.setItem(
                '@mutedFunctionality',
                this.MutedFunctionality ? '1' : '0',
            );
        } catch (e) {
            console.log(e);
        }
    };
}
