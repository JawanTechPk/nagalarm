import messaging from '@react-native-firebase/messaging';
import { onPlay } from "../components/musicFunc";


export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    getFcmToken()
  }
}
const getFcmToken = async () => {
  // let checkToken = await AsyncStorage.getItem("fcmToken")
  //  console.log(
  //      "old token", checkToken
  //  )
  // if(!checkToken){
  try {
    const fcmToken = await messaging().getToken()

    // if(!!fcmToken){
    console.log(
      "fcm token generated", fcmToken

    )
    // await AsyncStorage.setItem("fcmToken",fcmToken)
    // }

  } catch (error) {
    console.log("error", error?.message)
  }
  // }



}





  export const notificationListener = async ()=>{

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
      // navigation.navigate(remoteMessage.data.type);
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
          // setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
        }
      });

      messaging().onMessage(remoteMessage => {
        alert(JSON.stringify(remoteMessage))
        onPlay(7,"https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3");

        console.log("Message handled in the forground!",remoteMessage)


      })

  }