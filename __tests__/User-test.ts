import 'react-native';
import { RootStore } from '../store/rootStore';

const root = new RootStore();

jest.mock(
    'react-native-get-location',
    () => ({ getCurrentPosition: () => ({ latitude: 100, longitude: 200 }) }),
    { virtual: true },
);
describe('Current localization', () => {
    it('should update current localization', async () => {
        const { updateCurrentLocation } = root.userStore;
        await updateCurrentLocation();

        const { currentLocalization } = root.userStore;

        expect(currentLocalization).toStrictEqual({
            latitude: 100,
            longitude: 200,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
        });
    });
});
