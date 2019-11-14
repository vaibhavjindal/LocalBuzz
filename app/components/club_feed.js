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

class ClubFeed extends React.Component
{
  state = {
    username: this.props.username,
    my_posts: this.props.my_posts
  };

  render(){
    return(
      <ScrollView style={{marginTop: 15}}>
        <Text style={{textAlignVertical: "center",textAlign: "center", fontSize: 40, fontWeight: "bold"}}>{this.props.username}</Text>     
        <Card title="Posts">

        {this.state.my_posts.reverse().map(note => (
          // A <ToDoNote> component for every note
          <ToDoNote
            note={note}
            key={note.time} // Unique, required while listing components
          ></ToDoNote>
        ))}
        
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



export default ClubFeed;