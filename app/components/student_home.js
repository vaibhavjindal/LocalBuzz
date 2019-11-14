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


class StudentHome extends React.Component
{
  state = {
    username: this.props.username,
    club_username: "",
    my_clubs: this.props.my_clubs
  };

  club_feed = (club) => {
    const data = {
      username: club
    }
    axios.post('http://172.17.78.6:20000/club_feed', {data})
    .then(res => {
      if(res.data["status"] == 0)
      {
        alert("PLease try again!");
      }
      else
      {
        Actions.club_feed({
          username: res.data["username"],
          my_posts: res.data["my_posts"]
        });
      }
    })
    .catch(err => console.log(err));
  }  

  render(){
    return(
      <ScrollView style={{marginTop: 75}}>

        <Text style={{textAlignVertical: "center",textAlign: "center", fontSize: 40, fontWeight: "bold"}}>Welcome {this.props.username}!</Text>
        <Button
            buttonStyle={{ marginTop: 20}}
            backgroundColor="#03A9F4"
            title="Logout"
            onPress={() => Actions.home()}
          />
        <Button
            buttonStyle={{ marginTop: 20}}
            backgroundColor="#03A9F4"
            title="Subscribe"
            onPress={() => Actions.new_club({username: this.props.username, clubs: this.props.my_clubs})}
          />

        <Card title="Subscribed Clubs">
        {this.state.my_clubs.map(club => (
          <Button
            buttonStyle={{ marginTop: 20}}
            backgroundColor="#03A9F4"
            title={club.username_club}
            onPress={() => this.club_feed(club.username_club)}
          />
        ))}
        </Card>
      </ScrollView>
    )
  }
}

export default StudentHome;