import { createStackNavigator } from "react-navigation";
import { Profile } from "../../components/layouts";
import { primaryColor } from "../../api/constans";

const ProfileNavigator = createStackNavigator(
  {
    Index: {
      screen: Profile,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        elevation: 0,
        borderBottomColor: "transparent"
      },
      headerTintColor: primaryColor
    }
  }
);

ProfileNavigator.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible
  };
};
export default ProfileNavigator;
