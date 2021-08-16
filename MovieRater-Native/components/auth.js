import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Auth(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [registerView, setRegisterView] = useState(false);

  useEffect(() => {
    getToken();
  }, []);

  Auth.navigationOptions = () => ({
    title: "Authentication",
    headerStyle: {
      backgroundColor: "orange",
    },
    headerTintColor: "#FFF",
    headerTitleAlign: "center",
    headerTitleStyle: {
      fontWeight: "bold",
      fontSize: 24,
    },
  });

  const auth = () => {
    if (registerView) {
      fetch(`http://192.168.0.175:8000/api/users/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          setRegisterView(false);
        })
        .catch((error) => console.log(error));
    } else {
      fetch(`http://192.168.0.175:8000/auth/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          saveToken(res.token);
          props.navigation.navigate("MovieList");
        })
        .catch((error) => console.log(error));
    }
  };
  const saveToken = async (token) => {
    await AsyncStorage.setItem("Login-Token", token);
  };
  const getToken = async () => {
    const token = AsyncStorage.getItem("Login-Token");
    if (token) props.navigation.navigate("MovieList");
  };

  const toggleView = () => {
    setRegisterView(!registerView);
  };

  return (
    <View style={style.container}>
      <Text style={style.label}>Username</Text>
      <TextInput
        style={style.input}
        /* placeholder="Username" */
        onChangeText={(text) => setUsername(text)}
        placeholderTextColor="#FFF"
        value={username}
        autoCapitalize={"none"}
      />
      <Text style={style.label}>Password</Text>
      <TextInput
        style={style.input}
        /* placeholder="Password" */
        onChangeText={(text) => setPassword(text)}
        value={password}
        autoCapitalize={"none"}
        secureTextEntry={true}
      />
      <Button
        style={style.button}
        color="orange"
        onPress={() => auth()}
        title={registerView ? "Register" : "Login"}
      />
      <TouchableOpacity onPress={() => toggleView()}>
        {registerView ? (
          <Text style={style.viewText}>Already have an account? Sign in</Text>
        ) : (
          <Text style={style.viewText}>You don't have an account yet? Sign Up</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#282C35",
    padding: 10,
  },
  description: {
    fontSize: 20,
    color: "white",
    padding: 10,
  },
  input: {
    fontSize: 24,
    backgroundColor: "#282D35",
    borderBottomWidth: 2,
    borderColor: "gold",
    color: "white",
    padding: 10,
    margin: 10,
  },
  label: {
    fontSize: 24,
    color: "white",
    padding: 10,
  },
  viewText: {
    color: "white",
    fontSize: 20,
    paddingTop: 30,
    paddingLeft: 10,
    paddingRight: 10,
  },
});
