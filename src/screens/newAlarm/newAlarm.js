import React,{useEffect,useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,Modal,
  useColorScheme,
  Image,
  View,Platform, TextInput,Pressable,ActionSheetIOS
} from 'react-native';
import {updateData} from '../../redux/alarmData/alarm-actions'
import RBSheet from "react-native-raw-bottom-sheet";
// import DateTimePickerModal from "react-native-modal-datetime-picker";
import DateTimePicker from '@react-native-community/datetimepicker';
import pencil from '../../assets/icons/pencil.png'
import calender from '../../assets/icons/calendargray.png';
import plus from '../../assets/icons/plus.png'
import {Picker} from '@react-native-picker/picker';
import AddNewAlarmList from '../../components/newAlarmComponent/addNewAlarmList'
import ButtonsComponent from '../../components/newAlarmComponent/buttonsComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { min } from 'react-native-reanimated';
import {useSelector, useDispatch} from 'react-redux';
import {onPlay} from '../../components/musicFunc';
import {checkDays} from '../../util/days';
import {modalOpen,modalClose} from '../../redux/modalRedux/modal-actions'
const NewAlarm = ({navigation,route}) => {
  navigation.setOptions({headerShown: false});
  const [rbsheet,setRbSheet] = useState('')
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [title,setTitle] = useState('')
  const [zoneTime, setZoneTime] = useState('PM')
  const [hrs, setHrs] = useState('07')
  const [mins, setMins] = useState('05');
  const [audioSlot,setAudioSlot] =useState([])
  const [dates, setDates] = useState(new Date());
  const [modes, setModes] = useState('date');
  const [shows, setShows] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [selectDaysTitle, setSelectDaysTitle] = useState('Select Days');
  const [selectDate, setSelectDate] = useState('6/11/2021');
  const [breakMin,setBreakMin] = useState(0) 
  const [modalVisible, setModalVisible] = useState(false);
  const [volume, setVolume] = useState(0);
  const [repeat, setRepeat] = useState(0);
  const [daysArr, setDaysArr] = useState([{val:'M',added:false},
  {val:'TU',added:false},{val:'WE',added:false},{val:'TH',added:false},{val:'F',added:false},{val:'SA',added:false},
  {val:'SU',added:false}])
  const dispatch = useDispatch();
  const {modalToggle} = useSelector(
    state => state.modalReducer,
  );
  const [selectDays,setSelectDays]=useState([])
  useEffect(()=>{
    checkAlarm();
    // rbsheet.open()
  },[])


  // console.log(modalToggle,'datedate')

  const adjustTime=(arr)=>{
// console.log(arr);
// setAudioSlot(arr)
    if(arr.length ==1){
  arr[0].alarmTimeP=hrs+":"+mins;
  arr[0].zoneP=zoneTime;
  // let minsss = Number(new Date(date).getMinutes());
  let minsss = mins
  arr[0].alarmtimeA= ((hrs && zoneTime == 'PM') ? (Number(hrs) +12) > 23 ?(Number(hrs) +12) -24 : (Number(hrs) +12)  : hrs)+":"+(minsss <10 ? minsss:minsss);
  arr[0].mins=mins
  console.log(arr,'single data');
  setAudioSlot(arr)
}
else if(arr.length > 1){
  // arr[0].alarmTimeP=hrs+mins;arr[0].zoneP=zoneTime;arr[0].alarmtimeA=new Date(date).getHours()+new Date(date).getMinutes();
  for(var i=1;i<arr.length;i++){
    // console.log(Number(arr[i].mins),"hello ",Number(arr[i-1].mins))
    let minss = (Number(arr[i].mins)+(Number(arr[i-1].alarmtimeA.slice(3)))) <60 ?
    (Number(arr[i].mins)+(Number(arr[i-1].alarmtimeA.slice(3)))):
    (Number(arr[i].mins)+(Number(arr[i-1].alarmtimeA.slice(3))))-60
    let hrss = (Number(arr[i].mins)+(Number(arr[i-1].alarmtimeA.slice(3)))) > 59 ? 
    (Number(arr[i-1].alarmTimeP.slice(0,2)) + 1) <10 ? "0"+(Number(arr[i-1].alarmTimeP.slice(0,2)) + 1): (Number(arr[i-1].alarmTimeP.slice(0,2)) + 1) : arr[i-1].alarmTimeP.slice(0,2)
    arr[i].alarmTimeP=hrss+":"+(minss < 10 ? "0"+minss:minss);
    arr[i].zoneP=zoneTime;
    console.log(Number(arr[i].mins),(arr[i-1].alarmtimeA.slice(3)),Number(arr[i-1].alarmtimeA.slice(0,2).trim(":")))
    let hrsss = (Number(arr[i].mins)+(Number(arr[i-1].alarmtimeA.slice(3)))) > 59 ? 
    (Number(arr[i-1].alarmtimeA.slice(0,2).trim(":")) + 1) >23 ? (Number(arr[i-1].alarmtimeA.slice(0,2).trim(":")) + 1) -24: (Number(arr[i-1].alarmtimeA.slice(0,2).trim(":")) + 1) : arr[i-1].alarmtimeA.slice(0,2).trim(":")
    arr[i].alarmtimeA=hrsss+":"+(minss < 10 ? "0"+minss:minss);
    // arr[i].alarmtimeA=new Date(date).getHours().toString()+":"+(minss < 10 ? "0"+minss:minss);
    // arr[i].alarmtimeA=((Number(arr[i-1].alarmtimeA.slice(0,2)) && zoneTime == 'PM') ? (Number(arr[i-1].alarmtimeA.slice(0,2)) +12) > 23 ?(Number(arr[i-1].alarmtimeA.slice(0,2)) +12) -24 : (Number(arr[i-1].alarmtimeA.slice(0,2)) +12)  : Number(arr[i-1].alarmtimeA.slice(0,2)))+":"+(minss <10 ? "0"+minss:minss)

  }
  console.log(arr,'double data')
  setAudioSlot(arr)
}
  }
// console.log(audioSlot,'audioSlot')
// const adjustTime=()=>{
//   let arr = [{"audioName": "2", "min": 1, "pathAudio": "file:///data/user/0/com.nagalarm/files/2.mp3", "recordTime": "00:16:54", "repeatNum": 1, "select": true, "vol": 9},{"audioName": "2", "min": 1, "pathAudio": "file:///data/user/0/com.nagalarm/files/2.mp3", "recordTime": "00:16:54", "repeatNum": 1, "select": true, "vol": 9}]
// }

  useEffect(()=>{
    // console.log('chal rha')
if(route.params && route.params.audios && route.params.audios.length > 0){
  // console.log(route.params.audios)
  let arr = [...audioSlot,...route.params.audios];
  adjustTime(arr)
}    
  },[route])

  const addBreak=()=>{
    if(breakMin ==0 || !breakMin || breakMin > 59 ){
alert('select correct time')
    }else{
      let obj=
      {"audioName": 'break',status:false, "pathAudio": "file:///data/user/0/com.nagalarm/files/2.mp3", "recordTime": "", "repeatNum": 1, "select": false, "vol": 9,mins:breakMin}
      
      let arr = [...audioSlot,obj];
      // setAudioSlot(arr);
      adjustTime(arr)
    }
  }


  const onChanges = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShows(Platform.OS === 'ios');
    setDates(currentDate);
    console.log(currentDate,"currentDate")
    let tempDate = new Date(currentDate);
    let dateSet = tempDate.getDate().toString()+'/'+(tempDate.getMonth()+1).toString()+'/'+tempDate.getFullYear().toString();
// console.log(dateSet,'dateSet')
setSelectDate(dateSet);
    // setSelectDate()
  };

  const showModes = (currentMode) => {
    setShows(true);
    setModes(currentMode);
  };

  const showDatepickers = () => {
    showModes('date');

  };

  const addFitem = (val, item,ind) => {
    if (val) {
      let arr =[...daysArr];
      arr[ind]['added']=val
      setDaysArr(arr)
    }
    else {
      let arr =[...daysArr];
      arr[ind]['added']=val
      setDaysArr(arr)
    }
  }

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


    // let timesHour = 12;
    // let hrrr = timesHour % 12 || 12;
    // let hr = Number(timesHour) <10 ?"0"+timesHour:
    // Number(timesHour) <=12?
    // timesHour: (hrrr == 10 || hrrr ==11 )?hrrr:"0"+hrrr

