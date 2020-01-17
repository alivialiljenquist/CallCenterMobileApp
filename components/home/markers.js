import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, Button, Dimensions } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';


export default class Markers extends Component {
    render() {
        return(
            this.props.markerList.map((marker, i) => (
                <MapView.Marker
                    key={i}
                    coordinate={marker.latlng}
                    onPress={event => {
                        this.props.showInfo(i);
                      }}
                >
                    <View style={styles.marker}>
                        <Text style={styles.markerContainer}>{marker.pay}</Text>
                        <View style={styles.triangle}/>
                    </View>
                </MapView.Marker>
            ))
        )
    }
}


const styles = StyleSheet.create({
    markerContainer: {
      backgroundColor: '#666666', 
      color: 'white',
      paddingTop: 5,
      paddingBottom: 5,
      paddingRight: 12,
      paddingLeft: 12,
      fontWeight: '700',
      borderRadius: 3,
      fontSize: 17
    },
    triangle: {
        width: 0,
        height: 14,
        borderTopWidth: 9,
        borderLeftWidth: 7,
        borderRightWidth: 7,
        borderTopColor: '#666666',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        marginTop: -2
    },
    marker: {
        alignItems: 'center',
        marginBottom: 2
    }
    
  });




// import React, { Component } from 'react';
// import {Platform, StyleSheet, Text, View, Button, Dimensions } from 'react-native';
// import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
// import SlidingUpPanel from 'rn-sliding-up-panel';



// export default class Markers extends Component {
//     render() {
//         return(
//             this.props.markerList.map((marker, i) => {
//                 const index = i
//                 return(
//                     <MapView.Marker
//                         key={i}
//                         coordinate={marker.latlng}
//                         onPress={this.props.showInfo(index)}
//                     >
//                         <View style={styles.marker}>
//                             <Text style={styles.markerContainer}>{marker.pay}</Text>
//                             <View style={styles.triangle}/>
//                         </View>
//                     </MapView.Marker>
//                 )
//             })
//         )
//     }
// }



                

// const styles = StyleSheet.create({
//     markerContainer: {
//       backgroundColor: '#666666', 
//       color: 'white',
//       paddingTop: 5,
//       paddingBottom: 5,
//       paddingRight: 12,
//       paddingLeft: 12,
//       fontWeight: '700',
//     },
//     triangle: {
//         width: 0,
//         height: 14,
//         borderTopWidth: 9,
//         borderLeftWidth: 7,
//         borderRightWidth: 7,
//         borderTopColor: '#666666',
//         borderLeftColor: 'transparent',
//         borderRightColor: 'transparent',
//         marginTop: -2
//     },
//     marker: {
//         alignItems: 'center',
//         marginBottom: 2
//     }
    
//   });








