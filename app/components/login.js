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


class Login extends React.Component
{
  state = {
    username: "",
    password: ""
  }


  login = () => {
    const data = {
      username: this.state.username,
      password: this.state.password
    }
    axios.post('http://172.17.78.6:20000/login_student', {data})
    .then(res => {
      if(res.data["status"] == 0)
      {
        alert("Incorrect Username or Password");
      }
      else
      {
        Actions.student_home({
          username: res.data["username"],
          my_clubs: res.data["my_clubs"]
        });
      }
    })
    .catch(err => console.log(err));
  }

  render(){
    return(
      <View style={{marginTop: 150}}>

        <Text style={{textAlignVertical: "center",textAlign: "center", fontSize: 40, fontWeight: "bold"}}>LocalBuzz</Text>
        <Card title="Sign In">
          <Input 
            label= "Username"
            placeholder=""
            onChangeText={value => this.setState({ username: value })}
          />
          <Input secureTextEntry label= "Password"
             placeholder=""
             onChangeText={value => this.setState({ password: value })}
          />
          <Button
            buttonStyle={{ marginTop: 20}}
            backgroundColor="#03A9F4"
            title="Sign In"
            onPress={() => this.login()}
          />
        </Card>
      </View>
    )
  }
}

export default Login;