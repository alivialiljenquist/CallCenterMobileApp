import React, {Component} from 'react';
import { app, db } from './../firebase';
import {Platform, StyleSheet, Text, View, Button, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import CollapseItem from './collapse'

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

export default class Applications extends Component {
    constructor() {
        super();

        this.state = {
            applies: [],
            jobIds: [],
            inProgress: [],
            accepted: [],
            denied: [],
            interview: []
        }
    }
    
    componentDidMount() {
        const addToList = (data) => {
            if (data.applied_status == 'accepted') {
                this.state.accepted.push(data)
                this.setState({accepted: this.state.accepted})
            } else if (data.applied_status == 'inProgress'){
                this.state.inProgress.push(data)
                this.setState({inProgress: this.state.inProgress})
            } else if (data.applied_status == 'denied') {
                this.state.denied.push(data)
                this.setState({denied: this.state.denied})
            }
        }

        app.auth().onAuthStateChanged(function(user) {
            if (user) {
                db.collection("applicants").where('userId', '==', user.uid).get().then((queryData) => {
                    queryData.forEach((doc) => {
                        db.collection("applied").where('applicantId', '==', doc.id).get().then((queryData1) => {
                            queryData1.forEach((doc1) => {
                                db.collection("jobs").doc(doc1.data().jobId).get().then((queryData2) => {
                                    let jobData = queryData2.data()
                                    let appliedData = doc1.data()
                                    let data = {...jobData, ...appliedData}
                                    addToList(data)
                                })
                            })
                        })
                    })
                })
            } else {
              // No user is signed in.
              // Go To Got Signed Out Page
            }
        });
    }


    render() {
        return(
            <View>
                <ScrollView>
                    <CollapseItem header='Accepted' jobs={this.state.accepted} navigate={this.props.navigation.navigate}/>
                    {/* <CollapseItem header='Interviews' jobs={this.state.interview}/> */}
                    <CollapseItem header='In Progress' jobs={this.state.inProgress} navigate={this.props.navigation.navigate}/>
                    <CollapseItem header='Denied' jobs={this.state.denied} navigate={this.props.navigation.navigate}/>
                </ScrollView>
            </View>
        )
    }
}








