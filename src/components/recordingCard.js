
// import React,{useEffect, useState} from 'react';
// import {
//   Text,
//   Image ,
//   View,TouchableOpacity
// } from 'react-native';
// import menu from '../assets/icons/menu.png'
// import play from '../assets/icons/play-button.png'
// import pencil from '../assets/icons/pencil-blue.png'
// import trash from '../assets/icons/trash.png'
// import kanchi from '../assets/icons/kanchi.png'
// import paints from '../assets/icons/paints.png'



// const RecordingCard = ({ontrim,txt,onEdit,onDelete,playVoice,setOptInd,optInd,ind}) => {

// return(
 
// <View style={{flex:1,height:50,width:'100%',marginTop:10,flexDirection:'row',justifyContent:'space-between',}}>
// <View style={{flexDirection:'row',marginBottom:10,}}>
//   <TouchableOpacity onPress={()=>playVoice()}>
// <Image source={play} style={{width:40,height:40}}/>
// </TouchableOpacity>
// <Text style={{fontSize:16,color:'#707070',textAlign:'center',marginTop:10,marginLeft:10}}>{txt}</Text>
// </View>  
// <View style={{flexDirection:'row',height:190,zIndex:20}}>
// {optInd ==ind?
// <View style={{position:'relative',height:190,zIndex:20,padding:5,right:0,width:150,backgroundColor:'white'}}>
// <TouchableOpacity onPress={()=>onEdit(ind)} style={{flexDirection:'row',borderBottomColor:'gray',borderBottomWidth:0.5}}> 
// <Image source={pencil} style={{width:15,height:15,marginTop:10,marginLeft:10}}/>  
// <Text style={{color:'#1e99fe',fontSize:16,marginLeft:15,margin:8}}>Edit</Text>
// </TouchableOpacity>
// <TouchableOpacity onPress={()=>onDelete(ind)} style={{flexDirection:'row',borderBottomColor:'gray',borderBottomWidth:0.5}}> 
// <Image source={trash} style={{width:15,height:15,marginTop:10,marginLeft:10}}/>  
// <Text style={{color:'#1e99fe',fontSize:16,marginLeft:15,margin:8}}>Delete</Text>
// </TouchableOpacity>
// <TouchableOpacity onPress={()=>ontrim()} style={{flexDirection:'row',borderBottomColor:'gray',borderBottomWidth:0.5}}> 
// <Image source={kanchi} style={{width:15,height:15,marginTop:10,marginLeft:10}}/>  
// <Text style={{color:'#1e99fe',fontSize:16,marginLeft:15,margin:8}}>Trim</Text>
// </TouchableOpacity>
// <View>

// <View style={{flexDirection:'row',}}> 
// <Image source={paints} style={{width:15,height:15,marginTop:10,marginLeft:10}}/>  
// <Text style={{color:'#1e99fe',fontSize:16,marginLeft:15,margin:8}}>Colors</Text>
// </View>
// <View style={{flexDirection:'row',justifyContent:'flex-end',marginRight:30}}>
// <View style={{height:10,width:10,borderRadius:10,backgroundColor:'blue'}}/>
// <View style={{height:10,width:10,borderRadius:10,backgroundColor:'red',marginHorizontal:10}}/>
// <View style={{height:10,width:10,borderRadius:10,backgroundColor:'green'}}/>
// </View>
// </View>
// </View>
// :null}
// <TouchableOpacity onPress={()=>setOptInd(ind)}>
// <Image source={menu} style={{width:20,height:20,marginTop:10}}/>
// </TouchableOpacity>
// </View>
// </View>

// );
// };

// export default RecordingCard;



