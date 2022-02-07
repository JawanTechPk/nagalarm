import React,{useEffect,useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image ,
  Switch,
  useColorScheme,
  View,
  Button
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import recordImg from '../../assets/icons/Group73.png'
import AddRecordingCard from '../../components/addRecordingCard'
import file from '../../assets/icons/file.png'
import RBSheet from "react-native-raw-bottom-sheet";
import recording from '../../assets/icons/recordimg.png'
import recordImg from '../../assets/icons/records.png'

const AddAlarm = ({navigation}) => {
    navigation.setOptions({headerShown: false});
const [recordList,setRecordList]= useState([])
const [rbsheet,setRbSheet] = useState('');

// const onChangeStatus=(val,ind)=>{
// console.log('hello',val)
// let arr =[...recordList];
// arr[ind]['select']=val
// setRecordList(arr)
// }

const getData = async () => {
  // await AsyncStorage.removeItem('recording');
  let userdata = await AsyncStorage.getItem('recording');
  let audioData = await JSON.parse(userdata);
  // console.log(userdata, 'userData');
  for(var i =0;i<audioData.length;i++){
    audioData[i].select=false
  }
  setRecordList(audioData)
};

useEffect(() => {
  (async () => getData())();
}, []);

// console.log(recordList && recordList,"userdata");

const setAudio=async(i,status)=>{
let arr = [...recordList];
arr[i].select=status;
arr[i].mins=1;
setRecordList(arr);
}

function checkAudio(e) {
  return e.select == true;
}

const addAudio=()=>{

  let data = recordList.filter(checkAudio);
  // console.log(data,'data')
  navigation.navigate('newalarm',{audios:data});
}



  return (
    <SafeAreaView style={{flex:1}}>
      <TouchableOpacity >
      <Image source={recordImg} style={{width:70,height:70,marginTop:50,alignSelf:'center'}}/>

{/* <Image source={recording} style={{width:70,height:70,marginTop:50,alignSelf:'center'}}/> */}
<Text style={{fontSize:24,color:'black',textAlign:'center',marginTop:5,fontWeight:"bold"}}>Add Recording</Text>
</TouchableOpacity>
<View style={{borderBottomWidth:0.4,borderBottomColor:"gray",width:"90%",alignSelf:"center",paddingVertical:10}} />

<ScrollView style={{marginHorizontal:5,}}>
<View style={{width:'90%',marginLeft:'5%',paddingBottom:35,paddingTop:10}}>

{
  recordList && recordList.map((val,ind)=>{
    return  <AddRecordingCard txt={val.audioName}  onchange={(i,status)=>setAudio(i,status)} select={val.select} indx={ind} /> 
  })
}

<TouchableOpacity onPress={()=>{addAudio()}} style={{width:100,height:40,borderRadius:10,marginBottom:20,justifyContent:'center',alignSelf:'center',backgroundColor:'white',elevation:5,marginTop:20,}}>
    <Text style={{textAlign:'center',color:'#1e99fe'}}>Add</Text>
</TouchableOpacity>

</View>
</ScrollView>
    </SafeAreaView>
  );
};

export default AddAlarm;
