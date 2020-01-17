import React, { Component } from 'react';
import { app, db } from '../../firebase';
import { Text, View, Button, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import JobSteps from './../stepIndicator';
import { ButtonGroup } from 'react-native-elements';
import Checkbox from 'react-native-modest-checkbox';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

export default class Screen4 extends Component {
    constructor() {
        super()

        this.state = {
            id: null,
            checkboxes: [],
            selectedIndex: 1,
            checkbool1: false,
            checkbool2: false,
            checkbool3: false,
            checkbool4: false,
            checkbool5: false,
            error: '',
            errorVisible: false
        }
        this.updateIndex = this.updateIndex.bind(this)
        this.onNext = this.onNext.bind(this)
        this.postData = this.postData.bind(this)
    }


    updateIndex(selectedIndex) {
        this.setState({selectedIndex: selectedIndex})
    }

    postData = () => {
        if (this.state.checkbool1 == true) {
            this.state.checkboxes.push('Inbound Customer Service')
            console.log('push')
        }
        if (this.state.checkbool2 == true) {
            this.state.checkboxes.push('Inbound Sales')
        }
        if (this.state.checkbool3 == true) {
            this.state.checkboxes.push('Inbound Technical Support')
        }
        if (this.state.checkbool4 == true) {
            this.state.checkboxes.push('Outbound Lead Generation')
        }
        if (this.state.checkbool5 == true) {
            this.state.checkboxes.push('Outbound Sales')
        }

        var experience = this.state.selectedIndex == 1 ? 'No' : this.state.checkboxes
        var profile = this.state.selectedIndex == 1 ? 100 : 5
        var index = this.state.selectedIndex
        var nav = this.props.navigation
        app.auth().onAuthStateChanged(function(user) {
            if (user) {
                db.collection("applicants").where('userId', '==', user.uid).get().then((queryData) => {
                    queryData.forEach((doc) => {
                        db.collection("applicants").doc(doc.id).update({
                            experience: experience,
                            profile_step: profile
                        })
                    })
                }).then(() => index == 1 ? nav.navigate('Profile') : nav.navigate('Builder5'))
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
                <View style={{flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', marginBottom: 25, marginTop: 50, borderBottomColor: 'grey', borderBottomWidth: 0.5, paddingBottom: 8}}>
                    <Text style={styles.counter}>4/4</Text>
                    <Text style={styles.header}>EXPERIENCE</Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile')}><Text style={styles.header}>X</Text></TouchableOpacity>                
                </View>
                <View style={{flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', marginBottom: 10}}>
                    <Text style={{color: '#000018', paddingRight: 20, paddingLeft: 20, fontSize: 17, marginBottom: 10}}>Let potential employers know about you call center experience</Text>
                    <View style={{marginBottom: 15}}>
                        <Text style={{color: '#000018', fontWeight: 'bold', fontSize: 18, paddingBottom: 6, paddingLeft: 10}}>Have you ever worked as a call center agent?</Text>
                        <ButtonGroup
                            onPress={this.updateIndex}
                            selectedIndex={this.state.selectedIndex}
                            buttons={['YES', 'NO']}
                            containerStyle={{borderColor: 'lightgrey', borderWidth: 0.5, alignSelf: 'center', flexDirection: 'row', height: 50, width: width-30}}
                            selectedButtonStyle={{backgroundColor: '#BCE338'}}
                            selectedTextStyle={{fontWeight: 'bold', color: '#000018'}}
                            innerBorderStyle={{color: 'transparent'}}
                            containerBorderRadius={4}
                            textStyle={{color: '#000018', letterSpacing: 1, fontSize: 19}}
                        />
                    </View>
                    <View style={{opacity: this.state.selectedIndex == 0 ? 1: 0, width: width-35}}>
                        <Text style={{color: '#000018', fontWeight: 'bold', fontSize: 18, paddingBottom: 8,}}>What type of call center work have you done?</Text>
                        <Checkbox
                            checkboxStyle={{width: 35, height: 35}}
                            labelStyle={{padding: 10, letterSpacing: 1}}
                            label='Inbound customer service'
                            onChange={() => this.setState({checkbool1: !this.state.checkbool1})}
                            checked={this.state.checkbool1}
                        />
                        <Checkbox
                            checkboxStyle={{width: 35, height: 35}}
                            labelStyle={{padding: 10, letterSpacing: 1}}
                            label='Inbound sales'
                            onChange={() => this.setState({checkbool2: !this.state.checkbool2})}
                            checked={this.state.checkbool2}
                        />
                        <Checkbox
                            checkboxStyle={{width: 35, height: 35}}
                            labelStyle={{padding: 10, letterSpacing: 1}}
                            label='Inbound technical support'
                            onChange={() => this.setState({checkbool3: !this.state.checkbool3})}
                            checked={this.state.checkbool3}
                        />
                        <Checkbox
                            checkboxStyle={{width: 35, height: 35}}
                            labelStyle={{padding: 10, letterSpacing: 1}}
                            label='Outbound lead generation'
                            onChange={() => this.setState({checkbool4: !this.state.checkbool4})}
                            checked={this.state.checkbool4}
                        />
                        <Checkbox
                            checkboxStyle={{width: 35, height: 35}}
                            labelStyle={{padding: 10, letterSpacing: 1}}
                            label='Outbound sales'
                            onChange={() => this.setState({checkbool5: !this.state.checkbool5})}
                            checked={this.state.checkbool5}
                        />
                        
                    </View>
                </View>
                <JobSteps currentPosition={3}/>
                <View style={styles.container}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={[styles.btn, {borderRightColor: 'white', borderRightWidth: 0.5}]}><Text style={{color: '#BCE338', fontSize: 19, fontWeight: 'bold', letterSpacing: 2}} >BACK</Text></TouchableOpacity>
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