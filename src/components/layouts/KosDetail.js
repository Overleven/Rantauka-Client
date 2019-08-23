//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Share,
  TouchableOpacity,
  Animated,
  Dimensions,
  InteractionManager
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { AfterInteractions } from "react-native-interactions";
import axios from "axios";

import KosHubungi from "../../components/Kos/KosHubungi";
import KosComponent from "../../components/Kos/KosDetail";
import { primaryColor } from "../../api/constans";
import { getKostById } from "../../api/explore";

class KosDetail extends Component {
  constructor() {
    super();
    this.state = {
      houses: {
        nama: "MamiRooms Glow In Tipe B Kebayoran Baru Jakarta Selatan"
      },
      interactionsComplete: false,
      kostList: undefined,
      user: undefined
    };
    this.scrollY = new Animated.Value(0);
  }

  async componentDidMount() {
    const id = this.props.navigation.state.params.kostList;
    try {
      const kostList = await getKostById(id);
      await this.setState({
        kostList
      });
    } catch (err) {
      console.log(err);
    }

    InteractionManager.runAfterInteractions(() => {
      this.setState({ interactionsComplete: true });
    });
    this.props.navigation.setParams({ handleShare: this.onShare });
    this.props.navigation.setParams({
      bgColor: this.scrollY.interpolate({
        inputRange: [0, Dimensions.get("window").height / 2 - 40],
        outputRange: ["transparent", primaryColor],
        extrapolate: "clamp"
      })
    });
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;

    return {
      headerRight: (
        <TouchableOpacity onPress={() => params.handleShare()}>
          <Icon
            style={{ marginRight: 20, color: "#fff" }}
            name="share-variant"
            size={22}
          />
        </TouchableOpacity>
      ),
      headerTintColor: "#fff",
      headerTransparent: {
        position: "absolute",
        backgroundColor: "transparent",
        zIndex: 100,
        top: 0,
        left: 0,
        right: 0
      },
      headerStyle: {
        backgroundColor: params.bgColor ? params.bgColor : "transparent",
        elevation: 0
      }
    };
  };

  onShare = async () => {
    try {
      const result = await Share.share({
        message:
          "React Native | A framework for building native apps using React"
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  handleIconLeft = () => {
    this.props.navigation.navigate("Kos");
  };

  render() {
    if ((kostList = this.state.kostList)) {
      return (
        <View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.scrollContainer}
            onScroll={Animated.event([
              { nativeEvent: { contentOffset: { y: this.scrollY } } }
            ])}
            scrollEventThrottle={16}
          >
            {kostList && <KosComponent kostList={kostList.data} />}
          </ScrollView>
          {kostList && (
            <KosHubungi
              kostList={kostList.data}
              navigation={this.props.navigation}
            />
          )}
        </View>
      );
    }
    return <Text>Loading...</Text>;
  }
}

const styles = StyleSheet.create({
  scrollContainer: {
    marginBottom: 60
  },
  header: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 10
  },
  shareWishlist: { flex: 1, justifyContent: "flex-end", flexDirection: "row" }
});

export default KosDetail;
