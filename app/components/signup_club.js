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


class SignUpClub extends React.Component
{
  state = {
    username: "",
    password: ""
  }

  signup = () => {
    alert(this.state.username);
    const data = {
      username: this.state.username,
      password: this.state.password
    };
    axios.post('http://172.17.78.6:20000/signup_club', { data })
      .then(res => {
        alert(res.data["message"]);
      })
      .catch(err => console.log(err));
  }


  render(){
    return(
      <View style={{marginTop: 150}}>

        <Text style={{textAlignVertical: "center",textAlign: "center", fontSize: 40, fontWeight: 'bold'}}>LocalBuzz</Text>
        <Card title="Club Sign Up">
          <Input label= "Username"
            placeholder=""
            onChangeText={value => this.setState({ username: value })}
          />
          <Input secureTextEntry label= "Password"
             placeholder=""
             onChangeText={value => this.setState({ password: value })}
          />
          <Button
            buttonStyle={{ marginTop: 20 }}
            backgroundColor="#03A9F4"
            title="SIGN UP"
            onPress={() => this.signup()}
          />
        </Card>
      </View>
    )
  }
}

export default SignUpClub;