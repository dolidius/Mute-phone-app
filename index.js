/**
 * @format
 */

import { AppRegistry, LogBox } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import SystemSetting from "react-native-system-setting";

// Ignore log notification by message:
LogBox.ignoreLogs(['Warning: ...']);

// Ignore all log notifications:
LogBox.ignoreAllLogs();

const NotificationHandler = async (message) => {
    console.warn('RNFirebaseBackgroundMessage: ', message);
    return Promise.resolve();
};


AppRegistry.registerComponent(appName, () => App);
