import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ScrollView,
  Image,
  Button,
  RefreshControl
} from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Foundation from "react-native-vector-icons/Foundation";

import Api from "../services/api";

class HomeScreen extends React.Component {
  state = {
    items: [],
    loading: true
  };

  componentDidMount() {
    this._onRefresh();
  }

  _onRefresh() {
    this.setState({ loading: true });
    Api.getAllData().then(data => {
      this.setState({
        items: data,
        loading: false
      });
    });
  }

  onShowDetail(key) {
    this.props.navigation.navigate("Detail", {
      key
    });
  }

  onShowCamera() {
    this.props.navigation.navigate("Camera");
  }

  render() {
    const { items } = this.state;
    return (
      <ScrollView
        style={Styles.wrapper}
        refreshControl={
          <RefreshControl
            refreshing={this.state.loading}
            onRefresh={this._onRefresh.bind(this)}
          />
        }
      >
        <Button title="camera" onPress={() => this.onShowCamera()} />
        <Text style={Styles.title}>{`Bouncing Gallery`}</Text>
        {items.map((item, i) => {
          return (
            <TouchableOpacity
              style={Styles.item}
              key={i}
              onPress={() => this.onShowDetail(item.key)}
            >
              <Image source={{ uri: item.image }} style={Styles.image} />
              <Text>{item.title}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  }
}

const buttonCommonStyle = {
  margin: 10,
  width: 100,
  height: 100,
  backgroundColor: "#fff",
  paddingHorizontal: 16,
  paddingVertical: 12,
  borderBottomWidth: StyleSheet.hairlineWidth,
  borderBottomColor: "#ddd",
  borderRadius: 5,
  alignItems: "center",
  justifyContent: "center"
};

const Styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#eee"
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 20
  },
  image: {
    width: 32,
    height: 32
  }
});

export default HomeScreen;
