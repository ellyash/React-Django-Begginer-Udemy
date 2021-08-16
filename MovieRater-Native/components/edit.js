import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View, Image, Button, TextInput } from "react-native";

export default function Edit(props) {
  const movieParam = props.navigation.getParam("movie", null);
  const [title, setTitle] = useState(movieParam.title);
  const [description, setDescription] = useState(movieParam.description);

  Edit.navigationOptions = (props) => ({
    title: props.navigation.getParam("title") ? "Edit " + title : "Add New",
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

  const removeClicked = (props) => {
    console.log(movieParam);
    const movieParam = props.navigation.getParam("movie");
    fetch(`http://192.168.0.175:8000/api/movies/${movieParam.id}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        props.navigation.navigate("MovieList");
      })
      .catch((error) => console.log(error));
  };

  const saveMovie = () => {
    if (movieParam.id) {
      fetch(`http://192.168.0.175:8000/api/movies/${movieParam.id}/`, {
        method: "PUT",
        headers: {
          Authorization: `Token dbf2ae67a7df626da7d4e1a94faf0e58a6283c3d`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          description: description,
        }),
      })
        .then((res) => res.json())
        .then((movie) => {
          props.navigation.navigate("Details", {
            movie: movie,
            title: movie.title,
          });
        })
        .catch((error) => console.log(error));
    } else {
      fetch(`http://192.168.0.175:8000/api/movies/`, {
        method: "POST",
        headers: {
          Authorization: `Token dbf2ae67a7df626da7d4e1a94faf0e58a6283c3d`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          description: description,
        }),
      })
        .then((res) => res.json())
        .then((movie) => {
          props.navigation.navigate("MovieList", {
            movie: movie,
            title: movie.title,
          });
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <View style={style.container}>
      <Text style={style.label}>Title</Text>
      <TextInput
        style={style.input}
        placeholder={movieParam.id ? "Title" : ""}
        onChangeText={(text) => setTitle(text)}
        placeholderTextColor="#FFF"
        value={title}
      />
      <Text style={style.label}>Description</Text>
      <TextInput
        style={style.input}
        placeholder={movieParam.id ? "Description" : ""}
        onChangeText={(text) => setDescription(text)}
        value={description}
      />
      <View style={style.buttonContainer}>
        <Button
          style={style.button}
          color="orange"
          onPress={() => saveMovie()}
          title="Submit"
        />
        {title ? (
          <Button
            style={style.button}
            title="Remove"
            color="red"
            onPress={() => removeClicked(props)}
          />
        ) : null}
      </View>
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 15,
  },
  button: {},
});
