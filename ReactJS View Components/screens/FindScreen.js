import React, {Component} from 'react';
import { Text, View, Image, Linking, ActivityIndicator, ScrollView, Button} from 'react-native';
import { TextInput } from 'react-native-paper';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'

/**
 * Renders the screen containing user's following data
*/
export default class FindScreen extends React.Component {

  //Constructor states to store fethed JSON data + boolean to store load status
  constructor(props){
    super(props);
    this.state = {
      TikTokQuery: '',
    }
  }

  render() {
      return (
        <View>
          <TextInput
            value={this.state.TikTokQuery}
            onChangeText={TikTokQuery => this.setState({ TikTokQuery })}
            label={'Enter TikTok URL'}
          />

          <View style={styles.buttonStyle}>
            <Button
            title="Submit"
            onPress={() =>
              this.props.navigation.navigate('Search', {
              url: this.state.TikTokQuery,
              })
            }
          />
          </View>


          <View style={styles.containerStyleTwo}>
            <Text style={styles.bioStyle}>
              To retrieve a valid TikTok link, click the triple dots to open share options.
              In the "Share to" tab, click on "Other" and select the "Copy" option.
              </Text>
          </View>



        </View>

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

  imgStyle: {
    paddingTop: 10,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'left',
    flexDirection:'row',
  },
  bioStyle: {
    paddingTop: 50,
    fontSize: 15,
    color: '#000000',
    textAlign: 'center'
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
    paddingTop: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonStyle:{
    width: "100%",
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  containerStyleTwo: {
    paddingTop: 7.5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  containerStyleThree: {
    paddingTop: 55,
    alignItems: 'center',
    justifyContent: 'center'
  }
};
