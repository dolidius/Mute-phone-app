import React, { useEffect, useContext } from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { RootStoreContext } from './store/rootStore';
import { observer } from 'mobx-react-lite';
import Screens from './components/Screens/Screens';

const Tab = createBottomTabNavigator();

const App = () => {
    const rootStore = useContext(RootStoreContext);
    const { loadAllLocalizations } = rootStore.mutedLocalizationsStore;
    const { loadIntervals } = rootStore.intervalStore;
    const { loadSettings } = rootStore.settingsStore;


    useEffect(() => {
        loadAllLocalizations();
        loadIntervals();
        loadSettings();
    }, []);

    return (
        <NavigationContainer>
            <Screens Tab={Tab}/>
        </NavigationContainer>
    );
};

export default observer(App);
