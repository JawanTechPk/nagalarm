import AudioRecorderPlayer from 'react-native-audio-recorder-player';
// import {useSelector, useDispatch} from 'react-redux';

const audioRecorderPlayer = new AudioRecorderPlayer();
// const dispatch = useDispatch();

export const onStopPlays = async () => {
    // console.log('onStopPlay');
   
    audioRecorderPlayer.stopPlayer()
    audioRecorderPlayer.removePlayBackListener()
  };

const onPlay=async(vol,pathAudio)=>{
    // console.log(audio,'audio testing')
    onStopPlays();
    

    // setAudioTime(recordTime);
    const msg = await audioRecorderPlayer.startPlayer(pathAudio)
    console.log(msg,'message');

    audioRecorderPlayer.addPlayBackListener((e) => {
      audioRecorderPlayer.setVolume(Number(vol)/10)
//       setcurrentPositionSec(e.currentPosition);
//       setcurrentDurationSec(e.duration);
//       setplayTime(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)))
//       setduration(audioRecorderPlayer.mmssss(Math.floor(e.duration)))
//       setSliderInt(e.currentPosition);
//       setSliderEnd(e.duration)
//   console.log(e.currentPosition,e.duration,'duration')
      return;
    });
  }

export{onPlay}