import React, { Component } from "react";
import { View, Text, Platform, StyleSheet } from "react-native";

class PlatformComponent extends Component {
  render() {
    return (
      <View style={Styles.container}>                
        <Text style={Styles.label}>{`Snap me 👻`}</Text>
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  container: {
      padding: 6,                
      borderColor: '#FFD301',       
      borderRadius: 4,
      borderWidth: 1,
      backgroundColor: 'white'
  },
  label: {
      color: '#FFD301'
  }
})

export default PlatformComponent;
