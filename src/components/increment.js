
import React,{useEffect} from 'react';
import {
  Text,
  Image ,
  View,
  Pressable,
  StyleSheet
} from 'react-native';



const Increment = ({val,head,incr,decr}) => {
return(
    <View style={{marginTop:20,flexDirection:'row',justifyContent:'space-between'}}>
            <Text style={styles.modalText}>{head}</Text>
    <View style={{flexDirection:'row'}}>
    <Pressable onPress={()=>decr()} style={{height:25,width:30,borderTopLeftRadius:10,borderBottomLeftRadius:10,backgroundColor:'#1E90FF'}}><Text style={{fontSize:30,fontWeight:'bold',position:'relative',top:-11,left:11,color:'white'}}>-</Text></Pressable>
                <View style={{height:25,width:30,backgroundColor:'#AFDFFF'}}>
    <Text style={{textAlign:'center',color:'#1e90ff'}}>{val}</Text>
                </View>
                <Pressable onPress={()=>incr()} style={{height:25,width:30,borderTopRightRadius:10,borderBottomRightRadius:10,backgroundColor:'#1E90FF'}}><Text style={{fontSize:22,fontWeight:'bold',position:'relative',top:-5,left:9,color:'white'}}>+</Text></Pressable>
                </View>
                 </View>
);
};
const styles = StyleSheet.create({
modalText: {
    fontSize:16,
    color:'gray',
fontWeight:'bold',
    textAlign: "left"
  }
});
export default Increment;
