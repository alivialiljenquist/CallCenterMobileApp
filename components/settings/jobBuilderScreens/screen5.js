import React, { Component } from 'react';
import { app, db } from '../../firebase';
import { Text, View, Button, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import JobSteps from './../stepIndicator';
import Checkbox from 'react-native-modest-checkbox';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

export default class Screen5 extends Component {
    constructor() {
        super()

        this.state = {
            id: null,
            checkboxes: [],
            checkbool1: false,
            checkbool2: false,
            checkbool3: false,
            checkbool4: false,
            checkbool5: false,
        }
        this.onNext = this.onNext.bind(this)
        this.postData = this.postData.bind(this)
    }

    postData = () => {
        if (this.state.checkbool1 == true) {
            this.state.checkboxes.push('Salesforce')
            console.log('push')
        }
        if (this.state.checkbool2 == true) {
            this.state.checkboxes.push('Microsoft dynamics')
        }
        if (this.state.checkbool3 == true) {
            this.state.checkboxes.push('Netsuites')
        }
        if (this.state.checkbool4 == true) {
            this.state.checkboxes.push('Oracle')
        }
        if (this.state.checkbool5 == true) {
            this.state.checkboxes.push('Other')
        }

        var crms = this.state.checkboxes
        var nav = this.props.navigation
        app.auth().onAuthStateChanged(function(user) {
            if (user) {
                db.collection("applicants").where('userId', '==', user.uid).get().then((queryData) => {
                    queryData.forEach((doc) => {
                        db.collection("applicants").doc(doc.id).update({
                            crms: crms,
                            profile_step: 100
                        })
                    })
                }).then(() => nav.navigate('Profile'))
            } else {
              // No user is signed in.
              // Go To Got Signed Out Page
            }
          });
    }


    onNext = () => {
        this.postData()
    }

    render() {
        return(
            <View style={{flex: 1}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', marginBottom: 30, marginTop: 50, borderBottomColor: 'grey', borderBottomWidth: 0.5, paddingBottom: 8}}>
                    <Text style={styles.counter}>4/4</Text>
                    <Text style={styles.header}>EXPERIENCE</Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile')}><Text style={styles.header}>X</Text></TouchableOpacity>                
                </View>
                <View style={{flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', marginBottom: 10}}>
                    <Text style={{color: '#000018', paddingRight: 20, paddingLeft: 20, fontSize: 17, marginBottom: 10}}>Let potential employers know about you call center experience</Text>
                    <View style={{width: width-35, marginBottom: 30}}>
                        <Text style={{color: '#000018', fontWeight: 'bold', fontSize: 18, paddingBottom: 8,}}>Do you have any experience with any of these CRM's?</Text>
                        <Checkbox
                            checkboxStyle={{width: 35, height: 35}}
                            labelStyle={{padding: 10, letterSpacing: 1}}
                            label='Salesforce'
                            onChange={() => this.setState({checkbool1: !this.state.checkbool1})}
                            checked={this.state.checkbool1}
                        />
                        <Checkbox
                            checkboxStyle={{width: 35, height: 35}}
                            labelStyle={{padding: 10, letterSpacing: 1}}
                            label='Microsoft dynamics'
                            onChange={() => this.setState({checkbool2: !this.state.checkbool2})}
                            checked={this.state.checkbool2}
                        />
                        <Checkbox
                            checkboxStyle={{width: 35, height: 35}}
                            labelStyle={{padding: 10, letterSpacing: 1}}
                            label='Netsuites'
                            onChange={() => this.setState({checkbool3: !this.state.checkbool3})}
                            checked={this.state.checkbool3}
                        />
                        <Checkbox
                            checkboxStyle={{width: 35, height: 35}}
                            labelStyle={{padding: 10, letterSpacing: 1}}
                            label='Oracle'
                            onChange={() => this.setState({checkbool4: !this.state.checkbool4})}
                            checked={this.state.checkbool4}
                        />
                        <Checkbox
                            checkboxStyle={{width: 35, height: 35}}
                            labelStyle={{padding: 10, letterSpacing: 1}}
                            label='Other'
                            onChange={() => this.setState({checkbool5: !this.state.checkbool5})}
                            checked={this.state.checkbool5}
                        />
                        
                    </View>
                </View>
                <JobSteps currentPosition={4}/>
                <View style={styles.container}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={[styles.btn, {borderRightColor: 'white', borderRightWidth: 0.5}]}><Text style={{color: '#BCE338', fontSize: 19, fontWeight: 'bold', letterSpacing: 2}}>BACK</Text></TouchableOpacity>
                    <TouchableOpacity onPress={this.onNext} style={[styles.btn, {borderLeftColor: 'white', borderLeftWidth: 0.5}]}><Text style={{color: '#BCE338', fontSize: 19, fontWeight: 'bold', letterSpacing: 2}}>FINISH</Text></TouchableOpacity>
                </View>
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
    },
    header: {
        color: '#000018',
        fontSize: 20,
        letterSpacing: 5,
        fontWeight: 'bold'
    },
    counter: {
        color: '#BCE338',
        backgroundColor: "#000018",
        padding: 7,
        fontSize: 15
    }
  });