setHrs(hr);
setMins(min);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };


  const onChangeAlarmDays = () =>
  ActionSheetIOS.showActionSheetWithOptions(
    {
      options:['Cancel','Repeat',
        'Daily',
        'Weekdays',
        'Weekend',
        'Customs'],
      destructiveButtonIndex: 2,
      cancelButtonIndex: 0,
      userInterfaceStyle: 'dark',
    },
    buttonIndex => {
      if (buttonIndex === 0) {
        // cancel action
      } else if (buttonIndex === 1) {
        setSelectDaysTitle('Repeat');
      } else if (buttonIndex === 2) {
        setSelectDaysTitle('Daily');
      } else if (buttonIndex === 3) {
        setSelectDaysTitle('Weekdays');
      } else if (buttonIndex === 4) {
        setSelectDaysTitle('Weekend');
      
    } else if (buttonIndex === 5) {
      setSelectDaysTitle('Customs');
    }
    },
  );
  const checkAlarm=async()=>{
    const alarmData = await AsyncStorage.getItem('alarmsTest');
    const alarmDataPr = JSON.parse(alarmData);
    console.log(alarmDataPr,'alarmDataPr')
    if(alarmDataPr.length > 0){
      setInterval(async()=>{
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
            dispatch(modalOpen())
            // alert('alarm chala')
        }
        }
      },10000)
    }
  }

