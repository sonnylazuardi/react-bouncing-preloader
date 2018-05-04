import HomeScreen from "../screens/HomeScreen";
import AboutScreen from "../screens/AboutScreen";
import DetailScreen from "../screens/DetailScreen";
import ModalScreen from "../screens/ModalScreen";
import CameraScreen from "../screens/CameraScreen";
import SharedComponentsScreen from "../screens/SharedComponentsScreen";
import NavigationScreen from "../screens/NavigationScreen";

const routes = {
  Home: {
    screen: HomeScreen,
    path: "/"
  },
  Modal: {
    screen: ModalScreen,
    path: "/modal"
  },
  Camera: {
    screen: CameraScreen,
    path: "/camera"
  },
  Shared: {
    screen: SharedComponentsScreen,
    path: "/shared-component"
  },
  Navigation: {
    screen: NavigationScreen,
    path: "/navigation"
  },
  About: {
    screen: AboutScreen,
    path: "/about"
  },
  Detail: {
    screen: DetailScreen,
    path: "/detail"
  }
};

export const initialRouteName = {
  initialRouteName: "Home"
};
export default routes;
