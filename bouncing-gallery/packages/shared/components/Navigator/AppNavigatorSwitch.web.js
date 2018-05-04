import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import ROUTES, { initialRouteName } from "../../constants/routes";
import { View, Text } from "react-native";

class AppNavigatorSwitch extends Component {
  _navigate(history, path) {
    history.push(path);
  }
  _goback(history) {
    history.goBack();
  }
  generateNavigation(history) {
    return {
      navigate: path => {
        if(ROUTES[path]) {
          this._navigate(history, ROUTES[path].path);
        }        
      },
      goBack: () => {
        this._goback(history);
      }
    };
  }

  generateRoutes(history) {
    return Object.keys(ROUTES).map((routeName, idx) => {
      const { screen: Screen, path } = ROUTES[routeName];
      const screenProps = {
        navigation: this.generateNavigation(history)
      };
      const currentComponent = () => <Screen {...screenProps} />;
      const routeProps = {
        path,
        component: currentComponent,
        key: idx,
        exact: true
      };
      return <Route {...routeProps} />;
    });
  }

  render() {
    const { history } = this.props;
    return (
      <Switch>    
        {this.generateRoutes(history)}
        <Route
          component={() => (
            <View>
              <Text>{"404 Not Found"}</Text>
            </View>
          )}
        />
      </Switch>
    );
  }
}

export default withRouter(AppNavigatorSwitch);
