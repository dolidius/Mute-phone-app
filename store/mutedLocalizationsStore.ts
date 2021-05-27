import { action, makeAutoObservable, observable, runInAction } from 'mobx';
import ILocalization from '../classess/interfaces/ILocalization';
import { RootStore } from './rootStore';
import { getDistance } from 'geolib';

import AsyncStorage from '@react-native-async-storage/async-storage';
import ICoordinates from '../classess/interfaces/ICoordinates';

import Localization from '../classess/Localization';

import axios from 'axios';
import Address from '../classess/Address';
import createAddress from '../components/Helpers/createAddress';

export default class MutedLocalizationsStore {
    rootStore: RootStore;
    Localizations: ILocalization[] = [];
    Kappa: string[] = [];
    CurrentLocalization: ILocalization | null = null;
    Loading: Boolean = false;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeAutoObservable(this);
    }

    checkIfMuted = () => {
        let mute = false;
        for (const loc of this.Localizations!) {
            const { longitude, latitude } = loc.Coordinates;
            const {
                longitude: currentLongitude,
                latitude: currentLatitude,
            } = this.rootStore.userStore.currentLocalization!;
            const dist = getDistance(
                { latitude, longitude },
                { latitude: currentLongitude, longitude: currentLatitude },
            );

            if (dist <= 20) {
                mute = true;
                this.rootStore.userStore.mute();
            }
        }
        if (!mute && this.rootStore.userStore.mutedPhone) {
            this.rootStore.userStore.unmute();
        }
    };

    addLocalization = async () => {
        this.CurrentLocalization!.IsMuted = true;
        this.Localizations = [...this.Localizations, this.CurrentLocalization!];

        const updated = JSON.stringify(this.Localizations);

        try {
            await AsyncStorage.setItem('@mutedLocalizations', updated);
        } catch (e) {
            console.log(e);
        }
    };

    removeLocalization = async () => {
        this.Localizations = this.Localizations.filter(
            (mutedLoc: ILocalization) =>
                this.CurrentLocalization!.Id !== mutedLoc.Id,
        );

        this.CurrentLocalization!.IsMuted = false;

        const updated = JSON.stringify(this.Localizations);

        try {
            await AsyncStorage.setItem('@mutedLocalizations', updated);
        } catch (e) {
            console.log(e);
        }
    };

    removeLocalizationById = async (id: string) => {
        this.Localizations = this.Localizations.filter(
            (mutedLoc: ILocalization) => id !== mutedLoc.Id,
        );

        const updated = JSON.stringify(this.Localizations);

        try {
            await AsyncStorage.setItem('@mutedLocalizations', updated);
        } catch (e) {
            console.log(e);
        }
    };

    loadAllLocalizations = async () => {
        try {
            let mutedLocalizations = await AsyncStorage.getItem(
                '@mutedLocalizations',
            );
            let mutedLocalizationsArr =
                mutedLocalizations != null
                    ? JSON.parse(mutedLocalizations)
                    : [];
            const classessArr: ILocalization[] = [];
            mutedLocalizationsArr.forEach((loc: ILocalization) => {
                let {
                    Country,
                    City,
                    PostalCode,
                    Street,
                    StreetNumber,
                } = loc.Address;
                let address = new Address(
                    Country,
                    City,
                    PostalCode,
                    Street,
                    StreetNumber,
                );
                let { Id, Name, Icon, Coordinates, Type } = loc;
                classessArr.push(
                    new Localization(
                        Id,
                        Name,
                        Icon,
                        Coordinates,
                        address,
                        Type,
                    ),
                );
            });

            this.Localizations = classessArr;
        } catch (e) {
            console.log(e);
        }
    };

    loadLocalization = async (id: string, coor: ICoordinates) => {
        this.Loading = true;
        let isMuted = false;
        let chosenLocalization: ILocalization | null = null;

        for (const loc of this.Localizations!) {
            if (loc.Id === id) {
                isMuted = true;
                chosenLocalization = loc;
                break;
            }
        }

        if (!isMuted) {
            //google api call
            try {
                const res = await axios.get(
                    `https://maps.googleapis.com/maps/api/place/details/json?place_id=${id}&fields=name,icon,address_component,type&key=AIzaSyAIgSJ1oQIdzeKrUhEnKHoEeGCqkyLdSLA`,
                );
                const {
                    name,
                    icon,
                    address_components,
                    types,
                } = res.data.result;

                runInAction(() => {
                    const address = createAddress(address_components);

                    let type = '';

                    for (let i = 0; i < types[0].length; i++) {
                        if (types[0][i] === '_') {
                            type += ' ';
                        } else {
                            type += types[0][i];
                        }
                    }

                    const loc = new Localization(
                        id,
                        name,
                        icon,
                        coor,
                        address,
                        type,
                    );

                    chosenLocalization = loc;
                    this.CurrentLocalization = chosenLocalization;
                    this.Loading = false;
                });
            } catch (e) {
                console.log(e);
            }
        } else {
            this.CurrentLocalization = chosenLocalization;
            this.Loading = false;
        }
    };

    SetCurrentLocalization = (loc: ILocalization) => {
        this.CurrentLocalization = loc;
    };
}
