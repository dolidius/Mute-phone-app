/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import SystemSetting from "react-native-system-setting";


const NotificationHandler = async (message) => {
    console.warn('RNFirebaseBackgroundMessage: ', message);
    return Promise.resolve();
};


AppRegistry.registerComponent(appName, () => App);
