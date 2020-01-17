import React, { Component } from 'react';
import { app, db } from './../firebase';
import { Text, View, TouchableOpacity, StyleSheet, Dimensions, Image, ScrollView, Button, TextInput } from 'react-native';
import ImagePicker from "react-native-image-picker";
import ProfileInput from "./profile-input";

const width = Dimensions.get('screen').width;

export default class Profile extends Component {
    constructor() {
        super()

        this.state = {
            user: [],
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBD6igpiuhOoycHnGxpekZG4NDMk-EZVZOnOP-Y7qJ7ckkmhifbA',
            edit: false,
            toggle_image: true,
            first: '',
            last: '',
            phone: '',
            email: '',
            address: '',
            availability: '',
            educaton: '',
            wpm: null,
            experience: '',
            password: '', 
            isLoading: true
        }
        this.getData = this.getData.bind(this)
        this.handleImagePicker = this.handleImagePicker.bind(this)
        this.handleApply = this.handleApply.bind(this)
        this.handleEdit = this.handleEdit.bind(this)
        this.signOutUser = this.signOutUser.bind(this)
    }

    getData() {
        const settingstate = (data) => {
            this.setState({isLoading: false})
            this.setState({first: data.name.first})
            this.setState({last: data.name.last})
            this.setState({phone: data.phone})
            this.setState({email: data.email})
            this.setState({address: data.home_address})
            this.setState({availability: data.availability})
            this.setState({educaton: data.education})
            this.setState({wpm: data.wpm})
            this.setState({experience: data.experience})
        }

        if (this.props.id !== null) {
            db.collection('applicants').doc(this.props.id).get().then(function(querySnapshot) {
                settingstate(querySnapshot.data())
            })
        } 
    }


    handleImagePicker() {
        const options = {
            noData: true
        };
        ImagePicker.launchImageLibrary(options, response => {
            console.log('response', response)
            this.setState({ image: response.uri, toggle_image: false })
        })
    }


    handleEdit() {
        this.setState({ edit: true })
    }


    handleApply() {
        this.setState({ edit: false, toggle_image: false })
        const phone = this.state.phone
        app.auth().onAuthStateChanged(function(user) {
            if (user) {
                db.collection("applicants").where('userId', '==', user.uid).get().then((queryData) => {
                    queryData.forEach((doc) => {
                        db.collection("applicants").doc(doc.id).update({
                            phone: phone,

                        })
                    })
                }).then(() => nav.navigate('Builder3'))
            } else {
              // No user is signed in.
              // Go To Got Signed Out Page
            }
        });
    }
    
    changeEmail() {

    }

    changePassword() {

    }

    signOutUser = () => {
        app.auth().signOut().then(function() {
            console.log('signed out')
          }).catch(function(error) {
            console.log('error signing out', error)
        });
    }

    componentWillReceiveProps() {
        this.getData()
    }
    
