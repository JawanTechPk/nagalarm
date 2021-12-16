import React,{useEffect,useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image ,
  Dimensions,
  Switch,TextInput,Pressable,
  useColorScheme,
  View,
  Button,Modal,
  Platform,TouchableWithoutFeedback
} from 'react-native';
// import recordImg from '../../assets/icons/Group73.png'
import recordImg from '../../assets/icons/recordss.jpeg'
import forwards from '../../assets/icons/forwards.png'
import backward from '../../assets/icons/backward.png'
import moon from '../../assets/icons/new-moon.png'
import pausewhite from '../../assets/icons/pause-white.png'
import RecordingCard from '../../components/recordingCard'
import file from '../../assets/icons/file.png'
import RBSheet from "react-native-raw-bottom-sheet";
import AsyncStorage, { useAsyncStorage } from '@react-native-async-storage/async-storage';
import RNFetchBlob from 'rn-fetch-blob'
import RNFS from 'react-native-fs';
import { useIsFocused } from '@react-navigation/native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import Increment from '../../components/increment';
import Slider from '@react-native-community/slider';
import Trimmer from 'react-native-trimmer'
import {useSelector, useDispatch} from 'react-redux';

const audioRecorderPlayer = new AudioRecorderPlayer();

const Recording = ({navigation}) => {


const [recordList,setRecordList]= useState([])
const [rbsheet,setRbSheet] = useState('')
const isFocused = useIsFocused();
const [currentPositionSec, setcurrentPositionSec] = useState()
const [currentDurationSec, setcurrentDurationSec] = useState()
const [playTime, setplayTime] = useState()
const [duration, setduration] = useState(10000);
const [selectedAudioName,setSelectedAudioName]=useState('')
const [optInd,setOptInd] =useState('100000')
const [modalVisible, setModalVisible] = useState(false);
const [volume, setVolume] = useState(1);
const [repeat, setRepeat] = useState(1);
const [audioTime,setAudioTime]= useState(100000)
const [recordingName,setRecordingName] = useState('')
const [editSelectInd,setEditSelectInd] = useState('')
const [trimVisible, setTrimVisible] = useState('');
const [sliderInt, setSliderInt] = useState(0);
const [sliderEnd, setSliderEnd] = useState(5000);
const [leftTrim,setLeftTrim] = useState(0);
const [rightTrim,setRightTrim] = useState(0);
const [audioData,setAudioData]=useState("")
const getData = async () => {
  // await AsyncStorage.removeItem('recording');
  let userdata = await AsyncStorage.getItem('recording');
  // console.log(userdata, 'userData');
  setRecordList(JSON.parse(userdata))
};
const {isRecordingScreen}=useSelector(state=>state.navReducer)

// console.log(isRecordingScreen,'main Record isRecordingScreen')

useEffect(() => {
  (async () => getData())();
}, []);

useEffect(() => {
  (async () => getData())();
}, [isFocused]);
// console.log(isFocused,'isFocused');


const onStopPlay = async () => {
  // console.log('onStopPlay');
  rbsheet.close()
  audioRecorderPlayer.stopPlayer()
  audioRecorderPlayer.removePlayBackListener()
};
const onStopPlays = async () => {
  // console.log('onStopPlay');
 
  audioRecorderPlayer.stopPlayer()
  audioRecorderPlayer.removePlayBackListener()
};



const onPlay=async(vol,pathAudio,recordTime,ind)=>{
  // console.log(audio,'audio testing')
  onStopPlays();
  setEditSelectInd(ind)
  console.log(pathAudio,'pathAudio')
  const dirs = RNFetchBlob.fs.dirs;
  const path = Platform.select({
    ios: `${dirs.CacheDir}/hellos.m4a`,
    android: `${dirs.CacheDir}/hellos.mp3`,
  });
  console.log(dirs.CacheDir,'dirs.CacheDir')
  let ext = Platform.OS=='ios'?'.m4a':'.mp3'
  setAudioTime(recordTime)
  // RNFS.writeFile(`${dirs.CacheDir}/hellos.mp3`, pathAudio, 'base64').then((e) => {console.log(e,'eee')})

  const msg = await audioRecorderPlayer.startPlayer(pathAudio)
  console.log(msg,'message');
  audioRecorderPlayer.addPlayBackListener((e) => {
    audioRecorderPlayer.setVolume(Number(vol)/10)
    setcurrentPositionSec(e.currentPosition);
    setcurrentDurationSec(e.duration);
    setplayTime(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)))
    setduration(audioRecorderPlayer.mmssss(Math.floor(e.duration)))
    setSliderInt(e.currentPosition);
    setSliderEnd(e.duration)
console.log(e.currentPosition,e.duration,'duration')
    return;
  });
  
}



