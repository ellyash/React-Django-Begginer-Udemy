import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View, Image, Button, Alert } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Root, Popup } from "popup-ui";

export default function Details(props) {
  const movieParam = props.navigation.getParam("movie", null);
  const token = props.navigation.getParam("token", "");
  const [highlight, setHighlight] = useState(0);

  const rateClicked = () => {
    if (highlight > 0 && highlight < 6) {
      fetch(`http://192.168.0.175:8000/api/movies/${movieParam.id}/rate_movie/`, {
        method: "POST",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          stars: highlight,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          Alert.alert("Rating", res.message);
          setHighlight(0);
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <View style={style.container}>
      <View style={style.coverContainer}>
        <Image
          resizeMethod="scale"
          style={style.coverImage}
          source={require("../assets/olap.jpeg")}
        />
      </View>
      <Text style={style.description}>{movieParam.description}</Text>
      <View>
        <View style={style.starIcon}>
          <FontAwesomeIcon
            style={movieParam.avg_rating > 0 ? style.filled : style.empty}
            icon={faStar}
            size={48}
          />
          <Text style={style.avgRating}> {movieParam.avg_rating}/5 </Text>
          <Text style={style.noOfRatings}>({movieParam.no_of_ratings})</Text>
        </View>
        <Text style={style.description}>Your Rating</Text>

        <View style={style.starIcon}>
          <FontAwesomeIcon
            style={highlight > 0 ? style.filled : style.gray}
            icon={faStar}
            size={48}
            onPress={() => setHighlight(1)}
          />
          <FontAwesomeIcon
            style={highlight > 1 ? style.filled : style.gray}
            icon={faStar}
            size={48}
            onPress={() => setHighlight(2)}
          />
          <FontAwesomeIcon
            style={highlight > 2 ? style.filled : style.gray}
            icon={faStar}
            size={48}
            onPress={() => setHighlight(3)}
          />
          <FontAwesomeIcon
            style={highlight > 3 ? style.filled : style.gray}
            icon={faStar}
            size={48}
            onPress={() => setHighlight(4)}
          />
          <FontAwesomeIcon
            style={highlight > 4 ? style.filled : style.gray}
            icon={faStar}
            size={48}
            onPress={() => setHighlight(5)}
          />
        </View>
        <Button color="orange" title="Submit your rating" onPress={() => rateClicked()} />
      </View>
    </View>
  );
}

Details.navigationOptions = (screenProps) => ({
  title: screenProps.navigation.getParam("title"),
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
      title="Edit"
      color="none"
      onPress={() =>
        screenProps.navigation.navigate("Edit", {
          movie: screenProps.navigation.getParam("movie"),
          title: screenProps.navigation.getParam("title"),
        })
      }
    />
  ),
});

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#282C35",
    padding: 10,
  },
  starIcon: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  filled: {
    color: "gold",
  },
  empty: {
    color: "white",
  },
  gray: {
    color: "gray",
  },
  avgRating: {
    fontSize: 30,
    color: "white",
  },
  noOfRatings: {
    fontSize: 20,
    color: "gray",
  },
  description: {
    fontSize: 20,
    color: "white",
    alignSelf: "center",
    padding: 10,
  },
  coverContainer: { paddingLeft: 60 },
  coverImage: {
    width: 250,
    height: 350,
    borderWidth: 2,
    borderColor: "gold",
    resizeMode: "stretch",
  },
  popDisabled: {
    display: "none",
  },
  popActive: {
    display: "flex",
  },
});
