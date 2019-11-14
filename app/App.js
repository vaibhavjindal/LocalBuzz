import React, { Component } from 'react';
import Home from "./components/home";
import SignUpUser from "./components/signup_user";
import SignUpClub from "./components/signup_club";
import Login from "./components/login";
import SignInClub from "./components/login_club";
import ClubHome from "./components/club_home";
import StudentHome from "./components/student_home";
import ClubFeed from "./components/club_feed";
import App2 from "./components/App2";
import NewClub from "./components/new_club";
import { Platform, StyleSheet, Text, View } from 'react-native';

import { AppLoading } from 'expo';
import { Root, Container, Header, Left, Body, Right, Title } from 'native-base';
import { Router, Scene } from 'react-native-router-flux';

export default class App extends Component {
  render() {
    return (
      <Router>
        <Scene key="root" panHandlers={null}>
        <Scene key="home" component={Home} title = "Login" type="reset" hideNavBar/>
        <Scene key="signup_user" component={SignUpUser} title = "User Sign Up" />
        <Scene key="login" component={Login} title = "User Sign In" />
        <Scene key="signup_club" component={SignUpClub} title = "Club Sign Up" />
        <Scene key="login_club" component={SignInClub} title = "Club Sign In" />
        <Scene key="club_home" component={ClubHome} title = "Club Home" type="reset" hideNavBar/>
        <Scene key="student_home" component={StudentHome} title = "Student Home" type="reset" hideNavBar/>
        <Scene key="club_feed" component={ClubFeed} title = "Club Feed" />
        <Scene key="App2" component={App2} title = "TTT" />
        <Scene key="new_club" component={NewClub} title = "Subscribe" />
        </Scene>
      </Router>  
    );
  }
}