const saveAlarm=async()=>{
  // let obj={hrs:"21",
  //   mins:"09"}
  // AsyncStorage.setItem('alarmsTest',JSON.stringify(obj));
 

if(!title){
alert('Enter Title')
}
else if(!date){
  alert('Select Time')
}
else if(selectDate == "6/11/2021"){
  alert('Select Date')
}
else if(selectDaysTitle == "Select Days"){
  alert('Select Days')
}else if(audioSlot.length == 0){
alert('Add Audio')
}
else{
  // await AsyncStorage.removeItem('alarmsTest')
  const alarmData = await AsyncStorage.getItem('alarmsTest');
  console.log( alarmData,'alarmData');
  let data = JSON.parse(alarmData);
  if(data.length > 0){
console.log(alarmData,'alarmData 1');
let newArr = [...data];
let obj = {title,setDate:dates,optDis:false,status:true,repeat:selectDaysTitle,timeAP:hrs+":"+mins,zoneAP:zoneTime,
alarms:audioSlot};
newArr.push(obj);
dispatch(updateData(newArr))
await AsyncStorage.setItem('alarmsTest',JSON.stringify(newArr));
}else{
  console.log(alarmData,'alarmData 2')
  let arr = [{title,setDate:dates,optDis:false,status:true,repeat:selectDaysTitle,timeAP:hrs+":"+mins,zoneAP:zoneTime,
  alarms:audioSlot}]
  dispatch(updateData(arr))
 await AsyncStorage.setItem('alarmsTest',JSON.stringify(arr));
}
setTitle('');
setAudioSlot([]);
setSelectDays('Repeat');
setSelectDate('"6/11/2021"');
setDate(new Date());
navigation.navigate("tabnavigator")
}
//  checkAlarm();
}
// console.log(mins,hrs,'selectDate',dates)
const deleteSlots=(indx)=>{
  let arr=[...audioSlot];
  arr.splice(indx,1);
  adjustTime(arr)
}
  return (
    <SafeAreaView style={{flex:1}}>
<View style={{flex:1,backgroundColor:'white',marginBottom:-20,width:'90%',alignSelf:'center',marginTop:20,elevation:5,borderRadius:10}}>
      <ScrollView>
<View style={{height:1,width:50,backgroundColor:'gray',alignSelf:'center',marginTop:10,marginBottom:30}}/>

{/* HEADER */}
<View style={{flexDirection:'row',borderBottomColor:'gray',borderBottomWidth:0.5,justifyContent:'space-between',}}>
  <TouchableOpacity onPress={()=>navigation.navigate('alarmnav')}>
<Text style={{fontSize:14,marginLeft:10,color:'#1e99fe'}}>Cancel</Text>
  </TouchableOpacity>
<Text style={{fontSize:24,marginTop:-10,color:'gray'}}>Add Alarm</Text>
<TouchableOpacity onPress={()=>saveAlarm()}>
<Text style={{fontSize:14,marginRight:10,color:'#1e99fe'}}>Save</Text>
</TouchableOpacity>
</View>  

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

<TouchableOpacity onPress={()=>showTimepicker()} style={{borderBottomWidth:0.6,borderBottomColor:'gray'}}>
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
        <TouchableOpacity onPress={()=>setShow(false)} style={{width:100,height:40,borderRadius:10,marginBottom:20,justifyContent:'center',alignSelf:'center',backgroundColor:'white',elevation:5,marginTop:20}}>
    <Text style={{textAlign:'center',color:'#1e99fe'}}>Done</Text>
</TouchableOpacity>

      </View>
      )}
      <View style={{flexDirection:'row'}}>
        <Image source={pencil} style={{margin:20,width:20,height:20}}/>
        <TextInput onChangeText={(e)=>setTitle(e)} placeholder="Enter Title" style={{fontSize:20,width:'80%'}}/>
      </View>
      <View style={{borderWidth:0.5,borderColor:'gray'}}/>
      <View style={{flexDirection:'row'}}>
        <Image source={calender} style={{margin:20,width:20,height:20}}/>
        <TouchableOpacity onPress={()=>showDatepickers()}>
