import React, { Component } from 'react';
import { Text, View, Button, TextInput, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import { app, db } from './../firebase';

const width = Dimensions.get('screen').width;

export default class LogIn extends Component {
    constructor() {
        super()

        this.state = {
            email: '',
            password: '',
            error: ''
        }
    }


    render() {
        const message = (text) => {
            this.setState({error: text})
        }

        const signIn = () => {
            app.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                this.setState({mes: errorCode})
            }).then(() => {
                const user = app.auth().currentUser;
                if (user) {
                    const userSnapshot = app.firestore().collection('users').doc(user.uid).get()
                    .then(doc => {
                        if (!doc.exists) {
                            console.log('No such document!');
                        } else {
                            if (doc.data().isApplicant === true) {
                                this.props.navigation.navigate('Profile')
                            } else if (doc.data().isEmployer === true) {
                                message('This is business account. Please create an applicant account to login in.')
                                app.auth().signOut().then(function() {
                                    console.log('signed out')
                                  }).catch(function(error) {
                                    console.log('error signing out', error)
                                });
                            }
                        }
                    })
                } 
            })
        }

        return(
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={styles.text}>LOG IN</Text>   

                <View style={{flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', marginBottom: 15}}>
                    <View style={{height: '23%'}}>
                        <Text style={{color: '#000018', fontWeight: 'bold', fontSize: 18, paddingBottom: 4}}>Email</Text>
                        <TextInput
                            style={{height: 50, borderColor: 'lightgrey', borderWidth: 0.7, width: width-55}}
                            onChangeText={(text) => this.setState({email: text})}
                            value={this.state.email}
                        />
                    </View>
                    <View style={{height: '23%'}}>
                        <Text style={{color: '#000018', fontWeight: 'bold', fontSize: 18, paddingBottom: 4}}>Password</Text>
                        <TextInput
                            style={{height: 50, borderColor: 'lightgrey', borderWidth: 0.7, width: width-55}}
                            onChangeText={(text) => this.setState({password: text})}
                            value={this.state.password}
                        />
                    </View>
                </View>

                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', width: width-60, paddingTop: 30}}>
                    <TouchableOpacity style={[styles.btn, {borderWidth: 1.5, borderColor: '#000018'}]} onPress={() => this.props.navigation.goBack()}>
                            <Text style={{color: '#000018', fontWeight: 'bold', fontSize: 16, letterSpacing: 1}}>Back</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btn, {backgroundColor: '#000018'}]} onPress={signIn}>
                        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16, letterSpacing: 1}}>Log In</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    btn: {
      height: 40,
      width: '30%',
      alignItems: 'center',
      justifyContent: 'center'
    },
    text: {
        color: '#000018',
        fontSize: 25,
        letterSpacing: 7,
        fontWeight: 'bold'
    }
  });
  