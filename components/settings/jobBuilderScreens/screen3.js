import React, { Component } from 'react';
import { app, db } from '../../firebase';
import { Text, View, Button, StyleSheet, TouchableOpacity, Dimensions, TextInput } from 'react-native';
import JobSteps from './../stepIndicator';
import { ButtonGroup } from 'react-native-elements';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

export default class Screen3 extends Component {
    constructor() {
        super()

        this.state = {
            id: null,
            words: '20',
            education: 'Some High School',
            selectedIndex: 0,
            error: '',
            errorVisible: false
        }
        this.updateIndex = this.updateIndex.bind(this)
        this.onNext = this.onNext.bind(this)
        this.postData = this.postData.bind(this)
    }


    updateIndex(selectedIndex) {
        this.setState({selectedIndex: selectedIndex})
        if (this.state.selectedIndex == 0) {
            this.setState({education: 'Some High School'})
        } else if (this.state.selectedIndex == 1) {
            this.setState({education: 'High School Diploma'})
        } else if (this.state.selectedIndex == 2) {
            this.setState({education: 'Some College'})
        } else if (this.state.selectedIndex == 3) {
            this.setState({education: 'Bachelors Degree'})
        }
    }

    postData = () => {
        console.log('post')
        var education = this.state.education
        var words = this.state.words
        var nav = this.props.navigation
        app.auth().onAuthStateChanged(function(user) {
            if (user) {
                db.collection("applicants").where('userId', '==', user.uid).get().then((queryData) => {
                    queryData.forEach((doc) => {
                        db.collection("applicants").doc(doc.id).update({
                            education: education,
                            wpm: words,
                            profile_step: 4
                        })
                    })
                }).then(() => nav.navigate('Builder4'))
            } else {
              // No user is signed in.
              // Go To Got Signed Out Page
            }
          });
    }


    onNext = () => {
        if (this.state.words == '' || this.state.education == '') {
            this.setState({error: '*Please Fill All Items*', errorVisible: true})
        } else {
            console.log(this.state.education)
            this.postData()
        }
    }

    render() {
        return(
            <View style={{flex: 1}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', marginBottom: 10, marginTop: 50, borderBottomColor: 'grey', borderBottomWidth: 0.5, paddingBottom: 8}}>
                    <Text style={styles.counter}>3/4</Text>
                    <Text style={styles.header}>SKILLS</Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile')}><Text style={styles.header}>X</Text></TouchableOpacity>                
                </View>
                <View style={{flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', marginBottom: 15}}>
                    <Text style={{color: '#000018', paddingRight: 20, paddingLeft: 20, fontSize: 17}}>These questions will help us find better jobs for you</Text>
                    <View style={{marginBottom: 20}}>
                        <Text style={{color: '#000018', fontWeight: 'bold', fontSize: 18, paddingBottom: 4}}>Education Level</Text>
                        <ButtonGroup
                            onPress={this.updateIndex}
                            selectedIndex={this.state.selectedIndex}
                            buttons={['SOME HIGH SCHOOL', 'HIGH SCHOOL DIPLOMA', 'SOME COLLEGE', 'BACHELORS DEGREE']}
                            containerStyle={{borderColor: 'lightgrey', borderWidth: 0.5, alignSelf: 'center', flexDirection: 'column', height: 190, width: width-30}}
                            selectedButtonStyle={{backgroundColor: '#BCE338'}}
                            selectedTextStyle={{fontWeight: 'bold', color: '#000018'}}
                            innerBorderStyle={{color: 'transparent'}}
                            containerBorderRadius={4}
                            textStyle={{color: '#000018', letterSpacing: 1, fontSize: 19}}
                        />
                    </View>
                    <View style={{height: '20%'}}>
                        <Text style={{color: '#000018', fontWeight: 'bold', fontSize: 18, paddingBottom: 4}}>How many words per minute can you type?</Text>
                        <TextInput
                            style={{height: 50, borderColor: 'lightgrey', borderWidth: 0.7, width: width-30}}
                            onChangeText={(text) => this.setState({words: text})}
                            value={this.state.words}
                        />
                    </View>
                </View>
                <JobSteps currentPosition={2}/>
                <View style={styles.container}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={[styles.btn, {borderRightColor: 'white', borderRightWidth: 0.5}]}><Text style={{color: '#BCE338', fontSize: 19, fontWeight: 'bold', letterSpacing: 2}} >BACK</Text></TouchableOpacity>
                    <TouchableOpacity onPress={this.onNext} style={[styles.btn, {borderLeftColor: 'white', borderLeftWidth: 0.5}]}><Text style={{color: '#BCE338', fontSize: 19, fontWeight: 'bold', letterSpacing: 2}} >NEXT</Text></TouchableOpacity>
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