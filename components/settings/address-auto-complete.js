import React, { Component } from 'react';
import { Text, View, Button, StyleSheet, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width; 

export default class AddressAutoComplete extends Component {
    render() {
        return(
            <GooglePlacesAutocomplete
                placeholder='Address'
                minLength={2}
                autoFocus={false}
                returnKeyType={'search'}
                keyboardAppearance={'light'}
                listViewDisplayed={false}
                fetchDetails={true}
                keyboardShouldPersistTaps="handled"
                renderDescription={row => row.description}
                onPress={(data, details = null) => {
                    this.props.setAddress(details.formatted_address);
                }}
                enablePoweredByContainer={false}
                getDefaultValue={() => ''}
                textInputProps={{
                    ref: (input) => {this.fourthTextInput = input}
                }}
                query={{
                    key: 'AIzaSyBWKKKy_-z7JYV3Bg44inqYujLx78k34gE',
                    language: 'en',
                    region: "US", 
                    types: '',
                    components: 'country:us'
                }}
                styles={{
                    container: {width: '90%'},
                    textInputContainer: {
                        backgroundColor: 'transparent',
                        marginBottom: 10,
                        width: '100%',
                        borderTopWidth: 0,
                        borderBottomWidth:0
                    },
                    textInput: {
                        height: 50,
                        minWidth: '100%', 
                        borderColor: "#000018",
                        borderWidth: 0.7,
                        color: '#5d5d5d',
                        fontSize: 14
                    },
                    description: {
                        color:'#000018',
                    },
                    predefinedPlacesDescription: {
                        color: '#1faadb'
                    },
                    listView: {
                    }
                }}
                currentLocation={false} 
                nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                GoogleReverseGeocodingQuery={{// available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                }}
                GooglePlacesSearchQuery={{
                    rankby: 'distance',
                    type: 'cafe'
                }}    
                GooglePlacesDetailsQuery={{
                    fields: 'formatted_address',
                }}
                filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']}
                debounce={200}
            />
        )
    }
}

  