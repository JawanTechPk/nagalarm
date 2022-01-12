
import React,{useEffect} from 'react';
import {
  Text,
  Image ,
  View,
  TouchableOpacity
} from 'react-native';
import paint from '../assets/icons/paints.png'
import edit from '../assets/icons/edit.png'
import ToggleSwitch from 'toggle-switch-react-native'
import dropDown from '../assets/icons/dropdown.png'
import deletes from '../assets/icons/trash.png'
import uparrow from '../assets/icons/arrow-up.png'
const AlarmCard = ({editAlarm,deleteAudio,alarnName,alarmTime,alarmKind,alarmType,ellipse,optDis,setOptDis,tg,setTg}) => {
console.log(optDis,'optDis')
  return(

<View style={{marginBottom:10,marginTop:10,width:'100%',backgroundColor:'white',paddingVertical:10,borderRadius:10,elevation:3,paddingLeft:10,paddingRight:10}}>


<View style={{flexDirection:'row',justifyContent:'space-between',}}>
  <View style={{flexDirection:'row',}}>
    <Image source={ellipse} style={{height:15,width:15}} />
  <Text style={{color:'#7d7d7d',fontSize:14,marginTop:-3}}>{alarmType}</Text>
  </View>
  <Text style={{color:'#7d7d7d',fontSize:14,marginTop:-3,}}>Mon Thur</Text>
</View>

<Text style={{fontSize:16,color:'#1e90ff',margin:5}}>{alarnName}</Text>

<View style={{flexDirection:'row',justifyContent:'space-between'}}>

<View style={{flexDirection:'row'}}>
  <Text style={{fontSize:50,color:'#1e90ff'}}>{alarmTime}</Text>
  <Text style={{fontSize:25,marginTop:25,color:'#1e90ff'}}>{alarmKind}</Text>
</View>

<View style={{marginTop:10}}>
  <ToggleSwitch
  isOn={tg}
  onColor="#1e90ff"
  offColor="#e3e3e3"
  label=""
  labelStyle={{ color: "black", fontWeight: "500" }}
  size="medium"
  onToggle={isOn => setTg()}
/>
{
  optDis?
  null:
<TouchableOpacity onPress={()=>setOptDis(true)}>
<Image source={dropDown} style={{height:20,width:20,marginLeft:15,marginTop:10,}}/>
</TouchableOpacity>
}
</View>



</View>

{
  optDis?
<View>
<TouchableOpacity onPress={()=>editAlarm()} style={{borderTopColor:'gray',borderTopWidth:1,flexDirection:'row',paddingVertical:10}}>
<Image source={edit} style={{width:24,marginTop:3,height:24}}/>
<Text style={{fontSize:20,marginLeft:10,color:'gray'}}>Edit</Text>
</TouchableOpacity>
<TouchableOpacity onPress={()=>deleteAudio()} style={{borderTopColor:'gray',borderTopWidth:1,flexDirection:'row',paddingVertical:10}}>
<Image source={deletes} style={{width:24,marginTop:3,height:24}}/>
<Text style={{fontSize:20,marginLeft:10,color:'gray'}}>Delete</Text>
</TouchableOpacity>
<View style={{flexDirection:'row',justifyContent:'space-between',borderTopColor:'gray',borderTopWidth:1,flexDirection:'row',paddingVertical:10}}>
<View>
<View >
<TouchableOpacity style={{flex:1,justifyContent:"flex-end",flexDirection:"row",width:"100%"}} onPress={()=>setOptDis(false)}>
<Image source={uparrow} style={{transform: [{ rotate: '180deg'}],height:20,width:20,marginLeft:15,marginTop:10}}/>
</TouchableOpacity>
</View>
</View>

</View>
</View>
  :null
}


</View>
);
};

export default AlarmCard;
