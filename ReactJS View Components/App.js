import React, {Component} from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'

import  HomeScreen  from './screens/HomeScreen';
import FindScreen from './screens/FindScreen'
import SearchScreen from './screens/SearchScreen'
import DiscoverScreen from './screens/DiscoverScreen'
import SavedScreen from './screens/SavedScreen'
import TrendingScreen from './screens/TrendingScreen'
import RecommendedScreen from './screens/RecommendedScreen'




const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Find: FindScreen,
    Discover: DiscoverScreen,
    Saved: SavedScreen,
    Search: SearchScreen,
    Trending: TrendingScreen,
    Recommended: RecommendedScreen

  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
