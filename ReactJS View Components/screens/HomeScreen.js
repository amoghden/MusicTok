import React, {Component} from 'react';
import { Text, View, Image, Linking, ActivityIndicator, Button} from 'react-native';

/**
 * Renders the home screen containing 3 clickable button options
*/
export default class HomeScreen extends React.Component {

  render(){
      return (
      <View>
        <View style={styles.iconContainerStyle}>
          <Image
            style={{width: 150, height: 150}}
            source={{ uri: 'https://i.ibb.co/GTrrjBd/Tiktok-icon.png'}}
          />
        </View>

        <View style={styles.containerStyle}>
          <Text style={styles.nameStyle}>
            Welcome to MusicTok
            </Text>
          <Text style={styles.subnameStyle}>
            Bringing song detection and Spotify integration to TikTok
            </Text>
        </View>

        <View style={styles.containerStyleThree}>
          <Text style={styles.followersStyle} onPress={() => this.props.navigation.navigate('Find')}>
            Find a song
            </Text>
        </View>

        <View style={styles.containerStyleThree}>
          <Text style={styles.followersStyle} onPress={() => this.props.navigation.navigate('Discover')}>
            Discover new music
            </Text>
        </View>

        <View style={styles.containerStyleThree}>
          <Text style={styles.followersStyle} onPress={() => this.props.navigation.navigate('Saved')}>
            Saved Songs
            </Text>
        </View>

      </View>
    );
  }
}



/**
 * Styling implemented in renders
*/
const styles = {

  iconContainerStyle: {
    paddingTop: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  containerStyle: {
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  containerStyleThree: {
    paddingTop: 55,
    alignItems: 'center',
    justifyContent: 'center'
  },
  nameStyle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000000'
  },
  subnameStyle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000000'
  },
  followersStyle: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center'
  }
};
