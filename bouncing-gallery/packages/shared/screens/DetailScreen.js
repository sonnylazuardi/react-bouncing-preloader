import React from "react";
import { View, Text, Button, StyleSheet, ScrollView } from "react-native";
import BouncingPreloader from "../components/Preloader/Bouncing";
import Api from "../services/api";

class Detail extends React.Component {
  state = {
    icons: [],
    speed: 1200,
    size: 100,
    index: 0,
    leftDistance: -150,
    rightDistance: -100,
    leftRotation: -680,
    rightRotation: 360,
    color: "#fff",
    showShare: false,
    title: "Bouncing Preloader Editor"
  };
  componentDidMount() {
    const key =
      this.props.navigation.state && this.props.navigation.state.params.key;
    console.log("key", this.props.navigation.state);
    Api.getDataByKey(key).then(data => {
      console.log("DATA", data.content);
      const content = JSON.parse(data.content);
      this.setState({ ...content, index: this.state.index + 1 });
    });
  }
  render() {
    const {
      icons,
      index,
      size,
      speed,
      leftDistance,
      rightDistance,
      leftRotation,
      rightRotation,
      showShare,
      title
    } = this.state;
    // console.log("PARAMS", this.props.navigation.state.params);
    console.log("icons", icons);
    // const key = this.props.navigation.state.params;
    return (
      <View style={{ flex: 1 }}>
        <Text style={Styles.title}>{title}</Text>
        <View style={Styles.wrapper}>
          <BouncingPreloader
            key={index}
            icons={icons}
            size={size}
            speed={speed}
            leftRotation={`${leftRotation}deg`}
            rightRotation={`${rightRotation}deg`}
            leftDistance={leftDistance}
            rightDistance={rightDistance}
          />
        </View>
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 20
  },
  wrapper: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  }
});

export default Detail;
