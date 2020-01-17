import React, { Component } from 'react';
import LeftArrow from './../icons/leftArrow.png';
import ApplyBtns from './apply_btn';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {Platform, StyleSheet, Text, View, Button, Dimensions, TouchableOpacity, Animated, ScrollView, Image } from 'react-native';


export default class SelectedJob extends Component {
    constructor() {
        super()
        this.state = {
            isMap2Ready: false
        }
    }
    render() {

        const { navigation } = this.props;
        const item = navigation.getParam('info', 'NO-ID');

        return(
            <View style={{flex: 1}}>
                <MapView
                    provider={'google'}
                    style={{height: '35%', width: "100%"}}
                    region={{latitude: item.userLatLng.latitude, longitude: item.userLatLng.longitude, latitudeDelta: 0.02, longitudeDelta: 0.02}}
                    showsUserLocation={true} 
                    onLayout={() => {this.setState({isMap2Ready: true})}}
                >
                    {this.state.isMap2Ready ? 
                    <View>
                        <MapView.Marker coordinate={item.userLatLng} pinColor={'#000000'}/>
                        <MapView.Marker coordinate={item.latlng} pinColor={'#BCE338'}/>
                        <MapViewDirections
                            origin={item.userLatLng}
                            destination={item.latlng}
                            apikey={'AIzaSyBWKKKy_-z7JYV3Bg44inqYujLx78k34gE'}
                            strokeWidth={6}
                            strokeColor={'yellowgreen'}
                        />
                    </View>
                    : null
                    }
                </MapView>
                <View style={{marginLeft: 17, height: '65%', paddingTop: 20}}>
                    <ScrollView style={{height: '100%', width: '100%'}}>
                    <Text style={[styles.text, {fontSize: 22, fontWeight: '700', textTransform: 'uppercase', paddingBottom: 1}]}>{item.job_title}</Text>
                    <Text style={[styles.text, {fontSize: 18, textTransform: 'uppercase', paddingBottom: 7, fontWeight: '500'}]}>{item.company}</Text>
                    <Text style={[styles.text, {paddingBottom: 7, fontSize: 18, color: 'grey'}]}>{item.address}</Text>
                    <Text style={[styles.text, {fontSize: 18, paddingBottom: 10, color: 'grey'}]}>{item.distance} from you</Text>
                    <Text style={[styles.text, {paddingBottom: 10, color: '#BCE338', fontSize: 21, fontWeight: '700', textTransform: 'uppercase'}]}>{item.time}  I  {item.pay2}</Text>
                    <Text style={[styles.text, {paddingBottom: 0, fontSize: 20, fontWeight: '700'}]}>Job Description:</Text>
                    <Text style={[styles.text, {fontSize: 17, color: 'grey', paddingBottom: 100, marginRight: 5}]}>{item.description}</Text>
                    </ScrollView>
                </View>

                <ApplyBtns jobId={item.jobId} userId={item.userId} navigation={this.props.navigation} height='40%'/>
            </View>
        )
    }
}



const styles = StyleSheet.create({
  text: {
    color: '#000018'
  }
});


  