import React, { useEffect, useState } from "react";
import {
  Text,
  Image,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import menu from "../assets/icons/menu.png";
import play from "../assets/icons/play-button.png";
import pencil from "../assets/icons/pencil-blue.png";
import trash from "../assets/icons/trash.png";
import kanchi from "../assets/icons/kanchi.png";
import paints from "../assets/icons/paints.png";
import {
  Menu,
  HamburgerIcon,
  Box,
  Pressable,
  Center,
  NativeBaseProvider,
  ScrollView,
} from "native-base";

const RecordingCard = ({
  ontrim,
  txt,
  onEdit,
  onDelete,
  playVoice,
  setOptInd,
  optInd,
  ind,
}) => {
  return (
    <TouchableWithoutFeedback onPress={() => setIndexNumber(0)}>
  
    <View
      style={{
        flex: 1,
        // height: indexNumber === ind ? 120 : 50,
        paddingHorizontal: 5,
        width: "95%",
        marginTop: 10,
        flexDirection: "row",
        // justifyContent: "space-between",
        alignSelf:"center",
        height: 50,
        // marginVertical: 20,
        // backgroundColor: "red",
      }}
    >
      <View style={{ flexDirection: "row", marginBottom: 10 }}>
        <TouchableOpacity onPress={() => playVoice()}>
          <Image source={play} style={{ width: 40, height: 40 }} />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 16,
            color: "#707070",
            textAlign: "center",
            marginTop: 10,
            marginLeft: 10,
          }}
        >
          {txt}
        </Text>
      </View>
      <View style={{ marginLeft: "auto" }}>
        <Menu
          w="190"
          trigger={(triggerProps) => {
            return (
              <Pressable
                accessibilityLabel="More options menu"
                {...triggerProps}
              >
                {/* <HamburgerIcon /> */}
                <Image
                  source={menu}
                  style={{ width: 20, height: 20, marginTop: 10 }}
                />
              </Pressable>
            );
          }}
        >
          <Menu.Item>
            <TouchableOpacity
              onPress={() => onEdit(ind)}
              style={{
                flexDirection: "row",
                borderBottomColor: "gray",
                borderBottomWidth: 0.5,
              }}
            >
              <Image
                source={pencil}
                style={{
                  width: 15,
                  height: 15,
                  marginTop: 10,
                  marginLeft: 10,
                }}
              />
              <Text
                style={{
                  color: "#1e99fe",
                  fontSize: 16,
                  marginLeft: 15,
                  margin: 8,
                }}
              >
                Edit
              </Text>
            </TouchableOpacity>
          </Menu.Item>
          <Menu.Item>
            <TouchableOpacity
              onPress={() => onDelete(ind)}
              style={{
                flexDirection: "row",
                borderBottomColor: "gray",
                borderBottomWidth: 0.5,
              }}
            >
              <Image
                source={trash}
                style={{
                  width: 15,
                  height: 15,
                  marginTop: 10,
                  marginLeft: 10,
                }}
              />
              <Text
                style={{
                  color: "#1e99fe",
                  fontSize: 16,
                  marginLeft: 15,
                  margin: 8,
                }}
              >
                Delete
              </Text>
            </TouchableOpacity>
          </Menu.Item>
          <Menu.Item>
            <TouchableOpacity
              onPress={() => ontrim()}
              style={{
                flexDirection: "row",
                borderBottomColor: "gray",
                borderBottomWidth: 0.5,
              }}
            >
              <Image
                source={kanchi}
                style={{
                  width: 15,
                  height: 15,
                  marginTop: 10,
                  marginLeft: 10,
                }}
              />
              <Text
                style={{
                  color: "#1e99fe",
                  fontSize: 16,
                  marginLeft: 15,
                  margin: 8,
                }}
              >
                Trim
              </Text>
            </TouchableOpacity>
          </Menu.Item>
          <Menu.Item>
          {/* <View>

 <View style={{flexDirection:'row',}}> 
 <Image source={paints} style={{width:15,height:15,marginTop:10,marginLeft:10}}/>  
 <Text style={{color:'#1e99fe',fontSize:16,marginLeft:15,margin:8}}>Colors</Text>
 </View>
 <View style={{flexDirection:'row',justifyContent:'flex-end',marginRight:30}}>
 <View style={{height:10,width:10,borderRadius:10,backgroundColor:'blue'}}/>
 <View style={{height:10,width:10,borderRadius:10,backgroundColor:'red',marginHorizontal:10}}/>
 <View style={{height:10,width:10,borderRadius:10,backgroundColor:'green'}}/>
 </View>
 </View> */}
 {/* </View> */}
 {/* :null}
 <TouchableOpacity onPress={()=>setOptInd(ind)}>
 <Image source={menu} style={{width:20,height:20,marginTop:10}}/>
 </TouchableOpacity> */}
 {/* </View> */}
 {/* </View> */}
          </Menu.Item>
        </Menu>
      </View>

      {/* <View style={{ flexDirection: "row", height: 190, zIndex: 20 }}>
        {optInd == ind ? (
          <View
            style={{
              position: "relative",
              height: 120,
              zIndex: 20,
              padding: 5,
              right: 0,
              width: 150,
              backgroundColor: "white",
            }}
          >
            <TouchableOpacity
              onPress={() => onEdit(ind)}
              style={{
                flexDirection: "row",
                borderBottomColor: "gray",
                borderBottomWidth: 0.5,
              }}
            >
              <Image
                source={pencil}
                style={{
                  width: 15,
                  height: 15,
                  marginTop: 10,
                  marginLeft: 10,
                }}
              />
              <Text
                style={{
                  color: "#1e99fe",
                  fontSize: 16,
                  marginLeft: 15,
                  margin: 8,
                }}
              >
                Edit
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onDelete(ind)}
              style={{
                flexDirection: "row",
                borderBottomColor: "gray",
                borderBottomWidth: 0.5,
              }}
            >
              <Image
                source={trash}
                style={{
                  width: 15,
                  height: 15,
                  marginTop: 10,
                  marginLeft: 10,
                }}
              />
              <Text
                style={{
                  color: "#1e99fe",
                  fontSize: 16,
                  marginLeft: 15,
                  margin: 8,
                }}
              >
                Delete
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => ontrim()}
              style={{
                flexDirection: "row",
                borderBottomColor: "gray",
                borderBottomWidth: 0.5,
              }}
            >
              <Image
                source={kanchi}
                style={{
                  width: 15,
                  height: 15,
                  marginTop: 10,
                  marginLeft: 10,
                }}
              />
              <Text
                style={{
                  color: "#1e99fe",
                  fontSize: 16,
                  marginLeft: 15,
                  margin: 8,
                }}
              >
                Trim
              </Text>
            </TouchableOpacity>
          </View>
        ) : null} */}
      {/* <TouchableOpacity
          onPress={() => {
            setOptInd(ind);
            setIndexNumber(ind);
            console.log(ind);
          }}
        >
          <Image
            source={menu}
            style={{ width: 20, height: 20, marginTop: 10 }}
          />
        </TouchableOpacity> */}
      {/* </View> */}
    </View>
   
     </TouchableWithoutFeedback>
  );
};

export default RecordingCard;