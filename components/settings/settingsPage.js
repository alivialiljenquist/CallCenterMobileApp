import React, {Component} from 'react';
import { app, db } from './../firebase';
import {Platform, StyleSheet, Text, View, Button, Dimensions, TouchableOpacity } from 'react-native';
import Profile from './profile';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

export default class Settings extends Component {
    constructor() {
        super();

        this.state = {
            status: '',
            id: null,
            opacity: 1
        }
        this.handleUser = this.handleUser.bind(this)
        this.onResume = this.onResume.bind(this)
    }

    handleUser = () => {
        const settingstate2 = (title, data) => {
            this.setState({[title]: data})
        }

        app.auth().onAuthStateChanged(async function(user) {
            if (user) {
                const userSnapshot = await app.firestore().collection('users').doc(user.uid).get()
                const userData = userSnapshot.data();
                if (userData.isApplicant === true) {
                    settingstate2('status', true)
                    db.collection('applicants').where('userId', '==', user.uid).get().then(function(querySnapshot) {
                        querySnapshot.forEach(function(doc) {
                            settingstate2('id', doc.id)
                            if (doc.data().profile_step == null || doc.data().profile_step == '100') {
                                settingstate2('opacity', false)
                            } else {
                                settingstate2('opacity', doc.data().profile_step)
                            }
                        })
                    })
                } else if (userData.isEmployer === true) {
                    app.auth().signOut();
                    this.handleUser();
                }
            } else {
                settingstate2('status', 'false')
            }
        });
    }

    onResume = async () => {
        if (this.state.status == true) {
            this.props.navigation.navigate(`Builder${this.state.opacity}`)
        } else {
            this.props.navigation.navigate('JobBuilder')
        }        
    }

    componentWillMount() {
        this.handleUser()
    }

    render() {
        const {navigate} = this.props.navigation;
        return(
            this.state.status == 'false' ? 
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={styles.text}>WELCOME</Text>               
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', width: width-30, paddingTop: 30}}>
                        <TouchableOpacity style={[styles.btn, {backgroundColor: '#000018'}]} onPress={() => this.props.navigation.navigate('JobBuilder')}>
                            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16, letterSpacing: 1}}>Sign Up</Text>
                        </TouchableOpacity>

                        <Text style={{color: '#000018'}}>Or</Text>

                        <TouchableOpacity style={[styles.btn, {borderWidth: 1.5, borderColor: '#000018'}]} onPress={() => navigate('LogIn')}>
                            <Text style={{color: '#000018', fontWeight: 'bold', fontSize: 16, letterSpacing: 1}}>Log In</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            : <Profile resume={this.onResume} id={this.state.id} opacity={this.state.opacity} />
        )
    }
}



const styles = StyleSheet.create({
    btn: {
        height: 40,
        width: 110,
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
