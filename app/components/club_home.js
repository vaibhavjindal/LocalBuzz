import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  ScrollView,
} from 'react-native';
import ToDoNote from './note';


import { Card, Button, Input } from 'react-native-elements';
import {
  Actions,
} from 'react-native-router-flux';
import axios from 'axios';
import Constants from 'expo-constants';

class ClubHome extends React.Component
{
  state = {
    username: this.props.username,
    heading: "",
    message: "",
    time: "",
    my_posts: this.props.my_posts,
    location: ""
  };


  post = () => {
    this.state.time = new Date().toLocaleString();
    const data = {
      username: this.props.username,
      heading: this.state.heading,
      message: this.state.message,
      time: this.state.time
    }
    axios.post('http://172.17.78.6:20000/new_post', {data})
    .then(res => {
      if(res.data["status"] == 0)
      {
        alert("Not able to post. Please try again later.");
      }
      else
      {
        alert("Posted successfully on club's channel.")
        this.state.heading = "";
        this.state.message = "";
      }
    })
    .catch(err => console.log(err));
  }

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

post_loc = () => {
    this.state.time = new Date().toLocaleString();
    var loca = "";

    navigator.geolocation.getCurrentPosition(
      position => {
        loca = "Latitute: "+String(position["coords"]["latitude"])+" Longitude: "+String(position["coords"]["longitude"]);
        this.setState({location: loca});
        data = {
          username: this.props.username,
          heading: this.state.heading,
          message: this.state.message + " Current Location: " + this.state.location,
          time: this.state.time
        }
        axios.post('http://172.17.78.6:20000/new_post', {data})
        .then(res => {
          if(res.data["status"] == 0)
          {
            alert("Not able to post. Please try again later.");
          }
          else
          {
            alert("Posted successfully on club's channel.")
            this.state.heading = "";
            this.state.message = "";
          }
        })
        .catch(err => console.log(err));

          },
          error => Alert.alert(error.message),
          { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );    
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
            title="Previous Posts"
            onPress={() => this.club_feed(this.props.username)}
          />

        <Card title="New Post">
          <Input 
            label= "Heading"
            placeholder=""
            onChangeText={value => this.setState({ heading: value })}
          />
          <Input label= "Message"
             placeholder=""
             onChangeText={value => this.setState({ message: value })}
          />
          <Button
            buttonStyle={{ marginTop: 20}}
            backgroundColor="#03A9F4"
            title="Post"
            onPress={() => this.post()}
          />
          <Button
            buttonStyle={{ marginTop: 20}}
            backgroundColor="#03A9F4"
            title="Post with current location"
            onPress={() => this.post_loc()}
          />
        </Card>

      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    fontWeight: "bold"
  },
})



export default ClubHome;