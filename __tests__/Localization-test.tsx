import 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import ILocalization from '../classess/interfaces/ILocalization';
import { RootStore } from '../store/rootStore';
import Localization from '../classess/Localization';
import IAddress from '../classess/interfaces/IAddress';
import Address from '../classess/Address';
import ICoordinates from '../classess/interfaces/ICoordinates';

const address = new Address('Poland', 'Krakow', '30-002', 'jakas', '34');

const coordinates: ICoordinates = {
    latitude: 1,
    longitude: 2,
    latitudeDelta: 3,
    longitudeDelta: 4,
};

const loc = new Localization(
    '1',
    'siema',
    'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png',
    coordinates,
    address,
    'shop',
);

const root = new RootStore();

describe('Formatting address', () => {
    it('should format the address correctly', () => {
        let formattedString = loc.Address.formatAddress();

        expect(formattedString).toBe('34 jakas 30-002 Krakow');
    });
});

describe('Adding localization', () => {

    beforeEach(() => {
        let {
            SetCurrentLocalization
        } = root.mutedLocalizationsStore;
        SetCurrentLocalization(loc);

    })

    it('should add new localization to local database', async () => {
        let {
            addLocalization,
        } = root.mutedLocalizationsStore;

        await addLocalization();

        let {
            CurrentLocalization
        } = root.mutedLocalizationsStore;


        let muted = await AsyncStorage.getItem('@mutedLocalizations');
        let mutedArr: ILocalization[] = JSON.parse(muted!);

        let exists = false;
        mutedArr.forEach(loc => {
            if (loc.Id === CurrentLocalization!.Id) {
                exists = true;
            }
        });

        expect(exists).toBe(true);
    });

    it('should add new localization to the localizations array', async () => {
        let {
            addLocalization,
            Localizations,
        } = root.mutedLocalizationsStore;

        await addLocalization();

        let {
            CurrentLocalization,
        } = root.mutedLocalizationsStore;

        let exists = false;
        Localizations.forEach((loc: ILocalization) => {
            if (loc.Id === CurrentLocalization!.Id) {
                exists = true;
            }
        });

        expect(exists).toBe(true);
    });
});

describe('Removing localization', () => {
    beforeEach(async () => {
        let { Localizations } = root.mutedLocalizationsStore;
        Localizations.push(loc);
    });
    it('should remove localization from local database', async () => {
        let { removeLocalizationById } = root.mutedLocalizationsStore;

        await removeLocalizationById('1');

        let muted = await AsyncStorage.getItem('@mutedLocalizations');
        let mutedArr: ILocalization[] = JSON.parse(muted!);

        let exists = false;
        mutedArr.forEach(loc => {
            if (loc.Id === '1') {
                exists = true;
            }

            expect(exists).toBe(false);
        });
    });

    it('should remove localization from the localizations array', async () => {
        const { removeLocalizationById } = root.mutedLocalizationsStore;
        await removeLocalizationById('1');
        const { Localizations } = root.mutedLocalizationsStore;
        let exists = false;
        Localizations.forEach((loc: ILocalization) => {
            if (loc.Id === '1') {
                exists = true;
            }

            expect(exists).toBe(false);
        });
    });
});

describe('Loading localizations', () => {
    beforeEach(() => {
        let { Localizations } = root.mutedLocalizationsStore;
        Localizations.push(loc);
    });
    it('should load all muted localizations', async () => {
        const {
            loadAllLocalizations,
            Localizations,
        } = root.mutedLocalizationsStore;

        await loadAllLocalizations();

        Localizations.forEach((localization: ILocalization) => {
            expect(localization).toHaveProperty('Id');
            expect(localization).toHaveProperty('Name');
            expect(localization).toHaveProperty('Icon');
            expect(localization).toHaveProperty('Address');
            expect(localization).toHaveProperty('Type');
            expect(localization).toHaveProperty('Coordinates');
            expect(localization).toHaveProperty('IsMuted');
        });
    });

    it('should load a single localization', async () => {
        const { loadLocalization } = root.mutedLocalizationsStore;

        await loadLocalization(loc.Id, loc.Coordinates);

        const { CurrentLocalization } = root.mutedLocalizationsStore;

        expect(typeof CurrentLocalization).toBe('object');
        expect(CurrentLocalization!.Id).toBe('1');
        expect(CurrentLocalization).toHaveProperty('Id');
        expect(CurrentLocalization).toHaveProperty('Name');
        expect(CurrentLocalization).toHaveProperty('Icon');
        expect(CurrentLocalization).toHaveProperty('Address');
        expect(CurrentLocalization).toHaveProperty('Type');
        expect(CurrentLocalization).toHaveProperty('Coordinates');
        expect(CurrentLocalization).toHaveProperty('IsMuted');
    });
});