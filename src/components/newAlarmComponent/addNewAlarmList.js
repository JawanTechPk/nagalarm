
import React,{useEffect} from 'react';
import {
  Text,
  Image ,
  View,
  Pressable,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import deletes from '../../assets/icons/MoMJCv.png'


const AddNewAlarmList = ({alarmName,
  min,
  time,
  timeType,
  ind,
  deleteSlot,
  num}) => {
return(
    <View style={styles.mainView}>
    <View style={{flexDirection:'row'}}>
      <View style={styles.numberView}>
        <Text style={styles.numberText}>{num}</Text>
      </View>
      <View style={{justifyContent:'center'}}>
        <Text style={{color:'white',fontSize:16}}>{alarmName}</Text>
        <Text style={{color:'white',fontSize:10}}>{min} min</Text>
      </View>    
    </View>
    <View style={{flexDirection:'row',alignItems:'center',paddingRight:10}}>
      <Text style={{color:'white',fontSize:30}}>{time}</Text>
      <Text style={{color:'white',fontSize:14}}>{timeType}</Text>
      <TouchableOpacity onPress={()=>deleteSlot(ind)} style={{position:'relative',top:-20,left:10}}>
      <Image source={deletes} style={{width:25,height:25}}/>
      </TouchableOpacity>
    </View>
    </View>
);
};
const styles = StyleSheet.create({
    mainView:{width:'90%',alignSelf:'center',height:55,flexDirection:'row',justifyContent:'space-between',backgroundColor:'#1e99fe',borderRadius:40,marginBottom:20},
    numberView:{height:40,width:40,margin:7,borderRadius:20,backgroundColor:'white',justifyContent:'center'},
    numberText:{color:'#1e99fe',textAlign:'center',fontSize:20,fontWeight:'bold'}
});
export default AddNewAlarmList;


