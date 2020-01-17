import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, Dimensions, TouchableOpacity, Image } from 'react-native';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation';
import Clock from './../icons/clock.png';
import Building from './../icons/store.png';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

export default class SelectedApplication extends Component {
    render() {

        const { navigation } = this.props;
        const item = navigation.getParam('info', 'NO-ID');

        return(
            <View style={{paddingTop: 20}}>
                {/* FIX THIS */}
                <Text style={[styles.text, {fontSize: 28, fontWeight: 600, letterSpacing: 1.5}]}>{item.job}</Text>
                <Text style={[styles.text, {fontWeight: 600}]}>{item.site_address.address.street}, {item.site_address.address.city}</Text>
                <Text style={[styles.text, {fontWeight: 600}]}>{item.company}</Text>
                <Text style={[styles.text, {fontWeight: 600}]}>${item.pay} per hour</Text>

                <View style={{display: 'flex', flexDirection: 'row', marginLeft: 30, alignItems: 'center', marginBottom: 20, marginTop: 10}}>
                    <Image
                        style={{width: 20, height: 20, marginRight: 12}}
                        source={Building}
                    />
                    <Text style={{color: '#000018',fontSize: 17, fontWeight: 300}}>{item.location}</Text>
                </View>

                <View style={{display: 'flex', flexDirection: 'row', marginLeft: 30, alignItems: 'center', marginBottom: 20}}>
                    <Image
                        style={{width: 20, height: 20, marginRight: 12}}
                        source={Clock}
                    />
                    <Text style={{color: '#000018',fontSize: 17, fontWeight: 300}}>{item.time}</Text>
                </View>

                <Text style={[styles.text, {marginBottom: 1}]}>Job Description:</Text>
                <Text style={[styles.text, {fontSize: 15}]}>{item.description}</Text>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    text: {
      color: '#000018',
      marginLeft: 20,
      marginBottom: 12,
      fontSize: 17
    }
  });