<Text style={{marginTop:15,color:'gray',fontSize:20,letterSpacing:10,}}>{selectDate}</Text>
</TouchableOpacity>
</View>
{shows && (
  <View>

       <DateTimePicker
       testID="dateTimePicker"
       value={date}
       mode={modes}
       is24Hour={true}
       display="spinner"
       onChange={onChanges}
       style={{width: 320, backgroundColor: "white"}}
     />
             <TouchableOpacity onPress={()=>setShows(false)} style={{width:100,height:40,borderRadius:10,marginBottom:20,justifyContent:'center',alignSelf:'center',backgroundColor:'white',elevation:5,marginTop:20}}>
    <Text style={{textAlign:'center',color:'#1e99fe'}}>Done</Text>
</TouchableOpacity>
     </View>

      )}
      <View style={{borderWidth:0.5,borderColor:'gray'}}/>
      <View style={{flexDirection:'row'}}>
        <Image source={calender} style={{margin:20,width:20,height:20}}/>
        {Platform.OS === 'ios' ? (
           <TouchableOpacity
           onPress={() => onChangeAlarmDays()} style={{marginTop:20}}>
<Text style={{fontSize:20,color:'gray'}}>{selectDaysTitle}</Text>
             </TouchableOpacity>):
<Picker
                    mode="dropdown"
                    style={{
                      width: '95%',
                      height: 40,
                      fontSize:20,
                      marginBottom: 5,
                      color: 'gray',
                    }}
                    
                    selectedValue={selectDaysTitle}
                    onValueChange={(itemValue, itemIndex) => {
                      setSelectDaysTitle(itemValue);
                    }}
                    >
                    <Picker.Item style={{fontSize:20}} label="Repeat" value="Repeat" />
                    <Picker.Item style={{fontSize:20}} label="Daily" value="Daily" />
                    <Picker.Item style={{fontSize:20}} label="Weekdays" value="Weekdays" />
                    <Picker.Item style={{fontSize:20}} label="Weekend" value="Weekend" />
                    <Picker.Item style={{fontSize:20}} label="Customs" value="Customs" />
                  </Picker>
}
      </View>
{
  selectDaysTitle =='Customs'? 
  <View style={{flexDirection:'row',marginLeft:'5%'}}>
    {
daysArr.map((value,ind)=>{
  const {val,added}=value
  return <TouchableOpacity onPress={()=>addFitem(!added, val,ind)}>
  <Text style={{color:added?'white':'gray',width:30,textAlign:'center',fontSize:16,marginRight:15,backgroundColor:added?'#1e99fe':'white',}}>{val}</Text>
  </TouchableOpacity>
})
    }
</View>
  :null
}
<View style={{borderWidth:0.5,borderColor:'gray',marginBottom:15,marginTop:5}}/>
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
            <Text style={styles.modalText}>Add Break</Text>
            <View style={{flexDirection:'row',borderRadius:10,borderColor:'gray',borderWidth:1,}}>
            <TextInput style={{height:40,width:'80%'}} keyboardType="number-pad" onChangeText={(e)=>setBreakMin(e)}/>
            <View style={{backgroundColor:'#1e99fe',width:'20%',borderTopRightRadius:10,borderBottomRightRadius:10,justifyContent:'center',alignItems:'center'}}>
              <Text style={{color:'white'}}>min</Text>
            </View>
            </View>
                  </View>
        <View style={{flexDirection:'row',justifyContent:'space-around'}}>
        <TouchableOpacity onPress={()=>setModalVisible(false)} style={{height:40,borderRadius:10,elevation:5,width:'40%',backgroundColor:'white',justifyContent:'center'}}><Text style={{color:'#1e99fe',fontSize:22,textAlign:'center',}}>CANCEL</Text></TouchableOpacity>
        <TouchableOpacity onPress={()=>{addBreak();setModalVisible(false)}} style={{height:40,borderRadius:10,elevation:5,width:'40%',backgroundColor:'#1E90FF',justifyContent:'center'}}><Text style={{fontSize:22,textAlign:'center',color:'white'}}>SAVE</Text></TouchableOpacity>
        </View>
          </View>
        </View>
      </Modal>
{
audioSlot && audioSlot.map((v,i)=>{
  return <AddNewAlarmList alarmName={v.audioName} min={v.mins} ind={i} deleteSlot={(indx)=>{deleteSlots(indx)}} time={v.alarmTimeP} timeType={v.zoneP} num={i+1}/>
})

}

