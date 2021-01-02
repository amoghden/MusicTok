import React, {Component} from 'react';
import { Text, View, Image, Linking, ActivityIndicator, ScrollView, Button, TextInput} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'

//Const storing the API endpoint for profile data
const queryEndpoint = 'http://0.0.0.0:4444/query/'


/**
 * Renders the screen that displays results after a query has been made
*/
export default class SearchScreen extends React.Component {

  //Constructor states to store fethed JSON data + boolean to store load status
  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      TikTokData: null,
      TikTokLink: ''
    }
  }

  //Utilizes Fetch API and parses response as JSON
  componentDidMount(){
    var tiktokUrl = this.props.navigation.getParam('url', 'https://www.tiktok.com/@amoghden/video/6842343192579312902?source=h5_m');
    var apiCall = queryEndpoint.concat(JSON.stringify(tiktokUrl))
    return fetch(apiCall)
      .then( (response) => response.json())
      .then ((responseJson) => {
        this.setState({
          isLoading: false,
          TikTokData: responseJson,
          TikTokLink: tiktokUrl
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

      //if backend was able to determine the song successfully, display Spotify data
      if(this.state.TikTokData.status == "success"){
        return (
          <ScrollView style={styles.containerStyle}>
            <View style={styles.containerStyleFour}>
              <Text style={styles.songName}>Good news, we found the song! </Text>
            </View>

            <View style={styles.iconContainerStyle}>
              <Image
                style={{width: 200, height: 200}}
                source={{ uri: this.state.TikTokData.result.spotify.album.images[0].url}}
              />
            </View>

            <View style={styles.containerStyleOverlay}>
              <View style={styles.containerStyleThree}>

                <Text> <B>Song name:</B> {this.state.TikTokData.result.spotify.name}</Text>
                <Text> <B>Artist:</B> {this.state.TikTokData.result.artist}</Text>
                <Text> <B>Album:</B> {this.state.TikTokData.result.album}</Text>
                <Text> <B>Release Date:</B> {this.state.TikTokData.result.release_date}</Text>
              </View>
            </View>

            <View style={styles.containerStyleTwo}>
              <Text style={styles.listen} onPress={ ()=> Linking.openURL(this.state.TikTokData.result.song_link) }>
                Stream this song
                </Text>
            </View>

            <View style={styles.containerStyleTwo}>
              <Text style={styles.listen} onPress={ ()=> Linking.openURL("http://127.0.0.1:5000/addsong/" + this.state.TikTokLink) }>
                Add to playlist
                </Text>
            </View>

            <View style={styles.containerStyleTwo}>
              <Text style={styles.listen} onPress={ ()=> Linking.openURL("http://127.0.0.1:5000/savesong/" + this.state.TikTokData.result.spotify.name + "/" + this.state.TikTokData.result.artist + "/" + this.state.TikTokData.result.album + "/" + this.state.TikTokData.result.spotify.album.images[0].url) }>
                Save this song
                </Text>
            </View>


          </ScrollView>
        );
      }

      //if backend was unable to determine the song successfully, display TikTok audio data
      else if(this.state.TikTokData.status == "fail"){
        return (
          <ScrollView style={styles.containerStyle}>
            <View style={styles.containerStyleFour}>
              <Text style={styles.songName}>Sorry, this is all we know: </Text>
            </View>

          <View style={styles.iconContainerStyle}>
              <Image
                style={{width: 200, height: 200}}
                source={{ uri: this.state.TikTokData.album_art_medium}}
              />
          </View>

          <View style={styles.containerStyleOverlay}>
            <View style={styles.containerStyleThree}>
              <Text> <B>Song name:</B> {this.state.TikTokData.title}</Text>
              <Text> <B>Artist:</B> {this.state.TikTokData.artist}</Text>
              <Text> <B>Album:</B> {this.state.TikTokData.album}</Text>
            </View>
          </View>

          <View style={styles.containerStyleTwo}>
            <Text style={styles.listen} onPress={ ()=> Linking.openURL(this.state.TikTokData.song_link) }>
              Listen to this song
              </Text>
          </View>

          </ScrollView>
        );
      }
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
  songName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center'
  },

  listen: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#38A1C6',
    textAlign: 'center'
  },

  containerStyleThree: {
    paddingTop: 20,
    alignItems: 'left',
    justifyContent: 'left',
  },

  containerStyleFour: {
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  containerStyleOverlay: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  containerStyleTwo: {
    paddingTop: 30,
    alignItems: 'center',
    justifyContent: 'center'
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
  textInput: {
       height: 50,
       width: "100%",
       borderColor: "black",
       borderWidth: 1,
       fontSize:20,
   },

  iconContainerStyle: {
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonStyle:{
    width: "100%",
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },

};
