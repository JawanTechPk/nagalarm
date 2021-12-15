/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import Myapp from './myapp';
import {name as appName} from './app.json';





// AppRegistry.registerHeadlessTask('RNPushNotificationActionHandlerTask',()=> notificationActionHandler)
AppRegistry.registerHeadlessTask(
    appName, () => App,
);
AppRegistry.registerComponent(appName, () => App);
