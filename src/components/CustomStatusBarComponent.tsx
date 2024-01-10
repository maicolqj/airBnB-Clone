import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar,
  StyleProp,
  ViewStyle,
  StatusBarStyle
} from "react-native";
import React from "react";

interface Props {
  colorBar?: string;
  barStyle?: StatusBarStyle;
}
const CustomStatusBarComponent = ({
  colorBar = "rgba(255, 255, 255, 0.25)",
  barStyle = "dark-content"
}: Props) => {
  const isAndroid = Platform.OS === "android";

  return (
    <View style={{ height: isAndroid ? 0 : StatusBar.currentHeight }}>
      <StatusBar
        backgroundColor={colorBar}
        barStyle={barStyle}
        translucent={true}
      />
    </View>
  );
};

export default CustomStatusBarComponent;

const styles = StyleSheet.create({});
