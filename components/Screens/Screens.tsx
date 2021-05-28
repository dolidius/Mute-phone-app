import { TypedNavigator, TabNavigationState } from "@react-navigation/native";
import { BottomTabNavigationOptions, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomTabNavigationEventMap } from "@react-navigation/bottom-tabs/lib/typescript/src/types";
import HomeMap from "./HomeMap";

import React from 'react';

import { Image, NativeModules } from 'react-native';
import MutedLocalizations from "./MutedLocalizations";
import Settings from './Settings';
import MutedTimes from './MutedTimes';

interface IScreens {
    Tab: any,
}

interface IScreen {
    name: string,
    component: () => JSX.Element,
    iconURI: string,
}

// if you want to add a new screen, do it in this array
const screens: IScreen[] = [
    {
        name: "Map",
        component: HomeMap,
        iconURI: "https://www.pngix.com/pngfile/middle/44-449904_map-icon-png-map-icon-png-black-transparent.png"
    },
    {
        name: "Muted Localizations",
        component: MutedLocalizations,
        iconURI: "https://icons-for-free.com/iconfiles/png/512/location+maker+map+icon-1320166084997417306.png"
    },
    {
        name: "Muted Times",
        component: MutedTimes,
        iconURI: "https://www.vhv.rs/dpng/d/411-4111698_alarm-clock-png-icon-png-alarm-clock-png.png"
    },
    {
        name: "Settings",
        component: Settings,
        iconURI: "https://upload.wikimedia.org/wikipedia/commons/6/6d/Windows_Settings_app_icon.png"
    },


]

const Screens: React.FC<IScreens> = ({ Tab }) => {
    return (
        <Tab.Navigator initialRouteName="Map">
            {screens.map((screen: IScreen) => (
                <Tab.Screen
                    key={screen.name}
                    name={screen.name}
                    component={screen.component}
                    options={{
                        title: screen.name,
                        tabBarIcon: () => (
                            <Image
                                style={{ width: 20, height: 20 }}
                                source={{ uri: screen.iconURI }}
                            />
                        )
                    }}
                />
            ))}
        </Tab.Navigator>
    )
}

export default Screens;