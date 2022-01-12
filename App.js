/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, { useEffect, useState } from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  PermissionsAndroid,
  Linking,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen'
import {Provider} from 'react-redux';
import store from './src/redux/store';
import MainNavi from './src/config/navigation'
import MainNaviTwo from './src/config/mainNavi'
import BackgroundJob from 'react-native-background-actions';
import SajjadLaunchApplication from 'react-native-launch-application';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import invokeApp from 'react-native-invoke-app';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {checkDays} from './src/util/days';
import {onPlay} from './src/components/musicFunc';
import {modalOpen,modalClose} from './src/redux/modalRedux/modal-actions'
import {useSelector, useDispatch} from 'react-redux';
import {
  NativeBaseProvider,
} from "native-base";
const sleep = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));

BackgroundJob.on('expiration', () => {
    console.log('iOS: I am being closed!');
});



const options = {
    taskName: 'Example',
    taskTitle: 'ExampleTask title',
    taskDesc: 'ExampleTask desc',
    taskIcon: {
        name: 'ic_launcher',
        type: 'mipmap',
    },
    color: '#ff00ff',
    linkingURI: 'exampleScheme://chat/jane',
    parameters: {
        delay: 1000,
    },
};

function handleOpenURL(evt) {
    console.log(evt.url,'evt.url');
    
}

Linking.addEventListener('url', handleOpenURL);



const App = () => {
//  1e90ff
const [firstLaunch, setFirstLaunch] = useState(null);
const [showCom, setShowCom] = useState(false);
// const dispatch = useDispatch();



const taskRandom = async (taskData) => {
  if (Platform.OS === 'ios') {
      console.warn(
          'This task will not keep your app alive in the background by itself, use other library like react-native-track-player that use audio,',
          'geolocalization, etc. to keep your app alive in the background while you excute the JS from this library.'
      );
  }
  await new Promise(async (resolve) => {
      // For loop with a delay
      const { delay } = taskData;
      console.log(BackgroundJob.isRunning(), delay)
      // setInterval(() => {
      //     console.log(BackgroundJob.isRunning())
      // }, 5000);
      console.log(BackgroundJob.isRunning(),"BackgroundJob.isRunning()")
  // setInterval(() => {
  //   // SajjadLaunchApplication.open("com.nagalarm");
  //   // const yourObject = { route: 'tabnavigator' };
  //   console.log('SajjadLaunchApplication.open -> ');
  // // invokeApp({
  // //   data: yourObject,
  // //     })
  // invokeApp()
  // console.log("test 2")
  // }, 10000);
  setInterval(async() => {
    const alarmData = await AsyncStorage.getItem('alarmsTest');
    const alarmDataPr = JSON.parse(alarmData);
    console.log(alarmDataPr,'alarmDataPr');
    if(alarmDataPr.length > 0){
      let arr = []
      const dateSort = await alarmDataPr.filter((e)=>checkDays(e.setDate) < 1) ;
      console.log(dateSort,'dateSort')
      const sortData = await dateSort.filter((e)=>e.status == true);
      // console.log(sortData[0].alarms,"alarmDataPr")
      for(var i = 0;i<sortData.length;i++){
        arr=[...arr,...sortData[i].alarms]
      }
let arr2 = await arr.filter((e)=>e.select == true);
      console.log(arr2,arr2.length,'arr2')
      let newDateHr = new Date().getHours();
      let newDateMn = new Date().getMinutes() < 10 ? "0"+new Date().getMinutes():new Date().getMinutes() ;
      // console.log(alarmData.hrs+alarmData.mins , newDateHr.toString()+(0+newDateMn.toString()))
      for(var i =0;i<arr2.length;i++){
        console.log(arr2[i].alarmtimeA , newDateHr.toString()+":"+(newDateMn.toString()))
        if(arr2[i].alarmtimeA == newDateHr.toString()+":"+(newDateMn.toString())){
          onPlay(arr2[i].vol,arr2[i].pathAudio);
          // dispatch(modalOpen())
          // alert('alarm chala')
      }
      }
    }
  }, 10000);
      for (let i = 0; BackgroundJob.isRunning(); i++) {
          console.log('Runned -> ', i);
          // await BackgroundJob.updateNotification({ taskDesc: 'Alam App Is Running' + i });
          await sleep(delay);
      }
  });
};


const toggleBackground = async () => {
  // this.playing = !this.playing;
  console.log(this.playing,"this.playing")

  if (this.playing) {
      try {
          console.log('Trying to start background service');
          await BackgroundJob.start(taskRandom, options);
          console.log('Successful start!');
      } catch (e) {
          console.log('Error', e);
      }
  } else {
      console.log('Stop background service');
      await BackgroundJob.stop();
  }
};

const perAsk = async () => {
  if (Platform.OS === 'android') {
    try {
      const grants = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ]);

      console.log('write external stroage', grants);

      if (
        grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
        PermissionsAndroid.RESULTS.GRANTED &&
        grants['android.permission.READ_EXTERNAL_STORAGE'] ===
        PermissionsAndroid.RESULTS.GRANTED &&
        grants['android.permission.RECORD_AUDIO'] ===
        PermissionsAndroid.RESULTS.GRANTED
      ) {
        console.log('Permissions granted');
      } else {
        console.log('All required permissions not granted');
        return;
      }
    } catch (err) {
      console.warn(err);
      return;
    }
  }
}
const checkStat=()=>{
  setTimeout(() => {
    setShowCom(true)
  }, 2000);
}

  useEffect(async() => {
    perAsk();
    checkStat()
    SplashScreen.hide();
 const datas =  await  AsyncStorage.getItem('firstlaunch');
console.log(datas,'datas')
if(datas== null){
 await AsyncStorage.setItem("firstlaunch",JSON.stringify(true))
  setFirstLaunch(true)
}else{
  setFirstLaunch(false)
}
 //     AsyncStorage.getItem('firstlaunch').then(value=>{
//     })
    // toggleBackground()
  }, []);

  
console.log(firstLaunch,'firstLaunch')
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        {
showCom ?
firstLaunch?
<MainNaviTwo />
:
          <MainNavi cond={firstLaunch}/>
        :null
        }
</NativeBaseProvider>
    </Provider>

  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
