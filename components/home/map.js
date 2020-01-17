import React, { Component } from 'react';
import { app, db } from './../firebase';
import {Platform, StyleSheet, Text, View, Button, Dimensions, TouchableOpacity, Animated, ScrollView, Image } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import Markers from './markers';
import Modal from "react-native-modal";
import ApplyBtns from './apply_btn';
import Cross from './../icons/cross.png';
import ListIcon from './../icons/listIcon.png';
import JobFilter from '../filter/jobFilter';
import MapViewDirections from 'react-native-maps-directions';
const geolib = require('geolib');

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

export default class Map extends Component {
    constructor() {
      super()

      this.state ={
        userLocation: null,
        isMapReady: false,
        isMap2Ready: false,
        markerList: [],
        postedJobs: [],
        isOpen: false,
        isDisabled: false,
        item: 0,
        filterOn: false,
        filterMarkerList: [],
        isLoading: true
      }
      this.filterApply = this.filterApply.bind(this)
      this.filterClear = this.filterClear.bind(this)
    }


    componentDidMount(){
      const settingstate1 = (jobId, docs) => {
          const allData = { jobId: jobId, ...docs }
          const list = this.state.postedJobs.push(allData)
          this.setState({postedJobs: this.state.postedJobs})
      }

      const map = () => {
        this.onMapLayout();
      }

      db.collection('jobs').get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          if (doc.data().postStatus == 'post') {
            settingstate1(doc.id, doc.data())
          }
        })
      }).then(() => {
        map();
      }).catch((error) => {
        console.log('fethcing error', error)
        alert('Trouble Fetching Jobs')
        this.onMapLayout();
      })
    }


    onMapLayout = () => {   
      //get current user -- location_preference
      Geolocation.getCurrentPosition(position => {
        this.setState({userLocation: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02
      }})}),
        
      
      Geocoder.init("AIzaSyBWKKKy_-z7JYV3Bg44inqYujLx78k34gE");
      this.state.postedJobs.forEach(job=> {
        let path = job.site_address.address
        let address1 = path.street + ", " + path.street_2 + ", " + path.city + ", " + path.state + ", " + path.zip
        let fulladdress = address1.split(" ").filter(word => word !== 'null,').filter(word => word !== ',').join(' ')
        if (job.postStatus == 'post') {
          Geocoder.from(fulladdress)
            .then(json => {
              let location = json.results[0].geometry.location;
              let lat = location.lat
              let lng = location.lng
              let meters = geolib.getDistance({latitude: this.state.userLocation.latitude, longitude: this.state.userLocation.longitude}, {latitude: lat, longitude: lng});
              let miles = meters * 0.000621371
              let distance = parseFloat(miles).toFixed(2)
              let numPay = job.pay
              this.state.markerList.push(
                {
                  latlng: {
                    latitude: lat,
                    longitude: lng
                  },
                  userLatLng: {
                    latitude: this.state.userLocation.latitude,
                    longitude: this.state.userLocation.longitude
                  },
                  address: path.street + ", " + path.city + ", " + path.state + ", " + path.zip,
                  pay: `$${numPay}`,
                  pay2: `$${numPay} per hour`,
                  pay3: numPay,
                  company: `${job.company}`,
                  distance: `${distance} miles away`,
                  distance2: distance,
                  userId: job.userId,
                  time: job.time,
                  description: `${job.description}`,
                  job_title: job.job,
                  jobId: job.jobId
                },
              )
            }).then(() => this.setState({ isLoading: false }))
          .catch(error => {alert('Failed to fetch coordinantes'), console.log(error)});
        }
      })
      this.setState({ isMapReady: true })
    }


    filterApply(time, price, distance) {
      while (this.state.filterMarkerList.length > 0) {
        this.state.filterMarkerList.pop();
      } 
      this.setState({filterOn: true})
      const time1 = time.split(' ')
      const time2 = time1[0].charAt(0).toUpperCase() + time1[0].substr(1).toLowerCase()
      const time3 = time1[1].charAt(0).toUpperCase() + time1[1].substr(1).toLowerCase()
      const time4 = `${time2} ${time3}`
      this.state.markerList.map((item) => {
        if (item.time == time4 && item.pay3 > price-4 && item.pay3 <= price + 5 && item.distance2 <= distance+5 && item.distance2 > distance-5) {
          this.state.filterMarkerList.push(item)
        }
      })
    }

    async filterClear() {
      await this.setState({filterOn: false})
      await this.setState({filterMarkerList: []})
    }


    render() {
        const showInfo = (i) => {
          this.setState({item: this.state.filterOn ? this.state.filterMarkerList[i] : this.state.markerList[i], isOpen: true})
        }

        return(
            <View style={{flex: 1}}>
                <MapView
                  provider={'google'}
                  style={{height: height, width: width}}
                  region={this.state.userLocation}
                  showsUserLocation={true} 
                  zoomEnabled={true} 
                >
                  {this.state.isLoading ? null : <Markers markerList={this.state.filterOn ? this.state.filterMarkerList : this.state.markerList} showInfo={showInfo}/>}
                  <Markers markerList={this.state.filterOn ? this.state.filterMarkerList : this.state.markerList} showInfo={showInfo}/>
                </MapView>

                <JobFilter apply={this.filterApply} clear={this.filterClear}/>

                <TouchableOpacity onPress={() => this.props.navigation.navigate('List', {info: this.state.filterOn ? this.state.filterMarkerList : this.state.markerList, filterApply: this.filterApply, filterClear: this.filterClear})} style={styles.toggleBtn}>
                    <Image style={{width: 20, height: 20, margin: 2}} source={ListIcon}/>
                    <Text style={{color: '#BCE338', marginRight: 2, fontSize: 20, fontWeight: 'bold', letterSpacing: 3}}>LIST</Text>
                </TouchableOpacity>



            <Modal
              isVisible={this.state.isOpen}
              animationIn={'slideInDown'}
              animationOut={'bounceOut'}
              deviceWidth={width}
              deviceHeight={height}
              onBackdropPress={() => this.setState({ isOpen: false })}
              onSwipeComplete={() => this.setState({ isOpen: false })}
              swipeDirection={['down', 'left', 'right']}
              style={styles.panel1}
            >
              {/* <TouchableOpacity style={{alignSelf: 'flex-end', paddingTop: 10, marginRight: 4, position: "absolute"}} onPress={() => {this.setState({isOpen: false})}}>
                <Image style={{width: 20, height: 20, marginRight: 20, marginTop: 10}} source={Cross}/>
              </TouchableOpacity> */}
              <MapView
                provider={'google'}
                style={{height: '35%', width: "100%"}}
                region={this.state.userLocation}
                showsUserLocation={true} 
                onLayout={() => {this.setState({isMap2Ready: true}), console.log('map 2 ready')}}
              >
                {this.state.isMap2Ready ? 
                  <View>
                    <MapView.Marker coordinate={this.state.item.userLatLng} pinColor={'#000000'}/>
                    <MapView.Marker coordinate={this.state.item.latlng} pinColor={'#BCE338'}/>
                    <MapViewDirections
                      origin={this.state.item.userLatLng}
                      destination={this.state.item.latlng}
                      apikey={'AIzaSyBWKKKy_-z7JYV3Bg44inqYujLx78k34gE'}
                      strokeWidth={6}
                      strokeColor={'#BCE338'}
                    />
                  </View>
                  : null
                }
              </MapView>
              <View style={{marginLeft: 17, height: '65%', paddingTop: 20}}>
                <ScrollView style={{height: '100%', width: '100%'}}>
                  <Text style={[styles.text, {fontSize: 22, fontWeight: '700', textTransform: 'uppercase', paddingBottom: 1}]}>{this.state.item.job_title}</Text>
                  <Text style={[styles.text, {fontSize: 18, textTransform: 'uppercase', paddingBottom: 7, fontWeight: '500'}]}>{this.state.item.company}</Text>
                  <Text style={[styles.text, {paddingBottom: 7, fontSize: 18, color: 'grey'}]}>{this.state.item.address}</Text>
                  <Text style={[styles.text, {fontSize: 18, paddingBottom: 10, color: 'grey'}]}>{this.state.item.distance} from you</Text>
                  <Text style={[styles.text, {paddingBottom: 10, color: '#BCE338', fontSize: 21, fontWeight: '700', textTransform: 'uppercase'}]}>{this.state.item.time}  I  {this.state.item.pay2}</Text>
                  <Text style={[styles.text, {paddingBottom: 0, fontSize: 20, fontWeight: '700'}]}>Job Description:</Text>
                  <Text style={[styles.text, {fontSize: 17, color: 'grey', paddingBottom: 100, marginRight: 5}]}>{this.state.item.description}</Text>
                </ScrollView>
              </View>
              <ApplyBtns jobId={this.state.item.jobId} userId={this.state.item.userId} navigation={this.props.navigation}/>
            </Modal>

            </View>
        )
    }
}



const styles = StyleSheet.create({
  toggleBtn: {
    position: 'absolute',
    flexDirection: 'row',
    top: '93.5%',
    height: 43,
    backgroundColor: '#000018', 
    borderRadius: 5,
    flexDirection: 'row', 
    justifyContent: 'space-evenly',
    alignItems: 'center', 
    alignSelf: 'flex-end',
    right: 13,
    width: 107
  },
  btn: {
    backgroundColor: '#000018',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%'
  },
  panel1: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: 150/16

  },
  text: {
    color: '#000018'
  }
});




