import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    Platform,
    Linking,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen'

import BackgroundJob from 'react-native-background-actions';

const sleep = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));

BackgroundJob.on('expiration', () => {
    console.log('iOS: I am being closed!');
});

const taskRandom = async (taskData) => {
    if (Platform.OS === 'ios') {
        console.warn(
            'This task will not keep your app alive in the background by itself, use other library like react-native-track-player that use audio,',
            'geolocalization, etc. to keep your app alive in the background while you excute the JS from this library.'
        );
    }
    await new Promise(async (resolve) => {
        // For loop with a delay
        const { delay } = taskData;
        console.log(BackgroundJob.isRunning(), delay)
        // setInterval(() => {
        //     console.log(BackgroundJob.isRunning())
        // }, 5000);
        for (let i = 0; BackgroundJob.isRunning(); i++) {
            console.log('Runned -> ', i);
            await BackgroundJob.updateNotification({ taskDesc: 'Alam App Is Running' + i });
            await sleep(delay);
        }
    });
};

const options = {
    taskName: 'Example',
    taskTitle: 'ExampleTask title',
    taskDesc: 'ExampleTask desc',
    taskIcon: {
        name: 'ic_launcher',
        type: 'mipmap',
    },
    color: '#ff00ff',
    linkingURI: 'exampleScheme://chat/jane',
    parameters: {
        delay: 1000,
    },
};

// function handleOpenURL(evt) {
//     console.log(evt.url,'evt.url');
    
// }

// Linking.addEventListener('url', handleOpenURL);

class App extends React.Component {
    playing = BackgroundJob.isRunning();

componentDidMount(){
    SplashScreen.hide();
    // this.toggleBackground()
}
// componentDidMount(){
//     console.log('Trying to start background service');
//                  BackgroundJob.start(taskRandom, options);
//                 console.log('Successful start!');
// }

    toggleBackground = async () => {
        this.playing = !this.playing;
        console.log(this.playing,"this.playing")

        if (this.playing) {
            try {
                console.log('Trying to start background service');
                await BackgroundJob.start(taskRandom, options);
                console.log('Successful start!');
            } catch (e) {
                console.log('Error', e);
            }
        } else {
            console.log('Stop background service');
            await BackgroundJob.stop();
        }
    };
 
    render() {
        return (
            <>
                <StatusBar barStyle="dark-content" />
                <SafeAreaView>
                    <ScrollView
                        contentInsetAdjustmentBehavior="automatic"
                        style={styles.scrollView}>

                        <View style={styles.body}>
                            <TouchableOpacity
                                style={{ height: 100, width: 100, backgroundColor: 'red' }}
                                onPress={this.toggleBackground}></TouchableOpacity>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </>
        );
    }
}

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: 'white',
    },
    engine: {
        position: 'absolute',
        right: 0,
    },
    body: {
        backgroundColor: 'white',
    },
    footer: {
        color: 'black',
        fontSize: 12,
        fontWeight: '600',
        padding: 4,
        paddingRight: 12,
        textAlign: 'right',
    },
});

export default App;