useEffect(()=>{
  console.log('testing', playTime, audioTime)

if(duration == playTime) {
  console.log('tested')
 onStopPlays();
}
},[playTime])


const forwardAudio=()=>{
  onStopPlays();
  if(recordList.length < editSelectInd+2){
    console.log("player end")
  }
  else{
    let data=recordList[editSelectInd+1];
    setSelectedAudioName(data.audioName);
    let {vol,pathAudio,recordTime} =data
    onPlay(vol,pathAudio,recordTime,editSelectInd+1)
  }
}

const backwardAudio=()=>{
  console.log(editSelectInd)
  onStopPlays();
  if(editSelectInd == 0){
    console.log("player end")
  }
  else{
    let data=recordList[editSelectInd-1];
    setSelectedAudioName(data.audioName);
    let {vol,pathAudio,recordTime} =data
    onPlay(vol,pathAudio,recordTime,editSelectInd-1)
  }
}



const deleteAudio=(ind)=>{
  // console.log(ind,'sdsa')
  let arr=[...recordList];
  arr.splice(ind,1)
  setRecordList(arr);
  AsyncStorage.setItem('recording',JSON.stringify(arr));
}

const increVol=(val)=>{
  if(val ==10){
    alert('Maximum Volume is 10')
  }
  else{
    setVolume(volume+1)
  }
  }
  const decVol=(val)=>{
    if(val ==1){
      alert('Minimum Volume is 1')
    }
    else{
      setVolume(volume-1)
    }
    }
    const increRepeat=(val)=>{
      if(val ==10){
        alert('Maximum Repeat is 10')
      }
      else{
        setRepeat(repeat+1)
      }
      }
      const decRepeat=(val)=>{
        if(val ==1){
          alert('Minimum Repeat is 1')
        }
        else{
          setRepeat(repeat-1)
        }
        }


const editAudio=(a,b,c,d)=>{
  console.log(a,b,c,d)
setVolume(b);setRepeat(d);
setRecordingName(c);setModalVisible(true);
setOptInd('10000');
setEditSelectInd(a)
}

const updateAudio=()=>{
  let arr=[...recordList];
  arr[editSelectInd]={...arr[editSelectInd],vol:volume,audioName:recordingName,repeatNum:repeat};
setRecordList(arr);
setModalVisible(false);
AsyncStorage.setItem('recording',JSON.stringify(arr));

}

const onRightHandleChange=(newRightHandleValue)=>{
console.log(newRightHandleValue,'newRightHandleValue');
setRightTrim(newRightHandleValue.rightPosition)


}
useEffect(async()=>{
  var data = await AsyncStorage.getItem("trimData");
  var data2 = JSON.parse(data);
  let {audioName} = recordList[editSelectInd]
if(data2.length > 0){
  let filterData = data2.filter((val)=>val.audioName==audioName)
  console.log(filterData[0].trim,"filterData.trim")
  if(filterData[0].trim <= sliderInt){
    onStopPlay();
  }
}
},[sliderInt])