{/* <AddNewAlarmList alarmName="Dinner" min="30:00" time="7:30" timeType="AM" num="2"/> */}

<View style={{flexDirection:'row',justifyContent:'space-between'}}>

<TouchableOpacity onPress={()=>setModalVisible(!modalVisible)} style={{flexDirection:'row',height:40,marginLeft:10}}>
<Image source={plus} style={{width:30,height:30,backgroundColor:'white',zIndex:10}}/>
<View style={{backgroundColor:'#1e99fe',height:32,top:0,borderRadius:20,width:120,position:'relative',justifyContent:'center',left:-10}}>
<Text style={{color:'white',textAlign:'center'}}>Add Break</Text>
</View>
</TouchableOpacity>

<TouchableOpacity onPress={()=>navigation.navigate('addalarm')} style={{flexDirection:'row',height:40,marginRight:10}}>
<View style={{backgroundColor:'#1e99fe',height:32,top:0,borderRadius:20,width:120,position:'relative',justifyContent:'center',right:-10}}>
<Text style={{color:'white',textAlign:'center'}}>Add Recording</Text>
</View>
<Image source={plus} style={{width:30,height:30,backgroundColor:'white',zIndex:10}}/>
</TouchableOpacity>

</View>

{/* <ButtonsComponent onpress={()=>setModalVisible(!modalVisible)} navigation={navigation}/> */}

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
  height:180,
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
      padding:20
  },
  modalText: {
    fontSize:20,
    color:'gray',
    marginBottom:20,
fontWeight:'bold',
    textAlign: "center"
  }
  
})

