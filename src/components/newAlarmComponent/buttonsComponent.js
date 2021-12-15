
import React,{useEffect} from 'react';
import {
  Text,
  Image ,
  View,
  Pressable,
  StyleSheet,TouchableOpacity
} from 'react-native';

import plus from '../../assets/icons/plus.png'

const ButtonsComponent = ({navigation,onpress}) => {
return(
<View style={{flexDirection:'row',justifyContent:'space-between'}}>

<TouchableOpacity onPress={()=>onpress()} style={{flexDirection:'row',height:40,marginLeft:10}}>
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
);
};
const styles = StyleSheet.create({
    
});
export default ButtonsComponent;


