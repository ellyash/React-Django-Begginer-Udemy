import React from "react";
import Home from "./components/home";
import Detail from "./components/detail";

import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

const AppNavigator = createStackNavigator({
  Home: { screen: Home },
  Detail: { screen: Detail },
});

const App = createAppContainer(AppNavigator);

export default App;
