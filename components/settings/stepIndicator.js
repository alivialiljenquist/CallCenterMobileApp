import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import StepIndicator from 'react-native-step-indicator';


const labels = ["Cart","Delivery Address","Order Summary","Payment Method","Track"];
const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize:30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#BCE338',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: '#BCE338',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: '#BCE338',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#BCE338',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#BCE338',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: 'transparent',
  labelSize: 0,
  currentStepLabelColor: 'transparent'
}

export default class JobSteps extends Component {
    render() {
        return(
            <StepIndicator
                customStyles={customStyles}
                currentPosition={this.props.currentPosition}
                labels={labels}
            />
        )
    }
}