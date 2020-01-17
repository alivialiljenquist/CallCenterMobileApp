import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, Dimensions, TouchableOpacity } from 'react-native';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation';
import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';
import moment from 'moment';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

export default class CollapseItem extends Component {
    render() {
        return(
            <View>
                <Collapse>
                    <CollapseHeader style={styles.container}>
                        <Text style={{paddingLeft: 30, color: '#000018', fontWeight: 'bold'}}>{this.props.header}</Text>
                        <Text style={{paddingRight: 30, color: '#000018', fontWeight: 'bold'}}>{this.props.jobs.length}</Text>
                    </CollapseHeader>
                    <CollapseBody>
                        <View>{this.props.jobs.map((info, i) => {
                                var date = moment(info.applied_time.seconds*1000).format('L');
                                return(
                                    <TouchableOpacity style={{padding: 18, borderBottomColor: 'grey', borderBottomWidth: 0.6}} onPress={() => this.props.navigate('SelectedApp', {info: info})}>
                                        <Text style={{padding: 3, color: '#BCE338', fontWeight: 'bold', fontSize: 18}}>{info.job}</Text>
                                        <Text style={{padding: 3, color: '#000018', fontSize: 15}}>{info.company}</Text>
                                        <Text style={{padding: 3, color: '#000018', fontSize: 15}}>Applied: {date}</Text>
                                    </TouchableOpacity>
                                )
                            }
                        )}</View>
                    </CollapseBody>
                </Collapse>
            </View>
        )
    }
}





const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 62,
        borderBottomColor: 'lightgrey',
        borderBottomWidth: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
    }
});