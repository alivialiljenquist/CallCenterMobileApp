import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, Button, Dimensions, Image } from 'react-native';
import { createAppContainer, createStackNavigator, createMaterialTopTabNavigator, StackActions, NavigationActions, TabNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import MapScreen from './components/home/map';
import ListHome from './components/home/listHome';
import Applications from './components/applications/applicationsPage';

import SelectedJob from './components/home/selectedJob'
import SelectedApplication from './components/applications/selectedApplication'

import SearchIcon from './components/icons/search.png';
import ListIcon from './components/icons/list.png';
import GearIcon from './components/icons/gear.png';

import SearchGreen from './components/icons/searchGreen.png';
import ListGreen from './components/icons/listGreen.png';
import GearGreen from './components/icons/gearGreen.png';

import Settings from './components/settings/settingsPage';
import LogIn from './components/settings/logIn';
import Screen1 from './components/settings/jobBuilderScreens/screen1';
import Screen2 from './components/settings/jobBuilderScreens/screen2';
import Screen3 from './components/settings/jobBuilderScreens/screen3';
import Screen4 from './components/settings/jobBuilderScreens/screen4';
import Screen5 from './components/settings/jobBuilderScreens/screen5';


// Works Better
export const ResumeBuilderStack = createStackNavigator({
  Builder1: { screen: Screen1 },
  Builder2: { screen: Screen2 },
  Builder3: { screen: Screen3 },
  Builder4: { screen: Screen4 },
  Builder5: { screen: Screen5 }
}, {
  initialRoute: 'Builder1',
  headerMode: 'none',
  navigationOptions: {
      headerVisible: false,
  }
})

export const SettingsScreenStack = createStackNavigator({
  Profile: { screen: Settings },
  JobBuilder: { screen: ResumeBuilderStack },
  LogIn: { screen: LogIn }
}, {
  initialRoute: 'Profile',
  headerMode: 'none',
  navigationOptions: {
      headerVisible: false,
  }
})

export const ApplicantScreenStack = createStackNavigator({
  Applicant: { screen: Applications },
  SelectedApp: { screen: SelectedApplication }
}, {
  initialRoute: 'Applicant',
  defaultNavigationOptions: {
    title: 'APPLICATIONS',
    headerTintColor: '#000',
    headerStyle: {
      backgroundColor: '#fff',
    }
  }
})

export const ListScreenStack = createStackNavigator({
  List: { screen: ListHome },
  Selected: { screen: SelectedJob, navigationOptions: { title: null }}
}, {
  initialRoute: 'List',
  defaultNavigationOptions: {
    title: 'LIST',
    headerTintColor: '#000',
    headerStyle: {
      backgroundColor: '#fff',
    }
  }
})

export const HomeScreenStack = createStackNavigator({
  Map: { screen: MapScreen },
  List: { screen: ListScreenStack }
}, {
  initialRoute: 'Map',
  headerMode: 'none',
  navigationOptions: {
      headerVisible: false,
  }
})

const AppNavigation =  createMaterialTopTabNavigator({
  Jobs: {
    screen: HomeScreenStack,
    navigationOptions: {
      tabBarLabel: 'Jobs',
      tabBarIcon: ({tintColor})=>(
      <Image
        style={tintColor=="#BCE338" ? {width: 42, height: 42, marginLeft: 3} : {width: 35, height: 35}}
        source={tintColor=="#BCE338" ? SearchGreen : SearchIcon}
      />)
    }
  },
  Applications: {
    screen: ApplicantScreenStack,
    navigationOptions: {
      tabBarLabel: 'Applications',
      tabBarIcon: ({tintColor})=>(
      <Image
        style={tintColor=="#BCE338" ? {width: 30, height: 35, marginTop: 2} : {width: 25, height: 34, marginTop: 2}}
        source={tintColor=="#BCE338" ? ListGreen : ListIcon}
      />)
    }
  },
  Profile: {
    screen: SettingsScreenStack,
    navigationOptions: {
      tabBarLabel: 'Profile',
      tabBarIcon: ({tintColor})=>(
      <Image
        style={tintColor=="#BCE338" ? {width: 39, height: 39,  marginTop: 1} : {width: 34, height: 34,  marginTop: 1}}
        source={tintColor=="#BCE338" ? GearGreen : GearIcon}
      />)
    }
  }
},
{
  tabBarPosition: 'bottom',
  tabBarOptions: {
    activeTintColor: '#BCE338',
    inactiveTintColor: 'gray',
    showIcon: true,
    style: {
      backgroundColor: 'white',
      height: 90,
      marginBottom: -7.5,
      paddingTop: 5,
      borderTopColor: 'grey',
      borderTopWidth: 0.5
    },
    labelStyle: {
      textTransform: 'capitalize',
      fontSize: 12,
      marginTop: 7
    }
  },
}
);




export default createAppContainer(AppNavigation);