    render() {
        return (
            this.state.isLoading == false ?
                this.state.edit == false ? 
                    <ScrollView contentContainerStyle={{alignItems: 'center', marginTop: 5}}>
                        <View style={{flexDirection: 'row', height: 85, width: '90%', alignItems: 'center', justifyContent: 'space-between'}} >
                            <Image source={{uri : this.state.image}}
                            style={{width: 70, height: 70, borderRadius: 150/2}} />
                            <Text style={{color: '#000018', fontSize: 25, letterSpacing: 2, paddingTop: 5}}>{this.state.first} {this.state.last}</Text>
                        </View>
                        <View style={{
                            borderBottomColor: 'black', 
                            borderBottomWidth: 0.5, 
                            width: width - 20,
                            marginBottom: 10}}>
                        </View>

                        <Text style={styles.text}>Phone: {this.state.phone}</Text>
                        <Text style={styles.text}>Email: {this.state.email}</Text>
                        <Text style={styles.text}>Address: {this.state.address}</Text>
                        <Text style={styles.text}>Availability: {this.state.availability}</Text>
                        <Text style={styles.text}>Education: {this.state.educaton}</Text>
                        <Text style={styles.text}>Words Per Minute: {this.state.wpm}</Text>
                        <Text style={styles.text}>Experience: {this.state.experience}</Text>

                        {this.props.opacity !== false ? 
                            <TouchableOpacity style={[styles.btn2, {backgroundColor: '#BCE338', borderRadius: 150/2}]} onPress={this.props.resume}>
                                <Text style={{color: 'white', fontWeight: '600', fontSize: 19, letterSpacing: 1}}>FINISH RESUME BUILDER</Text>
                            </TouchableOpacity>        
                        : null}    

                        
                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', width: width-60, paddingTop: 30, marginBottom: 100}}>
                            <TouchableOpacity style={[styles.btn, {backgroundColor: '#000018'}]} onPress={this.handleEdit}>
                                <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16, letterSpacing: 1}}>Edit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.btn, {borderWidth: 1.5, borderColor: '#000018'}]} onPress={() => this.signOutUser()}>
                                <Text style={{color: '#000018', fontWeight: 'bold', fontSize: 16, letterSpacing: 1}}>Log Out</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                : 
                    <ScrollView contentContainerStyle={{alignItems: 'center', marginTop: 5}}>
                        <View style={{flexDirection: 'row', height: 85, width: '90%', alignItems: 'center', justifyContent: 'space-between'}} >
                            { this.state.toggle_image ? 
                                <TouchableOpacity onPress={this.handleImagePicker} style={{width: 70, height: 70, borderRadius: 150/2, backgroundColor: '#000018', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                    <Text style={{color: 'white', fontWeight: 'bold', fontSize: 30, letterSpacing: 1}}>+</Text>
                                </TouchableOpacity>
                            : 
                                <Image source={{uri : this.state.image}}
                                style={{width: 70, height: 70, borderRadius: 150/2}} />
                            }
                            
                            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
                                <Text style={{color: '#000018', fontSize: 25, marginTop: '4%', marginBottom: '4%', letterSpacing: 1.5 }}>Name: </Text>
                                <TextInput
                                style={{ borderBottomColor: '#BCE338', borderBottomWidth: 1, marginLeft: 5, padding: 2, height: 30, fontSize: 25}}
                                onChangeText={(text) => this.setState({name: text})}
                                value={this.state.name}
                                />
                            </View>                      
                        </View>

                        <View style={{
                            borderBottomColor: 'black', 
                            borderBottomWidth: 0.7, 
                            width: width - 20,
                            marginBottom: 10}}>
                        </View>

                        <ProfileInput title="Phone" category={this.state.phone} change={(text) => this.setState({phone: text})}/>
                        <ProfileInput title="Email" category={this.state.email}  change={(text) => this.setState({email: text})}/>
                        <ProfileInput title="Address" category={this.state.address}  change={(text) => this.setState({address: text})}/>
                        <ProfileInput title="Availability" category={this.state.availability}  change={(text) => this.setState({availability: text})}/>
                        <ProfileInput title="Education" category={this.state.educaton}  change={(text) => this.setState({educaton: text})}/>
                        <ProfileInput title="Words Per Minute" category={this.state.wpm}  change={(text) => this.setState({wpm: text})}/>
                        <ProfileInput title="Experience" category={this.state.experience} change={(text) => this.setState({experience: text})}/>
                        <ProfileInput title="Password" category={this.state.password}  change={(text) => this.setState({password: text})}/>
                        
                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', width: width-60, paddingTop: 30, marginBottom: 100}}>
                            <TouchableOpacity style={[styles.btn, {backgroundColor: '#BCE338'}]}>
                                <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16, letterSpacing: 1}} onPress={this.handleApply}>Apply</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.btn, {borderWidth: 1.5, borderColor: '#000018'}]} onPress={() => this.signOutUser()}>
                                <Text style={{color: '#000018', fontWeight: 'bold', fontSize: 16, letterSpacing: 1}}>Log Out</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
            : <Text>Loading....</Text>
        )
    }
}



const styles = StyleSheet.create({
    btn: {
      height: 50,
      width: '40%',
      alignItems: 'center',
      justifyContent: 'center'
    },
    btn2: {
      height: 40,
      width: '75%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 10,
      marginBottom: 4
    },
    text: {
        color: '#000018',
        fontSize: 20,
        width: '90%',   
        marginTop: '4%',    
        marginBottom: '4%',
        letterSpacing: 1.5 
    }
  });
