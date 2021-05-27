import { configure } from 'mobx';
import { createContext } from 'react';
import MutedLocalizationsStore from './mutedLocalizationsStore';
import UserStore from './userStore';
import ErrorStore from './errorStore';
import LocalizationsStore from './localizationsStore';
import IntervalStore from './intervalStore';
import SettingsStore from './settingsStore';


export class RootStore {
    mutedLocalizationsStore: MutedLocalizationsStore;
    localizationsStore: LocalizationsStore;
    userStore: UserStore;
    errorStore: ErrorStore;
    intervalStore: IntervalStore;
    settingsStore: SettingsStore;
    

    constructor() {
        this.localizationsStore = new LocalizationsStore(this);
        this.mutedLocalizationsStore = new MutedLocalizationsStore(this);
        this.userStore = new UserStore(this);
        this.errorStore = new ErrorStore(this);
        this.intervalStore = new IntervalStore(this);
        this.settingsStore = new SettingsStore(this);
    }
}

export const RootStoreContext = createContext(new RootStore());
