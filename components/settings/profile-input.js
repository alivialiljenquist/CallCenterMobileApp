import React, { Component } from 'react';
import { Text, View, Button, TextInput } from 'react-native';


export default class ProfileInput extends Component {
    render() {
        return(
            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: '90%'}}>
                <Text style={{color: '#000018', fontSize: 20, marginTop: '4%', marginBottom: '4%', letterSpacing: 1.5 }}>{this.props.title}: </Text>
                <TextInput
                style={{ borderBottomColor: '#BCE338', borderBottomWidth: 1, marginLeft: 5, padding: 2, height: 25, fontSize: 20}}
                onChangeText={this.props.changes}
                value={this.props.category}
                />
            </View>
        )
    }
}