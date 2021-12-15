
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
const AlarmCard = ({key,
    alarnName,alarmTime,alarmKind,alarmType,ellipse,
    deleteItem,tg,restore
    
}) => {
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
<TouchableOpacity onPress={()=>deleteItem()} style={{backgroundColor:'#1e90ff',width:100,justifyContent:'center',alignItems:'center',height:30}}>
<Text style={{color:'white',textAlign:'center'}}>Delete</Text>
</TouchableOpacity>
<TouchableOpacity onPress={()=>restore()} style={{marginTop:10,backgroundColor:'#1e90ff',width:100,justifyContent:'center',alignItems:'center',height:30}}>
<Text style={{color:'white',textAlign:'center'}}>Restore</Text>
</TouchableOpacity>

</View>



</View>




</View>
);
};

export default AlarmCard;
