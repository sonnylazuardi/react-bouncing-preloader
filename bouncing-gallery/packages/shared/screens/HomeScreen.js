import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ScrollView
} from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Foundation from "react-native-vector-icons/Foundation";

var gql = require("graphql-tag");
var ApolloClient = require("apollo-client").default;
var createNetworkInterface = require("apollo-client").createNetworkInterface;
var networkInterface = createNetworkInterface({
  uri: "https://api.graph.cool/simple/v1/cjgqy7jv969ux01033ys92hzp"
});
var client = new ApolloClient({ networkInterface: networkInterface });

class HomeScreen extends React.Component {
  state = {
    items: []
  };

  componentDidMount() {
    client
      .query({
        query: gql`
          query Data {
            allDatas {
              key
              content
            }
          }
        `
      })
      .then(data => {
        console.log("DATA", data.data.allDatas);
        this.setState({
          items: data.data.allDatas
        });
      })
      .catch(error => console.error(error));
  }

  render() {
    const { items } = this.state;
    return (
      <ScrollView style={Styles.wrapper}>
        <Text style={Styles.title}>{`Bouncing Gallery`}</Text>
        {items.map((item, i) => {
          return <View style={Styles.item} key={i} />;
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
  }
});

export default HomeScreen;
