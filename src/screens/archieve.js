import React,{useEffect,useState} from 'react';
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
} from 'react-native';
import ellipse from '../assets/icons/Ellipse.png'
import archieve from '../assets/icons/archieve.png'
import previous from '../assets/icons/previous.png'
import file from '../assets/icons/file.png'
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeletedAlarm from '../components/deletedAlarm';
import {updateData} from '../redux/alarmData/alarm-actions'
import {useSelector, useDispatch} from 'react-redux';
const Archieve = ({navigation,route}) => {
  const [list,setList]= useState([]);
  const dispatch = useDispatch();
useEffect(async()=>{
  const alarmData = await AsyncStorage.getItem('archieveAlarm');
  let res = JSON.parse(alarmData)
  setList(res);
},[])

const deleteItems=async(ind)=>{
let arr = [...list];
arr.splice(ind,1);
setList(arr);
await AsyncStorage.setItem('archieveAlarm',JSON.stringify(arr))
}

const restore=async(ind)=>{
  let arr = [...list];
  let res = arr.slice(ind,ind+1)
  arr.splice(ind,1);
  setList(arr);
  console.log(arr,"resres",res)
  await AsyncStorage.setItem('archieveAlarm',JSON.stringify(arr))
  const alarmData = await AsyncStorage.getItem('alarmsTest');
  let res1 = JSON.parse(alarmData);
  console.log(res1,"res1res1")
  let res2 = [...res1,...res]
  dispatch(updateData(res2))
  await AsyncStorage.setItem('alarmsTest',JSON.stringify(res2))
}

  return (
    <SafeAreaView style={{flex:1,height:100}}>
 
<View style={{flexDirection:'row',justifyContent:'space-between'}}>

<TouchableOpacity onPress={()=>{navigation.navigate('alarms');route.params.getDataAlarm()}} style={{marginLeft:20,marginTop:20,backgroundColor:'white',padding:5,borderRadius:5,elevation:5}}>
<Image style={{height:20,width:20,}} source={previous}/>
  </TouchableOpacity>
  <View>
      </View>
  {/* <Image style={{height:25,width:25,marginRight:20,marginTop:20}} source={archieve}/> */}
</View>

{/* MAIN BODY */}
<View style={{marginLeft:'5%',width:'90%',marginTop:20}}>
<Text style={{fontSize:20,fontWeight:'bold'}}>Archieve</Text>
<View style={{borderBottomColor:'gray',borderBottomWidth:0.5,marginTop:20}}/>

{/* Archieve LIST */}
{
list && list.length > 0?
null:
<View style={{justifyContent:'center',alignItems:'center',marginTop:100}}>
  <Image source={file} style={{marginTop:50,height:100,width:100}}/>
<Text style={{color:'#A9A6A6',fontSize:20}}>Empty</Text>
  </View>
}

  <ScrollView style={{marginBottom:105}} showsVerticalScrollIndicator={false}>

{
  list && list.map((val,ind)=>{
    return <DeletedAlarm key={ind} ellipse={ellipse} 
    deleteItem={()=>deleteItems(ind)}
    restore={()=>restore(ind)}
    // editAlarm={()=>editAlarm(ind)}
    // optDis={val.optDis} 
    // setOptDis={(e)=>uptAlmCardData(e,ind,'optDis')}
    alarmType={val.repeat} alarnName={val.title} alarmKind={val.zoneAP}
    alarmTime={val.timeAP}
    tg={val.status} 
    // deleteAudio={()=>deleteAudio(ind)}
    // setTg={()=>uptAlmCardData(!val.status,ind,'status')}
    />
  })
}

</ScrollView>  

</View>
    </SafeAreaView>
  );
};

export default Archieve;
