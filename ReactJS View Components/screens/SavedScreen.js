import React, {Component} from 'react';
import { Text, View, Image, Linking, ActivityIndicator, ScrollView} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'


//Const storing the API endpoint for profile data
const dbDataAPI = 'http://0.0.0.0:4444/getsaved'

/**
 * Renders the screen containing user's saved song data
*/
export default class SavedScreen extends React.Component {

  //Constructor states to store fethed JSON data + boolean to store load status
  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      savedData: null
    }
  }

  //Utilizes Fetch API and parses response as JSON
  componentDidMount(){
    return fetch(dbDataAPI)
      .then( (response) => response.json())
      .then ((responseJson) => {
        this.setState({
          isLoading: false,
          savedData: responseJson
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
        <ScrollView style={styles.containerStyle}>
          {this.state.savedData.map((item) => (
            <View style={styles.imgStyle}>
              <Image
                style={styles.miniIconView}
                source={{ uri: item["Art"] }}
              />
              <View style={styles.txtStyle}>
                <Text> <B>Song Name:</B> {item["Song Name"]}</Text>
                <Text> <B>Artist:</B> {item["Artist"]}</Text>
                <Text> <B>Album:</B> {item["Album"]}</Text>
                <Text>{"\n"}</Text>
              </View>
            </View>

          ))}
        </ScrollView>
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

  iconContainerStyle: {
    paddingTop: 50,
    alignItems: 'center',
    justifyContent: 'center'
  }
};
