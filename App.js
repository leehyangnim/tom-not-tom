import React from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Camera, Permissions, takePictureAsync } from 'expo';

const api = 'http://192.168.0.28:3030/upload';
const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#2C3E50'
    },
    headerView: {
        flex: 0,
        flexDirection: 'row',
        width: '100%',
        height: 88,
        justifyContent: 'center',
        backgroundColor: '#222F3D',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        lineHeight: 52,
        marginTop: 36,
        color: 'white',
    },
    cameraView: {
        flex: 1,
        width: '100%',
        height: '69.21%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 24,
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 24,
    },
    camera: {
        width: '100%',
        height: '100%',
        borderRadius: 5,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
    },
    statusViewDefault: {
        position: 'absolute',
        bottom: 32,
        width: 160,
        height: 24,
        paddingLeft: 8,
        paddingRight: 8,
        backgroundColor: 'black',
    },
    statusViewSuccess: {
        position: 'absolute',
        bottom: 32,
        width: 160,
        height: 24,
        paddingLeft: 8,
        paddingRight: 8,
        backgroundColor: '#4CD964',
    },
    statusViewFail: {
        position: 'absolute',
        bottom: 32,
        width: 160,
        height: 24,
        paddingLeft: 8,
        paddingRight: 8,
        backgroundColor: '#FF3B30',
    },
    statusText: {
        fontSize: 13,
        fontWeight: 'bold',
        lineHeight: 24,
        textAlign: 'center',
        color: 'white',
    },
    statusImage: {
      position: 'absolute',
      bottom: 150
    },
    actionView: {
        flex: 0,
        width: '100%',
        height: 130,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    button: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
    },
    buttonImage: {
        height: 24,
        top: '50%',
        left: '50%',
        transform: [
            {translateX : -9},
            {translateY : -12}
        ],
    },
    buttonText: {
        width: '100%',
        fontSize: 11,
        marginTop: 12,
        lineHeight: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white'
    },
});

export default class CameraExample extends React.Component {
    state = {
        hasCameraPermission: null,
        type: Camera.Constants.Type.front,
        status: 'scanning',
        message: 'Look at your camera',
        messageStyle: 'statusViewDefault'
    };

    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }

    _sendPicture = (path) => {
        console.log('path:', path);
        if (path) {
            const data = new FormData();
            data.append('picture', { uri: path, name: 'isthistom.jpg', type:'image/jpg' });
            // console.log('data:', data);
            const config = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                },
                body: data
            }
            this.setState({ message: 'Sending...'})
            // console.log('config:', config);
            fetch(api, config)
                .then((res) => {
                    console.log('================================================');
                    console.log('res:', res._bodyText);
                    this._changeStatus(res._bodyText);
                })
                .catch(err => {
                    console.log('err:', err);
                })
        } else {
            console.log('no image');
        }
    }

    _changeStatus = (res) => {
      if (res === "tom") {
        this.setState({
          status: res,
          message: 'Tom!',
          messageStyle: 'statusViewSuccess'
        });
      } else if (res === 'nottom') {
        this.setState({
          status: res,
          message: 'Not Tom!',
          messageStyle: 'statusViewFail'
        });
      }
      setTimeout( () => {
        this._setTimePassed();
      },3000);
    }

    _setTimePassed() {
      this.setState({
        status: 'scanning',
        message: 'Look at your camera',
        messageStyle: 'statusViewDefault'
      });
   }


    _takePictureAsync = async () => {
      let result =  await this.camera.takePictureAsync();
    //   console.log('===============================');
    //   console.log(result);
      this._sendPicture(result.uri);
      // let saveResult = await CameraRoll.saveToCameraRoll(result, 'photo');
      // this.setState({ cameraRollUri: saveResult });
    };


    render() {
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        } else {
            return (
                <View style={styles.mainView}>
                    <View style={styles.headerView}>
                        <Text style={styles.headerText}>
                            Tom, Not Tom
                        </Text>
                    </View>
                    <View style={styles.cameraView}>
                        <Camera ref={ref => { this.camera = ref; }} style={styles.camera} type={this.state.type} />
                        <View style={styles[this.state.messageStyle]}>
                            <Text style={styles.statusText}>{this.state.message}</Text>
                        </View>
                    </View>
                    <View style={styles.actionView}>
                        <TouchableOpacity style={styles.button} onPress={this._takePictureAsync}>
                            <Image style={styles.buttonImage} source={require('./assets/lock.png')}/>
                        </TouchableOpacity>
                        <Text style={styles.buttonText}>
                            Tap to unlock
                        </Text>
                    </View>
                </View>
            );
        }
    }
}
