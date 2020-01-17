import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, Button, Dimensions, TouchableOpacity, Animated, ScrollView } from 'react-native';
import { app, db } from './../firebase';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

export default class ApplyBtns extends Component {
    constructor(props) {
      super(props);

      this.handleApply = this.handleApply.bind(this)
      this.handleRefer = this.handleRefer.bind(this)
    }

    handleApply = async () => {
      const id = this.props.jobId
      const userId = this.props.userId
      const nav = this.props.navigation

      app.auth().onAuthStateChanged(function(user) {
        if (user) {
            db.collection("applicants").where('userId', '==', user.uid).get().then((queryData) => {
                queryData.forEach((doc) => {
                  db.collection("applied").doc().set({
                    applicantId: doc.id,
                    applied_status: 'inProgress',
                    applied_time: new Date(),
                    jobId: id,
                    userId: userId
                  })
                })
            }).then(() => {nav.goBack(), alert('Applied')})
        } else {
          // No user is signed in.
          // Go To Got Signed Out Page
        }
      });
    };

    handleRefer() {
        alert('Refered')
    }

    render() {
        return(
            <View style={styles.container}>
                <TouchableOpacity style={[styles.btn, {borderRightColor: 'white', borderRightWidth: 0.5}]} onPress={this.handleApply}><Text style={{color: '#BCE338', fontSize: 19, fontWeight: 'bold', letterSpacing: 2}}>APPLY</Text></TouchableOpacity>
                <TouchableOpacity style={[styles.btn, {borderLeftColor: 'white', borderLeftWidth: 0.5}]} onPress={this.handleRefer}><Text style={{color: '#BCE338', fontSize: 19, fontWeight: 'bold', letterSpacing: 2}}>REFER</Text></TouchableOpacity>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    btn: {
      backgroundColor: '#000018',
      alignItems: 'center',
      justifyContent: 'center',
      width: '50%'
    },
    container: {
        flexDirection: 'row', 
        height: 60,
        position: 'absolute', //Here is the trick
        bottom: 0, //Here is the trick
        width: width,
    }
  });



