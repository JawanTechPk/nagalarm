import * as actionTypes from './navigate-types';
import RNFetchBlob from 'rn-fetch-blob';
import RNFS from 'react-native-fs';
import {
      Platform
} from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import AsyncStorage from '@react-native-async-storage/async-storage';
const audioRecorderPlayer = new AudioRecorderPlayer();
export const tabOpen = () => async (dispatch) => {

      dispatch({
            type: actionTypes.TAB_SHOW,
            payload: true
      })

}

export const tabClosed = () => async (dispatch) => {

      dispatch({
            type: actionTypes.TAB_HIDE,
            payload: false
      })

}

export const bottomTabOpens = () => async (dispatch) => {

      dispatch({
            type: actionTypes.TAB_SHOWS,
            payload: true
      })

}

export const bottomTabCloseds = () => async (dispatch) => {

      dispatch({
            type: actionTypes.TAB_HIDES,
            payload: false
      })

}

export const recordStartR=()=>async(dispatch)=>{
      dispatch({
                        type: actionTypes.RECORDSTART,
                        payload: true
                  })
}
export const recordStartCOunt=(recordTime,recordSecs)=>async(dispatch)=>{

      dispatch({
                              type: actionTypes.RECORDSTARTCOUNT,
                              recordTimeR: recordTime,
                             recordSecsR: recordSecs
                        })
}

export const recordPauseR=()=>async(dispatch)=>{
      dispatch({
            type: actionTypes.RECORDPAUSE,
            payload: true,
            recordingStart:true
    })
}

export const recordPauseRCount=(recordTime,recordSecs)=>async(dispatch)=>{

dispatch({
      type: actionTypes.RECORDPAUSECOUNT,
      recordTimeR: recordTime,
      payload: true, recordSecsR: recordSecs,
})

}

export const onStartRecordR = () => async (dispatch) => {
      console.log(Platform,"Platform start")
      const dirs = RNFetchBlob.fs.dirs;
      const path = Platform.select({
            ios: `hellos.m4a`,
            android: `${dirs.CacheDir}/hellos.mp3`,
      });
      // setRecordingStart(true);
      dispatch({
            type: actionTypes.RECORDSTART,
            payload: true
      })
      console.log(path, 'path start')
      const result = await audioRecorderPlayer.startRecorder(path);

      // const result = await audioRecorderPlayer.startRecorder();
      audioRecorderPlayer.addRecordBackListener((e) => {
            dispatch({
                  type: actionTypes.RECORDSTARTCOUNT,
                  recordTimeR: audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
                  payload: true, recordSecsR: e.currentPosition
            })
            //   setrecordSecs(e.currentPosition);
            //   setrecordTime(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)))

            return;
      });
};

export const onStopRecordR = () => async (dispatch) => {
      const result = await audioRecorderPlayer.stopRecorder();
      audioRecorderPlayer.removeRecordBackListener();
      dispatch({
            type: actionTypes.RECORDSTOPCOUNT,
            recordTimeR: '00:00:00',
            payload: true, recordSecsR: 0,
      })
      // setrecordSecs(0);
      // setrecordTime('00:00:00')

      const dirs = RNFetchBlob.fs.dirs;
      // console.log(dirs.CacheDir, 'path stop', RNFS.DocumentDirectoryPath)
      let ext = Platform.OS == 'ios' ? '.m4a' : '.mp3';
      RNFS.readFile(`file://${dirs.CacheDir}/hellos${ext}`, 'base64').then(o => {
            //   setBaseAudio(o)
            console.log(o, 'base64 audio')

            RNFS.writeFile(`file://${RNFS.DocumentDirectoryPath}/hellos${ext}`, o, 'base64').then((e) => { console.log(e) })

      }).catch(e => console.log(e, 'err ==?> asdasd'))
}


// export const pauseRecorderR = () => async (dispatch) => {
//       // setRecordingStart(false);
//       // setRecordingPause(true);
//       dispatch({
//             type: actionTypes.RECORDPAUSE,
//             payload: true,
//             recordingStart:true
//       })
//       const dirs = RNFetchBlob.fs.dirs;
//       const path = Platform.select({
//             ios: `hellos.m4a`,
//             android: `${dirs.CacheDir}/hellos.mp3`,
//       });
//       console.log(path, 'path pause')
//       const result = await audioRecorderPlayer.pauseRecorder(path);
//       audioRecorderPlayer.addRecordBackListener((e) => {
//             dispatch({
//                   type: actionTypes.RECORDPAUSECOUNT,
//                   recordTimeR: audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
//                   payload: true, recordSecsR: e.currentPosition,
//             })
//             //   setrecordSecs(e.currentPosition);
//             //   setrecordTime(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)))

//             return;
//       });

// }


export const resumeRecorderR = () => async (dispatch) => {
      const dirs = RNFetchBlob.fs.dirs;
      const path = Platform.select({
            ios: `hellos.m4a`,
            android: `${dirs.CacheDir}/hellos.mp3`,
      });
      // console.log(path, 'path resume')
      dispatch({
            type: actionTypes.RECORDPAUSE2,
            payload: false
      })
      // setRecordingPause(false)
      const result = await audioRecorderPlayer.resumeRecorder(path);
      audioRecorderPlayer.addRecordBackListener((e) => {
            dispatch({
                  type: actionTypes.RECORDRESUMECOUNT,
                  recordTimeR: audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
                   recordSecsR: e.currentPosition,
            })
            //   setrecordSecs(e.currentPosition);
            //   setrecordTime(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)))

            return;
      });
      // console.log(result, 'started');
}






export const saveAudioR = (recordingName,
      volume,
      repeat,
      recordTime) => async (dispatch) => {
            const result = await audioRecorderPlayer.stopRecorder();
            audioRecorderPlayer.removeRecordBackListener();
            dispatch({
                  type: actionTypes.SAVEAUDIO,
                  recordTimeR: '00:00:00',
                  payload: true, recordSecsR: 0,
            })
            // setrecordSecs(0);
            // setrecordTime('00:00:00')

            const dirs = RNFetchBlob.fs.dirs;
            const paths = Platform.select({
                  ios: `hellos.m4a`,
                  android: `${dirs.CacheDir}/hellos.mp3`,
            });

            let ext = Platform.OS == 'ios' ? '.m4a' : '.mp3';
            let recordingNames = recordingName.replace(/ /g, "");
            let path = `file://${RNFS.DocumentDirectoryPath}/${recordingNames}${ext}`
            RNFS.readFile(`file://${dirs.CacheDir}/hellos${ext}`, 'base64').then(async (o) => {
                  //   setBaseAudio(o)
                  console.log(o, 'base64 audio')

                  RNFS.writeFile(path, o, 'base64').then((e) => { console.log(e, 'success write') })
                  const obj = {
                        audioName: recordingName,
                        vol: volume,
                        pathAudio: path,
                        repeatNum: repeat,
                        recordTime: recordTime,

                  }
                  let arr = [];
                  let audioData = await AsyncStorage.getItem('recording');

                  let audioDataParse = JSON.parse(audioData)
                  if (audioDataParse && audioDataParse.length > 0) {
                        arr = [...audioDataParse]
                        arr.push(obj);
                        AsyncStorage.setItem('recording', JSON.stringify(arr))
                  }
                  else {
                        arr = [obj]
                        AsyncStorage.setItem('recording', JSON.stringify(arr))

                  }

            }).catch(e => console.log(e, 'err ==?> asdasd'))
      }