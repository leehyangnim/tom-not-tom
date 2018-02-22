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
        <View style={{ backgroundColor: 'blue', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 18, marginTop: 10, marginBottom: 30, fontWeight: 'bold', color: 'white' }}>
            Tom, not Tom
          </Text>
          <Camera style={{ width: '90%', height: '70%' }} type={this.state.type}>
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
              marginTop: 24,
              width: 208,
              height: 48,
              alignItems: 'center',
              borderRadius:10
            }}
            onPress={() => {
              console.log('---');
            }}>
            {/* <Image
              style={}
              source={require('/.brain.svg')}/> */}
            <Text
              style={{ lineHeight: 48, fontSize: 18, marginBottom: 10, color: '#E55880' }}>
              {' '}Press and hold{' '}
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}