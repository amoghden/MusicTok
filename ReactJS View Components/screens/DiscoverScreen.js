import React, {Component} from 'react';
import { Text, View, Image, Linking, ActivityIndicator, ScrollView} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'

/**
 * Renders the screen containing user's following data
*/
export default class DiscoverScreen extends React.Component {

  render() {
        return (
          <ScrollView style={styles.containerStyle}>
              <View style={styles.containerStyleThree}>
                <Text style={styles.followersStyle} onPress={() => this.props.navigation.navigate('Trending')}>
                  Trending TikTok music
                  </Text>
              </View>

              <View style={styles.containerStyleThree}>
                <Text style={styles.followersStyle} onPress={() => this.props.navigation.navigate('Recommended')}>
                  Recommended TikTok music
                  </Text>
              </View>

          </ScrollView>
        );
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
    fontSize: 20,
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
