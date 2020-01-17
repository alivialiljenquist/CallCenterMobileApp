import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, Button, Dimensions, TouchableOpacity, Image } from 'react-native';
import RightArrow from './../icons/rightArrow.png';
import MapIcon from './../icons/iconMap.png'

export default class ListHome extends Component { 
    render() {
        const { navigation } = this.props;
        const item = navigation.getParam('info', 'NO-ID');

        return(
            <View style={{flex: 1}}>
                {item.map((job, i) => (
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Selected', {info: job})}>
                        <View key={i} style={styles.item}>
                            <Text style={{color: 'black', fontSize: 18, marginLeft: 32}}>{job.job_title}</Text>
                            <View style={{flexDirection: 'row', alignItems: 'center',  marginRight: 32}}>
                                <Text style={{color: 'black', fontSize: 18, marginRight: 32}}>{job.pay}+</Text>
                                <Image style={{width: 15, height: 15}} source={RightArrow}/>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}


                <TouchableOpacity onPress={() => this.props.navigation.navigate('Map')} style={styles.toggleBtn}>
                    <Image style={{width: 20, height: 20, margin: 2}} source={MapIcon}/>
                    <Text style={{color: '#BCE338', marginRight: 2, fontSize: 20, fontWeight: 'bold', letterSpacing: 3}}>MAP</Text>
                </TouchableOpacity>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    toggleBtn: {
        position: 'absolute',
        flexDirection: 'row',
        top: '92.5%',
        height: 43,
        backgroundColor: '#000018', 
        borderRadius: 5,
        flexDirection: 'row', 
        justifyContent: 'space-evenly',
        alignItems: 'center', 
        alignSelf: 'flex-end',
        right: 13,
        width: 107
    },
    item: {
        height: 64,
        width: '100%',
        borderBottomWidth: 0.5,
        borderBottomColor: 'lightgrey',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'

    }
  });
  