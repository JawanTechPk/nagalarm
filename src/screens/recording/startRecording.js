import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  useColorScheme,
  View,
  TextInput,
  Modal, Pressable,
  Platform
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import previous from '../../assets/icons/previous.png'
import recording from '../../assets/icons/recordimg.png'
import deletered from '../../assets/icons/deletered.png'
import playBtn from '../../assets/icons/record.png'
import tick from '../../assets/icons/tick.png'
import Increment from '../../components/increment';
import pause from '../../assets/icons/pause.png';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import RNFetchBlob from 'rn-fetch-blob'
import RNFS from 'react-native-fs';
import recordImg from '../../assets/icons/recordss.jpeg'
import { tabOpen,saveAudioR, tabClosed,onStartRecordR,onStopRecordR,resumeRecorderR,pauseRecorderR } from '../../redux/navigateTabRedux/navigate-action'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigationState } from '@react-navigation/native';

const audioRecorderPlayer = new AudioRecorderPlayer();

const StartRecording = ({ navigation, route }) => {
  console.log("enddddddn2222222222222333", isRecordingScreen)

  const [modalVisible, setModalVisible] = useState(false);
  const [volume, setVolume] = useState(1);
  const [repeat, setRepeat] = useState(1);
  const [recordingStart, setRecordingStart] = useState(false);
  const [recordSecs, setrecordSecs] = useState()
  const [recordTime, setrecordTime] = useState('00:00:00')
  const [currentPositionSec, setcurrentPositionSec] = useState()
  const [currentDurationSec, setcurrentDurationSec] = useState()
  const [playTime, setplayTime] = useState()
  const [duration, setduration] = useState();
  const [baseAudio, setBaseAudio] = useState('')
  const [recordingName, setRecordingName] = useState('')
  const [recordingPause, setRecordingPause] = useState(false);
  const { isRecordingScreen,recordTimeR,
    recordSecsR } = useSelector(state => state.navReducer)
  const dispatch = useDispatch();

  const state = useNavigationState(state => state);
  const routeName = (state.routeNames[state.index]);

  // console.log("RNFS",RNFS.readDir(RNFS.DocumentDirectoryPath))
  // useEffect(()=>{
  //   RNFS.readFile(`file:///${RNFS.DocumentDirectoryPath.replace('file://','')}/asd a.mp3`,'base64','sdfdsf')
  //   .then((e)=>console.log(e,'success'))
  //   .catch((err)=>console.log(err,'error'))
  // },[])

  // console.log("RNFS",RNFS.DocumentDirectoryPath)

  // // const navigation = useNavigation()
  // useEffect(() => {
    // const unsubscribe = navigation.addListener('focus', () => {
    //   if (isRecordingScreen)
    //     navigation.navigate("recording")
    //   // The screen is focused
    //   // Call any action
    //   // navigation.navigate("recording")
    // });

  //   //     // Return the function to unsubscribe from the event so it gets removed on unmount
  //   return unsubscribe;
  // }, [navigation]);

  useEffect(() => {
    dispatch(tabOpen()) // true
    return () => { dispatch(tabClosed()) } // false
  }, [])


  const onStopRecord = async () => {
    dispatch(onStopRecordR());
    // const result = await audioRecorderPlayer.stopRecorder();
    // audioRecorderPlayer.removeRecordBackListener();

    // setrecordSecs(0);
    // setrecordTime('00:00:00')
    // const dirs = RNFetchBlob.fs.dirs;
    // console.log(dirs.CacheDir, 'path stop', RNFS.DocumentDirectoryPath)

    // RNFS.readFile(`file://${dirs.CacheDir}/hellos.m4a`, 'base64').then(o => {
    //   setBaseAudio(o)
    //   console.log(o, 'base64 audio')

    //   RNFS.writeFile(`file://${RNFS.DocumentDirectoryPath}/hellos.m4a`, o, 'base64').then((e) => { console.log(e) })

    //   // const playSound = () => {
    //   // const sound = new Sound("file:////data/user/0/com.recordingapp/cache/hellos.mp3", '', () => callback(sound))
    //   // }
    //   // const callback = () => sound.play(successCallback)

    // }).catch(e => console.log(e, 'err ==?> asdasd'))


    //       RNFS.writeFile("file:////data/user/0/com.recordingapp/cache/hellos.mp3", o, 'base64')
    //       .then((e) => {console.log(e)})
    //       .catch((err)=>{
    // console.log(err,'err')
    //       })
    // console.log(dirs,dirs.CacheDir,'dirs.CacheDir')


    // ANDROID
    //   RNFS.readFile(`file://${dirs.CacheDir}/hellos.mp3`,'base64').then(o => {
    //     setBaseAudio(o)
    //     console.log( o, 'base64 audio')

    //     RNFS.writeFile(`file://${RNFS.DocumentDirectoryPath}/hellos.mp3`, o, 'base64').then((e) => {console.log(e)})

    //     // const playSound = () => {
    //     // const sound = new Sound("file:////data/user/0/com.recordingapp/cache/hellos.mp3", '', () => callback(sound))
    //     // }
    //     // const callback = () => sound.play(successCallback)

    // }).catch(e=>console.log(e,'err ==?> asdasd'))


    // RNFetchBlob.fs.readFile('/data/user/0/com.recordingapp/cache/hello.mp3')
    //   .then(r => {
    //     console.log('kkk',r, 'moved file response')
    //   })
    //   .catch(e => console.log(e, 'error in moved file response'))
    // console.log(result);
  };


  const increVol = (val) => {
    if (val == 10) {
      alert('Maximum Volume is 10')
    }
    else {
      setVolume(volume + 1)
    }
  }
  const decVol = (val) => {
    if (val == 1) {
      alert('Minimum Volume is 1')
    }
    else {
      setVolume(volume - 1)
    }
  }
  const increRepeat = (val) => {
    if (val == 10) {
      alert('Maximum Repeat is 10')
    }
    else {
      setRepeat(repeat + 1)
    }
  }
  const decRepeat = (val) => {
    if (val == 1) {
      alert('Minimum Repeat is 1')
    }
    else {
      setRepeat(repeat - 1)
    }
  }

  const saveAudio = async () => {
    if (!recordingName) {
      alert('Enter Recording')
    }
    else {
      setModalVisible(false);
      dispatch(saveAudioR(recordingName,
        volume,
repeat,
recordTimeR,))
      // const result = await audioRecorderPlayer.stopRecorder();
      // audioRecorderPlayer.removeRecordBackListener();

      // setrecordSecs(0);
      // setrecordTime('00:00:00')

      // const dirs = RNFetchBlob.fs.dirs;
      // const paths = Platform.select({
      //   ios: `hellos.m4a`,
      //   android: `${dirs.CacheDir}/hellos.mp3`,
      // });

      // let ext = Platform.OS == 'ios' ? '.m4a' : '.mp3';
      // let recordingNames = recordingName.replace(/ /g, "");
      // let path = `file://${RNFS.DocumentDirectoryPath}/${recordingNames}${ext}`
      // RNFS.readFile(`file://${dirs.CacheDir}/hellos${ext}`, 'base64').then(async (o) => {
      //   setBaseAudio(o)
      //   console.log(o, 'base64 audio')

      //   RNFS.writeFile(path, o, 'base64').then((e) => { console.log(e, 'success write') })
      //   const obj = {
      //     audioName: recordingName,
      //     vol: volume,
      //     pathAudio: path,
      //     repeatNum: repeat,
      //     recordTime: recordTime,
        
      //   }
      //   let arr = [];
      //   let audioData = await AsyncStorage.getItem('recording');
        
      //   let audioDataParse = JSON.parse(audioData)
      //   if (audioDataParse && audioDataParse.length > 0) {
      //     arr = [...audioDataParse]
      //     arr.push(obj);
      //     AsyncStorage.setItem('recording', JSON.stringify(arr))
      //   }
      //   else {
      //     arr = [obj]
      //     AsyncStorage.setItem('recording', JSON.stringify(arr))

      //   }

      // }).catch(e => console.log(e, 'err ==?> asdasd'))

    }
  }

  // const saveAudio = async () => {
  //   if (!recordingName) {
  //     alert('Enter Recording')
  //   }
  //   else {
  //     setModalVisible(false)
  //     const result = await audioRecorderPlayer.stopRecorder();
  //     audioRecorderPlayer.removeRecordBackListener();

  //     setrecordSecs(0);
  //     setrecordTime('00:00:00')
  //     // const dirs = RNFetchBlob.fs.dirs;

  //     // const dirs = RNFetchBlob.fs.dirs;
  //     // const paths = Platform.select({
  //     //   ios: `hellos.m4a`,
  //     //   android: `${dirs.CacheDir}/hellos.mp3`,
  //     // });
  //     // let ext = Platform.OS=='ios'?'.m4a':'.mp3'
  //     // let path=`${RNFS.DocumentDirectoryPath}/${recordingName}${ext}`
  //     // await RNFS.downloadFile({
  //     //   fromUrl:`file:///${dirs.CacheDir}/hellos${ext}`,
  //     //   toFile:path,
  //     //   readTimeout:15000,
  //     //   connectionTimeout:10000
  //     // })
  //     // const obj={
  //     //         audioName:recordingName,
  //     //         vol:volume,
  //     //         pathAudio:path,
  //     //         repeatNum:repeat,
  //     //         // originalAudio:o,
  //     //         // repeatAudio:o.repeat(Number(repeat)),
  //     //         // repeatAudio:removeEq.repeat(Number(repeat))+'=',
  //     //         recordTime:recordTime,
  //     //         // repeatAudio:o
  //     //       }
  //     //       let arr=[];
  //     //       let audioData = await AsyncStorage.getItem('recording'); 
  //     //       // console.log(audioData,'audioData')
  //     //       let audioDataParse = JSON.parse(audioData)
  //     //       if(audioDataParse && audioDataParse.length >0){
  //     //     arr=[...audioDataParse]
  //     //         arr.push(obj);
  //     //     AsyncStorage.setItem('recording',JSON.stringify(arr))
  //     //       }
  //     //       else{
  //     //         arr=[obj]
  //     //         AsyncStorage.setItem('recording',JSON.stringify(arr))

  //     //       }

  //     // MINE APPROACH WITH BASE 64
  //     const dirs = RNFetchBlob.fs.dirs;
  //     const paths = Platform.select({
  //       ios: `hellos.m4a`,
  //       android: `${dirs.CacheDir}/hellos.mp3`,
  //     });
  //     // console.log(dirs,dirs.CacheDir,'dirs.CacheDir')

  //     // const dirs = RNFetchBlob.fs.dirs;
  //     let ext = Platform.OS == 'ios' ? '.m4a' : '.mp3';
  //     let recordingNames = recordingName.replace(/ /g, "");
  //     let path = `file://${RNFS.DocumentDirectoryPath}/${recordingNames}${ext}`
  //     RNFS.readFile(`file://${dirs.CacheDir}/hellos${ext}`, 'base64').then(async (o) => {
  //       setBaseAudio(o)
  //       console.log(o, 'base64 audio')

  //       RNFS.writeFile(path, o, 'base64').then((e) => { console.log(e, 'success write') })
  //       const obj = {
  //         audioName: recordingName,
  //         vol: volume,
  //         pathAudio: path,
  //         repeatNum: repeat,
  //         // originalAudio:o,
  //         // repeatAudio:o.repeat(Number(repeat)),
  //         // repeatAudio:removeEq.repeat(Number(repeat))+'=',
  //         recordTime: recordTime,
  //         // repeatAudio:o
  //       }
  //       let arr = [];
  //       let audioData = await AsyncStorage.getItem('recording');
  //       // console.log(audioData,'audioData')
  //       let audioDataParse = JSON.parse(audioData)
  //       if (audioDataParse && audioDataParse.length > 0) {
  //         arr = [...audioDataParse]
  //         arr.push(obj);
  //         AsyncStorage.setItem('recording', JSON.stringify(arr))
  //       }
  //       else {
  //         arr = [obj]
  //         AsyncStorage.setItem('recording', JSON.stringify(arr))

  //       }

  //     }).catch(e => console.log(e, 'err ==?> asdasd'))
  //     // MINE APPROACH WITH BASE 64 END

  //     // RNFS.readFile(`${dirs.CacheDir}/hellos.mp3`,'base64').then(async(o) => {
  //     //           RNFS.readFile('hellos.m4a','base64').then(async(o) => {
  //     //     let removeEq = o.replace('/=','')
  //     //     const obj={
  //     //       audioName:recordingName,
  //     //       vol:volume,
  //     //       repeatNum:repeat,
  //     //       originalAudio:o,
  //     //       // repeatAudio:o.repeat(Number(repeat)),
  //     //       // repeatAudio:removeEq.repeat(Number(repeat))+'=',
  //     //       recordTime:recordTime,
  //     //       repeatAudio:o
  //     //     }
  //     //     let arr=[];
  //     //     let audioData = await AsyncStorage.getItem('recording'); 
  //     //     // console.log(audioData,'audioData')
  //     //     let audioDataParse = JSON.parse(audioData)
  //     //     if(audioDataParse && audioDataParse.length >0){
  //     //   arr=[...audioDataParse]
  //     //       arr.push(obj);
  //     //   AsyncStorage.setItem('recording',JSON.stringify(arr))
  //     //     }
  //     //     else{
  //     //       arr=[obj]
  //     //       AsyncStorage.setItem('recording',JSON.stringify(arr))

  //     //     }
  //     //     // setBaseAudio(o)
  //     //     // console.log( o, 'base64 audio')
  //     // }).catch(e=>console.log(e,'err ==?> asdasd'))
  //     // route.params.getDatas();
  //     // navigation.navigate('recording');
  //   }
  // }


  // useEffect(async()=>{
  //   const obj={
  //     audioName:recordingName,
  //     vol:volume,
  //     repeat,repeat,
  //     audio:baseAudio
  //   }
  //   let arr=[];
  //   let audioData = await AsyncStorage.getItem('recording'); 
  //   console.log(audioData,'audioData')
  //   let audioDataParse = JSON.parse(audioData)
  //   if(audioDataParse && audioDataParse.length >0){
  // arr=[...audioDataParse]
  //     arr.push(obj);
  // AsyncStorage.setItem('recording',JSON.stringify(arr))
  //   }
  //   else{
  //     arr=[obj]
  //     AsyncStorage.setItem('recording',JSON.stringify(arr))

  //   }
  // },[baseAudio])

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'space-between' }}>
      <View>

        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>

          <TouchableOpacity onPress={() => navigation.navigate('recording')} style={{ marginLeft: 20, marginTop: 20, backgroundColor: 'white', padding: 5, borderRadius: 5, elevation: 5 }}>
            <Image style={{ height: 20, width: 20, }} source={previous} />
          </TouchableOpacity>
        </View>

        {/* MAIN BODY */}
        <View style={{ marginLeft: '5%', width: '90%', marginTop: 20 }}>

          <Image source={recordImg} style={{ width: 100, height: 100, alignSelf: 'center', marginTop: -30 }} />


          <Text style={{ color: '#707070', textAlign: 'center', fontSize: 16 }}>Recording</Text>

          {/* MIDDLE COUNT */}
          <View style={{ marginTop: 80 }}>
            <Text style={{ color: '#707070', textAlign: 'center', fontSize: 14 }}>Recording Time</Text>
            <Text style={{ color: '#1e90ff', textAlign: 'center', fontSize: 70 }}>{recordTimeR}</Text>
            {/* <TouchableOpacity onPress={() => { onStartRecord() }}>
        <Text>Start Recording</Text>
        <Text>{recordTime}</Text>
        <Text>{recordSecs}</Text>
      </TouchableOpacity>

      
      <TouchableOpacity onPress={() => { pauseRecorder() }}>
        <Text>pause Recorder</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => { resumeRecorder() }}>
        <Text>Resume Recording</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => { onStopRecord() }}>
        <Text>Stop Recording</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => { onStartPlay() }}>
        <Text>Start Playing</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => { onStopPlay() }}>
        <Text>Stop Playing</Text>
      </TouchableOpacity> */}
          </View>
          {/* MODAL  */}
          <Modal
            animationType="slide"
            transparent={true}

            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View style={styles.modalFirstView}>
                  <Text style={styles.modalText}>Recording Name</Text>
                  <TextInput onChangeText={(e) => setRecordingName(e)} style={{ borderBottomColor: 'gray', borderBottomWidth: 1, height: 40 }} />
                  <Increment val={volume} head="Volume" incr={() => increVol(volume)} decr={() => decVol(volume)} />
                  {/* <Increment val={repeat} head="Repeat" incr={() => increRepeat(repeat)} decr={() => decRepeat(repeat)} /> */}


                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Pressable onPress={() => setModalVisible(false)} style={{ height: 40, borderBottomLeftRadius: 20, flex: 1, backgroundColor: '#1E90FF', justifyContent: 'center' }}><Text style={{ fontSize: 22, textAlign: 'center', color: 'white', }}>CANCEL</Text></Pressable>
                  <Pressable onPress={() =>{ saveAudio();onStopRecord()}} style={{ height: 40, borderBottomRightRadius: 20, flex: 1, backgroundColor: '#1E90FF', justifyContent: 'center' }}><Text style={{ fontSize: 22, textAlign: 'center', color: 'white' }}>SAVE</Text></Pressable>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </View>

      {/* BOTTOM OPTION */}
      <View>
        {/* {recordingStart ?
          recordingPause ?

            <TouchableOpacity onPress={() => { resumeRecorder() }}>
              <Image source={playBtn} style={{ width: 100, height: 100, alignSelf: 'center' }} />
            </TouchableOpacity>
            :

            <TouchableOpacity onPress={() => { pauseRecorder() }}>
              <Image source={pause} style={{ width: 100, height: 100, alignSelf: 'center' }} />
            </TouchableOpacity> : <TouchableOpacity onPress={() => { onStartRecord() }}>
            <Image source={playBtn} style={{ width: 100, height: 100, alignSelf: 'center' }} />
          </TouchableOpacity>

        } */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity onPress={() => onStopRecord()}>
            <Image source={deletered} style={{ margin: 20, height: 20, width: 20 }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() =>{  dispatch(pauseRecorderR(audioRecorderPlayer));
 setModalVisible(!modalVisible)}}>
            <Image source={tick} style={{ margin: 20, height: 20, width: 25 }} />
          </TouchableOpacity>
        </View>
      </View>


    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,

  },
  modalView: {
    margin: 0,
    backgroundColor: "white",
    borderRadius: 20,
    //   padding: 35,
    height: 208,
    width: '80%',

    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalFirstView: {
    padding: 30
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: 100,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "left"
  },
  modalText: {
    fontSize: 16,
    color: 'gray',
    fontWeight: 'bold',
    textAlign: "left"
  }
});


export default StartRecording;
