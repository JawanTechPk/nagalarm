import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
    Image
} from 'react-native';
import React,{useEffect} from 'react';
// ICONS
import alarmclock from '../assets/icons/Iconionic-md-alarm.png'
import alarmclockgray from '../assets/icons/clockgray.png'
import timer from '../assets/icons/Iconawesome-list2.png'
import timergray from '../assets/icons/Iconawesome-list.png'
import alarmclockss from '../assets/icons/clocks.jpeg'
// SCREENS

// ALARM SCREEN
import Alarms from '../screens/alarms'
import Archieve from '../screens/archieve'
// NEW ALARM SCREEN
import NewAlarm from '../screens/newAlarm/newAlarm'
import AddAlarm from '../screens/newAlarm/addAlarm'

// RECORDING SCREEN
import Recording from '../screens/recording/recordingMain'
import StartRecording from '../screens/recording/startRecording'

// 
import ListingEditScreen from '../components/bottomTab'

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator()
const Drawer = createDrawerNavigator();


function AlarmNav() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="alarms" component={Alarms} />
            <Stack.Screen name="archieve" component={Archieve} />
        </Stack.Navigator>
    );
};


function NewAlarmNav() {
    return (
        <Stack.Navigator options={{ headerShown: false, }}  >
            <Stack.Screen name="newalarm" component={NewAlarm}  />
            <Stack.Screen name="addalarm" component={AddAlarm} />
        </Stack.Navigator>
    );
};
function RecordingNav() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="recording" component={Recording} />
            <Stack.Screen name="startrecord" component={StartRecording} />
            
        </Stack.Navigator>
    );
};




const TabNavigator = () => {  
    return (
        <Tab.Navigator initialRouteName="newalarmnav"
            screenOptions={(options) => {
          
                const route = options.route;
                return {
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                       
                        if (route.name === 'newalarmnav') {
                            return iconName = focused
                                ?
                                <Image source={alarmclockss} style={{ height: 40, width: 33,  }} />
                                :
                                <Image source={alarmclockss} style={{ height: 40, width: 33, }} />
                        } else if (route.name === 'alarmnav') {
                            return iconName = focused
                                ?
                                <Image source={alarmclock} style={{ height: 33, width: 33,  }} />
                                :
                                <Image source={alarmclockgray} style={{ height: 33, width: 33, }} />
                        }
                        else if (route.name === 'recordingnav') {
                            return iconName = focused
                                ?
                                <Image source={timer} style={{ height: 25, width: 28 }} />
                                :
                                <Image source={timergray} style={{ height: 25, width: 28 }} />
                        }
                        return null
                    }
                }
            }}
            tabBarOptions={{
                
                showLabel: false,
                keyboardHidesTabBar: true,
            }}
            
        >


            {/* <Tab.Screen
            
				name="newalarmnav"
				component={NewAlarmNav}
         
				options={({ navigation }) => ({
                    tabBarVisible:false,
					tabBarButton: () => (
						<ListingEditScreen
                        navigation={navigation}
							onPress={() =>{
                                navigation.navigate("newalarmnavs");
                                navigation.setOptions({headerShown: false});
                                
                            }
							}
						/>
					),
					tabBarIcon: ({ color, size }) => (
						// <MaterialCommunityIcons
						// 	name="plus-circle"
						// 	color={color}
						// 	size={size}
						// />
                        <Image source={timer} style={{ height: 25, width: 28 }} />
					),
                    
				})}
			/>

                <Tab.Screen options={{headerShown:false}}  name="alarmnav" component={AlarmNav}
                >
                </Tab.Screen> */}
 <Tab.Screen options={{headerShown:false}}  name="newalarmnav" component={NewAlarmNav}
                >
                </Tab.Screen> 

<Tab.Screen
            
            name="alarmnav"
            component={AlarmNav}
     
            options={({ navigation,route }) => ({
                tabBarVisible:false,
                tabBarButton: () => (
                    <ListingEditScreen
                    navigation={navigation}
                    route={route}
                        onPress={() =>{
                            navigation.navigate("alarmnav");
                            navigation.setOptions({headerShown: false});
                            
                        }
                        }
                    />
                ),
                tabBarIcon: ({ color, size }) => (
                    // <MaterialCommunityIcons
                    // 	name="plus-circle"
                    // 	color={color}
                    // 	size={size}
                    // />
                    <Image source={timer} style={{ height: 25, width: 28 }} />
                ),
                
            })}
        />

            <Tab.Screen options={{headerShown:false}} name="recordingnav" component={RecordingNav}
            ></Tab.Screen>
        </Tab.Navigator>
    )
}

function AlarmNavs() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="tabnavigator" component={TabNavigator} />
            <Stack.Screen name="newalarmnavs" component={NewAlarmNav} />
        </Stack.Navigator>
    );
};

function MainNavi() {
    return (
        <NavigationContainer screenOptions={{headerShown: false }}>
            <AlarmNavs />
        </NavigationContainer>
    );
};

export default MainNavi;