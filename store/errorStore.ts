import { RootStore } from './rootStore';
import { action, observable, makeAutoObservable } from 'mobx';

export default class errorStore {
    rootStore: RootStore;
    locationError = false;
    message = '';

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeAutoObservable(this);
    }

    GPSDisabled = () => {
        this.locationError = true;
        this.message = 'Your phone has disabled localization';
    };
}
