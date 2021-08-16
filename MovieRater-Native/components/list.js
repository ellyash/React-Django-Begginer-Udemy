import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function MovieList(props) {
  const [movies, setMovies] = useState([]);
  let token = null;

  const getToken = async () => {
    token = await AsyncStorage.getItem("Login-Token");
    if (token) {
      getMovies();
    } else {
      props.navigation.navigate("Auth");
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  const getMovies = () => {
    fetch("http://192.168.0.175:8000/api/movies/", {
      method: "GET",
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then((res) => res.json())
      .then((jsonRes) => setMovies(jsonRes))
      .catch((error) => console.log(error));
  };

  const movieClicked = async (movie) => {
    token = await AsyncStorage.getItem("Login-Token");
    if (token)
      props.navigation.navigate("Details", {
        movie: movie,
        title: movie.title,
        token: token,
      });
  };

  return (
    <View>
      <Image
        source={require("../assets/logo.png")}
        style={{ width: "100%", height: 123, paddingTop: 20 }}
        resizeMode="contain"
      />
      <FlatList
        data={movies}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => movieClicked(item)}>
            <View style={style.item}>
              <Text style={style.itemText}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

MovieList.navigationOptions = (screenProps) => ({
  title: "List of Movies",
  headerStyle: {
    backgroundColor: "orange",
  },
  headerTintColor: "#FFF",
  headerTitleAlign: "center",
  headerTitleStyle: {
    fontWeight: "bold",
    fontSize: 24,
  },
  headerRight: () => (
    <Button
      title="Add New"
      color="none"
      onPress={() =>
        screenProps.navigation.navigate("Edit", {
          movie: { title: "", description: "" },
        })
      }
    />
  ),
});

const style = StyleSheet.create({
  container: {
    flex: 5,

    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    flex: 1,
    padding: 10,
    height: 50,
    backgroundColor: "#282C35",
    borderBottomWidth: 2,
    borderBottomColor: "gold",
  },
  itemText: {
    color: "#FFF",
    fontSize: 24,
  },
});
