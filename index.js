/**
 * @format
 */
 import React,{useEffect} from "react"

import {AppRegistry} from 'react-native';
import App from './App';
import Myapp from './myapp';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import { onPlay } from "./src/components/musicFunc";

// onPlay(7,"https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3");

messaging()
    .getIsHeadless()
    .then(isHeadless => {
      // do sth with isHeadless
      console.log(isHeadless, "isHeadless")
    });
messaging().setBackgroundMessageHandler( remoteMessage => {
    console.log('Message handled in the backgrounds!', remoteMessage);
    setTimeout(() => {
        onPlay(7,"https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3");

    },3000)
    // Linking.openURL("https://www.google.com/")  
  });

// AppRegistry.registerHeadlessTask('RNPushNotificationActionHandlerTask',()=> notificationActionHandler)
AppRegistry.registerHeadlessTask(
    appName, () => App,
);


function HeadlessCheck({ isHeadless }) {
    console.log("headdd",isHeadless)
    if (isHeadless) {
      console.log("hello inner headless")
      // App has been launched in the background by iOS, ignore
      return null;
    }
    return <App />;
  }
 
 
 
 AppRegistry.registerComponent(appName, () => HeadlessCheck);
// AppRegistry.registerComponent(appName, () => App);
