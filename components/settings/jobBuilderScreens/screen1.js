import React, { Component } from 'react';
import { app, db } from '../../firebase';
import { Text, View, Button, StyleSheet, TouchableOpacity, Dimensions, TextInput } from 'react-native';
import JobSteps from './../stepIndicator';
import { ScrollView } from 'react-native-gesture-handler';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

export default class Screen1 extends Component {
    constructor() {
        super()

        this.state = {
            id: '',
            first: '',
            last: '',
            phone: '',
            email: '',
            password: '',
            error: '',
            errorVisible: false,
        }
        this.createUser = this.createUser.bind(this)
        this.onNext = this.onNext.bind(this)
    }

    createUser = () => {
        var id = app.auth().currentUser;
        if (id.uid == null) {
            app.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                this.setState({error: errorMessage, errorVisible: true})
            }).then(() => {
                if (id !== null) {
                    db.collection("applicants").doc().set({
                        userId: id.uid,
                        address_toggle_home: true,
                        creation_date: new Date(),
                        email: this.state.email,
                        name: {
                            last: this.state.last,
                            first: this.state.first
                        },
                        phone: this.state.phone,
                        profile_step: 2
                    }).then(() => {
                        var id = app.auth().currentUser;
                        db.collection("users").doc(id.uid).set({
                            permissions: ['applicant'],
                            isApplicant: true,
                            isEmployer: false,
                            email: this.state.email
                        })
                    }).then(() => this.props.navigation.navigate('Builder2'))
                }
            })
        } else {
            db.collection("applicants").where('userId', '==', id.uid).get().then((doc) => {
                db.collection("applicants").doc(doc.id).update({
                    email: this.state.email,
                    name: {
                        last: this.state.last,
                        first: this.state.first
                    },
                    phone: this.state.phone,
                    profile_step: 2
                })
            })
        }
    }

    
    onNext = () => {
        if (this.state.name == '' || this.state.email == '' || this.state.phone == '' || this.state.password == '') {
            this.setState({error: '*Please Fill All Items*', errorVisible: true})
        } else {
            this.createUser()
        }
    }

    render() {
        return(
            <View style={{flex: 1}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', marginTop: 50, borderBottomColor: 'grey', borderBottomWidth: 0.5, paddingBottom: 8}}>
                    <Text style={styles.counter}>1/4</Text>
                    <Text style={styles.header}>ACCOUNT INFO</Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile')}><Text style={styles.header}>X</Text></TouchableOpacity>
                </View>
                <ScrollView contentContainerStyle={{flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center'}}>
                    <View style={{height: 65, padding: 10}}>
                        <Text style={{color: '#000018', fontSize: 15}}>Lets start with basic information.  This will help us set up your account</Text>
                        {this.state.errorVisible ? <Text style={{color: 'red', padding: 2, fontSize: 15}}>{this.state.error}</Text> : null}
                    </View>
                    <View style={{height: 100}}>
                        <Text style={{color: '#000018', fontWeight: 'bold', fontSize: 18, paddingBottom: 4}}>First Name</Text>
                        <TextInput
                            style={{paddingLeft: 5, fontSize: 20, height: 50, borderColor: 'lightgrey', borderWidth: 1, width: width-30}}
                            onChangeText={(text) => this.setState({first: text})}
                            value={this.state.first}
                        />
                    </View>
                    <View style={{height: 100}}>
                        <Text style={{color: '#000018', fontWeight: 'bold', fontSize: 18, paddingBottom: 4}}>Last Name</Text>
                        <TextInput
                            style={{paddingLeft: 5, fontSize: 20, height: 50, borderColor: 'lightgrey', borderWidth: 1, width: width-30}}
                            onChangeText={(text) => this.setState({last: text})}
                            value={this.state.last}
                        />
                    </View>
                    <View style={{height: 100}}>
                        <Text style={{color: '#000018', fontWeight: 'bold', fontSize: 18, paddingBottom: 4}}>Phone</Text>
                        <TextInput
                            style={{paddingLeft: 5, fontSize: 20, height: 50, borderColor: 'lightgrey', borderWidth: 1, width: width-30}}
                            onChangeText={(text) => this.setState({phone: text})}
                            value={this.state.phone}
                        />
                    </View>
                    <View style={{height: 100}}>
                        <Text style={{color: '#000018', fontWeight: 'bold', fontSize: 18, paddingBottom: 4}}>Email</Text>
                        <TextInput
                            style={{paddingLeft: 5, fontSize: 20, height: 50, borderColor: 'lightgrey', borderWidth: 1, width: width-30}}
                            onChangeText={(text) => this.setState({email: text})}
                            value={this.state.email}
                        />
                    </View>
                    <View style={{height: 100}}>
                        <Text style={{color: '#000018', fontWeight: 'bold', fontSize: 18, paddingBottom: 4}}>Password</Text>
                        <TextInput
                            style={{paddingLeft: 5, fontSize: 20, height: 50, borderColor: 'lightgrey', borderWidth: 1, width: width-30}}
                            onChangeText={(text) => this.setState({password: text})}
                            value={this.state.password}
                            secureTextEntry={true}
                        />
                    </View>
                </ScrollView>
                <View style={{height: 100, marginBottom: 20}}>
                    <JobSteps currentPosition={0}/>
                </View>
                <View style={styles.container}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile')} style={[styles.btn, {borderRightColor: 'white', borderRightWidth: 0.5}]}><Text style={{color: '#BCE338', fontSize: 19, fontWeight: 'bold', letterSpacing: 2}}>CLOSE</Text></TouchableOpacity>
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