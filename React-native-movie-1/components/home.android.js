import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Button,
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
  Platform,
} from "react-native";

export default function Home(props) {
  const [name, setName] = useState("obcior");

  return (
    <View style={style.home}>
      <Text>You're using android device</Text>
      <StatusBar style="auto" />
      <Button
        title="go to Details"
        onPress={() => props.navigation.navigate("Detail")}
      />
    </View>
  );
}

const style = StyleSheet.create({
  home: {
    flex: 1,
    backgroundColor: Platform.OS == "android" ? "#fff" : "#00ff00",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 40,
  },
});
