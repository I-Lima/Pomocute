import React, { useEffect } from "react";
import { View, Image, ActivityIndicator } from "react-native";
import { Colors, Dimension } from "../Constants/Styles";
const LOGO = require('../assets/logo.png');

export default function SplashScreen() {
  return(
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.BACKGROUND_YELLOW }}>
      <Image source={LOGO} />

      <View style={{ marginTop: Dimension.WIDTH / 3 }}>
        <ActivityIndicator size={60} color={Colors.WHITE} />
      </View>
    </View>
  )
};