export default NewAlarm;


// [{"title":"Alarm 1","setDate":"2021-12-04T12:04:55.729Z","status":true,"repeat":"Daily","timeAP":"05:50","zoneAP":"PM","alarms":[{"audioName":"2","vol":9,"pathAudio":"file:///data/user/0/com.nagalarm/files/2.mp3","repeatNum":1,"recordTime":"00:16:54","select":true,"mins":"04","alarmTimeP":"05:50","zoneP":"PM","alarmtimeA":"17:50"},{"audioName":"break","status":false,"pathAudio":"file:///data/user/0/com.nagalarm/files/2.mp3","recordTime":"","repeatNum":1,"select":false,"vol":9,"mins":"10","alarmTimeP":"05:14","zoneP":"PM","alarmtimeA":"17:14"},{"audioName":"1","vol":1,"pathAudio":"file:///data/user/0/com.nagalarm/files/1.mp3","repeatNum":1,"recordTime":"00:03:01","select":true,"mins":1,"alarmTimeP":"05:53","zoneP":"PM","alarmtimeA":"17:53"}]},{"title":"Alarm 2","setDate":"2021-12-04T12:04:55.729Z","status":true,"repeat":"Daily","timeAP":"05:56","zoneAP":"PM","alarms":[{"audioName":"2","vol":9,"pathAudio":"file:///data/user/0/com.nagalarm/files/2.mp3","repeatNum":1,"recordTime":"00:16:54","select":true,"mins":"04","alarmTimeP":"05:56","zoneP":"PM","alarmtimeA":"17:56"},{"audioName":"break","status":false,"pathAudio":"file:///data/user/0/com.nagalarm/files/2.mp3","recordTime":"","repeatNum":1,"select":false,"vol":9,"mins":"10","alarmTimeP":"05:14","zoneP":"PM","alarmtimeA":"17:14"},{"audioName":"1","vol":1,"pathAudio":"file:///data/user/0/com.nagalarm/files/1.mp3","repeatNum":1,"recordTime":"00:03:01","select":true,"mins":1,"alarmTimeP":"05:58","zoneP":"PM","alarmtimeA":"17:58"}]}]



// [{"alarmTimeP": "05:50", "alarmtimeA": "17:50", "audioName": "2", "mins": "04", "pathAudio": "file:///data/user/0/com.nagalarm/files/2.mp3", "recordTime": "00:16:54", "repeatNum": 1, "select": true, "vol": 9, "zoneP": "PM"}, {"alarmTimeP": "05:14", "alarmtimeA": "17:14", "audioName": "break", "mins": "10", "pathAudio": "file:///data/user/0/com.nagalarm/files/2.mp3", "recordTime": "", "repeatNum": 1, "select": false, "status": false, "vol": 9, "zoneP": "PM"}, {"alarmTimeP": "05:53", "alarmtimeA": "17:53", "audioName": "1", "mins": 1, "pathAudio": "file:///data/user/0/com.nagalarm/files/1.mp3", "recordTime": "00:03:01", "repeatNum": 1, "select": true, "vol": 1, "zoneP": "PM"}, {"alarmTimeP": "05:56", "alarmtimeA": "17:56", "audioName": "2", "mins": "04", "pathAudio": "file:///data/user/0/com.nagalarm/files/2.mp3", "recordTime": "00:16:54", "repeatNum": 1, "select": true, "vol": 9, "zoneP": "PM"}, {"alarmTimeP": "05:14", "alarmtimeA": "17:14", "audioName": "break", "mins": "10", "pathAudio": "file:///data/user/0/com.nagalarm/files/2.mp3", "recordTime": "", "repeatNum": 1, "select": false, "status": false, "vol": 9, "zoneP": "PM"}, {"alarmTimeP": "05:58", "alarmtimeA": "17:58", "audioName": "1", "mins": 1, "pathAudio": "file:///data/user/0/com.nagalarm/files/1.mp3", "recordTime": "00:03:01", "repeatNum": 1, "select": true, "vol": 1, "zoneP": "PM"}]