const save=async()=>{

  let obj={
    audioName:audioData.audioName,
    trim:rightTrim,
  }
  var data = await AsyncStorage.getItem("trimData");
var data2 = JSON.parse(data)
console.log(data)
if(!data2){
    console.log('single')
    await AsyncStorage.setItem("trimData",JSON.stringify([obj]))
  }else{
    console.log('double')
    let arr = [...data2,obj];
    await AsyncStorage.setItem("trimData",JSON.stringify(arr))
  }
}
console.log(duration)
// console.log(playTime,duration,'asdsa')
  return (
    <SafeAreaView style={{flex:1,height:'100%'}} >
      <TouchableWithoutFeedback  onPress={()=>setOptInd('10000')}>
        <View style={{flex:1,height:'100%'}}>
      <TouchableOpacity onPress={()=>navigation.navigate('startrecord',{getDatas:getData})}>
<Image source={recordImg} style={{width:90,height:100,marginTop:50,alignSelf:'center'}}/>
<Text style={{fontSize:20,color:'#707070',textAlign:'center',marginTop:5}}>Create Recording</Text>
</TouchableOpacity>
{/* <ScrollView style={{flex:1,marginBottom:80,height:'100%'}}>
<View style={{flex:1,width:'90%',marginLeft:'5%',marginTop:50,}}> */}
<ScrollView style={{flex:1}}>
{/* <View style={{backgroundColor:'red',flex:1}}> */}
{
  recordList && recordList.map((val,ind)=>{
    const {vol,audioName,repeatNum,pathAudio,recordTime}=val
    return <RecordingCard ontrim={()=>{setduration(Number(val.recordTime.replace(/:/g,""))*10);setAudioData(val);trimVisible.open()}} onEdit={(e)=>{editAudio(e,vol,audioName,repeatNum)}} key={ind} optInd={optInd} onDelete={(e)=>deleteAudio(e)} setOptInd={()=>{setOptInd(ind)}} ind={ind}  playVoice={()=>{rbsheet.open();onPlay(vol,pathAudio,recordTime,ind);setSelectedAudioName(audioName)}}   txt={audioName} /> 
  })
}
{/* </View> */}
</ScrollView>

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
            <TextInput value={recordingName} onChangeText={(e)=>setRecordingName(e)} style={{borderBottomColor:'gray',borderBottomWidth:1,height:40}} />
<Increment val={volume} head="Volume" incr={()=>increVol(volume)} decr={()=>decVol(volume)}/>
<Increment val={repeat} head="Repeat" incr={()=>increRepeat(repeat)} decr={()=>decRepeat(repeat)}/>

           
                  </View>
        <View style={{flexDirection:'row'}}>
        <Pressable onPress={()=>setModalVisible(false)} style={{height:40,borderBottomLeftRadius:20,flex:1,backgroundColor:'#1E90FF',justifyContent:'center'}}><Text style={{fontSize:22,textAlign:'center',color:'white',}}>CANCEL</Text></Pressable>
        <Pressable onPress={()=>updateAudio()} style={{height:40,borderBottomRightRadius:20,flex:1,backgroundColor:'#1E90FF',justifyContent:'center'}}><Text style={{fontSize:22,textAlign:'center',color:'white'}}>SAVE</Text></Pressable>
        </View>
          </View>
        </View>
      </Modal>
{/* <Button title="OPEN BOTTOM SHEET" onPress={() => rbsheet.open()} /> */}
        <RBSheet
          ref={ref => {
            setRbSheet(ref);
          }}

          height={130}
          // openDuration={250}
          customStyles={{
            container: {
              // flexDirection:'row',justifyContent:'space-between',
              // alignItems: "center",
              borderRadius:10
            }
          }}
        >
          {/* <View style={{flexDirection:'row',justifyContent:'space-between'}}> */}
<View style={{flexDirection:'row',justifyContent:'space-between',marginTop:20}}>
          <View style={{marginLeft:20,width:'50%'}}>
        <Text style={{color:'#1e99fe',fontWeight:'bold'}}>{selectedAudioName}</Text>
       
</View>
<View style={{flexDirection:'row'}}>
<TouchableOpacity onPress={()=>backwardAudio()} style={{height:30,width:30,borderRadius:20,borderColor:'gray',borderWidth:1,alignItems:'center',justifyContent:'center'}}>
       <Image source={backward} style={{width:10,height:10}}/>
</TouchableOpacity>
<TouchableOpacity onPress={()=>onStopPlay()} style={{marginTop:-5,height:40,marginHorizontal:10,width:40,borderRadius:20,borderColor:'gray',borderWidth:1,alignItems:'center',justifyContent:'center'}}>
       <Image source={pausewhite} style={{width:30,height:30}}/>
</TouchableOpacity>
<TouchableOpacity onPress={()=>forwardAudio()} style={{height:30,width:30,borderRadius:20,marginRight:'5%',borderColor:'gray',borderWidth:1,alignItems:'center',justifyContent:'center'}}>
       <Image source={forwards} style={{width:10,height:10}}/>
</TouchableOpacity>
</View>
</View>
 <Slider
                    style={{ width: '92%',marginTop:10,alignSelf:'center', height: 20 }}
                    minimumValue={0}
                    maximumValue={Number(sliderEnd)}
                    minimumTrackTintColor="#1e99fe"
                    maximumTrackTintColor="#D3D3D3"
                    // thumbTintColor="#52527a"
                    thumbImage={moon}
                    value={sliderInt}
                />

            {/* </View> */}
        </RBSheet>

        <RBSheet
          ref={ref => {
            setTrimVisible(ref);
          }}

          height={400}
          // openDuration={250}
          customStyles={{
            container: {
              // flexDirection:'row',justifyContent:'space-between',
              // alignItems: "center",
              borderRadius:10
            }
          }}
        >
        <View style={{height:50,}}>
     <View style={{flexDirection:'row',justifyContent:'space-between'}}>
       <TouchableOpacity onPress={()=>trimVisible.close()}>
<Text style={{color:'#1e99fe',margin:10}}>Cancel</Text>
       </TouchableOpacity>
<Text style={{color:'#1e99fe',margin:10}}>Trim</Text>
<TouchableOpacity onPress={()=>{save();trimVisible.close()}}>
<Text style={{color:'#1e99fe',margin:10}}>Save</Text>
</TouchableOpacity>
     </View>
        <Trimmer
         tintColor="#1e99fe"
          markerColor="#1e99fe"
          trackBackgroundColor="white"
          trackBorderColor="gray"
          scrubberColor="#b7e778"
          // onHandleChange={this.onHandleChange}
          maximumZoomLevel={100}
          onHandleChange={onRightHandleChange}
          // scrubberPosition={1000}
          totalDuration={duration}
          trimmerLeftHandlePosition={0}
          trimmerRightHandlePosition={rightTrim}
          value={100}
        />

        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
<View style={{marginLeft:'10%'}}>
  <Text style={{color:'#1e99fe'}}>Start</Text>
  <View style={{height:40,width:120,borderColor:'#1e99fe',borderRadius:5,borderWidth:1.5,alignItems:'center',justifyContent:'center'}}>
<Text style={{color:'#1e99fe'}}>00:00</Text>
  </View>
  
</View>
<View style={{marginRight:'10%'}}>
  <Text style={{color:'#1e99fe'}}>End</Text>
  <View style={{height:40,width:120,borderColor:'#1e99fe',borderRadius:5,borderWidth:1.5,alignItems:'center',justifyContent:'center'}}>
<Text style={{color:'#1e99fe'}}>{Math.floor((rightTrim/1000/60) << 0)}:
{Math.floor((rightTrim/1000) % 60)}</Text> 

  </View>
  
</View>
        </View>
        {/* <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:10}}>
<View style={{marginLeft:'10%'}}>
  <Text style={{color:'#1e99fe'}}>Total Time</Text>
  <View style={{height:40,width:120,borderColor:'#1e99fe',borderRadius:5,borderWidth:1.5,alignItems:'center',justifyContent:'center'}}>
<Text style={{color:'#1e99fe'}}>00:00:00</Text>
  </View>
  
</View>
<View style={{marginRight:'10%'}}>
  <Text style={{color:'#1e99fe'}}>Trimmed Time</Text>
  <View style={{height:40,width:120,borderColor:'#1e99fe',borderRadius:5,borderWidth:1.5,alignItems:'center',justifyContent:'center'}}>
<Text style={{color:'#1e99fe'}}>00:00:00</Text>
  </View>
  
</View>
        </View> */}
      </View>
        </RBSheet>

</View>
{/* </ScrollView>
</View> */}
</TouchableWithoutFeedback>
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
  height:250,
    width:'80%',

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
  modalFirstView:{
      padding:30
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width:100,
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
    fontSize:16,
    color:'gray',
fontWeight:'bold',
    textAlign: "left"
  }
});



export default Recording;
