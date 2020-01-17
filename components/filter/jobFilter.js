import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, Dimensions, TouchableOpacity } from 'react-native';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation';
import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';
import Slider from "react-native-slider";
import { ButtonGroup } from 'react-native-elements';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

export default class JobFilter extends Component {
    constructor() {
        super()

        this.state = {
            selectedIndex: 2,
            selectedIndex2: 0,
            collapsed: false,
            value: 10,
            filterList: []
        }
        this.updateIndex = this.updateIndex.bind(this)
        this.updateIndex2 = this.updateIndex2.bind(this)
    }


    updateIndex(selectedIndex) {
        this.setState({collapsed: true})
        this.setState({selectedIndex: selectedIndex})
    }

    updateIndex2(selectedIndex) {
        this.setState({collapsed: true})
        this.setState({selectedIndex2: selectedIndex})
    }


    render() {
        const buttons = [5, 10, 15, 20, 25, 50]
        const buttons2 = ['FULL TIME', 'PART TIME']
        const time = buttons2[this.state.selectedIndex2]
        const price = this.state.value
        const distance = buttons[this.state.selectedIndex]

        const applyList = () => {
            this.setState({filterList: [time, `$${price}+`, `${distance} miles away`]})
            this.setState({collapsed: false})
        }

        const clearList = () => {
            this.setState({filterList: []})
            this.setState({collapsed: false})
        }

        return(
            <View style={{backgroundColor: 'white', width: width, position: 'absolute'}}>
                <Collapse
                    isCollapsed={this.state.collapsed} 
                    onToggle={() => this.setState({collapsed: !this.state.collapsed})}>
                >
                    <CollapseHeader style={styles.container}>
                        <Text style={{paddingLeft: 20, color: '#000018', fontWeight: 'bold', fontSize: 22}}>FILTERS:</Text>
                        {this.state.filterList.length > 0 ? 
                            <View style={{flexDirection: 'row'}}>
                                <Text style={{padding: 8, paddingTop: 5, paddingBottom: 5, color: '#000018', fontSize: 18, borderColor: '#BCE338', borderWidth: 1, marginRight: 8, margin: 4}}>{this.state.filterList[0]}</Text>
                                <Text style={{padding: 8, paddingTop: 5, paddingBottom: 5, color: '#000018', fontSize: 18, borderColor: '#BCE338', borderWidth: 1, marginRight: 8, margin: 4}}>{this.state.filterList[1]}</Text>
                                <Text style={{padding: 8, paddingTop: 5, paddingBottom: 5, color: '#000018', fontSize: 18, borderColor: '#BCE338', borderWidth: 1, marginRight: 8, margin: 4}}>{this.state.filterList[2]}</Text>
                            </View>
                        : <Text style={{padding: 8, paddingTop: 5, paddingBottom: 5, color: '#000018', fontSize: 18, borderColor: '#BCE338', borderWidth: 1, marginRight: 8, margin: 4}}>NONE</Text>}
                        
                    </CollapseHeader>
                    <CollapseBody style={styles.body}>
                        <View style={{padding: 20, paddingTop: 16}}>
                            <View style={{marginBottom: 10}}>
                                <Text style={{paddingBottom: 8, color: '#000018', fontSize: 19}}>AVAILIBILITY</Text>
                                <ButtonGroup
                                    onPress={this.updateIndex2}
                                    selectedIndex={this.state.selectedIndex2}
                                    buttons={buttons2}
                                    containerStyle={{height: 49, borderColor: '#BCE338', borderWidth: 2.5, width: 250, alignSelf: 'flex-start'}}
                                    selectedButtonStyle={{backgroundColor: '#BCE338'}}
                                    selectedTextStyle={{fontWeight: 'bold', color: '#000018'}}
                                    innerBorderStyle={{color: 'transparent'}}
                                    containerBorderRadius={0}
                                    textStyle={{color: '#000018'}}
                                />
                            </View>
                            <View style={{marginBottom: 5}}>
                                <Text style={{paddingBottom: 8, color: '#000018', fontSize: 19}}>$ PER HOUR</Text>
                                <View style={{flexDirection: 'row', marginBottom: 10, alignItems: 'center', justifyContent: 'flex-start'}}>
                                    <Text style={{padding: 10, marginRight: 20, textAlign: 'center', borderColor: 'grey', borderWidth: 0.5, fontWeight: 'bold', color: '#000018', fontSize: 18}}>${this.state.value}+</Text>
                                    <Slider 
                                        style={{width: 210}} 
                                        minimumTrackTintColor={'#BCE338'} 
                                        thumbTintColor={'#BCE338'} 
                                        thumbTouchSize={{width: 55, height: 55}}
                                        minimumValue={2}
                                        maximumValue={50}
                                        step={1}
                                        value={this.state.value}
                                        onValueChange={value => this.setState({ value })}
                                    />
                                </View>
                            </View>
                            <View>
                                <Text style={{paddingBottom: 8, color: '#000018', fontSize: 19}}>DISTANCE IN MILES</Text>
                                <ButtonGroup
                                    onPress={this.updateIndex}
                                    selectedIndex={this.state.selectedIndex}
                                    buttons={buttons}
                                    containerStyle={{height: 45, borderColor: '#BCE338', borderWidth: 2.5, width: width-30, alignSelf: 'center'}}
                                    selectedButtonStyle={{backgroundColor: '#BCE338'}}
                                    selectedTextStyle={{fontWeight: 'bold', color: '#000018'}}
                                    innerBorderStyle={{color: 'transparent'}}
                                    containerBorderRadius={0}
                                    textStyle={{color: '#000018'}}
                                />
                            </View>
                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end'}}>
                                <TouchableOpacity onPress={() => {this.props.clear(), clearList()}} style={{margin: 10, marginTop: 20}}><Text style={{color: '#000018', fontWeight: 'bold', fontSize: 20, paddingLeft: 25, paddingRight: 25, paddingTop: 10, paddingBottom: 10, borderColor: '#BCE338', borderWidth: 2, letterSpacing: 2}}>CLEAR</Text></TouchableOpacity>
                                <TouchableOpacity onPress={() => {this.props.apply(time, price, distance), applyList()}} style={{margin: 10, marginTop: 20}}><Text style={{color: '#BCE338', fontWeight: 'bold', fontSize: 20, paddingLeft: 25, paddingRight: 25, paddingTop: 10, paddingBottom: 10, backgroundColor: '#000018', letterSpacing: 2}}>APPLY</Text></TouchableOpacity>
                            </View>
                        </View>
                    </CollapseBody>
                </Collapse>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        flexDirection: 'row',
        height: 45,
        alignItems: 'center',
    },
    body: {
        height: 400
    }
  });