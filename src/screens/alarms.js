import React,{useEffect,useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  useColorScheme,
  View,
  Modal,
  TextInput,
  Platform,
  Linking
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import archieve from '../assets/icons/archieve.png'
import previous from '../assets/icons/previous.png'
import ellipse from '../assets/icons/Ellipse.png'
import AlarmCard from '../components/alarmCard';
import ReactNativeAN from 'react-native-alarm-notification';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import {adjustTime} from '../components/alarmSlotArrange';
import {modalOpen,modalClose} from '../redux/modalRedux/modal-actions';
import {fetchData,updateData} from '../redux/alarmData/alarm-actions';
import {checkDays} from '../util/days';
import {onPlay} from '../components/musicFunc';
import BackgroundJob from 'react-native-background-actions';
import invokeApp from 'react-native-invoke-app';
const sleep = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));
const Alarm = ({navigation,route}) => {
  const [optDis,setOptDis] =useState(false)
  const [tg,setTg] =useState(false);
  const [almCdData,setAlmCdData]=useState([])
  const [modalVisible, setModalVisible] = useState(false);
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [backAc, setbackAc] = useState(false);
  const [zoneTime, setZoneTime] = useState('PM');
  const [date, setDate] = useState(new Date());
  const [hrs, setHrs] = useState('07')
  const [mins, setMins] = useState('05');
  const [editAlInd,setEditAlInd]=useState(100000);
  const dispatch = useDispatch();
  const {modalToggle} = useSelector(
    state => state.modalReducer,
  );
  const {alarms}=useSelector(state=>state.alarmReducer)
// const [almCdData,setAlmCdData]=useState([{
//   optDis:false,
//   alarmMode:true,
//   alarmType:'Custom',
//   alarnName:'Dinner',
//   alarmDays:['Mon','Thurs'],
//   alarmTime:'10:00',
//   alarmKind:'PM',
// },
// {
//   optDis:false,
//   alarmMode:false,
//   alarmType:'Daily',
//   alarnName:'Lunch',
//   alarmDays:['Mon','Thurs'],
//   alarmTime:'2:00',
//   alarmKind:'PM',
// },
// {
//   optDis:false,
//   alarmMode:false,
//   alarmType:'Weekdays',
//   alarnName:'Wake Up',
//   alarmDays:['Mon','Thurs'],
//   alarmTime:'7:00',
//   alarmKind:'AM',
// },
// {
//   optDis:false,
//   alarmMode:false,
//   alarmType:'Weekdays',
//   alarnName:'Wake Up',
//   alarmDays:['Mon','Thurs'],
//   alarmTime:'7:00',
//   alarmKind:'AM',
// },
// {
//   optDis:false,
//   alarmMode:false,
//   alarmType:'Weekdays',
//   alarnName:'Wake Up',
//   alarmDays:['Mon','Thurs'],
//   alarmTime:'7:00',
//   alarmKind:'AM',
// },
// {
//   optDis:false,
//   alarmMode:false,
//   alarmType:'Weekdays',
//   alarnName:'Wake Up',
//   alarmDays:['Mon','Thurs'],
//   alarmTime:'7:00',
//   alarmKind:'AM',
// },
// ])
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
const uptAlmCardData=async(e,ind,prop)=>{
  let arr = [...almCdData];
arr[ind][prop]=e;
setAlmCdData(arr);
dispatch(updateData(arr))
await AsyncStorage.setItem('alarmsTest',JSON.stringify(arr))
}


const taskRandom = async () => {
  if (Platform.OS === 'ios') {
      console.warn(
          'This task will not keep your app alive in the background by itself, use other library like react-native-track-player that use audio,',
          'geolocalization, etc. to keep your app alive in the background while you excute the JS from this library.'
      );
  }
  //   const alarmData = await AsyncStorage.getItem('alarmsTest');
  // console.log(alarmData,'alarmDataalarmData')
  // let alarmDataPr = alarms
  // const alarmDataPr = JSON.parse(alarmData);
  await new Promise(async (resolve) => {
      // For loop with a delay
      // const { delay } = taskData;
      // console.log(BackgroundJob.isRunning(), delay)
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
  // const alarmData = await AsyncStorage.getItem('alarmsTest');
  // console.log(alarmData,'alarmDataalarmData')
  
  setInterval(async() => {
    // const alarmDataPr = JSON.parse(alarmData);
    const alarmData = await AsyncStorage.getItem('alarmsTest');
    console.log(alarmData,'alarmDataalarmData')
    // let alarmDataPr = alarms
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
          invokeApp()
          onPlay(arr2[i].vol,arr2[i].pathAudio);
          setTimeout(()=>{
            dispatch(modalOpen())
          },1000)
          // alert('alarm chala')
      }
      }
    }
  }, 10000);
      for (let i = 0; BackgroundJob.isRunning(); i++) {
          console.log('Runned -> ', i);
          // await BackgroundJob.updateNotification({ taskDesc: 'Alam App Is Running' + i });
          await sleep(1000);
      }
  });
};


