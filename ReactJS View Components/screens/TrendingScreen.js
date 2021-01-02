import React, {Component} from 'react';
import { Text, View, Image, Linking, ActivityIndicator, ScrollView} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'

const trendingAPI = 'http://0.0.0.0:4444/addtrending'

export default class TrendingScreen extends React.Component {
  //Constructor states to store fethed JSON data + boolean to store load status
  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      status: null
    }
  }
  //Utilizes Fetch API and parses response as JSON
  componentDidMount(){
    return fetch(trendingAPI)
      .then( (response) => response.json())
      .then ((responseJson) => {
        this.setState({
          isLoading: false,
          status: responseJson
        })
      });
  }

  render() {
    //Waits til JSON has been fetched from API to render
    if(this.state.isLoading){
      return (
        <View style={styles.iconContainerStyle}>
          <ActivityIndicator />
        </View>
      )
    }

    else{
      return (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Successfully added to your MusicTok playlist on Spotify</Text>
          </View>
        );
    }
  }
}

//Const defined for in-line bolding
const B = (props) => <Text style={{fontWeight: 'bold'}}>{props.children}</Text>

/**
 * Styling implemented in renders
*/const styles = {

  containerStyle: {
    flex: 1,
  },
  miniIconView: {
    height: 50,
    width: 50,
  },

  iconViewStyle: {
    height: 150,
    width: 150,
  },
  containerStyleThree: {
    paddingTop: 55,
    alignItems: 'center',
    justifyContent: 'center'
  },
  followersStyle: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center'
  },
  imgStyle: {
    paddingTop: 10,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'left',
    flexDirection:'row',
  },

  txtStyle: {
    paddingTop: 35,
    alignItems: 'left',
    justifyContent: 'left',
  },
  nameStyle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000000'
  },

  iconContainerStyle: {
    paddingTop: 50,
    alignItems: 'center',
    justifyContent: 'center'
  }
};