// [{"alarmTimeP": "05:50", "alarmtimeA": "17:50", "audioName": "2", "mins": "04", "pathAudio": "file:///data/user/0/com.nagalarm/files/2.mp3", "recordTime": "00:16:54", "repeatNum": 1, "select": true, "vol": 9, "zoneP": "PM"}, {"alarmTimeP": "05:14", "alarmtimeA": "17:14", "audioName": "break", "mins": "10", "pathAudio": "file:///data/user/0/com.nagalarm/files/2.mp3", "recordTime": "", "repeatNum": 1, "select": false, "status": false, "vol": 9, "zoneP": "PM"}, {"alarmTimeP": "05:53", "alarmtimeA": "17:53", "audioName": "1", "mins": 1, "pathAudio": "file:///data/user/0/com.nagalarm/files/1.mp3", "recordTime": "00:03:01", "repeatNum": 1, "select": true, "vol": 1, "zoneP": "PM"}] 

// [{"alarmTimeP": "05:50", "alarmtimeA": "17:50", "audioName": "2", "mins": "04", "pathAudio": "file:///data/user/0/com.nagalarm/files/2.mp3", "recordTime": "00:16:54", "repeatNum": 1, "select": true, "vol": 9, "zoneP": "PM"}, {"alarmTimeP": "05:53", "alarmtimeA": "17:53", "audioName": "1", "mins": 1, "pathAudio": "file:///data/user/0/com.nagalarm/files/1.mp3", "recordTime": "00:03:01", "repeatNum": 1, "select": true, "vol": 1, "zoneP": "PM"}, {"alarmTimeP": "05:56", "alarmtimeA": "17:56", "audioName": "2", "mins": "04", "pathAudio": "file:///data/user/0/com.nagalarm/files/2.mp3", "recordTime": "00:16:54", "repeatNum": 1, "select": true, "vol": 9, "zoneP": "PM"}, {"alarmTimeP": "05:58", "alarmtimeA": "17:58", "audioName": "1", "mins": 1, "pathAudio": "file:///data/user/0/com.nagalarm/files/1.mp3", "recordTime": "00:03:01", "repeatNum": 1, "select": true, "vol": 1, "zoneP": "PM"}]