const toggleBackground = async () => {
  this.playing = !this.playing;
  // console.log(this.playing,"this.playing 1",BackgroundJob.isRunning())
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

const getDataAlarm=async()=>{
  const alarmData = await AsyncStorage.getItem('alarmsTest');
  if(!alarmData){
    await AsyncStorage.setItem('alarmsTest',JSON.stringify([]))
  }
  let dataUp = JSON.parse(alarmData)
  setAlmCdData(dataUp)
}

// useEffect(()=>{
//   getDataAlarm()
// },[AsyncStorage])

useEffect(async()=>{
  dispatch(fetchData());
  getDataAlarm();
let res = await AsyncStorage.getItem("firstTime");
console.log(res,'resresres',)
if(!res){
  toggleBackground()
  await AsyncStorage.setItem("firstTime",JSON.stringify(true));
}
  // await AsyncStorage.setItem('alarmsTest',JSON.stringify([{"title":"Alarm 1","setDate":"2021-12-04T12:04:55.729Z","status":true,"repeat":"Daily","timeAP":"09:18","zoneAP":"PM","alarms":[{"audioName":"2","vol":9,"pathAudio":"file:///data/user/0/com.nagalarm/files/2.mp3","repeatNum":1,"recordTime":"00:16:54","select":true,"mins":"04","alarmTimeP":"09:18","zoneP":"PM","alarmtimeA":"21:18"},{"audioName":"break","status":false,"pathAudio":"file:///data/user/0/com.nagalarm/files/2.mp3","recordTime":"","repeatNum":1,"select":false,"vol":9,"mins":"10","alarmTimeP":"05:14","zoneP":"PM","alarmtimeA":"17:14"},{"audioName":"1","vol":1,"pathAudio":"file:///data/user/0/com.nagalarm/files/1.mp3","repeatNum":1,"recordTime":"00:03:01","select":true,"mins":1,"alarmTimeP":"06:21","zoneP":"PM","alarmtimeA":"21:21"}]},{"title":"Alarm 1","setDate":"2021-12-04T12:04:55.729Z","status":true,"repeat":"Daily","timeAP":"09:23","zoneAP":"PM","alarms":[{"audioName":"2","vol":9,"pathAudio":"file:///data/user/0/com.nagalarm/files/2.mp3","repeatNum":1,"recordTime":"00:16:54","select":true,"mins":"04","alarmTimeP":"09:23","zoneP":"PM","alarmtimeA":"21:23"},{"audioName":"break","status":false,"pathAudio":"file:///data/user/0/com.nagalarm/files/2.mp3","recordTime":"","repeatNum":1,"select":false,"vol":9,"mins":"10","alarmTimeP":"05:14","zoneP":"PM","alarmtimeA":"17:14"},{"audioName":"1","vol":1,"pathAudio":"file:///data/user/0/com.nagalarm/files/1.mp3","repeatNum":1,"recordTime":"00:03:01","select":true,"mins":1,"alarmTimeP":"09:23","zoneP":"PM","alarmtimeA":"21:24"}]}]))
          // const alarmData = await AsyncStorage.getItem('alarmsTest');
          // if(!alarmData){
          //   await AsyncStorage.setItem('alarmsTest',JSON.stringify([]))
          // }
          // let dataUp = JSON.parse(alarmData)
          // setAlmCdData(dataUp)
  // setbackAc(true)
  // toggleBackground()
  // let dataUp2 = await AsyncStorage.getItem('archieveAlarm');
  // console.log(dataUp2,'dataUp2')
  // let dataUp2 = await AsyncStorage.getItem('archieveAlarm');
},[])


makeid = () => {
  var length = 5;
  var result = '';
  var characters = '0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};



const handleDatePicked = () => {
  let datetime = new Date(2021, 9, 23, 15, 39, 0)
  var currentTime = Date.now();
  if (datetime.getTime() < currentTime) {
    alert('please choose future time');
    // this.hideDateTimePicker();
    return;
  }
  const fireDate = ReactNativeAN.parseDate(datetime);
  console.log('A date has been picked: ', fireDate);

  const alarmNotifData = {
    id: makeid(), // Required
    title: 'Alarm Ringing', // Required
    message: 'My Notification Message', // Required
    channel: 'alarm-channel', // Required. Same id as specified in MainApplication's onCreate method
    ticker: 'My Notification Ticker',
    auto_cancel: true, // default: true
    vibrate: true,
    vibration: 100, // default: 100, no vibration if vibrate: false
    small_icon: 'ic_launcher', // Required
    large_icon: 'ic_launcher',
    play_sound: true,
    sound_name: null, // Plays custom notification ringtone if sound_name: null
    color: 'red',
    schedule_once: true, // Works with ReactNativeAN.scheduleAlarm so alarm fires once
    tag: 'some_tag',
    fire_date: fireDate, // Date for firing alarm, Required for ReactNativeAN.scheduleAlarm.

    // You can add any additional data that is important for the notification
    // It will be added to the PendingIntent along with the rest of the bundle.
    // e.g.
    data: {value: datetime},
  };

  // this.props.add(alarmNotifData);
  ReactNativeAN.scheduleAlarm(alarmNotifData);
  // this.hideDateTimePicker();
};


const deleteAudio=async(ind)=>{
console.log(ind,alarms)
let arr =[...alarms];
let abtArr= arr.slice(ind,ind+1);
arr.splice(ind,1)
console.log(abtArr,"abtArr");
console.log(arr,"arrarr");
// setAlmCdData(arr);
let res =  await AsyncStorage.getItem('archieveAlarm');
let res2 = JSON.parse(res);
console.log(res2)
let res4 = res2==null ?[]:res2 
let res3 = [...res4,...abtArr]
await AsyncStorage.setItem('archieveAlarm',JSON.stringify(res3))
await AsyncStorage.setItem('alarmsTest',JSON.stringify(arr));
dispatch(updateData(arr))
}

const editAlarm=async(ind)=>{
  setEditAlInd(ind);
  setModalVisible(true)
}
const showMode = (currentMode) => {
  setShow(true);
  setMode(currentMode);
};
const showTimepicker = () => {
  showMode('time');
};

const onChange = (event, selectedDate) => {
  const currentDate = selectedDate || date;
  setShow(Platform.OS === 'ios');
  setDate(currentDate);

  // Process the date values
  let tempDate = new Date(currentDate);

  let fTime = tempDate.getHours().toString()+":"+tempDate.getMinutes().toString()

  let timeString = fTime;
  let H = +timeString.substr(0, 2);
  let h = H % 12 || 12;
  // let ampm = H < 13  ? "AM" : "PM";
  let ampm = Number(timeString.substring(0,2).replace(':',"")) <12 ?"AM":"PM"
  setZoneTime(ampm)
  let numCheck = Number(timeString.substring(0,2).replace(':',""))
  let hr = Number(timeString.substring(0,2).replace(':',"")) <10 ?"0"+timeString.substring(0,2).replace(':',""):
  Number(timeString.substring(0,2).replace(':',"")) <=12?
  timeString.substring(0,2).replace(':',""): (h == 10 || h ==11 )?h:"0"+h
  let min = Number(timeString.substring(2,5).replace(':',"")) <10 ?"0"+timeString.substring(2,5).replace(':',"") :timeString.substring(2,5).replace(':',"")

setHrs(hr);
setMins(min);
};


// useEffect(()=>{
//   setAlmCdData(alarms)
// },[alarms])

console.log(alarms,'alarmsalarms')

const saveAlarm=async()=>{
  let arr = [...alarms]
  console.log(arr[editAlInd],hrs+":"+mins,zoneTime)
  // arr[editAlInd].timeAP=hrs+":"+mins;
  // arr[editAlInd].zoneAP=zoneTime,
  // arr[editAlInd].alarms=adjustTime(hrs,mins,arr[editAlInd].alarms,date,zoneTime);
  // console.log(arr[editAlInd])
arr[editAlInd]={...arr[editAlInd],timeAP:hrs+":"+mins,zoneAP:zoneTime,alarms:adjustTime(hrs,mins,arr[editAlInd].alarms,date,zoneTime)}
  setAlmCdData(arr);
  dispatch(updateData(arr))
  await AsyncStorage.setItem('alarmsTest',JSON.stringify(arr))
  setModalVisible(false);
}

  return (
    <SafeAreaView style={{flex:1,height:100,}}>
 
<View style={{flexDirection:'row',justifyContent:'space-between',marginTop:Platform.OS=='ios'?30:0}}>
<Modal
        animationType="slide"
        transparent={true}
        
        visible={modalToggle}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          // setModalVisible(!modalToggle);
        }}
      >
     <View style={styles.centeredView}>

        <TouchableOpacity onPress={()=>{dispatch(modalClose())}} style={{width:'90%',height:50,backgroundColor:'red',alignSelf:'center'}}>
<Text style={{fontSize:26,textAlign:'center'}}>X</Text>
        </TouchableOpacity>
        </View>
             </Modal>
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
            <Text style={styles.modalText}>Edit Time</Text>

{/* AM PM */}
<View style={{flexDirection:'row',justifyContent:'space-around',alignSelf:'center',marginTop:10,width:100,height:35,borderColor:'#1e99fe',padding:2,borderWidth:2}}>
{
zoneTime=="AM"?
<>
<Text style={{backgroundColor:'#1e99fe',paddingHorizontal:2,color:'white',fontSize:18}}>AM</Text>
<Text style={{backgroundColor:'white',paddingHorizontal:2,color:'#1e99fe',fontSize:18}}>PM</Text>
</>
:
<>
<Text style={{backgroundColor:'white',paddingHorizontal:2,color:'#1e99fe',fontSize:18}}>AM</Text>
<Text style={{backgroundColor:'#1e99fe',paddingHorizontal:2,color:'white',fontSize:18}}>PM</Text>
</>
}
</View>

<TouchableOpacity onPress={()=>showTimepicker()} >
<Text style={{marginVertical:50,fontSize:70,letterSpacing:10,color:'#1e99fe',alignSelf:'center'}}>{hrs}:{mins}</Text>
</TouchableOpacity>
{show && (
  <View>
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode='time'
          is24Hour={false}
          display="spinner"
          onChange={onChange}
          themeVariant="light"
          locale="es-ES"
        />

      </View>
      )}

                  </View>
        <View style={{flexDirection:'row',justifyContent:'space-around'}}>
        <TouchableOpacity onPress={()=>setModalVisible(false)} style={{height:40,borderRadius:10,elevation:5,width:'40%',backgroundColor:'white',justifyContent:'center'}}><Text style={{color:'#1e99fe',fontSize:22,textAlign:'center',}}>CANCEL</Text></TouchableOpacity>
        <TouchableOpacity onPress={()=>{saveAlarm();setModalVisible(false)}} style={{height:40,borderRadius:10,elevation:5,width:'40%',backgroundColor:'#1E90FF',justifyContent:'center'}}><Text style={{fontSize:22,textAlign:'center',color:'white'}}>SAVE</Text></TouchableOpacity>
        </View>
          </View>
        </View>
      </Modal>
{/* <View >
  </View> */}
   {/* <TouchableOpacity style={{marginRight:20,marginTop:20}} onPress={()=>toggleBackground()}>
  <Image style={{height:25,width:25}} source={archieve}/>
</TouchableOpacity> */}
<View />
  <TouchableOpacity style={{marginRight:20,marginTop:20}} onPress={()=>navigation.navigate('archieve',{getDataAlarm})}>
  <Image style={{height:25,width:25}} source={archieve}/>
</TouchableOpacity>
</View>

{/* MAIN BODY */}
<View style={{marginLeft:'5%',width:'90%',marginTop:20}}>
<Text style={{fontSize:20,fontWeight:'bold'}}>Nag List</Text>
<View style={{borderBottomColor:'gray',borderBottomWidth:0.5,marginTop:20}}/>
<ScrollView style={{marginBottom:105}} showsVerticalScrollIndicator={false}>

{
alarms!=null && alarms && alarms.length > 0 && alarms.map((val,ind)=>{
    return <AlarmCard key={ind} ellipse={ellipse} 
    editAlarm={()=>editAlarm(ind)}
    optDis={val.optDis} 
    setOptDis={(e)=>uptAlmCardData(e,ind,'optDis')}
    alarmType={val.repeat} alarnName={val.title} alarmKind={val.zoneAP}
    alarmTime={val.timeAP}
    tg={val.status} 
    deleteAudio={()=>deleteAudio(ind)}
    setTg={()=>uptAlmCardData(!val.status,ind,'status')}
    />
  })
}

</ScrollView>
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
  height:380,
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
      // padding:20
  },
  modalText: {
    fontSize:20,
    color:'gray',
    marginBottom:20,
fontWeight:'bold',
    textAlign: "center"
  }
  
})


export default Alarm;


