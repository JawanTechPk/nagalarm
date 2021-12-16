import React, { useEffect } from "react";
import { View, StyleSheet, TouchableOpacity,Image } from "react-native";
// import { MaterialCommunityIcons } from "";
import {useNavigationState,useRoute,useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import alarmclock from '../assets/icons/clocks.jpeg'
import alarmclocks from '../assets/icons/Iconionic-md-alarm.png'
import iconmiddle from '../assets/icons/iconmiddle.png'
import resumeIcon from '../assets/icons/Iconresumes.png'
import {bottomTabCloseds,bottomTabOpens} from '../redux/navigateTabRedux/navigate-action'
import playBtn from '../assets/icons/record.png'
import pause from '../assets/icons/pause.png';
import { tabOpen,saveAudioR, tabClosed,onStartRecordR,onStopRecordR,resumeRecorderR,pauseRecorderR } from '../redux/navigateTabRedux/navigate-action'
// import colors from "../config/colors";

function NewListingButton({ onPress,route }) {
	// console.log(navigation,"navigation",route);
	// const routes =useRoute()
// 	const routess = useNavigationState(state => state.routes)
// 	const currentRoute = routess[routess.length -1].name
// console.log('currentRoute: ',currentRoute);

const navigation = useNavigation();
const dispatch =useDispatch();
const {isRecordingScreen,isTabBar,
	recordingStart,
	recordingPause}=useSelector(state=>state.navReducer)

// const { navigation, dangerouslyGetState } = useNavigation()

//   const { dangerouslyGetState } = useNavigation();
//   const { index, routes } = dangerouslyGetState()
//   console.log(routes[index].name,"routes[index].name");
	// console.log(routes,"routers")
	// console.log(route,"route")

	const state = useNavigationState(state => state);
const routeName = (state.routeNames[state.index]);

useEffect(()=>{
if(routeName == "newalarmnav" || routeName == "alarmnav" ){
	dispatch(bottomTabCloseds())
}
else{
	dispatch(bottomTabOpens())
}
},[routeName])

console.log(isRecordingScreen,isTabBar,"isRecordingScreen 2",routeName)
// console.log(routeName,"state.routeNames",state.routeNames,"state.index",state.index,"routeName");
// const {index, routes} = navigation.dangerouslyGetState();
// const currentRoute = routes[index].name;
// console.log('current screen', navigation);
	return (
		<View>
{
(isRecordingScreen && isTabBar)?
<View>
{recordingStart ?
          recordingPause ?
		  <TouchableOpacity onPress={() => { dispatch(resumeRecorderR()) }}>
		  <Image source={resumeIcon} style={{ width: 70, height: 70, alignSelf: 'center' }} />
		</TouchableOpacity>
		:

		<TouchableOpacity onPress={() => { dispatch(pauseRecorderR()) }}>
		  <Image source={pause} style={{ width: 70, height: 70, alignSelf: 'center' }} />
		</TouchableOpacity> : 
		<TouchableOpacity onPress={() => { dispatch(onStartRecordR()) }}>
		<Image source={playBtn} style={{ width: 70, height: 70, alignSelf: 'center' }} />
	  </TouchableOpacity>

}
</View>
:
		<TouchableOpacity onPress={onPress}>
			<View style={styles.container}>
				{/* <MaterialCommunityIcons
					name="plus-circle"
					color={colors.white}
					size={40}
				/> */}
                <Image source={iconmiddle} style={{height:70,width:70,borderRadius:80}} />
			</View>
		</TouchableOpacity>
			}
				</View>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		backgroundColor: '#1e99fe',
		borderColor: '#F6F6F6',
		borderRadius: 80,
		borderWidth: 40,
		bottom: 50,
		height: 90,
		justifyContent: "center",
		width: 90,
	},
});

export default NewListingButton;