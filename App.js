import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Camera, Permissions } from 'expo';

export default class CameraExample extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.front,
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <View style={{ backgroundColor: '#222F3D', width: '100%', height: '15%', alignItems: 'center'}}>
            <Text style={{ lineHeight: 52, fontSize: 20, marginBottom: 30, fontWeight: 'bold', color: 'white' }}>
              Tom, not Tom
            </Text>
          </View>
          <View style={{ backgroundColor: '#2C3E50', width: '100%', height: '85%', alignItems: 'center', paddingTop: 24}}>
            <Camera style={{ width: '90%', height: '80%' }} type={this.state.type}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: 'transparent',
                  flexDirection: 'row',
                }}>
              </View>
            </Camera>
            <TouchableOpacity
              style={{
                backgroundColor: '#fff',
                marginTop: 12,
                width: 48,
                height: 48,
                alignItems: 'center',
                borderRadius: 24
              }}
              onPress={() => {
                console.log('---');
              }}>
              {/* <Image
                style={{ lineHeight: 48, fontWeight: 600, fontSize: 18, marginBottom: 10, color: '#E55880' }}
                source={require('/.brain.svg')}/> */}
            </TouchableOpacity>
            <Text
              style={{ fontWeight: 'bold', fontSize: 11, marginTop: 8, color: 'white' }}>
              {' '}Press and hold{' '}
            </Text>
          </View>
        </View>
      );
    }
  }
}