[{"title":"Alarm 1","setDate":"2021-12-04T12:04:55.729Z","status":true,"repeat":"Daily","timeAP":"09:18","zoneAP":"PM","alarms":[{"audioName":"2","vol":9,"pathAudio":"file:///data/user/0/com.nagalarm/files/2.mp3","repeatNum":1,"recordTime":"00:16:54","select":true,"mins":"04","alarmTimeP":"09:18","zoneP":"PM","alarmtimeA":"21:18"},{"audioName":"break","status":false,"pathAudio":"file:///data/user/0/com.nagalarm/files/2.mp3","recordTime":"","repeatNum":1,"select":false,"vol":9,"mins":"10","alarmTimeP":"05:14","zoneP":"PM","alarmtimeA":"17:14"},{"audioName":"1","vol":1,"pathAudio":"file:///data/user/0/com.nagalarm/files/1.mp3","repeatNum":1,"recordTime":"00:03:01","select":true,"mins":1,"alarmTimeP":"06:21","zoneP":"PM","alarmtimeA":"21:21"}]},{"title":"Alarm 1","setDate":"2021-12-04T12:04:55.729Z","status":true,"repeat":"Daily","timeAP":"09:23","zoneAP":"PM","alarms":[{"audioName":"2","vol":9,"pathAudio":"file:///data/user/0/com.nagalarm/files/2.mp3","repeatNum":1,"recordTime":"00:16:54","select":true,"mins":"04","alarmTimeP":"09:23","zoneP":"PM","alarmtimeA":"21:23"},{"audioName":"break","status":false,"pathAudio":"file:///data/user/0/com.nagalarm/files/2.mp3","recordTime":"","repeatNum":1,"select":false,"vol":9,"mins":"10","alarmTimeP":"05:14","zoneP":"PM","alarmtimeA":"17:14"},{"audioName":"1","vol":1,"pathAudio":"file:///data/user/0/com.nagalarm/files/1.mp3","repeatNum":1,"recordTime":"00:03:01","select":true,"mins":1,"alarmTimeP":"09:23","zoneP":"PM","alarmtimeA":"21:24"}]},{"title":"Alarm 3","setDate":"2021-12-04T17:19:17.041Z","status":true,"repeat":"Daily","timeAP":"10:19","zoneAP":"PM","alarms":[{"audioName":"1","vol":1,"pathAudio":"file:///data/user/0/com.nagalarm/files/1.mp3","repeatNum":1,"recordTime":"00:03:01","select":true,"mins":"19","alarmTimeP":"10:19","zoneP":"PM","alarmtimeA":"22:19"},{"audioName":"break","status":false,"pathAudio":"file:///data/user/0/com.nagalarm/files/2.mp3","recordTime":"","repeatNum":1,"select":false,"vol":9,"mins":"5","alarmTimeP":"10:24","zoneP":"PM","alarmtimeA":"22:24"},{"audioName":"2","vol":9,"pathAudio":"file:///data/user/0/com.nagalarm/files/2.mp3","repeatNum":1,"recordTime":"00:16:54","select":true,"mins":1,"alarmTimeP":"10:25","zoneP":"PM","alarmtimeA":"22:25"}]}] 


[{"alarmTimeP": "09:18", "alarmtimeA": "21:18", "audioName": "2", "mins": "04", "pathAudio": "file:///data/user/0/com.nagalarm/files/2.mp3", "recordTime": "00:16:54", "repeatNum": 1, "select": true, "vol": 9, "zoneP": "PM"}, {"alarmTimeP": "06:21", "alarmtimeA": "21:21", "audioName": "1", "mins": 1, "pathAudio": "file:///data/user/0/com.nagalarm/files/1.mp3", "recordTime": "00:03:01", "repeatNum": 1, "select": true, "vol": 1, "zoneP": "PM"}, {"alarmTimeP": "09:23", "alarmtimeA": "21:23", "audioName": "2", "mins": "04", "pathAudio": "file:///data/user/0/com.nagalarm/files/2.mp3", "recordTime": "00:16:54", "repeatNum": 1, "select": true, "vol": 9, "zoneP": "PM"}, {"alarmTimeP": "09:23", "alarmtimeA": "21:24", "audioName": "1", "mins": 1, "pathAudio": "file:///data/user/0/com.nagalarm/files/1.mp3", "recordTime": "00:03:01", "repeatNum": 1, "select": true, "vol": 1, "zoneP": "PM"}, {"alarmTimeP": "10:19", "alarmtimeA": "22:19", "audioName": "1", "mins": "19", "pathAudio": "file:///data/user/0/com.nagalarm/files/1.mp3", "recordTime": "00:03:01", "repeatNum": 1, "select": true, "vol": 1, "zoneP": "PM"}, {"alarmTimeP": "10:25", "alarmtimeA": "22:25", "audioName": "2", "mins": 1, "pathAudio": "file:///data/user/0/com.nagalarm/files/2.mp3", "recordTime": "00:16:54", "repeatNum": 1, "select": true, "vol": 9, "zoneP": "PM"}]