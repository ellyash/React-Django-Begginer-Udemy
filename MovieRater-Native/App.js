import React from "react";
import MovieList from "./components/list";
import Details from "./components/details";
import Edit from "./components/edit";
import Auth from "./components/auth";

import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

const AppNavigator = createStackNavigator({
  Auth: { screen: Auth },
  MovieList: { screen: MovieList },
  Details: { screen: Details },
  Edit: { screen: Edit },
});

const App = createAppContainer(AppNavigator);

export default App;
