import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import Camera from "react-native-camera";

class CameraScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Camera
          style={[Styles.scanner]}
          onBarCodeRead={event => {
            if (!this.isPaused) {
              this.isPaused = true;
              this.props.navigation.navigate("Detail", {
                key: event.data
              });
            }
          }}
        />
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  space: {
    margin: 5
  },
  scanner: {
    flex: 1
  }
});
export default CameraScreen;
