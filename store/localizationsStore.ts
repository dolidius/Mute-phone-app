import { RootStore } from './rootStore';
import { makeAutoObservable } from 'mobx';

import axios from 'axios';
import ILocalization from '../classess/interfaces/ILocalization';

export default class LocalizationsStore {
    rootStore: RootStore;
    currentLocalization: ILocalization | null = null;
    loading: boolean = false;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeAutoObservable(this);
    }

    getLocalizationDetails = async (locId: number) => {
        axios.get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJN1t_tDeuEmsRUsoyG83frY4&fields=&key=${process.env.GOOGLE_API_KEY}
        `)
    }

}
