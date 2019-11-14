import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import { Card, Button, Input } from 'react-native-elements';
import {
  Actions,
} from 'react-native-router-flux';
import axios from 'axios';


class Home extends React.Component
{
  state = {
    username: "",
    password: ""
  }

  render(){
    return(
      <View style={{marginTop: 150 ,alignVertical: "center" }}>

        <Text style={{textAlignVertical: "center",textAlign: "center", fontSize: 40, fontWeight: "bold"}}>LocalBuzz</Text>
        <Card>
          <Button
            buttonStyle={{ marginTop: 0}}
            backgroundColor="#03A9F4"
            title="Sign In"
            onPress={() => Actions.login()}
          />
          <Button
            buttonStyle={{ marginTop: 20}}
            backgroundColor="#03A9F4"
            title="Sign Up as Student"
            onPress={() => Actions.signup_user()}
          />
          <Button
            buttonStyle={{ marginTop: 20}}
            backgroundColor="#03A9F4"
            title="Sign In as Club"
            onPress={() => Actions.login_club()}
          />
          <Button
            buttonStyle={{ marginTop: 20}}
            backgroundColor="#03A9F4"
            title="Sign Up as Club"
            onPress={() => Actions.signup_club()}
          />
          <Button
            buttonStyle={{ marginTop: 20}}
            backgroundColor="#03A9F4"
            title="Tic-Tac-Toe"
            onPress={() => Actions.App2()}
          />
        </Card>
      </View>
    )
  }
}

export default Home;