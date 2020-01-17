import React, { Component } from 'react';
import { app, db } from '../../firebase';
import { Text, View, Button, StyleSheet, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import JobSteps from './../stepIndicator';
import { ButtonGroup } from 'react-native-elements';
import AddressAutoComplete from '../address-auto-complete';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

export default class Screen2 extends Component {
    constructor() {
        super()

        this.state = {
            id: null,
            address: '',
            selectedIndex: 0,
            error: '',
            errorVisible: false
        }
        this.postData = this.postData.bind(this)
        this.updateIndex = this.updateIndex.bind(this)
        this.onNext = this.onNext.bind(this)
    }

    updateIndex(selectedIndex) {
        this.setState({selectedIndex: selectedIndex})
    }

    postData = () => {
        var address = this.state.address
        var index = this.state.selectedIndex
        var nav = this.props.navigation
        app.auth().onAuthStateChanged(function(user) {
            if (user) {
                db.collection("applicants").where('userId', '==', user.uid).get().then((queryData) => {
                    queryData.forEach((doc) => {
                        db.collection("applicants").doc(doc.id).update({
                            home_address: address,
                            location_preference: 'home',
                            availability: index == 0 ? 'Full Time' : 'Part Time',
                            profile_step: 3
                        })
                    })
                }).then(() => nav.navigate('Builder3'))
            } else {
              // No user is signed in.
              // Go To Got Signed Out Page
            }
        });
    }


    onNext = () => {
        if (this.state.address == '' || this.state.selectedIndex == '' ) {
            this.setState({error: '*Please Fill All Items*', errorVisible: true})
        } else {
            this.postData()
        }
    }

    render() {
        const showInfo = (address) => {
            this.setState({address: address})
            console.log('address', address)
        }

        return(
            <View style={{flex: 1}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', marginBottom: 10, marginTop: 50, borderBottomColor: 'grey', borderBottomWidth: 0.5, paddingBottom: 8}}>
                    <Text style={styles.counter}>2/4</Text>
                    <Text style={styles.header}>JOB PREFERENCES</Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile')}><Text style={styles.header}>X</Text></TouchableOpacity>                
                </View>
                <View style={{flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', marginBottom: 15}}>
                    <Text style={{color: '#000018', paddingRight: 20, paddingLeft: 20, fontSize: 17}}>These questions will help us find better jobs for you</Text>
                    <View style={{minHeight: '30%'}}>
                        <Text style={{color: '#000018', fontWeight: 'bold', fontSize: 18, paddingBottom: 4}}>Address</Text>
                        <AddressAutoComplete setAddress={showInfo}/>
                    </View>
                    <View style={{height: '25%', marginBottom: 10}}>
                        <Text style={{color: '#000018', fontWeight: 'bold', fontSize: 18, paddingBottom: 4, alignSelf: 'flex-start'}}>Schedule Availibility</Text>
                        <ButtonGroup
                            onPress={this.updateIndex}
                            selectedIndex={this.state.selectedIndex}
                            buttons={['FULL TIME', 'PART TIME']}
                            containerStyle={{height: 65, borderColor: 'lightgrey', borderWidth: 0.5, width: width-37, alignSelf: 'center'}}
                            selectedButtonStyle={{backgroundColor: '#BCE338'}}
                            selectedTextStyle={{fontWeight: 'bold', color: '#000018'}}
                            innerBorderStyle={{color: 'transparent'}}
                            containerBorderRadius={4}
                            textStyle={{color: '#000018', letterSpacing: 1, fontSize: 19}}
                        />
                    </View>
                </View>
                <JobSteps currentPosition={1}/>
                <View style={styles.container}>
                    <TouchableOpacity onPress={this.onNext} style={[styles.btn, {borderLeftColor: 'white', borderLeftWidth: 0.5}]}><Text style={{color: '#BCE338', fontSize: 19, fontWeight: 'bold', letterSpacing: 2}}>NEXT</Text></TouchableOpacity>
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
      width: '100%'
    },
    container: {
        flexDirection: 'row', 
        height: 60,
        position: 'absolute', //Here is the trick
        bottom: 0, //Here is the trick
        width: width,
        marginTop: 10
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