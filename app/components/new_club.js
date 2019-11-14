import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';

import { Card, Button, Input } from 'react-native-elements';
import {
  Actions,
} from 'react-native-router-flux';
import axios from 'axios';


class NewClub extends React.Component
{
  state = {
    username: this.props.username,
    club_username: ""
  };

  subscribe = () => {
    const data = {
      username: this.props.username,
      club: this.state.club_username
    }
    axios.post('http://172.17.78.6:20000/subscribe', {data})
    .then(res => {
      if(res.data["status"] == 0)
      {
        alert("No such club exists!");
      }
      else
      {
        alert("Subscribed successfully! Please Login again to view the changes.")
        Actions.login();
      }
    })
    .catch(err => console.log(err));
  }

  render(){
    return(
      <ScrollView style={{marginTop: 75}}>

        <Card title="Subscribe">
          <Input 
            label= "Club Username"
            placeholder=""
            onChangeText={value => this.setState({ club_username: value })}
          />
          <Button
            buttonStyle={{ marginTop: 20}}
            backgroundColor="#03A9F4"
            title="Subscribe"
            onPress={() => this.subscribe()}
          />
        </Card>          
      </ScrollView>
    )
  }
}

export default NewClub;